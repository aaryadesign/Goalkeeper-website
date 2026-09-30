/* Goalkeeper website: everything that moves. No libraries.
   Motion follows three rules: nothing teleports (it rises, morphs or slides from where it was), one easing for arrivals
   (cubic-bezier(.16,1,.3,1)), and the rare moments get the delight, the frequent ones stay quiet. */
(() => {
  const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  const EASE = 'cubic-bezier(.16,1,.3,1)', OUT = 'cubic-bezier(.4,0,1,1)';
  document.documentElement.classList.add('js');
  /* every emoji gets the emoji font, so every phone shows the same set */
  const emo = (s) => s.replace(/(\p{Extended_Pictographic}️?(?:‍\p{Extended_Pictographic}️?)*)/gu, '<span class="e">$1</span>');
  const seen = (el, f, th = .25) => new IntersectionObserver((es) => es.forEach((e) => f(e.isIntersecting)), { threshold: th }).observe(el);
  const once = (el, f, th = .35) => { const io = new IntersectionObserver((es) => { if (es.some((e) => e.isIntersecting)) { io.disconnect(); f(); } }, { threshold: th }); io.observe(el); };

  /* arrivals */
  const ro = new IntersectionObserver((es) => es.forEach((e) => { if (e.isIntersecting) { e.target.classList.add('in'); ro.unobserve(e.target); } }), { threshold: .12, rootMargin: '0px 0px -6% 0px' });
  const reveal = (root = document) => $$('[data-r]', root).forEach((el) => ro.observe(el));

  /* an emoji changes like a face does: it shrinks away and pops back as the new one */
  function swap(el, s) {
    if (el.textContent === s) return;
    if (RM) { el.textContent = s; return; }
    el.getAnimations().forEach((a) => a.cancel());
    el.animate([{ transform: 'none', opacity: 1 }, { transform: 'scale(.3) rotate(-18deg)', opacity: 0 }], { duration: 140, easing: OUT }).onfinish = () => {
      el.textContent = s;
      el.animate([{ transform: 'scale(.3) rotate(18deg)', opacity: 0 }, { transform: 'scale(1.16) rotate(-4deg)', opacity: 1, offset: .55 }, { transform: 'none', opacity: 1 }], { duration: 520, easing: EASE });
    };
  }
  /* a small burst for the moments worth it */
  function burst(from, set) {
    if (RM) return;
    const b = from.getBoundingClientRect(), x0 = b.left + b.width / 2, y0 = b.top + b.height / 2;
    for (let i = 0; i < 14; i++) {
      const s = document.createElement('span'); s.className = 'burst e'; s.textContent = set[i % set.length]; document.body.appendChild(s);
      const a = -Math.PI / 2 + (Math.random() - .5) * 2.2, v = 90 + Math.random() * 120, dx = Math.cos(a) * v, dy = Math.sin(a) * v, r = (Math.random() - .5) * 120;
      s.animate([{ transform: `translate(${x0 - 13}px,${y0 - 13}px) scale(.3)`, opacity: 0 }, { transform: `translate(${x0 - 13 + dx * .6}px,${y0 - 13 + dy * .6}px) scale(1.1) rotate(${r * .5}deg)`, opacity: 1, offset: .35 },
        { transform: `translate(${x0 - 13 + dx}px,${y0 - 13 + dy + 90}px) scale(.8) rotate(${r}deg)`, opacity: 0 }], { duration: 1100 + Math.random() * 400, easing: 'cubic-bezier(.2,.6,.4,1)' }).onfinish = () => s.remove();
    }
  }

  /* nav: frosted once you scroll, dark once the night starts */
  const nav = $('#nav'), nz = $('#nightzone');
  const onScroll = () => { nav.classList.toggle('scrolled', scrollY > 8); nav.classList.toggle('dark', nz.getBoundingClientRect().top < 40); };
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  /* ---------- hero: you say it, Goalkeeper sorts it ---------- */
  // [emoji, title, detail, colour, action, is it only a label]
  const EX = [
    { chip: ['🏋️', 'A busy day'], said: 'Gym at 7, then call Mom. Dentist tomorrow at 4:30.',
      cards: [['🏋️', 'Gym', 'Today · 7:00 PM', 'fit', 'Workout', 1], ['📞', 'Call Mom', 'Today · after the gym', 'fam', '📞 Call'], ['🦷', 'Dentist', 'Tomorrow · 4:30 PM', 'meet', '🧭 Directions']],
      reply: 'Got it. Three things, all set.' },
    { chip: ['🛒', 'On the way home'], said: 'Text Riya to bring my charger, and get milk, eggs and bread on the way back.',
      cards: [['💬', 'Text Riya', '“Hey, can you bring my charger?”', 'msg', '📨 Send'], ['🛒', 'Groceries', 'Milk, eggs, bread', 'err', '3 to tick', 1]],
      reply: 'The text is written. Tap send when you’re ready.' },
    { chip: ['💼', 'Work'], said: 'Standup at 10, design review at 2 for an hour, and email Karan about the invoice.',
      cards: [['🧍', 'Standup', '10:00 AM · on Meet', 'meet', '🎥 Join'], ['🔍', 'Design review', '2:00 – 3:00 PM', 'meet', 'Meeting', 1], ['✉️', 'Email Karan', '“Hi Karan, has the invoice gone through?”', 'msg', '📨 Send']],
      reply: 'Two meetings, and Karan’s email is ready.' },
    { chip: ['🙋', 'Follow up'], said: 'Ask Akash to pay the ₹1,200 electricity bill, and remind me if he hasn’t by Friday.',
      cards: [['💬', 'Text Akash', '“Could you pay the electricity bill? It’s ₹1,200.”', 'msg', '📨 Send'], ['🙋', 'Waiting on Akash', 'I’ll check on Friday, 10 AM', 'fam', 'Follow-up', 1]],
      reply: 'Friday morning, I’ll ask if he’s paid.' },
  ];
  const stage = $('#stage'), you = $('#you'), face = $('#face'), st = $('#st'), cards = $('#cards'), reply = $('#reply'), exEl = $('#ex');
  exEl.innerHTML = EX.map((x) => `<button type="button" role="tab" class="x">${emo(x.chip[0])}<span>${x.chip[1]}</span><i></i></button>`).join('');
  const chips = $$('button', exEl);
  const card = (c) => `<div class="tk c-${c[3]}"><span class="ic">${emo(c[0])}</span><span class="tx"><b>${c[1]}</b><small>${c[2]}</small></span>${c[4] ? `<span class="act${c[5] ? ' tag' : ''}">${emo(c[4])}</span>` : ''}</div>`;
  const mood = (e, label, m) => { swap(face, e); st.innerHTML = label + (m === 'think' ? '<span class="dots"><i></i><i></i><i></i></span>' : ''); stage.dataset.m = m; };
  let cur = -1, pinned = false, T = [], heroVis = true, waiting = false;
  const at = (ms, f) => T.push(setTimeout(f, ms));
  const clear = () => { T.forEach(clearTimeout); T = []; };
  function tabs(k, dur) {
    chips.forEach((b, j) => {
      b.classList.toggle('on', j === k); b.setAttribute('aria-selected', j === k);
      const i = $('i', b); i.getAnimations().forEach((a) => a.cancel());
      if (j === k && dur && !RM) i.animate([{ width: '0%' }, { width: '100%' }], { duration: dur, easing: 'linear', fill: 'forwards' });
    });
  }
  function play(k) {
    clear();
    if (cur >= 0 && !RM) { stage.classList.add('out'); at(230, () => { stage.classList.remove('out'); run(k); }); tabs(k, 0); } else run(k);
  }
  function run(k) {
    cur = k; const x = EX[k];
    you.innerHTML = x.said.split(/(?<= )/).map((w) => `<span class="w">${w}</span>`).join('');
    cards.innerHTML = x.cards.map(card).join('');
    reply.textContent = x.reply; reply.classList.remove('in');
    const ws = $$('.w', you), cs = $$('.tk', cards);
    if (RM) { mood('😄', 'Got it', 'done'); cs.forEach((c) => c.classList.add('in')); reply.classList.add('in'); tabs(k, 0); return; }
    mood('👂', 'Listening', 'listen');
    you.animate([{ opacity: 0, transform: 'scale(.94)', transformOrigin: '100% 100%' }, { opacity: 1, transform: 'none', transformOrigin: '100% 100%' }], { duration: 500, easing: EASE });
    ws.forEach((w, j) => w.animate([{ opacity: 0, filter: 'blur(6px)', transform: 'translateY(6px)' }, { opacity: 1, filter: 'blur(0)', transform: 'none' }], { duration: 420, delay: 140 + j * 85, easing: EASE, fill: 'backwards' }));
    const tEnd = 140 + ws.length * 85 + 450;
    at(tEnd, () => mood('🤔', 'Thinking', 'think'));
    at(tEnd + 900, () => mood('⚡', 'On it', 'work'));
    cs.forEach((c, j) => at(tEnd + 1000 + j * 380, () => { c.classList.add('in'); hop(x.cards[j][0]); }));
    const tDone = tEnd + 1000 + cs.length * 380 + 250;
    at(tDone, () => { mood('😄', 'Got it', 'done'); reply.classList.add('in'); });
    const hold = tDone + 4400;
    tabs(k, pinned ? 0 : hold);
    if (!pinned) at(hold, () => { if (heroVis) play((cur + 1) % EX.length); else waiting = true; });
  }
  let first = 0;
  exEl.addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; clearTimeout(first); pinned = true; play(chips.indexOf(b)); });
  seen(stage, (v) => { heroVis = v; if (v && waiting) { waiting = false; play((cur + 1) % EX.length); } }, .2);
  /* stickers: the things people say, floating around the headline. They lean toward the pointer and hop when their card lands. */
  // [emoji, x, y, tilt, size, mobile x, mobile y, flags: dk = hide on narrow desktops, dm = hide on phones]
  const STK = [['🏋️', '9%', 120, -8, 66, '3%', 22, ''], ['💬', '3%', 290, 7, 56, '', 0, 'dm'], ['🛒', '15%', 400, -5, 60, '', 0, 'dk dm'], ['🧍', '13%', 236, 6, 50, '', 0, 'dk dm'],
    ['🦷', '85%', 100, 8, 60, '85%', 24, ''], ['📞', '92%', 262, -7, 64, '', 0, 'dm'], ['✉️', '80%', 384, 5, 54, '', 0, 'dk dm'], ['🙋', '83%', 226, -4, 50, '', 0, 'dk dm']];
  const stk = $('#stk');
  stk.innerHTML = STK.map(([e, x, y, r, z, mx, my, f], i) => `<span class="s ${f}" style="--x:${x};--y:${y}px;--mx:${mx};--my:${my}px;--d:${i}" data-e="${e}" data-k="${.4 + (i % 4) * .25}"><span class="b" style="--r:${r}deg;--z:${z}px;--t:${6 + (i % 3)}s;--dl:${-i * .9}s">${emo(e)}</span></span>`).join('');
  const stks = $$('.s', stk);
  if (!RM) {
    stks.forEach((s, i) => s.animate([{ opacity: 0, transform: 'scale(.4)' }, { opacity: 1, transform: 'none' }], { duration: 800, delay: 500 + i * 70, easing: 'cubic-bezier(.34,1.56,.64,1)', fill: 'backwards' }));
    const hero = $('.hero');
    hero.addEventListener('pointermove', (e) => {
      if (e.pointerType !== 'mouse') return;
      const b = hero.getBoundingClientRect(), mx = (e.clientX - b.left) / b.width - .5, my = (e.clientY - b.top) / b.height - .5;
      stks.forEach((s) => { const k = +s.dataset.k; s.style.setProperty('--px', (mx * 26 * k).toFixed(1) + 'px'); s.style.setProperty('--py', (my * 20 * k).toFixed(1) + 'px'); });
    });
    hero.addEventListener('pointerleave', () => stks.forEach((s) => { s.style.removeProperty('--px'); s.style.removeProperty('--py'); }));
  }
  const hop = (e) => { const s = stks.find((x) => x.dataset.e === e); if (s && !RM) $('.e', s).animate([{ transform: 'none' }, { transform: 'translateY(-14px) scale(1.18) rotate(-8deg)', offset: .4 }, { transform: 'none' }], { duration: 650, easing: EASE }); };
  mood('🙂', 'Ready', 'idle');
  first = setTimeout(() => play(0), RM ? 0 : 900);

  /* ---------- small things ---------- */
  const SMALL = [
    ['⏰', 'meet', 'Meeting in five?', 'Join is already on your home screen.'],
    ['💬', 'msg', 'Running late?', 'It writes the text. You tap send.'],
    ['🛒', 'err', 'Out of milk again?', 'Say “add milk to groceries”. It’s on the list.'],
    ['🙋', 'fam', 'Waiting on someone?', 'It checks back, so you don’t have to.'],
    ['🧠', 'fit', 'Where did you keep it?', '“The passport’s in the blue folder.” Ask it later.'],
    ['🍱', 'err', 'Hungry?', 'Swiggy opens with your usual in the cart. You pay.'],
  ];
  $('#small').innerHTML = SMALL.map(([e, c, q, a], i) => `<article class="sc c-${c}" data-r style="--d:${i % 3}"><span class="ic">${emo(e)}</span><h3>${q}</h3><p>${a}</p></article>`).join('');

  /* ---------- the widget: a day on a home screen ---------- */
  const ITEMS = [
    ['🧍', 'Standup', '10:00 AM', 'meet', 10, .25], ['🦷', 'Dentist', '1:30 PM', 'meet', 13.5, 1], ['💬', 'Text Riya', 'Charger', 'msg'],
    ['🛒', 'Groceries', '3 things', 'err'], ['🏋️', 'Gym', '7:00 PM', 'fit', 19, 1], ['📞', 'Call Mom', '8:30 PM', 'fam', 20.5, .3],
  ];
  const TOMORROW = [['🎓', 'Physics lecture', '9:00 AM', 'meet'], ['🛒', 'Groceries', 'Moved', 'err'], ['🧾', 'Electricity bill', 'Due 10th', 'err']];
  // k: wallpaper · top line ({t} ticks) · title · detail · button [emoji, label, colour, what it says, short label] · done items
  const TIMES = [
    { k: 'dawn', e: '🌅', label: '8:00 AM', clock: '8:00', now: 8, wx: '🌤️ 24°', top: '🌅 Tue 30 Sep · 6 things', title: '🧍 Standup at 10', sub: 'Then 🦷 Dentist at 1:30',
      btn: ['🎙️', 'Talk', 'ink', '🎙️ Listening…'], done: [], one: ['🌅', '6 things today', 'First, 🧍 Standup at 10'], sq: ['🌅 Tue 30 Sep', '🧍', 'Standup', '10:00 AM'] },
    { k: 'day', e: '⏰', label: '9:48 AM', clock: '9:48', now: 9.8, wx: '☀️ 27°', tick: 720, top: '⏰ In {t} · 10:00 AM', title: '🧍 Standup', sub: 'Design team · on Meet',
      btn: ['🎥', 'Join', 'meet', '🎥 Opening Meet…'], done: [], one: ['🧍', 'Standup', 'In {t}'], sq: ['⏰ In {t}', '🧍', 'Standup', '10:00 AM · Meet'] },
    { k: 'dusk', e: '🏋️', label: '6:45 PM', clock: '6:45', now: 18.75, wx: '⛅ 29°', tick: 900, top: '⏰ In {t} · 7:00 PM', title: '🏋️ Gym', sub: 'Then 📞 Call Mom at 8:30',
      btn: ['✅', 'Done', 'fit', '✅ Gym, done'], done: [0, 1, 2], one: ['🏋️', 'Gym', 'In {t}'], sq: ['⏰ In {t}', '🏋️', 'Gym', '7:00 PM'] },
    { k: 'eve', e: '🌆', label: '9:30 PM', clock: '9:30', now: 21.5, wx: '🌙 25°', top: '🌆 Tuesday evening', title: '📋 5 done, 1 left', sub: '🛒 Groceries can move to tomorrow',
      btn: ['🌙', 'Close the day', 'ink', null, 'Close'], done: [0, 1, 2, 4, 5], one: ['🌆', '5 done, 1 left', 'Time to close the day'], sq: ['🌆 Evening', '📋', '5 done', '1 left'], dark: 1 },
    { k: 'night', e: '🌙', label: '11:00 PM', clock: '11:00', now: 23, wx: '🌙 22°', top: '🌙 Day closed', title: '🗓️ Tomorrow · 3 things', sub: 'First up, 🎓 Physics at 9',
      btn: ['🎙️', 'Talk', 'ink', '🎙️ Listening…'], done: [], tomorrow: 1, one: ['🌙', 'Day closed', 'Tomorrow, 🎓 Physics at 9'], sq: ['🌙 Day closed', '🗓️', 'Tomorrow', '3 things'], dark: 1, wdark: 1 },
  ];
  const SIZES = [['4×1', 4, 1], ['2×2', 2, 2], ['4×2', 4, 2], ['4×4', 4, 4]];
  const APPS = [['gcal', 'Calendar'], ['gmail', 'Gmail'], ['whatsapp', 'WhatsApp'], ['maps', 'Maps'], ['swiggy', 'Swiggy'], ['uber', 'Uber'], ['phonepe', 'PhonePe'], ['slack', 'Slack'], ['zepto', 'Zepto'], ['strava', 'Strava'], ['notion', 'Notion'], ['meet', 'Meet']];
  const phone = $('#phone'), home = $('#home'), toastEl = $('#ptoast');
  let ti = 0, si = 2, left = 0, lastNow = 8, auto = !RM, dir = 1;
  const donePer = TIMES.map((t) => new Set(t.done));
  home.innerHTML = `<div class="wd" id="wd"></div>` + APPS.map(([k, n]) => `<div class="app"><img src="assets/brands/${k}.png" alt="" width="50" height="50" loading="lazy"><span>${n}</span></div>`).join('');
  const wd = $('#wd'), apps = $$('.app', home);
  const GAP = 8, CW = 62, RH = 80;
  const put = (el, c, r, w, h) => Object.assign(el.style, { left: c * (CW + GAP) + 'px', top: r * (RH + GAP) + 'px', width: w * CW + (w - 1) * GAP + 'px', height: h * RH + (h - 1) * GAP + 'px' });
  function layout() {
    const [, w, h] = SIZES[si], taken = new Set();
    for (let r = 0; r < h; r++) for (let c = 0; c < w; c++) taken.add(r * 4 + c);
    put(wd, 0, 0, w, h);
    let cell = 0;
    apps.forEach((a) => { while (taken.has(cell)) cell++; const r = cell >> 2; put(a, cell % 4, r, 1, 1); a.style.opacity = r > 4 ? 0 : 1; cell++; });
  }
  const mmss = (s) => `${Math.floor(s / 60)}:${String(s % 60).padStart(2, '0')}`;
  const tk = (s) => emo(s).replace('{t}', `<b class="tick">${mmss(left)}</b>`);
  const pct = (h) => Math.max(0, Math.min(100, (h - 8) / 15 * 100));
  const strip = (T, labels) => `<div class="strip${labels ? ' top' : ''}"><div class="bar"><i class="past" style="width:${pct(lastNow)}%"></i>${ITEMS.filter((x) => x[4]).map((x) => `<i class="blk c-${x[3]}" style="left:${pct(x[4])}%;width:${x[5] / 15 * 100}%"></i>`).join('')}<i class="now" style="left:${pct(lastNow)}%"></i></div>${labels ? '<u><span>8 AM</span><span>3 PM</span><span>11 PM</span></u>' : ''}</div>`;
  const btn = (T, cls = '', short) => `<button type="button" class="wb c-${T.btn[2]} ${cls}" data-a="btn">${emo(T.btn[0])}${short && T.btn[4] ? T.btn[4] : T.btn[1]}</button>`;
  const mic = (T) => (T.btn[1] === 'Talk' ? '' : `<button type="button" class="mic" data-a="talk" aria-label="Talk">${emo('🎙️')}</button>`);
  function body(T) {
    const size = SIZES[si][0];
    if (size === '4×1') return `<div class="wc one">${emo(T.one[0])}<div class="o-t"><b>${T.one[1]}</b><span>${tk(T.one[2])}</span></div>${btn(T, '', 1)}</div>`;
    if (size === '2×2') return `<div class="wc sq"><div class="w-top">${tk(T.sq[0])}</div><div class="sq-e">${emo(T.sq[1])}</div><div class="sq-t">${T.sq[2]}</div><div class="sq-s">${tk(T.sq[3])}</div>${btn(T, '', 1)}</div>`;
    const head = `<div class="w-top">${tk(T.top)}${mic(T)}</div><div class="w-title">${emo(T.title)}</div>`;
    if (size === '4×2') return `<div class="wc">${head}<div class="w-sub">${emo(T.sub)}</div>${strip(T)}<div class="w-btns">${btn(T)}</div></div>`;
    const rows = T.tomorrow ? TOMORROW.map((x, i) => `<button type="button" class="li" data-i="${i}">${emo(x[0])}<span>${x[1]}</span><small>${x[2]}</small></button>`).join('')
      : ITEMS.map((x, i) => { const d = donePer[ti].has(i); return `<button type="button" class="li${d ? ' done' : ''}" data-i="${i}">${emo(d ? '✅' : x[0])}<span>${x[1]}</span><small>${x[2]}</small></button>`; }).join('');
    return `<div class="wc">${head}${strip(T, 1)}<div class="list">${rows}</div><div class="w-btns" style="margin-top:auto">${btn(T)}</div></div>`;
  }
  let wOld = null;
  function paint(animate) {
    const T = TIMES[ti], n = document.createElement('div');
    n.className = 'wcw'; n.innerHTML = body(T); wd.appendChild(n);
    if (wOld && animate && !RM) {
      const o = wOld;
      o.animate([{ opacity: 1 }, { opacity: 0, filter: 'blur(4px)', transform: `translateY(${-6 * dir}px)` }], { duration: 180, easing: OUT, fill: 'forwards' }).onfinish = () => o.remove();
      n.animate([{ opacity: 0, filter: 'blur(6px)', transform: `translateY(${8 * dir}px)` }, { opacity: 1, filter: 'blur(0)', transform: 'none' }], { duration: 460, delay: 110, easing: EASE, fill: 'backwards' });
    } else if (wOld) wOld.remove();
    wOld = n;
    // the day strip's "now" slides from where it was to where it is
    requestAnimationFrame(() => requestAnimationFrame(() => { $$('.now', n).forEach((e) => (e.style.left = pct(T.now) + '%')); $$('.past', n).forEach((e) => (e.style.width = pct(T.now) + '%')); lastNow = T.now; }));
  }
  function setTime(i, animate = true) {
    dir = i >= ti ? 1 : -1; ti = i; const T = TIMES[i]; left = T.tick || 0;
    $$('.walls i').forEach((w) => w.classList.toggle('on', w.dataset.w === T.k));
    phone.classList.toggle('dark', !!T.dark); wd.classList.toggle('dark', !!T.wdark);
    $('#clock').textContent = T.clock;
    $('#glance').innerHTML = emo(`Tue, 30 Sep · ${T.wx}`);
    setT(i, animate); paint(animate);
  }
  function setSize(i) { si = i; setS(i); layout(); paint(true); }
  function seg(el, items, pick) {
    el.innerHTML = '<span class="thumb"></span>' + items.map((h) => `<button type="button" aria-pressed="false">${h}</button>`).join('');
    const th = $('.thumb', el), bs = $$('button', el);
    bs.forEach((b, i) => b.addEventListener('click', () => { auto = false; pick(i); }));
    let k = 0;
    const set = (i, anim = true) => {
      k = i; bs.forEach((b, j) => { b.classList.toggle('on', j === i); b.setAttribute('aria-pressed', j === i); });
      th.style.transition = anim && !RM ? '' : 'none'; th.style.left = bs[i].offsetLeft + 'px'; th.style.width = bs[i].offsetWidth + 'px';
      const b = bs[i]; if (el.scrollWidth > el.clientWidth) el.scrollTo({ left: b.offsetLeft - (el.clientWidth - b.offsetWidth) / 2, behavior: anim && !RM ? 'smooth' : 'auto' });
    };
    const redo = () => set(k, false);
    addEventListener('resize', redo); document.fonts && document.fonts.ready.then(redo);
    return set;
  }
  const setT = seg($('#times'), TIMES.map((t) => `${emo(t.e)}${t.label}`), (i) => setTime(i));
  const setS = seg($('#sizes'), SIZES.map(([n, c, r]) => `<i class="gl" style="--c:${c}">${'<u></u>'.repeat(c * r)}</i>${n}`), setSize);
  let tt = 0;
  function toast(s) { toastEl.innerHTML = emo(s); toastEl.classList.add('on'); clearTimeout(tt); tt = setTimeout(() => toastEl.classList.remove('on'), 1700); }
  wd.addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return; auto = false;
    const T = TIMES[ti];
    if (b.dataset.a === 'talk') return toast('🎙️ Listening…');
    if (b.dataset.a === 'btn') {
      if (T.k === 'eve') { toast('🌙 Closing the day…'); setTimeout(() => setTime(4), 900); return; }
      toast(T.btn[3]); if (T.k === 'dusk') donePer[ti].add(4);
      return;
    }
    if (b.classList.contains('li') && !T.tomorrow) {
      const i = +b.dataset.i, d = !donePer[ti].has(i); d ? donePer[ti].add(i) : donePer[ti].delete(i);
      b.classList.toggle('done', d); swap($('.e', b), d ? '✅' : ITEMS[i][0]);
    }
  });
  phone.addEventListener('pointerdown', (e) => { if (e.isTrusted) auto = false; });
  layout(); setS(si, false); setTime(0, false);
  let wVis = false;
  seen(phone, (v) => (wVis = v), .4);
  setInterval(() => {
    if (!left || !wVis) return; left--;
    $$('.tick', wd).forEach((e) => (e.textContent = mmss(left)));
  }, 1000);
  setInterval(() => { if (auto && wVis && !document.hidden) setTime((ti + 1) % TIMES.length); }, 4200);

  /* ---------- more than a list ---------- */
  const runs = $('#runs');
  // 41 runs, three a week, then race day
  runs.innerHTML = Array.from({ length: 42 }, (_, i) => (i === 41 ? `<i class="fin">${emo('🏁')}</i>` : `<i class="${i < 17 ? 'd' : i === 17 ? 't' : ''}"></i>`)).join('');
  once(runs, () => { if (!RM) $$('i.d', runs).forEach((d, i) => d.animate([{ transform: 'scale(0)' }, { transform: 'scale(1.25)', offset: .6 }, { transform: 'none' }], { duration: 500, delay: i * 40, easing: EASE, fill: 'backwards' })); });
  const SPEND = [['🍜', 'Food', 7180, 'err'], ['🛒', 'Groceries', 4260, 'fit'], ['🚕', 'Travel', 2940, 'meet'], ['📺', 'Subscriptions', 1149, 'msg']];
  const inr = (v) => '₹' + Math.round(v).toLocaleString('en-IN');
  $('#bars2').innerHTML = SPEND.map(([e, n, v, c]) => `<div class="b2 c-${c}">${emo(e)}<div class="tr" title="${n}"><i data-w="${v / 7180 * 100}"></i></div><small>${inr(v)}</small></div>`).join('');
  const spent = $('#spent');
  once(spent, () => {
    $$('.b2 .tr i').forEach((b, i) => setTimeout(() => (b.style.width = b.dataset.w + '%'), RM ? 0 : 200 + i * 90));
    if (RM) return;
    const to = +spent.dataset.to, t0 = performance.now();
    (function f(t) { const k = Math.min(1, (t - t0) / 1100); spent.textContent = inr(to * (1 - Math.pow(1 - k, 3))); if (k < 1) requestAnimationFrame(f); })(t0);
  });
  const notif = $('#notif'), nP = $('p', notif), nB = $('.nb', notif), n0 = [nP.innerHTML, nB.innerHTML];
  notif.addEventListener('click', (e) => {
    const b = e.target.closest('button'); if (!b) return;
    if (b.dataset.a === 'undo') { nP.innerHTML = n0[0]; nB.innerHTML = n0[1]; return; }
    nP.innerHTML = b.dataset.a === 'did' ? emo('🙌 Closed. Karan came through.') : emo('👉 The nudge is written. WhatsApp opens for you to send it.');
    nB.innerHTML = `<button type="button" data-a="undo">${emo('↩️')}Undo</button>`;
    nP.animate([{ opacity: 0, transform: 'translateY(6px)' }, { opacity: 1, transform: 'none' }], { duration: 420, easing: EASE });
    if (b.dataset.a === 'did') burst(b, ['🙌', '🎉', '✨']);
  });
  const CLOSE = [
    ['📋', 'Today', '5 things done', null, '✅ 5 of 6'],
    ['🧩', 'What’s left', '🛒 Groceries', ['➡️', 'Tomorrow'], '➡️ Tomorrow'],
    ['🕰️', 'Waiting on', 'Akash · electricity bill', ['👉', 'Nudge'], '👉 Written'],
    ['💭', 'On your mind', 'Book the car service', null, '🧠 Kept'],
  ];
  const close = $('#close');
  close.innerHTML = CLOSE.map(([e, k, t, b, ok], i) => `<li data-i="${i}">${emo(e)}<div class="tx"><small>${k}</small>${emo(t)}</div>${b ? `<button type="button">${emo(b[0])}${b[1]}</button>` : `<span class="ok">${emo(ok)}</span>`}</li>`).join('')
    + `<li class="last hide">${emo('😴')}<div class="tx"><small style="color:rgba(255,255,255,.55)">Day closed</small>Nothing needs you tonight.</div></li>`;
  const last = $('li.last', close);
  let closedBy = 0;
  function settle(li) {
    const b = $('button', li); if (!b) return;
    const s = document.createElement('span'); s.className = 'ok'; s.innerHTML = emo(CLOSE[+li.dataset.i][4]);
    b.replaceWith(s); swap($(':scope > .e', li), '✅');
    if (!RM) s.animate([{ opacity: 0, transform: 'scale(.8)' }, { opacity: 1, transform: 'none' }], { duration: 420, easing: EASE });
    if (++closedBy === 2) setTimeout(() => last.classList.remove('hide'), 350);
  }
  close.addEventListener('click', (e) => { const b = e.target.closest('button'); if (b) { autoClose = false; settle(b.closest('li')); } });
  let autoClose = true;
  once(close, () => { if (RM) return; setTimeout(() => autoClose && settle(close.children[1]), 1800); setTimeout(() => autoClose && close.children[2].querySelector('button') && settle(close.children[2]), 3200); }, .6);

  /* ---------- your apps ---------- */
  const BR = ['gcal', 'gmail', 'whatsapp', 'maps', 'swiggy', 'zomato', 'uber', 'phonepe', 'gpay', 'paytm', 'slack', 'teams', 'meet', 'outlook', 'notion', 'figma',
    'blinkit', 'zepto', 'instamart', 'amazon', 'flipkart', 'myntra', 'netflix', 'strava', 'garmin', 'fit', 'healthconnect', 'indigo', 'airindia', 'airtel', 'eatsure'];
  const row = (l) => { const h = l.map((k) => `<img src="assets/brands/${k}.png" alt="" width="68" height="68" loading="lazy">`).join(''); return h + h; };
  $('#m1').innerHTML = row(BR.slice(0, 16)); $('#m2').innerHTML = row(BR.slice(16));
  const HAND = [['🍱', 'Order my usual biryani', 'swiggy', 'Swiggy, with it in the cart'], ['🚕', 'Uber to the airport', 'uber', 'Uber, drop already set'], ['🧭', 'Directions to Phoenix Mall', 'maps', 'Maps, route ready']];
  $('#hand').innerHTML = HAND.map(([e, q, k, to], i) => `<div class="hd" data-r style="--d:${i}">${emo(e)}<p>“${q}”</p><span class="to">→ <img src="assets/brands/${k}.png" alt="" width="20" height="20" loading="lazy">${to}</span></div>`).join('');

  /* ---------- night ---------- */
  const stars = $('#stars');
  stars.innerHTML = Array.from({ length: 70 }, () => {
    const s = (Math.random() * 1.8 + .8).toFixed(1);
    return `<i style="left:${(Math.random() * 100).toFixed(2)}%;top:${(Math.random() * 100).toFixed(2)}%;width:${s}px;height:${s}px;--t:${(2 + Math.random() * 4).toFixed(1)}s;--dl:${(-Math.random() * 5).toFixed(1)}s;--o:${(.5 + Math.random() * .5).toFixed(2)}"></i>`;
  }).join('');

  /* the invite form posts to data-endpoint (Formspree, a Google Apps Script web app or similar) once one is set */
  const jf = $('#jf'), fine = $('#fine'), moon = $('#moon');
  jf.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = $('#em').value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { fine.textContent = 'That email doesn’t look right. Check it and try again.'; swap(moon, '😅'); setTimeout(() => swap(moon, '🌙'), 1800); return; }
    const url = jf.dataset.endpoint;
    if (!url) { fine.textContent = 'The invite list opens soon. Check back in a few days.'; return; }
    fine.textContent = 'Sending…';
    try {
      const r = await fetch(url, { method: 'POST', headers: { Accept: 'application/json' }, body: new URLSearchParams({ email }) });
      fine.textContent = r.ok ? 'You’re on the list. We’ll email your Android invite.' : 'That didn’t go through. Try again in a minute.';
      if (r.ok) { jf.reset(); swap(moon, '😄'); burst(moon, ['🎉', '✨', '😄']); setTimeout(() => swap(moon, '😴'), 2400); }
    } catch { fine.textContent = 'That didn’t go through. Check your connection and try again.'; }
  });

  reveal();
})();
