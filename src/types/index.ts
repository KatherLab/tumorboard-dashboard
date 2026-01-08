export interface AIOutput {
  reasoningTrace: string
  recommendation: string
  modelName?: string
}

export type CorrectnessLevel = 'correct' | 'partially_correct' | 'incorrect' | null

export type ReasoningQuality = 'excellent' | 'good' | 'fair' | 'poor' | null

export type MismatchExplanation = 'ai_better' | 'human_better' | 'ambiguous' | null

export type ArenaPreference = 'model_a' | 'model_b' | 'tie' | 'both_bad' | null

export interface Evaluation {
  correctness: CorrectnessLevel
  reasoningQuality: ReasoningQuality
  redFlags: boolean
  harmToPatient: boolean
  matchesGroundTruth: boolean | null
  mismatchExplanation: MismatchExplanation
  notes: string
}

export interface ArenaJudgment {
  preference: ArenaPreference
  reasoning: string
  timestamp?: number
}

export interface Case {
  id: string
  patientHistory: string
  groundTruth: string
  aiOutput: AIOutput
  aiOutputB?: AIOutput
  evaluation?: Evaluation
  arenaJudgment?: ArenaJudgment
}

export function createEmptyEvaluation(): Evaluation {
  return {
    correctness: null,
    reasoningQuality: null,
    redFlags: false,
    harmToPatient: false,
    matchesGroundTruth: null,
    mismatchExplanation: null,
    notes: ''
  }
}

export function createEmptyArenaJudgment(): ArenaJudgment {
  return {
    preference: null,
    reasoning: ''
  }
}

export function validateCase(obj: unknown): obj is Case {
  if (typeof obj !== 'object' || obj === null) return false
  const c = obj as Record<string, unknown>

  const hasBasicFields = (
    typeof c.id === 'string' &&
    typeof c.patientHistory === 'string' &&
    typeof c.groundTruth === 'string' &&
    typeof c.aiOutput === 'object' &&
    c.aiOutput !== null &&
    typeof (c.aiOutput as Record<string, unknown>).reasoningTrace === 'string' &&
    typeof (c.aiOutput as Record<string, unknown>).recommendation === 'string'
  )

  if (!hasBasicFields) return false

  if (c.aiOutputB !== undefined) {
    if (typeof c.aiOutputB !== 'object' || c.aiOutputB === null) return false
    const outputB = c.aiOutputB as Record<string, unknown>
    if (typeof outputB.reasoningTrace !== 'string' || typeof outputB.recommendation !== 'string') {
      return false
    }
  }

  return true
}

export function validateCasesArray(data: unknown): data is Case[] {
  if (!Array.isArray(data)) return false
  return data.every(validateCase)
}
