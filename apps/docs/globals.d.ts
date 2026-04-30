// Ambient type declarations for the docs app.
//
// Next.js bundles `.css` files as side-effect imports at build time, but
// TypeScript itself doesn't ship a module declaration for them. With
// `noUncheckedSideEffectImports` enabled, `import './page.css'` would be
// flagged as "Cannot find module or its corresponding type declarations".
//
// Declaring the asset modules here keeps every `import '*.css'` (plain
// stylesheets, CSS Modules, and SCSS — listed for forward-compat) type-safe
// without weakening the rest of the type checks.

declare module '*.css';
declare module '*.scss';

declare module '*.module.css' {
  const classes: { readonly [key: string]: string };
  export default classes;
}

declare module '*.module.scss' {
  const classes: { readonly [key: string]: string };
  export default classes;
}
