/* The Six Daily v1.1 · local reader · no tracking, no accounts, no API keys */
'use strict';

const FEATURED_ID = 'rsg-2026-launch-trailer';
const OFFICIAL_STORIES = [
  {
    id: FEATURED_ID,
    readerSections: [
      { heading: 'What happened', body: 'Rockstar released a new Grand Theft Auto VI launch trailer. The official presentation puts Jason, Lucia, Vice City and the surrounding state of Leonida back at the center of the conversation.' },
      { heading: 'Why gamers care', body: 'A new trailer provides first-hand material to inspect: the setting, how Rockstar presents its characters, and which details it chooses to emphasize. Fans can compare what is visible on screen with earlier official material without treating theories as confirmed game features.' },
      { heading: 'What to watch next', body: 'For the footage itself and any updated description, visit Rockstar’s original announcement. This briefing does not claim that an unseen gameplay mechanic has been confirmed.' },
    ],
    topic: 'ingame',
    title: 'Watch the Grand Theft Auto VI launch trailer',
    summary: 'Rockstar published a new launch trailer, returning the spotlight to Jason, Lucia, Vice City, and the state of Leonida.',
    source: 'Rockstar Games',
    date: '2026-10-15T12:00:00Z',
    url: 'https://www.rockstargames.com/newswire/article/517572321a549a/watch-the-grand-theft-auto-vi-launch-trailer',
    type: 'official',
    art: 'sunset',
    graphic: 'THE TRAILER',
    reviewed: true,
  },
  {
    id: 'rsg-2026-music',
    readerSections: [
      { heading: 'What happened', body: 'Rockstar’s GTA VI music page highlights the world’s in-game radio, music previews and original scoring. It is a direct source for information about the sound of the game.' },
      { heading: 'Why gamers care', body: 'Radio is part of how GTA worlds establish personality and place. Music reveals something about atmosphere even when Rockstar is not giving away new missions or gameplay systems.' },
      { heading: 'What to watch next', body: 'Open Rockstar’s music page for the audio previews and the most current details. Song inclusions or station descriptions should be attributed to the official page rather than inferred from rumors.' },
    ],
    topic: 'ingame',
    title: 'Inside the sound of Leonida: in-game radio and original music',
    summary: 'Rockstar showcases GTA VI radio stations, music previews, and the official score on its dedicated music page.',
    source: 'Rockstar Games',
    date: '2026-10-08T12:00:00Z',
    url: 'https://www.rockstargames.com/VI/music',
    type: 'official',
    art: 'radio',
    graphic: 'THE SOUND',
    reviewed: true,
  },
  {
    id: 'rsg-2026-merch',
    readerSections: [
      { heading: 'What happened', body: 'Rockstar introduced a GTA VI merchandise collection through its official store, including apparel and collectible items.' },
      { heading: 'Why gamers care', body: 'This is a product update rather than an in-game feature reveal. Fans interested in official collectibles may care; players looking for map, character or gameplay details can use our In-game intel filter instead.' },
      { heading: 'What to watch next', body: 'Visit the Rockstar Store announcement for its current listings and any purchase terms. Availability and pricing may change.' },
    ],
    topic: 'industry',
    title: 'Rockstar unveils the official GTA VI collection',
    summary: 'The Rockstar Store has introduced GTA VI apparel and collectibles, including shirts, hats, and accessories.',
    source: 'Rockstar Games',
    date: '2026-10-08T12:00:00Z',
    url: 'https://www.rockstargames.com/newswire/article/759875393o5253/grand-theft-auto-vi-collection-now-at-the-rockstar-store',
    type: 'official',
    art: 'merch',
    graphic: 'THE DROP',
    reviewed: true,
  },
  {
    id: 'rsg-2026-album',
    readerSections: [
      { heading: 'What happened', body: 'Rockstar announced Grand Theft Auto VI: The Album, a 34-track release created with Atlantic Records. The announcement describes planned streaming and physical formats.' },
      { heading: 'Why gamers care', body: 'An official album can offer a way to explore the music identity of GTA VI outside the game. It is worth distinguishing an album announcement from a confirmed list of every in-game radio track.' },
      { heading: 'What to watch next', body: 'Check the original Rockstar announcement for the confirmed track list, formats and release information.' },
    ],
    topic: 'industry',
    title: 'Grand Theft Auto VI: The Album announced for November 19',
    summary: 'Rockstar announced a 34-track official album created with Atlantic Records, with physical releases and streaming availability planned.',
    source: 'Rockstar Games',
    date: '2026-09-17T12:00:00Z',
    url: 'https://www.rockstargames.com/newswire/article/7599a881942544/announcing-grand-theft-auto-vi-the-album-coming-november-19',
    type: 'official',
    art: 'album',
    graphic: 'THE ALBUM',
    reviewed: true,
  },
  {
    id: 'rsg-2026-extended',
    readerSections: [
      { heading: 'What happened', body: 'Rockstar shared an extended look at GTA VI and described it as captured from in-game PlayStation 5 footage.' },
      { heading: 'Why gamers care', body: 'Extended official footage gives players more material to observe: places, characters, atmosphere and presentation. It can motivate theories, but interpretation of a shot is not the same as official confirmation of a feature.' },
      { heading: 'What to watch next', body: 'Watch the official presentation and compare any claims directly with the footage and accompanying Rockstar description.' },
    ],
    topic: 'ingame',
    title: 'Rockstar shares an extended look at Grand Theft Auto VI',
    summary: 'The extended GTA VI presentation was published in August. Rockstar says it was captured from in-game PlayStation 5 footage.',
    source: 'Rockstar Games',
    date: '2026-08-27T12:00:00Z',
    url: 'https://www.rockstargames.com/newswire/article/4k138k8okkk483/grand-theft-auto-vi-an-extended-look-now-playing',
    type: 'official',
    art: 'sunset',
    graphic: 'CLOSER LOOK',
    reviewed: true,
  },
];

const state = { allStories: [...OFFICIAL_STORIES], filter: 'all', query: '', visible: 6, updatedAt: null, coverageLoaded: false };
const $ = selector => document.querySelector(selector);
const $$ = selector => [...document.querySelectorAll(selector)];
const safeHttpUrl = value => { try { const u = new URL(value); return u.protocol === 'https:' || u.protocol === 'http:' ? u.href : null; } catch { return null; } };
const readSaved = () => { try { const data = JSON.parse(localStorage.getItem('six-daily-saved') || '[]'); return new Set(Array.isArray(data) ? data.filter(x=>typeof x==='string') : []); } catch { return new Set(); } };
let saved = readSaved();
const saveSaved = () => { try { localStorage.setItem('six-daily-saved',JSON.stringify([...saved])); } catch {/* private browser storage may be disabled */} };
function toast(message) { const el=$('#toast'); el.textContent=message; el.classList.add('show'); clearTimeout(toast.timer); toast.timer=setTimeout(()=>el.classList.remove('show'),2500); }
function dateFormat(value) { const ms=Date.parse(value); if(!Number.isFinite(ms)) return 'DATE UNKNOWN'; return new Intl.DateTimeFormat('en-US',{month:'short',day:'numeric',year:'numeric',timeZone:'UTC'}).format(new Date(ms)).toUpperCase(); }
const INGAME_WORDS = /\b(gameplay|in.game|in-game|mechanics?|map|world|vice city|leonida|lucia|jason|characters?|story|missions?|heists?|vehicles?|cars?|driving|police|cops|wanted|weapons?|combat|shooting|online|multiplayer|radio stations?|interiors?|screenshots?|trailer breakdown|trailer details|activities|features?|exploration|npc|physics|graphics|animations?)\b/i;
function storyIsIngame(item) { return item.topic === 'ingame' || (!item.topic && INGAME_WORDS.test(item.title || '')); }
function typeName(type) { return type==='official'?'✳ DIRECT ROCKSTAR SOURCE':type==='rumor'?'◇ RUMOR / UNVERIFIED':'▤ THIRD-PARTY COVERAGE'; }
function summarize(item) { if(item.reviewed) return item.summary; if(item.type==='rumor') return 'Automatically gathered headline. This claim has not been independently verified. Open the source before drawing conclusions.'; return 'Automatically gathered from a third-party news feed. The Six Daily has not independently verified this article’s claims.'; }
function updateSavedUI() { $('#saved-count').textContent=saved.size; const btn=$('#hero-save'); btn.classList.toggle('is-saved',saved.has(FEATURED_ID)); btn.setAttribute('aria-pressed',String(saved.has(FEATURED_ID))); btn.textContent=saved.has(FEATURED_ID)?'♥':'♡'; }
function toggleSaved(id) { if(saved.has(id)){ saved.delete(id); toast('Removed from your saved stories'); } else { saved.add(id); toast('Saved to your reading list'); } saveSaved(); updateSavedUI(); render(); }
function create(tag, className, text) { const node=document.createElement(tag); if(className)node.className=className; if(text!==undefined)node.textContent=text; return node; }
function makeStoryCard(item, index) {
  const card=create('article','story-card');
  const art=create('div','story-graphic');
  const arts=['sunset','radio','merch','album'];
  const artName=arts.includes(item.art)?item.art:['sunset','radio','merch','album'][index%4];
  const picture=create('img'); picture.src=`./assets/card-${artName}.svg`; picture.alt=''; picture.loading='lazy'; art.appendChild(picture);
  art.appendChild(create('span','graphic-label',item.graphic|| (item.type==='rumor'?'RUMOR WATCH':'THE HEADLINES')));
  const body=create('div','article-content');
  const top=create('div','article-top'); top.appendChild(create('span',`article-type ${item.type}`,typeName(item.type))); top.appendChild(create('span','article-date',dateFormat(item.date))); body.appendChild(top);
  const title=create('h3'); const titleLink=create('button','story-open',item.title); titleLink.type='button'; titleLink.setAttribute('aria-label',`Read ${item.title} in The Six Daily`); titleLink.addEventListener('click',()=>openReader(item)); title.appendChild(titleLink); body.appendChild(title);
  body.appendChild(create('p','article-summary',summarize(item)));
  const source=create('div','source-line'); source.appendChild(create('span',null,'SOURCE /')); source.appendChild(create('span','source-value',item.source||'Unknown publication')); body.appendChild(source);
  const actions=create('div','article-actions'); const link=create('button','read-in-app',item.reviewed?'READ IN THE SIX':'OPEN STORY DETAILS'); link.type='button'; link.addEventListener('click',()=>openReader(item)); const arrow=create('span',null,'→'); link.appendChild(arrow); actions.appendChild(link);
  const actionBtns=create('div','card-action-buttons'); const shareBtn=create('button','card-icon-btn','↗'); shareBtn.type='button'; shareBtn.title='Share story'; shareBtn.setAttribute('aria-label',`Share ${item.title}`); shareBtn.addEventListener('click',async()=>{ try { if(navigator.share) await navigator.share({title:item.title,url:item.url}); else if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(item.url);toast('Story link copied');}else toast('Open the source to copy the link'); }catch(e){ if(e.name!=='AbortError')toast('Sharing was unavailable'); } });
  const bookmark=create('button',`card-icon-btn ${saved.has(item.id)?'is-saved':''}`,saved.has(item.id)?'♥':'♡'); bookmark.type='button'; bookmark.setAttribute('aria-label',saved.has(item.id)?`Remove saved story ${item.title}`:`Save story ${item.title}`); bookmark.setAttribute('aria-pressed',String(saved.has(item.id))); bookmark.title='Save for later'; bookmark.addEventListener('click',()=>toggleSaved(item.id)); actionBtns.appendChild(shareBtn); actionBtns.appendChild(bookmark); actions.appendChild(actionBtns);body.appendChild(actions);card.appendChild(art);card.appendChild(body);return card;
}
// Native dialog keeps the visitor on the news website. Content is only original editorial copy
// for reviewed entries; unreviewed feed items show metadata, not copied publisher articles.
function openReader(item) {
  const dlg=$('#story-reader');
  const artName=['sunset','radio','merch','album'].includes(item.art)?item.art:'sunset';
  $('#reader-art').src=`./assets/card-${artName}.svg`;
  $('#reader-cover-label').textContent=item.graphic||(storyIsIngame(item)?'IN-GAME INTEL':'THE HEADLINES');
  $('#reader-label').textContent=typeName(item.type)+(storyIsIngame(item)?'  ·  IN-GAME TOPIC':'');
  $('#reader-title').textContent=item.title;
  $('#reader-meta').textContent=`${item.source||'Source not provided'}  ·  ${dateFormat(item.date)}`;
  $('#reader-description').textContent=item.reviewed?item.summary:'This headline was collected automatically from a third-party news feed.';
  const body=$('#reader-body');body.replaceChildren();
  if(item.reviewed && item.summary){
    (item.readerSections||[{heading:'The Six Daily briefing',body:item.summary}]).forEach(section=>{
      body.appendChild(create('h3',null,section.heading));
      body.appendChild(create('p',null,section.body));
    });
    body.appendChild(create('p','reader-note','Original reporting and commentary by The Six Daily. This is a concise briefing, not a reproduction of the publisher’s complete article.'));
  } else {
    body.appendChild(create('div','reader-unreviewed',item.type==='rumor'?'UNVERIFIED CLAIM — DO NOT TREAT AS CONFIRMED':'THIRD-PARTY HEADLINE — NOT INDEPENDENTLY VERIFIED'));
    body.appendChild(create('h3',null,'What we can confirm from the feed'));
    body.appendChild(create('p',null,`The publisher credited in the news feed is ${item.source||'not identified'}. The headline is dated ${dateFormat(item.date)}. The Six Daily has not reviewed the full article or verified its claims.`));
    body.appendChild(create('h3',null,'Read the complete story'));
    body.appendChild(create('p',null,'Open the publisher’s original article using the button below. Once The Six Daily publishes an independently written, fact-checked briefing, that analysis can appear here instead.'));
    body.appendChild(create('p','reader-note','This reading view intentionally does not copy third-party article text. A headline alone is not enough evidence to write a reliable summary.'));
  }
  const link=$('#reader-original');link.href=safeHttpUrl(item.url)||'https://www.rockstargames.com/VI';link.textContent=(new URL(link.href).hostname==='news.google.com'?'Open source via Google News  ↗':'Read original article  ↗');
  $('#reader-scroll').scrollTop=0;
  dlg.showModal();
  document.body.classList.add('reader-active');
}
function closeReader(){const dlg=$('#story-reader');if(dlg.open)dlg.close();document.body.classList.remove('reader-active');}
function matching() { return state.allStories.filter(item=>{ const inFilter=state.filter==='all'||(state.filter==='saved'&&saved.has(item.id))||(state.filter==='ingame'&&storyIsIngame(item))||item.type===state.filter; const text=[item.title,item.source,item.summary||''].join(' ').toLowerCase();return inFilter&&(!state.query||text.includes(state.query)); }); }
function render() { const result=matching(); const grid=$('#story-grid'); grid.replaceChildren(); if(!result.length){const empty=create('div','empty-state');empty.appendChild(create('strong',null,state.filter==='saved'?'NOTHING SAVED. YET.':'NO STORIES FOUND.'));empty.appendChild(create('p',null,state.filter==='saved'?'Tap the heart on a story to keep it here for later.':'Try another search or category. New third-party headlines appear when the updater has run successfully.'));if(state.filter!=='all'||state.query){const reset=create('button',null,'Show all stories');reset.addEventListener('click',()=>{state.query='';$('#news-search').value='';setFilter('all');});empty.appendChild(reset);}grid.appendChild(empty);} else result.slice(0,state.visible).forEach((item,i)=>grid.appendChild(makeStoryCard(item,i))); $('#story-count').textContent=`${result.length} ${result.length===1?'STORY':'STORIES'}`; $('#load-more').hidden=result.length<=state.visible; updateSavedUI(); }
function setFilter(filter) { state.filter=filter;state.visible=6;$$('[data-filter]').forEach(el=>{const active=el.dataset.filter===filter;el.classList.toggle('active',active);if(el.classList.contains('nav-link')||el.classList.contains('mobile-tab')) el.setAttribute('aria-current',active?'page':'false');});render(); if(window.innerWidth<761&&filter!=='all')$('#updates').scrollIntoView({behavior:'smooth',block:'start'}); }
function setupCountdown(){ const target=Date.parse('2026-11-19T00:00:00-05:00'); const left=Math.ceil((target-Date.now())/86400000);$('#days-left').replaceChildren(document.createTextNode(left>0?String(left):'—'),create('span',null,left>0?' DAYS':' DATE PASSED')); $('#current-date').textContent=new Intl.DateTimeFormat('en-US',{month:'short',day:'numeric',year:'numeric',timeZone:'America/New_York'}).format(new Date()).toUpperCase();$('#copyright-year').textContent=new Date().getFullYear(); }
async function loadFeed(){try{const response=await fetch('./data/news.json',{cache:'no-store'});if(!response.ok)throw new Error(`HTTP ${response.status}`);const data=await response.json(); const incoming=(Array.isArray(data.items)?data.items:[]).filter(x=>x&&typeof x.id==='string'&&typeof x.title==='string'&&safeHttpUrl(x.url)&&x.type!=='official').slice(0,65).map(x=>({...x,type:x.type==='rumor'?'rumor':'coverage',reviewed:false,summary:''}));const ids=new Set(OFFICIAL_STORIES.map(x=>x.id));state.allStories=[...OFFICIAL_STORIES,...incoming.filter(x=>!ids.has(x.id)&&ids.add(x.id))].sort((a,b)=>(Date.parse(b.date)||0)-(Date.parse(a.date)||0)); state.updatedAt=data.updated_at||null;state.coverageLoaded=incoming.length>0;$('#feed-status-text').textContent=incoming.length?'FEED + OFFICIAL SOURCES':'OFFICIAL SOURCE ARCHIVE';$('#feed-updated').textContent=data.updated_at?`Third-party feed refreshed ${dateFormat(data.updated_at)} · headlines are not fact-checked`:'Automatic coverage will appear after the first scheduled update.';render();}catch{state.coverageLoaded=false;$('#feed-status-text').textContent='OFFICIAL STORIES AVAILABLE';$('#feed-updated').textContent='The third-party feed is unavailable; official source stories remain accessible.';render();}}
let deferredInstall=null;
window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();deferredInstall=event;$('#install-text').textContent='Install app';});
function showInstallHelp(){const dlg=$('#install-dialog');if(typeof dlg.showModal==='function')dlg.showModal();else toast('In Safari use Share → Add to Home Screen');}
async function onInstall(){if(deferredInstall){deferredInstall.prompt();try{await deferredInstall.userChoice;}catch{}deferredInstall=null;return;}showInstallHelp();}
function init(){setupCountdown();$('#reader-close').addEventListener('click',closeReader);$('#story-reader').addEventListener('close',()=>document.body.classList.remove('reader-active'));$('#story-reader').addEventListener('click',e=>{if(e.target===$('#story-reader'))closeReader();});$('#hero-open').addEventListener('click',()=>openReader(OFFICIAL_STORIES[0]));$$('[data-filter]').forEach(el=>el.addEventListener('click',()=>setFilter(el.dataset.filter)));$('#hero-save').addEventListener('click',()=>toggleSaved(FEATURED_ID));$('#load-more').addEventListener('click',()=>{state.visible+=6;render();});$('#install-btn').addEventListener('click',onInstall);$('#search-toggle').addEventListener('click',()=>{const bar=$('#search-bar');bar.classList.toggle('hidden');if(!bar.classList.contains('hidden'))$('#news-search').focus();else if(state.query){state.query='';$('#news-search').value='';render();}});$('#news-search').addEventListener('input',event=>{state.query=event.target.value.trim().toLowerCase();state.visible=6;render();});$('#clear-search').addEventListener('click',()=>{$('#news-search').value='';state.query='';render();$('#news-search').focus();});updateSavedUI();render();loadFeed(); if('serviceWorker' in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('./service-worker.js').catch(()=>{});}
window.addEventListener('DOMContentLoaded',init);
