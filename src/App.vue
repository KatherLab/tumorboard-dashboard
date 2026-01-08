<script setup lang="ts">
import { onMounted, onUnmounted, computed } from 'vue'
import { useCasesStore } from './stores/cases'
import AppHeader from './components/AppHeader.vue'
import PatientHistory from './components/PatientHistory.vue'
import ComparisonPane from './components/ComparisonPane.vue'
import EvaluationSidebar from './components/EvaluationSidebar.vue'
import ArenaView from './components/ArenaView.vue'

const store = useCasesStore()

const isArenaMode = computed(() => store.activeTab === 'arena')

onMounted(() => {
  store.initializeState()
  window.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  window.removeEventListener('keydown', handleKeydown)
})

function handleKeydown(e: KeyboardEvent) {
  if (e.target instanceof HTMLInputElement ||
      e.target instanceof HTMLTextAreaElement ||
      e.target instanceof HTMLSelectElement) {
    return
  }

  if (e.key === 'ArrowLeft') {
    e.preventDefault()
    if (isArenaMode.value) {
      store.previousArenaCase()
    } else {
      store.previousCase()
    }
  } else if (e.key === 'ArrowRight') {
    e.preventDefault()
    if (isArenaMode.value) {
      store.nextArenaCase()
    } else {
      store.nextCase()
    }
  }
}
</script>

<template>
  <div class="h-screen w-screen flex flex-col overflow-hidden bg-gray-100">
    <AppHeader />

    <!-- Evaluator Mode -->
    <main v-if="store.isInitialized && store.currentCase && !isArenaMode" class="flex-1 flex overflow-hidden">
      <div class="flex-1 flex flex-col overflow-hidden p-4 gap-4">
        <PatientHistory
          :patient-history="store.currentCase.patientHistory"
          class="h-[40%] flex-shrink-0"
        />

        <ComparisonPane
          :ground-truth="store.currentCase.groundTruth"
          :ai-output="store.currentCase.aiOutput"
          class="flex-1 min-h-0"
        />
      </div>

      <EvaluationSidebar class="w-80 flex-shrink-0" />
    </main>

    <!-- Arena Mode -->
    <main v-else-if="store.isInitialized && store.currentArenaCase && isArenaMode" class="flex-1 flex overflow-hidden">
      <ArenaView class="flex-1" />
    </main>

    <!-- Loading State -->
    <div v-else class="flex-1 flex items-center justify-center">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p class="text-gray-600">Loading cases...</p>
      </div>
    </div>
  </div>
</template>
