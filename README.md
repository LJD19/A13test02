# 职业规划智能体

基于 Vue3 + FastAPI + PostgreSQL 的职业规划智能平台。

## 项目结构

```
├── career-planner-frontend/    # Vue3 前端项目
│   ├── src/
│   │   ├── api/               # API 接口
│   │   ├── assets/            # 静态资源
│   │   ├── components/        # 组件
│   │   ├── router/            # 路由配置
│   │   ├── stores/            # Pinia 状态管理
│   │   ├── types/             # TypeScript 类型
│   │   ├── utils/             # 工具函数
│   │   └── views/             # 页面组件
│   └── package.json
│
├── career-planner-backend/     # FastAPI 后端项目
│   ├── app/
│   │   ├── api/v1/            # API 路由
│   │   ├── core/              # 核心配置
│   │   ├── models/            # 数据库模型
│   │   ├── schemas/           # Pydantic 模型
│   │   └── services/          # 业务逻辑
│   ├── alembic/               # 数据库迁移
│   ├── requirements.txt       # Python 依赖
│   └── .env.example           # 环境变量示例
│
└── README.md
```

## 技术栈

### 前端
- Vue 3.5 + TypeScript
- Vite 7
- Element Plus
- Pinia
- Vue Router
- Axios

### 后端
- FastAPI
- SQLAlchemy (异步)
- Alembic
- PostgreSQL
- bcrypt (密码哈希)

## 快速开始

### 环境要求
- Node.js 18+
- Python 3.11+
- PostgreSQL 15+

### 1. 克隆项目

```bash
git clone https://github.com/你的用户名/仓库名.git
cd 仓库名
```

### 2. 创建数据库

使用 pgAdmin 或命令行创建数据库：

```sql
CREATE DATABASE career_planner;
```

或使用命令行：
```bash
psql -U postgres -c "CREATE DATABASE career_planner;"
```

### 3. 启动后端

```bash
cd career-planner-backend

# 创建虚拟环境
python -m venv venv

# 激活虚拟环境
# Windows:
venv\Scripts\activate
# Linux/Mac:
source venv/bin/activate

# 安装依赖
pip install -r requirements.txt

# 运行数据库迁移（创建 users 表）
alembic upgrade head

# 启动服务
python -m uvicorn app.main:app --host 0.0.0.0 --port 8000
```

后端启动成功后访问：
- API 文档：http://localhost:8000/docs
- 健康检查：http://localhost:8000/health

### 4. 启动前端（新开一个终端）

```bash
cd career-planner-frontend

# 安装依赖
npm install

# 启动开发服务器
npm run dev
```

前端启动成功后访问：http://localhost:5002

### 5. 测试功能

1. 访问 http://localhost:5002
2. 点击"还没有账号？立即注册"
3. 输入用户名、邮箱、密码注册
4. 注册成功后自动登录，进入系统

## 数据库配置

默认数据库配置在 `career-planner-backend/app/core/config.py`：

```python
DATABASE_URL: str = "postgresql+asyncpg://postgres:123456@localhost:5432/career_planner"
```

如果你的 PostgreSQL 密码不是 `123456`，请修改此配置。

## 功能模块

| 模块 | 状态 | 说明 |
|------|------|------|
| 登录/注册 | ✅ | 完整可用，密码 bcrypt 哈希存储 |
| 学生画像 | ⚠️ | 页面完成，接口占位 |
| 岗位探索 | ⚠️ | 静态页面 |
| 职业规划 | ⚠️ | 静态页面 |
| AI助手 | ⚠️ | 静态页面 |
| 报告中心 | ⚠️ | 静态页面 |

## 常见问题

### 1. 数据库连接失败
- 确保 PostgreSQL 服务已启动
- 检查数据库 `career_planner` 是否已创建
- 检查用户名密码是否正确（默认 postgres/123456）

### 2. 前端请求跨域错误
- 确保后端服务已启动在 8000 端口
- 后端已配置 CORS 允许所有来源

### 3. 数据库迁移失败
```bash
# 重新初始化迁移
alembic downgrade base
alembic upgrade head
```

### 4. Python 依赖安装失败
```bash
# 升级 pip
python -m pip install --upgrade pip

# 重新安装
pip install -r requirements.txt
```

## License

MIT
