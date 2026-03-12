<template>
  <div class="home-page">
    <!-- 使用步骤 -->
    <el-card class="steps-card">
      <h2 class="section-title">使用步骤</h2>
      <div class="steps-grid">
        <div class="step-item">
          <div class="step-number">1</div>
          <div class="step-content">
            <h3>创建学生画像</h3>
            <p>填写个人信息、技能、经历，或上传简历自动生成能力画像</p>
          </div>
        </div>
        <div class="step-item">
          <div class="step-number">2</div>
          <div class="step-content">
            <h3>探索目标岗位</h3>
            <p>浏览海量岗位库，使用筛选功能找到适合的职业方向</p>
          </div>
        </div>
        <div class="step-item">
          <div class="step-number">3</div>
          <div class="step-content">
            <h3>制定职业规划</h3>
            <p>基于人岗匹配分析，获得个性化职业发展路径和行动建议</p>
          </div>
        </div>
      </div>
    </el-card>

    <!-- 功能卡片 -->
    <div class="features-grid">
      <el-card class="feature-card">
        <template #header>
          <div class="card-header">
            <span class="title">岗位探索</span>
          </div>
        </template>
        <p class="feature-desc">海量岗位库，支持多维度筛选与关联图谱分析</p>
        <el-button type="primary" plain class="feature-btn">立即使用</el-button>
      </el-card>

      <el-card class="feature-card">
        <template #header>
          <div class="card-header">
            <span class="title">学生画像</span>
          </div>
        </template>
        <p class="feature-desc">上传简历生成能力画像，可视化能力雷达图</p>
        <el-button type="primary" plain class="feature-btn">立即使用</el-button>
      </el-card>

      <el-card class="feature-card">
        <template #header>
          <div class="card-header">
            <span class="title">职业规划</span>
          </div>
        </template>
        <p class="feature-desc">匹配目标岗位，生成分阶段行动路径与计划</p>
        <el-button type="primary" plain class="feature-btn">立即使用</el-button>
      </el-card>
    </div>

    <!-- 热门岗位推荐 -->
    <el-card class="hot-jobs-card">
      <template #header>
        <span class="card-title">热门岗位推荐</span>
      </template>
      <div class="jobs-grid">
        <div class="job-item" v-for="job in hotJobs" :key="job.name">
          <h4 class="job-name">{{ job.name }}</h4>
          <p class="job-info">{{ job.industry }} / 校招 / {{ job.salary }}</p>
          <div class="job-tags">
            <el-tag type="success" size="small">热门</el-tag>
            <span class="match-score">匹配度 {{ job.match }}%</span>
          </div>
        </div>
      </div>
    </el-card>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'

const hotJobs = ref([
  { name: 'Java开发工程师', industry: '互联网', salary: '10-15K', match: 85 },
  { name: '产品经理', industry: '互联网', salary: '8-12K', match: 78 },
  { name: '数据分析师', industry: '金融', salary: '9-14K', match: 82 },
  { name: '前端开发工程师', industry: '互联网', salary: '12-18K', match: 88 },
  { name: '算法工程师', industry: 'AI', salary: '15-25K', match: 75 },
  { name: '运营专员', industry: '互联网', salary: '7-11K', match: 80 }
])
</script>

<style scoped lang="scss">
.home-page {
  padding: 0;
}

.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  color: #303133;
  margin-bottom: 1.5rem;
}

.steps-card {
  margin-bottom: 1.5rem;
  background: linear-gradient(to right, #eff6ff, #eef2ff);
}

.steps-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.step-item {
  display: flex;
  gap: 1rem;
}

.step-number {
  width: 48px;
  height: 48px;
  border-radius: 50%;
  background: #409eff;
  color: white;
  display: flex;
  align-items: center;
  justify-content: center;
  font-size: 1.25rem;
  font-weight: bold;
  flex-shrink: 0;
}

.step-content {
  h3 {
    font-weight: bold;
    color: #303133;
    margin-bottom: 0.25rem;
  }

  p {
    font-size: 0.875rem;
    color: #606266;
  }
}

.features-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1.5rem;
  margin-bottom: 1.5rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.feature-card {
  .card-header {
    .title {
      font-size: 1.125rem;
      font-weight: 600;
    }
  }

  .feature-desc {
    color: #606266;
    margin-bottom: 1rem;
  }

  .feature-btn {
    width: 100%;
  }
}

.hot-jobs-card {
  .card-title {
    font-weight: bold;
    font-size: 1.125rem;
  }
}

.jobs-grid {
  display: grid;
  grid-template-columns: repeat(3, 1fr);
  gap: 1rem;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.job-item {
  border: 1px solid #e4e7ed;
  border-radius: 8px;
  padding: 1rem;
  cursor: pointer;
  transition: all 0.3s;

  &:hover {
    border-color: #409eff;
  }
}

.job-name {
  font-weight: 500;
  margin-bottom: 0.5rem;
}

.job-info {
  font-size: 0.75rem;
  color: #606266;
  margin-bottom: 0.5rem;
}

.job-tags {
  display: flex;
  align-items: center;
  font-size: 0.75rem;
  color: #606266;

  .match-score {
    margin-left: 0.5rem;
  }
}
</style>
