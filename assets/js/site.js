/* Goalkeeper website: the page’s own motion and wiring. Runs after boards.js and kit.js. */
(() => {
  const $ = (s) => document.querySelector(s);
  const RM = GK.RM;
  const ck = () => `<b>${GK.svg('check', 3.2)}</b>`;
  $('#psay').innerHTML = GK.svg('mic') + 'Say something';
  ['#mk1', '#mk2'].forEach((s) => ($(s).innerHTML = GK.MARK));
  const seen = (el, f, th = 0.3) => new IntersectionObserver((es) => es.forEach((e) => f(e.isIntersecting)), { threshold: th }).observe(el);

  /* the pill listens whenever words are landing */
  const pill = $('#pill'), dots = [...pill.querySelectorAll('.dots i')];
  let lt = null, lUntil = 0;
  function listen(ms) {
    if (RM) return;
    lUntil = Math.max(lUntil, performance.now() + ms);
    pill.classList.add('listen');
    if (!lt) lt = setInterval(() => {
      if (performance.now() > lUntil) { clearInterval(lt); lt = null; pill.classList.remove('listen'); dots.forEach((d) => (d.style.height = '')); return; }
      const lv = .35 + .65 * Math.random(); [.55, .85, 1, .85, .55].forEach((s, i) => (dots[i].style.height = (8 + 24 * lv * s * (.45 + .55 * Math.random())) + 'px'));
    }, 140);
  }
  const words = (said) => said.map(([t, h]) => { const w = t.split(/(?<= )/).filter(Boolean).map((x) => `<span class="w8">${x}</span>`).join(''); return h ? `<span class="hl ${h}">${w}</span>` : w; }).join('');
  const COL = { e: 'var(--c-err)', m: 'var(--c-msg)', b: 'var(--c-meet)', g: 'var(--c-fit)', p: 'var(--c-fam)' };

  /* ---------- hero: you say it, then Goalkeeper lists what it's doing, then answers ---------- */
  const R = [
    ['Manager', [['Book my ', 0], ['Uber to the office', 'e'], [', tell ', 0], ['#design on Slack that standup moves to 11', 'm'], [', and ', 0], ['draft a reply to Rohan', 'b'], [' saying the deck’s ready by 5.', 0]],
      [['uber', 'Setting up your Uber', 'Home to Office, ready to request'], ['slack', 'Writing in #design', '“Heads up, standup moves to 11 today.”'], ['gmail', 'Replying to Rohan', '“Hi Rohan, the deck will be ready by 5.”']],
      'Done. Slack and Rohan’s reply are ready to send, and your Uber’s one tap away.', 18],
    ['Founder', [['What did ', 0], ['investors email me today', 'b'], ['? Remind me ', 0], ['if Meera doesn’t reply by Friday', 'g'], [', and put ', 0], ['this week’s priorities in Notion', 'm'], ['.', 0]],
      [['gmail', 'Reading your inbox', 'Two from investors today'], ['gk', 'Watching for Meera’s reply', 'I’ll tell you Friday morning'], ['notion', 'Writing your priorities page', 'Five things, in order']],
      'Meera wants the new deck, and Arjun confirmed Thursday. Your priorities are in Notion.', 14],
    ['Student', [['Find the ', 0], ['cheapest flights to Goa', 'e'], [' for the long weekend, ', 0], ['make me a 5-day study plan', 'b'], [' before it, and ', 0], ['text the group', 'm'], [' we meet at the library at 4.', 0]],
      [['indigo', 'Searching flights to Goa', 'From about ₹4,800 return'], ['gk', 'Making your study plan', 'Five days, done by Friday'], ['whatsapp', 'Writing to the Physics group', '“Library at 4?” is ready']],
      'Flights from about ₹4,800 return. Your plan is on your calendar, and the group text is ready.', 21],
    ['Parent', [['Get ', 0], ['milk, eggs and atta on Zepto', 'e'], [', book an ', 0], ['Uber to Aarav’s school at 3:15', 'p'], [', and remind me to ', 0], ['pay the electricity bill', 'g'], [' by the 10th.', 0]],
      [['zepto', 'Filling your Zepto cart', 'Three items, your usual brands'], ['uber', 'Planning the school run', 'I’ll open Uber at 3:05'], ['phonepe', 'Setting the bill reminder', 'On the 9th, with PhonePe ready']],
      'Your Zepto cart is ready to pay. I’ll open Uber at 3:05, and remind you about the bill on the 9th.', 16],
  ];
  $('#who').innerHTML = R.map((r) => `<button type="button" role="tab"><i></i><span>${r[0]}</span></button>`).join('');
  const gkc = $('#gkc'), stt = $('#stt'), rec = $('#rec');
  let hk = 0, pinned = false, T = [], heroOn = true, pendingNext = false;
  const clear = () => { T.forEach(clearTimeout); T = []; };
  const at = (ms, f) => T.push(setTimeout(f, ms));
  const state = (s, txt) => { gkc.className = 'gkc ' + s; stt.textContent = txt; rec.classList.toggle('off', s !== 'listen'); };
  function play(k) {
    clear(); hk = k; const [, said, steps, reply, secs] = R[k];
    $('#said').innerHTML = words(said);
    const hs = [...document.querySelectorAll('#said .hl')];
    $('#steps').innerHTML = steps.map(([a, l, r], j) => `<div class="st" style="--c:${COL[(hs[j] && hs[j].classList[1]) || 'b']}">${GK.icon(a)}<span class="tx"><b>${l}</b><span>${r}</span></span><span class="sp20"><b>${GK.svg('check', 3.4)}</b></span></div>`).join('');
    $('#reply').innerHTML = `<span class="mk">${GK.MARK}</span><span>${reply}</span>`; $('#reply').classList.remove('in');
    const ws = [...document.querySelectorAll('#said .w8')], st = [...document.querySelectorAll('#steps .st')];
    if (RM) { state('done', `Done in ${secs} seconds`); hs.forEach((h) => h.classList.add('lit')); st.forEach((s) => s.classList.add('in', 'ok')); $('#reply').classList.add('in'); tabs(k, 0); return; }
    state('listen', 'Listening');
    ws.forEach((w, j) => w.animate([{ opacity: 0, transform: 'translateY(12px)', filter: 'blur(6px)' }, { opacity: 1, transform: 'none', filter: 'blur(0)' }], { duration: 500, delay: 150 + j * 95, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'backwards' }));
    const tEnd = 150 + ws.length * 95 + 400;
    listen(tEnd - 200);
    at(tEnd, () => state('work', `On it · ${st.length} things`));
    st.forEach((s, j) => {
      const a = tEnd + 250 + j * 700;
      at(a, () => { s.classList.add('in', 'run'); hs[j] && hs[j].classList.add('lit', 'now'); });
      at(a + 1500, () => { s.classList.add('ok'); s.classList.remove('run'); hs[j] && hs[j].classList.remove('now'); });
    });
    const tDone = tEnd + 250 + (st.length - 1) * 700 + 1700;
    at(tDone, () => { state('done', `Done in ${secs} seconds`); $('#reply').classList.add('in'); });
    const total = tDone + 5200;
    tabs(k, pinned ? 0 : total);
    if (!pinned) at(total, () => { if (heroOn) play((hk + 1) % R.length); else pendingNext = true; });
  }
  function tabs(k, dur) {
    document.querySelectorAll('#who button').forEach((b, j) => {
      b.classList.toggle('on', j === k); b.setAttribute('aria-selected', j === k);
      const i = b.querySelector('i'); i.getAnimations().forEach((a) => a.cancel());
      if (j === k && dur) i.animate([{ width: '0%' }, { width: '100%' }], { duration: dur, easing: 'linear', fill: 'forwards' });
    });
  }
  $('#who').addEventListener('click', (e) => { const b = e.target.closest('button'); if (!b) return; pinned = true; play([...b.parentNode.children].indexOf(b)); });
  seen($('.hero'), (v) => { heroOn = v; document.body.classList.toggle('inhero', v); if (v && pendingNext) { pendingNext = false; play((hk + 1) % R.length); } }, 0.2);
  play(0);

  /* ---------- spreads: each phone plays its own flow, tapping the real buttons, until you touch it ---------- */
  const S = [
    { f: 'Shopping', app: 'instamart', said: [['Add ', 0], ['milk, eggs, bread and atta', 'e'], [' from Instamart.', 0]], did: ['Your usual picked, from past orders.', 'SAVE50 applied. Card offers stay yours to pick.', 'You pay in Swiggy. It never pays for you.'], ans: 'I fill the cart. You pay.', b: 'Cart',
      flow: ['+', '+', { t: '−', w: 1600 }, { t: 'Pay in Swiggy', w: 2600 }, { t: 'All orders', w: 3200 }] },
    { f: 'Food', app: 'swiggy', said: [['Order ', 0], ['my usual biryani', 'e'], [', and ', 0], ['book a table for four on Saturday', 'm'], ['.', 0]], did: ['FLAT75 on. WELCOME100 skipped, it’s for new users.', 'Arrives around 9:20, before your 10 PM meeting.', 'Dineout, Saturday 8 PM, ready to book.'], ans: 'Pay in Swiggy · ₹514.', b: 'Food', flip: 1,
      flow: [{ t: 'Pay in Swiggy', w: 4200 }] },
    { f: 'Orders', app: 'amazon', said: [['Where’s ', 0], ['everything I ordered', 'b'], ['?', 0]], did: ['Swiggy, Amazon and Blinkit, in one list.', 'Read from their own notifications.', 'Flags a parcel that lands while you’re at the gym.'], ans: 'Instamart is here in 10 min.', b: 'OrderPlaced',
      flow: [{ t: 'All orders', w: 6000 }] },
    { f: 'Money', app: 'phonepe', said: [['What did I ', 0], ['spend on food', 'e'], [' this month?', 0]], did: ['From PhonePe, Google Pay and Paytm notifications.', 'Sorted on your phone. Never OTPs or balances.', 'Bills coming up, before they’re due.'], ans: '₹7,180 on food. ₹2,100 less than August by now.', b: 'Spend', flip: 1,
      flow: [{ t: 'Today', w: 2600 }, { t: 'Spending', w: 2200 }, { t: 'Groceries', w: 2200 }, { t: 'Shopping', last: 1, w: 2600 }, { t: 'This month', w: 3000 }, { t: 'Download', w: 2000 }, { t: 'CSV', w: 1800 }, { t: 'Download', last: 1, w: 3000 }] },
    { f: 'Goals', app: 'strava', said: [['Run ', 0], ['a marathon in December', 'g'], ['.', 0]], did: ['Six quick questions. It plays here on its own.', 'A safer road if the jump is too big.', '41 runs on your calendar, around every meeting.'], ans: 'A half in December. The full in spring.', b: 'GoalNew',
      flow: ['Full marathon', { t: 'Under 5 km', w: 3400 }, 'Half in December', '4 days', 'Mornings', 'Just finish', { t: 'Travel in November', w: 3200 }, { t: 'Add 41 runs', w: 3600 }] },
    { f: 'Seeing ahead', app: 'gcal', gk: 1, said: [['Two things at ', 0], ['4:30 on Thursday', 'p'], ['.', 0]], did: ['Looks across Office, Freelance and Personal.', 'Finds a time free on all three.', 'Drafts the note. Meera sees only the message.'], ans: 'Sent. Thursday is clear.', b: 'Clash', flip: 1,
      flow: [{ t: 'See other times', w: 2400 }, 'Fri 11', { t: 'Draft a message', w: 2800 }, { t: 'Send from Freelance', w: 3200 }] },
    { f: 'Trips', app: 'indigo', gk: 1, said: [['Tomorrow, 7:10 AM. ', 0], ['Bengaluru to Mumbai', 'b'], ['.', 0]], did: ['Found in your email: flight, terminal, boarding.', 'Uber for 4:55 AM, alarm at 4:15.', 'Rain in Mumbai after 4. The standup you’ll miss, flagged.'], ans: 'Book Uber for 4:55 AM.', b: 'Prep', st: { tab: 1 },
      flow: [{ scroll: 300, w: 3200 }, { scroll: 0, w: 1800 }, { t: 'Book Uber', any: 1, w: 3000 }] },
    { f: 'On its own', app: 'gk', said: [['Every Friday, ', 0], ['check my invoices', 'g'], ['.', 0]], did: ['Runs on a schedule. No asking.', 'Lumen is 12 days late. A reminder is drafted, not sent.', 'Everything it did on its own, you can undo.'], ans: 'It got on with things while you were in meetings.', b: 'Away', flip: 1,
      flow: [{ t: 'Undo', w: 2600 }, { t: 'Redo', w: 2600 }] },
    { f: 'The widget', app: 'gk', said: [['You don’t even ', 0], ['have to open it', 'g'], ['.', 0]], did: ['What’s next, right on your home screen.', 'Send, Join, Pay in Swiggy, Close the day.', 'It changes through the day, on its own.'], ans: 'Tap. Don’t open.', home: 1 },
  ];
  $('#spreads').innerHTML = S.map((s, i) => `<article class="spread${s.flip ? ' flip' : ''}">
    <div class="txt"><div class="feat">${GK.icon(s.app)}${s.f}${s.gk ? '<span class="by">· Goalkeeper, to you</span>' : ''}</div>
      <p class="q${s.gk ? ' gk' : ''}">“${words(s.said)}”</p>
      <ul class="did">${s.did.map((d) => `<li>${ck()}${d}</li>`).join('')}</ul>
      <p class="ans">${s.ans}</p></div>
    <div class="phw" data-i="${i}"><div></div><div class="auto" data-m="auto"><span class="lv"></span><span class="al">Playing on its own</span><button type="button">Pause</button></div></div></article>`).join('');
  const pk = () => (innerWidth < 560 ? .78 : .74);
  const norm = (e) => e.textContent.replace(/\s+/g, ' ').trim();

  function driver(ph, s, bar) {
    let on = !RM, vis = false, i = 0, t = null, day = null;
    const al = bar.querySelector('.al'), btn = bar.querySelector('button');
    const mode = () => { bar.dataset.m = on ? 'auto' : 'you'; al.textContent = on ? 'Playing on its own' : 'Your turn. Tap anything.'; btn.textContent = on ? 'Pause' : 'Play again'; };
    const find = (step) => {
      const els = [...ph.boards.sr.querySelectorAll('*')].filter((e) => ((e.__on && e.__on.click) || e.tagName === 'A' || (step.any && e.tagName === 'BUTTON')) && norm(e).startsWith(step.t));
      return step.last ? els[els.length - 1] : els[0];
    };
    function tick() {
      clearTimeout(t); if (!on) return;
      if (!vis) { t = setTimeout(tick, 700); return; }
      if (s.home) return;
      if (i >= s.flow.length) { t = setTimeout(() => { if (!on) return; i = 0; ph.board(s.b, s.st); t = setTimeout(tick, 2400); }, 3400); return; }
      const step = typeof s.flow[i] === 'string' ? { t: s.flow[i] } : s.flow[i]; i++;
      if (step.scroll != null) {
        const sc = [...ph.boards.sr.querySelectorAll('*')].find((e) => e.scrollHeight > e.clientHeight + 20 && /auto|scroll/.test(getComputedStyle(e).overflowY));
        if (sc) sc.scrollTo({ top: step.scroll, behavior: 'smooth' });
        t = setTimeout(tick, step.w || 2000); return;
      }
      const el = find(step);
      if (el) { GK.tap(el, ph.cur); setTimeout(() => { if (on) el.click(); }, 280); }
      t = setTimeout(tick, step.w || 2000);
    }
    function start(fresh) {
      on = true; mode();
      if (s.home) { if (!day) day = GK.playDay(ph); day.play(fresh ? 5 : Math.max(0, day.i), 3800); return; }
      if (fresh) { i = 0; ph.board(s.b, s.st); t = setTimeout(tick, 1800); } else tick();
    }
    function stop() { on = false; clearTimeout(t); if (day) day.stop(); mode(); }
    ph.el.addEventListener('pointerdown', (e) => { if (e.isTrusted && on) stop(); });
    btn.addEventListener('click', () => (on ? stop() : start(true)));
    mode();
    return {
      set visible(v) { vis = v; if (s.home && on) { if (v) start(!day); else if (day) day.stop(); } },
      kick() { if (on && !s.home) t = setTimeout(tick, 1800); },
    };
  }

  document.querySelectorAll('.spread').forEach((sp, i) => {
    const s = S[i], host = sp.querySelector('.phw>div'), bar = sp.querySelector('.auto');
    let dv = null;
    seen(sp, (v) => {
      if (v && !dv) { const ph = GK.phone(host, { k: pk(), board: s.b, boardState: s.st, nav: true, home: s.home }); dv = driver(ph, s, bar); dv.visible = true; dv.kick(); }
      else if (dv) dv.visible = v;
      if (!v) return;
      const q = sp.querySelector('.q');
      if (!q.classList.contains('on')) {
        q.classList.add('on');
        const ws = [...q.querySelectorAll('.w8')];
        if (!RM) { ws.forEach((w, j) => w.animate([{ opacity: .12, filter: 'blur(4px)', transform: 'translateY(8px)' }, { opacity: 1, filter: 'blur(0)', transform: 'none' }], { duration: 450, delay: j * 110, easing: 'cubic-bezier(.2,.7,.2,1)', fill: 'backwards' })); if (!s.gk) listen(ws.length * 110 + 300); }
        setTimeout(() => q.classList.add('lit'), RM ? 0 : ws.length * 110 + 200);
      }
    }, 0.35);
  });

  /* ---------- place it: each size is long-pressed, lifted and snapped onto the grid, then comes alive ---------- */
  (() => {
    const pr = (a, b) => ({ pair: [a, b] });
    const COLS = [
      ['a', [[['line', 'line', ['Gym at 8', ' · in 1h 20m']], '4×1', 'One line'], [['tall', 'tall'], '4×4', 'Your whole evening']]],
      ['b', [[['time'], '4×2', 'It’s time'], [pr(['sqSpent', ['₹2,340', '6 payments', [5, 5, 4, 9]]], ['sqNext', ['Modalis', 'Next · 10 PM', 'in 1h 12m']]), '2×2', 'Money, and what’s next'], [['onway', '', [2.2, 8]], '4×2', 'On the way']]],
      ['c', [[['clash'], '4×2', 'Seeing ahead'], [['cart'], '4×2', 'Cart ready'], [pr(['sqMonth'], ['sqDone']), '2×2', 'The month, the day']]],
    ];
    const ICON = { '4×1': [4, 1], '2×2': [2, 2], '4×2': [4, 2], '4×4': [4, 4] };
    $('#sizes').innerHTML = Object.entries(ICON).map(([n, [c, r]]) => `<span><i style="grid-template-columns:repeat(${c},5px)">${'<u></u>'.repeat(c * r)}</i>${n}</span>`).join('');
    const cols = $('#cols'), live = [], slots = [];
    COLS.forEach(([cls, list]) => {
      const col = document.createElement('div'); col.className = 'col ' + cls;
      list.forEach(([it, size, label]) => {
        const slot = document.createElement('div'); slot.className = 'slot2';
        slot.innerHTML = `<div class="tag"><b>${size}</b>${label}</div><div class="drop"><div class="wi"></div></div>`;
        const wi = slot.querySelector('.wi');
        const add = (k, cl, a) => { const w = GK.widget(k, cl, a || []); w.dataset.k = k; w.__args = a || []; wi.appendChild(w); live.push(w); };
        if (it.pair) it.pair.forEach(([k, a]) => add(k, 'sq', a)); else { add(it[0], it[1] || '', it[2]); wi.dataset.k = it[0]; }
        const ang = (slots.length * 47) % 360 * Math.PI / 180;
        wi.style.setProperty('--fx', Math.round(Math.cos(ang) * 50) + 'px'); wi.style.setProperty('--fy', Math.round(Math.sin(ang) * 40 - 30) + 'px'); wi.style.setProperty('--fr', ((slots.length % 2 ? 2 : -2)) + 'deg');
        col.appendChild(slot); slots.push(slot);
      });
      cols.appendChild(col);
    });
    const board = $('#board');
    /* the drop order: the big moment first, then around it */
    const ORDER = [2, 0, 3, 1, 5, 4, 6, 7].filter((i) => slots[i]);
    let placed = false, vis = false;
    function place() {
      if (placed) return; placed = true;
      if (RM) { slots.forEach((s) => s.classList.add('aim', 'on')); return; }
      ORDER.forEach((i, n) => {
        const s = slots[i];
        setTimeout(() => s.classList.add('aim'), 250 + n * 420);
        setTimeout(() => s.classList.add('on'), 250 + n * 420 + 380);
      });
    }
    seen(board, (v) => { vis = v; if (v) place(); }, 0.25);

    /* every button does what it does in the app */
    const DO = { send: ['whatsapp', 'Sent to Monika'], join: ['meet', 'Joining Google Meet'], fix: ['gcal', 'Held Friday 11 for Meera'], swiggy: ['swiggy', 'Swiggy opens to pay ₹505'], phonepe: ['phonepe', 'PhonePe opens with ₹799'], close: ['gk', 'Day closed. Two move to tomorrow.'] };
    const LABEL = { 'Keep both': ['gcal', 'Kept both. I’ll remind you at 4.'], 'See cart': ['instamart', 'Four items, SAVE50 on'], '10 min': ['gk', 'Snoozed for 10 minutes'], Done: ['gk', 'Marked done'], Send: DO.send, Join: DO.join, Nudge: ['whatsapp', 'Nudged Karan'], 'Say something': ['gk', 'Listening…'] };
    const toast = $('#ptoast');
    let tt;
    function act(b) {
      const d = DO[b.dataset.b] || LABEL[b.textContent.trim()] || (b.classList.contains('w-mic') ? ['gk', 'Listening…'] : null);
      GK.tap(b, b.closest('.w'));
      if (!d) return;
      toast.innerHTML = GK.icon(d[0]) + d[1] + GK.svg('check', 2.4).replace('<svg', '<svg class="ck"');
      toast.classList.add('on'); clearTimeout(tt); tt = setTimeout(() => toast.classList.remove('on'), 2000);
    }
    let userTook = false;
    cols.addEventListener('click', (e) => { const b = e.target.closest('.wb,.w-mic,.w-say'); if (!b) return; userTook = true; act(b); });
    if (RM) return;

    /* each widget keeps its own kind and moves the way that widget would */
    const tick = (str, n) => str.replace(/(\d+)h (\d+)m/, (_, h, m) => { let t = +h * 60 + +m - n; if (t < 5) t += 90; return Math.floor(t / 60) + 'h ' + String(t % 60) + 'm'; });
    let beat = 0;
    setInterval(() => {
      if (!vis || !placed) return; beat++;
      live.forEach((w) => {
        const k = w.dataset.k, a = w.__args;
        if (k === 'onway') { let [p] = a; p += 0.16; if (p > 4.4) p = 1.4; w.__args = [p, 0]; w.patch('onway', [Math.min(4, p), Math.max(1, Math.round(9 - p * 2))]); }
        else if (k === 'sqNext' && beat % 3 === 0) { a[2] = tick(a[2], 1); w.patch('sqNext', a); }
        else if (k === 'line' && beat % 3 === 1) { a[1] = tick(a[1], 1); w.patch('line', a); }
        else if (k === 'sqSpent' && beat % 5 === 0) {
          const n = +a[0].replace(/[₹,]/g, '') + [40, 120, 65, 210][beat % 4], mix = a[2].slice(); mix[beat % 4] += 1;
          w.__args = ['₹' + n.toLocaleString('en-IN'), (parseInt(a[1], 10) + 1) + ' payments', mix]; w.patch('sqSpent', w.__args);
        }
      });
      /* until you try one, one button gets tapped every few seconds */
      if (!userTook && beat % 3 === 0) {
        const bs = [...cols.querySelectorAll('.wb.s')].filter((b) => b.offsetParent);
        if (bs.length) act(bs[(beat / 3) % bs.length]);
      }
    }, 1100);
  })();

  /* ---------- time back: the same three things, by hand and by voice ---------- */
  const HAND = [['uber', 'Open Uber', 0], [0, 'Type “Office”', 9], [0, 'Pick a ride', 24], [0, 'Confirm pickup', 38], ['slack', 'Open Slack', 52], [0, 'Find #design', 63], [0, 'Type the update', 76], [0, 'Send', 104], ['gmail', 'Open Gmail', 112], [0, 'Find Rohan’s mail', 126], [0, 'Write the reply', 142], [0, 'Send', 186]];
  const VOICE = [['mic', 'Say it once', 0], ['gk', 'Three things, ready', 9], [0, 'Tap Request', 17]];
  const lane = (cls, name, hops, foot) => `<div class="lane ${cls}"><div class="lh"><b>${name}</b><span class="clk">0:00</span></div><div class="track"><i></i></div>
    <div class="hops">${hops.map(([a, l]) => `<span class="hop${a ? '' : ' t'}">${a === 'mic' ? `<span class="gt mic">${GK.svg('mic', 2.2)}</span>` : a ? GK.icon(a) : ''}${l}</span>`).join('')}</div><div class="lf">${foot}</div></div>`;
  $('#race').innerHTML = lane('', 'By hand', HAND, '<span><b>3</b> apps opened</span><span><b>14</b> taps</span><span><b>3:12</b> of your morning</span>') +
    lane('gk', 'With Goalkeeper', VOICE, '<span><b>0</b> apps opened</span><span><b>1</b> tap</span><span><b>0:20</b>, start to finish</span><span class="gkdone">Done. By hand, you’d still be typing “Office”.</span>');
  const [lh, lg] = document.querySelectorAll('.lane');
  const fmt = (s) => Math.floor(s / 60) + ':' + String(Math.floor(s % 60)).padStart(2, '0');
  let raceVis = false, raceRun = false;
  function race() {
    if (raceRun) return; raceRun = true;
    const rows = [[lh, HAND, 192], [lg, VOICE, 20]];
    rows.forEach(([el]) => { el.querySelectorAll('.hop').forEach((h) => h.classList.remove('in')); el.querySelector('.track i').style.width = '0'; el.querySelector('.clk').textContent = '0:00'; });
    $('.gkdone').classList.remove('in');
    const t0 = performance.now(), SPEED = 22; // simulated seconds per real second
    (function frame(now) {
      const sim = (now - t0) / 1000 * SPEED;
      rows.forEach(([el, hops, end]) => {
        const s = Math.min(sim, end);
        el.querySelector('.clk').textContent = fmt(s);
        el.querySelector('.track i').style.width = (s / 200 * 100) + '%';
        el.querySelectorAll('.hop').forEach((h, j) => { if (s >= hops[j][2]) h.classList.add('in'); });
      });
      if (sim >= 20) $('.gkdone').classList.add('in');
      if (sim < 192) requestAnimationFrame(frame);
      else setTimeout(() => { raceRun = false; if (raceVis) race(); }, 4200);
    })(t0);
  }
  if (RM) { [[lh, '3:12', 96], [lg, '0:20', 10]].forEach(([el, c, w]) => { el.querySelector('.clk').textContent = c; el.querySelector('.track i').style.width = w + '%'; el.querySelectorAll('.hop').forEach((h) => h.classList.add('in')); }); $('.gkdone').classList.add('in'); }
  else seen($('#race'), (v) => { raceVis = v; if (v) race(); }, 0.4);

  /* ---------- the dragger: how much time comes back, said as something you could have done ---------- */
  const THINGS = [['uber', 'Book a cab'], ['slack', 'Reply on Slack'], ['instamart', 'Order groceries'], ['phonepe', 'Pay a bill'], ['gcal', 'Find a free slot'], ['whatsapp', 'Text the family'], ['swiggy', 'Reorder dinner'], ['amazon', 'Track a parcel'], ['meet', 'Prep for a call'], ['indigo', 'Check a flight'], ['strava', 'Log a run'], ['notion', 'Plan the week'], ['gk', 'Remind me later'], ['gpay', 'Sort a payment'], ['gmail', 'Draft an email'], ['outlook', 'Move a meeting'], ['zepto', 'Apply a coupon'], ['zomato', 'Book a table'], ['teams', 'Join a call'], ['gk', 'Nudge someone'], ['airindia', 'Find flights'], ['garmin', 'Plan a workout'], ['paytm', 'Check spending'], ['gk', 'Close the day'], ['blinkit', 'Restock the kitchen'], ['maps', 'Leave on time'], ['airtel', 'Recharge on time'], ['flipkart', 'Watch a price'], ['fit', 'Move the gym'], ['gk', 'Set a routine']];
  $('#chips').innerHTML = THINGS.map(([a, l]) => `<span class="chip">${GK.icon(a)}${l}</span>`).join('');
  const LADDER = [
    [0, 'watched a whole film, <em>credits and all.</em>'],
    [2, 'cooked a proper Sunday lunch, <em>for everyone.</em>'],
    [4, 'finished the book <em>on your nightstand.</em>'],
    [8, 'taken a whole day off, <em>without taking leave.</em>'],
    [12, 'binged a full season <em>of that show.</em>'],
    [20, 'learned to make fresh pasta. <em>Properly.</em>'],
    [30, 'trained for <em>your first 10K.</em>'],
    [44, 'taken back <em>a whole work week.</em>'],
    [60, 'learned enough Spanish <em>to order dinner in Madrid.</em>'],
    [72, 'spent three days <em>wandering Lisbon.</em>'],
    [90, 'trained for, and run, <em>a half marathon.</em>'],
    [120, 'directed <em>your own web series.</em>'],
    [160, 'written the first draft <em>of your novel.</em>'],
    [200, 'learned guitar, <em>well enough for a campfire.</em>'],
    [250, 'backpacked across Europe <em>for two weeks.</em>'],
    [340, 'built the side project <em>you keep talking about.</em>'],
    [440, 'taken <em>a month-long sabbatical.</em>'],
  ];
  const range = $('#n'), eq = $('#eq'), waf = $('#waf');
  waf.innerHTML = '<i></i>'.repeat(548); const sq = [...waf.children];
  let per = 'y', lastEq = -1;
  function calc() {
    const n = +range.value, mins = n * 3 * (per === 'y' ? 365 : 30), h = mins / 60;
    range.style.setProperty('--p', ((n - 1) / 29 * 100) + '%');
    $('#nv').textContent = n; $('#nl').textContent = n === 1 ? 'thing a day' : 'things a day';
    document.querySelectorAll('.chip').forEach((c, j) => c.classList.toggle('on', j < n));
    $('#hv').textContent = h < 10 ? h.toFixed(1).replace('.0', '') : Math.round(h).toLocaleString('en-IN');
    $('#hu').textContent = (h === 1 ? 'hour back' : 'hours back') + (h >= 48 ? `, about ${Math.round(h / 24)} full days` : '');
    $('#eqk').textContent = `By the end of the ${per === 'y' ? 'year' : 'month'}, you could have`;
    const hh = Math.round(h); sq.forEach((q, j) => { q.classList.toggle('on', j < hh); q.style.display = j < (per === 'y' ? 548 : 45) ? '' : 'none'; });
    let k = 0; LADDER.forEach(([min], j) => { if (h >= min) k = j; });
    if (k !== lastEq) {
      lastEq = k;
      if (RM) eq.innerHTML = LADDER[k][1];
      else { eq.classList.add('swap'); clearTimeout(calc.t); calc.t = setTimeout(() => { eq.innerHTML = LADDER[k][1]; eq.classList.remove('swap'); }, 200); }
    }
  }
  range.addEventListener('input', () => { touched = true; calc(); });
  document.querySelectorAll('.pseg button').forEach((b) => b.addEventListener('click', () => { per = b.dataset.p; document.querySelectorAll('.pseg button').forEach((x) => x.classList.toggle('on', x === b)); calc(); }));
  let touched = false, nudged = false;
  calc();
  /* the first time it comes into view, the handle drags itself so it reads as something to drag */
  if (!RM) seen($('.calc'), (v) => {
    if (!v || nudged || touched) return; nudged = true;
    const path = [8, 9, 10, 12, 14, 16, 18, 16, 14, 12, 10, 9, 8];
    path.forEach((val, j) => setTimeout(() => { if (touched) return; range.value = val; calc(); }, 500 + j * 140));
  }, 0.5);

  /* ---------- your apps ---------- */
  const ALL = ['gcal', 'gmail', 'meet', 'outlook', 'teams', 'whatsapp', 'slack', 'notion', 'figma', 'swiggy', 'instamart', 'zepto', 'blinkit', 'amazon', 'flipkart', 'zomato', 'myntra', 'eatsure', 'phonepe', 'gpay', 'paytm', 'airtel', 'netflix', 'healthconnect', 'strava', 'garmin', 'fit', 'uber', 'indigo', 'airindia', 'maps'];
  const half = Math.ceil(ALL.length / 2);
  const mrow = (list) => { const h = list.map((a) => `<span class="mi">${GK.icon(a)}${GK.NAME[a]}</span>`).join(''); return h + h; };
  $('#m1').innerHTML = mrow(ALL.slice(0, half)); $('#m2').innerHTML = mrow(ALL.slice(half));
  const C = [
    ['wide', 'Your day', ['gcal', 'gmail', 'meet', 'outlook', 'teams'], 'Google, Outlook and Teams, every calendar at once. Office meetings stay private.',
      [['gcal', 'Two things at 4:30 on Thursday', 'Calendar · Office and Freelance'], ['meet', 'Modalis in 12 min. Join?', 'Google Meet · with Rajat'], ['gmail', 'Rohan asked for the deck', 'Gmail · reply drafted'], ['outlook', 'Design review moved to 5', 'Outlook · Office calendar']]],
    ['wide', 'Your people and work', ['whatsapp', 'slack', 'notion', 'figma'], 'Replies, mentions and pages, written for you. Posted when you tap.',
      [['whatsapp', '“Dinner at 9 tonight?” is ready', 'WhatsApp · to Monika'], ['slack', 'Three mentions in #design, summed up', 'Slack'], ['notion', 'This week’s priorities, written', 'Notion · five things']]],
    ['', 'Your shops', ['instamart', 'swiggy', 'zepto', 'amazon', 'blinkit'], 'Carts filled with your usual and the best simple coupon. You pay in their app.',
      [['instamart', '₹505 cart, SAVE50 on', 'Instamart · 4 items'], ['swiggy', 'Your usual biryani, ₹514', 'Swiggy · here by 9:20'], ['amazon', 'Arrives Thursday, you’re home', 'Amazon · tracking']]],
    ['', 'Your money', ['phonepe', 'gpay', 'paytm'], 'Payment notifications, sorted on your phone into what you spend.',
      [['phonepe', 'Airtel bill, ₹799 tomorrow', 'PhonePe · ready to pay'], ['gpay', '₹7,180 on food this month', 'Google Pay · sorted'], ['paytm', 'One payment to sort', 'Paytm · ₹340 at Blue Tokai']]],
    ['', 'Your health and travel', ['strava', 'garmin', 'healthconnect', 'uber', 'indigo'], 'Runs counted toward your goals. Trips and cabs timed to the minute.',
      [['strava', 'Run 12 of 41, done', 'Strava · half marathon plan'], ['indigo', 'BLR to BOM, 7:10 AM', 'IndiGo · Terminal 1'], ['uber', 'Uber for 4:55 AM, ready', 'Uber · alarm at 4:15']]],
  ];
  const nt = (a, l, s) => `<div class="nt">${GK.icon(a)}<span>${l}<em>${s}</em></span></div>`;
  $('#bento').innerHTML = C.map(([cls, h, fan, p, feed]) => `<div class="bc ${cls}"><div class="fan">${fan.map((a) => GK.icon(a)).join('')}</div><h3>${h}</h3><p>${p}</p><div class="live">${nt(...feed[0])}</div></div>`).join('');
  const cards = [...document.querySelectorAll('.bc')];
  let appsVis = false, beat = 0;
  seen($('#apps'), (v) => (appsVis = v), 0.1);
  if (!RM) setInterval(() => {
    if (!appsVis) return;
    const j = beat++ % cards.length, c = cards[j], feed = C[j][4], live = c.querySelector('.live'), cur = live.querySelector('.nt');
    const n = ((c.__k || 0) + 1) % feed.length; c.__k = n;
    live.insertAdjacentHTML('beforeend', nt(...feed[n]));
    const nx = live.lastElementChild; nx.classList.add('out');
    requestAnimationFrame(() => requestAnimationFrame(() => { nx.classList.remove('out'); cur.classList.add('gone'); }));
    setTimeout(() => cur.remove(), 600);
  }, 1300);

  /* the invite form posts to data-endpoint (a Formspree, Google Apps Script or similar URL) once one is set */
  const jf = $('#jf'), fine = $('#fine');
  jf.addEventListener('submit', async (e) => {
    e.preventDefault();
    const email = $('#em').value.trim();
    if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) { fine.textContent = 'That email doesn’t look right. Check it and try again.'; return; }
    const url = jf.dataset.endpoint;
    if (!url) { fine.textContent = 'The invite list opens soon. Check back in a few days.'; return; }
    fine.textContent = 'Sending…';
    try {
      const r = await fetch(url, { method: 'POST', headers: { Accept: 'application/json' }, body: new URLSearchParams({ email }) });
      fine.textContent = r.ok ? 'You’re on the list. We’ll email your Android invite.' : 'That didn’t go through. Try again in a minute.';
      if (r.ok) jf.reset();
    } catch { fine.textContent = 'That didn’t go through. Check your connection and try again.'; }
  });
})();
