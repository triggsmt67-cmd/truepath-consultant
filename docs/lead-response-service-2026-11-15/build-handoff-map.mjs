import { writeFile } from 'node:fs/promises';
import { createRequire } from 'node:module';
import { fileURLToPath } from 'node:url';
const project = new URL('../../', import.meta.url);
const require = createRequire(new URL('package.json', project));
const sharp = require('sharp');
const steps = [
  ['Capture', '#436454', 'One inquiry, with its source.', 'Link repeated calls and forms about the same job.'],
  ['Assign', '#955a32', 'One named person accepts responsibility.', 'Identify the backup before the usual owner is away.'],
  ['Set the next step', '#536c7e', 'Write the action and its due time.', 'Use actual working hours and available capacity.'],
  ['Follow up', '#765d79', 'Act on the agreed plan.', 'Replies, bookings, declines, and stop requests change the plan.'],
  ['Record the outcome', '#796229', 'Booked / deciding / declined / no capacity / no reply', 'Keep unknown reasons unknown.'],
];
const esc = s => s.replaceAll('&', '&amp;').replaceAll('<', '&lt;').replaceAll('>', '&gt;');
const rows = steps.map(([title,color,a,b],i) => {
 const y = 240 + i*188;
 return `<rect x="64" y="${y}" width="952" height="160" rx="12" fill="#fffefa" stroke="#d0d1c7"/>
 <rect x="64" y="${y}" width="8" height="160" rx="4" fill="${color}"/>
 <circle cx="121" cy="${y+51}" r="26" fill="${color}"/>
 <text x="121" y="${y+59}" text-anchor="middle" fill="#fffefa" font-size="23" font-weight="700">${i+1}</text>
 <text x="170" y="${y+52}" font-size="32" font-weight="700" fill="${color}">${esc(title)}</text>
 <text x="170" y="${y+96}" font-size="25">${esc(a)}</text>
 <text x="170" y="${y+132}" font-size="22" fill="#5c615a">${esc(b)}</text>
 ${i<4 ? `<path d="M540 ${y+165}v17m-6-6 6 6 6-6" fill="none" stroke="#8c9287" stroke-width="2.5"/>` : ''}`;
}).join('\n');
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1080" height="1440" viewBox="0 0 1080 1440" role="img" aria-labelledby="title desc">
<title id="title">The inquiry handoff map: owner, next step, due time</title>
<desc id="desc">Five steps: capture, assign, set the next step, follow up, and record the outcome. If a task is overdue or unaccepted, flag it for the backup. Automated replies are separate from human responses and booked work.</desc>
<rect width="1080" height="1440" fill="#f1f0e8"/>
<g font-family="Arial, Helvetica, sans-serif" fill="#20251f">
<text x="64" y="65" fill="#955a32" font-size="19" letter-spacing="3" font-weight="700">TRUE PATH DIGITAL / TEAM REFERENCE</text>
<text x="64" y="124" font-family="Georgia, serif" font-size="49">The inquiry handoff map</text>
<text x="64" y="178" font-size="30" font-weight="700">Owner. Next step. Due time.</text>
<text x="64" y="212" font-size="21" fill="#5c615a">Give every open inquiry all three.</text>
${rows}
<rect x="64" y="1214" width="952" height="116" rx="10" fill="#20251f"/>
<text x="94" y="1255" font-size="25" fill="#f1f0e8" font-weight="700">Due time missed or task unaccepted?</text>
<text x="94" y="1296" font-size="23" fill="#f1f0e8">Flag it for the backup. Keep the history with the inquiry.</text>
<text x="64" y="1372" font-size="20" fill="#5c615a">An automated reply is separate from a human response or booked job.</text>
<text x="64" y="1410" font-size="19" fill="#5c615a">truepath406.com/services/lead-response</text>
</g></svg>`;
const out = new URL('public/downloads/',project);
await writeFile(new URL('lead-response-handoff-map.svg',out),svg);
await sharp(Buffer.from(svg)).png().toFile(fileURLToPath(new URL('lead-response-handoff-map.png',out)));
console.log('Created editable SVG and 1080 × 1440 PNG handoff map.');
