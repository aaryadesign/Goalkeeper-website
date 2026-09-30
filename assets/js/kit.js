/* Goalkeeper kit. Runs the design canvas's own boards (window.GKB) live inside phone frames,
   and draws the home screen and its widget the way Widget.dc and WidgetMore.dc do. */
(function () {
  const GK = (window.GK = {});
  const RM = matchMedia('(prefers-reduced-motion: reduce)').matches;
  GK.RM = RM;

  /* ---------- a small runtime for the canvas's .dc.html boards ---------- */
  class DCLogic {
    constructor(p) { this.props = p || {}; this.state = {}; }
    setState(s) { Object.assign(this.state, typeof s === 'function' ? s(this.state, this.props) : s); if (this.__sched) this.__sched(); }
  }
  const parsed = {};
  function parse(name) {
    if (parsed[name]) return parsed[name];
    const doc = new DOMParser().parseFromString(window.GKB[name], 'text/html');
    const xdc = doc.querySelector('x-dc');
    const helmet = xdc.querySelector('helmet');
    let css = '';
    if (helmet) { helmet.querySelectorAll('style').forEach((s) => (css += s.textContent)); helmet.remove(); }
    const code = doc.querySelector('script[data-dc-script]');
    const dp = code.getAttribute('data-props');
    const props = dp ? JSON.parse(dp) : {};
    const C = new Function('DCLogic', code.textContent + ';return Component;')(DCLogic);
    return (parsed[name] = { tpl: xdc.innerHTML, css: css.replace(/\bbody\b/g, ':host'), C, props });
  }
  const look = (sc, path) => {
    const ps = path.trim().split('.');
    let v;
    for (let i = sc.length - 1; i >= 0; i--) if (sc[i] && ps[0] in sc[i]) { v = sc[i]; break; }
    if (v === undefined) return undefined;
    for (const k of ps) { if (v == null) return undefined; v = v[k]; }
    return v;
  };
  const fill = (s, sc) => s.replace(/\{\{([^}]+)\}\}/g, (_, p) => { const v = look(sc, p); return v == null ? '' : v; });
  function proc(node, sc) {
    if (node.nodeType === 3) { if (node.nodeValue.indexOf('{{') > -1) node.nodeValue = fill(node.nodeValue, sc); return; }
    if (node.nodeType !== 1) return;
    const tag = node.tagName.toLowerCase();
    if (tag === 'sc-for') {
      const list = look(sc, node.getAttribute('list').replace(/[{}]/g, '')) || [];
      const as = node.getAttribute('as');
      const frag = document.createDocumentFragment();
      list.forEach((it) => { const box = node.ownerDocument.createElement('div'); box.append(...node.cloneNode(true).childNodes); [...box.childNodes].forEach((ch) => proc(ch, sc.concat([{ [as]: it }]))); frag.append(...box.childNodes); });
      node.replaceWith(frag); return;
    }
    if (tag === 'sc-if') {
      const v = look(sc, node.getAttribute('value').replace(/[{}]/g, ''));
      if (v && v !== 'false') { const box = node.ownerDocument.createElement('div'); box.append(...node.childNodes); [...box.childNodes].forEach((ch) => proc(ch, sc)); node.replaceWith(...box.childNodes); }
      else node.remove();
      return;
    }
    for (const a of [...node.attributes]) {
      if (a.value.indexOf('{{') < 0) continue;
      const whole = a.value.match(/^\{\{([^}]+)\}\}$/);
      if (/^on[A-Z]/.test(a.name) || /^on[a-z]+$/.test(a.name)) {
        const f = whole && look(sc, whole[1]);
        node.removeAttribute(a.name);
        if (typeof f === 'function') (node.__on || (node.__on = {}))[a.name.slice(2).toLowerCase()] = f;
        continue;
      }
      if (a.name === 'checked') { const v = whole && look(sc, whole[1]); node.removeAttribute('checked'); node.__checked = !!(v && v !== 'false'); continue; }
      node.setAttribute(a.name, fill(a.value, sc));
    }
    [...node.childNodes].forEach((ch) => proc(ch, sc));
  }
  function morph(a, b) {
    const ac = [...a.childNodes], bc = [...b.childNodes];
    for (let i = 0; i < bc.length; i++) {
      const x = ac[i], y = bc[i];
      if (!x) { a.appendChild(y); continue; }
      if (x.nodeType !== y.nodeType || (x.nodeType === 1 && x.tagName !== y.tagName)) { a.replaceChild(y, x); continue; }
      if (x.nodeType !== 1) { if (x.nodeValue !== y.nodeValue) x.nodeValue = y.nodeValue; continue; }
      for (const at of [...x.attributes]) if (!y.hasAttribute(at.name)) x.removeAttribute(at.name);
      for (const at of [...y.attributes]) if (x.getAttribute(at.name) !== at.value) x.setAttribute(at.name, at.value);
      x.__on = y.__on;
      if (x.tagName === 'INPUT') { if (x.type === 'checkbox') x.checked = !!y.__checked; else if (x.getRootNode().activeElement !== x) x.value = y.getAttribute('value') || ''; }
      morph(x, y);
    }
    for (let i = ac.length - 1; i >= bc.length; i--) ac[i].remove();
  }
  /** Mount a board into host (390×844). opt: state {Board:{...}}, props, nav (follow links to other boards), onGo */
  GK.mount = function (host, name, opt = {}) {
    const sr = host.shadowRoot || host.attachShadow({ mode: 'open' });
    const ctl = { host, sr, name: null, inst: null, visible: true };
    const base = ':host{display:block;width:390px;height:844px;overflow:hidden;position:relative}';
    ctl.go = function (n, st) {
      if (!window.GKB[n]) return;
      if (ctl.inst && ctl.inst.componentWillUnmount) ctl.inst.componentWillUnmount();
      const P = parse(n); ctl.name = n;
      const pr = {};
      for (const k in P.props) if (k[0] !== '$' && P.props[k] && 'default' in P.props[k]) pr[k] = P.props[k].default;
      Object.assign(pr, (opt.props && opt.props[n]) || {});
      const inst = new P.C(pr);
      Object.assign(inst.state, st || (opt.state && opt.state[n]) || {});
      ctl.inst = inst;
      sr.innerHTML = '<style>' + base + P.css + '</style><div class="gk-root"></div>';
      const rootEl = sr.querySelector('.gk-root');
      let pend = false;
      const draw = () => {
        const t = document.createElement('template');
        t.innerHTML = P.tpl;
        const holder = t.content;
        let vals;
        try { vals = inst.renderVals(); } catch (e) { console.error(n, e); return; }
        [...holder.childNodes].forEach((ch) => proc(ch, [vals]));
        morph(rootEl, holder);
      };
      inst.__sched = () => { if (!pend) { pend = true; requestAnimationFrame(() => { pend = false; if (ctl.inst === inst && ctl.visible) draw(); }); } };
      ctl.draw = draw;
      draw();
      if (inst.componentDidMount && !RM) inst.componentDidMount();
      if (opt.onGo) opt.onGo(n);
    };
    ['click', 'input', 'change'].forEach((ev) => sr.addEventListener(ev, (e) => {
      let t = e.target;
      if (ev === 'click') {
        const a = t.closest && t.closest('a');
        if (a) {
          e.preventDefault();
          const m = (a.getAttribute('href') || '').match(/^([\w-]+)\.dc\.html$/);
          if (m && window.GKB[m[1]] && opt.nav !== false) { ctl.go(m[1]); return; }
        }
      }
      while (t && t !== sr) { if (t.__on && t.__on[ev]) { t.__on[ev](e); break; } t = t.parentNode; }
    }));
    if ('IntersectionObserver' in window) new IntersectionObserver((es) => es.forEach((en) => { ctl.visible = en.isIntersecting; if (ctl.visible && ctl.draw) ctl.draw(); }), { rootMargin: '120px' }).observe(host);
    ctl.go(name);
    return ctl;
  };

  /* ---------- icons ---------- */
  const PATH = {
    mic: 'M12 3a3 3 0 0 1 3 3v5a3 3 0 0 1-6 0V6a3 3 0 0 1 3-3zM5.5 11a6.5 6.5 0 0 0 13 0M12 17.5V21',
    send: 'M4 12l16-8-6 16-3-7z', video: 'M3 7h12v10H3zM15 10l6-3v10l-6-3', check: 'M5 12.5l4.5 4.5L19 7.5',
    phone: 'M5 4h3.5l2 5-2.5 1.5a11 11 0 0 0 5.5 5.5L15 13.5l5 2V19a2 2 0 0 1-2 2A16 16 0 0 1 3 6a2 2 0 0 1 2-2z',
    search: 'M11 18a7 7 0 1 0 0-14 7 7 0 0 0 0 14zM20 20l-4-4', cloud: 'M7 18h10a4 4 0 0 0 .5-8A6 6 0 0 0 6 9.5 4.3 4.3 0 0 0 7 18z',
    heart: 'M12 21s-7-4.5-7-10a4 4 0 0 1 7-2.6A4 4 0 0 1 19 11c0 5.5-7 10-7 10z', moon: 'M20 14.5A8 8 0 1 1 9.5 4a6.5 6.5 0 0 0 10.5 10.5z',
  };
  GK.svg = (n, w = 2) => `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="${w}" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true"><path d="${PATH[n]}"/></svg>`;
  const MARK = '<svg viewBox="0 0 22 22" fill="none" aria-hidden="true"><circle cx="11" cy="11" r="8.6" stroke="currentColor" stroke-width="2"/><circle cx="11" cy="11" r="4.2" fill="currentColor"/></svg>';
  GK.MARK = MARK;
  const NAME = { gcal: 'Calendar', gmail: 'Gmail', meet: 'Meet', maps: 'Maps', swiggy: 'Swiggy', instamart: 'Instamart', uber: 'Uber', phonepe: 'PhonePe', whatsapp: 'WhatsApp', slack: 'Slack', gk: 'Goalkeeper', phone: 'Phone', zepto: 'Zepto', amazon: 'Amazon', blinkit: 'Blinkit', zomato: 'Zomato', flipkart: 'Flipkart', gpay: 'Google Pay', paytm: 'Paytm', notion: 'Notion', teams: 'Teams', outlook: 'Outlook', strava: 'Strava', garmin: 'Garmin', fit: 'Google Fit', healthconnect: 'Health Connect', indigo: 'IndiGo', airindia: 'Air India', netflix: 'Netflix', airtel: 'Airtel', myntra: 'Myntra', eatsure: 'EatSure', figma: 'Figma' };
  GK.NAME = NAME;
  GK.icon = (a, cls = '') => {
    if (a === 'gk') return `<span class="gt gk ${cls}" role="img" aria-label="Goalkeeper">${MARK}</span>`;
    if (a === 'phone') return `<span class="gt ph ${cls}" role="img" aria-label="Phone">${GK.svg('phone', 2.2)}</span>`;
    return `<img class="${cls}" src="assets/brands/${a}.png" alt="${NAME[a] || a}" loading="lazy" decoding="async">`;
  };

  /* ---------- the widget, as drawn on the canvas ---------- */
  const S = GK.svg;
  const top = (meta, right) => `<div class="w-top">${meta}${right === undefined ? `<span class="w-mic" aria-label="Talk">${S('mic')}</span>` : right}</div>`;
  const meta = (t, on) => `<span class="w-meta${on ? ' on' : ''}">${t}</span>`;
  const dot = (c) => `<span class="w-dot" style="background:${c}"></span>`;
  const btns = (list) => `<div class="w-btns">${list.map(([l, ic, solid, key]) => `<span class="wb${solid ? ' s' : ''}" data-b="${key || ''}">${ic ? S(ic) : ''}${l}</span>`).join('')}</div>`;
  const bar = (spans, now, labs) => `<div class="w-bar">${spans.map(([l, w, c]) => `<span style="left:${l}%;width:${w}%;background:${c}"></span>`).join('')}${now != null ? `<b style="left:${now}%"></b>` : ''}</div><div class="w-lab">${labs.map((x) => `<span>${x}</span>`).join('')}</div>`;
  const ring = '<svg width="14" height="14" viewBox="0 0 14 14" aria-hidden="true"><circle cx="7" cy="7" r="5.5" fill="none" stroke="rgba(28,28,30,.1)" stroke-width="2"/><path d="M7 1.5a5.5 5.5 0 0 1 5.2 7.3" fill="none" stroke="#2F7BF6" stroke-width="2" stroke-linecap="round"/></svg>';
  const seg = (p) => `<div class="w-seg">${[0, 1, 2, 3].map((n) => `<span><i style="transform:scaleX(${Math.max(0, Math.min(1, p - n))})"></i></span>`).join('')}</div><div class="w-segl">${['Placed', 'Packed', 'On the way', 'Here'].map((x, n) => `<span class="${n === Math.min(3, Math.floor(p)) ? 'on' : ''}"${n === 3 ? ' style="text-align:right"' : ''}>${x}</span>`).join('')}</div>`;
  const W = {
    morning: () => top(meta('Today · Wed 1 Oct')) + '<div class="w-t">Standup at 11</div><div class="w-i">Four things, the first at 9:30.</div><div class="w-f"></div>' + bar([[5, 5, '#F2992E'], [20, 5, '#2F7BF6'], [45, 10, '#9467F0'], [80, 10, '#26B37A']], 2, ['9 AM', '2 PM', '7 PM']),
    next: () => top(meta('Tue 30 Sep · 3 left')) + '<div class="w-t">Gym at 8</div><div class="w-i">Then text Monika at 9, and Molades at 10.</div><div class="w-f"></div>' + bar([[0, 11, 'rgba(28,28,30,.22)'], [33.3, 16.4, '#26B37A'], [50, 3, '#9467F0'], [66.7, 16.4, '#2F7BF6']], 11, ['6 PM', '9', '12 AM']),
    before: () => top(meta(ring + 'In 12 min · 10:00 PM')) + '<div class="w-t sm">Meeting with Molades</div><div class="w-s">Google Meet · with Rajat</div><div class="w-f"></div>' + btns([['Join', 'video', 1, 'join'], ['10 min'], ['Done']]),
    time: () => top(meta(dot('#E5484D') + 'Now · 9:00 PM', 1)) + '<div class="w-t">Text Monika</div><div class="w-i">“Dinner at 9 tonight?” is ready.</div><div class="w-f"></div>' + btns([['Send', 'send', 1, 'send'], ['10 min'], ['Done']]),
    evening: () => top(meta('Tuesday evening'), '') + '<div class="w-t">6 of 8 done.</div><div class="w-i">Two can move to tomorrow.</div><div class="w-f"></div><div class="w-btns"><span class="w-dots">' + [0, 1, 2, 3, 4, 5, 6, 7].map((n) => `<i class="${n < 6 ? '' : 'o'}"></i>`).join('') + '</span><span class="wb s" data-b="close">Close the day</span></div>',
    closed: () => top(meta('Tomorrow · Wed 1 Oct')) + '<div class="w-t">Standup at 11</div><div class="w-i">Four things, the first at 9:30.</div><div class="w-f"></div>' + bar([[5, 5, '#F2992E'], [20, 5, '#2F7BF6'], [45, 10, '#9467F0'], [80, 10, '#26B37A']], null, ['9 AM', '2 PM', '7 PM']),
    worth: () => top(meta(dot('#F2992E') + 'Worth knowing · 1 of 4', 1), '<span style="font-size:12px;font-weight:500;color:rgba(28,28,30,.42)">Money</span>') + '<div class="w-t sm" style="margin-top:2px">Airtel bill, ₹799 tomorrow</div><div class="w-i" style="margin-top:2px">Last month you paid on the 1st.</div><div class="w-f"></div>' + btns([['Open PhonePe', '', 1, 'phonepe'], ['Next']]),
    clash: () => top(meta(dot('#E5484D') + 'Thursday · 4:30 PM', 1), '') + '<div class="w-t sm" style="margin-top:0">Two things at once</div><div style="display:flex;flex-direction:column;gap:3px;margin-top:6px"><div class="w-bar" style="height:8px;border-radius:4px"><span style="left:20%;width:20%;background:#2F7BF6;border-radius:4px"></span></div><div class="w-bar" style="height:8px;border-radius:4px"><span style="left:30%;width:15%;background:#9467F0;border-radius:4px"></span></div></div><div style="font-size:12px;color:rgba(28,28,30,.6);margin-top:5px">Design review, Office · Meera, Freelance</div><div class="w-f"></div>' + btns([['Fix it', '', 1, 'fix'], ['Keep both']]),
    onway: (p = 2.6, min = 6) => top(meta(GK.icon('instamart') + 'Instamart · 4 items'), '<span style="font-size:12px;font-weight:600;color:#16825A">By 9:32</span>') + `<div class="w-t" style="margin-top:6px;line-height:32px">${p >= 3.99 ? 'It’s here.' : 'Here in ' + min + ' min'}</div><div class="w-i" style="margin-top:1px">Milk, eggs, bread and atta.</div><div class="w-f"></div>` + seg(p),
    cart: () => top(meta(GK.icon('instamart') + 'Instamart cart · 4 items'), '') + '<div class="w-t" style="line-height:32px;margin-top:0">₹505, ready to pay</div><div class="w-i" style="margin-top:1px">SAVE50 applied, you save ₹50.</div><div class="w-f"></div>' + btns([['Pay in Swiggy', '', 1, 'swiggy'], ['See cart']]),
    eveMoney: () => top(meta('Tuesday evening'), '') + '<div class="w-t" style="line-height:32px">6 of 8 done · ₹2,340</div><div class="w-i" style="margin-top:1px">Most of it on Myntra and Instamart.</div><div class="w-f"></div><div class="w-btns" style="justify-content:space-between"><span style="font-size:12.5px;font-weight:500;color:rgba(28,28,30,.6)">1 payment to sort</span><span class="wb s" data-b="close">Close the day</span></div>',
    sqNext: (t = 'Gym', when = 'Next · 8 PM', inn = 'in 1h 20m') => `<span class="w-meta">${when}</span><span class="big" style="font-size:32px;line-height:36px">${t}</span><span class="w-i">${inn}</span><div class="w-f"></div><div style="display:flex;justify-content:flex-end"><span class="w-mic" style="width:40px;height:40px;border-radius:20px">${S('mic')}</span></div>`,
    sqDone: () => '<span class="w-meta">Today</span><span class="big" style="margin-top:2px;font-size:34px;line-height:38px">6 of 8</span><span class="w-i">done</span><div class="w-f"></div><span class="wb s" style="justify-content:center;font-size:13.5px">Close the day</span>',
    sqSpent: (amt = '₹2,340', n = '6 payments', mix = [5, 5, 4, 9]) => `<span class="w-meta">Spent today</span><span class="big">${amt}</span><span class="w-i">${n}</span><div class="w-f"></div><div style="display:flex;height:6px;border-radius:3px;overflow:hidden;gap:2px">${mix.map((f, i) => `<span style="flex:${f} 1 0;background:${['#F2992E', '#26B37A', '#2F7BF6', '#9467F0'][i]};transition:flex 1s ease"></span>`).join('')}</div>`,
    sqMonth: () => '<span class="w-meta">September</span><span class="big">₹18.9k</span><span class="w-i">₹2.1k under August</span><div class="w-f"></div><span style="font-size:12px;font-weight:600">Food delivery is 38%</span>',
    line: (a = 'Gym at 8', b = ' · in 1h 20m') => `<span style="flex-grow:1;min-width:0;white-space:nowrap;overflow:hidden;text-overflow:ellipsis"><span style="font-family:Geist,system-ui,sans-serif;font-weight:600;font-size:21px;letter-spacing:-.3px">${a}</span><span style="font-size:13.5px;color:rgba(28,28,30,.6)">${b}</span></span><span class="w-mic" style="width:44px;height:44px;border-radius:22px">${S('mic')}</span>`,
    tall: () => top(meta('Tuesday, 30 September'), '<span class="w-av">A</span>') + '<div class="w-t" style="font-size:24px;line-height:29px;margin-top:6px">Three things left tonight.</div><div class="w-i" style="margin-top:2px">Next up, the gym at 8.</div><div style="margin-top:12px">' +
      [['8:00', '#26B37A', 'Gym', 'I’ll remind you at 7:45', ''], ['9:00', '#9467F0', 'Text Monika', '“Dinner at 9 tonight?”', 'Send'], ['10:00', '#2F7BF6', 'Meeting with Molades', 'Google Meet · with Rajat', 'Join']].map(([t, c, a, b, act]) => `<div class="w-row"><span class="tm">${t}</span><span class="cb" style="background:${c}"></span><span class="tx"><b>${a}</b><span>${b}</span></span>${act ? `<span class="wb" data-b="${act.toLowerCase()}">${act}</span>` : ''}</div>`).join('') +
      `<div class="w-row" style="height:46px"><span style="width:24px;height:24px;border-radius:12px;flex-shrink:0;background:rgba(148,103,240,.18);color:#7C55D6;display:flex;align-items:center;justify-content:center;font-size:11.5px;font-weight:600">K</span><span style="flex-grow:1;min-width:0;font-size:13.5px;color:rgba(28,28,30,.6);white-space:nowrap;overflow:hidden;text-overflow:ellipsis">Waiting on Karan since Monday</span><span class="wb" style="height:28px;padding:0 12px;font-size:12.5px;border-radius:14px">Nudge</span></div></div><div class="w-f"></div><span class="w-say">${S('mic')}Say something</span>`,
  };
  GK.W = W;
  /** Make a widget element. kind: a key of W; cls: '', 'sq', 'line', 'tall' */
  GK.widget = function (kind, cls = '', args = []) {
    const el = document.createElement('div');
    el.className = 'w' + (cls ? ' ' + cls : '');
    el.innerHTML = `<div class="in">${W[kind](...args)}</div>`;
    el.set = (k, a = []) => {
      const inn = el.querySelector('.in');
      if (RM) { inn.innerHTML = W[k](...a); return; }
      inn.classList.add('swap');
      setTimeout(() => { inn.innerHTML = W[k](...a); inn.classList.remove('swap'); }, 260);
    };
    el.patch = (k, a = []) => { el.querySelector('.in').innerHTML = W[k](...a); };
    return el;
  };
  GK.tap = function (target, at) {
    if (!target || RM) return;
    const host = at || target.closest('.gk-view') || target.parentNode;
    const r = target.getBoundingClientRect(), h = host.getBoundingClientRect();
    const k = h.width / (host.offsetWidth || h.width);
    const d = document.createElement('span');
    d.className = 'gk-tap';
    d.style.left = (r.left - h.left + r.width / 2) / k + 'px';
    d.style.top = (r.top - h.top + r.height / 2) / k + 'px';
    host.appendChild(d);
    setTimeout(() => d.remove(), 800);
    target.animate([{ transform: 'scale(1)' }, { transform: 'scale(.93)' }, { transform: 'scale(1)' }], { duration: 320 });
  };
  GK.bounce = (el) => { if (!el || RM) return; el.classList.remove('bounce'); void el.offsetWidth; el.classList.add('bounce'); };

  /* ---------- the phone ---------- */
  const SB = () => `<span class="gk-clock">8:12</span><i><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M2 20h3v-4H2zm5 0h3v-8H7zm5 0h3V8h-3zm5 0h3V4h-3z"/></svg><svg viewBox="0 0 24 24" fill="currentColor" aria-hidden="true"><path d="M12 20l-9-11a14 14 0 0 1 18 0z"/></svg><svg viewBox="0 0 26 24" fill="none" stroke="currentColor" stroke-width="1.6" aria-hidden="true"><rect x="2" y="6" width="19" height="12" rx="3"/><rect x="4" y="8" width="12" height="8" rx="1.5" fill="currentColor" stroke="none"/><path d="M23 10v4"/></svg></i>`;
  /** A phone. opt: k (scale), board, state, nav, home (true to start on the home screen), time */
  GK.phone = function (el, opt = {}) {
    el.classList.add('gk-phone');
    el.style.setProperty('--k', opt.k || 0.8);
    el.innerHTML = `<div class="gk-scr"><span class="gk-cam"></span><div class="gk-sb">${SB()}</div></div>`;
    const scr = el.querySelector('.gk-scr'), sb = el.querySelector('.gk-sb');
    const ctl = { el, scr, cur: null, boards: null, homeView: null };
    ctl.time = (t) => { el.querySelector('.gk-clock').textContent = t; };
    function view() { const v = document.createElement('div'); v.className = 'gk-view out'; scr.appendChild(v); return v; }
    function swapTo(v) {
      const old = ctl.cur; ctl.cur = v;
      requestAnimationFrame(() => { v.classList.remove('out'); });
      if (old && old !== v) { old.classList.add('out'); if (old !== ctl.homeView) setTimeout(() => { if (ctl.cur !== old) old.remove(); }, 500); }
      sb.classList.toggle('light', v === ctl.homeView);
    }
    ctl.board = (name, st) => {
      const v = view();
      const host = document.createElement('div');
      v.appendChild(host);
      ctl.boards = GK.mount(host, name, { state: st ? { [name]: st } : opt.state, nav: opt.nav });
      swapTo(v);
      return ctl.boards;
    };
    ctl.home = () => {
      if (!ctl.homeView) { ctl.homeView = view(); ctl.homeScreen = GK.homeScreen(ctl.homeView); }
      swapTo(ctl.homeView);
      return ctl.homeScreen;
    };
    if (opt.time) ctl.time(opt.time);
    if (opt.home) ctl.home(); else if (opt.board) ctl.board(opt.board, opt.boardState);
    if (!opt.home && !opt.board) sb.classList.add('light');
    return ctl;
  };

  /* ---------- the home screen ---------- */
  GK.homeScreen = function (v) {
    const home = document.createElement('div');
    home.className = 'gk-home';
    home.innerHTML = `<div class="gk-toast" data-r="toast"></div>
      <div class="glance">Tuesday, 30 September <span style="opacity:.7">·</span> ${S('cloud', 1.8)} 29°</div>
      <div class="slot"></div><div class="sqs"></div>
      <div class="apps">${['gcal', 'gmail', 'meet', 'maps', 'swiggy', 'instamart', 'uber', 'phonepe'].map((a) => `<span class="app" data-app="${a}">${GK.icon(a)}<span>${NAME[a]}</span></span>`).join('')}</div>
      <div class="dock">${['phone', 'whatsapp', 'slack', 'gk'].map((a) => `<span data-app="${a}">${GK.icon(a)}</span>`).join('')}</div>
      <div class="search">${S('search')}Search<b>${S('mic')}</b></div>`;
    v.appendChild(home);
    const w = GK.widget('next');
    home.querySelector('.slot').appendChild(w);
    const a = GK.widget('sqSpent', 'sq', ['₹60', '1 payment', [1, 0, 0, 0]]), b = GK.widget('sqNext', 'sq');
    home.querySelector('.sqs').append(a, b);
    const toast = home.querySelector('[data-r="toast"]');
    return {
      el: home, widget: w, sqA: a, sqB: b,
      app: (k) => home.querySelector(`[data-app="${k}"]`),
      toast(icon, text) { toast.innerHTML = GK.icon(icon) + '<span>' + text + '</span>' + GK.svg('check', 2.4).replace('<svg', '<svg class="ck"'); toast.classList.add('on'); clearTimeout(this.tt); this.tt = setTimeout(() => toast.classList.remove('on'), 2200); },
    };
  };

  /** A day on the home screen: the moments the widget goes through, in order */
  GK.DAY = [
    { t: '7:58', w: 'morning', a: ['sqSpent', ['₹0', 'Nothing yet', [1, 0, 0, 0]]], b: ['sqNext', ['Standup', 'Next · 11 AM', 'in 3 h']], say: ['7:58 AM', 'Your morning, in one line', 'Four things today. The first at 9:30.'] },
    { t: '9:52', w: 'onway', wa: [2.4, 6], a: ['sqSpent', ['₹565', '2 payments', [1, 5, 0, 0]]], say: ['9:52 AM', 'Groceries, on the way', 'You said it. I built the cart. It shows here until it’s at your door.'], prog: true },
    { t: '11:30', w: 'worth', tap: 'phonepe', app: 'phonepe', toast: ['phonepe', 'PhonePe opens with ₹799 ready'], say: ['11:30 AM', 'A bill you’d have missed', 'Airtel is due tomorrow. One tap opens PhonePe.'] },
    { t: '3:10', w: 'clash', tap: 'fix', app: 'gcal', toast: ['gcal', 'Held Friday 11 for Meera'], say: ['3:10 PM', 'A clash, days ahead', 'Two things at 4:30 on Thursday. Fix it from here.'] },
    { t: '6:40', w: 'next', a: ['sqSpent', ['₹2,340', '6 payments', [5, 5, 4, 9]]], b: ['sqNext', ['Gym', 'Next · 8 PM', 'in 1h 20m']], say: ['6:40 PM', 'What’s next, and after', 'Gym at 8. Then Monika, then Molades.'] },
    { t: '9:00', w: 'time', tap: 'send', app: 'whatsapp', toast: ['whatsapp', 'Sent to Monika'], b: ['sqNext', ['Molades', 'Next · 10 PM', 'in 1 h']], say: ['9:00 PM', 'It’s time. The message is ready.', 'Tap Send. You never opened an app.'] },
    { t: '9:48', w: 'before', tap: 'join', app: 'meet', toast: ['meet', 'Joining Google Meet'], say: ['9:48 PM', 'A few minutes before', 'Join, snooze or done. Right there.'] },
    { t: '10:40', w: 'evening', tap: 'close', b: ['sqDone', []], say: ['10:40 PM', 'Close the day', 'Six of eight done. Two move to tomorrow.'] },
    { t: '10:41', w: 'closed', b: ['sqNext', ['Standup', 'Tomorrow · 11 AM', 'first thing at 9:30']], say: ['10:41 PM', 'Tomorrow, already waiting', 'Standup at 11. Four things, the first at 9:30.'] },
  ];
  /** Play GK.DAY on a home screen. hooks.onMoment(i, m) */
  GK.playDay = function (phone, hooks = {}) {
    const hs = phone.home();
    let i = -1, timer = null, prog = null;
    function show(n) {
      i = n; const m = GK.DAY[n];
      phone.time(m.t);
      hs.widget.set(m.w, m.wa || []);
      if (m.a) hs.sqA.set(m.a[0], m.a[1]);
      if (m.b) hs.sqB.set(m.b[0], m.b[1]);
      clearInterval(prog);
      if (m.prog && !RM) { let p = m.wa[0], min = m.wa[1]; prog = setInterval(() => { p = Math.min(4, p + 0.12); if (p > 3) min = 1; hs.widget.patch('onway', [p, Math.max(1, Math.round(min - (p - 2.4) * 3))]); }, 450); }
      if (m.tap && !RM) setTimeout(() => {
        const b = hs.widget.querySelector(`[data-b="${m.tap}"]`);
        GK.tap(b, phone.homeView);
        setTimeout(() => { if (m.app) GK.bounce(hs.app(m.app)); if (m.toast) hs.toast(m.toast[0], m.toast[1]); }, 250);
      }, 1700);
      if (hooks.onMoment) hooks.onMoment(n, m);
    }
    const api = {
      show, get i() { return i; },
      play(from = 0, every = 3600) { api.stop(); show(from); if (RM) return; timer = setInterval(() => show((i + 1) % GK.DAY.length), every); },
      stop() { clearInterval(timer); clearInterval(prog); },
      home: hs,
    };
    return api;
  };
})();
