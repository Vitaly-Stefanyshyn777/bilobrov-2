# Bilobrov Next.js E-commerce

This is a modern e-commerce project based on [Next.js](https://nextjs.org/) using Zustand, React Query, TypeScript, TailwindCSS, and more. The project implements a product catalog with filters, wishlist, pagination, multilingual support, and responsive design.

## Features

- **Product catalog** with filters by categories, brands, price, availability, sales, and attributes.
- **Wishlist:** add/remove products, persist in localStorage, quick view of favorite products.
- **Product search and sorting.**
- **Pagination** and smooth navigation.
- **Responsive design** for mobile and desktop.
- **Multilingual support** (i18next).
- **Centralized SVG icons.**
- **Modern architecture:** component splitting, Zustand for state management, React Query for API.

## Project Structure

```
src/
  app/                # Next.js pages (catalog, dynamic routes)
  components/         # UI components (Catalog, ProductItem, FilterPopup, WishListPopup, Header, Footer, etc.)
  store/              # Zustand stores (wishlist, filters, products)
  hooks/              # Custom React hooks
  utils/              # Helper functions
  types/              # TypeScript types
  queries/            # React Query hooks for API
  styles/             # Global styles
```

### Main Components

- **CatalogPageInner** — main catalog page with filters, product list, pagination.
- **FilterPopup** — modal window with filters (categories, brands, price, attributes).
- **WishListPopup** — modal window with favorite products, ability to clear the list.
- **ProductItem** — product card with info, rating, price.
- **Header/Footer** — site header and footer with navigation, languages, icons.

### Pages

- `/` — main catalog page.
- `/catalog/[slug]` — category page.
- `/catalog/[slug]/[parentSlug]` — subcategory page.
- `/catalog/[slug]/[parentSlug]/[childSlug]` — nested subcategory page.

## Getting Started

1. **Install dependencies:**

   ```bash
   pnpm install
   # or
   npm install
   # or
   yarn install
   ```

2. **Run the dev server:**

   ```bash
   pnpm dev
   # or
   npm run dev
   # or
   yarn dev
   ```

3. Open [http://localhost:3000](http://localhost:3000) in your browser.

## Technologies

- **Next.js 15**
- **React 19**
- **TypeScript**
- **Zustand** — state management
- **React Query** — API data fetching
- **TailwindCSS** — styling
- **i18next** — internationalization
- **Framer Motion** — animations
- **Formik, Yup** — forms and validation

## Customization

- To change menu categories, edit the `menuCategoryNames` array in `HeaderCategoriesManager.tsx`.
- To add new filters, extend the Zustand store in `useProductFilterStore.ts`.

## Authors

- [@bilobrov](https://github.com/bilobrov)
- [@vitalikstefanisin](https://github.com/vitalikstefanisin)

---

**P.S.** If you need more detailed documentation for components or API — feel free to ask!
