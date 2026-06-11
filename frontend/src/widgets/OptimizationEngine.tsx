import { Card, Icon } from '@/shared/ui'
import { getOptimizationData } from '@/mocks/mockImpactAnalysis'

interface OptimizationEngineProps {
  // Props for future Quantum API integration
  routeEfficiency?: number
  projectedSavings?: string
  delayReduction?: number
}

export const OptimizationEngine = ({
  routeEfficiency,
  projectedSavings,
  delayReduction
}: OptimizationEngineProps) => {
  // Use mock data for now, will be replaced by props when Quantum API arrives
  const data = getOptimizationData()

  const efficiency = routeEfficiency ?? data.routeEfficiency
  const savings = projectedSavings ?? data.projectedSavings
  const reduction = delayReduction ?? data.delayReduction

  return (
    <Card className="flex flex-col overflow-hidden h-full">
      <div className="border-b border-outline-variant px-3 py-2 flex items-center justify-between bg-surface-container-lowest shrink-0">
        <span className="text-label-caps text-on-surface tracking-wider text-xs">Optimization Engine</span>
        <Icon name="model_training" className="text-on-surface-variant text-sm" />
      </div>
      <div className="p-4 flex-grow overflow-y-auto space-y-4">
        <div className="flex items-center justify-between bg-surface-container-low p-3 rounded border border-outline-variant">
          <span className="text-label-caps text-on-surface text-xs">Mode</span>
          <div className="flex bg-background rounded p-0.5 border border-outline-variant">
            <button className="px-3 py-1.5 text-[10px] font-label-caps rounded text-on-surface-variant hover:text-on-surface transition-colors">
              Classical
            </button>
            <button className="px-3 py-1.5 text-[10px] font-label-caps rounded bg-[#00f0ff]/10 text-[#00f0ff] border border-[#00f0ff]/30 transition-all">
              Quantum
            </button>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <div className="w-1.5 h-1.5 rounded-full bg-[#00f0ff] animate-pulse shrink-0" />
          <span className="text-[9px] font-label-caps text-[#00f0ff] tracking-wider">
            EXPERIMENTAL QUANTUM MODE
          </span>
        </div>
        <div className="space-y-3 mt-4">
          <div className="flex justify-between items-center">
            <span className="text-on-surface-variant text-sm">Route Efficiency</span>
            <span className="text-data-metric text-primary text-sm font-bold">+{efficiency}%</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-on-surface-variant text-sm">Projected Savings</span>
            <span className="text-data-metric text-on-surface text-sm font-bold">{savings}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-on-surface-variant text-sm">Delay Reduction</span>
            <span className="text-data-metric text-primary text-sm font-bold">-{reduction} Days</span>
          </div>
        </div>
      </div>
    </Card>
  )
}
