import type { Event } from '@/entities/types'

// Industry Impact Data - Deterministic based on crisis level
export interface IndustryImpactData {
  industry: string
  impactValue: number
  impactLabel: string
  description: string
}

export const getIndustryImpact = (crisisLevel?: string): IndustryImpactData[] => {
  const level = crisisLevel?.toLowerCase() || 'medium'
  
  if (level === 'critical') {
    return [
      {
        industry: 'Manufacturing',
        impactValue: 85,
        impactLabel: '-15% Output',
        description: 'Semiconductor and raw material delays critically affecting production lines.'
      },
      {
        industry: 'Retail',
        impactValue: 70,
        impactLabel: 'Critical Scarcity',
        description: 'Inventory stock-outs projected within 3 weeks for current cycle.'
      },
      {
        industry: 'Energy',
        impactValue: 45,
        impactLabel: 'Moderate',
        description: 'Energy markets showing moderate impact from supply constraints.'
      }
    ]
  } else if (level === 'high') {
    return [
      {
        industry: 'Manufacturing',
        impactValue: 65,
        impactLabel: '-8% Output',
        description: 'Production delays affecting multiple manufacturing sectors.'
      },
      {
        industry: 'Retail',
        impactValue: 55,
        impactLabel: 'High Scarcity',
        description: 'Inventory shortages expected in 4-6 weeks.'
      },
      {
        industry: 'Energy',
        impactValue: 35,
        impactLabel: 'Low',
        description: 'Minimal impact on energy markets.'
      }
    ]
  } else {
    // Medium or lower
    return [
      {
        industry: 'Manufacturing',
        impactValue: 40,
        impactLabel: '-3% Output',
        description: 'Minor production delays in specific sectors.'
      },
      {
        industry: 'Retail',
        impactValue: 30,
        impactLabel: 'Moderate Scarcity',
        description: 'Some inventory shortages anticipated.'
      },
      {
        industry: 'Energy',
        impactValue: 20,
        impactLabel: 'Low',
        description: 'Energy markets largely unaffected.'
      }
    ]
  }
}

// Optimization Engine Data - Mock for now, will be replaced by Quantum API
export interface OptimizationEngineData {
  routeEfficiency: number
  projectedSavings: string
  delayReduction: number
  mode: 'classical' | 'quantum'
}

export const getOptimizationData = (): OptimizationEngineData => {
  return {
    routeEfficiency: 14,
    projectedSavings: '$2.4M',
    delayReduction: 3,
    mode: 'quantum'
  }
}

// Historical Correlates - Mock data for future API integration
export interface HistoricalCorrelate {
  id: string
  event: string
  duration: string
  similarity: number
  year: number
}

export const getHistoricalCorrelates = (): HistoricalCorrelate[] => {
  return [
    {
      id: '1',
      event: '1967 Blockage (Six-Day War)',
      duration: '8 Years',
      similarity: 78,
      year: 1967
    },
    {
      id: '2',
      event: '2004 Yellow Fleet Incident',
      duration: '3 Days',
      similarity: 65,
      year: 2004
    },
    {
      id: '3',
      event: 'Panama Canal Drought (2019)',
      duration: 'Capacity Reduction',
      similarity: 52,
      year: 2019
    }
  ]
}

// What-If Simulation Scenarios - Mock data for future API
export interface WhatIfScenario {
  id: string
  description: string
  delays: string
  industriesHit: number
  lossEstimate: string
  confidence: number
}

export const getWhatIfScenarios = (): WhatIfScenario[] => {
  return [
    {
      id: '1',
      description: 'What if Singapore Port closes for 10 days?',
      delays: '+18d',
      industriesHit: 7,
      lossEstimate: '$4.2B',
      confidence: 92
    },
    {
      id: '2',
      description: 'What if Red Sea transit capacity drops by 50%?',
      delays: '+8d',
      industriesHit: 4,
      lossEstimate: '$1.8B',
      confidence: 88
    }
  ]
}

// Cascading Dependency Map Nodes - Generic structure
export interface DependencyNode {
  id: string
  label: string
  type: 'source' | 'infrastructure' | 'industry' | 'region' | 'economic'
  impact: 'critical' | 'high' | 'medium' | 'low'
  position: { x: number; y: number }
}

export const getDependencyNodes = (event: Event): DependencyNode[] => {
  return [
    {
      id: 'source',
      label: event.zoneName || 'Source Event',
      type: 'source',
      impact: event.riskScore >= 80 ? 'critical' : event.riskScore >= 60 ? 'high' : 'medium',
      position: { x: 400, y: 80 }
    },
    {
      id: 'supply-chain',
      label: 'Supply Chain',
      type: 'infrastructure',
      impact: event.riskScore >= 80 ? 'critical' : event.riskScore >= 60 ? 'high' : 'medium',
      position: { x: 400, y: 200 }
    },
    {
      id: 'manufacturing',
      label: 'Manufacturing',
      type: 'industry',
      impact: 'high',
      position: { x: 250, y: 350 }
    },
    {
      id: 'retail',
      label: 'Retail',
      type: 'industry',
      impact: 'high',
      position: { x: 400, y: 350 }
    },
    {
      id: 'energy',
      label: 'Energy',
      type: 'industry',
      impact: 'medium',
      position: { x: 550, y: 350 }
    },
    {
      id: 'regions',
      label: 'Regions',
      type: 'region',
      impact: 'medium',
      position: { x: 400, y: 480 }
    },
    {
      id: 'economic',
      label: 'Economic Impact',
      type: 'economic',
      impact: 'critical',
      position: { x: 400, y: 580 }
    }
  ]
}

// AI Reasoning Log Entries - Generated from real backend data
export interface ReasoningEntry {
  id: string
  type: 'analysis' | 'vulnerability' | 'recommendation' | 'cross-reference'
  content: string
  timestamp: string
}

export const getReasoningEntries = (event: Event): ReasoningEntry[] => {
  const entries: ReasoningEntry[] = []
  
  // Add executive summary as analysis entry
  if (event.analysis?.executive_summary) {
    entries.push({
      id: '1',
      type: 'analysis',
      content: event.analysis.executive_summary,
      timestamp: new Date().toISOString()
    })
  }
  
  // Add recommended strategy reason
  if (event.analysis?.recommended_strategy?.reason) {
    entries.push({
      id: '2',
      type: 'recommendation',
      content: event.analysis.recommended_strategy.reason,
      timestamp: new Date().toISOString()
    })
  }
  
  // Add secondary risks as vulnerability entries
  if (event.analysis?.secondary_risks) {
    event.analysis.secondary_risks.forEach((risk, index) => {
      const riskText = typeof risk === 'string' ? risk : risk.action || 'Unknown risk'
      entries.push({
        id: `risk-${index}`,
        type: 'vulnerability',
        content: `Secondary Risk: ${riskText}`,
        timestamp: new Date().toISOString()
      })
    })
  }
  
  // Add generic entries if none exist
  if (entries.length === 0) {
    entries.push({
      id: '1',
      type: 'analysis',
      content: 'Analyzing dependencies... Node map constructed from event data.',
      timestamp: new Date().toISOString()
    })
  }
  
  return entries
}
