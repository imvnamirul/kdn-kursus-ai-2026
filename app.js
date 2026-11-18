
(function () {
  'use strict';
  const state = {data:null,filter:'Semua',search:'',lastFocus:null};
  const $ = (selector, root=document) => root.querySelector(selector);
  const $$ = (selector, root=document) => Array.from(root.querySelectorAll(selector));
  const txt = value => String(value == null ? '' : value);
  const html = value => txt(value).replace(/[&<>"']/g, c => ({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
  const validUrl = url => /^https:\/\//i.test(txt(url).trim()) || /^http:\/\//i.test(txt(url).trim());
  const arr = value => Array.isArray(value) ? value : [];
  const elText = (selector, value) => { const element=$(selector); if(element)element.textContent=txt(value); };
  const order = values => arr(values).slice().sort((a,b)=>(Number(a.sort)||0)-(Number(b.sort)||0));

  function showToast(message) {
    const toast = $('#toast'); if(!toast)return;
    toast.textContent=message; toast.hidden=false;
    clearTimeout(showToast.timeout);
    showToast.timeout=setTimeout(()=>{toast.hidden=true;},4400);
  }

  function renderSettings(settings) {
    const s=settings||{};
    elText('#heroEyebrow',s.eyebrow);
    elText('#heroTitle',s.title);
    elText('#heroProgramme',s.programme);
    elText('#heroSubtitle',s.subtitle);
    elText('#heroVenue',s.venue);
    elText('#heroHall',s.hall);
    elText('#heroDate',s.date);
    elText('#infoDate',s.date);
    elText('#infoVenue',s.venue);
    elText('#infoParticipants',s.participants);
    elText('#infoDress',s.dress);
    elText('#introLead',s.welcome);
    elText('#organiserName',s.organiser);
    elText('#locationHotel',s.venue);
    elText('#locationHall',s.hall);
    elText('#contactText',s.contact);
    elText('#updatedText',s.updated?'Dikemas kini: '+s.updated:'');
    const dateParts=txt(s.shortDate).trim().split(/\s+/);
    if(dateParts.length>=3) {
      elText('.date-number',dateParts[0]);
      elText('.date-graphic strong',dateParts[1]);
      elText('.date-graphic div span',dateParts[2]);
      elText('.agenda-overline',s.date.toUpperCase());
    }
    if(validUrl(s.mapUrl)) $('#mapButton').href=s.mapUrl;
    else { $('#mapButton').hidden=true; }
    const meta=$('.hero-meta-row > span:first-child'); if(meta)meta.textContent=txt(s.organiser).toUpperCase();
    document.title='Portal Kursus AI | '+txt(s.eyebrow||'KDN');
  }

  function renderObjectives(objectives) {
    const root=$('#objectivesList'), list=order(objectives);
    $('.minor-head span').textContent=String(list.length).padStart(2,'0')+' FOKUS UTAMA';
    root.innerHTML=list.length?list.map((item,index)=>`<div class="objective"><span class="objective-num">${String(index+1).padStart(2,'0')}</span><p>${html(item.text)}</p></div>`).join(''):'<p class="loading-row">Objektif akan dikemas kini.</p>';
  }

  function renderAgenda(agenda) {
    const root=$('#agendaList'),list=order(agenda);
    root.innerHTML=list.length?list.map((item,index)=>`<div class="agenda-row"><span class="agenda-index">${String(index+1).padStart(2,'0')}</span><div class="agenda-info"><h4>${html(item.title)}</h4><p>${html(item.description)}</p></div><div class="agenda-where">${item.time?`<b>${html(item.time)}</b>`:''}${item.place?`<span>${html(item.place)}</span>`:''}</div></div>`).join(''):'<div class="loading-row">Atur cara akan dikemas kini.</div>';
  }

  function initials(name) {
    const parts=txt(name).replace(/\b(prof\.?|madya|ts\.?|dr\.?|bin|binti)\b/ig,'').split(/\s+/).filter(Boolean);
    return parts.slice(0,2).map(x=>x[0].toUpperCase()).join('')||'AI';
  }
  function speakerVisual(person,className) {
    return validUrl(person.imageUrl)?`<img src="${html(person.imageUrl)}" loading="lazy" alt="Potret ${html(person.name)}" onerror="this.style.display='none'">`:`<span class="${className}">${html(initials(person.name))}</span>`;
  }
  function renderSpeakers(speakers) {
    const root=$('#speakersGrid'),list=order(speakers);
    root.innerHTML=list.length?list.map((speaker,index)=>`<article class="speaker-card"><div class="speaker-visual"><span class="speaker-session-tag">SESI ${String(index+1).padStart(2,'0')}</span>${speakerVisual(speaker,'speaker-initial')}</div><div class="speaker-info"><div class="speaker-org">${html(speaker.organisation)}</div><h3>${html(speaker.name)}</h3><p class="speaker-role">${html(speaker.role)}</p><div class="speaker-rule"></div><p class="speaker-topic">${html(speaker.title)}</p></div><button type="button" class="speaker-open" data-speaker="${html(speaker.id)}" aria-label="Lihat profil ${html(speaker.name)}"><span>Lihat Profil & Topik</span><span aria-hidden="true">↗</span></button></article>`).join(''):'<div class="loading-row">Maklumat penceramah akan dikemas kini.</div>';
  }

  function renderResourceFilters(materials) {
    const categories=['Semua',...new Set(order(materials).map(m=>txt(m.category||'Lain-lain')))];
    if(!categories.includes(state.filter)) state.filter='Semua';
    $('#resourceFilters').innerHTML=categories.map(cat=>`<button class="filter-tab${state.filter===cat?' active':''}" data-filter="${html(cat)}" type="button" aria-pressed="${state.filter===cat}">${html(cat)}</button>`).join('');
  }
  function renderResources() {
    const list=order(state.data.materials).filter(item=>(state.filter==='Semua'||txt(item.category||'Lain-lain')===state.filter)&&[item.title,item.description,item.category].join(' ').toLocaleLowerCase().includes(state.search.toLocaleLowerCase()));
    $('#resourceList').innerHTML=list.length?list.map(material=>`<article class="resource-card"><div class="resource-icon" aria-hidden="true">${material.category==='Slaid'?'▣':material.category==='Latihan'?'✦':'▤'}</div><div class="resource-body"><span class="resource-cat">${html(material.category||'Dokumen')}</span><h3>${html(material.title)}</h3><p>${html(material.description)}</p>${validUrl(material.url)?`<a class="resource-link" target="_blank" rel="noopener noreferrer" href="${html(material.url)}">Buka / Muat Turun <span aria-hidden="true">↗</span></a>`:'<span class="resource-unavailable"><i></i> Belum tersedia</span>'}</div></article>`).join(''):'<div class="no-results">Tiada bahan ditemui untuk carian ini.</div>';
  }

  function renderFaqs(faqs) {
    const list=order(faqs);
    $('#faqList').innerHTML=list.length?list.map(item=>`<details class="faq-item"><summary>${html(item.question)}</summary><p>${html(item.answer)}</p></details>`).join(''):'<div class="loading-row">Soalan lazim akan dikemas kini.</div>';
  }

  function renderNotices(notices) {
    const list=order(notices);
    const section=$('#noticeBand');
    if(!section)return;
    section.hidden=list.length===0;
    if(list.length) $('#noticeList').innerHTML=list.map(n=>`<div class="notice-item"><strong>${html(n.title)}</strong><p>${html(n.message)}</p></div>`).join('');
  }

  function render(data) {
    state.data=data||{};
    renderSettings(state.data.settings);
    renderObjectives(state.data.objectives);
    renderAgenda(state.data.agenda);
    renderSpeakers(state.data.speakers);
    renderResourceFilters(state.data.materials);
    renderResources();
    renderFaqs(state.data.faqs);
    renderNotices(state.data.notices);
    if(state.data.cmsWarning)showToast(state.data.cmsWarning);
  }

  function openSpeaker(id) {
    const speaker=arr(state.data?.speakers).find(s=>txt(s.id)===txt(id));
    if(!speaker)return;
    const modal=$('#speakerModal');
    state.lastFocus=document.activeElement;
    $('#modalBody').innerHTML=`<div class="modal-cover"><div class="modal-avatar">${speakerVisual(speaker,'modal-initial')}</div><div class="modal-meta"><span class="modal-tag">${html(speaker.session)}</span><h3 id="modalName">${html(speaker.name)}</h3><p>${html(speaker.role)}<br><strong>${html(speaker.organisation)}</strong></p></div></div><div class="modal-content"><h4>TAJUK PERKONGSIAN</h4><p class="modal-topic">${html(speaker.title)}</p><h4>FOKUS SESI</h4><p class="modal-copy">${html(speaker.abstract||'Maklumat sesi akan dikemas kini.')}</p><h4>PROFIL PENCERAMAH</h4><p class="modal-copy">${html(speaker.bio||'Profil akan dikemas kini.')}</p></div>`;
    modal.hidden=false;modal.setAttribute('aria-hidden','false');document.body.classList.add('modal-open');$('#modalClose').focus();
  }
  function closeSpeaker() {
    const modal=$('#speakerModal');modal.hidden=true;modal.setAttribute('aria-hidden','true');document.body.classList.remove('modal-open');
    if(state.lastFocus&&state.lastFocus.focus)state.lastFocus.focus();
  }

  function setupInteractions() {
    $('#menuToggle').addEventListener('click',()=>{
      const menu=$('#mainNav'),isOpen=menu.classList.toggle('open');
      $('#menuToggle').setAttribute('aria-expanded',String(isOpen));
    });
    $$('#mainNav a').forEach(link=>link.addEventListener('click',()=>{
      $('#mainNav').classList.remove('open');$('#menuToggle').setAttribute('aria-expanded','false');
    }));
    $('#speakersGrid').addEventListener('click',event=>{const button=event.target.closest('[data-speaker]');if(button)openSpeaker(button.dataset.speaker);});
    $('#modalClose').addEventListener('click',closeSpeaker);
    $('#speakerModal').addEventListener('click',event=>{if(event.target.matches('[data-close]'))closeSpeaker();});
    document.addEventListener('keydown',event=>{
      if(event.key==='Escape'&&!$('#speakerModal').hidden)closeSpeaker();
      if(event.key==='Tab'&&!$('#speakerModal').hidden){
        const focusable=$$('#speakerModal button, #speakerModal a[href]').filter(e=>!e.disabled);
        if(focusable.length){const first=focusable[0],last=focusable[focusable.length-1];if(event.shiftKey&&document.activeElement===first){event.preventDefault();last.focus();}else if(!event.shiftKey&&document.activeElement===last){event.preventDefault();first.focus();}}
      }
    });
    $('#resourceFilters').addEventListener('click',event=>{
      const button=event.target.closest('[data-filter]');if(!button)return;
      state.filter=button.dataset.filter;renderResourceFilters(state.data.materials);renderResources();
    });
    $('#resourceSearch').addEventListener('input',event=>{state.search=event.target.value;renderResources();});
    if('IntersectionObserver' in window){
      const sectionIds=['utama','tentang','aturcara','penceramah','bahan','lokasi'];
      const observer=new IntersectionObserver(entries=>{
        entries.forEach(entry=>{if(entry.isIntersecting){$$('.nav-link').forEach(a=>a.classList.toggle('active',a.getAttribute('href')==='#'+entry.target.id));}});
      },{rootMargin:'-27% 0px -58% 0px',threshold:0});
      sectionIds.forEach(id=>{const section=document.getElementById(id);if(section)observer.observe(section);});
    }
  }

  document.addEventListener('DOMContentLoaded',()=>{
    setupInteractions();
    // Content is local to this static website; no server or Google Apps Script needed.
    if (window.PORTAL_DATA) {
      render(window.PORTAL_DATA);
    } else {
      showToast('Kandungan kursus tidak ditemui. Semak fail content.js.');
    }
  });
})();

