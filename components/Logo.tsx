'use client'

interface LogoProps {
  size?: number
  color?: string
  className?: string
}

interface FullLogoProps extends LogoProps {
  textColor?: string
  variant?: 'default' | 'monochrome' | 'light'
}

// Icon-only version - Mountain + Road silhouette forming abstract "R"
export function LogoIcon({ size = 40, color = '#c9a84c', className = '' }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 48 48"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Rati Tours Logo"
    >
      {/* Background circle */}
      <circle cx="24" cy="24" r="23" fill={color} />

      {/* Mountain silhouette - Caucasus inspired peaks */}
      <path
        d="M6 32L14 18L19 24L24 14L29 24L34 18L42 32"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />

      {/* Winding road/path underneath */}
      <path
        d="M10 36C14 34 18 35 22 33C26 31 30 32 34 34C36 35 38 35 40 34"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
        fill="none"
        opacity="0.8"
      />

      {/* Small peak accent */}
      <path
        d="M24 14L24 11"
        stroke="white"
        strokeWidth="2"
        strokeLinecap="round"
      />
    </svg>
  )
}

// Minimal icon version - just mountains (for very small sizes)
export function LogoIconMinimal({ size = 32, color = '#c9a84c', className = '' }: LogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Rati Tours"
    >
      {/* Mountain peaks only */}
      <path
        d="M2 24L8 12L12 17L16 8L20 17L24 12L30 24"
        stroke={color}
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        fill="none"
      />
      {/* Road */}
      <path
        d="M4 28C8 26 12 27 16 26C20 25 24 26 28 27"
        stroke={color}
        strokeWidth="1.5"
        strokeLinecap="round"
        fill="none"
        opacity="0.6"
      />
    </svg>
  )
}

// Full horizontal logo with text
export function Logo({
  size = 40,
  color = '#c9a84c',
  textColor,
  variant = 'default',
  className = ''
}: FullLogoProps) {
  // Determine colors based on variant
  const iconColor = variant === 'monochrome' ? 'currentColor' : color
  const resolvedTextColor = textColor || (variant === 'light' ? '#3a2e25' : variant === 'monochrome' ? 'currentColor' : 'white')

  const textSize = size * 0.45
  const totalWidth = size * 4.5

  return (
    <svg
      width={totalWidth}
      height={size}
      viewBox="0 0 180 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Rati Tours - Georgia Travel"
    >
      {/* Icon */}
      <g transform="translate(0, 0)">
        {/* Background circle */}
        <circle cx="20" cy="20" r="19" fill={iconColor} />

        {/* Mountain silhouette */}
        <path
          d="M5 27L10 16L14 20L20 12L26 20L30 16L35 27"
          stroke={variant === 'monochrome' ? iconColor : 'white'}
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
          style={{ filter: variant === 'monochrome' ? undefined : undefined }}
        />
        {variant !== 'monochrome' && (
          <>
            {/* Road */}
            <path
              d="M8 31C11 29.5 14 30 18 29C22 28 26 28.5 32 30"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
              fill="none"
              opacity="0.7"
            />
            {/* Peak accent */}
            <path
              d="M20 12L20 9"
              stroke="white"
              strokeWidth="1.5"
              strokeLinecap="round"
            />
          </>
        )}
      </g>

      {/* Text: RATI TOURS */}
      <g transform="translate(48, 0)">
        {/* RATI */}
        <text
          x="0"
          y="26"
          fill={resolvedTextColor}
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="18"
          fontWeight="700"
          letterSpacing="0.15em"
        >
          RATI
        </text>
        {/* TOURS */}
        <text
          x="62"
          y="26"
          fill={variant === 'light' ? '#967259' : variant === 'monochrome' ? 'currentColor' : color}
          fontFamily="system-ui, -apple-system, sans-serif"
          fontSize="18"
          fontWeight="700"
          letterSpacing="0.15em"
        >
          TOURS
        </text>
      </g>
    </svg>
  )
}

// Stacked/vertical version for special uses
export function LogoStacked({
  size = 80,
  color = '#c9a84c',
  textColor = 'white',
  className = ''
}: FullLogoProps) {
  return (
    <svg
      width={size}
      height={size * 1.4}
      viewBox="0 0 80 112"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
      aria-label="Rati Tours"
    >
      {/* Icon centered */}
      <g transform="translate(8, 0)">
        <circle cx="32" cy="32" r="30" fill={color} />
        <path
          d="M10 44L18 28L24 34L32 22L40 34L46 28L54 44"
          stroke="white"
          strokeWidth="3"
          strokeLinecap="round"
          strokeLinejoin="round"
          fill="none"
        />
        <path
          d="M14 52C20 49 26 50 32 48C38 46 44 47 50 50"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
          fill="none"
          opacity="0.7"
        />
        <path
          d="M32 22L32 16"
          stroke="white"
          strokeWidth="2"
          strokeLinecap="round"
        />
      </g>

      {/* Text below */}
      <text
        x="40"
        y="88"
        fill={textColor}
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="14"
        fontWeight="700"
        letterSpacing="0.2em"
        textAnchor="middle"
      >
        RATI
      </text>
      <text
        x="40"
        y="106"
        fill={color}
        fontFamily="system-ui, -apple-system, sans-serif"
        fontSize="12"
        fontWeight="600"
        letterSpacing="0.15em"
        textAnchor="middle"
      >
        TOURS
      </text>
    </svg>
  )
}

// Default export is the icon for easy imports
export default LogoIcon
