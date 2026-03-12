from pydantic import BaseModel, EmailStr
from typing import Optional
from datetime import datetime


class UserLogin(BaseModel):
    """用户登录请求模型"""
    username: str
    password: str


class UserRegister(BaseModel):
    """用户注册请求模型"""
    username: str
    email: EmailStr
    password: str
    role: Optional[str] = "student"


class UserResponse(BaseModel):
    """用户响应模型"""
    id: int
    username: str
    email: str
    role: str
    token: Optional[str] = None
    created_at: Optional[datetime] = None

    class Config:
        from_attributes = True


class AuthResponse(BaseModel):
    """认证响应模型"""
    success: bool
    data: Optional[UserResponse] = None
    error: Optional[str] = None
