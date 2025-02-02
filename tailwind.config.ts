/** @type {import('tailwindcss').Config} */
import type { Config } from "tailwindcss";

const config: Config = {
	darkMode: ["class"],
	content: [
		"./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/components/**/*.{js,ts,jsx,tsx,mdx}",
		"./src/app/**/*.{js,ts,jsx,tsx,mdx}",
	],
	theme: {
    	extend: {
    		fontFamily: {
    			body: [
    				'var(--font-body)'
    			],
    			heading: [
    				'var(--font-heading)'
    			]
    		},
    		colors: {
    			blue: {
    				'50': '#E7E8EC',
    				'100': '#B4B9C3',
    				'200': '#9097A6',
    				'300': '#5D687E',
    				'400': '#3D4A65',
    				'500': '#0D1D3E',
    				'600': '#0C1A38',
    				'700': '#09152C',
    				'800': '#071022',
    				'900': '#050C1A'
    			},
    			teal: {
    				'50': '#EEF7F7',
    				'100': '#C9E5E7',
    				'200': '#AFD8DB',
    				'300': '#8AC6CB',
    				'400': '#74BBC1',
    				'500': '#51AAB1',
    				'600': '#4A9BA1',
    				'700': '#3A797E',
    				'800': '#2D5E61',
    				'900': '#22474A'
    			},
    			brown: {
    				'50': '#F8F1EA',
    				'100': '#E8D4BD',
    				'200': '#DDBF9D',
    				'300': '#CEA271',
    				'400': '#C59055',
    				'500': '#B6742B',
    				'600': '#A66A27',
    				'700': '#81521F',
    				'800': '#644018',
    				'900': '#4C3112'
    			},
    			background: 'hsl(var(--background))',
    			foreground: 'hsl(var(--foreground))',
    			card: {
    				DEFAULT: 'hsl(var(--card))',
    				foreground: 'hsl(var(--card-foreground))'
    			},
    			popover: {
    				DEFAULT: 'hsl(var(--popover))',
    				foreground: 'hsl(var(--popover-foreground))'
    			},
    			primary: {
    				DEFAULT: 'hsl(var(--primary))',
    				foreground: 'hsl(var(--primary-foreground))'
    			},
    			secondary: {
    				DEFAULT: 'hsl(var(--secondary))',
    				foreground: 'hsl(var(--secondary-foreground))'
    			},
    			muted: {
    				DEFAULT: 'hsl(var(--muted))',
    				foreground: 'hsl(var(--muted-foreground))'
    			},
    			accent: {
    				DEFAULT: 'hsl(var(--accent))',
    				foreground: 'hsl(var(--accent-foreground))'
    			},
    			destructive: {
    				DEFAULT: 'hsl(var(--destructive))',
    				foreground: 'hsl(var(--destructive-foreground))'
    			},
    			border: 'hsl(var(--border))',
    			input: 'hsl(var(--input))',
    			ring: 'hsl(var(--ring))',
    			chart: {
    				'1': 'hsl(var(--chart-1))',
    				'2': 'hsl(var(--chart-2))',
    				'3': 'hsl(var(--chart-3))',
    				'4': 'hsl(var(--chart-4))',
    				'5': 'hsl(var(--chart-5))'
    			}
    		},
    		borderRadius: {
    			lg: 'var(--radius)',
    			md: 'calc(var(--radius) - 2px)',
    			sm: 'calc(var(--radius) - 4px)'
    		},
    		keyframes: {
    			marquee: {
    				to: {
    					transform: 'translateX(-50%)'
    				}
    			},
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
    			marquee: 'marquee var(--duration, 30s) linear infinite',
    			'accordion-down': 'accordion-down 0.2s ease-out',
    			'accordion-up': 'accordion-up 0.2s ease-out'
    		}
    	}
    },
	plugins: [require("tailwindcss-animate")],
};
export default config;
