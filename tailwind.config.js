/** @type {import('tailwindcss').Config} */
module.exports = {
  content: [
    "./src/**/*.{js,jsx,ts,tsx}",
  ],
  theme: {
    extend: {
      colors: {
        primary: '#2E7D32',
        secondary: '#F0B429',
        background: '#FAF7F0',
      },
      // 移动端优化配置
      screens: {
        'xs': '475px',
        '3xl': '1600px',
      },
      spacing: {
        '18': '4.5rem',
        '88': '22rem',
        '128': '32rem',
        '144': '36rem',
      },
      fontSize: {
        '2xs': ['0.625rem', { lineHeight: '0.75rem' }],
        '3xl': ['1.875rem', { lineHeight: '2.25rem' }],
        '4xl': ['2.25rem', { lineHeight: '2.5rem' }],
        '5xl': ['3rem', { lineHeight: '1' }],
        '6xl': ['3.75rem', { lineHeight: '1' }],
        '7xl': ['4.5rem', { lineHeight: '1' }],
        '8xl': ['6rem', { lineHeight: '1' }],
        '9xl': ['8rem', { lineHeight: '1' }],
      },
      maxWidth: {
        '8xl': '88rem',
        '9xl': '96rem',
      },
      animation: {
        'fade-in': 'fadeIn 0.5s ease-in-out',
        'slide-up': 'slideUp 0.3s ease-out',
        'slide-down': 'slideDown 0.3s ease-out',
        'slide-left': 'slideLeft 0.3s ease-out',
        'slide-right': 'slideRight 0.3s ease-out',
        'scale-in': 'scaleIn 0.2s ease-out',
        'bounce-soft': 'bounceSoft 2s infinite',
        'pulse-soft': 'pulseSoft 2s infinite',
      },
      keyframes: {
        fadeIn: {
          '0%': { opacity: '0' },
          '100%': { opacity: '1' },
        },
        slideUp: {
          '0%': { transform: 'translateY(10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideDown: {
          '0%': { transform: 'translateY(-10px)', opacity: '0' },
          '100%': { transform: 'translateY(0)', opacity: '1' },
        },
        slideLeft: {
          '0%': { transform: 'translateX(10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        slideRight: {
          '0%': { transform: 'translateX(-10px)', opacity: '0' },
          '100%': { transform: 'translateX(0)', opacity: '1' },
        },
        scaleIn: {
          '0%': { transform: 'scale(0.95)', opacity: '0' },
          '100%': { transform: 'scale(1)', opacity: '1' },
        },
        bounceSoft: {
          '0%, 20%, 53%, 80%, 100%': { transform: 'translateY(0)' },
          '40%, 43%': { transform: 'translateY(-8px)' },
          '70%': { transform: 'translateY(-4px)' },
          '90%': { transform: 'translateY(-2px)' },
        },
        pulseSoft: {
          '0%, 100%': { opacity: '1' },
          '50%': { opacity: '0.7' },
        },
      },
      // 移动端触摸优化
      touchAction: {
        'pan-x': 'pan-x',
        'pan-y': 'pan-y',
        'manipulation': 'manipulation',
      },
      // 移动端安全区域
      spacing: {
        'safe-top': 'env(safe-area-inset-top)',
        'safe-bottom': 'env(safe-area-inset-bottom)',
        'safe-left': 'env(safe-area-inset-left)',
        'safe-right': 'env(safe-area-inset-right)',
      }
    },
  },
  plugins: [
    // 移动端优化插件
    function({ addUtilities, addComponents, theme }) {
      // 移动端触摸优化
      addUtilities({
        '.touch-manipulation': {
          'touch-action': 'manipulation',
        },
        '.no-tap-highlight': {
          '-webkit-tap-highlight-color': 'transparent',
        },
        '.mobile-font-optimize': {
          '-webkit-text-size-adjust': '100%',
          '-ms-text-size-adjust': '100%',
        },
        '.mobile-overflow-scroll': {
          '-webkit-overflow-scrolling': 'touch',
          'overflow-scrolling': 'touch',
        },
        '.mobile-select-none': {
          '-webkit-user-select': 'none',
          'user-select': 'none',
        },
        '.mobile-select-text': {
          '-webkit-user-select': 'text',
          'user-select': 'text',
        },
      });

      // 移动端按钮优化
      addComponents({
        '.mobile-button': {
          'min-height': '44px',
          'min-width': '44px',
          '@media (hover: none)': {
            '@apply hover:scale-100 active:scale-95 transition-transform duration-150': {},
          },
        },
        '.mobile-touch-target': {
          '@apply mobile-button': {},
        },
      });

      // 移动端输入框优化
      addComponents({
        '.mobile-input': {
          'font-size': '16px !important',
          '-webkit-appearance': 'none',
          'appearance': 'none',
          '@apply mobile-touch-target': {},
        },
      });

      // 移动端卡片优化
      addComponents({
        '.mobile-card': {
          '@apply rounded-lg shadow-lg border border-gray-200': {},
          '@media (max-width: 640px)': {
            '@apply rounded-xl shadow-xl border-gray-300': {},
          },
        },
      });

      // 移动端导航优化
      addComponents({
        '.mobile-nav': {
          '@apply sticky top-0 z-50 bg-white/95 backdrop-blur-sm shadow-lg': {},
        },
        '.mobile-nav-item': {
          '@apply px-3 py-2 text-sm font-medium rounded-lg transition-colors duration-200': {},
          '@apply mobile-touch-target': {},
        },
      });
    },
  ],
}