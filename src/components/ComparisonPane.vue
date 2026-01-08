<script setup lang="ts">
import type { AIOutput } from '../types'

defineProps<{
  groundTruth: string
  aiOutput: AIOutput
}>()
</script>

<template>
  <div class="flex gap-4 h-full min-h-0">
    <div class="flex-1 bg-green-50 rounded-xl shadow-sm border border-green-200 flex flex-col overflow-hidden">
      <div class="flex-shrink-0 px-4 py-3 border-b border-green-200 bg-green-100/50">
        <h2 class="text-sm font-semibold text-green-800 uppercase tracking-wide flex items-center gap-2">
          <svg class="w-5 h-5 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          Ground Truth
        </h2>
      </div>
      <div class="flex-1 overflow-y-auto scrollbar-thin p-5">
        <div class="text-gray-800 leading-relaxed whitespace-pre-wrap text-[15px]">
          {{ groundTruth }}
        </div>
      </div>
    </div>

    <div class="flex-1 bg-blue-50 rounded-xl shadow-sm border border-blue-200 flex flex-col overflow-hidden">
      <div class="flex-shrink-0 px-4 py-3 border-b border-blue-200 bg-blue-100/50">
        <h2 class="text-sm font-semibold text-blue-800 uppercase tracking-wide flex items-center gap-2">
          <svg class="w-5 h-5 text-blue-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.75 17L9 20l-1 1h8l-1-1-.75-3M3 13h18M5 17h14a2 2 0 002-2V5a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
          </svg>
          AI Output
        </h2>
      </div>
      <div class="flex-1 overflow-y-auto scrollbar-thin p-5 space-y-4">
        <div>
          <h3 class="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">Reasoning Trace</h3>
          <div class="text-gray-600 leading-relaxed whitespace-pre-wrap text-sm bg-blue-100/30 rounded-lg p-3 border border-blue-100">
            {{ aiOutput.reasoningTrace }}
          </div>
        </div>
        <div>
          <h3 class="text-xs font-semibold text-blue-600 uppercase tracking-wide mb-2">Final Recommendation</h3>
          <div class="text-gray-900 font-medium leading-relaxed whitespace-pre-wrap text-[15px]">
            {{ aiOutput.recommendation }}
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
