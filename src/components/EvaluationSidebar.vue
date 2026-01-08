<script setup lang="ts">
import { computed, watch } from 'vue'
import { useCasesStore } from '../stores/cases'
import type { CorrectnessLevel, ReasoningQuality, MismatchExplanation } from '../types'
import { createEmptyEvaluation } from '../types'

const store = useCasesStore()

const evaluation = computed(() => {
  if (!store.currentCase) return createEmptyEvaluation()
  if (!store.currentCase.evaluation) {
    store.currentCase.evaluation = createEmptyEvaluation()
  }
  return store.currentCase.evaluation
})

const completionPercentage = computed(() => {
  const fields = [
    evaluation.value.correctness !== null,
    evaluation.value.reasoningQuality !== null,
    evaluation.value.matchesGroundTruth !== null,
    evaluation.value.matchesGroundTruth === false ? evaluation.value.mismatchExplanation !== null : true
  ]
  const completed = fields.filter(Boolean).length
  return Math.round((completed / fields.length) * 100)
})

const isComplete = computed(() => completionPercentage.value === 100)

watch(() => evaluation.value.matchesGroundTruth, (newVal) => {
  if (newVal === true && evaluation.value.mismatchExplanation !== null) {
    store.updateCurrentEvaluation({ mismatchExplanation: null })
  }
})

function updateCorrectness(value: string) {
  store.updateCurrentEvaluation({
    correctness: value === '' ? null : value as CorrectnessLevel
  })
}

function updateReasoningQuality(value: string) {
  store.updateCurrentEvaluation({
    reasoningQuality: value === '' ? null : value as ReasoningQuality
  })
}

function updateRedFlags(value: boolean) {
  store.updateCurrentEvaluation({ redFlags: value })
}

function updateHarmToPatient(value: boolean) {
  store.updateCurrentEvaluation({ harmToPatient: value })
}

function updateMatchesGroundTruth(value: string) {
  const boolValue = value === '' ? null : value === 'true'
  store.updateCurrentEvaluation({
    matchesGroundTruth: boolValue,
    mismatchExplanation: boolValue !== false ? null : evaluation.value.mismatchExplanation
  })
}

function updateMismatchExplanation(value: string) {
  store.updateCurrentEvaluation({
    mismatchExplanation: value === '' ? null : value as MismatchExplanation
  })
}

function updateNotes(value: string) {
  store.updateCurrentEvaluation({ notes: value })
}

const correctnessConfig = {
  correct: { color: 'emerald', icon: '✓', label: 'Correct' },
  partially_correct: { color: 'amber', icon: '~', label: 'Partial' },
  incorrect: { color: 'red', icon: '✗', label: 'Incorrect' }
}

const reasoningConfig = {
  excellent: { color: 'emerald', stars: 4 },
  good: { color: 'blue', stars: 3 },
  fair: { color: 'amber', stars: 2 },
  poor: { color: 'red', stars: 1 }
}
</script>

<template>
  <aside class="bg-gradient-to-b from-slate-50 to-white border-l border-gray-200 shadow-xl overflow-y-auto scrollbar-thin">
    <div class="p-5 space-y-5">
      <!-- Header with Progress -->
      <div class="bg-white rounded-xl p-4 border border-gray-200 shadow-sm">
        <div class="flex items-center justify-between mb-3">
          <h2 class="text-lg font-bold text-gray-900 flex items-center gap-2">
            <div class="w-8 h-8 rounded-lg bg-gradient-to-br from-blue-500 to-indigo-600 flex items-center justify-center">
              <svg class="w-4 h-4 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4" />
              </svg>
            </div>
            Evaluation
          </h2>
          <div
            class="px-2.5 py-1 rounded-full text-xs font-bold"
            :class="isComplete ? 'bg-emerald-100 text-emerald-700' : 'bg-gray-100 text-gray-600'"
          >
            {{ completionPercentage }}%
          </div>
        </div>

        <!-- Progress Bar -->
        <div class="h-2 bg-gray-200 rounded-full overflow-hidden">
          <div
            class="h-full transition-all duration-500 ease-out rounded-full"
            :class="isComplete ? 'bg-gradient-to-r from-emerald-400 to-emerald-500' : 'bg-gradient-to-r from-blue-400 to-indigo-500'"
            :style="{ width: `${completionPercentage}%` }"
          ></div>
        </div>

        <p class="text-xs text-gray-500 mt-2 font-mono">
          ID: {{ store.currentCase?.id }}
        </p>
      </div>

      <!-- AI Correctness - Card Style -->
      <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div class="px-4 py-3 bg-gradient-to-r from-violet-50 to-purple-50 border-b border-gray-100">
          <label class="text-sm font-bold text-violet-900 flex items-center gap-2">
            <svg class="w-4 h-4 text-violet-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
            </svg>
            AI Output Correctness
          </label>
        </div>
        <div class="p-4">
          <div class="grid grid-cols-3 gap-2">
            <button
              v-for="(config, value) in correctnessConfig"
              :key="value"
              @click="updateCorrectness(evaluation.correctness === value ? '' : value)"
              class="relative p-3 rounded-lg border-2 transition-all duration-200 text-center"
              :class="evaluation.correctness === value
                ? `border-${config.color}-400 bg-${config.color}-50 ring-2 ring-${config.color}-200`
                : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'"
            >
              <div
                class="text-2xl mb-1"
                :class="evaluation.correctness === value ? `text-${config.color}-600` : 'text-gray-400'"
              >{{ config.icon }}</div>
              <div
                class="text-xs font-semibold"
                :class="evaluation.correctness === value ? `text-${config.color}-700` : 'text-gray-600'"
              >{{ config.label }}</div>
              <div
                v-if="evaluation.correctness === value"
                class="absolute top-1 right-1 w-2 h-2 rounded-full"
                :class="`bg-${config.color}-500`"
              ></div>
            </button>
          </div>
        </div>
      </div>

      <!-- Reasoning Quality - Star Rating Style -->
      <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div class="px-4 py-3 bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-gray-100">
          <label class="text-sm font-bold text-blue-900 flex items-center gap-2">
            <svg class="w-4 h-4 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
            </svg>
            Reasoning Quality
          </label>
        </div>
        <div class="p-4 space-y-2">
          <button
            v-for="(config, value) in reasoningConfig"
            :key="value"
            @click="updateReasoningQuality(evaluation.reasoningQuality === value ? '' : value)"
            class="w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all duration-200"
            :class="evaluation.reasoningQuality === value
              ? `border-${config.color}-400 bg-${config.color}-50`
              : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'"
          >
            <span
              class="font-medium capitalize"
              :class="evaluation.reasoningQuality === value ? `text-${config.color}-700` : 'text-gray-700'"
            >{{ value }}</span>
            <div class="flex gap-0.5">
              <template v-for="i in 4" :key="i">
                <svg
                  class="w-5 h-5 transition-colors duration-200"
                  :class="i <= config.stars
                    ? (evaluation.reasoningQuality === value ? `text-${config.color}-500` : 'text-gray-300')
                    : 'text-gray-200'"
                  fill="currentColor"
                  viewBox="0 0 20 20"
                >
                  <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                </svg>
              </template>
            </div>
          </button>
        </div>
      </div>

      <!-- Safety Alerts Section -->
      <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div class="px-4 py-3 bg-gradient-to-r from-orange-50 to-red-50 border-b border-gray-100">
          <label class="text-sm font-bold text-orange-900 flex items-center gap-2">
            <svg class="w-4 h-4 text-orange-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
            </svg>
            Safety Alerts
          </label>
        </div>
        <div class="p-4 space-y-3">
          <!-- Red Flags Toggle -->
          <button
            @click="updateRedFlags(!evaluation.redFlags)"
            class="w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all duration-200"
            :class="evaluation.redFlags
              ? 'border-amber-400 bg-amber-50 ring-2 ring-amber-200'
              : 'border-gray-200 hover:border-amber-200 hover:bg-amber-50/30'"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200"
                :class="evaluation.redFlags ? 'bg-amber-200' : 'bg-gray-100'"
              >
                <svg
                  class="w-5 h-5 transition-colors duration-200"
                  :class="evaluation.redFlags ? 'text-amber-700' : 'text-gray-400'"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 21v-4m0 0V5a2 2 0 012-2h6.5l1 1H21l-3 6 3 6h-8.5l-1-1H5a2 2 0 00-2 2zm9-13.5V9" />
                </svg>
              </div>
              <div class="text-left">
                <div class="font-semibold" :class="evaluation.redFlags ? 'text-amber-800' : 'text-gray-700'">
                  Red Flags
                </div>
                <div class="text-xs" :class="evaluation.redFlags ? 'text-amber-600' : 'text-gray-500'">
                  Clinical concerns observed
                </div>
              </div>
            </div>
            <div
              class="w-12 h-7 rounded-full p-1 transition-colors duration-200"
              :class="evaluation.redFlags ? 'bg-amber-500' : 'bg-gray-300'"
            >
              <div
                class="w-5 h-5 rounded-full bg-white shadow-sm transition-transform duration-200"
                :class="evaluation.redFlags ? 'translate-x-5' : 'translate-x-0'"
              ></div>
            </div>
          </button>

          <!-- Harm to Patient - More Prominent -->
          <button
            @click="updateHarmToPatient(!evaluation.harmToPatient)"
            class="w-full flex items-center justify-between p-3 rounded-lg border-2 transition-all duration-200"
            :class="evaluation.harmToPatient
              ? 'border-red-500 bg-red-50 ring-2 ring-red-300 shadow-lg shadow-red-100'
              : 'border-gray-200 hover:border-red-200 hover:bg-red-50/30'"
          >
            <div class="flex items-center gap-3">
              <div
                class="w-10 h-10 rounded-lg flex items-center justify-center transition-colors duration-200"
                :class="evaluation.harmToPatient ? 'bg-red-200' : 'bg-gray-100'"
              >
                <svg
                  class="w-5 h-5 transition-colors duration-200"
                  :class="evaluation.harmToPatient ? 'text-red-700' : 'text-gray-400'"
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
              </div>
              <div class="text-left">
                <div class="font-semibold" :class="evaluation.harmToPatient ? 'text-red-800' : 'text-gray-700'">
                  Potential Harm
                </div>
                <div class="text-xs" :class="evaluation.harmToPatient ? 'text-red-600' : 'text-gray-500'">
                  Could cause patient harm
                </div>
              </div>
            </div>
            <div
              class="w-6 h-6 rounded border-2 flex items-center justify-center transition-all duration-200"
              :class="evaluation.harmToPatient
                ? 'border-red-500 bg-red-500'
                : 'border-gray-300 bg-white'"
            >
              <svg
                v-if="evaluation.harmToPatient"
                class="w-4 h-4 text-white"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="3" d="M5 13l4 4L19 7" />
              </svg>
            </div>
          </button>
        </div>
      </div>

      <!-- Ground Truth Matching -->
      <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div class="px-4 py-3 bg-gradient-to-r from-green-50 to-emerald-50 border-b border-gray-100">
          <label class="text-sm font-bold text-green-900 flex items-center gap-2">
            <svg class="w-4 h-4 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
            </svg>
            Matches Ground Truth?
          </label>
        </div>
        <div class="p-4">
          <div class="grid grid-cols-2 gap-3">
            <button
              @click="updateMatchesGroundTruth(evaluation.matchesGroundTruth === true ? '' : 'true')"
              class="p-4 rounded-lg border-2 transition-all duration-200 text-center"
              :class="evaluation.matchesGroundTruth === true
                ? 'border-emerald-400 bg-emerald-50 ring-2 ring-emerald-200'
                : 'border-gray-200 hover:border-emerald-200 hover:bg-emerald-50/30'"
            >
              <div class="text-3xl mb-1">✓</div>
              <div
                class="font-semibold"
                :class="evaluation.matchesGroundTruth === true ? 'text-emerald-700' : 'text-gray-600'"
              >Yes</div>
            </button>
            <button
              @click="updateMatchesGroundTruth(evaluation.matchesGroundTruth === false ? '' : 'false')"
              class="p-4 rounded-lg border-2 transition-all duration-200 text-center"
              :class="evaluation.matchesGroundTruth === false
                ? 'border-rose-400 bg-rose-50 ring-2 ring-rose-200'
                : 'border-gray-200 hover:border-rose-200 hover:bg-rose-50/30'"
            >
              <div class="text-3xl mb-1">✗</div>
              <div
                class="font-semibold"
                :class="evaluation.matchesGroundTruth === false ? 'text-rose-700' : 'text-gray-600'"
              >No</div>
            </button>
          </div>

          <!-- Mismatch Explanation -->
          <Transition
            enter-active-class="transition-all duration-300 ease-out"
            enter-from-class="opacity-0 -translate-y-2 max-h-0"
            enter-to-class="opacity-100 translate-y-0 max-h-40"
            leave-active-class="transition-all duration-200 ease-in"
            leave-from-class="opacity-100 translate-y-0 max-h-40"
            leave-to-class="opacity-0 -translate-y-2 max-h-0"
          >
            <div v-if="evaluation.matchesGroundTruth === false" class="mt-4 overflow-hidden">
              <label class="text-xs font-semibold text-rose-700 uppercase tracking-wide mb-2 block">
                Why doesn't it match?
              </label>
              <div class="space-y-2">
                <button
                  v-for="option in [
                    { value: 'ai_better', label: 'AI output is better', icon: '🤖', color: 'blue' },
                    { value: 'human_better', label: 'Human output is better', icon: '👨‍⚕️', color: 'green' },
                    { value: 'ambiguous', label: 'Ambiguous / Unclear', icon: '🤔', color: 'gray' }
                  ]"
                  :key="option.value"
                  @click="updateMismatchExplanation(evaluation.mismatchExplanation === option.value ? '' : option.value)"
                  class="w-full flex items-center gap-3 p-3 rounded-lg border-2 transition-all duration-200 text-left"
                  :class="evaluation.mismatchExplanation === option.value
                    ? `border-${option.color}-400 bg-${option.color}-50`
                    : 'border-gray-200 hover:border-gray-300'"
                >
                  <span class="text-xl">{{ option.icon }}</span>
                  <span
                    class="font-medium"
                    :class="evaluation.mismatchExplanation === option.value ? `text-${option.color}-700` : 'text-gray-700'"
                  >{{ option.label }}</span>
                </button>
              </div>
            </div>
          </Transition>
        </div>
      </div>

      <!-- Notes Section -->
      <div class="bg-white rounded-xl border border-gray-200 shadow-sm overflow-hidden">
        <div class="px-4 py-3 bg-gradient-to-r from-slate-50 to-gray-50 border-b border-gray-100">
          <label class="text-sm font-bold text-gray-700 flex items-center gap-2">
            <svg class="w-4 h-4 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z" />
            </svg>
            Additional Notes
          </label>
        </div>
        <div class="p-4">
          <textarea
            class="w-full px-3 py-2 border border-gray-300 rounded-lg bg-gray-50 text-gray-900 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent focus:bg-white transition-all duration-200 resize-none text-sm"
            rows="3"
            placeholder="Add observations, concerns, or comments..."
            :value="evaluation.notes"
            @input="updateNotes(($event.target as HTMLTextAreaElement).value)"
          ></textarea>
        </div>
      </div>

      <!-- Footer with Navigation Hint -->
      <div class="text-center py-2">
        <p class="text-xs text-gray-400">
          <kbd class="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-gray-500 font-mono text-[10px]">←</kbd>
          <kbd class="px-1.5 py-0.5 bg-gray-100 border border-gray-300 rounded text-gray-500 font-mono text-[10px] ml-1">→</kbd>
          <span class="ml-2">to navigate cases</span>
        </p>
      </div>
    </div>
  </aside>
</template>
