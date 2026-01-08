<script setup lang="ts">
import { computed } from 'vue'
import { useCasesStore } from '../stores/cases'
import type { ArenaPreference } from '../types'
import PatientHistory from './PatientHistory.vue'

const store = useCasesStore()

const currentCase = computed(() => store.currentArenaCase)

const preferenceOptions: { value: ArenaPreference; label: string; icon: string; color: string; bgColor: string; borderColor: string }[] = [
  {
    value: 'model_a',
    label: 'Model A is Better',
    icon: 'A',
    color: 'text-violet-700',
    bgColor: 'bg-violet-50 hover:bg-violet-100',
    borderColor: 'border-violet-300'
  },
  {
    value: 'model_b',
    label: 'Model B is Better',
    icon: 'B',
    color: 'text-cyan-700',
    bgColor: 'bg-cyan-50 hover:bg-cyan-100',
    borderColor: 'border-cyan-300'
  },
  {
    value: 'tie',
    label: 'Tie (Both Equal)',
    icon: '=',
    color: 'text-amber-700',
    bgColor: 'bg-amber-50 hover:bg-amber-100',
    borderColor: 'border-amber-300'
  },
  {
    value: 'both_bad',
    label: 'Both are Bad',
    icon: '✕',
    color: 'text-red-700',
    bgColor: 'bg-red-50 hover:bg-red-100',
    borderColor: 'border-red-300'
  }
]

function selectPreference(pref: ArenaPreference) {
  store.setArenaPreference(pref)
}

function updateReasoning(event: Event) {
  const target = event.target as HTMLTextAreaElement
  store.updateArenaJudgment({ reasoning: target.value })
}

function getSelectedClass(value: ArenaPreference) {
  const option = preferenceOptions.find(o => o.value === value)
  if (!option) return ''
  return `ring-2 ring-offset-2 ring-${option.color.split('-')[1]}-500`
}
</script>

<template>
  <div v-if="currentCase" class="flex flex-col h-full overflow-hidden">
    <!-- Patient History (condensed for Arena) -->
    <div class="flex-shrink-0 h-[25%] p-4 pb-2">
      <PatientHistory
        :patient-history="currentCase.patientHistory"
        class="h-full"
      />
    </div>

    <!-- Arena Comparison -->
    <div class="flex-1 flex flex-col min-h-0 p-4 pt-2 gap-4">
      <!-- Side-by-side AI outputs -->
      <div class="flex-1 flex gap-4 min-h-0">
        <!-- Model A -->
        <div class="flex-1 bg-violet-50 rounded-xl shadow-sm border border-violet-200 flex flex-col overflow-hidden">
          <div class="flex-shrink-0 px-4 py-3 border-b border-violet-200 bg-violet-100/50">
            <h2 class="text-sm font-semibold text-violet-800 uppercase tracking-wide flex items-center gap-2">
              <span class="w-6 h-6 rounded-full bg-violet-600 text-white flex items-center justify-center text-xs font-bold">A</span>
              {{ currentCase.aiOutput.modelName || 'Model A' }}
            </h2>
          </div>
          <div class="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-3">
            <div>
              <h3 class="text-xs font-semibold text-violet-600 uppercase tracking-wide mb-2">Reasoning</h3>
              <div class="text-gray-600 leading-relaxed whitespace-pre-wrap text-sm bg-violet-100/30 rounded-lg p-3 border border-violet-100">
                {{ currentCase.aiOutput.reasoningTrace }}
              </div>
            </div>
            <div>
              <h3 class="text-xs font-semibold text-violet-600 uppercase tracking-wide mb-2">Recommendation</h3>
              <div class="text-gray-900 font-medium leading-relaxed whitespace-pre-wrap text-[15px]">
                {{ currentCase.aiOutput.recommendation }}
              </div>
            </div>
          </div>
        </div>

        <!-- Model B -->
        <div class="flex-1 bg-cyan-50 rounded-xl shadow-sm border border-cyan-200 flex flex-col overflow-hidden">
          <div class="flex-shrink-0 px-4 py-3 border-b border-cyan-200 bg-cyan-100/50">
            <h2 class="text-sm font-semibold text-cyan-800 uppercase tracking-wide flex items-center gap-2">
              <span class="w-6 h-6 rounded-full bg-cyan-600 text-white flex items-center justify-center text-xs font-bold">B</span>
              {{ currentCase.aiOutputB?.modelName || 'Model B' }}
            </h2>
          </div>
          <div v-if="currentCase.aiOutputB" class="flex-1 overflow-y-auto scrollbar-thin p-4 space-y-3">
            <div>
              <h3 class="text-xs font-semibold text-cyan-600 uppercase tracking-wide mb-2">Reasoning</h3>
              <div class="text-gray-600 leading-relaxed whitespace-pre-wrap text-sm bg-cyan-100/30 rounded-lg p-3 border border-cyan-100">
                {{ currentCase.aiOutputB.reasoningTrace }}
              </div>
            </div>
            <div>
              <h3 class="text-xs font-semibold text-cyan-600 uppercase tracking-wide mb-2">Recommendation</h3>
              <div class="text-gray-900 font-medium leading-relaxed whitespace-pre-wrap text-[15px]">
                {{ currentCase.aiOutputB.recommendation }}
              </div>
            </div>
          </div>
          <div v-else class="flex-1 flex items-center justify-center text-gray-400">
            <p>No second model output available for this case</p>
          </div>
        </div>
      </div>

      <!-- Judgment Panel -->
      <div class="flex-shrink-0 bg-white rounded-xl shadow-sm border border-gray-200 p-4">
        <div class="flex items-start gap-6">
          <!-- Preference Selection -->
          <div class="flex-1">
            <h3 class="text-sm font-semibold text-gray-700 mb-3">Which response is better?</h3>
            <div class="flex gap-2">
              <button
                v-for="option in preferenceOptions"
                :key="option.value"
                @click="selectPreference(option.value)"
                :class="[
                  'flex-1 px-3 py-2.5 rounded-lg border-2 transition-all duration-200 flex items-center justify-center gap-2',
                  option.bgColor,
                  option.borderColor,
                  currentCase.arenaJudgment?.preference === option.value
                    ? 'ring-2 ring-offset-1 shadow-md scale-[1.02]'
                    : 'opacity-70 hover:opacity-100'
                ]"
                :style="currentCase.arenaJudgment?.preference === option.value ? `--tw-ring-color: var(--${option.color.split('-')[1]}-500)` : ''"
              >
                <span
                  :class="[
                    'w-6 h-6 rounded-full flex items-center justify-center text-xs font-bold',
                    option.value === 'model_a' ? 'bg-violet-600 text-white' : '',
                    option.value === 'model_b' ? 'bg-cyan-600 text-white' : '',
                    option.value === 'tie' ? 'bg-amber-500 text-white' : '',
                    option.value === 'both_bad' ? 'bg-red-500 text-white' : ''
                  ]"
                >
                  {{ option.icon }}
                </span>
                <span :class="['text-sm font-medium', option.color]">{{ option.label }}</span>
              </button>
            </div>
          </div>

          <!-- Reasoning -->
          <div class="w-80">
            <h3 class="text-sm font-semibold text-gray-700 mb-2">Reasoning (optional)</h3>
            <textarea
              :value="currentCase.arenaJudgment?.reasoning || ''"
              @input="updateReasoning"
              placeholder="Why did you choose this preference?"
              class="w-full h-20 px-3 py-2 text-sm border border-gray-300 rounded-lg resize-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
            ></textarea>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
