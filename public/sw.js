if(!self.define){let e,s={};const n=(n,a)=>(n=new URL(n+".js",a).href,s[n]||new Promise((s=>{if("document"in self){const e=document.createElement("script");e.src=n,e.onload=s,document.head.appendChild(e)}else e=n,importScripts(n),s()})).then((()=>{let e=s[n];if(!e)throw new Error(`Module ${n} didn’t register its module`);return e})));self.define=(a,i)=>{const c=e||("document"in self?document.currentScript.src:"")||location.href;if(s[c])return;let r={};const o=e=>n(e,c),_={module:{uri:c},exports:r,require:o};s[c]=Promise.all(a.map((e=>_[e]||o(e)))).then((e=>(i(...e),r)))}}define(["./workbox-e13f827e"],(function(e){"use strict";importScripts(),self.skipWaiting(),e.clientsClaim(),e.precacheAndRoute([{url:"/_next/app-build-manifest.json",revision:"021cc959678f53dec723b5415ab1f237"},{url:"/_next/static/9Z6J7cLx-81IxoRHlY7EE/_buildManifest.js",revision:"f51a92f262230b66051a1dd1b7bb70db"},{url:"/_next/static/9Z6J7cLx-81IxoRHlY7EE/_ssgManifest.js",revision:"b6652df95db52feb4daf4eca35380933"},{url:"/_next/static/chunks/0b308cfb-f2150fb8ded337c2.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/0c428ae2-501a3ca385fd8869.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/153.6332072ee514cad2.js",revision:"6332072ee514cad2"},{url:"/_next/static/chunks/17-85f2ef1a9f55666e.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/1766.0b7db89b9a965d6a.js",revision:"0b7db89b9a965d6a"},{url:"/_next/static/chunks/1a48c3c1-14c6a9b8aa7d029f.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/1bfc9850-fb54a8cff1a33292.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/2267-96a8d266aa21bc07.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/252f366e-4fd92c09271faed1.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/30-4b2edb243be16f11.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/4090-8d29499d069f83f5.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/4278-ea3c9a956d452ea4.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/4521.8083a4cc07e78b94.js",revision:"8083a4cc07e78b94"},{url:"/_next/static/chunks/63ad2cbc-79c883199ce15924.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/7643-0d8619cf0e134206.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/7f0c75c1-75e2c8da64d53f14.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/8761-2a67ca59539ee832.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/9012-741ed392eb3e9fde.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/95b64a6e-5cb60e99b2cc6b9a.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/a0e03aaa-86c3777f70b67f40.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/ae51ba48-ba4c86e242496191.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/app/%5Blot%5D/error-37304d86b90fff86.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/app/%5Blot%5D/head-c8dafd07bac0a7c6.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/app/%5Blot%5D/loading-42413d27ec64e107.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/app/%5Blot%5D/not-found-7090b4272e810a28.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/app/%5Blot%5D/page-ba58a8bdd5e40201.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/app/(admin)/editor/head-5382c931dc39a825.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/app/(admin)/editor/info/page-bec7d3323f7d892e.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/app/(admin)/editor/layout-58af9ae2c919204f.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/app/(admin)/editor/page-214f9dbcdbe2936d.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/app/(admin)/editor/project/page-69b18134eaa7fed6.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/app/(admin)/login/error-e9ba4214ad67d427.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/app/(admin)/login/page-f2bd6e3070873854.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/app/(marketing)/info/%5Bname%5D/error-821b7856a6f238ba.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/app/(marketing)/info/%5Bname%5D/head-d63dc0135893802f.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/app/(marketing)/info/%5Bname%5D/layout-f9b1de5d6b2307be.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/app/(marketing)/info/%5Bname%5D/loading-8f3be30692a8aed1.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/app/(marketing)/info/%5Bname%5D/not-found-4aa80def2dc72133.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/app/(marketing)/info/%5Bname%5D/page-279cb758fcad24bd.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/app/(marketing)/info/head-5b8c1a51286850fc.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/app/(marketing)/info/layout-32632a0af87e3631.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/app/(marketing)/info/loading-686860cb0ef4cdf1.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/app/(marketing)/info/page-b632e57034f7e032.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/app/(marketing)/store/head-49271641e1dce2f4.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/app/(marketing)/store/layout-a83f079edceb814c.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/app/(marketing)/store/loading-c633c2be74acea49.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/app/(marketing)/store/page-8a40ed1190bfcda4.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/app/error-7d053c791340932d.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/app/head-2da50700a2aae2b5.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/app/layout-d01c95a31950b0fe.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/app/loading-59723bc49ca72eaf.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/app/page-6d1c83a04f02f964.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/c97d5db8-2dd8c2961bec1383.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/d0447323-18d3222b249dfad4.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/fb7d5399-d97ee759dedd134d.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/main-64f9477a5f87dc6e.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/main-app-8a9ab7204eaff483.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/pages/_app-bfb00c7c82afee10.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/pages/_error-bcd4b997dec1e5ea.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/chunks/polyfills-c67a75d1b6f99dc8.js",revision:"837c0df77fd5009c9e46d446188ecfd0"},{url:"/_next/static/chunks/webpack-2c3f28ac033d650d.js",revision:"9Z6J7cLx-81IxoRHlY7EE"},{url:"/_next/static/css/3d56f0f47dc133af.css",revision:"3d56f0f47dc133af"},{url:"/_next/static/css/f959917eed22e2d5.css",revision:"f959917eed22e2d5"},{url:"/favicon.ico",revision:"68d9ff2465f321dda4a8cfffb58cbab8"},{url:"/hdri/moonless.hdr",revision:"da9edde9ad39465900a7935dc15ab8d7"},{url:"/hdri/puresky.hdr",revision:"38890f597727936a44d17a97f7f73354"},{url:"/icons/android-chrome-192x192.png",revision:"be7444de6ef5ccf3088274a8d6b98107"},{url:"/icons/android-chrome-512x512.png",revision:"12b7b08f8c12502a06578f2b0a23fbf9"},{url:"/icons/apple-touch-icon.png",revision:"4451f70f65f36232521073ed6c320236"},{url:"/icons/favicon-16x16.png",revision:"823888918ad62729c8f44f416f8edfbb"},{url:"/icons/favicon-32x32.png",revision:"e3ee5d0460076adc583dfd68c693ac55"},{url:"/icons/icon-192x192.png",revision:"74af535294bdcd574654516630a8b774"},{url:"/icons/icon-256x256.png",revision:"8f6fa8e0aac4b46d79111e4f31134acb"},{url:"/icons/icon-384x384.png",revision:"e84e6de2c77b20f2e55b989b44ec6f2f"},{url:"/icons/icon-512x512.png",revision:"f253dcc323745519ca8d6375b1973c4e"},{url:"/icons/maskable_logo192.png",revision:"741b51ce6f33cca8c6c2560379591aa3"},{url:"/icons/maskable_logo256.png",revision:"9349649c40f50e9c9d3a19366a0a8dea"},{url:"/manifest.json",revision:"c615b8349767e874944b07f12335f561"},{url:"/models/bowl.gltf",revision:"0f198942b754b3afcb4c0062890b74f0"},{url:"/models/box.gltf",revision:"e787c1e65a5d08db5e57abdca2bf9a34"},{url:"/models/sand.glb",revision:"779bc22318a2dedc184ed47ab491d33d"},{url:"/reflector/Ice_COLOR.jpg",revision:"d91f75091c553986f198d5a142a1ecd3"},{url:"/reflector/Ice_COLOR.webp",revision:"2f13428462667f3631a4ca6dd935e753"},{url:"/reflector/Ice_DISP.png",revision:"415769e60b3d12aa147040bdc52a917a"},{url:"/reflector/Ice_DISP.webp",revision:"99998570ad0bd28465344895680acd67"},{url:"/reflector/Ice_NORM.jpg",revision:"7f693844f8f3b0ebaf22aab5d3f3dff2"},{url:"/reflector/Ice_NORM.webp",revision:"3d8c847f58bbed5fb91a379b54a78e07"},{url:"/reflector/Ice_OCC.jpg",revision:"5c1bc8af4ad270b59b73fec7f17a5097"},{url:"/reflector/Ice_OCC.webp",revision:"4b04654a24397ce4791cdd9879788991"},{url:"/reflector/Ice_ROUGH.jpg",revision:"136940587e9f9d8073463e07330646fa"},{url:"/reflector/Ice_ROUGH.webp",revision:"39a7004096c12dc116bbce9ac5cbfe88"},{url:"/reflector/floor_normal.jpg",revision:"dc79ddc4ae5c3e2cf37070556b5da959"},{url:"/reflector/floor_normal.webp",revision:"b953224db69429d653842fc1214bd79b"},{url:"/reflector/floor_rough.jpeg",revision:"ac493c1f2a4bbdb5010ae09814c3c9ff"},{url:"/reflector/floor_rough.webp",revision:"920a375b5629adc1a052f5d322663950"},{url:"/sound effects/admin.mp3",revision:"bdabaf87974d18ab3761d72c9a9833a4"},{url:"/sound effects/close.mp3",revision:"d2f41f83f955b26ff15b191c655700a2"},{url:"/sound effects/confirm.mp3",revision:"ae4c14b94f80442c9c3dbfde00af519f"},{url:"/sound effects/home.mp3",revision:"c91b24b4e877708ed23d9fe5cb3f7874"},{url:"/sound effects/open.mp3",revision:"abe656e98db259ff2f2ab35c08e70783"},{url:"/sound effects/reset.mp3",revision:"8e9e2b10d5f4c6470743798534b6d83e"},{url:"/sound effects/select.mp3",revision:"c4a0b3fbdf73c9a91b09a67e8808fc40"},{url:"/sound effects/select2.mp3",revision:"d62a7bd8a105b9d27d982532fa634c19"},{url:"/sounds/close.mp3",revision:"d2f41f83f955b26ff15b191c655700a2"},{url:"/sounds/confirm.mp3",revision:"ae4c14b94f80442c9c3dbfde00af519f"},{url:"/sounds/home.mp3",revision:"c91b24b4e877708ed23d9fe5cb3f7874"},{url:"/sounds/open.mp3",revision:"abe656e98db259ff2f2ab35c08e70783"},{url:"/sounds/reset.mp3",revision:"71d4db13ab69c730b2e26feac56d444f"},{url:"/sounds/select.mp3",revision:"c9cb3d5311f72b9d7b9d4e52edf7933a"},{url:"/splash_screens/10.2__iPad_landscape.png",revision:"aa6c447949328c02075f18885a3724f7"},{url:"/splash_screens/10.2__iPad_portrait.png",revision:"debafeeeb3994beac62a7627acdd34b7"},{url:"/splash_screens/10.5__iPad_Air_landscape.png",revision:"8317128b57ab0e42a899176f29fb6199"},{url:"/splash_screens/10.5__iPad_Air_portrait.png",revision:"1c2c6e8531c35efad4dc1aa7062fae93"},{url:"/splash_screens/10.9__iPad_Air_landscape.png",revision:"bde21a276fa501b5631e6f82f31a3af1"},{url:"/splash_screens/10.9__iPad_Air_portrait.png",revision:"4f247e36f8efdeb2ffa503dc730aca48"},{url:"/splash_screens/11__iPad_Pro__10.5__iPad_Pro_landscape.png",revision:"79a28c12cb6dda6a3bcff58fd04a5eec"},{url:"/splash_screens/11__iPad_Pro__10.5__iPad_Pro_portrait.png",revision:"f0b38cea19fcd726b132fce136bda9ef"},{url:"/splash_screens/12.9__iPad_Pro_landscape.png",revision:"a98aeaf4ad841423704877cd1acc7dce"},{url:"/splash_screens/12.9__iPad_Pro_portrait.png",revision:"a7fe3eb3a95af790c57d9186e21bc1f4"},{url:"/splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_landscape.png",revision:"a1453ae1c52b632c7520815111c34f10"},{url:"/splash_screens/4__iPhone_SE__iPod_touch_5th_generation_and_later_portrait.png",revision:"db7926f42afd90796ff5496ab094a46b"},{url:"/splash_screens/8.3__iPad_Mini_landscape.png",revision:"1658dc3291d5c82328c0ba3531b493c3"},{url:"/splash_screens/8.3__iPad_Mini_portrait.png",revision:"849aa150856bc3234855a0e2e2c2e526"},{url:"/splash_screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_landscape.png",revision:"b9003c21b0a4b20cae6180a2794f37fc"},{url:"/splash_screens/9.7__iPad_Pro__7.9__iPad_mini__9.7__iPad_Air__9.7__iPad_portrait.png",revision:"be4ed7e6073095703fab614ddfd21cd8"},{url:"/splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_landscape.png",revision:"d9773f35ab86d49ec656ad9a5fb39b6e"},{url:"/splash_screens/iPhone_11_Pro_Max__iPhone_XS_Max_portrait.png",revision:"b36b6a2ee3e841ab484cd80a77d9cf44"},{url:"/splash_screens/iPhone_11__iPhone_XR_landscape.png",revision:"06cb4b73ad859df76c76f5312d4aa62f"},{url:"/splash_screens/iPhone_11__iPhone_XR_portrait.png",revision:"f5d87bb242e99e72918a3e59e3a722fa"},{url:"/splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_landscape.png",revision:"92b6c8511c5d18bbb1b49a99d24350e5"},{url:"/splash_screens/iPhone_13_mini__iPhone_12_mini__iPhone_11_Pro__iPhone_XS__iPhone_X_portrait.png",revision:"784b365fa80a641031a8359b3f0f2270"},{url:"/splash_screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_landscape.png",revision:"a458fd66519cae16fb7ecdaddba0b193"},{url:"/splash_screens/iPhone_14_Plus__iPhone_13_Pro_Max__iPhone_12_Pro_Max_portrait.png",revision:"093e7066d1f4d81172258428316f045b"},{url:"/splash_screens/iPhone_14_Pro_Max_landscape.png",revision:"669d9a67c56c5ec8c85f3bf39287c47f"},{url:"/splash_screens/iPhone_14_Pro_Max_portrait.png",revision:"436e8529fbc7fe93b8312cab8e9b0cc3"},{url:"/splash_screens/iPhone_14_Pro_landscape.png",revision:"0dd5db1be6f839d47c07320177f419ec"},{url:"/splash_screens/iPhone_14_Pro_portrait.png",revision:"63427fdf2a0872dedb3cc96fed57d956"},{url:"/splash_screens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_landscape.png",revision:"fdcda35e0140d9bcbaeb411979266def"},{url:"/splash_screens/iPhone_14__iPhone_13_Pro__iPhone_13__iPhone_12_Pro__iPhone_12_portrait.png",revision:"2314da0016ba915e8ed88af727d73011"},{url:"/splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_landscape.png",revision:"5706e2704a70524cec98498b9b5db490"},{url:"/splash_screens/iPhone_8_Plus__iPhone_7_Plus__iPhone_6s_Plus__iPhone_6_Plus_portrait.png",revision:"224ad25820aab51687c57e2a8e361c4e"},{url:"/splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_landscape.png",revision:"1635484634ab705b13779cdb2965af61"},{url:"/splash_screens/iPhone_8__iPhone_7__iPhone_6s__iPhone_6__4.7__iPhone_SE_portrait.png",revision:"596d8d1ac807ceb253afd7ca633d7e37"},{url:"/splash_screens/icon.png",revision:"1076690cbea634348f5d290bfd9a06e4"}],{ignoreURLParametersMatching:[]}),e.cleanupOutdatedCaches(),e.registerRoute("/",new e.NetworkFirst({cacheName:"start-url",plugins:[{cacheWillUpdate:async({request:e,response:s,event:n,state:a})=>s&&"opaqueredirect"===s.type?new Response(s.body,{status:200,statusText:"OK",headers:s.headers}):s}]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:gstatic)\.com\/.*/i,new e.CacheFirst({cacheName:"google-fonts-webfonts",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:31536e3})]}),"GET"),e.registerRoute(/^https:\/\/fonts\.(?:googleapis)\.com\/.*/i,new e.StaleWhileRevalidate({cacheName:"google-fonts-stylesheets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:eot|otf|ttc|ttf|woff|woff2|font.css)$/i,new e.StaleWhileRevalidate({cacheName:"static-font-assets",plugins:[new e.ExpirationPlugin({maxEntries:4,maxAgeSeconds:604800})]}),"GET"),e.registerRoute(/\.(?:jpg|jpeg|gif|png|svg|ico|webp)$/i,new e.StaleWhileRevalidate({cacheName:"static-image-assets",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/image\?url=.+$/i,new e.StaleWhileRevalidate({cacheName:"next-image",plugins:[new e.ExpirationPlugin({maxEntries:64,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp3|wav|ogg)$/i,new e.CacheFirst({cacheName:"static-audio-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:mp4)$/i,new e.CacheFirst({cacheName:"static-video-assets",plugins:[new e.RangeRequestsPlugin,new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:js)$/i,new e.StaleWhileRevalidate({cacheName:"static-js-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:css|less)$/i,new e.StaleWhileRevalidate({cacheName:"static-style-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\/_next\/data\/.+\/.+\.json$/i,new e.StaleWhileRevalidate({cacheName:"next-data",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute(/\.(?:json|xml|csv)$/i,new e.NetworkFirst({cacheName:"static-data-assets",plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;const s=e.pathname;return!s.startsWith("/api/auth/")&&!!s.startsWith("/api/")}),new e.NetworkFirst({cacheName:"apis",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:16,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>{if(!(self.origin===e.origin))return!1;return!e.pathname.startsWith("/api/")}),new e.NetworkFirst({cacheName:"others",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:86400})]}),"GET"),e.registerRoute((({url:e})=>!(self.origin===e.origin)),new e.NetworkFirst({cacheName:"cross-origin",networkTimeoutSeconds:10,plugins:[new e.ExpirationPlugin({maxEntries:32,maxAgeSeconds:3600})]}),"GET")}));
