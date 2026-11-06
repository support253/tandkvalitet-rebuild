import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import './index.css'
import App from './App.tsx'

const root = document.getElementById('root')!
const app = (
  <StrictMode>
    <App />
  </StrictMode>
)

// The production build ships prerendered HTML (scripts/prerender.mjs), so
// crawlers that do not run JavaScript still see the content. Hydrate it then;
// in dev the root is empty and we render normally.
if (root.hasChildNodes()) hydrateRoot(root, app)
else createRoot(root).render(app)
