'use client';

import { TrendingUp } from 'lucide-react';
import { CartesianGrid, Line, LineChart, XAxis, YAxis, Tooltip } from 'recharts';

import {
  Card,
  CardContent,
  CardDescription,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import {
  ChartContainer,
  ChartTooltip,
  ChartTooltipContent,
  type ChartConfig,
} from '@/components/ui/chart';

const chartData = [
  { stage: 'البداية', certainty: 10, happiness: 20 },
  { stage: 'الاستكشاف', certainty: 25, happiness: 30 },
  { stage: 'التفكر', certainty: 40, happiness: 50 },
  { stage: 'شك', certainty: 30, happiness: 35 },
  { stage: 'المعرفة', certainty: 60, happiness: 70 },
  { stage: 'الممارسة', certainty: 75, happiness: 85 },
  { stage: 'اختبار', certainty: 65, happiness: 70 },
  { stage: 'الرسوخ', certainty: 90, happiness: 95 },
];

const chartConfig = {
  certainty: {
    label: 'مستوى اليقين',
    color: 'hsl(var(--primary))',
  },
  happiness: {
    label: 'السعادة والطمأنينة',
    color: 'hsl(var(--accent))',
  },
} satisfies ChartConfig;

export default function CertaintyChart() {
  return (
      <ChartContainer config={chartConfig} className="min-h-[200px] w-full">
        <LineChart
          accessibilityLayer
          data={chartData}
          margin={{
            top: 10,
            right: 10,
            left: -20,
            bottom: 0,
          }}
        >
          <CartesianGrid vertical={false} />
          <XAxis
            dataKey="stage"
            tickLine={false}
            axisLine={false}
            tickMargin={8}
            tickFormatter={(value) => value.slice(0, 10)}
          />
          <YAxis 
            tickLine={false}
            axisLine={false}
            tickMargin={8}
          />
          <ChartTooltip cursor={false} content={<ChartTooltipContent />} />
          <Line
            dataKey="certainty"
            type="monotone"
            stroke="var(--color-certainty)"
            strokeWidth={3}
            dot={{
              fill: 'var(--color-certainty)',
            }}
            activeDot={{
              r: 6,
            }}
          />
          <Line
            dataKey="happiness"
            type="monotone"
            stroke="var(--color-happiness)"
            strokeWidth={3}
            dot={{
                fill: 'var(--color-happiness)',
            }}
            activeDot={{
              r: 6,
            }}
          />
        </LineChart>
      </ChartContainer>
  );
}
