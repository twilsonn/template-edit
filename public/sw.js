if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,c)=>{const t=e||("document"in self?document.currentScript.src:"")||location.href;if(s[t])return;let i={};const r=e=>n(e,t),o={module:{uri:t},exports:i,require:r};s[t]=Promise.all(a.map((e=>o[e]||r(e)))).then((e=>(c(...e),i)))}}define(["./workbox-588899ac"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/static/chunks/144.7282a6d3a75f4d7c.js",revision:"7282a6d3a75f4d7c"},{url:"/_next/static/chunks/255.e4b1c745edc3c2e4.js",revision:"e4b1c745edc3c2e4"},{url:"/_next/static/chunks/258.04c863ff78c59e7b.js",revision:"04c863ff78c59e7b"},{url:"/_next/static/chunks/3.f5eebaf833b8233a.js",revision:"f5eebaf833b8233a"},{url:"/_next/static/chunks/425.8c86dbab466c08d4.js",revision:"8c86dbab466c08d4"},{url:"/_next/static/chunks/49.40b219845a655bd9.js",revision:"40b219845a655bd9"},{url:"/_next/static/chunks/51.0d8b5e489faae1c7.js",revision:"0d8b5e489faae1c7"},{url:"/_next/static/chunks/623.754ad430e65500ab.js",revision:"754ad430e65500ab"},{url:"/_next/static/chunks/678.6850f7aabf6b58e5.js",revision:"6850f7aabf6b58e5"},{url:"/_next/static/chunks/962.01b51e785a2cdab3.js",revision:"01b51e785a2cdab3"},{url:"/_next/static/chunks/982.f8af8dc8d1d0d552.js",revision:"f8af8dc8d1d0d552"},{url:"/_next/static/chunks/cfb35ab8.0c7290bbbceb9b85.js",revision:"0c7290bbbceb9b85"},{url:"/_next/static/chunks/framework-2c79e2a64abdb08b.js",revision:"2c79e2a64abdb08b"},{url:"/_next/static/chunks/main-c256fb04ba725c1e.js",revision:"c256fb04ba725c1e"},{url:"/_next/static/chunks/pages/_app-709db4ce6b78dbf0.js",revision:"709db4ce6b78dbf0"},{url:"/_next/static/chunks/pages/_error-54de1933a164a1ff.js",revision:"54de1933a164a1ff"},{url:"/_next/static/chunks/pages/editor-b17afba12d8113fb.js",revision:"b17afba12d8113fb"},{url:"/_next/static/chunks/pages/index-45940dc11655afe0.js",revision:"45940dc11655afe0"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-9adfb7f8eb5a2194.js",revision:"9adfb7f8eb5a2194"},{url:"/_next/static/css/06b492cb191d7c85.css",revision:"06b492cb191d7c85"},{url:"/_next/static/w1aHMDtJ84hZdUyhBrc3W/_buildManifest.js",revision:"2465bba3b394510f715f0cf06ee7390e"},{url:"/_next/static/w1aHMDtJ84hZdUyhBrc3W/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/android-chrome-192x192.png",revision:"16f69113a915f52a3ebd91ab8c51cde2"},{url:"/android-chrome-512x512.png",revision:"83dc783f49fc32fd6e7f04ecfe96e802"},{url:"/apple-touch-icon.png",revision:"1bb22446c7efb5e54ac892fbdfb87746"},{url:"/favicon-16x16.png",revision:"914fc97b34e6e4a4e8bf77b016930f46"},{url:"/favicon-32x32.png",revision:"696a676432585c775387447cfc5664b1"},{url:"/favicon.ico",revision:"cb22f605b3ac9cd649d899794a49bdaf"},{url:"/logo.png",revision:"0c6e9098822fac7eab9e07dd5601eadc"},{url:"/manifest.json",revision:"ee33a34560af85a915bf7590d5ec94c7"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));