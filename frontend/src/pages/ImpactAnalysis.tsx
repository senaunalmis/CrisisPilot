import {
  IndustryImpact,
  LogisticsRouting,
  OptimizationEngine,
  CascadingDependencyMap,
  WhatIfSimulation,
  AIReasoningLog,
  HistoricalCorrelates,
} from '@/widgets'
import { useLatestCriticalEvent } from '@/hooks/useLatestCriticalEvent'
import { ErrorState, Badge, Icon, Card } from '@/shared/ui'

export const ImpactAnalysis = () => {
  const { data: event, isLoading, error, refetch } = useLatestCriticalEvent()

  // Temporary debug content
  console.log('Impact Analysis Loaded')

  if (isLoading) {
    return (
      <main className="flex-1 p-gutter overflow-y-auto overflow-x-hidden flex flex-col gap-gutter">
        {/* Header Skeleton */}
        <div className="flex justify-between items-end mb-6">
          <div className="space-y-2">
            <div className="h-8 w-64 bg-surface-container-low border border-outline-variant rounded animate-pulse" />
            <div className="h-4 w-96 bg-surface-container-low border border-outline-variant rounded animate-pulse" />
          </div>
          <div className="flex gap-3">
            <div className="h-10 w-32 bg-surface-container-low border border-outline-variant rounded animate-pulse" />
            <div className="h-10 w-48 bg-surface-container-low border border-outline-variant rounded animate-pulse" />
            <div className="h-10 w-48 bg-surface-container-low border border-outline-variant rounded animate-pulse" />
          </div>
        </div>

        {/* Grid Skeleton */}
        <div className="grid grid-cols-12 gap-gutter">
          <div className="col-span-12 lg:col-span-3 h-[400px] bg-surface-container-low border border-outline-variant rounded animate-pulse" />
          <div className="col-span-12 lg:col-span-6 h-[500px] bg-surface-container-low border border-outline-variant rounded animate-pulse" />
          <div className="col-span-12 lg:col-span-3 h-[400px] bg-surface-container-low border border-outline-variant rounded animate-pulse" />
          <div className="col-span-12 lg:col-span-3 h-[300px] bg-surface-container-low border border-outline-variant rounded animate-pulse" />
          <div className="col-span-12 lg:col-span-6 h-[200px] bg-surface-container-low border border-outline-variant rounded animate-pulse" />
          <div className="col-span-12 lg:col-span-3 h-[300px] bg-surface-container-low border border-outline-variant rounded animate-pulse" />
        </div>
      </main>
    )
  }

  if (error || !event) {
    return (
      <main className="flex-1 p-gutter overflow-y-auto overflow-x-hidden">
        <ErrorState message="Failed to load impact analysis data" onRetry={() => refetch()} />
      </main>
    )
  }

  const crisisLevel = event.analysis?.crisis_level || 'Unknown'
  const confidenceScore = event.analysis?.confidence_score ?? 0

  return (
    <main className="flex-1 p-gutter overflow-y-auto overflow-x-hidden flex flex-col gap-gutter bg-[radial-gradient(ellipse_at_center,_var(--tw-gradient-stops))] from-surface-container-lowest via-background to-background relative">
      {/* Grid overlay for blueprint effect */}
      <div
        className="absolute inset-0 z-0 pointer-events-none opacity-5"
        style={{
          backgroundSize: '40px 40px',
          backgroundImage: 'linear-gradient(to right, theme("colors.primary") 1px, transparent 1px), linear-gradient(to bottom, theme("colors.primary") 1px, transparent 1px)',
        }}
      />

      {/* Top Row: Stats Cards */}
      <div className="flex gap-3 flex-wrap sm:flex-nowrap relative z-10 shrink-0">
        <Card className="p-3 min-w-[120px] shrink-0 flex-1 flex flex-col items-center justify-center text-center">
          <div className="text-label-caps text-on-surface-variant text-[10px] mb-1">Global Trade Impact</div>
          <div className={`text-headline-md font-bold ${event.riskScore >= 80 ? 'text-[#F85149]' : event.riskScore >= 60 ? 'text-[#d29922]' : 'text-primary'}`}>
            {crisisLevel}
          </div>
        </Card>
        <Card className="p-3 min-w-[120px] shrink-0 flex-1 flex flex-col items-center justify-center text-center">
          <div className="text-label-caps text-on-surface-variant text-[10px] mb-1">Duration Est.</div>
          <div className="text-headline-md font-bold text-primary">
            {event.analysis?.supply_chain_impact?.delay_days || 0} Days
          </div>
        </Card>
        <Card className="p-3 min-w-[120px] shrink-0 flex-1 flex flex-col items-center justify-center text-center">
          <div className="text-label-caps text-on-surface-variant text-[10px] mb-1">Cost Increase</div>
          <div className="text-headline-md font-bold text-on-surface">
            +{event.analysis?.supply_chain_impact?.cost_increase_percent || 0}%
          </div>
        </Card>
      </div>

      {/* Context Header */}
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-end gap-4 relative z-10 shrink-0">
        <div className="flex-1">
          <div className="flex items-center gap-2 mb-2 flex-wrap">
            <Badge variant={event.status === 'critical' ? 'critical' : event.status === 'elevated' ? 'elevated' : 'stable'}>
              {event.status.toUpperCase()} INCIDENT
            </Badge>
            <span className="text-data-metric text-on-surface-variant text-sm">ID: {event.id}</span>
          </div>
          <h2 className="text-display-lg text-on-surface font-bold tracking-tight m-0 leading-none">
            {event.zoneName}
          </h2>
          {event.analysis?.executive_summary && (
            <p className="text-body-sm text-on-surface-variant mt-2 w-full text-sm leading-relaxed">
              {event.analysis.executive_summary}
            </p>
          )}
        </div>
      </div>

      {/* Main Layout: Bento Grid Style */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-gutter relative z-10 flex-grow min-h-[600px]">
        {/* Left Column: Impact Data Panels */}
        <div className="col-span-1 lg:col-span-3 flex flex-col gap-gutter min-h-0">
          <IndustryImpact event={event} />
          <LogisticsRouting event={event} />
          <OptimizationEngine />
        </div>

        {/* Center Column: Cascading Dependency Map & What-If Simulation */}
        <div className="col-span-1 lg:col-span-6 flex flex-col gap-gutter min-h-0">
          <CascadingDependencyMap event={event} />
          <WhatIfSimulation />
        </div>

        {/* Right Column: AI Reasoning & Historical Data */}
        <div className="col-span-1 lg:col-span-3 flex flex-col gap-gutter min-h-0">
          <AIReasoningLog event={event} />
          <HistoricalCorrelates />
        </div>
      </div>

      {/* Footer Info */}
      <div className="flex items-center justify-between py-2 border-t border-outline-variant text-xs relative z-10 shrink-0">
        <div className="flex items-center gap-2 text-on-surface-variant">
          <Icon name="info" className="text-[14px]" />
          <span>Last updated: {new Date(event.timestamp).toLocaleString()}</span>
        </div>
        <div className="flex items-center gap-2 text-on-surface-variant">
          <Icon name="psychology" className="text-[14px]" />
          <span>AI Confidence: {confidenceScore}%</span>
        </div>
      </div>
    </main>
  )
}
