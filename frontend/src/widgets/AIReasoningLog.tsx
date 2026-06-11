import { Card, Icon } from '@/shared/ui'
import { getReasoningEntries } from '@/mocks/mockImpactAnalysis'
import type { Event } from '@/entities/types'

interface AIReasoningLogProps {
  event: Event
}

export const AIReasoningLog = ({ event }: AIReasoningLogProps) => {
  const entries = getReasoningEntries(event)
  const confidenceScore = event.analysis?.confidence_score ?? 0

  const getEntryColor = (type: string) => {
    switch (type) {
      case 'vulnerability':
        return 'text-[#F85149]'
      case 'recommendation':
        return 'text-[#238636]'
      default:
        return 'text-primary'
    }
  }

  return (
    <Card className="flex flex-col overflow-hidden relative h-full">
      {/* Glassmorphism overlay for 'processing' state vibe */}
      <div className="absolute top-0 right-0 w-full h-1 bg-gradient-to-r from-transparent via-primary to-transparent opacity-50 animate-pulse" />
      
      <div className="border-b border-outline-variant px-3 py-2 flex items-center justify-between bg-surface-container-lowest shrink-0">
        <div className="flex items-center gap-2">
          <Icon name="psychology" className="text-primary text-[16px]" />
          <span className="text-label-caps text-primary tracking-wider text-xs">AI Reasoning Log</span>
        </div>
        <span className="px-1.5 py-0.5 bg-primary/10 border border-primary rounded text-[9px] font-data-metric text-primary">
          LIVE
        </span>
      </div>
      
      <div className="p-3 flex-grow overflow-y-auto bg-[#0b0e15]/50">
        {/* Confidence Score */}
        <div className="mb-4 bg-[#161B22] border border-outline-variant p-2 rounded">
          <div className="flex justify-between items-end mb-1">
            <span className="text-label-caps text-on-surface-variant text-[10px]">Projection Confidence</span>
            <span className="text-headline-md text-primary text-lg font-bold leading-none">{confidenceScore}%</span>
          </div>
          <div className="w-full bg-surface-container-highest h-1 rounded-full overflow-hidden">
            <div className="bg-primary h-full transition-all" style={{ width: `${confidenceScore}%` }} />
          </div>
        </div>

        {/* Log Entries */}
        <div className="space-y-3 font-reasoning-log text-[12px]">
          {entries.map((entry) => (
            <div key={entry.id} className="flex gap-2">
              <span className="text-primary mt-0.5 shrink-0">&gt;</span>
              <div className="text-on-surface-variant flex-1 min-w-0">
                {entry.type === 'vulnerability' && (
                  <span className={getEntryColor(entry.type)}>Vulnerability Detected:</span>
                )}
                {entry.type === 'recommendation' && (
                  <span className={getEntryColor(entry.type)}>Recommendation:</span>
                )}
                <span className="text-on-surface"> {entry.content}</span>
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
