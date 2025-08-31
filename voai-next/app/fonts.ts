import { Epilogue } from 'next/font/google'

// San Francisco System Font für Headlines
// SF Pro Display für große Headlines, SF Pro Text für kleinere
export const sfProDisplay = {
  className: 'font-sf-pro-display',
  style: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Display", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
  },
  variable: '--font-sf-pro-display',
}

export const sfProText = {
  className: 'font-sf-pro-text',
  style: {
    fontFamily: '-apple-system, BlinkMacSystemFont, "SF Pro Text", "SF Pro Icons", "Helvetica Neue", "Helvetica", "Arial", sans-serif',
  },
  variable: '--font-sf-pro-text',
}

// Epilogue für Body Text
export const epilogue = Epilogue({
  subsets: ['latin'],
  variable: '--font-epilogue',
  display: 'swap',
})