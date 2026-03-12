<template>
  <div class="student-profile-page">
    <h1 class="page-title">学生画像</h1>
    <p class="page-desc">创建你的学生画像，为职业规划提供基础数据支持</p>

    <!-- 入口选择 -->
    <div class="mode-cards" v-if="!mode">
      <el-card class="mode-card">
        <div class="mode-content">
          <div class="mode-icon blue">
            <el-icon :size="32"><Edit /></el-icon>
          </div>
          <h3 class="mode-title">自定义学生画像</h3>
          <p class="mode-desc">手动填写个人信息、技能、经历等，创建专属学生画像</p>
          <el-button type="primary" @click="handleCustomMode">开始填写</el-button>
        </div>
      </el-card>

      <el-card class="mode-card">
        <div class="mode-content">
          <div class="mode-icon green">
            <el-icon :size="32"><Upload /></el-icon>
          </div>
          <h3 class="mode-title">上传简历完成画像</h3>
          <p class="mode-desc">上传PDF或Word格式的简历，系统自动解析生成学生画像</p>
          <el-button type="success" @click="handleUploadMode">上传简历</el-button>
        </div>
      </el-card>
    </div>

    <!-- 上传简历模式 -->
    <div v-else-if="mode === 'upload'">
      <el-button @click="mode = null" class="back-btn">← 返回</el-button>
      <h2 class="section-title">简历上传与解析</h2>

      <el-card class="upload-card">
        <div
          class="upload-area"
          :class="{ 'has-file': uploadedFile }"
          @dragover.prevent
          @drop.prevent="handleDrop"
        >
          <el-icon :size="64" class="upload-icon">
            <Upload />
          </el-icon>
          <p class="upload-text">
            {{ uploadedFile ? `已选择文件: ${uploadedFile.name}` : '点击或拖拽简历文件至此处上传（支持PDF/Word）' }}
          </p>
          <p class="upload-hint">上传后系统将自动解析你的技能、经历等信息</p>
          <input
            type="file"
            ref="fileInput"
            accept=".pdf,.doc,.docx"
            @change="handleFileChange"
            style="display: none"
          />
          <el-button type="primary" @click="($refs.fileInput as any)?.click()">选择文件</el-button>
        </div>
        <div class="upload-actions">
          <el-button type="success" :disabled="!uploadedFile" :loading="loading" @click="handleUploadGenerate">
            {{ loading ? '生成中...' : '生成画像' }}
          </el-button>
        </div>
      </el-card>
    </div>

    <!-- 自定义画像模式 -->
    <div v-else-if="mode === 'custom'">
      <el-button @click="mode = null" class="back-btn">← 返回</el-button>
      <h2 class="section-title">自定义学生画像</h2>

      <el-card class="form-card">
        <template #header>
          <span class="card-title">基本信息</span>
        </template>
        <el-form label-position="top">
          <el-form-item label="姓名 *" required>
            <el-input v-model="formData.name" />
          </el-form-item>
          <el-row :gutter="16">
            <el-col :span="12">
              <el-form-item label="性别">
                <el-select v-model="formData.gender" placeholder="请选择">
                  <el-option label="男" value="男" />
                  <el-option label="女" value="女" />
                </el-select>
              </el-form-item>
            </el-col>
            <el-col :span="12">
              <el-form-item label="年龄">
                <el-input v-model="formData.age" type="number" />
              </el-form-item>
            </el-col>
          </el-row>
          <el-form-item label="学校 *" required>
            <el-input v-model="formData.school" />
          </el-form-item>
          <el-form-item label="专业 *" required>
            <el-input v-model="formData.major" />
          </el-form-item>
          <el-form-item label="学历 *">
            <el-select v-model="formData.education">
              <el-option label="本科" value="本科" />
              <el-option label="硕士" value="硕士" />
              <el-option label="博士" value="博士" />
            </el-select>
          </el-form-item>
        </el-form>
      </el-card>

      <el-card class="form-card">
        <template #header>
          <span class="card-title">技能证书</span>
        </template>
        <el-form label-position="top">
          <el-form-item label="专业技能">
            <el-input v-model="formData.skills" placeholder="用逗号分隔，如：Python, Java, React" />
          </el-form-item>
          <el-form-item label="证书">
            <el-input v-model="formData.certificates" placeholder="用逗号分隔，如：CET-6, 软考中级" />
          </el-form-item>
        </el-form>
      </el-card>

      <el-card class="form-card">
        <template #header>
          <span class="card-title">经历描述</span>
        </template>
        <el-form label-position="top">
          <el-form-item label="实习/项目经历">
            <el-input
              v-model="formData.experience"
              type="textarea"
              :rows="4"
              placeholder="每行描述一个经历"
            />
          </el-form-item>
        </el-form>
      </el-card>

      <el-card class="form-card">
        <template #header>
          <span class="card-title">能力画像雷达图</span>
        </template>
        <div class="radar-placeholder">
          <template v-if="profile?.ability_scores">
            <p>能力画像已生成</p>
            <div class="ability-scores">
              <div v-for="(score, name) in profile.ability_scores" :key="name" class="ability-item">
                <span class="ability-name">{{ name }}</span>
                <el-progress :percentage="score" :stroke-width="10" />
              </div>
            </div>
          </template>
          <template v-else>
            <p>📊 填写完整信息后点击"生成画像"按钮</p>
            <p class="hint">系统将基于您填写的信息自动生成能力画像雷达图</p>
          </template>
        </div>
      </el-card>

      <div class="submit-area">
        <el-button type="primary" size="large" :loading="loading" @click="handleSubmit">
          {{ loading ? '生成中...' : profile ? '更新画像' : '生成画像' }}
        </el-button>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { ref, onMounted } from 'vue'
import { ElMessage } from 'element-plus'
import { Edit, Upload } from '@element-plus/icons-vue'
import { getStudentProfile, saveStudentProfile, uploadResume } from '@/api/student'

interface ProfileData {
  id?: number
  name?: string
  gender?: string
  age?: number
  school?: string
  major?: string
  education?: string
  skills?: string[]
  certificates?: string[]
  experience?: string[]
  ability_scores?: Record<string, number>
}

const mode = ref<'custom' | 'upload' | null>(null)
const uploadedFile = ref<File | null>(null)
const loading = ref(false)
const profile = ref<ProfileData | null>(null)

const formData = ref({
  name: '',
  gender: '',
  age: '',
  school: '',
  major: '',
  education: '本科',
  skills: '',
  certificates: '',
  experience: ''
})

// 获取学生画像
const fetchProfile = async () => {
  try {
    const data = await getStudentProfile()
    if (data) {
      profile.value = data
      // 填充表单数据
      formData.value = {
        name: data.name || '',
        gender: data.gender || '',
        age: data.age?.toString() || '',
        school: data.school || '',
        major: data.major || '',
        education: data.education || '本科',
        skills: data.skills?.join(', ') || '',
        certificates: data.certificates?.join(', ') || '',
        experience: data.experience?.join('\n') || ''
      }
    }
  } catch (error) {
    console.error('获取学生画像失败:', error)
  }
}

// 页面加载时获取画像
onMounted(() => {
  fetchProfile()
})

// 自定义画像模式
const handleCustomMode = () => {
  mode.value = 'custom'
}

// 上传简历模式
const handleUploadMode = () => {
  mode.value = 'upload'
}

// 文件选择
const handleFileChange = (e: Event) => {
  const target = e.target as HTMLInputElement
  const file = target.files?.[0]
  if (file) {
    uploadedFile.value = file
  }
}

// 拖拽上传
const handleDrop = (e: DragEvent) => {
  const file = e.dataTransfer?.files[0]
  if (file) {
    uploadedFile.value = file
  }
}

// 上传简历生成画像
const handleUploadGenerate = async () => {
  if (!uploadedFile.value) return

  loading.value = true
  try {
    const formDataUpload = new FormData()
    formDataUpload.append('file', uploadedFile.value)

    const result = await uploadResume(formDataUpload)
    ElMessage.success(result.message || '简历上传成功！')
    mode.value = null
  } catch (error: any) {
    ElMessage.error(error.message || '上传失败')
  } finally {
    loading.value = false
  }
}

// 提交表单
const handleSubmit = async () => {
  // 必填字段验证
  if (!formData.value.name || !formData.value.school || !formData.value.major) {
    ElMessage.warning('请填写必填字段：姓名、学校、专业')
    return
  }

  loading.value = true
  try {
    const result = await saveStudentProfile({
      name: formData.value.name,
      gender: formData.value.gender,
      age: formData.value.age ? parseInt(formData.value.age) : undefined,
      school: formData.value.school,
      major: formData.value.major,
      education: formData.value.education,
      skills: formData.value.skills.split(',').map(s => s.trim()).filter(Boolean),
      certificates: formData.value.certificates.split(',').map(s => s.trim()).filter(Boolean),
      experience: formData.value.experience.split('\n').map(s => s.trim()).filter(Boolean)
    })

    ElMessage.success(result.message || '学生画像保存成功！')
    mode.value = null
  } catch (error: any) {
    ElMessage.error(error.message || '保存失败，请稍后重试')
  } finally {
    loading.value = false
  }
}
</script>

<style scoped lang="scss">
.student-profile-page {
  .page-title {
    font-size: 1.5rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .page-desc {
    color: #606266;
    margin-bottom: 2rem;
  }
}

.mode-cards {
  display: grid;
  grid-template-columns: repeat(2, 1fr);
  gap: 1.5rem;
  max-width: 800px;

  @media (max-width: 768px) {
    grid-template-columns: 1fr;
  }
}

.mode-card {
  .mode-content {
    text-align: center;
    padding: 1rem;
  }

  .mode-icon {
    width: 64px;
    height: 64px;
    border-radius: 50%;
    display: inline-flex;
    align-items: center;
    justify-content: center;
    margin-bottom: 1rem;

    &.blue {
      background: #ecf5ff;
      color: #409eff;
    }

    &.green {
      background: #f0f9eb;
      color: #67c23a;
    }
  }

  .mode-title {
    font-size: 1.25rem;
    font-weight: bold;
    margin-bottom: 0.5rem;
  }

  .mode-desc {
    color: #606266;
    font-size: 0.875rem;
    margin-bottom: 1rem;
  }
}

.back-btn {
  margin-bottom: 1rem;
}

.section-title {
  font-size: 1.5rem;
  font-weight: bold;
  margin-bottom: 1rem;
}

.upload-card {
  max-width: 600px;
  margin: 0 auto;
}

.upload-area {
  border: 2px dashed #dcdfe6;
  border-radius: 8px;
  padding: 3rem;
  text-align: center;
  transition: all 0.3s;

  &.has-file {
    border-color: #67c23a;
    background: #f0f9eb;
  }

  &:hover {
    border-color: #409eff;
  }
}

.upload-icon {
  color: #c0c4cc;
  margin-bottom: 1rem;
}

.upload-text {
  color: #606266;
  margin-bottom: 0.5rem;
}

.upload-hint {
  font-size: 0.875rem;
  color: #909399;
  margin-bottom: 1rem;
}

.upload-actions {
  margin-top: 1.5rem;
  text-align: center;
}

.form-card {
  margin-bottom: 1.5rem;

  .card-title {
    font-weight: 600;
  }

  :deep(.el-select) {
    width: 100%;
  }
}

.radar-placeholder {
  text-align: center;
  padding: 3rem;
  background: #f5f7fa;
  border-radius: 8px;
  color: #606266;

  .hint {
    font-size: 0.875rem;
    color: #909399;
    margin-top: 0.5rem;
  }

  .ability-scores {
    margin-top: 1rem;
    text-align: left;

    .ability-item {
      margin-bottom: 1rem;

      .ability-name {
        display: block;
        margin-bottom: 0.5rem;
        font-weight: 500;
      }
    }
  }
}

.submit-area {
  text-align: center;
  margin-top: 1.5rem;

  :deep(.el-button) {
    width: 300px;
  }
}
</style>
