import { nextui } from '@nextui-org/theme'
// @ts-expect-error
import scrollbar from 'tailwind-scrollbar-hide'
import type { Config } from 'tailwindcss'

const config: Config = {
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/layout/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/components/(button|checkbox|date-picker|divider|dropdown|input|listbox|modal|radio|select|skeleton|spinner|ripple|calendar|date-input|popover|menu|scroll-shadow).js'
  ],
  theme: {},
  plugins: [nextui(), scrollbar]
}
export default config
