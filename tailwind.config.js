/** @type {import('tailwindcss').Config} */
module.exports = {
  // Modo oscuro basado en una clase
  darkMode: ['class'],
  
  // Rutas a todos los archivos que usan clases de Tailwind
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
  ],
  
  theme: {
    extend: {
      // Extensión de colores personalizados
      colors: {
        sunrise: '#FFDD57', // Amarillo solar
        sunset: '#FF8A5C',  // Naranja cálido
        sky: '#87CEEB',      // Azul cielo claro
        foliage: '#4CAF50',  // Verde follaje
        dusk: '#2C3E50',     // Azul oscuro crepúsculo
        sunbeam: '#FFD700',  // Dorado brillante

        // Colores personalizados utilizando variables CSS
        bgCustom: 'hsl(var(--background))',
        textCustom: 'hsl(var(--foreground))',
        borderCustom: 'hsl(var(--border))',

        // Colores compuestos para componentes específicos
        card: {
          DEFAULT: 'hsl(var(--card))',
          foreground: 'hsl(var(--card-foreground))',
        },
        popover: {
          DEFAULT: 'hsl(var(--popover))',
          foreground: 'hsl(var(--popover-foreground))',
        },
        primary: {
          DEFAULT: 'hsl(var(--primary))',
          foreground: 'hsl(var(--primary-foreground))',
        },
        secondary: {
          DEFAULT: 'hsl(var(--secondary))',
          foreground: 'hsl(var(--secondary-foreground))',
        },
        muted: {
          DEFAULT: 'hsl(var(--muted))',
          foreground: 'hsl(var(--muted-foreground))',
        },
        accent: {
          DEFAULT: 'hsl(var(--accent))',
          foreground: 'hsl(var(--accent-foreground))',
        },
        destructive: {
          DEFAULT: 'hsl(var(--destructive))',
          foreground: 'hsl(var(--destructive-foreground))',
        },
        input: 'hsl(var(--input))',
        ring: 'hsl(var(--ring))',
        chart: {
          1: 'hsl(var(--chart-1))',
          2: 'hsl(var(--chart-2))',
          3: 'hsl(var(--chart-3))',
          4: 'hsl(var(--chart-4))',
          5: 'hsl(var(--chart-5))',
        },
      },

      // Extensión del radio de borde utilizando variables CSS
      borderRadius: {
        lg: 'var(--radius)',
        md: 'calc(var(--radius) - 2px)',
        sm: 'calc(var(--radius) - 4px)',
      },

      // Definición de keyframes para animaciones personalizadas
      keyframes: {
        pulseEffect: {
          '0%': {
            transform: 'scale(0.95)',
            opacity: '0.5',
          },
          '50%': {
            transform: 'scale(1.05)',
            opacity: '0.25',
          },
          '100%': {
            transform: 'scale(0.95)',
            opacity: '0.5',
          },
        },
        pulse1: {
          '0%': { transform: 'scale(0.95)', opacity: '0.5' },
          '50%': { transform: 'scale(1)', opacity: '0.2' },
          '100%': { transform: 'scale(1.05)', opacity: '0' },
        },
        pulse2: {
          '0%': { transform: 'scale(0.9)', opacity: '0.4' },
          '50%': { transform: 'scale(1)', opacity: '0.2' },
          '100%': { transform: 'scale(1.1)', opacity: '0' },
        },
        pulse: {
          '0%': { transform: 'scale(0.8)', opacity: '0.7' },
          '100%': { transform: 'scale(1.5)', opacity: '0' },
        },
        glow: {
          '0%': { opacity: '0.3' },
          '50%': { opacity: '0.5' },
          '100%': { opacity: '0.3' },
        },
      },

      // Definición de clases de animación personalizadas
      animation: {
        'pulseEffect': 'pulseEffect 1.6s cubic-bezier(0, 0, 0.2, 1) infinite',
        'pulse-fast': 'pulseEffect 1.2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'pulse-medium': 'pulseEffect 1.6s cubic-bezier(0, 0, 0.2, 1) infinite',
        'pulse-slow': 'pulseEffect 2s cubic-bezier(0, 0, 0.2, 1) infinite',
        'pulse1': 'pulse1 2s infinite',
        'pulse2': 'pulse2 2s infinite',
        'pulse': 'pulse 2s infinite',
        'glow': 'glow 2s infinite',
      },
    },
  },

  // Inclusión de plugins necesarios
  plugins: [
    require('tailwindcss-animate'), // Asegúrate de tener instalado este plugin
    require('tailwind-scrollbar'),  // Asegúrate de tener instalado este plugin
  ],
};

