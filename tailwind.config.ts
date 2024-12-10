import type { Config } from 'tailwindcss';

export default {
  darkMode: ['class'],
  content: [
    './src/pages/**/*.{js,ts,jsx,tsx,mdx}',
    './src/components/**/*.{js,ts,jsx,tsx,mdx}',
    './src/app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			background: 'var(--background)',
  			foreground: 'var(--foreground)',
  			emerald: '#26C385',
  			emeraldhover: '#4cd298',
  			celadon: '#A4E6CC',
  			mintcream: '#E9F9F2',
  			blackolive: '#3C3D37',
  			seasalt: '#F9F7F7',
  			erie: '#181C14',
  			sunshine: '#FFD569',
  			bluesky: '#0D92F4',
  			blueskyhover: '#31a2f5'
  		},
  		fontFamily: {
  			poppins: ['var(--font-poppins)'],
  			helvetica: ['var(--font-helvetica-neue)']
  		},
  		fontSize: {
  			h1: '96px',
  			h2: '64px',
  			h3: '48px',
  			h4: '36px',
  			h5: '24px',
  			h6: '20px',
  			'sub-1': '16px',
  			'sub-2': '14px',
  			'body-1': '16px',
  			'body-2': '14px',
  			button: '14px',
  			caption: '12px',
  			overline: '10px',
  			tag: '10px',
  			label: '8px'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		boxShadow: {
  			card: '7px 7px 20px rgba(0, 0, 0, 0.25)'
  		},
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require('tailwindcss-animate')],
} satisfies Config;
