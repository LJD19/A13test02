from fastapi.testclient import TestClient
from app.main import app

client = TestClient(app)


def test_health_check():
    """测试健康检查接口"""
    response = client.get("/health")
    assert response.status_code == 200
    assert response.json() == {"status": "ok", "message": "Backend service is running"}


def test_root():
    """测试根路径"""
    response = client.get("/")
    assert response.status_code == 200
    assert "message" in response.json()


def test_login():
    """测试登录接口"""
    response = client.post(
        "/api/v1/login",
        json={"username": "testuser", "password": "testpass"}
    )
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["data"]["username"] == "testuser"


def test_register():
    """测试注册接口"""
    response = client.post(
        "/api/v1/register",
        json={
            "username": "newuser",
            "email": "newuser@example.com",
            "password": "newpass"
        }
    )
    assert response.status_code == 200
    data = response.json()
    assert data["success"] is True
    assert data["data"]["username"] == "newuser"
