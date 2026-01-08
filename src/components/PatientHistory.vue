<script setup lang="ts">
defineProps<{
  patientHistory: string
}>()
</script>

<template>
  <div class="bg-white rounded-xl shadow-sm border border-gray-200 flex flex-col overflow-hidden">
    <div class="flex-shrink-0 px-4 py-3 border-b border-gray-200 bg-gray-50">
      <h2 class="text-sm font-semibold text-gray-700 uppercase tracking-wide flex items-center gap-2">
        <svg class="w-5 h-5 text-gray-500" fill="none" stroke="currentColor" viewBox="0 0 24 24">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
        </svg>
        Patient History
      </h2>
    </div>
    <div class="flex-1 overflow-y-auto scrollbar-thin p-5">
      <div class="font-serif text-gray-800 leading-relaxed whitespace-pre-wrap text-[15px]">
        {{ patientHistory }}
      </div>
    </div>
  </div>
</template>
