import { defineConfig } from 'vite';
import react from '@vitejs/plugin-react';
const repo = process.env.GITHUB_REPOSITORY?.split('/')[1];
const base = process.env.GITHUB_ACTIONS && repo ? `/${repo}/` : '/';
export default defineConfig({
  plugins: [react(), {
    name: 'salama-offline-worker',
    generateBundle(_, bundle) {
      const assets = Object.keys(bundle).filter(k => k.endsWith('.js') || k.endsWith('.css') || k.endsWith('.html') || k.endsWith('.webmanifest') || k.endsWith('.svg') || k.startsWith('data/'));
      const precache = [...new Set([base, ...assets.map(k => `${base}${k}`)])];
      this.emitFile({ type: 'asset', fileName: 'sw.js', source: `const CACHE='salama-v1';const FILES=${JSON.stringify(precache)};self.addEventListener('install',e=>e.waitUntil(caches.open(CACHE).then(c=>c.addAll(FILES)).then(()=>self.skipWaiting())));self.addEventListener('activate',e=>e.waitUntil(caches.keys().then(ks=>Promise.all(ks.filter(k=>k!==CACHE).map(k=>caches.delete(k)))).then(()=>self.clients.claim())));self.addEventListener('fetch',e=>{const u=new URL(e.request.url);if(u.origin!==location.origin)return;if(e.request.cache==='no-store'){e.respondWith(fetch(e.request));return}e.respondWith(caches.match(e.request).then(c=>c||fetch(e.request).then(r=>{if(r.ok){const copy=r.clone();caches.open(CACHE).then(x=>x.put(e.request,copy))}return r}).catch(()=>caches.match(FILES[0]))))});` });
    }
  }], base
});
