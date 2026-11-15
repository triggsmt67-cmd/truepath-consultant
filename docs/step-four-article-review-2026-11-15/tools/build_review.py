"""Build local review artifacts only. Never calls WordPress or deploys."""
from pathlib import Path
import csv
import difflib
import hashlib
import html
import json
import re

ROOT = Path(__file__).resolve().parents[1]
PROJECT = ROOT.parents[1]
POSTS = json.loads((ROOT / 'before/published-posts.json').read_text())['data']['posts']['nodes']

ARTICLES = [
    dict(slug='home-service-booking', keyword='Home Service Booking Rate', keywordBasis='Existing article topic; editorial working phrase, not verified query demand.', triage='HEAVY',
         title='Home Service Booking Rate: Find Where Inquiries Get Lost',
         excerpt='Calculate your home service booking rate, separate missed calls from poor fit and capacity limits, and decide what to fix before buying more leads.',
         angle='A cohort ledger that distinguishes response, fit, and capacity before the owner changes lead spend.',
         quick='Calculate booked opportunities divided by eligible inquiries, then multiply by 100. Count each request once and record pending outcomes. Use the result alongside capacity, job value, and reasons for non-booking to choose the next fix.',
         takeaways=['Define eligible inquiries and count each opportunity once.', 'Separate urgent service from planned projects and keep open outcomes visible.', 'Choose the fix from the actual constraint; there is no universal booking-rate threshold.'],
         faqs=[('How do I calculate my home service booking rate?', 'Divide booked opportunities by eligible inquiries and multiply by 100. For example, 12 bookings from 30 eligible inquiries is 40%. Count each request once and use the same eligibility rules each period.'), ('What is a good booking rate?', 'There is no universal target for every trade and job type. Compare consistent groups of inquiries, allowing for job mix, capacity, response time, and the normal decision window.'), ('How often should I follow up on an estimate?', 'Agree on the next contact with the customer. If no date is set, use a short, useful sequence suited to the job and stop when they respond, decline, book, or ask you to stop.')],
         changes=['Correct the reversed FAQ formula and define an eligible-inquiry denominator.', 'Remove the 62% missed-call claim, 100-times booking claim, and unsourced 30/35/50/60–70% thresholds.', 'Replace the claim that a 30% booking rate wastes 70% of spend with an explicit hypothetical calculation.', 'Replace universal ten-minute promises and capacity-full spending advice with constraint-based decisions.', 'Replace one-touch-only follow-up with the shared customer-agreed workflow.', 'Replace the body FAQ and summary fields with three consistent FAQs and takeaways.']),
    dict(slug='google-profile-is-killing-your-local-visibility', keyword='Google Business Profile Optimization', keywordBasis='User-selected priority keyword; saved query evidence includes the Missoula variant.', triage='HEAVY',
         title='Google Business Profile Optimization: A Maintenance Checklist',
         excerpt='Use this Google Business Profile optimization checklist to fix business details, test the contact path, plan useful updates, and measure customer actions.',
         angle='A customer-path maintenance routine with an owner and change triggers, separate from the service offer and broader local SEO article.',
         quick='Start with accurate business details and test the route from a service question to contacting your team. Assign maintenance when the business changes. Posts and photos should help customers; a weekly update is not a guaranteed ranking improvement.',
         takeaways=['Test one real service request through the public profile.', 'Correct facts and contact routes before adding more updates.', 'Keep profile interactions separate from answered calls and booked work.'],
         faqs=[('Does posting every week improve Google Maps rankings?', 'Google does not establish a guaranteed weekly posting benefit. Use posts for information customers need, and correct inaccurate profile details first.'), ('Do Google Business Profile posts expire after seven days?', 'The seven-day advice is outdated. Google currently says posts older than six months are archived unless a date range is set.'), ('Does a call in Business Profile Performance mean a booked job?', 'No. The calls metric counts clicks on the call button. Use separate inquiry and job records to establish answered calls and bookings.')],
         changes=['Replace the inactivity-penalty headline and hard-coded search title with a maintenance-focused title containing the priority keyword.', 'Remove the invented weekly scorecard, unsupported photo/review statistics, and ranking-factor percentages.', 'Correct seven-day post expiry to current six-month archive guidance.', 'Replace mandatory photo counts and Q&A seeding with useful photos, factual checks, and reliable contact routes.', 'Remove claims that a service-area list extends rankings or that fresh service-worded reviews guarantee wins.', 'Replace all old ACF FAQs and summaries; separate call-button clicks from booked work.', 'Link to the existing service page using the optimization phrase; preserve the article URL.']),
    dict(slug='why-digital-marketing-fails-early', keyword='Why Marketing Fails Early', keywordBasis='User-confirmed topic phrase.', triage='HEAVY',
         title='Why Marketing Fails Early: Check the Ad-to-Booking Handoff',
         excerpt='Find where marketing breaks: ad delivery, the landing page, inquiry tracking, or follow-through. Use a service-business example to choose one useful fix.',
         angle='A delivery-to-booking diagnostic that identifies the broken handoff before changing creative.',
         quick='Check ad delivery first, then follow the promise through the landing page, received inquiry, and booking handoff. Keep clicks, suitable inquiries, and booked work separate. Missing tracking must stay unknown rather than being reported as zero.',
         takeaways=['An ad can fail to deliver for reasons a headline cannot fix.', 'Match the service, location, and next step from ad to page.', 'Confirm inquiries arrive and someone owns the response before judging bookings.'],
         faqs=[('Should I rewrite the ad when it barely shows?', 'Check eligibility, billing, campaign dates, locations, budget, and bidding constraints first. Creative changes cannot fix every delivery problem.'), ('What does message match mean for a service business?', 'The landing page continues the service, location, and next-step promise made in the ad. It should also explain relevant scope and availability accurately.'), ('Do zero recorded conversions prove the campaign failed?', 'No. Confirm that tracking and inquiry delivery work. Missing measurement can look like poor performance, and a small sample may not support a conclusion.')],
         changes=['Delete the final editing offer addressed to the writer.', 'Remove the unconfirmed Montana client anecdote and replace it with a labeled hypothetical HVAC example.', 'Replace claims that platforms only reflect creative quality with a sourced Google auction explanation and delivery checks.', 'Remove certainty that bounce behavior automatically reduces the next round of distribution.', 'Keep the message-match checklist and add the missing received-inquiry and assigned-owner checks.', 'Replace both old ACF summaries and add aligned FAQs.']),
    dict(slug='how-to-follow-up-on-an-estimate-before-it-goes-cold', keyword='Estimate Follow-Up', keywordBasis='Existing article topic; saved exact query “estimate follow up” has 26 impressions, zero clicks, position 34.54.', triage='MODERATE',
         title='How to Follow Up on an Estimate (Before It Goes Cold)',
         excerpt='Follow up on an estimate with a clear next step, useful message examples, a respectful stopping point, and a way to measure outcomes without guessing.',
         angle='A customer-agreed decision sequence with specific message templates, stop rules, and a quote cohort measure.',
         quick='Confirm the estimate arrived, ask when and how the customer wants you to follow up, and make each contact useful. Stop when they respond, decline, book, or ask you to stop. Measure issued-estimate outcomes separately from response to new inquiries.',
         takeaways=['Agree on the next contact when sending the estimate.', 'Use scope and timing questions instead of repeated empty check-ins.', 'Track accepted, open, and declined estimates without guessing the reason for silence.'],
         faqs=[('How soon should I follow up on an estimate?', 'Use the timing agreed with the customer. If none is set, test a brief sequence: confirm delivery, offer useful help after two business days, then close the loop after about a week. Adapt it to the job.'), ('Should I stop after one unanswered follow-up?', 'One unanswered contact does not establish the outcome. Use the agreed process and stop when the customer responds, declines, books, or asks you to stop.'), ('How do I measure estimate acceptance?', 'For a defined group, divide accepted estimates by estimates issued and multiply by 100 after an appropriate decision window. Keep pending estimates visible and count revised or duplicate quotes consistently.')],
         changes=['Preserve the title and URL that already receive clicks.', 'Keep the useful uncertainty, scope, and ease-of-hiring argument while removing certainty that silence outweighs price.', 'Remove the unconfirmed contractor anecdote and replace the example with an explicitly hypothetical furnace decision.', 'Remove HBR/HBS, LSA, Housecall Pro, TransUnion, and BrightLocal numerical claims and source placeholders from the article.', 'Separate new-inquiry research from follow-up on an already-issued estimate.', 'Add message templates, an illustrative two-business-day/one-week sequence, and explicit stop rules.', 'Replace the old FAQs and categorical summaries to match the qualified advice.']),
    dict(slug='reviews-feel-awkward-when-theres-no-process', keyword='Reviews Process', keywordBasis='User-confirmed topic phrase.', triage='MODERATE',
         title='Reviews Process: Make Honest Feedback Easy After the Job',
         excerpt='Build a reviews process with a direct link, optional tap card, neutral request, clear ownership, and delivery checks that work when the shop gets busy.',
         angle='An operational invitation and delivery audit that removes front-desk pressure without steering the review.',
         quick='Use one objective invitation rule, a direct review link, and an assigned owner. Keep tap cards optional, use a clickable link on phones, and invite honest feedback without steering ratings or wording. Check messaging permission and delivery before automating.',
         takeaways=['Use the same invitation rule regardless of expected sentiment.', 'A tap card or QR code is optional; a text should provide a clickable link.', 'Measure invitations and delivery without treating public display names as customer identities.'],
         faqs=[('Can I ask only happy customers for a Google review?', 'No. Do not use satisfaction screening to route only positive reviewers to Google. Apply an objective invitation rule without discouraging negative feedback.'), ('Should I ask customers to mention a service or employee?', 'No. Let customers choose their own words. Google prohibits requests for specific review content, including content identifying a staff member.'), ('Should a review-request text contain a QR code?', 'A clickable link is usually easier on the same phone. Use the QR code on a sign or receipt, and send texts only through an appropriate permission and opt-out process.')],
         changes=['Keep the tap-card/signage/thank-you workflow but remove the unconfirmed “our shop” result claim.', 'Replace happy-customer selection and service-word prompts with neutral, consistently applied invitations.', 'Correct RFID terminology to NFC and explain the card as a link-opening convenience.', 'Use a clickable link in phone messages; reserve QR codes for another surface.', 'Remove unsupported survey percentages, AI/review-word ranking claims, and twenty-new-versus-two-hundred-old comparisons.', 'Add process ownership, provider-specific permission guidance, and delivery measurements.', 'Replace every ACF FAQ and summary to remove the same policy problems from visible FAQs and structured data.']),
]

def inline(text):
    text = html.escape(text)
    text = re.sub(r'\[([^\]]+)\]\((https://[^)]+)\)', r'<a href="\2">\1</a>', text)
    return re.sub(r'\*\*(.+?)\*\*', r'<strong>\1</strong>', text)

def render(md):
    output = []
    for block in md.strip().split('\n\n'):
        lines = block.splitlines()
        if lines[0].startswith('#'):
            match = re.match(r'^(#{1,3}) (.*)', lines[0]); n = len(match[1]); output.append(f'<h{n}>{inline(match[2])}</h{n}>')
        elif all(x.startswith('- ') for x in lines):
            output.append('<ul>' + ''.join('<li>'+inline(x[2:])+'</li>' for x in lines) + '</ul>')
        elif all(re.match(r'^\d+\. ', x) for x in lines):
            output.append('<ol>' + ''.join('<li>'+inline(re.sub(r'^\d+\. ', '', x))+'</li>' for x in lines) + '</ol>')
        elif all(x.startswith('> ') for x in lines):
            output.append('<blockquote><p>'+inline(' '.join(x[2:] for x in lines))+'</p></blockquote>')
        else:
            output.append('<p>'+inline(' '.join(lines))+'</p>')
    return '\n'.join(output)

def field_table(before, after):
    return '<table><thead><tr><th>Field</th><th>Current</th><th>Proposed</th></tr></thead><tbody>' + ''.join('<tr><th>'+html.escape(key)+'</th><td><pre>'+html.escape(str(before.get(key, '—')))+'</pre></td><td><pre>'+html.escape(str(value))+'</pre></td></tr>' for key,value in after.items())+'</tbody></table>'

(ROOT/'after').mkdir(exist_ok=True)
manifest = []
panels = []
for index, item in enumerate(ARTICLES, 1):
    slug = item['slug']; before = next(p for p in POSTS if p['slug'] == slug)
    md = (ROOT/'drafts'/f'{slug}.md').read_text()
    assert md.splitlines()[0] == '# '+item['title']
    body = render('\n'.join(md.splitlines()[2:]))
    faqs = '\n\n'.join('Q: '+q+'\nA: '+a for q,a in item['faqs'])
    acf = dict(ai_quick_answer=item['quick'], ai_faqs=faqs, ai_takeaways='\n'.join(item['takeaways']))
    record = dict(databaseId=before['databaseId'], slug=slug, expectedModified=before['modified'], capturedOn='2026-11-15', expectedContentSha256=hashlib.sha256(before['content'].encode()).hexdigest(), status='review-only; not applied', title=item['title'], searchTitle=item['title'], excerpt=item['excerpt'], content=body, aiOverviews=dict(ai_overviews=acf))
    manifest.append(record)
    (ROOT/'after'/f'{slug}.html').write_text(body+'\n')
    old_banned = [(x, len(re.findall(re.escape(x), before['content'], re.I))) for x in ['Imagine this', 'Picture this', 'Let’s delve', 'Let’s dive', 'In a world where', 'Have you ever wondered', 'Moreover', 'Furthermore', 'Thus', 'It is worth noting', 'In conclusion', 'In summary', 'Ultimately', 'All in all', 'To wrap up']]
    old_banned = [f'{x} ({n})' for x,n in old_banned if n]
    audit = f'''---
SEO AUDIT SUMMARY
Primary keyword: {item['keyword']}
Keyword basis: {item['keywordBasis']}

TRIAGE: {item['triage']}
{item['angle']}

Header Check: ISSUES FOUND
- Align the title and headings with the specific reader task; retain the existing canonical URL.

E-E-A-T Check: ISSUES FOUND
- Correct the unsupported claims listed in the change log; replace unconfirmed firsthand stories with clearly labeled hypothetical examples.

Fluff & Formatting: ISSUES FOUND
- Remove repetitive certainty and give the reader a concrete workflow and measurement limits.

AI Tells Found: {sum(n for x,n in [(x,len(re.findall(re.escape(x),before['content'],re.I))) for x in ['Imagine this', 'Picture this', 'Let’s delve', 'Let’s dive', 'In a world where', 'Have you ever wondered', 'Moreover', 'Furthermore', 'Thus', 'It is worth noting', 'In conclusion', 'In summary', 'Ultimately', 'All in all', 'To wrap up']])}
- {', '.join(old_banned) if old_banned else 'No exact banned phrase from the checked list; the factual and operational problems remain.'}

Overall verdict: {item['changes'][0]} The changes below address specific reader needs; no ranking or conversion gain is promised.
---

'''
    audit += md + '\n## Exact publishing fields\n\nCanonical URL: https://truepath406.com/insights/'+slug+'\n\nSearch title: '+item['title']+'\n\nExcerpt / meta description: '+item['excerpt']+'\n\nQuick answer:\n\n'+item['quick']+'\n\nTakeaways:\n\n'+'\n'.join('- '+x for x in item['takeaways'])+'\n\nFAQs (replace the existing FAQ field):\n\n'+'\n\n'.join('### '+q+'\n\n'+a for q,a in item['faqs'])+'\n\n## Change Log\n\n'+'\n'.join('- '+c for c in item['changes'])+'\n'
    (ROOT/'drafts'/f'{slug}-review.md').write_text(audit)
    oldfields=dict(title=before['title'],excerpt=before['excerpt'], **(before.get('aiOverviews',{}).get('ai_overviews') or {}))
    newfields=dict(title=item['title'],excerpt=item['excerpt'],**acf)
    faqhtml='<h2>Frequently asked questions</h2>'+''.join('<h3>'+html.escape(q)+'</h3><p>'+html.escape(a)+'</p>' for q,a in item['faqs'])
    panels.append(f'<section id="{slug}"><div class="section-label">Article {index} · {item["triage"].lower()} revision</div><h2>{html.escape(item["title"])}</h2><p class="angle">{html.escape(item["angle"])}</p><p><a href="https://truepath406.com/insights/{slug}">Current live article</a> · URL preserved</p><h3>What changes</h3><ul>'+''.join('<li>'+html.escape(c)+'</li>' for c in item['changes'])+'</ul><details><summary>Exact field changes, including summaries and FAQs</summary>'+field_table(oldfields,newfields)+'</details><details><summary>Current article body — captured November 15</summary><pre class="oldbody">'+html.escape((ROOT/'before'/f'{slug}.txt').read_text())+'</pre></details><div class="draft"><p class="section-label">Proposed article</p><h1>'+html.escape(item['title'])+'</h1><aside><strong>Quick answer</strong><p>'+html.escape(item['quick'])+'</p></aside><aside><strong>Takeaways</strong><ul>'+''.join('<li>'+html.escape(t)+'</li>' for t in item['takeaways'])+'</ul></aside>'+body+faqhtml+'</div></section>')

(ROOT/'proposed-wordpress-fields.json').write_text(json.dumps(manifest,ensure_ascii=False,indent=2)+'\n')

# Prepared patches are review artifacts. Source files are read, never written.
changes=[]
file='src/app/insights/[slug]/page.tsx';old=(PROJECT/file).read_text();new=old
for slug, oldtitle in [('google-profile-is-killing-your-local-visibility','Inactive Google Profiles Kill Local Visibility'),('home-service-booking','The “More Leads” Trap: Fix Your Booking Rate First')]:
    title=next(x['title'] for x in ARTICLES if x['slug']==slug)
    assert '"'+oldtitle+'"' in new
    new=new.replace('"'+oldtitle+'"','"'+title+'"',1)
changes.append((file,old,new))
file='src/app/services/google-profile/layout.tsx';old=(PROJECT/file).read_text();new=old
service_title='Google Business Profile Optimization in Missoula'
service_description='Google Business Profile optimization for Missoula service businesses. Review categories, services, reviews, and contact paths. Request a profile review.'
new=new.replace('title: "Google Business Profile Optimization",', 'title: "'+service_title+'",')
new=new.replace('title: "Google Business Profile Optimization | True Path Digital",','title: "'+service_title+' | True Path Digital",')
new=re.sub(r'description: "[^"]+",','description: "'+service_description+'",',new)
changes.append((file,old,new))
file='src/app/services/google-profile/page.tsx';old=(PROJECT/file).read_text();new=old
new=new.replace('className="block text-foreground">Show Up Better</motion.span>','className="block text-foreground">Google Business Profile</motion.span>',1)
new=new.replace('className="block text-primary">on Google Maps.</motion.span>','className="block text-primary">Optimization in Missoula.</motion.span>',1)
old_intro='Your Google Business Profile is often the first thing a potential customer sees. I help owner-operated service businesses clean up, strengthen, and better manage their profiles so they can turn more local searches into phone calls.'
new_intro='I help owner-operated service businesses in Missoula review their Google Business Profile, correct inaccurate details, and make it easier for customers to reach them. Start with categories, services, reviews, and the path from your profile to an inquiry.'
assert old_intro in new;new=new.replace(old_intro,new_intro,1)
changes.append((file,old,new))
patch=''.join(''.join(difflib.unified_diff(old.splitlines(True),new.splitlines(True),fromfile='a/'+file,tofile='b/'+file)) for file,old,new in changes)
(ROOT/'proposed-frontend.patch').write_text(patch)
frontend={'status':'proposal only; not applied', 'service':{'url':'https://truepath406.com/services/google-profile','title':service_title,'description':service_description,'h1':'Google Business Profile Optimization in Missoula.','intro':new_intro},'files':[file for file,old,new in changes]}
(ROOT/'proposed-frontend.json').write_text(json.dumps(frontend,indent=2)+'\n')

css='''*{box-sizing:border-box}html{scroll-behavior:auto}body{margin:0;background:#f3f1eb;color:#202c29;font:17px/1.65 system-ui,sans-serif}header{background:#183b34;color:#fff;padding:52px max(24px,calc((100vw - 1120px)/2))}header p{max-width:790px;color:#e0e9df}main{max-width:1120px;margin:auto;padding:28px 24px 70px}h1,h2,h3{line-height:1.2;letter-spacing:-.02em}h1{font-size:clamp(30px,4vw,50px)}h2{font-size:32px}h3{font-size:22px;margin-top:28px}a{color:#11604d;text-underline-offset:3px}header a{color:#fff}section{margin:38px 0;padding:34px;background:#fff;border:1px solid #d9ded4;border-radius:12px;scroll-margin-top:20px}.section-label{font-size:12px;font-weight:700;text-transform:uppercase;letter-spacing:.12em;color:#547063}.pill{display:inline-block;border:1px solid #b9d8aa;border-radius:30px;padding:5px 14px;color:#e4f4d8;font-size:13px}.angle{font-size:21px;color:#4d6356}.draft{max-width:780px;margin:34px auto 0;border-top:2px solid #527865;padding-top:30px}.draft h1{font:600 36px/1.2 Georgia,serif}.draft h2{font:600 28px/1.3 Georgia,serif;margin-top:38px}.draft p{margin:18px 0}aside,blockquote{padding:15px 22px;background:#f0f4ed;border-left:4px solid #64864e;margin:24px 0}details{border:1px solid #d9ded4;border-radius:6px;padding:14px;margin:16px 0}summary{font-weight:650;cursor:pointer}pre{white-space:pre-wrap;word-break:break-word;font:14px/1.6 system-ui}table{border-collapse:collapse;width:100%;font-size:14px;margin:20px 0}th,td{border:1px solid #d6ddd5;text-align:left;vertical-align:top;padding:12px}th{background:#edf3eb}td{max-width:360px}nav{display:flex;gap:10px;flex-wrap:wrap;margin:24px 0}nav a{padding:8px 13px;background:#e6eddf;border-radius:5px;font-size:14px}.small{font-size:14px;color:#536259}.warning{padding:20px;background:#fff4d7;border:1px solid #dcc780;border-radius:6px}.oldbody{max-height:550px;overflow:auto}.service-preview{border-left:4px solid #64864e;padding:10px 24px;background:#f0f4ed}@media(max-width:640px){section{padding:20px}main{padding:18px 12px}th,td{padding:7px}table{font-size:12px}header{padding:32px 20px}}@media print{details{display:block}section{break-before:page}nav{display:none}}'''
intro='''<section id="overview"><p class="section-label">Decision brief</p><h2>Five different jobs for five articles</h2><p>The revisions separate inquiry conversion, profile maintenance, advertising handoffs, estimate decisions, and review operations. Each includes a practical check; hypothetical examples are labeled and unsupported numbers are removed.</p><div class="warning"><strong>Review only.</strong> No WordPress content, live code, or tracking settings have been changed. These are full replacement texts, not excerpts. URLs and original publication dates stay in place. The proposed frontend patch is saved separately and has not been applied.</div><h3>The valuable keyword</h3><p>The saved three-month export reports <strong>“google business profile optimization missoula”: 24 impressions, zero clicks, average position 21.58</strong> for August 14–November 13, 2026. The exact unmodified phrase is not present in that export. These query totals do not identify its landing page, and the small sample does not establish why people did not click.</p><p>The service page should answer a request to hire help in Missoula. The existing Google Profile article should answer how to maintain an existing profile. The broader Local SEO article remains an agency-expectations guide. This is an editorial intent plan, not proof of keyword cannibalization.</p><h3>Review each article</h3><nav>'''+''.join('<a href="#'+a['slug']+'">'+label+'</a>' for a,label in zip(ARTICLES,['Booking','Google Profile','Why Marketing Fails Early','Estimate Follow-Up','Reviews Process']))+'''<a href="#service">Service-page proposal</a></nav></section>'''
service='<section id="service"><p class="section-label">Companion proposal · requires approval</p><h2>Give the service page a clear local offer</h2><p>The live service page already uses the priority keyword in metadata, but its H1 says “Show Up Better on Google Maps.” The proposed copy makes the service and location explicit. No new service, turnaround, price, case result, or ranking guarantee is invented.</p><div class="service-preview"><p><strong>Search title:</strong> '+service_title+' | True Path Digital</p><p><strong>Description:</strong> '+service_description+'</p><h3>Google Business Profile<br>Optimization in Missoula.</h3><p>'+new_intro+'</p><p><strong>Existing CTA retained:</strong> Request a Google Business Profile Review</p></div><p>The article will link to this page with descriptive optimization wording. Google may generate its own title and snippet; this is proposed site copy, not a guaranteed search-result appearance.</p><details><summary>Exact frontend patch — not applied</summary><pre>'+html.escape(patch)+'</pre></details></section>'
page='<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1"><meta name="robots" content="noindex,nofollow"><title>Step 4 · True Path article review</title><style>'+css+'</style></head><body><header><span class="pill">November 15, 2026 · Awaiting review</span><h1>Priority article corrections</h1><p>Research-backed replacements, exact field changes, and a focused plan for Google Business Profile Optimization.</p></header><main>'+intro+''.join(panels)+service+'<p class="small">Source notes, original snapshots, Markdown drafts, exact WordPress field values, and the unapplied frontend patch are saved alongside this review. This preview is a reading layout, not a screenshot of the production theme.</p></main></body></html>'
(ROOT/'review.html').write_text('\n'.join(line.rstrip() for line in page.splitlines())+'\n')

with (ROOT/'booking-audit-template.csv').open('w') as file:
    csv.writer(file, lineterminator="\n").writerow(['Opportunity ID','Received date','Source if known','Service','Eligible yes/no','Exclusion reason','First human response','Status','Booking date','Outcome reason if known','Review date'])
with (ROOT/'estimate-audit-template.csv').open('w') as file:
    csv.writer(file, lineterminator="\n").writerow(['Estimate ID','Issued date','Service type','Value','Preferred channel','Agreed next contact','Owner','Status','Accepted date','Outcome reason if known'])
with (ROOT/'review-invitation-template.csv').open('w') as file:
    csv.writer(file, lineterminator="\n").writerow(['Job reference','Completion date','Invitation eligibility rule','Permitted contact channel','Invitation date','Delivered yes/no','Opt-out handled','Process owner'])

for item in manifest:
    assert len(item['excerpt']) <= 155, (item['slug'], len(item['excerpt']))
    assert item['content'].count('<h1>') == 0
    assert item['aiOverviews']['ai_overviews']['ai_faqs'].count('Q: ') == 3
print('Built five complete replacements, exact WordPress fields, unapplied frontend patch, reading preview, and three blank audit templates.')
