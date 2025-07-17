/**
 * Cosmic Data Visualization Theme
 * Monochrome chart styles that maintain the cosmic aesthetic
 */

// Monochrome chart palette
export const cosmicChartColors = {
  // Primary data series (shades of accent)
  series: [
    'var(--c-accent)',        // Primary series
    'rgba(79, 70, 229, 0.8)', // 80% opacity
    'rgba(79, 70, 229, 0.6)', // 60% opacity
    'rgba(79, 70, 229, 0.4)', // 40% opacity
    'rgba(79, 70, 229, 0.2)', // 20% opacity
  ],
  
  // Categorical data (semantic colors)
  categorical: {
    primary: 'var(--c-accent)',
    success: 'var(--c-success)',
    warning: 'var(--c-warning)',
    error: 'var(--c-error)',
    info: 'var(--c-info)',
    neutral: 'var(--c-neutral)',
  },
  
  // Monochrome gradients
  gradients: {
    cosmic: ['rgba(79, 70, 229, 0)', 'rgba(79, 70, 229, 0.2)'],
    neutral: ['rgba(107, 114, 128, 0)', 'rgba(107, 114, 128, 0.1)'],
  }
};

// Chart component themes
export const cosmicChartTheme = {
  // Recharts theme
  recharts: {
    backgroundColor: 'transparent',
    
    // Grid
    grid: {
      stroke: 'var(--c-border)',
      strokeDasharray: '3 3',
    },
    
    // Axes
    axis: {
      stroke: 'var(--c-border)',
      tick: {
        fill: 'var(--c-text-secondary)',
        fontSize: 12,
      },
    },
    
    // Tooltip
    tooltip: {
      backgroundColor: 'var(--c-surface)',
      border: '1px solid var(--c-border)',
      borderRadius: 'var(--radius-sm)',
      padding: 'var(--space-2)',
      boxShadow: 'var(--elevation-2)',
    },
    
    // Legend
    legend: {
      fontSize: 12,
      fill: 'var(--c-text-secondary)',
    },
  },
  
  // Chart.js theme
  chartjs: {
    plugins: {
      legend: {
        labels: {
          color: 'var(--c-text-secondary)',
          font: {
            size: 12,
          },
        },
      },
      tooltip: {
        backgroundColor: 'var(--c-surface)',
        borderColor: 'var(--c-border)',
        borderWidth: 1,
        titleColor: 'var(--c-text-primary)',
        bodyColor: 'var(--c-text-secondary)',
        cornerRadius: 4,
        padding: 8,
      },
    },
    scales: {
      x: {
        grid: {
          color: 'var(--c-border)',
          borderDash: [3, 3],
        },
        ticks: {
          color: 'var(--c-text-secondary)',
        },
      },
      y: {
        grid: {
          color: 'var(--c-border)',
          borderDash: [3, 3],
        },
        ticks: {
          color: 'var(--c-text-secondary)',
        },
      },
    },
  },
};

// Chart type specific configs
export const chartConfigs = {
  line: {
    smooth: true,
    strokeWidth: 2,
    dot: {
      r: 3,
      strokeWidth: 2,
      fill: 'var(--c-bg)',
    },
    activeDot: {
      r: 5,
      strokeWidth: 2,
      fill: 'var(--c-accent)',
    },
  },
  
  bar: {
    radius: [4, 4, 0, 0], // Rounded top corners
    maxBarSize: 48,
  },
  
  pie: {
    innerRadius: '60%', // Donut style
    cornerRadius: 2,
    padAngle: 2,
  },
  
  area: {
    fillOpacity: 0.1,
    strokeWidth: 2,
  },
};

// Utility functions
export const formatNumber = (value: number): string => {
  if (value >= 1000000) {
    return `${(value / 1000000).toFixed(1)}M`;
  }
  if (value >= 1000) {
    return `${(value / 1000).toFixed(1)}K`;
  }
  return value.toString();
};

export const formatPercent = (value: number): string => {
  return `${(value * 100).toFixed(0)}%`;
};

export const formatCurrency = (value: number): string => {
  return new Intl.NumberFormat('en-US', {
    style: 'currency',
    currency: 'USD',
    minimumFractionDigits: 0,
    maximumFractionDigits: 0,
  }).format(value);
};