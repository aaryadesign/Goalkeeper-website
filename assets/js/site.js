// app icons, from the Goalkeeper app
const B = {"uber":"assets/brands/uber.png","slack":"assets/brands/slack.png","gmail":"assets/brands/gmail.png","notion":"assets/brands/notion.png","google":"assets/brands/google.png","whatsapp":"assets/brands/whatsapp.png","zepto":"assets/brands/zepto.png","swiggy":"assets/brands/swiggy.png","gcal":"assets/brands/gcal.png","strava":"assets/brands/strava.png","amazon":"assets/brands/amazon.png","indigo":"assets/brands/indigo.png","blinkit":"assets/brands/blinkit.png","zomato":"assets/brands/zomato.png","maps":"assets/brands/maps.png","meet":"assets/brands/meet.png","phonepe":"assets/brands/phonepe.png","flipkart":"assets/brands/flipkart.png","instamart":"assets/brands/instamart.png","zoom":"assets/brands/zoom.png"};
const $ = (s, r = document) => r.querySelector(s), $$ = (s, r = document) => [...r.querySelectorAll(s)];
const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
const STOP = Symbol('stop');
const GKS = '<svg viewBox="0 0 22 22" fill="none"><circle cx="11" cy="11" r="8.5" stroke="#fff" stroke-width="2.4"/><circle cx="11" cy="11" r="4" fill="#fff"/></svg>';
const logo = (a) => a === 'gk' ? `<span class="gkt">${GKS}</span>` : `<img src="${B[a]}" alt="">`;
const CHK = '<svg viewBox="0 0 24 24" fill="none" stroke="#fff" stroke-width="3.6" stroke-linecap="round" stroke-linejoin="round"><path d="M5 12.5l4.5 4.5L19 7.5"/></svg>';
const MIC = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" aria-hidden="true"><path d="M12 3a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3zM5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21"/></svg>';
const NE = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.4" stroke-linecap="round" stroke-linejoin="round"><path d="M7 17L17 7M9 7h8v8"/></svg>';
const MARK = '<svg viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="9.5" stroke="currentColor" stroke-width="1.8"/><circle cx="11" cy="11" r="4.5" fill="currentColor"/></svg>';
const ck = `<span class="ck">${CHK}</span>`;
const IO = `<span class="i-mic">${MIC}</span><span class="i-bars"><i></i><i></i><i></i><i></i><i></i></span><span class="i-think"><i></i><i></i><i></i></span><span class="i-ring"><svg viewBox="0 0 40 40"><circle cx="20" cy="20" r="19" pathLength="100"/></svg></span><span class="i-app"></span><span class="i-ck">${CHK}</span>`;

// timing: unhurried, so the words can be read
const PACE = 290, COMMA = 260, PRE = 700, AFTER = 550, THINK = 1800, HOLD = 4200;

// what was said, emoji, app, what's ready, the detail, the one tap left for you, why it's one tap
const TB = [
  ['Book an Uber to the office', '🚕', 'uber', 'Ride ready', 'Home → Office', 'Open Uber', 'Pickup and drop are already filled in. You just tap Book.'],
  ['Get milk, eggs and bread on Blinkit', '🛒', 'blinkit', 'Cart ready', '3 items · ₹186', 'Pay on Blinkit', 'Everything’s in your cart. You just pay, then track it.'],
  ['Tell Rohan the deck’s ready', '✉️', 'gmail', 'Draft ready', 'Reply to Rohan', 'Review and send', 'It’s waiting in your drafts. You hit send.'],
  ['Order biryani for four from the usual place', '🍛', 'swiggy', 'Cart ready', 'Biryani × 4 · ₹612', 'Pay on Swiggy', 'Your usual place, already in the cart. You just pay.'],
  ['Wish Priya happy birthday on WhatsApp', '🎂', 'whatsapp', 'Message ready', 'In Priya’s chat', 'Send on WhatsApp', 'Written and waiting in her chat. You hit send.'],
];

const LOB = [.55, .85, 1, .85, .55].map((h) => `<i style="--h:${(h * .3).toFixed(3)}"></i>`).join('');
const WMK = (cls = '') => `<span class="gkw ${cls}">G<span class="lo"><span>${LOB}</span></span>alkeeper</span>`;
const MOON = '<svg class="mn" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round" stroke-linejoin="round"><path d="M20 14.5A8 8 0 0 1 9.5 4a8 8 0 1 0 10.5 10.5z"/></svg>';
const SUN = '<svg class="sn" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.9" stroke-linecap="round"><circle cx="12" cy="12" r="4.2"/><path d="M12 2.5v2M12 19.5v2M2.5 12h2M19.5 12h2M5.3 5.3l1.4 1.4M17.3 17.3l1.4 1.4M5.3 18.7l1.4-1.4M17.3 6.7l1.4-1.4"/></svg>';
const NAV = `<div class="wrap"><header class="nav"><a class="brand" href="#" aria-label="Goalkeeper">${WMK()}<span class="bm">${MARK}Goalkeeper</span></a><nav class="links" aria-label="Sections"><a href="#day">How it works</a><a href="#widget">Your day</a><a href="#join">Privacy</a></nav><button class="thm" type="button" aria-label="Dark mode">${MOON}${SUN}</button><a class="nbtn" href="#join">Get early access</a></header></div>`;
const EB = `<a class="eb" href="#join"><b>Early access is open</b><span class="sep">·</span><span class="lk">Join the waitlist</span><span class="ar">${NE}</span></a>`;
const SUB = `<p class="sub">A voice assistant for people with full days. Say what you need, the way you’d tell a friend. Goalkeeper sets it up in the apps you already use, so all that’s left is one tap from you.</p>`;
const ACT = `<div class="act"><a class="btn1" href="#join">Get early access</a><a class="btn2" href="#day">See how it works</a></div>`;
const H1 = `<h1 id="h1">Say it <span class="io" aria-hidden="true">${IO}</span><br class="mbr"> and it’s ready.</h1>`;
const resLine = (t) => `<span class="em">${t[1]}</span><span>${t[3]}</span><span class="m">·</span>${logo(t[2])}<span class="m">${t[4]}</span><span class="cta">${t[5]}${NE}</span>`;

const TPL = {
  1: () => `<section class="hero B1" aria-labelledby="h1">${NAV}<div class="wrap hc">${EB}${H1}${SUB}${ACT}
    <div class="cv" aria-hidden="true"><p class="tx"></p><p class="rs"></p><p class="hint"></p></div></div></section>`,
};

// one live hero at a time
let CUR = null, onScroll = null;
const fly = $('.fly');
fly.innerHTML = IO;
// sections further down register here: what to do on scroll, where to borrow the mark, what a tap means
const SCROLLS = new Set(), POS = new Set(), CLICKS = new Set();
fly.addEventListener('click', () => { for (const f of CLICKS) if (f()) return; scrollTo({ top: 0, behavior: RM ? 'auto' : 'smooth' }); });
const lerp = (a, b, t) => a + (b - a) * t, clamp = (v, a = 0, b = 1) => Math.min(b, Math.max(a, v));
const ease = (p) => (p < .5 ? 2 * p * p : 1 - Math.pow(-2 * p + 2, 2) / 2);

function mount(o) {
  $('#live').innerHTML = TPL[o]();
  const hero = $('#live .hero'); CUR = hero;
  const alive = () => CUR === hero;
  const io = $('.io', hero), bars = $$('.i-bars i', io);
  io.style.setProperty('--think', THINK + 'ms');
  const W = (ms) => new Promise((res, rej) => { if (!alive()) return rej(STOP); if (RM) return res(); setTimeout(() => (alive() ? res() : rej(STOP)), ms); });
  // wait while the hero is scrolled away, so nothing plays to an empty room
  const seen = () => new Promise((res, rej) => { const c = () => { if (!alive()) return rej(STOP); if (scrollY < hero.offsetHeight * .3 && !document.documentElement.classList.contains('intro-on')) return res(); setTimeout(c, 250); }; c(); });
  let lt = null, until = 0;
  const listen = (ms) => {
    if (RM) return;
    until = Math.max(until, performance.now() + ms);
    if (!lt) lt = setInterval(() => {
      if (performance.now() > until || !alive()) { clearInterval(lt); lt = null; bars.forEach((b) => (b.style.height = '')); return; }
      const lv = .4 + .6 * Math.random();
      [.55, .85, 1, .85, .55].forEach((s, i) => (bars[i].style.height = (.075 + .4 * lv * s * (.45 + .55 * Math.random())) + 'em'));
    }, 140);
  };
  const ioTo = (...cls) => { io.classList.remove('listen', 'think', 'app', 'done'); if (!cls.length) return; io.classList.add(...cls); };
  // hear a sentence, word by word, at about the pace people talk
  const hear = async (el, text, wrap = (h) => h) => {
    el.innerHTML = '<span>' + wrap('<span class="caret"></span>') + '</span>';
    const caret = $('.caret', el);
    for (const t of text.split(/(?<= )/)) {
      const w = document.createElement('span'); w.className = 'w'; w.textContent = t;
      caret.before(w); w.offsetWidth; w.classList.add('on'); listen(PACE + 400);
      setTimeout(() => w.classList.add('set'), 420);
      await W(PACE + (/[,.]\s*$/.test(t) ? COMMA : 0));
    }
    await W(AFTER);
    $('.caret', el)?.remove();
  };
  const S = { hero, io, W, seen, listen, ioTo, hear, alive };

  // the scroll: the mark leaves the headline and docks at the bottom centre
  onScroll = () => {
    const H = hero.offsetHeight, p = Math.min(1, Math.max(0, scrollY / (H * .55)));
    if (p <= 0) { fly.hidden = true; fly.classList.remove('docked'); io.classList.remove('gone'); return; }
    const r = io.getBoundingClientRect(), fs = parseFloat(getComputedStyle(io).fontSize);
    if (fly.hidden) {
      fly.className = io.className.replace(' gone', '') + ' fly'; $('.i-app', fly).innerHTML = $('.i-app', io).innerHTML;
      fly.hidden = false; io.classList.add('gone');
      requestAnimationFrame(() => fly.classList.remove('listen', 'think', 'app', 'done'));
    }
    const k = ease(p), S1 = 56;
    let cx = lerp(r.left + r.width / 2, innerWidth / 2, k), cy = lerp(r.top + r.height / 2, innerHeight - 24 - S1 / 2, k), sz = lerp(.92 * fs, S1, k);
    // a section further down can borrow the mark and put it somewhere else
    let t = null; if (p >= 1) for (const f of POS) { const v = f(); if (v && v.b > 0) { t = v; break; } }
    const pill = !!(t && t.w), fs2 = fly.style, mic = $('.i-mic', fly);
    fly.classList.toggle('pill', pill);
    if (pill) {
      // it travels and stretches into the button, then the button itself shows through
      const k = ease(clamp(t.b / .8)), hh = lerp(sz, t.h, k);
      cx = lerp(cx, t.cx, k); cy = lerp(cy, t.cy, k);
      fs2.fontSize = hh / .92 + 'px'; fs2.width = lerp(sz, t.w, k) + 'px'; fs2.height = hh + 'px'; fs2.borderRadius = hh / 2 + 'px';
      mic.style.opacity = 1 - clamp(k / .45); fs2.opacity = 1 - clamp((t.b - .8) / .17); fs2.pointerEvents = t.b >= .97 ? 'none' : '';
      fs2.left = cx + 'px'; fs2.top = cy + 'px'; fly.classList.add('docked');
      return;
    }
    // leaving the button: back to the round mark at once, not a slow shrink
    if (fs2.width) { fs2.transition = 'none'; fs2.width = fs2.height = fs2.borderRadius = fs2.opacity = fs2.pointerEvents = mic.style.opacity = ''; fly.offsetWidth; fs2.transition = ''; }
    if (t && t.b > 0) { cx = lerp(cx, t.cx, t.b); cy = lerp(cy, t.cy, t.b); sz = lerp(sz, t.s, t.b); }
    fly.style.fontSize = sz / .92 + 'px';
    fly.style.left = cx + 'px'; fly.style.top = cy + 'px';
    fly.classList.toggle('docked', p >= 1);
  };
  onScroll();
  RUN[o](S);
}
const tick = () => { SCROLLS.forEach((f) => f()); onScroll && onScroll(); };
addEventListener('scroll', tick, { passive: true });
addEventListener('resize', () => { sizeDay(); sizeW(); tick(); });

const loop = (S, fn) => (async () => { try { await S.W(700); for (let n = 0; ; n++) { await S.seen(); await fn(TB[n % TB.length], n); } } catch (e) { if (e !== STOP) console.error(e); } })();

const RUN = {
  // what you say takes the stage, then becomes what's ready, with the one tap that's left
  1(S) {
    const tx = $('.tx', S.hero), rs = $('.rs', S.hero), hint = $('.hint', S.hero);
    const ready = (t) => { rs.innerHTML = resLine(t); hint.textContent = t[6]; $('.i-app', S.io).innerHTML = logo(t[2]); };
    if (RM) { const t = TB[0]; tx.innerHTML = t[0]; ready(t); rs.classList.add('on'); hint.classList.add('on'); S.ioTo('app', 'done'); return; }
    loop(S, async (t, n) => {
      if (n) { tx.classList.add('out'); rs.classList.remove('on'); hint.classList.remove('on'); S.ioTo(); await S.W(800); tx.classList.remove('shim', 'out'); tx.innerHTML = ''; }
      ready(t);
      S.ioTo('listen'); S.listen(PRE); await S.W(PRE);
      await S.hear(tx, t[0]);
      S.ioTo('think'); tx.classList.add('shim');
      await S.W(THINK);
      tx.classList.remove('shim'); S.ioTo('app'); await S.W(450);
      S.io.classList.add('done'); rs.classList.add('on'); hint.classList.add('on');
      await S.W(HOLD);
    });
  },
};

// ---------- the day ----------
// minutes since midnight, emoji, what she said, app, what's ready, the detail, the one tap left (none if empty), why
const DAY = [
  [430, '☀️', 'What’s on today?', 'gcal', 'Day sorted', '3 meetings · gym at 7:30 PM', '', 'Meetings, errands and the gym, in one plan.'],
  [520, '🚕', 'Get me a cab to the office, I’m running late', 'uber', 'Ride ready', 'Home → Office', 'Open Uber', 'Pickup and drop are filled in. She just taps Book.'],
  [605, '💬', 'Tell the design team I’ll be ten minutes late', 'slack', 'Message ready', 'In #design', 'Send on Slack', 'Written in the channel. She hits send.'],
  [795, '🥗', 'Lunch from the usual place', 'zomato', 'Cart ready', 'Paneer bowl · ₹249', 'Pay on Zomato', 'Her usual order, in the cart. She just pays.'],
  [990, '🙋', 'Remind me if Karan doesn’t reply by Friday', 'gk', 'Follow-up set', 'Fri · 10 AM', '', 'It checks back on Friday, with a nudge written.'],
  [1130, '🛒', 'Milk, eggs and atta on Zepto', 'zepto', 'Cart ready', '3 items · ₹212', 'Pay on Zepto', 'In the cart. She pays, then tracks it.'],
  [1270, '✉️', 'Reply to Meera, Saturday works', 'gmail', 'Draft ready', 'Re: Saturday plans', 'Review and send', 'Waiting in her drafts. She hits send.'],
  [1350, '🌙', 'Close the day', 'gk', 'Day closed', '7 handled · 1 thing for tomorrow', '', 'Then it’s quiet till morning.'],
];
const M = DAY.length, D0 = 420, D1 = 1380, DTHINK = 1500, CHOLD = 4000;
const fmt = (m) => { m = Math.round(m); const h = Math.floor(m / 60), mm = m % 60; return `${h % 12 || 12}:${String(mm).padStart(2, '0')} ${h >= 12 ? 'PM' : 'AM'}`; };
const tapOf = (d) => (d[6] ? `<span class="cta">${d[6]}${NE}</span>` : '<span class="cta ghost">Done</span>');
const dayLine = (d) => `<span class="em">${d[1]}</span><span>${d[4]}</span><span class="m">·</span>${logo(d[3])}<span class="m">${d[5]}</span>${tapOf(d)}`;
// the light over a day: dawn, morning, noon, afternoon, sunset, dusk, evening, night
const SKY = [[420, [255, 170, 90]], [600, [250, 200, 110]], [780, [120, 180, 240]], [990, [250, 190, 90]], [1110, [245, 120, 90]], [1200, [220, 90, 150]], [1290, [110, 95, 220]], [1380, [50, 60, 140]]];
const skyAt = (m) => { for (let j = 1; j < SKY.length; j++) if (m <= SKY[j][0]) { const [a, ca] = SKY[j - 1], [b, cb] = SKY[j], t = (m - a) / (b - a); return ca.map((v, k) => Math.round(v + (cb[k] - v) * t)); } return SKY[SKY.length - 1][1]; };
const SKYG = 'linear-gradient(90deg,' + SKY.map(([m, c]) => `rgb(${c}) ${((m - D0) / (D1 - D0) * 100).toFixed(1)}%`).join(',') + ')';

const HEAD = (tally) => `<div class="wrap dh"><h2 id="h-day">Neha’s Tuesday, said out loud.</h2>
  <p class="d">Eight things she’d usually juggle between apps. She says each one. Goalkeeper sets it up, and she finishes with a tap, or none at all.</p>
  ${tally ? '<p class="tally"><span><span class="em">✅</span><b class="n1">0</b> of 8 ready</span><span><span class="em">👆</span><b class="n2">0</b> taps from Neha</span></p>' : ''}</div>`;
const CV = '<div class="cv" aria-hidden="true"><p class="tx"></p><p class="rs"></p><p class="hint"></p></div>';
const DT = {
  a: () => `<section class="day A" id="day" aria-labelledby="h-day"><div class="stage">${HEAD(1)}<div class="wrap dm">${CV}</div>
    <div class="rl" aria-hidden="true"><div class="wrap"><div class="rli"><div class="trk"><i class="fill"></i></div><span class="ptag"></span></div></div></div></div></section>`,
};

// the mark at the bottom does the listening for the day too
const fbars = () => $$('.i-bars i', fly);
let flt = null, fUntil = 0;
const flyListen = (ms) => {
  if (RM) return;
  fUntil = Math.max(fUntil, performance.now() + ms);
  if (!flt) flt = setInterval(() => {
    const b = fbars();
    if (performance.now() > fUntil) { clearInterval(flt); flt = null; b.forEach((x) => (x.style.height = '')); return; }
    const lv = .4 + .6 * Math.random();
    [.55, .85, 1, .85, .55].forEach((s, i) => (b[i].style.height = (.075 + .4 * lv * s * (.45 + .55 * Math.random())) + 'em'));
  }, 140);
};
const flyTo = (...cls) => { fly.classList.remove('listen', 'think', 'app', 'done'); if (cls.length) fly.classList.add(...cls); };
fly.style.setProperty('--think', DTHINK + 'ms');

// one moment: hear it, think, show what's ready. A newer call cancels an older one.
let TOK = 0;
async function playMoment(i, el, on = {}) {
  const my = ++TOK, d = DAY[i], F = typeof on.fast === 'function' ? on.fast : () => !!on.fast;
  const W = (ms) => new Promise((res, rej) => { if (my !== TOK) return rej(STOP); if (RM) return res(); setTimeout(() => (my === TOK ? res() : rej(STOP)), ms); });
  // fast: catching up after a quick scroll, still every word and every result, just sooner
  const T = (ms, fast) => (F() ? fast : ms);
  try {
    el.tx.classList.add('out'); el.rs?.classList.remove('on'); el.hint?.classList.remove('on'); flyTo();
    await W(T(450, 160));
    el.tx.classList.remove('shim', 'out'); el.tx.innerHTML = '';
    if (el.rs) el.rs.innerHTML = dayLine(d);
    if (el.hint) el.hint.textContent = d[7];
    $('.i-app', fly).innerHTML = logo(d[3]);
    flyTo('listen'); flyListen(600); await W(T(600, 200));
    el.tx.innerHTML = '<span><span class="caret"></span></span>';
    const caret = $('.caret', el.tx);
    for (const t of d[2].split(/(?<= )/)) {
      const w = document.createElement('span'); w.className = 'w'; w.textContent = t;
      caret.before(w); w.offsetWidth; w.classList.add('on'); flyListen(PACE + 400);
      setTimeout(() => w.classList.add('set'), T(420, 140));
      await W(T(PACE + (/[,.]\s*$/.test(t) ? COMMA : 0), 95));
    }
    await W(T(AFTER, 200)); caret.remove();
    flyTo('think'); el.tx.classList.add('shim'); await W(T(DTHINK, 550));
    el.tx.classList.remove('shim'); flyTo('app'); await W(T(400, 200));
    fly.classList.add('done'); el.rs?.classList.add('on'); el.hint?.classList.add('on');
    on.done && on.done(i);
    return true;
  } catch (e) { if (e !== STOP) console.error(e); return false; }
}

const setTally = (sec, n) => { const a = $('.n1', sec), b = $('.n2', sec); if (!a) return; a.textContent = n; b.textContent = DAY.slice(0, n).filter((d) => d[6]).length; };

// pinned sections: the stage holds still while the scroll moves the clock through her day
const PE = .2, PP = .5, PX = .35;
const pin = (sec) => {
  const V = innerHeight, y = scrollY - sec.offsetTop;
  const sc = clamp((y - PE * V) / (PP * V), 0, M - 1e-6), i = Math.floor(sc), f = sc - i;
  const clock = DAY[i][0] + (i < M - 1 ? (DAY[i + 1][0] - DAY[i][0]) * ease(clamp((f - .62) / .38)) : 0);
  const end = (PE + M * PP) * V;
  const b = ease(clamp((y + .15 * V) / (.3 * V))) * (1 - ease(clamp((y - end - .02 * V) / (.28 * V))));
  return { i, clock, b, live: y > .05 * V && y < end + .6 * V, away: y < -.6 * V, past: y > end + .9 * V };
};
// which moment is on, and whether it has finished. Moments play in turn, so a fast scroll
// never skips what she said and what got ready: the timeline waits for them.
const stepper = (sec, el, paint, moved) => {
  let cur = -1, fin = false, target = -1, gen = 0, busy = false;
  const count = () => (cur < 0 ? 0 : cur + (fin ? 1 : 0));
  const show = () => { paint(count()); setTally(sec, count()); };
  const sleep = (ms) => new Promise((r) => setTimeout(r, RM ? 0 : ms));
  const run = async () => {
    if (busy) return; busy = true; const g = gen;
    while (g === gen && target >= 0 && target !== cur) {
      const back = target < cur;
      // very far behind: skip ahead, but still play the last four
      cur = back ? target : Math.max(cur + 1, target - 4); fin = false; show(); moved();
      // it hurries for as long as the scroll is ahead of it
      const ok = await playMoment(cur, el, { fast: () => target !== cur, done: () => { fin = true; show(); } });
      if (!ok || g !== gen) break;
      if (target !== cur) await sleep(700);
    }
    if (g === gen) busy = false;
  };
  const reset = () => { gen++; busy = false; TOK++; };
  return {
    cur: () => cur,
    step(st) {
      if (st.away && cur !== -1) {
        reset(); cur = -1; target = -1; fin = false; flyTo();
        el.tx.innerHTML = ''; el.rs?.classList.remove('on'); el.hint?.classList.remove('on');
        show(); moved();
      } else if (st.past && cur !== -1) {
        // past the day: the mark goes back to plain, ready for whatever is next
        reset(); cur = -1; target = -1; flyTo();
      } else if (st.live && st.i !== target) {
        if (st.i < cur) reset(); // going back answers at once
        target = st.i; run();
      }
    },
  };
};

const DRUN = {
  // A: the mark leaves the dock and becomes the playhead; scrolling moves it through the day
  a(sec) {
    const el = { tx: $('.tx', sec), rs: $('.rs', sec), hint: $('.hint', sec) };
    const w = $('.rli', sec), trk = $('.trk', sec), fill = $('.fill', sec), tag = $('.ptag', sec);
    sec.style.setProperty('--skyg', SKYG);
    const X = (m) => ((m - D0) / (D1 - D0) * 100) + '%';
    let h = '';
    for (let m = D0; m <= D1; m += 60) h += `<i class="tk" style="left:${X(m)}"></i>`;
    for (const m of [420, 600, 780, 960, 1140, 1320]) h += `<span class="hl" data-m="${m}" style="left:${X(m)}">${fmt(m).replace(':00', '')}</span>`;
    DAY.forEach((d) => (h += `<span class="mk" style="left:${X(d[0])}"><span class="em">${d[1]}</span></span>`));
    w.insertAdjacentHTML('beforeend', h);
    const hls = $$('.hl', w), mks = $$('.mk', w);
    let ct = 0;
    // when the content catches up, the mark glides to it instead of jumping
    const moved = () => { sec.classList.add('catch'); fly.classList.add('catch'); clearTimeout(ct); ct = setTimeout(() => { sec.classList.remove('catch'); fly.classList.remove('catch'); }, 700); requestAnimationFrame(tick); };
    const step = stepper(sec, el, (n) => mks.forEach((m, j) => m.classList.toggle('on', j < n)), moved);
    let st = null, px = 0, ty = 0;
    SCROLLS.add(() => {
      st = pin(sec);
      const c = step.cur(), clock = c < 0 || c === st.i ? st.clock : DAY[c][0];
      const r = trk.getBoundingClientRect(), fr = (clock - D0) / (D1 - D0);
      // near either end of the day, leave room for the wider listening mark
      const hw = 1.9 * 48 / 2 + 8;
      px = clamp(r.left + fr * r.width, hw, innerWidth - hw); ty = r.top + r.height / 2;
      fill.style.clipPath = `inset(0 ${(1 - fr) * 100}% 0 0)`;
      tag.textContent = fmt(clock); tag.style.left = px - r.left + 'px'; tag.style.opacity = st.b;
      hls.forEach((l) => (l.style.opacity = st.b > .3 && Math.abs((l.dataset.m - clock) / (D1 - D0) * r.width) < 36 ? 0 : 1));
      step.step(st);
    });
    POS.add(() => (st && st.b > 0 ? { cx: px, cy: Math.min(ty, innerHeight - 52), s: 48, b: st.b } : null));
  },

};

function sizeDay() { const sec = $('#day'); if (sec) sec.style.height = innerHeight * (1 + PE + M * PP + PX) + 'px'; }
$('#dayw').innerHTML = DT.a();
sizeDay(); DRUN.a($('#day'));

// ---------- the widget, as designed in the app ----------
const RGB = { g: '38,179,122', o: '242,153,46', b: '47,123,246', p: '148,103,240', k: '238,76,138' };
const WI = { check: 'M5 12.5l4.5 4.5L19 7.5', clock: 'M12 7v5l3 2M12 3a9 9 0 1 0 0 18 9 9 0 0 0 0-18z', move: 'M5 12h12M13 7l5 5-5 5' };
const MICP = 'M12 3a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3zM5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21';
const svgI = (d, w = 2.2) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${d}"/></svg>`;
const emj = (s) => s.replace(/(\p{Extended_Pictographic}️?)/gu, '<span class="em">$1</span>');
const short = (m) => fmt(m).replace(/ [AP]M/, '');
// a button: [text, app (its logo) or icon, p = the main one]
const wbtn = ([text, a, k = 's']) => `<span class="wb ${k}${text ? '' : ' i'}">${B[a] ? `<img src="${B[a]}" alt="">` : svgI(WI[a])}${text}</span>`;
const w42 = (m) => `<div class="w42" style="--w:${RGB[m.c]}"><span class="em wE">${m.e}</span><div class="wT">${m.title}</div><div class="wS">${m.sub}</div>${m.track ? `<div class="wtr"><i></i><b style="width:${m.track}%"></b><span class="em" style="left:${m.track}%">🛵</span></div>` : ''}<span class="wsp"></span><div class="wC">${m.ctas.map(wbtn).join('')}</div></div>`;
const wrow = (r) => `<div class="wr${r.dn ? ' dn' : ''}${r.nw ? ' new' : ''}" style="--w:${RGB[r.c]}"><span class="t">${r.t}</span><span class="c em">${r.dn ? '✅' : r.e}</span><span class="x"><b>${r.title}</b><small>${r.sub}</small></span>${wbtn(r.b)}</div>`;
const w44 = (hero, rows, foot) => `<div class="w44">${w42(hero)}<div class="wrs">${rows.map(wrow).join('')}</div><div class="wft"><p>${emj(foot)}</p><span class="wmic" aria-label="Talk">${svgI(MICP, 2)}</span></div></div>`;
const tile = (t) => `<div class="w22" style="--w:${RGB[t.c]}">${t.ring != null
  ? `<span class="ring" style="background:conic-gradient(#F2992E ${t.ring}deg,var(--whair) 0)"><span class="em">${t.e}</span></span><span class="n" style="margin-top:10px;text-align:center">${t.n}</span><span class="lg" style="justify-content:center"><img src="${B[t.app]}" alt="">${t.l}</span>`
  : `<span class="em e">${t.e}</span><span class="nm">${t.nm}</span><span class="wsp"></span>${wbtn([t.b[0], t.b[1], 'p'])}`}</div>`;
// a widget at its real size, scaled down only when the screen is narrower
const fitw = (html, s) => `<div class="wfit"${s ? ` data-s="${s}"` : ''}>${html}</div>`;
function fitAll() {
  const vw = document.documentElement.clientWidth;
  $$('.wfit').forEach((el) => {
    const c = el.firstElementChild; if (!c) return;
    const w = c.offsetWidth, h = c.offsetHeight, s = el.dataset.s ? +el.dataset.s : Math.min(1, (vw - 32) / w);
    c.style.transform = `scale(${s})`; el.style.width = w * s + 'px'; el.style.height = h * s + 'px';
  });
}

// her Tuesday, the way the widget shows it. row: how it reads when it isn't next
const WM = [
  { m: 510, e: '🚕', c: 'b', cap: 'Leave on time, the cab’s set up', title: 'Leave by 8:45', sub: 'Cab to the office, pickup filled in', ctas: [['Open Uber', 'uber', 'p'], ['10 min', 'clock']], row: ['Cab to office', 'Pickup filled in', ['Open', 'uber']], t2: { nm: 'Leave by 8:45', b: ['Open', 'uber'] } },
  { m: 588, e: '💻', c: 'b', cap: 'A countdown, and Join', at: 600, title: 'Standup at 10:00', sub: 'In {t}, design team on Google Meet', ctas: [['Join', 'meet', 'p'], ['Running late', 'clock']], row: ['Standup', 'Google Meet', ['Join', 'meet']], t2: { nm: 'Standup · 10:00', b: ['Join', 'meet'] } },
  { m: 785, e: '🥗', c: 'g', cap: 'Lunch in the cart, one tap to pay', title: 'Lunch, the usual', sub: 'Paneer bowl is in your cart · ₹249', ctas: [['Pay on Zomato', 'zomato', 'p'], ['Later', 'clock']], row: ['Lunch', 'In your cart', ['Pay', 'zomato']], t2: { nm: 'Lunch, the usual', b: ['Pay', 'zomato'] } },
  { m: 1145, e: '🛍️', c: 'o', cap: 'Groceries, live on the way', eta: 1, title: 'Zepto in {eta}', sub: '3 items, your rider is on the way', ctas: [['Track', 'zepto', 'p'], ['Got it', 'check']], row: ['Groceries', 'On the way', ['Track', 'zepto']], t2: { ring: 1, app: 'zepto', l: 'Zepto' } },
  { m: 1260, e: '💬', c: 'p', cap: 'A reply, already written', title: 'Reply to Meera', sub: '“Saturday works” is written', ctas: [['Open Gmail', 'gmail', 'p'], ['10 min', 'clock']], row: ['Reply to Meera', 'Draft ready', ['Open', 'gmail']], t2: { nm: 'Reply to Meera', b: ['Open', 'gmail'] } },
];
const WFOOT = 'Any time 🧾 Electricity bill · ⏳ Karan';
const heroAt = (i, clock) => {
  const m = WM[i], eta = Math.max(1, Math.round(6 - Math.max(0, clock - m.m) / 8));
  return { ...m, title: m.title.replace('{eta}', eta + ' min'), sub: m.sub.replace('{t}', Math.max(1, Math.round((m.at || 0) - clock)) + ' min'), track: m.eta ? 54 + (6 - eta) * 7 : 0 };
};
const rowsAt = (i) => WM.map((m, j) => ({ t: short(m.m), e: m.e, c: m.c, title: m.row[0], sub: j < i ? 'Done' : m.row[1], b: m.row[2], dn: j < i })).filter((_, j) => j !== i);

const WAPPS = ['gcal', 'gmail', 'whatsapp', 'maps', 'swiggy', 'uber', 'slack', 'zepto', 'phonepe', 'meet', 'notion', 'strava'];
const WAPPN = { gcal: 'Calendar', gmail: 'Gmail', whatsapp: 'WhatsApp', maps: 'Maps', swiggy: 'Swiggy', uber: 'Uber', slack: 'Slack', zepto: 'Zepto', phonepe: 'PhonePe', meet: 'Meet', notion: 'Notion', strava: 'Strava' };
// the sizes she can pick, and what each one is for
const WSZ = [
  ['42', '4×2', 'Most people pick this one. What’s next, with its one button.'],
  ['22', '2×2', 'Small and square. What’s now, and what’s after.'],
  ['44', '4×4', 'The whole day in one place, and the mic to add more.'],
];
const WSZG = { 42: [4, 2], 22: [2, 2], 44: [4, 4] };
const tileAt = (i, clock) => { const m = WM[i], h = heroAt(i, clock); return m.t2.ring ? { ...m.t2, e: m.e, c: m.c, ring: Math.round(h.track / 100 * 360), n: h.title.replace(/\D+/g, '') + ' min' } : { ...m.t2, e: m.e, c: m.c }; };
const WT = () => `<section class="wsec A" id="widget" aria-labelledby="h-w"><div class="stage"><div class="wrap wa">
    <div class="wh"><div class="dh"><h2 id="h-w">Everything, from your home screen.</h2>
      <p class="d">No app to open, not even this one. What’s next waits on your home screen with its button. One tap and you’re right where you finish it.</p></div>
      <p class="wcap" aria-hidden="true"></p></div>
    <div class="phw"><div class="phb"><div class="ph" data-s="42" aria-label="A home screen with the Goalkeeper widget"><div class="phs">
      <div class="psb" aria-hidden="true"><span class="pt"></span><span><i></i><i></i><i></i></span></div>
      <p class="pgl" aria-hidden="true"></p>
      <div class="pwg"></div>
      <div class="pap" aria-hidden="true">${WAPPS.map((a) => `<span><img src="${B[a]}" alt="">${WAPPN[a]}</span>`).join('')}</div>
    </div></div></div>
    <div class="szb"><div class="szs" role="group" aria-label="Widget size">${WSZ.map(([k, n, u]) => `<button type="button" data-s="${k}" aria-pressed="${k === '42'}" title="${u}"><i class="gl">${Array.from({ length: 16 }, (_, j) => `<u class="${(j % 4) < WSZG[k][0] && (j >> 2) < WSZG[k][1] ? 'f' : ''}"></u>`).join('')}</i>${n}</button>`).join('')}</div></div></div>
    <ul class="ml">${WM.map((m) => `<li><b>${fmt(m.m)}</b><span class="em">${m.e}</span>${m.cap}</li>`).join('')}</ul></div></div></section>`;

// pinned: scroll moves her day, the widget on the phone follows. On the 4×4 the mark rides in its Talk button.
function mountW() {
  $('#wgw').innerHTML = WT();
  const sec = $('#widget'), N = WM.length, ph = $('.ph', sec), phw = $('.phw', sec), wg = $('.pwg', sec), lis = $$('.ml li', sec), cap = $('.wcap', sec), bs = $$('.szs button', sec);
  let sz = '42', cur = -1, last = '', b = 0, clock = WM[0].m;
  const body = (i, c) => sz === '42' ? fitw(w42(heroAt(i, c)), .811)
    : sz === '22' ? fitw(`<div class="wg2">${tile(tileAt(i, c))}${tile(tileAt((i + 1) % N, WM[(i + 1) % N].m))}</div>`, .811)
    : fitw(w44(heroAt(i, c), rowsAt(i), WFOOT), .811);
  const paint = (i, anim) => {
    const h = body(i, clock); if (h === last) return; last = h;
    wg.innerHTML = h; fitAll();
    if (anim && !RM) wg.firstElementChild.animate([{ opacity: 0, transform: 'translateY(8px)' }, { opacity: 1, transform: 'none' }], { duration: 500, easing: 'cubic-bezier(.2,.7,.2,1)' });
  };
  const setSize = (k) => {
    sz = k; ph.dataset.s = k;
    bs.forEach((x) => x.setAttribute('aria-pressed', x.dataset.s === k));
    last = ''; paint(Math.max(0, cur), true); fit(); tick();
  };
  const wa = $('.wa', sec), phb = $('.phb', sec), sb = $('.szb', sec);
  const fit = () => {
    const mob = innerWidth <= 720, cs = getComputedStyle(wa);
    let ah = mob ? phw.clientHeight : wa.clientHeight - parseFloat(cs.paddingTop) - parseFloat(cs.paddingBottom);
    ah -= sb.offsetHeight + (mob ? 12 : 2 * 16);
    const k = Math.max(.3, Math.min(mob ? 1 : .72, ah / ph.offsetHeight, (mob ? phw.clientWidth : 330) / 330));
    ph.style.setProperty('--k', k); phb.style.width = 330 * k + 'px'; phb.style.height = ph.offsetHeight * k + 'px';
  };
  bs.forEach((x) => x.addEventListener('click', () => setSize(x.dataset.s)));
  addEventListener('resize', fit);
  SCROLLS.add(() => {
    const V = innerHeight, y = scrollY - sec.offsetTop;
    const sc = clamp((y - PE * V) / (PP * V), 0, N - 1e-6), i = Math.floor(sc), f = sc - i;
    clock = WM[i].m + (i < N - 1 ? (WM[i + 1].m - WM[i].m) * ease(clamp((f - .62) / .38)) : 0);
    const end = (PE + N * PP) * V;
    b = ease(clamp((y + .5 * V) / (.5 * V))) * (1 - ease(clamp((y - end - .02 * V) / (.28 * V))));
    paint(i, i !== cur); cur = i;
    lis.forEach((l, j) => l.classList.toggle('on', j === i));
    cap.innerHTML = `<b>${fmt(WM[i].m)}</b><span class="em">${WM[i].e}</span>${WM[i].cap}`;
    sec.style.setProperty('--sky', skyAt(clock).join(','));
    $('.pt', sec).textContent = short(clock);
    $('.pgl', sec).innerHTML = emj(`Tuesday · ${clock < 1080 ? '☀️ 27°' : clock < 1230 ? '⛅ 29°' : '🌙 24°'}`);
    const m = $('.wmic', sec); if (m) { m.classList.toggle('gone', b > 0 && b < .97); m.classList.toggle('hid', b >= .97); }
    const p = sz !== '44' && $('.pwg .wb.p', sec), land = clamp((b - .8) / .17);
    if (p) { p.classList.toggle('slot', b > 0 && land < 1); p.style.setProperty('--co', land); }
  });
  // on the 4×4 the mark rides in its Talk button; on the others it becomes the main button
  POS.add(() => {
    if (b <= 0) return null;
    const m = sz === '44' ? $('.wmic', sec) : $('.pwg .wb.p', sec); if (!m) return null;
    const r = m.getBoundingClientRect(), c = { cx: r.left + r.width / 2, cy: r.top + r.height / 2, s: r.height, b };
    return sz === '44' ? c : { ...c, w: r.width, h: r.height };
  });
  sizeW(); setSize('42');
}
function sizeW() { const s = $('#widget'); if (s) s.style.height = innerHeight * (1 + PE + WM.length * PP + PX) + 'px'; fitAll(); }

// ---------- more than a list: goals, money, who she's waiting on ----------
const CAT = [['Food & drinks', 'or', 6180], ['Groceries', 'gr', 4320], ['Bills', 'bl', 3940], ['Travel', 'pu', 2260], ['Shopping', 'pk', 1540]];
const rup = (n) => '₹' + n.toLocaleString('en-IN');
const RUNS = [6, 7, 8, 9, 10, 11, 13, 14, 16, 17, 19, 12, 21.1];
const CKO = '<span class="ck o"></span>';
const MO = [
  { k: 'goal', e: '🎯', lb: 'Goals', h: 'Say the goal. It plans the weeks.', app: 'gcal', t: [1300, 900, 700, 1000, 900],
    p: 'It asks what a coach would, a question at a time, then puts the sessions on your calendar. If the goal isn’t safe in the time there is, it says so.',
    said: 'I want to run a half marathon in December',
    body: () => `<div class="ab" data-s="1" data-x="3"><p class="bub">How far can you run now?<span class="sm">I’ll build up from there.</span></p><div class="chips"><span>3 km</span><span data-p="2">5 km</span><span>10 km</span></div></div>
      <div class="ab" data-s="3"><div class="gh"><b>Half marathon</b><small>Sun 13 Dec · 12 weeks</small></div>
        <div class="bars" data-s="4">${RUNS.map((r, j) => `<i class="${j < 2 ? 'dn' : j === 2 ? 'nw' : j === 12 ? 'rc' : ''}" style="--h:${(r / 21.1 * 100).toFixed(1)}%;--j:${j}"></i>`).join('')}</div>
        <div class="bl" data-s="4"><span>Week 1</span><span>Longest run 19 km</span><span>Race</span></div>
        <ul class="ses" data-s="5"><li><span class="d">Tue</span>Easy run<b>4 km</b>${ck}</li><li><span class="d">Thu</span>Tempo run<b>5 km</b>${CKO}</li><li><span class="d">Sun</span>Long run<b>8 km</b>${CKO}</li></ul></div>` },
  { k: 'spend', e: '💸', lb: 'Spending', h: 'Every payment, sorted on your phone.', app: 'gk', t: [900, 1300, 1100, 1200, 800],
    p: 'It reads the payment notifications on your phone and sorts them as they come. Nothing it reads is sent anywhere.',
    said: 'How much have I spent this month?',
    body: () => `<div class="amt" data-s="1"><b class="cnt">${rup(18240)}</b><small>this month</small><em>₹2,100 less than last month by now</em></div>
      <div class="sbar" data-s="2">${CAT.map(([, c, v], j) => `<i style="--w:${(v / 18240 * 100).toFixed(1)}%;--c:rgb(var(--${c}));--j:${j}"></i>`).join('')}</div>
      <ul class="leg" data-s="2">${CAT.slice(0, 4).map(([n, c, v]) => `<li style="--c:rgb(var(--${c}))"><i></i>${n}<b>${rup(v)}</b></li>`).join('')}</ul>
      <div class="pn" data-s="3"><img src="${B.phonepe}" alt=""><span class="x">Paid ₹450 to Swiggy<small>PhonePe · just now</small></span><span class="tg" style="--c:rgb(var(--or))"><i></i>Food & drinks</span></div>
      <div class="cu" data-s="5"><span class="em">🧾</span>Coming up: Airtel postpaid, ₹799, tomorrow</div>` },
  { k: 'wait', e: '⏳', lb: 'Waiting on', h: 'It notices when nothing happens.', app: 'gk', t: [1000, 1300, 900, 900],
    p: 'What you asked people for, and what you promised. When nothing comes back, it asks, with the nudge already written.',
    said: 'Remind me if Akash doesn’t pay by Friday',
    body: () => `<ul class="wl"><li style="--c:var(--bl)"><span class="av">K</span><span class="x"><b>Karan</b><small>A reply about the invoice</small></span><span class="ag">3 days</span></li>
        <li style="--c:var(--pu)"><span class="av">P</span><span class="x"><b>You, to Priya</b><small>Send the deck you promised</small></span><span class="ag">by Fri</span></li>
        <li data-s="1" style="--c:var(--or)"><span class="av">A</span><span class="x"><b>Akash</b><small>₹1,200 for the electricity bill</small></span><span class="ag">by Fri</span></li></ul>
      <div class="fp" data-s="2"><p class="fh">Friday · 10:00 AM</p><p class="bub">Did Akash pay?</p>
        <div class="fa"><div class="chips ab" data-s="2" data-x="4"><span>He did</span><span data-p="3">Nudge him</span><span>Drop it</span></div>
        <div class="dr ab" data-s="4"><p>“Hi Akash, a quick reminder about the ₹1,200 for the electricity bill 🙂”</p><span class="go"><img src="${B.whatsapp}" alt="">Send on WhatsApp</span></div></div></div>` },
];
// what a step changes beyond showing parts: her spending, before and after the new payment
const MFX = {
  spend(c, st, anim) {
    const on = st >= 4, cnt = $('.cnt', c), food = $('.leg li', c), bar = $('.sbar i', c);
    $('.pn', c).classList.toggle('sorted', on); food.classList.toggle('bump', on);
    $('b', food).textContent = rup(on ? 6630 : 6180); bar.style.setProperty('--w', ((on ? 6630 : 6180) / 18240 * 100).toFixed(1) + '%');
    const to = on ? 18690 : 18240;
    if (anim && st === 1) { const t0 = performance.now(); const f = (n) => { const k = clamp((n - t0) / 900); cnt.textContent = rup(Math.round(to * ease(k) / 10) * 10); if (k < 1) requestAnimationFrame(f); }; requestAnimationFrame(f); }
    else cnt.textContent = rup(to);
  },
};
const MT = (v) => `<section class="more ${v}" id="more" aria-labelledby="h-more"><div class="wrap">
  <div class="dh"><h2 id="h-more">It keeps track, so you don’t.</h2>
    <p class="d">Goals, money, and the people you’re waiting on. It notices what didn’t happen, and brings it up before it slips.</p></div>
  <div class="mtb" role="tablist" aria-label="What it keeps track of">${MO.map((m, i) => `<button type="button" role="tab" aria-selected="${i === 0}" data-i="${i}"><span class="em">${m.e}</span>${m.lb}<i></i></button>`).join('')}</div>
  <div class="mg">${MO.map((m, i) => `<article class="mc${i === 0 ? ' cur' : ''}" data-k="${m.k}" aria-label="${m.lb}"><p class="lb"><span class="em">${m.e}</span>${m.lb}</p><h3>${m.h}</h3><p class="mp">${m.p}</p>
    <div class="said"><span class="ms" aria-hidden="true">${MIC}</span><p class="st">${m.said}</p></div><div class="mb" aria-hidden="true">${m.body()}</div></article>`).join('')}</div>
</div></section>`;

// the mark comes down from the dock and says each one; the card builds what it heard
let MORE = null;
function mountMore(v) {
  if (MORE) MORE.off();
  if (v === 'C') return mountWeek();
  if (v === 'D') return mountLine();
  $('#morew').innerHTML = MT(v);
  const sec = $('#more'), cards = $$('.mc', sec), tabs = $$('.mtb button', sec), N = MO.length;
  let act = 0, b = 0, prev = null, hop0 = 0, tok = 0, gen = 0, busy = false;
  const mob = () => v === 'A' && innerWidth <= 1100;
  const setStep = (c, st, anim) => {
    $$('[data-s]', c).forEach((e) => e.classList.toggle('on', +e.dataset.s <= st && !(e.dataset.x && st >= +e.dataset.x)));
    $$('[data-p]', c).forEach((e) => e.classList.toggle('pk', st >= +e.dataset.p));
    MFX[c.dataset.k]?.(c, st, anim);
  };
  const rest = () => cards.forEach((c, i) => { setStep(c, 99); $('.st', c).textContent = MO[i].said; c.classList.remove('live'); });
  const show = (i) => {
    act = i;
    if (v === 'B') { cards.forEach((c, j) => c.classList.toggle('cur', j === i)); tabs.forEach((t, j) => { t.setAttribute('aria-selected', j === i); const bar = $('i', t); bar.style.transition = 'none'; bar.style.transform = 'scaleX(0)'; }); }
  };
  const W = (ms, my) => new Promise((res, rej) => setTimeout(() => (my === tok ? res() : rej(STOP)), ms));
  const hopping = () => { tick(); if (performance.now() - hop0 < 720) requestAnimationFrame(hopping); };
  async function play(i) {
    const my = ++tok, c = cards[i], m = MO[i], st = $('.st', c), words = m.said.split(/(?<= )/);
    try {
      prev = v === 'A' && i !== act ? $('.ms', cards[act]) : null; show(i); hop0 = performance.now(); hopping();
      cards.forEach((x) => x.classList.toggle('live', x === c));
      if (v === 'B') { // the tab fills for as long as this one plays
        const d = 700 + 500 + words.length * PACE + AFTER + 1300 + m.t.reduce((a, x) => a + x, 0) + CHOLD, bar = $('i', tabs[i]);
        bar.offsetWidth; bar.style.transition = `transform ${d}ms linear`; bar.style.transform = 'scaleX(1)';
      }
      flyTo(); setStep(c, 0); st.innerHTML = '';
      await W(700, my);
      $('.i-app', fly).innerHTML = logo(m.app);
      flyTo('listen'); flyListen(600); await W(500, my);
      st.innerHTML = '<span class="caret"></span>';
      const caret = $('.caret', st);
      for (const t of words) {
        const w = document.createElement('span'); w.className = 'w'; w.textContent = t;
        caret.before(w); w.offsetWidth; w.classList.add('on'); flyListen(PACE + 400);
        setTimeout(() => w.classList.add('set'), 420);
        await W(PACE + (/[,.]\s*$/.test(t) ? COMMA : 0), my);
      }
      await W(AFTER, my); caret.remove();
      flyTo('think'); await W(1300, my); flyTo('app');
      for (let s = 1; s <= m.t.length; s++) { setStep(c, s, true); await W(m.t[s - 1], my); }
      fly.classList.add('done');
      await W(CHOLD, my);
      return true;
    } catch (e) { if (e !== STOP) console.error(e); return false; }
  }
  const nearest = () => { let k = 0, d = 1e9; cards.forEach((c, j) => { const r = c.getBoundingClientRect(), x = Math.abs(r.top + r.height * .4 - innerHeight / 2); if (x < d) { d = x; k = j; } }); return k; };
  const run = async (from) => {
    if (busy || RM) return; busy = true; const g = gen;
    let i = from;
    while (g === gen && b > .5) {
      const ok = await play(i); if (!ok || g !== gen) break;
      if (mob()) { // on a phone she reads one card at a time: wait for the next one
        while (g === gen && b > .5 && nearest() === i) await new Promise((r) => setTimeout(r, 250));
        i = nearest();
      } else i = (i + 1) % N;
    }
    if (g === gen) busy = false;
  };
  const stop = () => { gen++; tok++; busy = false; flyTo(); rest(); };
  tabs.forEach((t) => t.addEventListener('click', () => { stop(); show(+t.dataset.i); if (b > .5) run(act); }));
  const onS = () => {
    // follows the card's mic: comes down as it rises into view, lets go as it leaves at the top
    const V = innerHeight, was = b, y = $('.ms', cards[mob() ? nearest() : act]).getBoundingClientRect().top;
    b = ease(clamp((V - 24 - (y + 36)) / 80)) * ease(clamp((y - 24) / 80));
    fly.classList.toggle('slim', b > 0);
    if (b > 0 && !busy) cards[act].classList.add('live');
    if (b <= 0 && was > 0) { stop(); if (v === 'A') act = 0; }
    else if (mob() && busy && b > .5 && nearest() !== act) { stop(); run(nearest()); }
    else if (b >= .9 && !busy) run(mob() ? nearest() : act);
  };
  const onP = () => {
    if (b <= 0) return null;
    const r = $('.ms', cards[act]).getBoundingClientRect();
    let cx = r.left + r.width / 2, cy = r.top + r.height / 2;
    const h = clamp((performance.now() - hop0) / 700);
    if (prev && h < 1) { const q = prev.getBoundingClientRect(), e = ease(h); cx = lerp(q.left + q.width / 2, cx, e); cy = lerp(q.top + q.height / 2, cy, e); }
    return { cx, cy: clamp(cy, 40, innerHeight - 40), s: 36, b };
  };
  SCROLLS.add(onS); POS.add(onP);
  rest();
  MORE = { off() { stop(); SCROLLS.delete(onS); POS.delete(onP); fly.classList.remove('slim'); } };
  $$('.rv [data-mo]').forEach((x) => x.setAttribute('aria-pressed', x.dataset.mo === v));
  try { localStorage.setItem('gk-more', v); } catch (e) {}
  tick();
}
$$('.rv [data-mo]').forEach((x) => x.addEventListener('click', () => mountMore(x.dataset.mo)));

// C: her week. Each thing she says paints onto it: the runs, where the money went, who still owes her
const WD = [['Mon', 12, 320], ['Tue', 13, 1240], ['Wed', 14, 860], ['Thu', 15, 410], ['Fri', 16, 1690], ['Sat', 17], ['Sun', 18]];
const WRUN = { 1: ['Easy run', '4 km', 1], 3: ['Tempo run', '5 km', 1], 6: ['Long run', '8 km', 0] };
const WSAY = [['I want to run a half marathon in December', 'gcal'], ['How much have I spent this week?', 'gk'], ['Remind me if Akash doesn’t pay by Friday', 'gk']];
const WT3 = () => `<section class="more C" id="more" aria-labelledby="h-more"><div class="stage">
  <div class="wrap dh"><h2 id="h-more">It keeps track, so you don’t.</h2>
    <p class="d">Goals, money, and the people you’re waiting on, all on the same week. It notices what didn’t happen.</p></div>
  <div class="wrap wk">
    <div class="wsay"><span class="wms" aria-hidden="true"></span><p class="tx2"></p></div>
    <div class="bd" aria-hidden="true">
      <div class="dys">${WD.map(([d, n, v], j) => `<div class="dc${j === 4 ? ' td' : ''}${j > 4 ? ' fu' : ''}"><span class="dn2">${d}<b>${n}</b></span>
        ${WRUN[j] ? `<span class="rn"><span class="em">🏃</span><span class="x"><span class="nm">${WRUN[j][0]}</span><small>${WRUN[j][1]}</small></span>${WRUN[j][2] ? ck : CKO}</span>` : '<span></span>'}<span class="lane"></span>
        <span class="sp2">${v ? `<i style="--h:${Math.round(v / 1690 * 100)}%;--j:${j}"></i><b style="--j:${j}">${rup(v)}</b>` : '<b class="no" style="--j:0">–</b>'}${j === 2 ? `<span class="pay"><img src="${B.phonepe}" alt="">₹450 · Swiggy</span>` : ''}</span></div>`).join('')}</div>
      <div class="thr"><i></i><span class="a"><span class="em">🙋</span>Asked Akash for ₹1,200</span><span class="z"><span class="em">⏰</span>10 AM</span></div>
      <div class="bot"><ul class="sum">
          <li class="s0"><span class="em">🎯</span><b>Half marathon</b><small>Week 3 of 12 · three runs on your calendar</small></li>
          <li class="s1"><span class="em">💸</span><b class="wtot">₹4,520 this week</b><small>₹600 less than last week</small></li>
          <li class="s2"><span class="em">⏳</span><b>Akash</b><small>Nothing yet, so it asks</small></li></ul>
        <div class="bub2"><p class="fh">Friday · 10:00 AM</p><p class="bub">Did Akash pay the ₹1,200?</p>
          <div class="fa"><div class="chips ab"><span>He did</span><span class="n">Nudge him</span><span>Drop it</span></div>
          <div class="dr ab"><p>“Hi Akash, a quick reminder about the ₹1,200 for the electricity bill 🙂”</p><span class="go"><img src="${B.whatsapp}" alt="">Send on WhatsApp</span></div></div></div></div>
    </div>
  </div></div></section>`;
function mountWeek() {
  $('#morew').innerHTML = WT3();
  const sec = $('#more'), bd = $('.bd', sec), st = $('.tx2', sec), slot = $('.wms', sec), wk = $('.wk', sec), N = 3, WP = .7;
  const LAY = [['l0'], ['l1', 'l1b', 'l1c'], ['l2', 'l2b', 'l2c', 'l2d']], LW = [[900], [1000, 1300, 900], [1900, 1200, 800, 1200]];
  const tot = $('.wtot', sec), TOT = (v) => (tot.textContent = rup(v) + ' this week');
  const paint = (n) => { LAY.forEach((ls, k) => ls.forEach((c) => bd.classList.toggle(c, k < n))); TOT(4520); };
  let built = 0, target = 0, gen = 0, tok = 0, busy = false, b = 0;
  const W = (ms, my) => new Promise((res, rej) => { if (RM) return my === tok ? res() : rej(STOP); setTimeout(() => (my === tok ? res() : rej(STOP)), ms); });
  async function play(i, fast) {
    const my = ++tok, T = (ms, f) => (fast() ? f : ms);
    try {
      flyTo(); st.innerHTML = ''; await W(T(350, 150), my);
      $('.i-app', fly).innerHTML = logo(WSAY[i][1]);
      flyTo('listen'); flyListen(600); await W(T(450, 150), my);
      st.innerHTML = '<span class="caret"></span>'; const caret = $('.caret', st);
      for (const t of WSAY[i][0].split(/(?<= )/)) {
        const w = document.createElement('span'); w.className = 'w'; w.textContent = t;
        caret.before(w); w.offsetWidth; w.classList.add('on'); flyListen(PACE + 400);
        setTimeout(() => w.classList.add('set'), T(420, 140));
        await W(T(PACE, 95), my);
      }
      await W(T(AFTER, 200), my); caret.remove();
      flyTo('think'); await W(T(1200, 450), my); flyTo('app');
      const ls = LAY[i];
      if (i === 1 && !RM) { const t0 = performance.now(); const f = (n) => { const q = clamp((n - t0) / 900); TOT(Math.round(4520 * ease(q) / 10) * 10); if (q < 1) requestAnimationFrame(f); }; TOT(0); requestAnimationFrame(f); }
      for (let k = 0; k < ls.length; k++) { bd.classList.add(ls[k]); await W(T(LW[i][k], 300), my); }
      fly.classList.add('done');
      return true;
    } catch (e) { if (e !== STOP) console.error(e); return false; }
  }
  const run = async () => {
    if (busy) return; busy = true; const g = gen;
    while (g === gen && target > built) {
      const i = built; wk.classList.add('live');
      const ok = await play(i, () => target > i + 1); if (!ok || g !== gen) break;
      built = i + 1;
      if (target > built) await new Promise((r) => setTimeout(r, RM ? 0 : 600));
    }
    if (g === gen) busy = false;
  };
  const halt = () => { gen++; tok++; busy = false; };
  const onS = () => {
    const V = innerHeight, y = scrollY - sec.offsetTop, end = (PE + N * WP) * V;
    const sc = clamp((y - PE * V) / (WP * V), 0, N - 1e-6);
    b = ease(clamp((y + .35 * V) / (.35 * V))) * (1 - ease(clamp((y - end - .02 * V) / (.28 * V))));
    const live = y > -.05 * V && y < end + .6 * V, t = live ? Math.floor(sc) + 1 : y <= -.05 * V ? 0 : target;
    if (y < -.6 * V && built) { halt(); built = target = 0; paint(0); st.innerHTML = ''; flyTo(); wk.classList.remove('live'); return; }
    if (y > end + .9 * V && busy) { halt(); built = target; paint(built); st.textContent = WSAY[built - 1][0]; flyTo(); return; }
    if (t < built) { halt(); built = target = t; paint(t); st.textContent = t ? WSAY[t - 1][0] : ''; flyTo(t ? 'done' : undefined); }
    else if (t !== target) { target = t; run(); }
  };
  const onP = () => { if (b <= 0) return null; const r = slot.getBoundingClientRect(); return { cx: r.left + r.width / 2, cy: r.top + r.height / 2, s: 48, b }; };
  SCROLLS.add(onS); POS.add(onP);
  const size = () => (sec.style.height = innerHeight * (1 + PE + N * WP + PX) + 'px');
  size(); addEventListener('resize', size);
  MORE = { off() { halt(); SCROLLS.delete(onS); POS.delete(onP); removeEventListener('resize', size); fly.classList.remove('slim'); flyTo(); } };
  $$('.rv [data-mo]').forEach((x) => x.setAttribute('aria-pressed', x.dataset.mo === 'C'));
  try { localStorage.setItem('gk-more', 'C'); } catch (e) {}
  tick();
}

// D: no board. What it keeps is written back, one sentence per thing said, the live parts set inline
const LCH = {
  tk: `<span class="ch g ltk">${Array.from({ length: 12 }, (_, j) => `<i class="${j < 3 ? 'f' : ''}" style="--j:${j}"></i>`).join('')}<small>3/12</small></span>`,
  r1: `<span class="ch g"><span class="em">🏃</span>Tue · 4 km<span class="ck" style="--j:0">${CHK}</span></span>`,
  r2: `<span class="ch g"><span class="em">🏃</span>Thu · 5 km<span class="ck" style="--j:1">${CHK}</span></span>`,
  r3: `<span class="ch g"><span class="em">🏃</span>Sun · 8 km</span>`,
  amt: `<b class="lamt"><span class="lgh">₹4,520</span><span class="cn">₹4,520</span></b>`,
  sp: `<span class="ch m spk">${WD.map(([, , v], j) => v ? `<i style="--h:${(v / 1690 * 1.05).toFixed(2)}em;--j:${j}"></i>` : `<i class="no" style="--j:${j}"></i>`).join('')}</span>`,
  sw: `<span class="ch m"><img src="${B.swiggy}" alt="">Swiggy · ₹1,860</span>`,
  tm: `<span class="ch f"><span class="em">⏰</span>Fri 10 AM</span>`,
  ak: `<span class="ch f"><span class="em">🙋</span>Akash</span>`,
  wa: `<span class="ch f lwa"><img src="${B.whatsapp}" alt="">Send on WhatsApp</span>`,
};
const LS = [
  'Twelve weeks to race day, and you’re in week three {tk}. {r1} and {r2} are done, {r3} is next.',
  'You’ve spent {amt} this week {sp}, ₹600 less than last week, most of it on {sw}.',
  'On Friday at {tm} it asks if {ak} paid the ₹1,200. If not, the nudge is already written {wa}',
];
const LT = () => `<section class="more D" id="more" aria-labelledby="h-more"><div class="stage">
  <div class="wrap dh"><h2 id="h-more">It keeps track, so you don’t.</h2>
    <p class="d">Goals, money, and the people you’re waiting on. Say it once, and it keeps count.</p></div>
  <div class="wrap pz">
    <div class="wsay"><span class="wms" aria-hidden="true"></span><p class="tx2"></p></div>
    <p class="para">${LS.map((t, i) => t.split(' ').map((w) => `<span class="q${/\{/.test(w) ? ' c' : ''}" data-i="${i}">${w.replace(/\{(\w+)\}/g, (_, k) => LCH[k])}</span>`).join(' ')).join(' ')}</p>
  </div></div></section>`;
function mountLine() {
  $('#morew').innerHTML = LT();
  const sec = $('#more'), para = $('.para', sec), st = $('.tx2', sec), slot = $('.wms', sec), N = 3, WP = .7;
  const qs = (i) => $$(`.q[data-i="${i}"]`, para), cn = $('.lamt .cn', para), AMT = (v) => (cn.textContent = rup(v));
  const paint = (n) => { $$('.q', para).forEach((q) => q.classList.toggle('on', +q.dataset.i < n)); para.classList.toggle('go', n >= 3); para.classList.remove('dim'); AMT(4520); };
  let built = 0, target = 0, gen = 0, tok = 0, busy = false, b = 0;
  const W = (ms, my) => new Promise((res, rej) => { if (RM) return my === tok ? res() : rej(STOP); setTimeout(() => (my === tok ? res() : rej(STOP)), ms); });
  async function play(i, fast) {
    const my = ++tok, T = (ms, f) => (fast() ? f : ms);
    try {
      flyTo(); st.innerHTML = ''; await W(T(350, 150), my);
      $('.i-app', fly).innerHTML = logo(WSAY[i][1]);
      if (i) para.classList.add('dim');
      flyTo('listen'); flyListen(600); await W(T(450, 150), my);
      st.innerHTML = '<span class="caret"></span>'; const caret = $('.caret', st);
      for (const t of WSAY[i][0].split(/(?<= )/)) {
        const w = document.createElement('span'); w.className = 'w'; w.textContent = t;
        caret.before(w); w.offsetWidth; w.classList.add('on'); flyListen(PACE + 400);
        setTimeout(() => w.classList.add('set'), T(420, 140));
        await W(T(PACE, 95), my);
      }
      await W(T(AFTER, 200), my); caret.remove();
      flyTo('think'); await W(T(1200, 450), my); flyTo('app'); para.classList.remove('dim');
      for (const q of qs(i)) {
        q.classList.add('on');
        if (q.querySelector('.lamt') && !RM) { const t0 = performance.now(); const f = (n) => { const k = clamp((n - t0) / 1000); AMT(Math.round(4520 * ease(k) / 10) * 10); if (k < 1) requestAnimationFrame(f); }; AMT(0); requestAnimationFrame(f); }
        await W(T(q.classList.contains('c') ? 300 : 85, 40), my);
      }
      await W(T(i === 2 ? 900 : 1500, 300), my);
      if (i === 2) { para.classList.add('go'); await W(T(900, 200), my); }
      fly.classList.add('done');
      return true;
    } catch (e) { if (e !== STOP) console.error(e); return false; }
  }
  const run = async () => {
    if (busy) return; busy = true; const g = gen;
    while (g === gen && target > built) {
      const i = built, ok = await play(i, () => target > i + 1); if (!ok || g !== gen) break;
      built = i + 1;
      if (target > built) await new Promise((r) => setTimeout(r, RM ? 0 : 600));
    }
    if (g === gen) busy = false;
  };
  const halt = () => { gen++; tok++; busy = false; };
  const onS = () => {
    const V = innerHeight, y = scrollY - sec.offsetTop, end = (PE + N * WP) * V;
    const sc = clamp((y - PE * V) / (WP * V), 0, N - 1e-6);
    b = ease(clamp((y + .35 * V) / (.35 * V))) * (1 - ease(clamp((y - end - .02 * V) / (.28 * V))));
    const live = y > -.05 * V && y < end + .6 * V, t = live ? Math.floor(sc) + 1 : y <= -.05 * V ? 0 : target;
    if (y < -.6 * V && built) { halt(); built = target = 0; paint(0); st.innerHTML = ''; flyTo(); return; }
    if (y > end + .9 * V && busy) { halt(); built = target; paint(built); st.textContent = WSAY[built - 1][0]; flyTo(); return; }
    if (t < built) { halt(); built = target = t; paint(t); st.textContent = t ? WSAY[t - 1][0] : ''; flyTo(t ? 'done' : undefined); }
    else if (t !== target) { target = t; run(); }
  };
  const onP = () => { if (b <= 0) return null; const r = slot.getBoundingClientRect(); return { cx: r.left + r.width / 2, cy: r.top + r.height / 2, s: 48, b }; };
  SCROLLS.add(onS); POS.add(onP);
  const size = () => (sec.style.height = innerHeight * (1 + PE + N * WP + PX) + 'px');
  size(); addEventListener('resize', size);
  MORE = { off() { halt(); SCROLLS.delete(onS); POS.delete(onP); removeEventListener('resize', size); fly.classList.remove('slim'); flyTo(); } };
  $$('.rv [data-mo]').forEach((x) => x.setAttribute('aria-pressed', x.dataset.mo === 'D'));
  tick();
}

// apps: what you say opens the right app with it filled in; the last tap stays yours
const AT = ['swiggy', 'gmail', 'maps', 'zomato', 'blinkit', 'meet', 'amazon', 'uber', 'gcal', 'whatsapp', 'zepto', 'flipkart', 'zoom', 'instamart'];
const AS = [
  ['Order a chicken biryani from Paradise', 'swiggy', 'Swiggy · in your cart', 'Chicken biryani, Paradise · ₹389', 'Pay on Swiggy'],
  ['Book an Uber to the airport', 'uber', 'Uber · trip set, you tap Book', 'Home → Airport, Terminal 2', 'Open Uber'],
  ['Text Riya to bring my charger', 'whatsapp', 'WhatsApp · to Riya', '“Hey Riya, can you bring my charger?”', 'Send on WhatsApp'],
  ['Reply to Rahul saying Friday 4 works', 'gmail', 'Gmail · Re: Design review', '“Friday at 4 works for me. See you then.”', 'Send in Gmail'],
];
// where each one floats: [u, v] inside its free area, and its size
const APD = [[[.22, .06], [.72, .19], [.36, .35], [.86, .49], [.16, .63], [.62, .79], [.3, .96]], [[.8, .08], [.3, .21], [.66, .37], [.14, .52], [.84, .66], [.38, .82], [.76, .97]]];
const APM = [[[.07, .3], [.23, .78], [.38, .22], [.53, .74], [.68, .28], [.82, .8], [.95, .32]], [[.06, .7], [.2, .22], [.36, .76], [.5, .26], [.65, .74], [.8, .2], [.94, .7]]];
const ASZ = [64, 52, 72, 56, 60, 68, 50];
function mountApps() {
  $('#appw').innerHTML = `<section class="apps" id="apps" aria-labelledby="h-apps"><div class="stage">
    <div class="atl" aria-hidden="true">${AT.map((a) => `<span class="at"><img src="${B[a]}" alt=""></span>`).join('')}</div>
    <div class="ac"><div class="dh"><h2 id="h-apps">Your apps, already filled in.</h2>
      <p class="d">It opens Uber, Swiggy or WhatsApp with everything in place. It never books, pays or sends on its own. The last tap is yours.</p></div>
      <div class="wsay"><span class="wms" aria-hidden="true"></span><p class="tx2"></p></div>
      <div class="ho" aria-live="polite"><div class="hr"><span class="hs"></span><div class="hx"><small></small><p></p></div></div><span class="hb"></span></div>
    </div></div></section>`;
  const sec = $('#apps'), stg = $('.stage', sec), ac = $('.ac', sec), st = $('.tx2', sec), slot = $('.wms', sec), ho = $('.ho', sec), hs = $('.hs', sec), N = AS.length, WP = .7;
  const els = $$('.at', sec), T = els.map((el, j) => ({ el, x: 0, y: 0, s: 56, r: (j * 37 % 15) - 7, ph: j * 1.7, z: .4 + (j * 23 % 10) / 10, p: 0, g: 0 }));
  let enter = 0, prog = 0, dim = 0, raf = 0, last = 0, hx = 0, hy = 0, built = 0, target = 0, gen = 0, tok = 0, busy = false, b = 0;
  const lay = () => {
    const W = stg.clientWidth, H = stg.clientHeight, sr = stg.getBoundingClientRect(), r = ac.getBoundingClientRect(), top = r.top - sr.top, bot = r.bottom - sr.top;
    const ph = innerWidth <= 1024 && stg.clientHeight > innerWidth * .9, cap = innerWidth <= 720 ? 46 : 64;
    T.forEach((t, j) => {
      const side = j % 2, k = j >> 1;
      if (ph) {
        const [u, v] = APM[side][k], y0 = side ? bot + 14 : 10, y1 = side ? H - 10 : top - 14, bh = y1 - y0;
        t.s = clamp(Math.min(cap, bh * .5), 0, cap); t.x = 16 + u * (W - 32); t.y = y0 + v * bh; t.hide = bh < 50;
      } else {
        const [u, v] = APD[side][k], x0 = side ? r.right - sr.left + 40 : 12, x1 = side ? W - 12 : r.left - sr.left - 40, sw = x1 - x0;
        t.s = Math.min(ASZ[k] * clamp(innerHeight / 900, .75, 1.1), sw * .5); t.x = x0 + u * sw; t.y = 70 + v * (H - 140); t.hide = sw < 50;
      }
    });
  };
  const frame = (now) => {
    const dt = Math.min(64, now - (last || now)); last = now;
    const any = T.some((t) => t.g); dim += ((any ? 1 : 0) - dim) * Math.min(1, dt / 220);
    const W = stg.clientWidth, H = stg.clientHeight, e = ease(enter), tm = now / 1000, sr = stg.getBoundingClientRect(), q = hs.getBoundingClientRect();
    hx = q.left - sr.left + q.width / 2; hy = q.top - sr.top + q.height / 2;
    T.forEach((t) => {
      t.p = clamp(t.p + (t.g ? 1 : -1) * dt / 650); const k = ease(t.p);
      const cx = W / 2 + (t.x - W / 2) * lerp(1.5, 1, e), cy = H / 2 + (t.y - H / 2) * lerp(1.5, 1, e) + (prog - .5) * -90 * t.z + (RM ? 0 : Math.sin(tm * .8 + t.ph) * 5 * (1 - k));
      const x = lerp(cx, hx, k), y = lerp(cy, hy, k), sc = lerp(1, 60 / t.s * (hs.offsetWidth / 60), k) * lerp(.6, 1, e), rot = lerp(t.r + (RM ? 0 : Math.sin(tm * .6 + t.ph) * 2), 0, k);
      t.el.style.width = t.el.style.height = t.s + 'px';
      t.el.style.transform = `translate(${x - t.s / 2}px,${y - t.s / 2}px) rotate(${rot}deg) scale(${sc})`;
      t.el.style.opacity = t.hide && !t.g ? 0 : e * lerp(1, .38, dim * (1 - k));
      t.el.style.zIndex = t.g || t.p > 0 ? 2 : 0;
    });
    raf = requestAnimationFrame(frame);
  };
  const run3 = (on) => { if (on && !raf) { last = 0; lay(); raf = requestAnimationFrame(frame); } else if (!on && raf) { cancelAnimationFrame(raf); raf = 0; } };
  const pick = (a, now) => T.forEach((t, j) => { t.g = AT[j] === a ? 1 : 0; if (now) t.p = t.g; });
  const show = (i) => { const d = AS[i]; $('.hx small', ho).textContent = d[2]; $('.hx p', ho).textContent = d[3]; $('.hb', ho).textContent = d[4]; ho.classList.add('on'); };
  const paint = (n) => { if (n) { pick(AS[n - 1][1], true); show(n - 1); } else { pick(null, true); ho.classList.remove('on'); } };
  const W = (ms, my) => new Promise((res, rej) => { if (RM) return my === tok ? res() : rej(STOP); setTimeout(() => (my === tok ? res() : rej(STOP)), ms); });
  async function play(i, fast) {
    const my = ++tok, Tm = (ms, f) => (fast() ? f : ms), d = AS[i];
    try {
      flyTo(); pick(null); ho.classList.remove('on'); st.innerHTML = ''; await W(Tm(450, 150), my);
      $('.i-app', fly).innerHTML = logo('gk');
      flyTo('listen'); flyListen(600); await W(Tm(450, 150), my);
      st.innerHTML = '<span class="caret"></span>'; const caret = $('.caret', st);
      for (const t of d[0].split(/(?<= )/)) {
        const w = document.createElement('span'); w.className = 'w'; w.textContent = t;
        caret.before(w); w.offsetWidth; w.classList.add('on'); flyListen(PACE + 400);
        setTimeout(() => w.classList.add('set'), Tm(420, 140));
        await W(Tm(PACE, 95), my);
      }
      await W(Tm(AFTER, 200), my); caret.remove();
      flyTo('think'); await W(Tm(1100, 400), my); flyTo('app');
      pick(d[1]); await W(Tm(550, 250), my); show(i); await W(Tm(2200, 400), my);
      fly.classList.add('done');
      return true;
    } catch (e) { if (e !== STOP) console.error(e); return false; }
  }
  const run = async () => {
    if (busy) return; busy = true; const g = gen;
    while (g === gen && target > built) {
      const i = built, ok = await play(i, () => target > i + 1); if (!ok || g !== gen) break;
      built = i + 1;
      if (target > built) await new Promise((r) => setTimeout(r, RM ? 0 : 500));
    }
    if (g === gen) busy = false;
  };
  const halt = () => { gen++; tok++; busy = false; };
  const onS = () => {
    const V = innerHeight, y = scrollY - sec.offsetTop, end = (PE + N * WP) * V;
    enter = clamp((y + V) / (.9 * V)); prog = clamp((y + V) / (end + 2 * V));
    run3(y > -1.1 * V && y < end + 1.2 * V);
    const sc = clamp((y - PE * V) / (WP * V), 0, N - 1e-6);
    b = ease(clamp((y + .35 * V) / (.35 * V))) * (1 - ease(clamp((y - end - .02 * V) / (.28 * V))));
    const live = y > -.05 * V && y < end + .6 * V, t = live ? Math.floor(sc) + 1 : y <= -.05 * V ? 0 : target;
    if (y < -.6 * V && built) { halt(); built = target = 0; paint(0); st.innerHTML = ''; flyTo(); return; }
    if (y > end + .9 * V && busy) { halt(); built = target; paint(built); st.textContent = AS[built - 1][0]; flyTo(); return; }
    if (t < built) { halt(); built = target = t; paint(t); st.textContent = t ? AS[t - 1][0] : ''; flyTo(t ? 'done' : undefined); }
    else if (t !== target) { target = t; run(); }
  };
  const onP = () => { if (b <= 0) return null; const r = slot.getBoundingClientRect(); return { cx: r.left + r.width / 2, cy: r.top + r.height / 2, s: 48, b }; };
  SCROLLS.add(onS); POS.add(onP);
  const size = () => { sec.style.height = innerHeight * (1 + PE + N * WP + PX) + 'px'; if (raf) lay(); };
  size(); addEventListener('resize', size);
  tick();
}

// the end: the mark flies into "Your turn", then down into the name, where it is the o
function mountEnd() {
  const fin = $('#join'), ft = $('.ft'), h1 = $('.hs2', fin), wo = $('.wo', ft), wm = $('.wm', ft), wl = $('.wl', ft), wcs = $$('.wc', ft);
  const form = $('.sg', fin), em = $('#em'), ok = $('.ok', fin);
  new IntersectionObserver((es) => es.forEach((e) => e.isIntersecting && fin.classList.add('in')), { threshold: .25 }).observe(fin);
  form.addEventListener('submit', (e) => {
    e.preventDefault();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(em.value.trim())) { form.classList.remove('bad'); form.offsetWidth; form.classList.add('bad'); ok.textContent = 'That email doesn’t look right.'; em.focus(); return; }
    const url = form.dataset.endpoint;
    if (!url) { ok.textContent = 'The early access list opens soon. Check back in a few days.'; return; }
    ok.textContent = 'Sending…';
    fetch(url, { method: 'POST', headers: { Accept: 'application/json' }, body: new URLSearchParams({ email: em.value.trim() }) })
      .then((r) => { if (!r.ok) throw r; ok.innerHTML = '<b>You’re on the list.</b> We’ll email you when it’s ready.'; em.value = ''; })
      .catch(() => { ok.textContent = 'That didn’t go through. Try again in a minute.'; });
  });
  // the name fills the width
  const fit = () => { wm.style.fontSize = '100px'; wm.classList.add('fit'); const w = wl.getBoundingClientRect().width; wm.classList.remove('fit'); wm.style.fontSize = Math.min(100 * (innerWidth - 2 * (innerWidth <= 720 ? 12 : 20)) / w, 420) + 'px'; };
  fit(); addEventListener('resize', fit); document.fonts && document.fonts.ready.then(fit);
  // the time, said the way the app would
  const now = $('.now', ft), say = $('.say', ft);
  const clock = () => {
    const d = new Date(), h = d.getHours();
    now.textContent = d.toLocaleTimeString('en-IN', { hour: 'numeric', minute: '2-digit', hour12: true }).replace(/\s?(am|pm)/i, (m) => ' ' + m.trim().toUpperCase()) + '.';
    say.textContent = h < 5 ? 'Say it now, sleep on it.' : h < 12 ? 'What’s on today?' : h < 17 ? 'Anything to add to today?' : 'Anything for tomorrow?';
  };
  clock(); setInterval(clock, 20000);
  let b = 0, m = 0, lis = null;
  const onS = () => {
    const V = innerHeight, r = wl.getBoundingClientRect();
    // the name rises letter by letter as it comes up the screen
    const left = document.documentElement.scrollHeight - V - scrollY, q = clamp(1 - left / (r.height * 1.3 + 60));
    wcs.forEach((c, j) => c.style.setProperty('--r', 1 - ease(clamp(q * 1.8 - j * .08))));
    const a = h1.getBoundingClientRect();
    b = ease(clamp((V * .92 - a.top) / (V * .3)));
    m = ease(clamp(1 - left / (V * .45)));
    // home: in the name it listens, and keeps listening
    const home = m > .97;
    if (home && !lis) { lis = true; wm.classList.add('on'); fly.classList.add('home'); flyTo('listen'); }
    else if (!home && lis) { lis = false; wm.classList.remove('on'); fly.classList.remove('home'); flyTo(); }
    else if (!home && b > .05 && /\b(listen|think|app|done)\b/.test(fly.className)) flyTo();
  };
  const onP = () => {
    if (b <= 0) return null;
    const a = h1.getBoundingClientRect(), o = wo.getBoundingClientRect();
    return { cx: lerp(a.left + a.width / 2, o.left + o.width / 2, m), cy: lerp(a.top + a.height / 2, o.top + o.height / 2, m), s: lerp(a.height, o.height, m), b };
  };
  CLICKS.add(() => { if (b > .9 && m < .5) { em.focus({ preventScroll: true }); return true; } return false; });
  SCROLLS.add(onS); POS.add(onP); tick();
}

const setTheme = (t) => {
  if (t === 'auto') document.documentElement.removeAttribute('data-theme'); else document.documentElement.dataset.theme = t;
  $$('.rv [data-t]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.t === t));
  try { localStorage.setItem('gk-theme', t); } catch (e) {}
};
$$('.rv [data-t]').forEach((b) => b.addEventListener('click', () => setTheme(b.dataset.t)));
// the nav's own switch: whatever it looks like now, go the other way
const isDark = () => document.documentElement.dataset.theme ? document.documentElement.dataset.theme === 'dark' : matchMedia('(prefers-color-scheme: dark)').matches;
document.addEventListener('click', (e) => { const b = e.target.closest('.thm'); if (!b) return; setTheme(isDark() ? 'light' : 'dark'); });
const setRuler = (r) => {
  const d = $('#day'); if (d) { d.classList.remove('rA', 'rB', 'rC'); d.classList.add('r' + r); }
  $$('.rv [data-ru]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.ru === r));
};
$$('.rv [data-ru]').forEach((b) => b.addEventListener('click', () => setRuler(b.dataset.ru)));
const setLogo = (l) => {
  document.documentElement.classList.toggle('lg-m', l === 'm');
  $$('.rv [data-lg]').forEach((b) => b.setAttribute('aria-pressed', b.dataset.lg === l));
};
$$('.rv [data-lg]').forEach((b) => b.addEventListener('click', () => setLogo(b.dataset.lg)));
// welcome: the name comes up, its o becomes the mark and listens, then it all flies to the corner
function intro() {
  if (RM || $('.intro')) return;
  const html = document.documentElement, ov = document.createElement('div');
  ov.className = 'intro'; ov.setAttribute('aria-hidden', 'true');
  let j = 0; const L = (c) => `<span class="il" style="--j:${j++}">${c}</span>`;
  ov.innerHTML = `<span class="gkw">${L('G')}<span class="lo live"><span>${LOB}</span></span>${[...'alkeeper'].map(L).join('')}</span>`;
  document.body.append(ov); html.classList.add('intro-on'); html.style.overflow = 'hidden'; scrollTo(0, 0);
  const lg = $('.gkw', ov), lo = $('.lo', ov), ts = [];
  const at = (ms, f) => ts.push(setTimeout(f, ms));
  const end = () => { ts.forEach(clearTimeout); html.classList.remove('intro-on'); html.style.overflow = ''; ov.remove(); };
  const skip = () => { ts.forEach(clearTimeout); ov.classList.add('fade'); html.classList.remove('intro-on'); html.style.overflow = ''; setTimeout(() => ov.remove(), 400); };
  ov.addEventListener('click', skip); addEventListener('keydown', skip, { once: true }); ov.addEventListener('wheel', skip, { passive: true }); ov.addEventListener('touchmove', skip, { passive: true });
  requestAnimationFrame(() => requestAnimationFrame(() => ov.classList.add('up')));
  at(1100, () => ov.classList.add('wide'));
  at(2700, () => lo.classList.remove('live'));
  at(3100, () => {
    // line the big o up with the small one: scale by their heights, move by their corners
    const m = html.classList.contains('lg-m'), t = $('#live .brand ' + (m ? '.bm' : '.lo')), o = lg.getBoundingClientRect(), a = (m ? lg : lo).getBoundingClientRect(), b = t.getBoundingClientRect();
    const k = b.height / a.height;
    lg.style.transform = `translate(${b.left - o.left - (a.left - o.left) * k}px,${b.top - o.top - (a.top - o.top) * k}px) scale(${k})`;
    if (html.classList.contains('lg-m')) ov.classList.add('fade');
    ov.classList.add('go');
  });
  at(4150, end);
}
{
  let t = 'auto'; try { t = localStorage.getItem('gk-theme') || 'auto'; } catch (e) {}
  setTheme(t);
  setLogo('w');
  setRuler('C');
  mount('1');
  mountW();
  mountMore('D');
  mountApps();
  mountEnd();
  let seen = false; try { seen = !!sessionStorage.getItem('gk-intro'); sessionStorage.setItem('gk-intro', '1'); } catch (e) {}
  if (!seen && !location.hash) intro();
}
