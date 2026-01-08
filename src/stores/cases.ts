import { defineStore } from 'pinia'
import { ref, computed, watch } from 'vue'
import type { Case, Evaluation, ArenaJudgment, ArenaPreference } from '../types'
import { createEmptyEvaluation, createEmptyArenaJudgment, validateCasesArray } from '../types'
import { dummyCases } from '../data/dummyCases'

const STORAGE_KEY = 'tumorboard-evaluator-state'

interface StoredState {
  cases: Case[]
  currentIndex: number
  arenaIndex: number
  activeTab: 'evaluator' | 'arena'
}

export const useCasesStore = defineStore('cases', () => {
  const cases = ref<Case[]>([])
  const currentIndex = ref(0)
  const arenaIndex = ref(0)
  const isInitialized = ref(false)
  const activeTab = ref<'evaluator' | 'arena'>('evaluator')

  const currentCase = computed(() => cases.value[currentIndex.value] || null)
  const currentArenaCase = computed(() => cases.value[arenaIndex.value] || null)
  const totalCases = computed(() => cases.value.length)

  const completedEvaluations = computed(() =>
    cases.value.filter(c => c.evaluation && c.evaluation.correctness !== null).length
  )

  const completedArenaJudgments = computed(() =>
    cases.value.filter(c => c.arenaJudgment && c.arenaJudgment.preference !== null).length
  )

  const hasUnsavedChanges = computed(() => {
    return cases.value.some(c =>
      (c.evaluation && c.evaluation.correctness !== null) ||
      (c.arenaJudgment && c.arenaJudgment.preference !== null)
    )
  })

  function initializeState() {
    const stored = localStorage.getItem(STORAGE_KEY)

    if (stored) {
      try {
        const parsed: StoredState = JSON.parse(stored)
        if (validateCasesArray(parsed.cases) && parsed.cases.length > 0) {
          cases.value = parsed.cases
          currentIndex.value = Math.min(parsed.currentIndex || 0, parsed.cases.length - 1)
          arenaIndex.value = Math.min(parsed.arenaIndex || 0, parsed.cases.length - 1)
          activeTab.value = parsed.activeTab || 'evaluator'
          isInitialized.value = true
          return
        }
      } catch (e) {
        console.warn('Failed to parse stored state, using defaults:', e)
      }
    }

    cases.value = JSON.parse(JSON.stringify(dummyCases))
    currentIndex.value = 0
    arenaIndex.value = 0
    activeTab.value = 'evaluator'
    isInitialized.value = true
  }

  function saveToStorage() {
    const state: StoredState = {
      cases: cases.value,
      currentIndex: currentIndex.value,
      arenaIndex: arenaIndex.value,
      activeTab: activeTab.value
    }
    localStorage.setItem(STORAGE_KEY, JSON.stringify(state))
  }

  watch(
    [cases, currentIndex, arenaIndex, activeTab],
    () => {
      if (isInitialized.value) {
        saveToStorage()
      }
    },
    { deep: true }
  )

  function setActiveTab(tab: 'evaluator' | 'arena') {
    activeTab.value = tab
  }

  function navigateToCase(index: number) {
    if (index >= 0 && index < cases.value.length) {
      currentIndex.value = index
    }
  }

  function nextCase() {
    if (currentIndex.value < cases.value.length - 1) {
      currentIndex.value++
    }
  }

  function previousCase() {
    if (currentIndex.value > 0) {
      currentIndex.value--
    }
  }

  function navigateToArenaCase(index: number) {
    if (index >= 0 && index < cases.value.length) {
      arenaIndex.value = index
    }
  }

  function nextArenaCase() {
    if (arenaIndex.value < cases.value.length - 1) {
      arenaIndex.value++
    }
  }

  function previousArenaCase() {
    if (arenaIndex.value > 0) {
      arenaIndex.value--
    }
  }

  function updateCurrentEvaluation(evaluation: Partial<Evaluation>) {
    if (!currentCase.value) return

    if (!currentCase.value.evaluation) {
      currentCase.value.evaluation = createEmptyEvaluation()
    }

    Object.assign(currentCase.value.evaluation, evaluation)
  }

  function resetCurrentEvaluation() {
    if (!currentCase.value) return
    currentCase.value.evaluation = createEmptyEvaluation()
  }

  function updateArenaJudgment(judgment: Partial<ArenaJudgment>) {
    if (!currentArenaCase.value) return

    if (!currentArenaCase.value.arenaJudgment) {
      currentArenaCase.value.arenaJudgment = createEmptyArenaJudgment()
    }

    Object.assign(currentArenaCase.value.arenaJudgment, {
      ...judgment,
      timestamp: Date.now()
    })
  }

  function setArenaPreference(preference: ArenaPreference) {
    updateArenaJudgment({ preference })
  }

  function resetArenaJudgment() {
    if (!currentArenaCase.value) return
    currentArenaCase.value.arenaJudgment = createEmptyArenaJudgment()
  }

  function importCases(data: unknown): { success: boolean; message: string } {
    if (!validateCasesArray(data)) {
      return {
        success: false,
        message: 'Invalid data format. Expected an array of case objects with required fields: id, patientHistory, groundTruth, aiOutput (with reasoningTrace and recommendation).'
      }
    }

    if (data.length === 0) {
      return { success: false, message: 'The imported file contains no cases.' }
    }

    cases.value = data
    currentIndex.value = 0
    arenaIndex.value = 0
    return { success: true, message: `Successfully imported ${data.length} cases.` }
  }

  function exportCases(): string {
    return JSON.stringify(cases.value, null, 2)
  }

  function getExportFilename(): string {
    const now = new Date()
    const timestamp = now.toISOString().replace(/[:.]/g, '-').slice(0, 19)
    return `tumorboard-evaluation-${timestamp}.json`
  }

  function clearStorage() {
    localStorage.removeItem(STORAGE_KEY)
  }

  function resetToDefaults() {
    cases.value = JSON.parse(JSON.stringify(dummyCases))
    currentIndex.value = 0
    arenaIndex.value = 0
  }

  return {
    cases,
    currentIndex,
    arenaIndex,
    isInitialized,
    activeTab,
    currentCase,
    currentArenaCase,
    totalCases,
    completedEvaluations,
    completedArenaJudgments,
    hasUnsavedChanges,
    initializeState,
    setActiveTab,
    navigateToCase,
    nextCase,
    previousCase,
    navigateToArenaCase,
    nextArenaCase,
    previousArenaCase,
    updateCurrentEvaluation,
    resetCurrentEvaluation,
    updateArenaJudgment,
    setArenaPreference,
    resetArenaJudgment,
    importCases,
    exportCases,
    getExportFilename,
    clearStorage,
    resetToDefaults
  }
})
