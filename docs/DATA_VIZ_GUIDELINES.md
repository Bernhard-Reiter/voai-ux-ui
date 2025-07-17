# Cosmic Data Visualization Guidelines

## Core Principles

1. **Monochrome First**: Use shades of accent color for primary data
2. **Semantic for Status**: Reserve colors for success/error/warning states
3. **Minimize Chrome**: Remove unnecessary gridlines, borders, labels
4. **Progressive Disclosure**: Details on hover/interaction

## Color Palette

### Primary Series (Monochrome)
```javascript
const series = [
  'var(--c-accent)',        // 100% - Primary data
  'rgba(79, 70, 229, 0.8)', // 80% - Secondary
  'rgba(79, 70, 229, 0.6)', // 60% - Tertiary
  'rgba(79, 70, 229, 0.4)', // 40% - Supporting
  'rgba(79, 70, 229, 0.2)', // 20% - Background
];
```

### Categorical Data
Only use color when semantically meaningful:
- Success: `var(--c-success)` - Positive metrics
- Warning: `var(--c-warning)` - Attention needed
- Error: `var(--c-error)` - Critical issues
- Info: `var(--c-info)` - Informational
- Neutral: `var(--c-neutral)` - Baseline/average

## Chart Types

### Line Charts
- **Stroke Width**: 2px
- **Smoothing**: Yes (monotone curve)
- **Dots**: Hidden by default, show on hover
- **Grid**: Dashed lines with low opacity

### Bar Charts
- **Corner Radius**: 4px (top only)
- **Max Width**: 48px
- **Spacing**: Equal to 50% of bar width
- **Grid**: Horizontal lines only

### Pie/Donut Charts
- **Inner Radius**: 60% (prefer donut)
- **Pad Angle**: 2° between segments
- **Labels**: Outside with leader lines
- **Animation**: Clockwise reveal

### Area Charts
- **Fill Opacity**: 0.1
- **Stroke**: Same as line charts
- **Stack**: Use opacity layers

## Component Examples

### Recharts Implementation
```tsx
import { LineChart, Line, XAxis, YAxis, Tooltip } from 'recharts';
import { cosmicChartTheme, cosmicChartColors } from '@voai/ui/charts';

<LineChart data={data}>
  <XAxis 
    stroke={cosmicChartTheme.recharts.axis.stroke}
    tick={cosmicChartTheme.recharts.axis.tick}
  />
  <YAxis 
    stroke={cosmicChartTheme.recharts.axis.stroke}
    tick={cosmicChartTheme.recharts.axis.tick}
  />
  <Tooltip 
    contentStyle={cosmicChartTheme.recharts.tooltip}
  />
  <Line 
    type="monotone" 
    dataKey="value" 
    stroke={cosmicChartColors.series[0]}
    strokeWidth={2}
    dot={false}
    activeDot={{ r: 5 }}
  />
</LineChart>
```

### Chart.js Implementation
```javascript
import { cosmicChartTheme } from '@voai/ui/charts';

const options = {
  ...cosmicChartTheme.chartjs,
  responsive: true,
  maintainAspectRatio: false,
};
```

## Interaction Patterns

### Hover States
- Show exact values in tooltip
- Highlight active element
- Dim other elements to 60% opacity

### Click Actions
- Drill-down to detailed view
- Filter related data
- Open contextual menu

### Animations
- Initial: Fade in over 500ms
- Updates: Smooth transition 300ms
- Loading: Skeleton pulse

## Accessibility

### Color Contrast
- All text must meet WCAG AA (4.5:1)
- Use patterns/textures for colorblind users
- Provide data tables as alternative

### Keyboard Navigation
- Tab through data points
- Arrow keys for selection
- Enter/Space for actions

### Screen Readers
- Descriptive chart titles
- Summary statistics in aria-label
- Data table fallback

## Performance

### Data Limits
- Line: Max 100 points (sample if more)
- Bar: Max 50 bars (paginate if more)
- Pie: Max 8 segments (group "Others")

### Optimization
- Use React.memo for chart components
- Debounce resize events
- Lazy load chart libraries

## Don'ts

- ❌ 3D effects or skeuomorphism
- ❌ More than 5 colors in one chart
- ❌ Animations longer than 500ms
- ❌ Auto-updating without user control
- ❌ Truncated axes that distort data