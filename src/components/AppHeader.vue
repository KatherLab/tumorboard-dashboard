<script setup lang="ts">
import { ref } from 'vue'
import { useCasesStore } from '../stores/cases'

const store = useCasesStore()
const fileInput = ref<HTMLInputElement | null>(null)
const importError = ref<string | null>(null)
const importSuccess = ref<string | null>(null)

function triggerImport() {
  fileInput.value?.click()
}

async function handleFileImport(event: Event) {
  const target = event.target as HTMLInputElement
  const file = target.files?.[0]

  if (!file) return

  importError.value = null
  importSuccess.value = null

  try {
    const text = await file.text()
    const data = JSON.parse(text)
    const result = store.importCases(data)

    if (result.success) {
      importSuccess.value = result.message
      setTimeout(() => { importSuccess.value = null }, 3000)
    } else {
      importError.value = result.message
      setTimeout(() => { importError.value = null }, 5000)
    }
  } catch (e) {
    importError.value = 'Failed to parse JSON file. Please ensure the file is valid JSON.'
    setTimeout(() => { importError.value = null }, 5000)
  }

  target.value = ''
}

function handleExport() {
  const jsonData = store.exportCases()
  const blob = new Blob([jsonData], { type: 'application/json' })
  const url = URL.createObjectURL(blob)
  const a = document.createElement('a')
  a.href = url
  a.download = store.getExportFilename()
  document.body.appendChild(a)
  a.click()
  document.body.removeChild(a)
  URL.revokeObjectURL(url)
}
</script>

<template>
  <header class="h-16 flex-shrink-0 bg-white border-b border-gray-200 shadow-sm">
    <div class="h-full px-4 flex items-center justify-between">
      <div class="flex items-center gap-2">
        <button
          @click="store.previousCase"
          :disabled="store.currentIndex === 0"
          class="btn btn-outline flex items-center gap-1"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
          </svg>
          Previous
        </button>
        <button
          @click="store.nextCase"
          :disabled="store.currentIndex === store.totalCases - 1"
          class="btn btn-outline flex items-center gap-1"
        >
          Next
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
          </svg>
        </button>
      </div>

      <div class="flex flex-col items-center">
        <h1 class="text-lg font-bold text-gray-900">TumorBoardAI Evaluator</h1>
        <div class="flex items-center gap-3 text-sm">
          <span class="font-semibold text-blue-600">
            Case {{ store.currentIndex + 1 }} of {{ store.totalCases }}
          </span>
          <span class="text-gray-400">|</span>
          <span class="text-gray-600">
            {{ store.completedEvaluations }} evaluated
          </span>
        </div>
      </div>

      <div class="flex items-center gap-2">
        <input
          ref="fileInput"
          type="file"
          accept=".json"
          class="hidden"
          @change="handleFileImport"
        />
        <button
          @click="triggerImport"
          class="btn btn-outline flex items-center gap-1"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Import JSON
        </button>
        <button
          @click="handleExport"
          class="btn btn-primary flex items-center gap-1"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export JSON
        </button>
      </div>
    </div>

    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="importError"
        class="absolute top-16 left-1/2 -translate-x-1/2 mt-2 px-4 py-2 bg-red-100 border border-red-300 text-red-700 rounded-lg shadow-lg z-50"
      >
        {{ importError }}
      </div>
    </Transition>

    <Transition
      enter-active-class="transition-all duration-300 ease-out"
      enter-from-class="opacity-0 -translate-y-2"
      enter-to-class="opacity-100 translate-y-0"
      leave-active-class="transition-all duration-200 ease-in"
      leave-from-class="opacity-100 translate-y-0"
      leave-to-class="opacity-0 -translate-y-2"
    >
      <div
        v-if="importSuccess"
        class="absolute top-16 left-1/2 -translate-x-1/2 mt-2 px-4 py-2 bg-green-100 border border-green-300 text-green-700 rounded-lg shadow-lg z-50"
      >
        {{ importSuccess }}
      </div>
    </Transition>
  </header>
</template>
