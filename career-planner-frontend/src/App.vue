<script setup lang="ts">
import { computed } from 'vue'
import { useRoute } from 'vue-router'
import DashboardLayout from '@/components/DashboardLayout.vue'

const route = useRoute()

const isLoginPage = computed(() => route.path === '/login')
</script>

<template>
  <DashboardLayout v-if="!isLoginPage">
    <router-view />
  </DashboardLayout>
  <router-view v-else />
</template>

<style scoped>
</style>
