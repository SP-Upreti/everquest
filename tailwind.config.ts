import type { Config } from "tailwindcss";

const config: Config = {
    darkMode: ["class"],
    content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	fontFamily: {
  		sans: [
  			'Inter',
  			'ui-sans-serif',
  			'system-ui',
  			'-apple-system',
  			'BlinkMacSystemFont',
  			'Segoe UI',
  			'Roboto',
  			'Helvetica Neue',
  			'Arial',
  			'Noto Sans',
  			'sans-serif',
  			'Apple Color Emoji',
  			'Segoe UI Emoji',
  			'Segoe UI Symbol',
  			'Noto Color Emoji'
  		]
  	},
  	extend: {
  		screens: {
  			xs: '360px',
  			sm: '640px',
  			md: '768px',
  			lg: '1024px',
  			xl: '1280px',
  			'2xl': '1536px',
  			'3xl': '2000px'
  		},
  		colors: {
  			primary: {
  				'50': '#fbf5ef',
  				'100': '#f2e5d3',
  				'200': '#e4c8a3',
  				'300': '#d6a873',
  				'400': '#cc8d53',
  				'500': '#b76b3a',
  				'600': '#ab5834',
  				'700': '#8f412e',
  				'800': '#75362b',
  				'900': '#612d26',
  				'950': '#371511',
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			primary2: '#F67B01',
  			secondary: {
  				'50': '#F3F3F3',
  				'100': '#E6E6E6',
  				'200': '#C1C1C1',
  				'300': '#9B9B9B',
  				'400': '#505050',
  				'500': '#050505',
  				'600': '#050505',
  				'700': '#030303',
  				'800': '#020202',
  				'900': '#020202',
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
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
  		backgroundImage: {
  			parallax: 'url("/bannerImg.jpeg")',
  			guides: 'url("/ourguides.jpeg")',
  			nextadv: 'url("/nextadv.jpeg")',
  			testimonial: 'url("/testimonial.jpeg")',
  			'gradient-conic': 'conic-gradient(from 180deg at 50% 50%, var(--tw-gradient-stops))'
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
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
  plugins: [require("tailwindcss-animate")],
};
export default config;
