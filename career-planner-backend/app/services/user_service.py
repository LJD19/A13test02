from sqlalchemy.ext.asyncio import AsyncSession
from sqlalchemy.future import select
from passlib.context import CryptContext

from app.models.user import User
from app.schemas.user import UserRegister


# 密码哈希上下文
pwd_context = CryptContext(schemes=["bcrypt"], deprecated="auto")


def get_password_hash(password: str) -> str:
    """哈希密码"""
    return pwd_context.hash(password)


def verify_password(plain_password: str, hashed_password: str) -> bool:
    """验证密码"""
    return pwd_context.verify(plain_password, hashed_password)


async def create_user(db: AsyncSession, user_register: UserRegister):
    """创建新用户"""
    # 检查用户名/邮箱是否已存在
    result = await db.execute(
        select(User).where(
            (User.username == user_register.username) | (User.email == user_register.email)
        )
    )
    if result.scalars().first():
        return None  # 已存在返回None

    # 创建新用户
    db_user = User(
        username=user_register.username,
        email=user_register.email,
        password_hash=get_password_hash(user_register.password),
        role=user_register.role or "student"
    )
    db.add(db_user)
    await db.commit()
    await db.refresh(db_user)
    return db_user


async def authenticate_user(db: AsyncSession, username: str, password: str):
    """用户登录验证"""
    result = await db.execute(select(User).where(User.username == username))
    user = result.scalars().first()
    if not user or not verify_password(password, user.password_hash):
        return None
    return user


async def get_user_by_id(db: AsyncSession, user_id: int):
    """根据ID获取用户"""
    result = await db.execute(select(User).where(User.id == user_id))
    return result.scalars().first()
