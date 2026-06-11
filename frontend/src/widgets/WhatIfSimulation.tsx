import { Card, Icon } from '@/shared/ui'
import { getWhatIfScenarios } from '@/mocks/mockImpactAnalysis'

export const WhatIfSimulation = () => {
  const scenarios = getWhatIfScenarios()

  return (
    <Card className="flex flex-col overflow-hidden h-full">
      <div className="border-b border-outline-variant px-3 py-2 flex items-center justify-between bg-surface-container-lowest shrink-0">
        <span className="text-label-caps text-on-surface tracking-wider text-xs">What-If Simulation</span>
        <Icon name="science" className="text-on-surface-variant text-sm" />
      </div>
      <div className="p-4 flex gap-4 overflow-x-auto h-full items-center">
        {scenarios.map((scenario) => (
          <div
            key={scenario.id}
            className="bg-surface-container-low border border-outline-variant rounded p-4 min-w-[320px] hover:border-primary/50 transition-colors cursor-pointer group flex-shrink-0"
          >
            <div className="text-body-sm text-on-surface mb-3 group-hover:text-primary transition-colors text-sm">
              {scenario.description}
            </div>
            <div className="grid grid-cols-2 gap-3 text-[12px] font-reasoning-log">
              <div>
                <span className="text-on-surface-variant">Delays:</span>{' '}
                <span className={scenario.delays.includes('+') && parseInt(scenario.delays) > 10 ? 'text-[#F85149]' : 'text-[#d29922]'}>
                  {scenario.delays}
                </span>
              </div>
              <div>
                <span className="text-on-surface-variant">Ind. Hit:</span>{' '}
                <span className="text-on-surface">{scenario.industriesHit}</span>
              </div>
              <div>
                <span className="text-on-surface-variant">Loss Est:</span>{' '}
                <span className={scenario.lossEstimate.includes('$4') ? 'text-[#F85149]' : 'text-[#d29922]'}>
                  {scenario.lossEstimate}
                </span>
              </div>
              <div>
                <span className="text-on-surface-variant">Conf:</span>{' '}
                <span className="text-primary">{scenario.confidence}%</span>
              </div>
            </div>
          </div>
        ))}
        <div className="border border-dashed border-outline-variant rounded p-4 min-w-[320px] h-[100px] flex items-center justify-center hover:bg-surface-variant transition-colors cursor-pointer group flex-shrink-0">
          <div className="flex items-center gap-2 text-on-surface-variant group-hover:text-primary transition-colors">
            <Icon name="add" />
            <span className="text-label-caps text-xs">New Scenario Input</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
