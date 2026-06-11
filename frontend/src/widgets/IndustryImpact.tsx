import { Card, Icon } from '@/shared/ui'
import { getIndustryImpact } from '@/mocks/mockImpactAnalysis'
import type { Event } from '@/entities/types'

interface IndustryImpactProps {
  event: Event
}

export const IndustryImpact = ({ event }: IndustryImpactProps) => {
  const industryData = getIndustryImpact(event.analysis?.crisis_level)

  const getImpactColor = (value: number) => {
    if (value >= 70) return 'bg-[#F85149]'
    if (value >= 50) return 'bg-[#d29922]'
    return 'bg-[#238636]'
  }

  const getTextColor = (value: number) => {
    if (value >= 70) return 'text-[#F85149]'
    if (value >= 50) return 'text-[#d29922]'
    return 'text-[#238636]'
  }

  return (
    <Card className="flex flex-col overflow-hidden h-full">
      <div className="border-b border-outline-variant px-3 py-2 flex items-center justify-between bg-surface-container-lowest shrink-0">
        <span className="text-label-caps text-on-surface tracking-wider text-xs">Industry Impact</span>
        <Icon name="factory" className="text-on-surface-variant text-sm" />
      </div>
      <div className="p-3 flex-grow overflow-y-auto">
        <div className="space-y-4">
          {industryData.map((industry, index) => (
            <div key={index}>
              <div className="flex justify-between items-center mb-1">
                <span className="text-on-surface text-sm">{industry.industry}</span>
                <span className={`text-data-metric text-sm font-bold ${getTextColor(industry.impactValue)}`}>
                  {industry.impactLabel}
                </span>
              </div>
              <div className="w-full bg-surface-container-highest h-1.5 rounded-full overflow-hidden">
                <div
                  className={`${getImpactColor(industry.impactValue)} h-full transition-all`}
                  style={{ width: `${industry.impactValue}%` }}
                />
              </div>
              <p className="text-reasoning-log text-on-surface-variant mt-1.5 text-[11px] leading-tight">
                {industry.description}
              </p>
              {index < industryData.length - 1 && (
                <div className="h-px w-full bg-outline-variant/50 mt-4 shrink-0" />
              )}
            </div>
          ))}
        </div>
      </div>
    </Card>
  )
}
