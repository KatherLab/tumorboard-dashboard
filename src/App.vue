<script setup lang="ts">
import { onMounted, onUnmounted } from 'vue'
import { useCasesStore } from './stores/cases'
import AppHeader from './components/AppHeader.vue'
import PatientHistory from './components/PatientHistory.vue'
import ComparisonPane from './components/ComparisonPane.vue'
import EvaluationSidebar from './components/EvaluationSidebar.vue'

const store = useCasesStore()

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
    store.previousCase()
  } else if (e.key === 'ArrowRight') {
    e.preventDefault()
    store.nextCase()
  }
}
</script>

<template>
  <div class="h-screen w-screen flex flex-col overflow-hidden bg-gray-100">
    <AppHeader />

    <main v-if="store.isInitialized && store.currentCase" class="flex-1 flex overflow-hidden">
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

    <div v-else class="flex-1 flex items-center justify-center">
      <div class="text-center">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
        <p class="text-gray-600">Loading cases...</p>
      </div>
    </div>
  </div>
</template>
