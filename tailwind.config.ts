import type { Config } from 'tailwindcss';

const config: Config = {
    darkMode: ['class'],
    content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  theme: {
  	extend: {
  		colors: {
  			primary: {
  				'50': '#ecfeff',
  				'100': '#cffafe',
  				'200': '#a5f3fc',
  				'300': '#67e8f9',
  				'400': '#22d3ee',
  				'500': '#06b6d4',
  				'600': '#0891b2',
  				'700': '#0e7490',
  				'800': '#155e75',
  				'900': '#164e63',
  				DEFAULT: '#22d3ee'
  			},
  			secondary: {
  				'50': '#f0f9ff',
  				'100': '#e0f2fe',
  				'200': '#bae6fd',
  				'300': '#7dd3fc',
  				'400': '#38bdf8',
  				'500': '#0ea5e9',
  				'600': '#0284c7',
  				'700': '#0369a1',
  				'800': '#075985',
  				'900': '#0c4a6e',
  				DEFAULT: '#0ea5e9'
  			},
  			accent: {
  				'50': '#eff6ff',
  				'100': '#dbeafe',
  				'200': '#bfdbfe',
  				'300': '#93c5fd',
  				'400': '#60a5fa',
  				'500': '#3b82f6',
  				'600': '#2563eb',
  				'700': '#1d4ed8',
  				'800': '#1e40af',
  				'900': '#1e3a8a',
  				DEFAULT: '#2563eb'
  			}
  		},
  		fontFamily: {
  			sans: [
  				'var(--font-inter)',
  				'system-ui',
  				'sans-serif'
  			],
  			display: [
  				'var(--font-manrope)',
  				'system-ui',
  				'sans-serif'
  			]
  		},
  		fontSize: {
  			'hero-xl': [
  				'72px',
  				{
  					lineHeight: '1.1',
  					fontWeight: '800'
  				}
  			],
  			'hero-lg': [
  				'56px',
  				{
  					lineHeight: '1.15',
  					fontWeight: '800'
  				}
  			],
  			'hero-md': [
  				'48px',
  				{
  					lineHeight: '1.2',
  					fontWeight: '700'
  				}
  			],
  			'section-title': [
  				'48px',
  				{
  					lineHeight: '1.2',
  					fontWeight: '700'
  				}
  			],
  			'card-title': [
  				'24px',
  				{
  					lineHeight: '1.3',
  					fontWeight: '600'
  				}
  			]
  		},
  		spacing: {
  			section: '120px',
  			'section-mobile': '80px',
  			component: '60px',
  			'component-mobile': '40px'
  		},
  		backgroundImage: {
  			'gradient-hero': 'linear-gradient(135deg, #22d3ee 0%, #0ea5e9 50%, #2563eb 100%)',
  			'gradient-radial': 'radial-gradient(var(--tw-gradient-stops))'
  		},
  		animation: {
  			'fade-in': 'fadeIn 0.6s ease-out',
  			'slide-up': 'slideUp 0.8s ease-out',
  			'slide-in-left': 'slideInLeft 0.8s ease-out',
  			'slide-in-right': 'slideInRight 0.8s ease-out',
  			'scale-in': 'scaleIn 0.5s ease-out',
  			float: 'float 6s ease-in-out infinite',
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		},
  		keyframes: {
  			fadeIn: {
  				'0%': {
  					opacity: '0'
  				},
  				'100%': {
  					opacity: '1'
  				}
  			},
  			slideUp: {
  				'0%': {
  					transform: 'translateY(20px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateY(0)',
  					opacity: '1'
  				}
  			},
  			slideInLeft: {
  				'0%': {
  					transform: 'translateX(-50px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateX(0)',
  					opacity: '1'
  				}
  			},
  			slideInRight: {
  				'0%': {
  					transform: 'translateX(50px)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'translateX(0)',
  					opacity: '1'
  				}
  			},
  			scaleIn: {
  				'0%': {
  					transform: 'scale(0.9)',
  					opacity: '0'
  				},
  				'100%': {
  					transform: 'scale(1)',
  					opacity: '1'
  				}
  			},
  			float: {
  				'0%, 100%': {
  					transform: 'translateY(0px)'
  				},
  				'50%': {
  					transform: 'translateY(-20px)'
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
  		}
  	}
  },
  plugins: [],
};

export default config;
