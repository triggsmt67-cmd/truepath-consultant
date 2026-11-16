import fs from 'node:fs/promises';
import path from 'node:path';
import sharp from 'sharp';
const root=process.cwd();
const dir=path.join(root,'docs/businesses-in-chatgpt-2026-11-15');
const svg=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="900" viewBox="0 0 1200 900" role="img" aria-labelledby="title desc"><title id="title">ChatGPT business setup: three separate checks</title><desc id="desc">Check for a supported business claim, complete required verification, and separately check optional agent eligibility. None guarantees recommendations.</desc><rect width="1200" height="900" fill="#f6f2e9"/><path d="M930 0H1200V245Z" fill="#d5e4cf"/><text x="70" y="69" font-family="Arial,sans-serif" font-size="18" letter-spacing="3" fill="#315c47">TRUE PATH DIGITAL · OWNER’S REFERENCE</text><text x="70" y="143" font-family="Georgia,serif" font-size="54" fill="#203c31">ChatGPT business setup</text><text x="70" y="193" font-family="Arial,sans-serif" font-size="26" fill="#4b5b51">Three checks. Different outcomes.</text>
${[
['01','#dce8cc','Can you claim this business?','Find the correct listing and an available claim route.','Unavailable? Record it and prepare the business facts.'],
['02','#e8cabc','Is verification approved?','Complete the required claim and identity reviews.','A pending review is not an approval.'],
['03','#cce1e5','Is an agent available?','Check the separate rules for eligible U.S. online businesses.','Profile access does not promise a Business Agent.']
].map(([n,color,heading,line,note],i)=>{let y=240+i*175;return `<rect x="70" y="${y}" width="1060" height="152" rx="8" fill="${color}"/><text x="102" y="${y+65}" font-family="Georgia,serif" font-size="46" fill="#274535">${n}</text><text x="200" y="${y+48}" font-family="Georgia,serif" font-size="32" fill="#203c31">${heading}</text><text x="200" y="${y+88}" font-family="Arial,sans-serif" font-size="22" fill="#31483f">${line}</text><text x="200" y="${y+121}" font-family="Arial,sans-serif" font-size="21" fill="#31483f">${note}</text>`}).join('')}
<path d="M70 796H1130" stroke="#aeb9ab"/><text x="70" y="832" font-family="Arial,sans-serif" font-size="21" fill="#203c31">Claiming does not guarantee recommendations or inquiries.</text><text x="70" y="868" font-family="Arial,sans-serif" font-size="16" fill="#526457">Beta guidance checked Nov 15, 2026 · Recheck current OpenAI instructions · truepath406.com</text></svg>`;
const hero=`<svg xmlns="http://www.w3.org/2000/svg" width="1200" height="630" viewBox="0 0 1200 630"><rect width="1200" height="630" fill="#f1f0e8"/><rect x="810" y="0" width="390" height="630" fill="#dce8cc"/><text x="65" y="84" font-family="Arial,sans-serif" font-size="20" letter-spacing="3" fill="#955a32">BUSINESSES IN CHATGPT</text><text x="65" y="230" font-family="Georgia,serif" font-size="77" fill="#203c31">Start with</text><text x="65" y="321" font-family="Georgia,serif" font-size="77" fill="#203c31">the facts.</text><text x="69" y="398" font-family="Arial,sans-serif" font-size="25" fill="#4b5b51">A service owner’s guide to Business Hub</text><text x="69" y="557" font-family="Arial,sans-serif" font-size="19" letter-spacing="2" fill="#203c31">TRUE PATH DIGITAL · TRUEPATH406.COM</text><rect x="849" y="124" width="285" height="384" rx="8" fill="#fffdf7" stroke="#a9baa4"/><path d="M892 183H1084" stroke="#955a32" stroke-width="6"/><text x="890" y="238" font-family="Georgia,serif" font-size="30" fill="#203c31">Business facts</text>${['Services','Coverage','Contact','Next step'].map((s,i)=>`<rect x="890" y="${277+i*46}" width="13" height="13" fill="#bdd2b4"/><text x="919" y="${290+i*46}" font-family="Arial,sans-serif" font-size="20" fill="#4b5b51">${s}</text>`).join('')}</svg>`;
await fs.writeFile('public/downloads/chatgpt-business-profile-guide-cover.svg',hero);
await sharp(Buffer.from(hero)).png().toFile('public/downloads/chatgpt-business-profile-guide-cover.png');
await fs.writeFile('public/downloads/chatgpt-business-readiness-map.svg',svg);
await sharp(Buffer.from(svg)).png().toFile('public/downloads/chatgpt-business-readiness-map.png');
await fs.writeFile('public/downloads/chatgpt-business-fact-sheet.csv', 'Field,Owner-approved public information,Evidence or page URL,Last reviewed,Responsible person\n'+['Real business name','Primary website','Business type','Services offered','Work excluded','Actual service area','Customer-facing hours','Urgent request policy','Phone','Public contact email','Request or booking page','Supported credentials','Observed claim route or limitation'].map(x=>x+',,,,').join('\n')+'\n');
const md=await fs.readFile(path.join(dir,'article.md'),'utf8');
const esc=s=>s.replaceAll('&','&amp;').replaceAll('<','&lt;').replaceAll('>','&gt;').replaceAll('"','&quot;');
const inline=s=>esc(s).replace(/\[([^\]]+)\]\((https:\/\/[^)]+)\)/g,'<a href="$2">$1</a>').replace(/^\*(.*)\*$/,'<em>$1</em>');
let blocks=[];
for(const p of md.trim().split(/\n\s*\n/).slice(1)){
 let kind='paragraph',markup;
 if(p.startsWith('## ')){kind='heading';markup='<h2 class="wp-block-heading">'+inline(p.slice(3))+'</h2>';}
 else if(p.startsWith('![')){kind='image';let m=p.match(/^!\[([^\]]*)\]\(([^)]+)\)$/);markup='<figure class="wp-block-image size-full"><img src="'+esc(m[2])+'" alt="'+esc(m[1])+'"/></figure>';}
 else if(p.startsWith('- ')){kind='list';markup='<ul class="wp-block-list">'+p.split('\n').map(x=>'<!-- wp:list-item -->\n<li>'+inline(x.slice(2))+'</li>\n<!-- /wp:list-item -->').join('\n')+'</ul>';}
 else if(p.startsWith('> ')){kind='quote';markup='<blockquote class="wp-block-quote"><!-- wp:paragraph -->\n<p>'+inline(p.slice(2))+'</p>\n<!-- /wp:paragraph --></blockquote>';}
 else markup='<p>'+inline(p.replaceAll('\n',' '))+'</p>';
 blocks.push('<!-- wp:'+kind+(kind==='image'?' {"sizeSlug":"full","linkDestination":"none"}':'')+' -->\n'+markup+'\n<!-- /wp:'+kind+' -->');
}
await fs.writeFile(path.join(dir,'article.blocks.html'),blocks.join('\n\n')+'\n');
await fs.writeFile(path.join(dir,'publication.json'),JSON.stringify({title:md.split('\n')[0].slice(2),slug:'businesses-in-chatgpt-for-service-businesses',excerpt:'Claim your business in ChatGPT Business Hub. Check eligibility, understand verification, and prepare accurate profile details with a free fact sheet.',seoTitle:'ChatGPT Business Hub: How to Claim Your Business',metaDescription:'Claim your business in ChatGPT Business Hub. Check eligibility, understand verification, and prepare accurate profile details with a free fact sheet.'},null,2)+'\n');
console.log({blocks:blocks.length,articleWords:md.split(/\s+/).length});
