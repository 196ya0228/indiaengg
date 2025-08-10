import React from 'react';

// Mechanical Gear SVG Component
export const MechanicalGear = ({ 
  size = 40, 
  color = "currentColor", 
  className = "",
  animate = false 
}: {
  size?: number;
  color?: string;
  className?: string;
  animate?: boolean;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 100 100"
    className={`${className} ${animate ? 'animate-spin' : ''}`}
    style={{ animationDuration: animate ? '10s' : undefined }}
  >
    <path
      d="M50 10 L60 15 L70 10 L75 20 L85 25 L80 35 L90 40 L85 50 L90 60 L80 65 L85 75 L75 80 L70 90 L60 85 L50 90 L40 85 L30 90 L25 80 L15 75 L20 65 L10 60 L15 50 L10 40 L20 35 L15 25 L25 20 L30 10 L40 15 Z"
      fill={color}
      opacity="0.8"
    />
    <circle cx="50" cy="50" r="15" fill="none" stroke={color} strokeWidth="3" />
    <circle cx="50" cy="50" r="8" fill={color} />
  </svg>
);

// Industrial Pipe Component
export const IndustrialPipe = ({ 
  width = 200, 
  height = 20, 
  color = "#64748b",
  className = ""
}: {
  width?: number;
  height?: number;
  color?: string;
  className?: string;
}) => (
  <svg
    width={width}
    height={height}
    className={className}
    viewBox={`0 0 ${width} ${height}`}
  >
    <rect x="0" y="0" width={width} height={height} fill={color} rx="2" />
    <rect x="0" y="2" width={width} height="3" fill="#475569" />
    <rect x="0" y={height-5} width={width} height="3" fill="#334155" />
    {/* Pipe joints */}
    {Array.from({ length: Math.floor(width / 40) }).map((_, i) => (
      <rect
        key={i}
        x={i * 40 + 15}
        y="-2"
        width="10"
        height={height + 4}
        fill="#374151"
        rx="1"
      />
    ))}
  </svg>
);

// Mechanical Cog Wheel
export const CogWheel = ({ 
  size = 60, 
  color = "#374151",
  className = "",
  rotate = 0
}: {
  size?: number;
  color?: string;
  className?: string;
  rotate?: number;
}) => (
  <svg
    width={size}
    height={size}
    viewBox="0 0 60 60"
    className={className}
    style={{ transform: `rotate(${rotate}deg)` }}
  >
    <g fill={color}>
      {/* Outer teeth */}
      {Array.from({ length: 12 }).map((_, i) => (
        <rect
          key={i}
          x="28"
          y="2"
          width="4"
          height="8"
          rx="1"
          transform={`rotate(${i * 30} 30 30)`}
        />
      ))}
      {/* Main body */}
      <circle cx="30" cy="30" r="18" />
      {/* Inner circle */}
      <circle cx="30" cy="30" r="8" fill="none" stroke="#1f2937" strokeWidth="2" />
      {/* Center hole */}
      <circle cx="30" cy="30" r="4" fill="#1f2937" />
    </g>
  </svg>
);

// Industrial Background Pattern
export const IndustrialPattern = ({ className = "" }: { className?: string }) => (
  <div className={`absolute inset-0 ${className}`}>
    {/* Grid pattern */}
    <div className="absolute inset-0 opacity-10">
      <svg width="100%" height="100%">
        <defs>
          <pattern id="industrial-grid" width="40" height="40" patternUnits="userSpaceOnUse">
            <path d="M 40 0 L 0 0 0 40" fill="none" stroke="currentColor" strokeWidth="1"/>
          </pattern>
        </defs>
        <rect width="100%" height="100%" fill="url(#industrial-grid)" />
      </svg>
    </div>

    {/* Floating gears */}
    <div className="absolute top-20 right-20">
      <MechanicalGear size={80} color="#374151" animate className="opacity-20" />
    </div>
    <div className="absolute bottom-32 left-16">
      <CogWheel size={60} color="#475569" className="opacity-15" rotate={45} />
    </div>
    <div className="absolute top-1/2 right-1/3">
      <MechanicalGear size={50} color="#6b7280" animate className="opacity-10" />
    </div>

    {/* Industrial pipes */}
    <div className="absolute top-16 left-0">
      <IndustrialPipe width={300} height={16} color="#64748b" className="opacity-20" />
    </div>
    <div className="absolute bottom-24 right-0">
      <IndustrialPipe width={250} height={12} color="#475569" className="opacity-15" />
    </div>
  </div>
);

// Mechanical Loading Spinner
export const MechanicalLoader = ({ size = 40 }: { size?: number }) => (
  <div className="flex items-center justify-center">
    <div className="relative">
      <MechanicalGear 
        size={size} 
        color="#3b82f6" 
        animate 
        className="absolute"
      />
      <CogWheel 
        size={size * 0.6} 
        color="#1d4ed8" 
        className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2"
        rotate={0}
      />
    </div>
  </div>
);

export default {
  MechanicalGear,
  IndustrialPipe,
  CogWheel,
  IndustrialPattern,
  MechanicalLoader
};
