import { Card, Icon } from '@/shared/ui'
import { getHistoricalCorrelates } from '@/mocks/mockImpactAnalysis'

export const HistoricalCorrelates = () => {
  const correlates = getHistoricalCorrelates()

  return (
    <Card className="flex flex-col overflow-hidden h-full">
      <div className="border-b border-outline-variant px-3 py-2 flex items-center justify-between bg-surface-container-lowest shrink-0">
        <span className="text-label-caps text-on-surface tracking-wider text-xs">Historical Correlates</span>
        <Icon name="history" className="text-on-surface-variant text-sm" />
      </div>
      <div className="p-0 flex-grow overflow-y-auto">
        {/* Table Style List */}
        <div className="w-full text-left border-collapse">
          {correlates.map((correlate) => (
            <div
              key={correlate.id}
              className="border-b border-outline-variant p-2 flex justify-between items-center hover:bg-surface-variant transition-colors cursor-pointer group last:border-b-0"
            >
              <div className="flex-1 min-w-0">
                <div className="text-body-sm text-on-surface group-hover:text-primary transition-colors text-sm truncate">
                  {correlate.event}
                </div>
                <div className="text-data-metric text-on-surface-variant text-[11px]">
                  {correlate.duration} • {correlate.year}
                </div>
              </div>
              <div className="flex items-center gap-2 shrink-0 ml-2">
                <span className="text-label-caps text-on-surface-variant text-[10px]">
                  {correlate.similarity}% match
                </span>
                <Icon name="chevron_right" className="text-on-surface-variant group-hover:text-primary text-[16px]" />
              </div>
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
