import { useState } from 'react'

function BrandLogo({ size = 'md', onClick }) {
  const [imgError, setImgError] = useState(false)

  return (
    <div
      className={`brand-logo brand-logo--${size}${onClick ? ' brand-logo--clickable' : ''}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => e.key === 'Enter' && onClick() : undefined}
    >
      {!imgError && (
        <div className="brand-logo-icon">
          <div className="brand-glow" aria-hidden="true" />
          <img
            src="/logo.png"
            alt=""
            className="brand-logo-img"
            onError={() => setImgError(true)}
          />
        </div>
      )}

      <div className="brand-logo-text">
        <div className="brand-wordmark" aria-label="AIxoria Life">
          <span className="brand-part-aixoria">AIxoria</span>
          <span className="brand-part-life">Life</span>
        </div>
        <span className="brand-tagline">by AIxoria Swift</span>
      </div>
    </div>
  )
}

export default BrandLogo
