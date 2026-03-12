from pydantic_settings import BaseSettings
from sqlalchemy.ext.asyncio import create_async_engine, AsyncSession, async_sessionmaker
from sqlalchemy.orm import DeclarativeBase
from typing import AsyncGenerator


class Settings(BaseSettings):
    """应用配置"""
    API_V1_STR: str = "/api/v1"
    SERVER_PORT: int = 8000
    # PostgreSQL 数据库连接地址
    DATABASE_URL: str = "postgresql+asyncpg://postgres:123456@localhost:5432/career_planner"

    class Config:
        env_file = ".env"


settings = Settings()

# 创建异步引擎
engine = create_async_engine(settings.DATABASE_URL, echo=True)

# 创建异步会话工厂
AsyncSessionLocal = async_sessionmaker(engine, class_=AsyncSession, expire_on_commit=False)


class Base(DeclarativeBase):
    """SQLAlchemy 基类"""
    pass


async def get_db() -> AsyncGenerator[AsyncSession, None]:
    """依赖项：获取数据库会话"""
    db = AsyncSessionLocal()
    try:
        yield db
    finally:
        await db.close()
