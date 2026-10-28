/* The Six Daily · Vanilla JavaScript · no tracking, no accounts, no API keys */
'use strict';

const FEATURED_ID = 'rsg-2026-launch-trailer';
const OFFICIAL_STORIES = [
  {
    id: FEATURED_ID,
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
  const title=create('h3'); const titleLink=create('a',null,item.title); titleLink.href=safeHttpUrl(item.url)||'#'; titleLink.target='_blank'; titleLink.rel='noopener noreferrer'; title.appendChild(titleLink); body.appendChild(title);
  body.appendChild(create('p','article-summary',summarize(item)));
  const source=create('div','source-line'); source.appendChild(create('span',null,'SOURCE /')); source.appendChild(create('span','source-value',item.source||'Unknown publication')); body.appendChild(source);
  const actions=create('div','article-actions'); const link=create('a',null,item.type==='official'?'VIEW ORIGINAL SOURCE':'READ COVERAGE'); link.href=safeHttpUrl(item.url)||'#'; link.target='_blank'; link.rel='noopener noreferrer'; const arrow=create('span',null,'↗'); link.appendChild(arrow); actions.appendChild(link);
  const actionBtns=create('div','card-action-buttons'); const shareBtn=create('button','card-icon-btn','↗'); shareBtn.type='button'; shareBtn.title='Share story'; shareBtn.setAttribute('aria-label',`Share ${item.title}`); shareBtn.addEventListener('click',async()=>{ try { if(navigator.share) await navigator.share({title:item.title,url:item.url}); else if(navigator.clipboard?.writeText){await navigator.clipboard.writeText(item.url);toast('Story link copied');}else toast('Open the source to copy the link'); }catch(e){ if(e.name!=='AbortError')toast('Sharing was unavailable'); } });
  const bookmark=create('button',`card-icon-btn ${saved.has(item.id)?'is-saved':''}`,saved.has(item.id)?'♥':'♡'); bookmark.type='button'; bookmark.setAttribute('aria-label',saved.has(item.id)?`Remove saved story ${item.title}`:`Save story ${item.title}`); bookmark.setAttribute('aria-pressed',String(saved.has(item.id))); bookmark.title='Save for later'; bookmark.addEventListener('click',()=>toggleSaved(item.id)); actionBtns.appendChild(shareBtn); actionBtns.appendChild(bookmark); actions.appendChild(actionBtns);body.appendChild(actions);card.appendChild(art);card.appendChild(body);return card;
}
function matching() { return state.allStories.filter(item=>{ const inFilter=state.filter==='all'||(state.filter==='saved'&&saved.has(item.id))||item.type===state.filter; const text=[item.title,item.source,item.summary||''].join(' ').toLowerCase();return inFilter&&(!state.query||text.includes(state.query)); }); }
function render() { const result=matching(); const grid=$('#story-grid'); grid.replaceChildren(); if(!result.length){const empty=create('div','empty-state');empty.appendChild(create('strong',null,state.filter==='saved'?'NOTHING SAVED. YET.':'NO STORIES FOUND.'));empty.appendChild(create('p',null,state.filter==='saved'?'Tap the heart on a story to keep it here for later.':'Try another search or category. New third-party headlines appear when the updater has run successfully.'));if(state.filter!=='all'||state.query){const reset=create('button',null,'Show all stories');reset.addEventListener('click',()=>{state.query='';$('#news-search').value='';setFilter('all');});empty.appendChild(reset);}grid.appendChild(empty);} else result.slice(0,state.visible).forEach((item,i)=>grid.appendChild(makeStoryCard(item,i))); $('#story-count').textContent=`${result.length} ${result.length===1?'STORY':'STORIES'}`; $('#load-more').hidden=result.length<=state.visible; updateSavedUI(); }
function setFilter(filter) { state.filter=filter;state.visible=6;$$('[data-filter]').forEach(el=>{const active=el.dataset.filter===filter;el.classList.toggle('active',active);if(el.classList.contains('nav-link')||el.classList.contains('mobile-tab')) el.setAttribute('aria-current',active?'page':'false');});render(); if(window.innerWidth<761&&filter!=='all')$('#updates').scrollIntoView({behavior:'smooth',block:'start'}); }
function setupCountdown(){ const target=Date.parse('2026-11-19T00:00:00-05:00'); const left=Math.ceil((target-Date.now())/86400000);$('#days-left').replaceChildren(document.createTextNode(left>0?String(left):'—'),create('span',null,left>0?' DAYS':' DATE PASSED')); $('#current-date').textContent=new Intl.DateTimeFormat('en-US',{month:'short',day:'numeric',year:'numeric',timeZone:'America/New_York'}).format(new Date()).toUpperCase();$('#copyright-year').textContent=new Date().getFullYear(); }
async function loadFeed(){try{const response=await fetch('./data/news.json',{cache:'no-store'});if(!response.ok)throw new Error(`HTTP ${response.status}`);const data=await response.json(); const incoming=(Array.isArray(data.items)?data.items:[]).filter(x=>x&&typeof x.id==='string'&&typeof x.title==='string'&&safeHttpUrl(x.url)&&x.type!=='official').slice(0,65).map(x=>({...x,type:x.type==='rumor'?'rumor':'coverage',reviewed:false,summary:''}));const ids=new Set(OFFICIAL_STORIES.map(x=>x.id));state.allStories=[...OFFICIAL_STORIES,...incoming.filter(x=>!ids.has(x.id)&&ids.add(x.id))].sort((a,b)=>(Date.parse(b.date)||0)-(Date.parse(a.date)||0)); state.updatedAt=data.updated_at||null;state.coverageLoaded=incoming.length>0;$('#feed-status-text').textContent=incoming.length?'FEED + OFFICIAL SOURCES':'OFFICIAL SOURCE ARCHIVE';$('#feed-updated').textContent=data.updated_at?`Third-party feed refreshed ${dateFormat(data.updated_at)} · headlines are not fact-checked`:'Automatic coverage will appear after the first scheduled update.';render();}catch{state.coverageLoaded=false;$('#feed-status-text').textContent='OFFICIAL STORIES AVAILABLE';$('#feed-updated').textContent='The third-party feed is unavailable; official source stories remain accessible.';render();}}
let deferredInstall=null;
window.addEventListener('beforeinstallprompt',event=>{event.preventDefault();deferredInstall=event;$('#install-text').textContent='Install app';});
function showInstallHelp(){const dlg=$('#install-dialog');if(typeof dlg.showModal==='function')dlg.showModal();else toast('In Safari use Share → Add to Home Screen');}
async function onInstall(){if(deferredInstall){deferredInstall.prompt();try{await deferredInstall.userChoice;}catch{}deferredInstall=null;return;}showInstallHelp();}
function init(){setupCountdown();$$('[data-filter]').forEach(el=>el.addEventListener('click',()=>setFilter(el.dataset.filter)));$('#hero-save').addEventListener('click',()=>toggleSaved(FEATURED_ID));$('#load-more').addEventListener('click',()=>{state.visible+=6;render();});$('#install-btn').addEventListener('click',onInstall);$('#search-toggle').addEventListener('click',()=>{const bar=$('#search-bar');bar.classList.toggle('hidden');if(!bar.classList.contains('hidden'))$('#news-search').focus();else if(state.query){state.query='';$('#news-search').value='';render();}});$('#news-search').addEventListener('input',event=>{state.query=event.target.value.trim().toLowerCase();state.visible=6;render();});$('#clear-search').addEventListener('click',()=>{$('#news-search').value='';state.query='';render();$('#news-search').focus();});updateSavedUI();render();loadFeed(); if('serviceWorker' in navigator&&location.protocol.startsWith('http'))navigator.serviceWorker.register('./service-worker.js').catch(()=>{});}
window.addEventListener('DOMContentLoaded',init);
