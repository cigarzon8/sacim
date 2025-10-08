import { minify } from 'terser';
import CleanCSS from 'clean-css';
import fs from 'fs';
import path from 'path';

// --- Minify JS ---
const jsPath = path.join('public', 'js', 'js.js');
const jsCode = fs.readFileSync(jsPath, 'utf8');
const jsMin = await minify(jsCode);
fs.writeFileSync(path.join('public', 'js', 'js.min.js'), jsMin.code);
console.log('✅ JS minified');

// --- Minify CSS ---
const cssPath = path.join('public', 'css', 'css.css');
const cssCode = fs.readFileSync(cssPath, 'utf8');
const cssMin = new CleanCSS().minify(cssCode);
fs.writeFileSync(path.join('public', 'css', 'css.min.css'), cssMin.styles);
console.log('✅ CSS minified');
