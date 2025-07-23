/** @jsxImportSource @emotion/react */
import type { Meta, StoryObj } from '@storybook/react';
import {
  TwinCard,
  TwinCardHeader,
  TwinCardTitle,
  TwinCardDescription,
  TwinCardContent,
  TwinCardFooter,
  GradientBorderCard,
  GlassCard,
  NeumorphicCard,
} from './TwinCard';
import { TwinButton } from '../atoms/TwinButton';
import { Badge } from '../atoms/Badge';
import { Star, TrendingUp, Users } from 'lucide-react';
import tw, { css } from 'twin.macro';
import * as React from 'react';

const meta = {
  title: 'Molecules/TwinCard',
  component: TwinCard,
  parameters: {
    layout: 'centered',
    docs: {
      description: {
        component: 'Card-Komponente mit Twin.macro für pixel-perfekte Layouts und verschiedene Stil-Varianten.',
      },
    },
  },
  tags: ['autodocs'],
  decorators: [
    (Story) => (
      <div css={tw`min-w-[350px] p-8`}>
        <Story />
      </div>
    ),
  ],
} satisfies Meta<typeof TwinCard>;

export default meta;
type Story = StoryObj<typeof meta>;

// Basic Card
export const Default: Story = {
  render: () => (
    <TwinCard>
      <TwinCardHeader>
        <TwinCardTitle>Standard Card</TwinCardTitle>
      </TwinCardHeader>
      <TwinCardContent>
        <p>Dies ist eine Standard-Card mit Twin.macro Styling.</p>
      </TwinCardContent>
    </TwinCard>
  ),
};

// Card Variants
export const Variants: Story = {
  render: () => (
    <div css={tw`space-y-6`}>
      <TwinCard variant="default">
        <TwinCardTitle>Default Variant</TwinCardTitle>
        <TwinCardDescription>Standardmäßige Card mit Border</TwinCardDescription>
      </TwinCard>
      
      <TwinCard variant="bordered">
        <TwinCardTitle>Bordered Variant</TwinCardTitle>
        <TwinCardDescription>Card mit verstärktem Border</TwinCardDescription>
      </TwinCard>
      
      <TwinCard variant="elevated">
        <TwinCardTitle>Elevated Variant</TwinCardTitle>
        <TwinCardDescription>Card mit Schatten-Effekt</TwinCardDescription>
      </TwinCard>
      
      <TwinCard variant="glass">
        <TwinCardTitle>Glass Variant</TwinCardTitle>
        <TwinCardDescription>Glassmorphism-Effekt</TwinCardDescription>
      </TwinCard>
    </div>
  ),
};

// Interactive Card
export const Interactive: Story = {
  render: () => (
    <TwinCard variant="elevated" interactive>
      <TwinCardHeader>
        <TwinCardTitle>Klickbare Card</TwinCardTitle>
        <Badge variant="info">Neu</Badge>
      </TwinCardHeader>
      <TwinCardContent>
        <p>Diese Card reagiert auf Hover und Klick mit sanften Animationen.</p>
      </TwinCardContent>
      <TwinCardFooter>
        <span tw="text-sm text-gray-500">Klicken Sie die Card an</span>
      </TwinCardFooter>
    </TwinCard>
  ),
};

// Feature Card
export const FeatureCard: Story = {
  render: () => (
    <TwinCard variant="elevated">
      <TwinCardHeader noPadding>
        <div css={tw`flex items-center gap-3`}>
          <div css={tw`p-3 bg-blue-100 rounded-lg`}>
            <TrendingUp tw="w-6 h-6 text-blue-600" />
          </div>
          <div>
            <TwinCardTitle>Analytics Dashboard</TwinCardTitle>
            <TwinCardDescription>Echtzeit-Datenvisualisierung</TwinCardDescription>
          </div>
        </div>
      </TwinCardHeader>
      <TwinCardContent>
        <div css={tw`space-y-3 my-4`}>
          <div css={tw`flex justify-between items-center`}>
            <span tw="text-sm">Aktive Nutzer</span>
            <span tw="font-semibold">2,543</span>
          </div>
          <div css={tw`flex justify-between items-center`}>
            <span tw="text-sm">Conversion Rate</span>
            <span tw="font-semibold text-green-600">+12.5%</span>
          </div>
        </div>
      </TwinCardContent>
      <TwinCardFooter>
        <TwinButton size="sm" fullWidth>
          Details anzeigen
        </TwinButton>
      </TwinCardFooter>
    </TwinCard>
  ),
};

// Gradient Border Card
export const GradientBorder: Story = {
  render: () => (
    <GradientBorderCard gradient="linear-gradient(135deg, #f093fb 0%, #f5576c 100%)">
      <div css={tw`p-6`}>
        <TwinCardTitle>Premium Feature</TwinCardTitle>
        <TwinCardDescription>
          Exklusive Funktionen für Premium-Nutzer
        </TwinCardDescription>
        <div css={tw`mt-6`}>
          <TwinButton variant="primary" size="sm">
            Upgrade Now
          </TwinButton>
        </div>
      </div>
    </GradientBorderCard>
  ),
};

// Glass Cards
export const GlassCards: Story = {
  render: () => (
    <div
      css={css`
        ${tw`relative p-12 rounded-2xl overflow-hidden`}
        background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
      `}
    >
      <div css={tw`grid gap-6`}>
        {(['sm', 'md', 'lg'] as const).map((blur) => (
          <GlassCard key={blur} blur={blur}>
            <TwinCardTitle css={tw`text-white mb-2`}>
              Blur: {blur}
            </TwinCardTitle>
            <p css={tw`text-white/80`}>
              Glassmorphism mit unterschiedlicher Blur-Intensität
            </p>
          </GlassCard>
        ))}
      </div>
    </div>
  ),
};

// Neumorphic Cards
export const Neumorphic: Story = {
  render: () => {
    const [pressed, setPressed] = React.useState(false);
    
    return (
      <div css={tw`bg-[#e0e5ec] p-12 rounded-2xl`}>
        <div css={tw`grid gap-8`}>
          <NeumorphicCard>
            <TwinCardTitle css={tw`text-gray-700`}>
              Neumorphic Design
            </TwinCardTitle>
            <p css={tw`text-gray-600 mt-2`}>
              Soft UI mit realistischen Schatten
            </p>
          </NeumorphicCard>
          
          <NeumorphicCard
            pressed={pressed}
            onClick={() => setPressed(!pressed)}
            css={tw`cursor-pointer`}
          >
            <TwinCardTitle css={tw`text-gray-700`}>
              Interaktiv
            </TwinCardTitle>
            <p css={tw`text-gray-600 mt-2`}>
              Klicken für Pressed-State
            </p>
          </NeumorphicCard>
        </div>
      </div>
    );
  },
};

// Complex Layout
export const Dashboard: Story = {
  render: () => (
    <div css={tw`grid grid-cols-1 md:grid-cols-3 gap-6 max-w-6xl`}>
      {/* Stats Cards */}
      <TwinCard variant="elevated">
        <div css={tw`flex items-center justify-between`}>
          <div>
            <p css={tw`text-sm text-gray-600`}>Gesamtumsatz</p>
            <p css={tw`text-2xl font-bold mt-1`}>€45,231</p>
            <p css={tw`text-xs text-green-600 mt-1`}>+12.5%</p>
          </div>
          <div css={tw`p-3 bg-green-100 rounded-full`}>
            <TrendingUp tw="w-6 h-6 text-green-600" />
          </div>
        </div>
      </TwinCard>
      
      <TwinCard variant="elevated">
        <div css={tw`flex items-center justify-between`}>
          <div>
            <p css={tw`text-sm text-gray-600`}>Aktive Nutzer</p>
            <p css={tw`text-2xl font-bold mt-1`}>2,543</p>
            <p css={tw`text-xs text-blue-600 mt-1`}>+8.2%</p>
          </div>
          <div css={tw`p-3 bg-blue-100 rounded-full`}>
            <Users tw="w-6 h-6 text-blue-600" />
          </div>
        </div>
      </TwinCard>
      
      <TwinCard variant="elevated">
        <div css={tw`flex items-center justify-between`}>
          <div>
            <p css={tw`text-sm text-gray-600`}>Bewertung</p>
            <p css={tw`text-2xl font-bold mt-1`}>4.8</p>
            <div css={tw`flex gap-1 mt-1`}>
              {[...Array(5)].map((_, i) => (
                <Star
                  key={i}
                  tw="w-3 h-3"
                  css={i < 4 ? tw`text-yellow-400 fill-current` : tw`text-gray-300`}
                />
              ))}
            </div>
          </div>
          <div css={tw`p-3 bg-yellow-100 rounded-full`}>
            <Star tw="w-6 h-6 text-yellow-600" />
          </div>
        </div>
      </TwinCard>
    </div>
  ),
};