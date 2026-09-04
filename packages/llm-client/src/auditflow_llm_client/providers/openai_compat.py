import logging
from dataclasses import dataclass, field
from typing import Any

import httpx
from tenacity import (
    RetryError,
    retry,
    retry_if_exception_type,
    stop_after_attempt,
    wait_exponential,
)

from auditflow_llm_client.types import (
    ChatMessage,
    LLMProvider,
    LLMRequest,
    LLMResponse,
    MessageRole,
)

logger = logging.getLogger(__name__)


@dataclass
class OpenAIClientConfig:
    base_url: str
    api_key: str | None = None
    model: str = "meta-llama/Llama-3-8B-Instruct"
    timeout_seconds: float = 60.0
    max_retries: int = 3


class OpenAIClientError(Exception):
    pass


class OpenAIClient(LLMProvider):
    def __init__(self, config: OpenAIClientConfig) -> None:
        self.config = config
        self._client = httpx.AsyncClient(
            base_url=config.base_url.rstrip("/"),
            headers={"Content-Type": "application/json"},
            timeout=config.timeout_seconds,
        )

    @property
    def model_id(self) -> str:
        return self.config.model

    @retry(
        reraise=True,
        stop=stop_after_attempt(3),
        wait=wait_exponential(multiplier=1, min=1, max=10),
        retry=retry_if_exception_type((httpx.TimeoutException, OpenAIClientError)),
    )
    async def complete(self, request: LLMRequest) -> LLMResponse:
        payload: dict[str, Any] = {
            "model": self.config.model,
            "messages": [
                {"role": message.role.value, "content": message.content}
                for message in request.messages
            ],
            "max_tokens": request.max_tokens,
            "temperature": request.temperature,
        }
        if request.stop:
            payload["stop"] = list(request.stop)

        auth_headers = {}
        if self.config.api_key:
            auth_headers["Authorization"] = f"Bearer {self.config.api_key}"

        try:
            response = await self._client.post(
                "/v1/chat/completions",
                json=payload,
                headers=auth_headers,
            )
        except httpx.HTTPError as exc:
            logger.error("llm.request_failed", error=str(exc))
            raise OpenAIClientError(str(exc)) from exc

        if response.status_code != 200:
            logger.error(
                "llm.bad_status",
                status_code=response.status_code,
                body=response.text,
            )
            raise OpenAIClientError(
                f"LLM provider returned {response.status_code}: {response.text}"
            )

        data = response.json()
        choices = data.get("choices") or []
        if not choices:
            raise OpenAIClientError("LLM provider returned empty choices")

        message = choices[0].get("message", {})
        usage = data.get("usage")

        return LLMResponse(
            content=message.get("content", ""),
            model=data.get("model", self.config.model),
            usage={
                "prompt_tokens": usage.get("prompt_tokens", 0) if usage else 0,
                "completion_tokens": usage.get("completion_tokens", 0) if usage else 0,
                "total_tokens": usage.get("total_tokens", 0) if usage else 0,
            },
            finish_reason=choices[0].get("finish_reason"),
        )

    async def stream(self, request: LLMRequest) -> AsyncIterator[str]:
        payload: dict[str, Any] = {
            "model": self.config.model,
            "messages": [
                {"role": message.role.value, "content": message.content}
                for message in request.messages
            ],
            "max_tokens": request.max_tokens,
            "temperature": request.temperature,
            "stream": True,
        }

        auth_headers = {}
        if self.config.api_key:
            auth_headers["Authorization"] = f"Bearer {self.config.api_key}"

        try:
            async with self._client.stream(
                "POST",
                "/v1/chat/completions",
                json=payload,
                headers=auth_headers,
            ) as response:
                response.raise_for_status()
                async for line in response.aiter_lines():
                    if line.startswith("data: "):
                        chunk = line[6:].strip()
                        if chunk == "[DONE]":
                            break
                        try:
                            import json

                            parsed = json.loads(chunk)
                            delta = parsed["choices"][0]["delta"]
                            if delta.get("content"):
                                yield delta["content"]
                        except (json.JSONDecodeError, KeyError):
                            continue
        except httpx.HTTPError as exc:
            logger.error("llm.stream_failed", error=str(exc))
            raise OpenAIClientError(str(exc)) from exc
