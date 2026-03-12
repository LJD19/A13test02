from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from app.api.v1 import user, student
from app.core.config import settings

app = FastAPI(
    title="CareerPlannerAPI",
    description="职业规划智能体后端API服务",
    version="1.0.0"
)

# CORS 配置 - 允许前端跨域访问
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # 开发环境允许所有来源
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# 注册路由
app.include_router(user.router, prefix=settings.API_V1_STR, tags=["user"])
app.include_router(student.router, prefix=settings.API_V1_STR, tags=["student"])


@app.get("/health")
async def health_check():
    """健康检查接口"""
    return {"status": "ok", "message": "Backend service is running"}


@app.get("/")
async def root():
    """根路径"""
    return {
        "message": "Welcome to Career Planner API",
        "docs": "/docs",
        "health": "/health"
    }


if __name__ == "__main__":
    import uvicorn
    uvicorn.run(
        "app.main:app",
        host="0.0.0.0",
        port=settings.SERVER_PORT,
        reload=True
    )
