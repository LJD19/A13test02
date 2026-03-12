from fastapi import APIRouter, Depends, UploadFile, File, Form
from sqlalchemy.ext.asyncio import AsyncSession
from app.core.config import get_db

router = APIRouter()


# 上传简历生成画像（占位接口）
@router.post("/student/profile/upload")
async def upload_resume(
    file: UploadFile = File(...),
    user_id: int = Form(default=1),
    db: AsyncSession = Depends(get_db)
):
    """
    上传简历生成画像
    仅返回成功提示，不处理实际解析逻辑
    """
    return {
        "success": True,
        "data": {
            "status": "success",
            "message": "简历上传成功（占位）",
            "file_name": file.filename
        }
    }


# 保存自定义学生画像（占位接口）
@router.post("/student/profile/save")
async def save_student_profile(
    data: dict,
    db: AsyncSession = Depends(get_db)
):
    """
    保存自定义学生画像
    仅返回成功提示，不处理实际存储逻辑
    """
    return {
        "success": True,
        "data": {
            "status": "success",
            "message": "学生画像保存成功（占位）",
            "profile_id": 1
        }
    }


# 获取学生画像（占位接口）
@router.get("/student/profile")
async def get_student_profile(
    db: AsyncSession = Depends(get_db)
):
    """
    获取学生画像
    仅返回占位数据
    """
    return {
        "success": True,
        "data": {
            "id": 1,
            "name": "示例学生",
            "school": "示例大学",
            "major": "计算机科学",
            "education": "本科"
        }
    }
