import { IcWebhook, IcAlert, IcClock } from './nexusIcons'

const STATUS_META = {
  ok:      { label: 'OK',          className: 'ok' },
  error:   { label: 'Erreur',      className: 'error' },
  pending: { label: 'En attente',  className: 'pending' },
}

function NexusAutomationRow({ workflow }) {
  const status = STATUS_META[workflow.status]

  return (
    <div className="nx-auto-row">
      <div className="nx-auto-icon">
        {workflow.status === 'error' ? <IcAlert /> : <IcWebhook />}
      </div>
      <div className="nx-auto-body">
        <span className="nx-auto-name">{workflow.name}</span>
        <span className="nx-auto-source">Source : {workflow.source}</span>
      </div>
      <div className="nx-auto-run">
        <IcClock size={13} />
        {workflow.lastRun}
      </div>
      <span className={`nx-auto-status nx-auto-status--${status.className}`}>
        <span className="nx-auto-status-dot" />
        {status.label}
      </span>
    </div>
  )
}

export default NexusAutomationRow
