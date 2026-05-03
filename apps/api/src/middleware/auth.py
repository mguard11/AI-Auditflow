"""JWT authentication middleware."""

from fastapi import Depends, HTTPException, status
from fastapi.security import HTTPAuthorizationCredentials, HTTPBearer
from jose import JWTError, jwt
from pydantic import BaseModel

from src.lib.config import settings

bearer = HTTPBearer()


class OrgContext(BaseModel):
    id: str
    name: str
    user_id: str
    role: str


async def get_current_org(
    credentials: HTTPAuthorizationCredentials = Depends(bearer),
) -> OrgContext:
    token = credentials.credentials
    try:
        payload = jwt.decode(token, settings.SECRET_KEY, algorithms=["HS256"])
        return OrgContext(
            id=payload["org_id"],
            name=payload["org_name"],
            user_id=payload["sub"],
            role=payload.get("role", "viewer"),
        )
    except JWTError:
        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid or expired token",
            headers={"WWW-Authenticate": "Bearer"},
        )
