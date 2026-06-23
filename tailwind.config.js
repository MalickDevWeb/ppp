import forms from '@tailwindcss/forms';
import containerQueries from '@tailwindcss/container-queries';

/** @type {import('tailwindcss').Config} */
export default {
  content: [
    "./index.html",
    "./src/**/*.{js,ts,jsx,tsx}",
  ],
  darkMode: "class",
  theme: {
    extend: {
      colors: {
        "secondary-container": "#e2e2e5",
        "brand-red-deep": "#B3181C",
        "error-container": "#ffdad6",
        "outline": "#926f6b",
        "background": "#fff8f7",
        "inverse-surface": "#402b29",
        "on-tertiary-container": "#fafbfc",
        "brand-red-light": "#FFEBEC",
        "on-tertiary-fixed": "#191c1d",
        "tertiary-fixed-dim": "#c5c7c8",
        "on-error-container": "#93000a",
        "on-error": "#ffffff",
        "neutral-gray-200": "#E9ECEF",
        "surface-dim": "#f4d2cf",
        "secondary-fixed-dim": "#c6c6c9",
        "tertiary": "#595c5d",
        "surface-variant": "#fddbd7",
        "secondary": "#5d5e61",
        "on-primary": "#ffffff",
        "tertiary-fixed": "#e1e3e4",
        "surface-container-lowest": "#ffffff",
        "on-primary-container": "#fffafa",
        "on-primary-fixed-variant": "#93000d",
        "surface-bright": "#fff8f7",
        "surface-container": "#ffe9e6",
        "secondary-fixed": "#e2e2e5",
        "outline-variant": "#e7bdb8",
        "on-secondary-fixed-variant": "#454749",
        "on-tertiary": "#ffffff",
        "primary-container": "#e31e24",
        "on-secondary": "#ffffff",
        "surface-tint": "#c00014",
        "primary-fixed": "#ffdad6",
        "on-surface-variant": "#5d3f3c",
        "on-surface": "#291715",
        "surface-container-low": "#fff0ee",
        "on-secondary-fixed": "#1a1c1e",
        "surface-container-high": "#ffe2de",
        "on-secondary-container": "#636467",
        "surface": "#fff8f7",
        "primary-fixed-dim": "#ffb4ab",
        "error": "#ba1a1a",
        "inverse-primary": "#ffb4ab",
        "on-primary-fixed": "#410002",
        "tertiary-container": "#727475",
        "surface-container-highest": "#fddbd7",
        "neutral-gray-600": "#4A4D50",
        "on-tertiary-fixed-variant": "#454748",
        "inverse-on-surface": "#ffedea",
        "success-green": "#28A745",
        "primary": "#ba0013",
        "on-background": "#291715"
      },
      borderRadius: {
        "DEFAULT": "0.125rem",
        "lg": "0.25rem",
        "xl": "0.5rem",
        "full": "0.75rem"
      },
      spacing: {
        "max-width": "1280px",
        "gutter": "24px",
        "margin-desktop": "32px",
        "margin-mobile": "16px",
        "base-unit": "4px"
      },
      fontFamily: {
        "label-md": ["Inter"],
        "title-lg": ["Inter"],
        "slogan-accent": ["Hanken Grotesk"],
        "display-lg": ["Hanken Grotesk"],
        "headline-md": ["Hanken Grotesk"],
        "body-md": ["Inter"],
        "body-lg": ["Inter"],
        "headline-lg": ["Hanken Grotesk"],
        "headline-lg-mobile": ["Hanken Grotesk"]
      },
      fontSize: {
        "label-md": ["12px", {"lineHeight": "16px", "letterSpacing": "0.05em", "fontWeight": "500"}],
        "title-lg": ["18px", {"lineHeight": "24px", "fontWeight": "600"}],
        "slogan-accent": ["14px", {"lineHeight": "20px", "letterSpacing": "0.1em", "fontWeight": "800"}],
        "display-lg": ["48px", {"lineHeight": "56px", "letterSpacing": "-0.02em", "fontWeight": "700"}],
        "headline-md": ["24px", {"lineHeight": "32px", "fontWeight": "600"}],
        "body-md": ["14px", {"lineHeight": "20px", "fontWeight": "400"}],
        "body-lg": ["16px", {"lineHeight": "24px", "fontWeight": "400"}],
        "headline-lg": ["32px", {"lineHeight": "40px", "fontWeight": "700"}],
        "headline-lg-mobile": ["24px", {"lineHeight": "32px", "fontWeight": "700"}]
      }
    },
  },
  plugins: [
    forms,
    containerQueries,
  ],
}
