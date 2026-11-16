import { writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const project = new URL('../../', import.meta.url);
const require = createRequire(new URL('package.json', project));
const sharp = require('sharp');
const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="960" viewBox="0 0 1080 960" role="img" aria-labelledby="title desc">
<title id="title">Repair, restructure, or rebuild your website?</title>
<desc id="desc">A starting point for a website review. A focused fix may be enough to justify repair. If the page plan needs changing, consider whether the current platform can support it. A suitable platform may support restructuring; constraints may justify rebuilding. Confirm content, technical constraints, and effort before choosing.</desc>
<defs><marker id="arrow" markerWidth="8" markerHeight="8" refX="6" refY="3" orient="auto"><path d="M0 0 6 3 0 6" fill="none" stroke="#737a70" stroke-width="1.5"/></marker></defs>
<rect width="1080" height="960" fill="#f1f0e8"/>
<g font-family="Arial, Helvetica, sans-serif" fill="#20251f">
<text x="64" y="62" font-size="19" letter-spacing="3" font-weight="700" fill="#955a32">TRUE PATH DIGITAL / WEBSITE STRATEGY</text>
<text x="64" y="125" font-family="Georgia, serif" font-size="49">What does your website need?</text>
<rect x="218" y="180" width="644" height="116" rx="8" fill="#fffefa" stroke="#b8bbae" stroke-width="2"/>
<text x="540" y="252" text-anchor="middle" font-size="46" font-weight="700">Focused fix enough?</text>
<g fill="none" stroke="#737a70" stroke-width="3" marker-end="url(#arrow)">
<path d="M540 296 V344 H199 V406"/>
<path d="M540 296 V344 H736 V406"/>
<path d="M736 530 V590 H566 V676"/>
<path d="M736 530 V590 H900 V676"/>
</g>
<g font-size="34" font-weight="700" fill="#5c615a">
<text x="275" y="333">Yes</text><text x="654" y="333">No</text>
<text x="614" y="579">Yes</text><text x="827" y="579">No</text>
</g>
<rect x="64" y="416" width="270" height="154" rx="8" fill="#dce5db" stroke="#436454" stroke-width="2"/>
<text x="199" y="470" text-anchor="middle" font-size="27" fill="#436454">Consider</text>
<text x="199" y="528" text-anchor="middle" font-family="Georgia, serif" font-size="51" fill="#304b3e">Repair</text>
<rect x="456" y="416" width="560" height="114" rx="8" fill="#fffefa" stroke="#b8bbae" stroke-width="2"/>
<text x="736" y="486" text-anchor="middle" font-size="44" font-weight="700">Platform suitable?</text>
<rect x="416" y="686" width="300" height="154" rx="8" fill="#e0e7eb" stroke="#536c7e" stroke-width="2"/>
<text x="566" y="741" text-anchor="middle" font-size="27" fill="#405a6c">Consider</text>
<text x="566" y="798" text-anchor="middle" font-family="Georgia, serif" font-size="45" fill="#344d5d">Restructure</text>
<rect x="766" y="686" width="270" height="154" rx="8" fill="#eee0d3" stroke="#955a32" stroke-width="2"/>
<text x="901" y="741" text-anchor="middle" font-size="27" fill="#955a32">Consider</text>
<text x="901" y="798" text-anchor="middle" font-family="Georgia, serif" font-size="49" fill="#814a28">Rebuild</text>
<text x="64" y="894" font-size="22" fill="#5c615a">Review the content, platform constraints, and effort before choosing.</text>
<text x="64" y="935" font-size="20" fill="#5c615a">truepath406.com/services/website-builds</text>
</g></svg>`;
const out = new URL('public/downloads/', project);
await writeFile(new URL('website-repair-or-rebuild-map.svg',out),svg);
await sharp(Buffer.from(svg)).png().toFile(fileURLToPath(new URL('website-repair-or-rebuild-map.png',out)));
console.log('Created 1080 × 960 decision map in SVG and PNG.');
