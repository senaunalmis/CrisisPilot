import { Card, Icon } from '@/shared/ui'
import type { Event } from '@/entities/types'

interface LogisticsRoutingProps {
  event: Event
}

export const LogisticsRouting = ({ event }: LogisticsRoutingProps) => {
  const recommendedHubs = event.analysis?.recommended_hubs || []

  return (
    <Card className="flex flex-col overflow-hidden h-full">
      <div className="border-b border-outline-variant px-3 py-2 flex items-center justify-between bg-surface-container-lowest shrink-0">
        <span className="text-label-caps text-on-surface tracking-wider text-xs">Logistics Routing</span>
        <Icon name="route" className="text-on-surface-variant text-sm" />
      </div>
      <div className="p-3 flex-grow overflow-y-auto space-y-3">
        <div className="flex items-start gap-3">
          <div className="mt-0.5 w-6 h-6 rounded bg-primary/10 border border-primary flex items-center justify-center shrink-0">
            <Icon name="directions_boat" className="text-[14px] text-primary" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-body-sm text-on-surface font-medium text-sm">Maritime Re-routing</div>
            <div className="text-data-metric text-on-surface-variant text-sm mt-1">
              Alternative Route Analysis
            </div>
            <div className="flex gap-2 mt-1 flex-wrap">
              <span className="text-reasoning-log bg-surface-container-highest px-1.5 rounded text-[10px] text-on-surface-variant">
                {event.analysis?.supply_chain_impact?.delay_days || 0}+ Days Transit
              </span>
              <span className="text-reasoning-log bg-surface-container-highest px-1.5 rounded text-[10px] text-on-surface-variant">
                +{event.analysis?.supply_chain_impact?.cost_increase_percent || 0}% Cost
              </span>
            </div>
          </div>
        </div>
        <div className="h-px w-full bg-outline-variant/50 shrink-0" />
        <div className="flex items-start gap-3">
          <div className="mt-0.5 w-6 h-6 rounded bg-surface-variant border border-outline-variant flex items-center justify-center shrink-0">
            <Icon name="flight_takeoff" className="text-[14px] text-on-surface-variant" />
          </div>
          <div className="flex-1 min-w-0">
            <div className="text-body-sm text-on-surface font-medium text-sm">Air Freight Surge</div>
            <div className="text-data-metric text-on-surface-variant text-sm mt-1">
              Capacity Squeeze Detected
            </div>
            <div className="flex gap-2 mt-1 flex-wrap">
              <span className="text-reasoning-log bg-surface-container-highest px-1.5 rounded text-[10px] text-[#F85149]">
                Rates +300%
              </span>
            </div>
          </div>
        </div>
        {recommendedHubs.length > 0 && (
          <>
            <div className="h-px w-full bg-outline-variant/50 shrink-0" />
            <div className="mt-2">
              <div className="text-label-caps text-on-surface-variant text-[10px] uppercase mb-2">
                Recommended Hubs
              </div>
              <div className="space-y-1.5">
                {recommendedHubs.map((hub, index) => (
                  <div
                    key={index}
                    className="bg-surface-container-low border border-outline-variant rounded px-2 py-1.5 flex items-center gap-2"
                  >
                    <Icon name="location_on" className="text-primary text-[12px] shrink-0" />
                    <span className="text-body-sm text-on-surface text-xs truncate">{hub}</span>
                  </div>
                ))}
              </div>
            </div>
          </>
        )}
      </div>
    </Card>
  )
}
