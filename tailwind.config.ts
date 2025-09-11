import type { Config } from "tailwindcss";

export default {
	darkMode: ["class"],
	content: [
		"./pages/**/*.{ts,tsx}",
		"./components/**/*.{ts,tsx}",
		"./app/**/*.{ts,tsx}",
		"./src/**/*.{ts,tsx}",
	],
	prefix: "",
	theme: {
		container: {
			center: true,
			padding: '2rem',
			screens: {
				'2xl': '1400px'
			}
		},
		extend: {
			fontFamily: {
				'inter': ['Inter', 'sans-serif'],
				'ethiopic': ['Noto Sans Ethiopic', 'serif'],
				'sans': ['Inter', 'Noto Sans Ethiopic', 'sans-serif'],
			},
			colors: {
				border: 'hsl(var(--border))',
				input: 'hsl(var(--input))',
				ring: 'hsl(var(--ring))',
				background: 'hsl(var(--background))',
				foreground: 'hsl(var(--foreground))',
				primary: {
					DEFAULT: 'hsl(var(--primary))',
					variant: 'hsl(var(--primary-variant))',
					glow: 'hsl(var(--primary-glow))',
					foreground: 'hsl(var(--primary-foreground))'
				},
				'accent-orange': {
					DEFAULT: 'hsl(var(--accent-orange))',
					foreground: 'hsl(var(--accent-orange-foreground))'
				},
				'accent-teal': {
					DEFAULT: 'hsl(var(--accent-teal))',
					foreground: 'hsl(var(--accent-teal-foreground))'
				},
				'ethiopian-green': {
					DEFAULT: 'hsl(var(--ethiopian-green))',
					foreground: 'hsl(var(--ethiopian-green-foreground))'
				},
				'ethiopian-yellow': {
					DEFAULT: 'hsl(var(--ethiopian-yellow))',
					foreground: 'hsl(var(--ethiopian-yellow-foreground))'
				},
				'ethiopian-red': {
					DEFAULT: 'hsl(var(--ethiopian-red))',
					foreground: 'hsl(var(--ethiopian-red-foreground))'
				},
				secondary: {
					DEFAULT: 'hsl(var(--secondary))',
					foreground: 'hsl(var(--secondary-foreground))'
				},
				destructive: {
					DEFAULT: 'hsl(var(--destructive))',
					foreground: 'hsl(var(--destructive-foreground))'
				},
				muted: {
					DEFAULT: 'hsl(var(--muted))',
					foreground: 'hsl(var(--muted-foreground))'
				},
				accent: {
					DEFAULT: 'hsl(var(--accent))',
					foreground: 'hsl(var(--accent-foreground))'
				},
				popover: {
					DEFAULT: 'hsl(var(--popover))',
					foreground: 'hsl(var(--popover-foreground))'
				},
				card: {
					DEFAULT: 'hsl(var(--card))',
					foreground: 'hsl(var(--card-foreground))'
				},
				success: {
					DEFAULT: 'hsl(var(--success))',
					foreground: 'hsl(var(--success-foreground))'
				},
				warning: {
					DEFAULT: 'hsl(var(--warning))',
					foreground: 'hsl(var(--warning-foreground))'
				},
				answered: {
					DEFAULT: 'hsl(var(--answered))',
					foreground: 'hsl(var(--answered-foreground))'
				},
				flagged: {
					DEFAULT: 'hsl(var(--flagged))',
					foreground: 'hsl(var(--flagged-foreground))'
				},
				current: {
					DEFAULT: 'hsl(var(--current))',
					foreground: 'hsl(var(--current-foreground))'
				},
				sidebar: {
					DEFAULT: 'hsl(var(--sidebar-background))',
					foreground: 'hsl(var(--sidebar-foreground))',
					primary: 'hsl(var(--sidebar-primary))',
					'primary-foreground': 'hsl(var(--sidebar-primary-foreground))',
					accent: 'hsl(var(--sidebar-accent))',
					'accent-foreground': 'hsl(var(--sidebar-accent-foreground))',
					border: 'hsl(var(--sidebar-border))',
					ring: 'hsl(var(--sidebar-ring))'
				}
			},
			borderRadius: {
				lg: 'var(--radius)',
				md: 'calc(var(--radius) - 2px)',
				sm: 'calc(var(--radius) - 4px)'
			},
			backgroundImage: {
				'gradient-primary': 'var(--gradient-primary)',
				'gradient-hero': 'var(--gradient-hero)',
				'gradient-card': 'var(--gradient-card)',
				'gradient-floating': 'var(--gradient-floating)',
				'gradient-exam': 'var(--gradient-exam)',
				'gradient-accent': 'var(--gradient-accent)',
				'texture': 'var(--bg-texture)'
			},
			backgroundSize: {
				'texture': 'var(--bg-texture-size)'
			},
			boxShadow: {
				'elegant': 'var(--shadow-elegant)',
				'exam': 'var(--shadow-exam)',
				'floating': 'var(--shadow-floating)',
				'glow': 'var(--shadow-glow)'
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
				},
				'slide-in-right': {
					'0%': {
						transform: 'translateX(30px)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateX(0)',
						opacity: '1'
					}
				},
				'slide-in-left': {
					'0%': {
						transform: 'translateX(-30px)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateX(0)',
						opacity: '1'
					}
				},
				'fade-in-up': {
					'0%': {
						transform: 'translateY(20px)',
						opacity: '0'
					},
					'100%': {
						transform: 'translateY(0)',
						opacity: '1'
					}
				},
				'bounce-subtle': {
					'0%, 100%': {
						transform: 'scale(1)'
					},
					'50%': {
						transform: 'scale(1.05)'
					}
				},
				'exam-pulse': {
					'0%, 100%': {
						opacity: '1',
						transform: 'scale(1)'
					},
					'50%': {
						opacity: '0.7',
						transform: 'scale(1.02)'
					}
				},
				'fast-bounce': {
					'0%, 100%': {
						transform: 'translateY(0)',
						animationTimingFunction: 'cubic-bezier(0,0,0.2,1)'
					},
					'50%': {
						transform: 'translateY(-25%)',
						animationTimingFunction: 'cubic-bezier(0.8,0,1,1)'
					}
				}
			},
			animation: {
				'accordion-down': 'accordion-down 0.1s ease-out',
				'accordion-up': 'accordion-up 0.1s ease-out',
				'slide-in-right': 'slide-in-right 0.1s ease-out',
				'slide-in-left': 'slide-in-left 0.1s ease-out',
				'fade-in-up': 'fade-in-up 0.1s ease-out',
				'bounce-subtle': 'bounce-subtle 0.2s ease-in-out',
				'exam-pulse': 'exam-pulse 0.4s ease-in-out infinite',
				'fast-bounce': 'fast-bounce 0.2s ease-in-out infinite',
				'bounce': 'fast-bounce 0.2s ease-in-out infinite'
			}
		}
	},
	plugins: [require("tailwindcss-animate")],
} satisfies Config;
