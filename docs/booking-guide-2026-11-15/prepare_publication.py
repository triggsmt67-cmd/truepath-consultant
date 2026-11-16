"""Prepare the authorized single-post update; this script never publishes."""
from pathlib import Path
import csv
import json
import re
import runpy

ROOT=Path(__file__).resolve().parent
PROJECT=ROOT.parents[1]
REVIEW=PROJECT/'docs/step-four-article-review-2026-11-15'
SLUG='home-service-booking'
MEDIA_ID=json.loads((ROOT/'wordpress-media.json').read_text())['id']
article=(ROOT/'article.md').read_text().replace('BOOKING_MEDIA_CLASS','wp-image-'+str(MEDIA_ID))
(REVIEW/'drafts'/f'{SLUG}.md').write_text(article)
runpy.run_path(str(REVIEW/'tools/build_review.py'))
post=next(p for p in json.loads((REVIEW/'proposed-wordpress-fields.json').read_text()) if p['slug']==SLUG)

headers=['Opportunity reference','Received date','Source if known','Service requested','Eligibility: yes/no/unknown','Exclusion reason','First human response date/time','Current status','Known outcome reason','Booking date','Owner','Next action','Review date']
with (PROJECT/'public/downloads/home-service-booking-audit-template.csv').open('w',newline='') as f:
    w=csv.writer(f,lineterminator='\n');w.writerow(headers)
    for n in range(1,31):w.writerow([f'B{n:03d}']+['']*(len(headers)-1))

outcomes=[('Booked',12,'Confirm the appointment'),('Still deciding',6,'Agree the next contact'),('No capacity',5,'Review schedule and coverage'),('Customer declined',4,'Record the stated reason'),('No reply yet',3,'Follow up as agreed')]
assert sum(count for _,count,_ in outcomes)==30
with (PROJECT/'public/downloads/home-service-booking-audit-example.csv').open('w',newline='') as f:
    w=csv.writer(f,lineterminator='\n');w.writerow(['Data type']+headers)
    n=0
    for status,count,action in outcomes:
        for _ in range(count):
            n+=1;values={key:'' for key in headers};values.update({'Opportunity reference':f'EX{n:03d}','Source if known':'Fictional example','Service requested':'Plumbing request','Eligibility: yes/no/unknown':'yes','Current status':status,'Next action':action})
            w.writerow(['FICTIONAL TEACHING EXAMPLE']+[values[key] for key in headers])
(ROOT/'example-counts.json').write_text(json.dumps({'contactRecords':40,'repeatContacts':6,'spamOrUnrelated':4,'eligible':30,'outcomes':dict((s,c) for s,c,_ in outcomes),'bookingRatePercent':40,'openOutcomes':9},indent=2)+'\n')

url='https://truepath406.com/insights/home-service-booking'
snippet=f'''<!-- Optional reference image. Adjust its display size for your page. -->
<a href="{url}">
  <img src="https://truepath406.com/downloads/home-service-booking-inquiry-map.png"
       alt="Fictional 30-inquiry booking audit with five outcome groups"
       width="1024" height="1536" style="max-width:100%;height:auto;" />
</a>
<p>Inquiry audit graphic by <a href="{url}">True Path Digital</a>.
Fictional example, not an industry benchmark.</p>
'''
(PROJECT/'public/downloads/home-service-booking-inquiry-map-embed.txt').write_text(snippet)

body=post['content'];matches=list(re.finditer(r'<(p|h2|h3|ul|ol|blockquote|figure)\b[\s\S]*?</\1>',body))
assert re.sub(r'\s+','',body)==re.sub(r'\s+','', ''.join(m[0] for m in matches))
blocks=[]
for m in matches:
    tag=m[1];markup=m[0];attrs={}
    if tag=='p':kind='paragraph'
    elif tag in ['h2','h3']:
        kind='heading';attrs={} if tag=='h2' else {'level':3};markup=markup.replace('<'+tag+'>','<'+tag+' class="wp-block-heading">',1)
    elif tag in ['ul','ol']:
        kind='list';attrs={} if tag=='ul' else {'ordered':True}
        items=re.findall(r'<li>([\s\S]*?)</li>',markup)
        markup='<'+tag+' class="wp-block-list">'+''.join('<!-- wp:list-item -->\n<li>'+x+'</li>\n<!-- /wp:list-item -->' for x in items)+'</'+tag+'>'
    elif tag=='blockquote':
        kind='quote';markup=markup.replace('<blockquote>','<blockquote class="wp-block-quote">',1);markup=re.sub(r'(<p>[\s\S]*?</p>)',r'<!-- wp:paragraph -->\n\1\n<!-- /wp:paragraph -->',markup)
    else:
        kind='image';attrs={'id':MEDIA_ID,'sizeSlug':'full','linkDestination':'custom'};markup=markup.replace(' />','/>')
    attr=' '+json.dumps(attrs,separators=(',',':')) if attrs else ''
    blocks.append('<!-- wp:'+kind+attr+' -->\n'+markup+'\n<!-- /wp:'+kind+' -->')
post['content']='\n\n'.join(blocks)+'\n'
post['status']='Authorized single-post update; not an API status parameter'
assert post['databaseId']==134
assert '\u2014' not in json.dumps(post,ensure_ascii=False)
assert len(post['excerpt'])<=155
(ROOT/'wordpress-update.json').write_text(json.dumps(post,ensure_ascii=False,indent=2)+'\n')
(ROOT/'wordpress-update.blocks.html').write_text(post['content'])
print('Prepared post 134, editable blocks, blank and example worksheets, and reconciled counts.')
