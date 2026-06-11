import { Card, Icon } from '@/shared/ui'
import { getDependencyNodes } from '@/mocks/mockImpactAnalysis'
import type { Event } from '@/entities/types'
import type { DependencyNode } from '@/mocks/mockImpactAnalysis'

interface CascadingDependencyMapProps {
  event: Event
}

export const CascadingDependencyMap = ({ event }: CascadingDependencyMapProps) => {
  const nodes = getDependencyNodes(event)

  const getNodeColor = (impact: DependencyNode['impact']) => {
    switch (impact) {
      case 'critical':
        return 'border-[#F85149] bg-[#93000a]/30'
      case 'high':
        return 'border-[#d29922] bg-[#d29922]/10'
      case 'medium':
        return 'border-outline-variant bg-surface-variant/50'
      default:
        return 'border-outline-variant bg-surface-variant/50'
    }
  }

  const getIconColor = (impact: DependencyNode['impact']) => {
    switch (impact) {
      case 'critical':
        return 'text-[#F85149]'
      case 'high':
        return 'text-[#d29922]'
      default:
        return 'text-on-surface-variant'
    }
  }

  const getNodeIcon = (type: DependencyNode['type']) => {
    switch (type) {
      case 'source':
        return 'warning'
      case 'infrastructure':
        return 'anchor'
      case 'industry':
        return 'precision_manufacturing'
      case 'region':
        return 'public'
      case 'economic':
        return 'attach_money'
      default:
        return 'circle'
    }
  }

  return (
    <Card className="bg-[#0B0E15] border border-outline-variant shadow-[inset_0_0_40px_rgba(0,0,0,0.8)] relative flex flex-col overflow-hidden flex-grow flex-[2] min-h-[400px]">
      {/* Graph Header */}
      <div className="border-b border-outline-variant px-4 py-2 flex items-center justify-between bg-[#161B22]/80 backdrop-blur-sm z-20 relative shrink-0">
        <span className="text-label-caps text-on-surface tracking-wider text-xs">Cascading Dependency Map</span>
        <div className="flex gap-2">
          <button className="text-label-caps px-2 py-1 border border-outline-variant rounded hover:bg-surface-variant transition-colors text-on-surface-variant text-xs">
            Zoom
          </button>
          <button className="text-label-caps px-2 py-1 border border-primary bg-primary/10 text-primary rounded hover:bg-primary/20 transition-colors text-xs">
            Reset
          </button>
        </div>
      </div>

      {/* Graph Canvas Area */}
      <div className="flex-grow relative p-6 overflow-auto flex flex-col min-h-0">
        {/* SVG for Connecting Lines */}
        <svg className="absolute inset-0 w-full h-full pointer-events-none z-0" preserveAspectRatio="none" viewBox="0 0 100 100">
          <defs>
            <filter id="glow" width="140%" height="140%" x="-20%" y="-20%">
              <feGaussianBlur result="blur" stdDeviation="0.5" />
              <feComposite in="SourceGraphic" in2="blur" operator="over" />
            </filter>
          </defs>
          {/* Flow Lines - Using percentage coordinates */}
          <path d="M 50 15 L 50 25" fill="none" filter="url(#glow)" stroke="#414753" strokeWidth="0.3" />
          <path d="M 50 30 L 25 50" fill="none" filter="url(#glow)" stroke="#414753" strokeWidth="0.3" />
          <path d="M 50 30 L 50 50" fill="none" filter="url(#glow)" stroke="#414753" strokeWidth="0.3" />
          <path d="M 50 30 L 75 50" fill="none" filter="url(#glow)" stroke="#414753" strokeWidth="0.3" />
          <path d="M 25 55 L 35 70" fill="none" filter="url(#glow)" stroke="#414753" strokeWidth="0.3" />
          <path d="M 50 55 L 50 70" fill="none" filter="url(#glow)" stroke="#414753" strokeWidth="0.3" />
          <path d="M 75 55 L 65 70" fill="none" filter="url(#glow)" stroke="#414753" strokeWidth="0.3" />
          <path d="M 50 75 L 50 85" fill="none" filter="url(#glow)" stroke="#414753" strokeWidth="0.3" />
        </svg>

        {/* Tier 1: Source Event */}
        <div className="relative z-10 flex flex-col items-center" style={{ marginTop: '2%' }}>
          <div className="relative">
            <div className="absolute inset-0 rounded-full border-2 ring-pulse-red opacity-50" />
            <div className={`w-12 h-12 ${getNodeColor(nodes[0].impact)} border-2 rounded-full flex items-center justify-center backdrop-blur-sm z-10`}>
              <Icon name={getNodeIcon(nodes[0].type)} className={getIconColor(nodes[0].impact)} />
            </div>
          </div>
          <div className="mt-2 bg-[#161B22]/80 border border-outline-variant px-2 py-1 rounded flex flex-col items-center backdrop-blur-md">
            <span className="text-label-caps text-[#F85149] text-[10px]">SOURCE</span>
            <span className="text-data-metric text-xs text-on-surface">{nodes[0].label}</span>
          </div>
        </div>

        {/* Tier 2: Infrastructure */}
        <div className="relative z-10 flex flex-col items-center" style={{ marginTop: '8%' }}>
          <div className={`w-10 h-10 ${getNodeColor(nodes[1].impact)} border rounded-lg flex items-center justify-center backdrop-blur-sm z-10 hover:border-primary transition-colors cursor-pointer`}>
            <Icon name={getNodeIcon(nodes[1].type)} className={getIconColor(nodes[1].impact)} />
          </div>
          <div className="mt-1 bg-surface-container px-2 py-0.5 rounded border border-outline-variant text-[10px] font-label-caps text-on-surface-variant">
            {nodes[1].label}
          </div>
        </div>

        {/* Tier 3: Industries */}
        <div className="relative z-10 flex justify-center gap-8 px-4" style={{ marginTop: '12%' }}>
          {nodes.slice(2, 5).map((node) => (
            <div key={node.id} className="flex flex-col items-center">
              <div className="relative">
                {node.impact === 'critical' && (
                  <div className="absolute inset-0 rounded-full border ring-pulse-red opacity-50" />
                )}
                {node.impact === 'high' && (
                  <div className="absolute inset-0 rounded-full border ring-pulse-amber opacity-50" />
                )}
                <div className={`w-9 h-9 bg-[#161B22] ${getNodeColor(node.impact)} hover:border-primary transition-colors cursor-pointer rounded-full flex items-center justify-center shadow-lg z-10`}>
                  <Icon name={getNodeIcon(node.type)} className={getIconColor(node.impact)} />
                </div>
              </div>
              <div className="mt-2 bg-surface-container px-2 py-1 rounded border border-outline-variant text-center">
                <div className="text-[10px] font-label-caps text-on-surface">{node.label}</div>
              </div>
            </div>
          ))}
        </div>

        {/* Tier 4: Regions */}
        <div className="relative z-10 flex justify-center gap-12 px-4" style={{ marginTop: '10%' }}>
          {['EU', 'ASIA', 'AMERICAS'].map((region, index) => (
            <div key={region} className="flex flex-col items-center">
              <div className="bg-surface-container px-3 py-1 border border-outline-variant rounded flex items-center gap-2 hover:border-primary cursor-pointer transition-colors">
                <span className="text-label-caps text-on-surface text-xs">{region}</span>
                <span className={`w-2 h-2 rounded-full ${index === 0 ? 'bg-[#F85149]' : index === 1 ? 'bg-[#d29922]' : 'bg-primary'}`} />
              </div>
            </div>
          ))}
        </div>

        {/* Tier 5: Economic Impact */}
        <div className="relative z-10 flex flex-col items-center mb-4" style={{ marginTop: 'auto' }}>
          {/* w-40 h-14 yerine w-auto h-auto px-4 py-2 ekledik */}
          <div className="w-auto min-w-[11rem] h-auto px-4 py-2 bg-[#161B22] border-2 border-primary rounded flex flex-col items-center justify-center shadow-[0_0_20px_rgba(56,139,253,0.15)] relative mt-10">
            {/* Alt satıra inme ihtimaline karşı text-center eklendi */}
            <span className="text-center text-label-caps text-primary tracking-widest text-[9px]">
              GLOBAL ECONOMIC IMPACT
            </span>
            <span className="text-headline-md text-on-surface mt-0.5 text-base font-bold">
              ${event.analysis?.supply_chain_impact?.cost_increase_percent || 0}B
              <span className="text-xs text-on-surface-variant">/day</span>
            </span>
          </div>
        </div>

        {/* Decorative Data Overlay */}
        <div className="absolute bottom-2 left-2 text-reasoning-log text-[9px] text-on-surface-variant/50 pointer-events-none z-20">
          NODE MAP: LIVE<br />
          EVENT: {event.id}
        </div>
      </div>
    </Card>
  )
}
