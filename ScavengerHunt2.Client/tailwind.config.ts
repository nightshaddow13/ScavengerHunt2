import { type Config } from 'tailwindcss'

const config: Config = {
    darkMode: 'class', // or 'media' if you prefer system
    theme: {
        container: {
            center: true,
            padding: "2rem",
            screens: {
                "2xl": "1400px",
            },
        },
        extend: {
            // Custom color scheme for the app
            colors: {
                cubBlue: '#003087',
                cubGold: '#FFB81C',
                cubOrange: '#E67E22',
                textLight: '#FFFFFF',
                textDark: '#1F2937',
                bgLight: '#FFFFFF',
                bgDark: '#1F2937',

                // Existing color tokens from second config
                'link-dark': {
                    DEFAULT: '#087EA4',
                    dark: '#149ECA'
                },
                border: "hsl(var(--border))",
                input: "hsl(var(--input))",
                ring: "hsl(var(--ring))",
                background: "hsl(var(--background))",
                foreground: "hsl(var(--foreground))",
                primary: {
                    DEFAULT: "hsl(var(--primary))",
                    foreground: "hsl(var(--primary-foreground))",
                },
                secondary: {
                    DEFAULT: "hsl(var(--secondary))",
                    foreground: "hsl(var(--secondary-foreground))",
                },
                destructive: {
                    DEFAULT: "hsl(var(--destructive))",
                    foreground: "hsl(var(--destructive-foreground))",
                },
                muted: {
                    DEFAULT: "hsl(var(--muted))",
                    foreground: "hsl(var(--muted-foreground))",
                },
                accent: {
                    DEFAULT: "hsl(var(--accent))",
                    foreground: "hsl(var(--accent-foreground))",
                },
                popover: {
                    DEFAULT: "hsl(var(--popover))",
                    foreground: "hsl(var(--popover-foreground))",
                },
                card: {
                    DEFAULT: "hsl(var(--card))",
                    foreground: "hsl(var(--card-foreground))",
                },
            },

            // Typography overrides
            typography: ({ theme }) => ({
                DEFAULT: {
                    css: {
                        pre: {
                            overflowX: 'auto',
                            maxWidth: 'calc(100vw - 1rem)'
                        },
                        code: {
                            color: theme('colors.blue.500'),
                            backgroundColor: theme('colors.blue.50'),
                            fontWeight: 'normal',
                            borderRadius: '.25rem',
                            padding: '.25em .5rem',
                        },
                        'code::before': { content: '""' },
                        'code::after': { content: '""' },
                    },
                },
            }),

            // Border radius
            borderRadius: {
                lg: "var(--radius)",
                md: "calc(var(--radius) - 2px)",
                sm: "calc(var(--radius) - 4px)",
            },

            // Animations
            keyframes: {
                "accordion-down": {
                    from: { height: "0" },
                    to: { height: "var(--radix-accordion-content-height)" },
                },
                "accordion-up": {
                    from: { height: "var(--radix-accordion-content-height)" },
                    to: { height: "0" },
                },
            },
            animation: {
                "accordion-down": "accordion-down 0.2s ease-out",
                "accordion-up": "accordion-up 0.2s ease-out",
            },
        },
    },
    plugins: [],
}

export default config satisfies Config
