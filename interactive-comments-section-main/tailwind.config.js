/** @type {import('tailwindcss').Config} */

module.exports = {
    content: ['./index.html'],
    theme: {
        fontFamily: {
            rubik: "'Rubik', sans-serif",
        },
        extend: {
            colors: {
                primary: 'var(--color-primary)',
                'primary-tint': 'var(--color-primary-tint)',
                secondary: 'var(--color-secondary)',
                'secondary-tint': 'var(--color-secondary-tint)',
                neutral: 'var(--color-neutral)',
                gray: {
                    50: 'var(--color-gray-very-light)',
                    300: 'var(--color-gray-light)',
                    400: 'var(--color-gray)',
                },
            },
            screens: {
                desktop: { max: '1440px', min: '1024px' },
            },
        },
    },
    plugins: [],
};
