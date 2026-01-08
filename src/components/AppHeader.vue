<script setup lang="ts">
import { ref, computed } from 'vue'
import { useCasesStore } from '../stores/cases'

const store = useCasesStore()
const fileInput = ref<HTMLInputElement | null>(null)
const importError = ref<string | null>(null)
const importSuccess = ref<string | null>(null)

const isArenaMode = computed(() => store.activeTab === 'arena')
const currentIdx = computed(() => isArenaMode.value ? store.arenaIndex : store.currentIndex)
const completedCount = computed(() => isArenaMode.value ? store.completedArenaJudgments : store.completedEvaluations)

function goToPrevious() {
  if (isArenaMode.value) {
    store.previousArenaCase()
  } else {
    store.previousCase()
  }
}

function goToNext() {
  if (isArenaMode.value) {
    store.nextArenaCase()
  } else {
    store.nextCase()
  }
}

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
  <header class="h-16 flex-shrink-0 bg-gradient-to-r from-brand-600 to-brand-500 shadow-lg">
    <div class="h-full px-4 flex items-center justify-between">
      <!-- Left: Logo and Navigation -->
      <div class="flex items-center gap-4">
        <img
          src="https://jnkather.github.io/images/logo.png"
          alt="Kather Lab Logo"
          class="h-10 w-auto"
        />
        <div class="flex items-center gap-2">
          <button
            @click="goToPrevious"
            :disabled="currentIdx === 0"
            class="btn-header flex items-center gap-1"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 19l-7-7 7-7" />
            </svg>
            Previous
          </button>
          <button
            @click="goToNext"
            :disabled="currentIdx === store.totalCases - 1"
            class="btn-header flex items-center gap-1"
          >
            Next
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5l7 7-7 7" />
            </svg>
          </button>
        </div>
      </div>

      <!-- Center: Title, Tabs, and Progress -->
      <div class="flex flex-col items-center">
        <div class="flex items-center gap-4">
          <h1 class="text-lg font-bold text-white">TumorBoardAI</h1>
          <!-- Tab Navigation -->
          <div class="flex bg-white/20 rounded-lg p-1">
            <button
              @click="store.setActiveTab('evaluator')"
              :class="[
                'px-3 py-1 text-sm font-medium rounded-md transition-all duration-200',
                store.activeTab === 'evaluator'
                  ? 'bg-white text-brand-600 shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              ]"
            >
              Evaluator
            </button>
            <button
              @click="store.setActiveTab('arena')"
              :class="[
                'px-3 py-1 text-sm font-medium rounded-md transition-all duration-200',
                store.activeTab === 'arena'
                  ? 'bg-white text-brand-600 shadow-sm'
                  : 'text-white/80 hover:text-white hover:bg-white/10'
              ]"
            >
              Arena
            </button>
          </div>
        </div>
        <div class="flex items-center gap-3 text-sm">
          <span class="font-semibold text-accent-light">
            Case {{ currentIdx + 1 }} of {{ store.totalCases }}
          </span>
          <span class="text-white/50">|</span>
          <span class="text-white/80">
            {{ completedCount }} {{ isArenaMode ? 'judged' : 'evaluated' }}
          </span>
        </div>
      </div>

      <!-- Right: Import/Export -->
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
          class="btn-header flex items-center gap-1"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12" />
          </svg>
          Import
        </button>
        <button
          @click="handleExport"
          class="btn-header-primary flex items-center gap-1"
        >
          <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-4l-4 4m0 0l-4-4m4 4V4" />
          </svg>
          Export
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
