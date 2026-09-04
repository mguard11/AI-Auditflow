from abc import ABC, abstractmethod
from enum import Enum
from typing import Any, AsyncIterator, Sequence

from pydantic import BaseModel, Field


class MessageRole(str, Enum):
    SYSTEM = "system"
    USER = "user"
    ASSISTANT = "assistant"


class ChatMessage(BaseModel):
    role: MessageRole
    content: str


class LLMRequest(BaseModel):
    messages: Sequence[ChatMessage]
    max_tokens: int = Field(default=1024, ge=1)
    temperature: float = Field(default=0.2, ge=0.0, le=2.0)
    stop: Sequence[str] | None = Field(default=None)
    stream: bool = Field(default=False)


class LLMResponse(BaseModel):
    content: str
    model: str
    usage: dict[str, int] | None = None
    finish_reason: str | None = None


class LLMProvider(ABC):
    @abstractmethod
    async def complete(self, request: LLMRequest) -> LLMResponse:
        pass

    @abstractmethod
    async def stream(self, request: LLMRequest) -> AsyncIterator[str]:
        pass

    @abstractmethod
    @property
    def model_id(self) -> str:
        pass
