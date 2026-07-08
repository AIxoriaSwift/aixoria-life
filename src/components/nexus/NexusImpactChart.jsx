function NexusImpactChart({ data }) {
  const max = Math.max(...data.flatMap((d) => [d.requests, d.validations]))

  return (
    <div className="nx-impact-chart-card">
      <div className="nx-impact-chart-legend">
        <span className="nx-impact-legend-item">
          <span className="nx-impact-legend-swatch nx-impact-legend-swatch--requests" />
          Demandes traitées
        </span>
        <span className="nx-impact-legend-item">
          <span className="nx-impact-legend-swatch nx-impact-legend-swatch--validations" />
          Validations
        </span>
      </div>

      <div className="nx-impact-chart" role="img" aria-label="Demandes traitées et validations par jour sur 7 jours">
        {data.map((day) => (
          <div className="nx-impact-chart-col" key={day.label}>
            <div className="nx-impact-chart-bars">
              <div
                className="nx-impact-bar nx-impact-bar--requests"
                style={{ height: `${(day.requests / max) * 100}%` }}
              >
                <span className="nx-impact-bar-tooltip">{day.requests} demandes</span>
              </div>
              <div
                className="nx-impact-bar nx-impact-bar--validations"
                style={{ height: `${(day.validations / max) * 100}%` }}
              >
                <span className="nx-impact-bar-tooltip">{day.validations} validations</span>
              </div>
            </div>
            <span className="nx-impact-chart-x-label">{day.label}</span>
          </div>
        ))}
      </div>
    </div>
  )
}

export default NexusImpactChart
