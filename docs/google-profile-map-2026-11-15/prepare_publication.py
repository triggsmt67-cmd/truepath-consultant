"""Prepare the approved single-post publication and downloadable page list."""
from pathlib import Path
import csv
import html
import json
import re

ROOT = Path(__file__).resolve().parent
PROJECT = ROOT.parents[1]
REVIEW = PROJECT / 'docs/step-four-article-review-2026-11-15'
SLUG = 'google-profile-is-killing-your-local-visibility'
POST = next(p for p in json.loads((REVIEW/'proposed-wordpress-fields.json').read_text()) if p['slug'] == SLUG)
ARTICLE = 'https://truepath406.com/insights/'+SLUG
ASSET = 'https://truepath406.com/downloads/google-business-profile-website-planning-map'

groups = [
    ('Home', [(1, 'Home', None)]),
    ('Services', [(2, 'Services', 1), (3, 'Drain cleaning', 2), (4, 'Leak repair', 2), (5, 'Water heater repair', 2), (6, 'Water heater replacement', 2), (7, 'Fixture installation', 2)]),
    ('Service areas', [(8, 'Service areas', 1), (9, 'Missoula', 8), (10, 'Lolo', 8), (11, 'Frenchtown', 8)]),
    ('Work', [(12, 'Work', 1), (13, 'Drain blockage case study', 12), (14, 'Leak repair case study', 12), (15, 'Water heater installation', 12)]),
    ('Advice', [(16, 'Advice', 1), (17, 'Repair or replace the water heater?', 16), (18, 'Why drains keep clogging', 16), (19, 'Find your water shutoff', 16), (20, 'What happens at a service visit?', 16), (21, 'How estimates work', 16)]),
    ('About', [(22, 'About', 1), (23, 'Meet the team', 22), (24, 'Licenses and insurance', 22), (25, 'Customer reviews', 22)]),
    ('Contact', [(26, 'Contact', 1), (27, 'Request service', 26), (28, 'Service FAQs', 26)]),
    ('Utility pages', [(29, 'Privacy', None), (30, 'Accessibility', None)]),
]
pages = [dict(number=n, title=t, parent=p, section=section) for section, rows in groups for n,t,p in rows]
assert [p['number'] for p in pages] == list(range(1,31))
(ROOT/'page-plan.json').write_text(json.dumps(pages,indent=2)+'\n')
with (PROJECT/'public/downloads/google-business-profile-website-planning-map.csv').open('w',newline='') as file:
    writer = csv.writer(file,lineterminator='\n'); writer.writerow(['Page number','Page idea','Parent page number','Section','Publish only when'])
    for page in pages:
        condition = 'You serve this location and have useful local details' if page['number'] in [9,10,11] else 'You have real completed work to explain' if page['number'] in [13,14,15] else 'These are genuine current credentials' if page['number']==24 else 'The page answers a real customer need and accurately represents your business'
        writer.writerow([page['number'],page['title'],page['parent'] or '',page['section'],condition])

snippet = f'''<!-- Optional reference image. Adjust display size to suit your website. -->
<a href="{ARTICLE}">
  <img src="{ASSET}.png"
       alt="30-page website planning example for a fictional plumbing business"
       width="1086" height="1448" style="max-width:100%;height:auto;" />
</a>
<p>Website planning map by <a href="{ARTICLE}">True Path Digital</a>.
This is an example, not a required page count.</p>
'''
(PROJECT/'public/downloads/google-business-profile-website-planning-map-embed.txt').write_text(snippet)

blocks = []
body = POST['content']
matches = list(re.finditer(r'<(p|h2|h3|ul|ol|blockquote|figure)\b[\s\S]*?</\1>',body))
assert re.sub(r'\s+','',body) == re.sub(r'\s+','', ''.join(m[0] for m in matches)), 'Unhandled body markup'
for match in matches:
    tag = match[1]; markup=match[0]
    if tag=='p': kind='paragraph'; attrs={}
    elif tag in ['h2','h3']:
        kind='heading'; attrs={} if tag=='h2' else {'level':3}
        markup=markup.replace('<'+tag+'>','<'+tag+' class="wp-block-heading">',1)
    elif tag in ['ul','ol']:
        kind='list'; attrs={} if tag=='ul' else {'ordered':True}
        items=re.findall(r'<li>([\s\S]*?)</li>',markup)
        markup='<'+tag+' class="wp-block-list">'+''.join('<!-- wp:list-item -->\n<li>'+x+'</li>\n<!-- /wp:list-item -->' for x in items)+'</'+tag+'>'
    elif tag=='blockquote':
        kind='quote'; attrs={}
        markup=markup.replace('<blockquote>','<blockquote class="wp-block-quote">',1)
        markup=re.sub(r'(<p>[\s\S]*?</p>)',r'<!-- wp:paragraph -->\n\1\n<!-- /wp:paragraph -->',markup)
    else:
        kind='image'; attrs={'id':247,'sizeSlug':'full','linkDestination':'custom'}
        markup=re.sub(r' (?:width|height)="[0-9]+"', '', markup)
        markup=markup.replace(' />', '/>')
    attr=' '+json.dumps(attrs,separators=(',',':')) if attrs else ''
    blocks.append('<!-- wp:'+kind+attr+' -->\n'+markup+'\n<!-- /wp:'+kind+' -->')

POST['content']='\n\n'.join(blocks)+'\n'
POST['status']='approved single-post update; not a status value for an API'
assert '\u2014' not in json.dumps(POST,ensure_ascii=False)
assert POST['content'].count('<!-- wp:image')==1
assert POST['databaseId']==153
(ROOT/'wordpress-update.json').write_text(json.dumps(POST,ensure_ascii=False,indent=2)+'\n')
(ROOT/'wordpress-update.blocks.html').write_text(POST['content'])
print('Prepared one editable WordPress post, one image block, and 30 numbered page ideas.')
