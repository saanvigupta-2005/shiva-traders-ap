
# Shiva Traders – Asian Paints Colour Cube

A modern, responsive website for **Shiva Traders**, an Asian Paints Colour Cube store located in Dhakoli, Zirakpur, Punjab, India.

The website helps customers explore paint products, browse store photos, discover colours, and visualize room colour combinations.

## Features

- Responsive website for desktop and mobile
- English, Hindi and Punjabi language options
- Google Translate integration with support for 100+ languages
- Store photo gallery
- Asian Paints Colour Cube showroom information
- Room Studio / room colour visualizer
- Paint and colour information
- Contact and store details

## Tech Stack

- React.js
- JavaScript
- CSS
- Vite
- Google Translate
- Vercel (deployment)

## Project Structure

```text
shiva-traders/
├── public/
│   └── images/
│       └── Store gallery photos
├── src/
│   ├── App.jsx
│   ├── RoomStudio.jsx
│   ├── translations.js
│   └── other source files
├── index.html
├── package.json
└── README.md
```

## Run Locally

### 1. Install dependencies

```bash
npm install
```

### 2. Start development server

```bash
npm run dev
```

### 3. Create production build

```bash
npm run build
```

### 4. Preview production build

```bash
npm run preview
```

## Deploy on Vercel

1. Push the complete project to GitHub.
2. Log in to [Vercel](https://vercel.com).
3. Select **Add New → Project**.
4. Import the Shiva Traders GitHub repository.
5. Select Vite as the framework preset.
6. Set the build command to `npm run build`.
7. Set output directory to `dist`.
8. Click **Deploy**.

Vercel will generate a live website URL.

## Store Information

**Business:** Shiva Traders  
**Brand:** Asian Paints Colour Cube  
**Location:** SCO 423, Green City, Dhakoli, Zirakpur, Punjab, India

## Important Notes

- Keep all gallery photos inside `public/images/`.
- Use paths such as `/images/shop-front.jpg` when referencing public images.
- Keep `App.jsx`, `RoomStudio.jsx`, and `translations.js` in sync.
- Do not remove required dependencies from `package.json`.
- Test the production build before deployment.

## Deployment

Hosted using [Vercel](https://vercel.com).

---

© Shiva Traders – Asian Paints Colour Cube. All rights reserved.
# shiva-traders
