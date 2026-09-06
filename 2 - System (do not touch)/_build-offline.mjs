// Build Container-Office-3D-OFFLINE.html from the (Rev H) CDN walkthrough by
// inlining three@0.160.0 + OrbitControls + PointerLockControls as data-URL modules,
// so the exact same ESM app code runs with NO internet and NO version porting.
import { readFileSync, writeFileSync } from 'node:fs';

const dir = new URL('.', import.meta.url);
const rd = (p) => readFileSync(new URL(p, dir));
const b64 = (buf) => 'data:text/javascript;base64,' + Buffer.from(buf).toString('base64');

const src = rd('Container-Office-3D-Walkthrough.html').toString('utf8');
const three = b64(rd('_libcache/three.module.js'));
const orbit = b64(rd('_libcache/OrbitControls.js'));
const plc   = b64(rd('_libcache/PointerLockControls.js'));

const newMap =
`<script type="importmap">
{ "imports": {
    "three": "${three}",
    "three/addons/controls/OrbitControls.js": "${orbit}",
    "three/addons/controls/PointerLockControls.js": "${plc}"
} }
</script>`;

// replace the existing importmap script block (CDN version) with the inlined one
const re = /<script type="importmap">[\s\S]*?<\/script>/;
if (!re.test(src)) { console.error('importmap block not found'); process.exit(1); }
let out = src.replace(re, newMap);

// mark the file as the offline build (title only; app code untouched)
out = out.replace(/<title>[\s\S]*?<\/title>/,
  '<title>Bel Fence — 40ft Container Office · 3D Walkthrough (OFFLINE, Rev H)</title>');

writeFileSync(new URL('Container-Office-3D-OFFLINE.html', dir), out);
console.log('OFFLINE built:', (out.length/1024/1024).toFixed(2), 'MB');
