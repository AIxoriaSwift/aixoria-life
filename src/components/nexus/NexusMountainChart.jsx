import { useRef, useState } from 'react'
import { IcOpportunity } from './nexusIcons'

const VB_W = 1000
const VB_H = 300
const TOP_PAD = 20
const BOTTOM_PAD = 14

function buildSmoothPath(points) {
  if (points.length < 2) return ''
  let d = `M ${points[0].x},${points[0].y}`
  for (let i = 0; i < points.length - 1; i++) {
    const p0 = points[i - 1] || points[i]
    const p1 = points[i]
    const p2 = points[i + 1]
    const p3 = points[i + 2] || p2
    const cp1x = p1.x + (p2.x - p0.x) / 6
    const cp1y = p1.y + (p2.y - p0.y) / 6
    const cp2x = p2.x - (p3.x - p1.x) / 6
    const cp2y = p2.y - (p3.y - p1.y) / 6
    d += ` C ${cp1x.toFixed(2)},${cp1y.toFixed(2)} ${cp2x.toFixed(2)},${cp2y.toFixed(2)} ${p2.x.toFixed(2)},${p2.y.toFixed(2)}`
  }
  return d
}

function NexusMountainChart({ data, deltaLabel, metrics }) {
  const wrapRef = useRef(null)
  const [hoverIndex, setHoverIndex] = useState(null)

  const values = data.map((d) => d.value)
  const min = Math.min(...values)
  const max = Math.max(...values)
  const pad = (max - min) * 0.25 || 10
  const domainMin = min - pad
  const domainMax = max + pad
  const usableH = VB_H - TOP_PAD - BOTTOM_PAD

  const points = data.map((d, i) => ({
    x: (i / (data.length - 1)) * VB_W,
    y: VB_H - BOTTOM_PAD - ((d.value - domainMin) / (domainMax - domainMin)) * usableH,
  }))

  const linePath = buildSmoothPath(points)
  const baseline = VB_H - BOTTOM_PAD
  const areaPath = `${linePath} L ${points[points.length - 1].x},${baseline} L ${points[0].x},${baseline} Z`

  const handleMove = (e) => {
    const rect = wrapRef.current.getBoundingClientRect()
    const fraction = Math.min(1, Math.max(0, (e.clientX - rect.left) / rect.width))
    setHoverIndex(Math.round(fraction * (data.length - 1)))
  }

  const hovered = hoverIndex !== null ? data[hoverIndex] : null
  const hoveredPoint = hoverIndex !== null ? points[hoverIndex] : null
  const edgePos = hoverIndex === 0 ? 'start' : hoverIndex === data.length - 1 ? 'end' : 'mid'

  return (
    <div className="nx-mountain-card">
      <div className="nx-mountain-head">
        <span className="nx-mountain-delta">
          <IcOpportunity size={13} />
          {deltaLabel} vs période précédente
        </span>
      </div>

      <div
        className="nx-mountain-chart-wrap"
        ref={wrapRef}
        onMouseMove={handleMove}
        onMouseLeave={() => setHoverIndex(null)}
      >
        <svg className="nx-mountain-svg" viewBox={`0 0 ${VB_W} ${VB_H}`} preserveAspectRatio="none">
          <defs>
            <linearGradient id="nxMountainArea" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.4" />
              <stop offset="55%" stopColor="#60a5fa" stopOpacity="0.16" />
              <stop offset="100%" stopColor="#60a5fa" stopOpacity="0" />
            </linearGradient>
            <linearGradient id="nxMountainLine" x1="0" y1="0" x2="1" y2="0">
              <stop offset="0%" stopColor="#60a5fa" />
              <stop offset="100%" stopColor="#c4b5fd" />
            </linearGradient>
          </defs>

          {[0.25, 0.5, 0.75].map((f) => (
            <line key={f} x1="0" x2={VB_W} y1={VB_H * f} y2={VB_H * f} className="nx-mountain-grid" />
          ))}

          <path d={areaPath} fill="url(#nxMountainArea)" stroke="none" />
          <path d={linePath} fill="none" stroke="url(#nxMountainLine)" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />

          {points.map((p, i) => (
            <circle key={i} cx={p.x} cy={p.y} r="2.6" className="nx-mountain-dot" />
          ))}

          {hoveredPoint && (
            <>
              <line x1={hoveredPoint.x} x2={hoveredPoint.x} y1="0" y2={VB_H} className="nx-mountain-crosshair" />
              <circle cx={hoveredPoint.x} cy={hoveredPoint.y} r="6" className="nx-mountain-dot-active" />
            </>
          )}
        </svg>

        {hovered && hoveredPoint && (
          <div
            className={`nx-mountain-tooltip nx-mountain-tooltip--${edgePos}`}
            style={{
              left: `${(hoveredPoint.x / VB_W) * 100}%`,
              top: `${(hoveredPoint.y / VB_H) * 100}%`,
            }}
          >
            <span className="nx-mountain-tooltip-day">Il y a {data.length - hovered.day} j</span>
            <div className="nx-mountain-tooltip-row"><span>Activité agents</span><strong>{hovered.activity}</strong></div>
            <div className="nx-mountain-tooltip-row"><span>Validations</span><strong>{hovered.validations}</strong></div>
            <div className="nx-mountain-tooltip-row"><span>Opportunités</span><strong>{hovered.opportunities.toLocaleString('fr-CH')} CHF</strong></div>
          </div>
        )}
      </div>

      <div className="nx-mountain-x-axis">
        <span>Il y a 30 j</span>
        <span>Il y a 15 j</span>
        <span>Aujourd'hui</span>
      </div>

      <div className="nx-mountain-metrics">
        {metrics.map((m) => (
          <div className="nx-mountain-metric" key={m.label}>
            <span className="nx-mountain-metric-value">{m.value}</span>
            <span className="nx-mountain-metric-label">{m.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NexusMountainChart
