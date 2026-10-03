(function () {
  const K = window.AtelierKit;
  const { PAL, PalCtx, EZ, tw, win, lerp, SERIF, READ, SANS, MONO, A, COL, typedC, Lab, Btn, H2, Row, Sec, Tabs, Bar, Back, Pill, Said, Tip } = K;
  const DOCF = "Georgia, 'Times New Roman', serif";
  const PX = { kiri: 'woman-vintage', yuki: 'curly-hair', sora: 'cat-glasses', noor: 'woman-heart', ada: 'woman-hairstyle', ren: 'face-glasses', juno: 'woman-minimal', theo: 'cat-glasses' };
  const Face = ({ k, s, ring, ml }) => { const P = React.useContext(PalCtx); const src = (window.AT_PORTRAITS && window.AT_PORTRAITS[k]) || ('packages/design/portraits/' + PX[k] + '.webp'); return <div style={{ width: s, height: s, borderRadius: '50%', background: P.pg, border: '1px solid ' + P.line, overflow: 'hidden', flex: 'none', marginLeft: ml || 0, boxShadow: '0 0 0 2px ' + P.paper + (ring ? ',0 0 0 3.5px ' + ring : '') }}><img src={src} alt="" decoding="sync" loading="eager" style={{ width: '100%', height: '100%', display: 'block' }} /></div>; };
  const Mark = ({ s }) => { const P = React.useContext(PalCtx); return <div style={{ width: s, height: s, borderRadius: '50%', border: '1px solid ' + P.line2, background: P.paper, display: 'flex', alignItems: 'center', justifyContent: 'center', flex: 'none' }}><span style={{ font: '400 ' + Math.round(s * 0.48) + 'px/1 ' + SERIF, display: 'flex', alignItems: 'baseline', gap: 2, color: P.ink }}>a<span style={{ width: Math.max(4, s / 12), height: Math.max(4, s / 12), borderRadius: '50%', background: '#e0875a', display: 'inline-block' }} /></span></div>; };

  const ORDER = ['Doc', 'Edit', 'Deck', 'Present', 'Knows', 'Find', 'Dmg', 'First', 'AI', 'Goal', 'Outline', 'Share', 'Guest', 'End', 'Data', 'Read', 'Diff'];
  const NAME = { Doc: 'The document room', Edit: 'Editing', Deck: 'A presentation', Present: 'Present', Knows: 'Monet knows', Find: 'Finding something', Dmg: 'The disk image', First: 'The first window', AI: 'An AI for the team', Goal: 'Start a project', Outline: 'The morning outline', Share: 'A review link', Guest: 'What the guest sees', End: 'The retreat ends', Data: 'A data view', Read: 'How you read it', Diff: 'What changed' };
  const WHEN = { Doc: 'Thu 09:13', Edit: 'Thu 09:16', Deck: 'Thu 09:19', Present: 'Thu 09:20', Knows: 'Thu 09:22', Find: 'Thu 09:24', Dmg: 'Mon 09:00', First: 'Mon 09:01', AI: 'Mon 09:02', Goal: 'Mon 09:04', Outline: 'Tue 07:30', Share: 'Wed 10:10', Guest: 'Wed 10:31', End: 'Fri 10:12', Data: 'Thu 10:05', Read: 'Thu 10:06', Diff: 'Thu 10:07' };
  const DATE = { Doc: 'Thu 1 Oct', Edit: 'Thu 1 Oct', Deck: 'Thu 1 Oct', Knows: 'Thu 1 Oct', Find: 'Thu 1 Oct', First: 'Mon 5 Oct', AI: 'Mon 5 Oct', Goal: 'Mon 5 Oct', Outline: 'Tue 1 Dec', Share: 'Wed 2 Dec', End: 'Fri 2 Jan', Data: 'Thu 1 Oct', Read: 'Thu 1 Oct', Diff: 'Thu 1 Oct' };
  const CAPS = [
    ['Doc', 0.3, 'A document room. The page is the author’s; Atelier is only the frame.'], ['Doc', 1.2, 'Select a passage: Edit · Ask · Comment.'], ['Doc', 3.2, 'A comment sits on the shelf, attached to the words it’s about.'], ['Doc', 6.8, 'Edit the whole text.'],
    ['Edit', 0.3, 'Editing is a session. The writing strip appears only now: text, font, colour, Insert or /.'], ['Edit', 5.0, 'Save makes one new version, not a stream of saves.'], ['Edit', 6.4, 'Version 4 joins the spine, with your name on it.'],
    ['Deck', 0.3, 'A deck is a document whose pages are slides, each in the author’s own look.'], ['Deck', 2.2, 'Slides down the spine, one large with its notes; comments on the shelf.'], ['Deck', 5.3, 'Present.'],
    ['Present', 0.3, 'The deck alone. One small control in the corner, and Esc.'],
    ['Knows', 0.3, 'Kiri says when she leans on what Monet knows.'], ['Knows', 1.8, 'The shelf shows the facts, and where each came from.'], ['Knows', 4.6, 'Forget is a moment, with Undo. Facts about you are asked first.'],
    ['Find', 0.3, 'One search at the head of the library, on any shelf.'], ['Find', 3.6, 'A result opens as Evidence. Nothing navigates.'],
    ['Dmg', 0.3, 'The retreat CEO, on her own Mac. The mark, one line, one instruction.'],
    ['First', 0.3, 'The first window says what Atelier is, once. No terminal; the work stays on this Mac.'],
    ['AI', 0.3, 'One question per page. Atelier offers what’s ready as the lime.'], ['AI', 3.6, 'Each answer is a tick on the same ruler.'],
    ['Goal', 0.3, 'Her goal, in her words. The team assembles beside it.'], ['Goal', 5.6, 'Kinds are examples, never categories.'], ['Goal', 7.3, 'Meet your team.'],
    ['Outline', 0.3, 'Weeks later: the morning outline. Her day, on the ruler.'], ['Outline', 1.2, 'It reads her mail and calendar, and never sends.'], ['Outline', 3.6, 'Click a moment, and the brief moves there.'], ['Outline', 6.6, 'Back to now.'],
    ['Share', 0.3, 'A review link for the venue, from the document room.'], ['Share', 2.0, 'No account for the guest. She sees this version only.'], ['Share', 5.6, 'Shared, and waiting on her.'],
    ['Guest', 0.3, 'What Inês sees: the document alone. Atelier is only the frame.'], ['Guest', 2.4, 'She comments on a passage. It arrives in the document room.'],
    ['End', 0.3, 'January. Noor asked first: the retreat is finished. Home stays, at Project scale, with no lime.'], ['End', 3.2, 'Start the next one from this: choose what carries forward.'], ['End', 6.8, 'The next retreat starts from what this one learned.'],
    ['Data', 0.3, 'The scientist. A data view: the figure first, then the method and its caveats.'], ['Data', 2.6, 'A source chip opens a preview that hangs from the chip.'],
    ['Read', 0.3, 'Readers can switch how they read. Theo’s choice stays the shared one.'], ['Read', 4.6, 'Open full ↗'],
    ['Diff', 0.3, 'Changes in the one diff language: tinted cells, old values struck through. Never red or green.']
  ];
  const STEPS = [
    ['Doc', 0.6, 'doc.sel'], ['Doc', 2.6, 'doc.comment', 1], ['Doc', 3.3, 'doc.ccomp', 1], ['Doc', 5.6, 'doc.csend', 1], ['Doc', 7.6, 'doc.editlink', 1],
    ['Edit', 0.9, 'ed.caret'], ['Edit', 5.0, 'ed.save', 1], ['Edit', 7.2, 'ed.v4'],
    ['Deck', 0.6, 'dk.t1'], ['Deck', 2.0, 'dk.t3', 1], ['Deck', 3.8, 'dk.c1'], ['Deck', 5.6, 'dk.present', 1],
    ['Present', 1.2, 'pr.stop'], ['Present', 4.2, 'pr.stop', 1],
    ['Knows', 0.6, 'kn.using'], ['Knows', 1.6, 'kn.using', 1], ['Knows', 3.0, 'kn.f1'], ['Knows', 4.4, 'kn.forget', 1], ['Knows', 6.4, 'kn.undo'],
    ['Find', 0.5, 'fd.search', 1], ['Find', 2.6, 'fd.r1'], ['Find', 3.4, 'fd.r1', 1], ['Find', 5.6, 'fd.back'],
    ['Dmg', 0.6, 'dmg.icon'], ['Dmg', 1.1, 'dmg.icon', 1], ['Dmg', 3.4, 'dmg.icon'],
    ['First', 1.0, 'fw.head'], ['First', 3.6, 'fw.start', 1],
    ['AI', 1.0, 'ai.r2'], ['AI', 2.4, 'ai.use'], ['AI', 3.4, 'ai.use', 1],
    ['Goal', 0.4, 'gl.goal', 1], ['Goal', 3.7, 'gl.name', 1], ['Goal', 5.4, 'gl.k.Events', 1], ['Goal', 7.6, 'gl.meet', 1],
    ['Outline', 1.0, 'ol.t0'], ['Outline', 2.9, 'ol.t3'], ['Outline', 3.4, 'ol.t3', 1], ['Outline', 6.0, 'ol.back'], ['Outline', 6.6, 'ol.back', 1],
    ['Share', 0.6, 'sh.share'], ['Share', 1.2, 'sh.share', 1], ['Share', 1.8, 'sh.with', 1], ['Share', 4.4, 'sh.go', 1], ['Share', 6.4, 'sh.row'],
    ['Guest', 0.8, 'gs.sel'], ['Guest', 2.1, 'gs.cbtn', 1], ['Guest', 2.6, 'gs.field', 1], ['Guest', 4.9, 'gs.send', 1],
    ['End', 1.2, 'en.wrap'], ['End', 3.0, 'en.next', 1], ['End', 5.0, 'cf.boats', 1], ['End', 6.6, 'cf.start', 1],
    ['Data', 1.0, 'da.fig'], ['Data', 2.4, 'da.chip'], ['Data', 5.6, 'da.chip'], ['Data', 6.8, 'da.read'],
    ['Read', 0.6, 'da.read', 1], ['Read', 2.2, 'rd.table', 1], ['Read', 4.8, 'rd.full', 1],
    ['Diff', 1.4, 'df.row'], ['Diff', 4.6, 'df.close', 1]
  ];

  const DayRuler = ({ x, y, w, n, ev, now, band, marks, hover, sel, keys, nowLabel, noNow }) => {
    const P = React.useContext(PalCtx), Cc = COL(P), s = (w - 24) / n, p = (i) => x + 12 + i * s, out = [];
    if (band) out.push(<div key="b" style={{ ...A, left: p(band[0]), top: y - 30, width: p(band[1]) - p(band[0]), height: 30, borderRadius: 6, background: P.fernTint, opacity: .55 }} />);
    const f = hover != null ? hover : sel != null ? sel : (noNow ? -99 : now), amp = hover != null ? 18 : 8;
    for (let i = 0; i <= n; i++) {
      if (!noNow && i === now) continue;
      const e = ev[i]; let len = (e ? 11 : 6) + amp * Math.exp(-Math.pow((i - f) / 2.6, 2)), c = e ? Cc[e] : P.edge, o = e ? 1 : .45;
      if (i === sel) { len = 30; c = P.ink; o = 1; }
      out.push(<div key={i} data-t={keys && keys[i]} style={{ ...A, left: p(i) - .5, top: y - len, width: 1, height: len, borderRadius: 1, background: c, opacity: o }} />);
    }
    if (!noNow) { out.push(<div key="n" style={{ ...A, left: p(now) - 1, top: y - 34, width: 2, height: 34, borderRadius: 1, background: P.lime }} />); out.push(<span key="nl" style={{ ...A, left: p(now), top: y + 10, transform: 'translateX(-50%)', font: '600 12px/1 ' + MONO, letterSpacing: '.08em', color: P.ink, whiteSpace: 'nowrap' }}>{nowLabel || 'NOW'}</span>); }
    (marks || []).forEach((m, i) => out.push(<React.Fragment key={'m' + i}><div style={{ ...A, left: p(m.i), top: y - 44, width: 1, height: 52, background: P.ink }} /><span style={{ ...A, left: p(m.i) + (m.left ? -8 : 8), top: y + 10, transform: m.left ? 'translateX(-100%)' : 'none', font: '400 12px/1.3 ' + MONO, letterSpacing: '.08em', textTransform: 'uppercase', color: P.ink, whiteSpace: 'nowrap' }}>{m.t}</span></React.Fragment>));
    return <>{out}</>;
  };

  function Piece({ dark }) {
    const { T, CUES: C0 } = useComposition();
    const P = dark ? PAL.dark : PAL.light;
    const DUR = React.useMemo(() => { const d = {}; try { JSON.parse(window.OM_SCENES).forEach((s) => { d[s.name] = s.dur; }); } catch (e) {} return d; }, []);
    const PRES = ORDER.filter((k) => DUR[k] != null), FIRSTP = ORDER.indexOf(PRES[0]), C = {};
    ORDER.forEach((k, i) => { C[k] = DUR[k] != null ? C0[k] : (i < FIRSTP ? -1e6 : 1e6); });
    const LASTP = PRES[PRES.length - 1];
    const cardRef = React.useRef(null), tgt = React.useRef({}), lastForce = React.useRef(-1);
    const [, force] = React.useState(0);
    React.useLayoutEffect(() => {
      const card = cardRef.current; if (!card) return;
      const cr = card.getBoundingClientRect(), s = cr.width / 1440; if (!s) return;
      const seen = {};
      card.querySelectorAll('[data-t]').forEach((el) => {
        const r = el.getBoundingClientRect(); if (!r.width && !r.height) return;
        let sc = el.parentElement, o = 1; while (sc && sc !== card) { if (sc.dataset && sc.dataset.scene) { o = parseFloat(sc.style.opacity || '1'); break; } sc = sc.parentElement; }
        const k = el.getAttribute('data-t');
        if (!seen[k] || o > seen[k].o) seen[k] = { o: o, x: (r.left - cr.left + r.width / 2) / s, y: (r.top - cr.top + r.height / 2) / s };
      });
      let ch = false;
      Object.keys(seen).forEach((k) => { const v = seen[k], o = tgt.current[k]; if (!o || Math.abs(o.x - v.x) > 1.5 || Math.abs(o.y - v.y) > 1.5) { tgt.current[k] = { x: v.x, y: v.y }; ch = true; } });
      if (ch && lastForce.current !== T) { lastForce.current = T; force((n) => n + 1); }
    });
    const at = (s, o) => C[s] + o, u = (s) => T - C[s];
    const op = {}; ORDER.forEach((k) => { op[k] = 0; }); PRES.forEach((k, i) => { const a = C[k] - 0.3, b = PRES[i + 1] ? C[PRES[i + 1]] + 0.15 : C[k] + 99; op[k] = clamp(Math.min((T - a) / 0.3, (b - T) / 0.3), 0, 1); });
    const pos = (k) => tgt.current[k];
    const S = STEPS.map(([s, o, k, c]) => ({ t: at(s, o), k: k, c: !!c }));
    let cx = 1100, cy = 700;
    { let i = S.findIndex((s) => s.t > T); if (i === -1) i = S.length; const pv = S[Math.max(0, i - 1)], nx = S[Math.min(S.length - 1, i)]; let p0 = null, p1 = null; for (let j = Math.max(0, i - 1); j >= 0 && !p0; j--) p0 = pos(S[j].k) || null; for (let j = Math.min(S.length - 1, i); j < S.length && !p1; j++) p1 = pos(S[j].k) || null; if (!p0) p0 = p1; if (!p1) p1 = p0; if (p0 && p1) { if (i === 0) { cx = p1.x; cy = p1.y; } else if (i >= S.length) { cx = p0.x; cy = p0.y; } else { const st = Math.max(pv.t, nx.t - 0.9), uu = EZ.glide(clamp((T - st) / Math.max(.01, nx.t - st), 0, 1)); cx = lerp(p0.x, p1.x, uu); cy = lerp(p0.y, p1.y, uu); } } }
    const curOp = win(T, C[PRES[0]] + 0.5, C[LASTP] + (DUR[LASTP] || 6) - 0.9, 0.5);
    const clicks = S.filter((s) => s.c).map((s) => s.t);
    const caps = CAPS.map(([s, o, t]) => ({ at: at(s, o), text: t }));
    const curScene = ORDER.filter((k) => T >= C[k] - 0.2).pop() || PRES[0];

    // ===== shared pieces =====
    const Shelf = ({ children }) => <><div style={{ ...A, left: 960, top: 72, bottom: 0, width: 1, background: P.line }} /><div style={{ ...A, left: 1000, top: 104, width: 320, display: 'flex', flexDirection: 'column', gap: 22 }}>{children}</div></>;
    const STabs = ({ on }) => <Tabs items={['Shelf', 'Evidence', 'Ask']} on={on} />;
    const Foot = ({ d }) => <Lab style={{ ...A, left: 48, top: 876 }}>{d}</Lab>;
    const caret = (k) => <span data-t={k} style={{ display: 'inline-block', width: 1.5, height: 19, marginLeft: 2, verticalAlign: -4, background: P.fern }} />;
    const brandBar = (t) => <Bar left={<><span style={{ font: '400 32px/1 ' + SERIF, display: 'flex', alignItems: 'baseline', gap: 2 }}>a<span style={{ width: 6, height: 6, borderRadius: '50%', background: '#e0875a', display: 'inline-block' }} /></span><span style={{ font: '400 22px/1 ' + SERIF }}>{t}</span></>} />;
    const crumbBar = (back, kind, title) => <Bar left={<Back t={back} crumb={<><Lab>{kind}</Lab><span style={{ font: '400 22px/1 ' + SERIF, whiteSpace: 'nowrap' }}>{title}</span></>} />} />;
    const kiriBar = <Bar left={<Back t="Monet" crumb={<><Face k="kiri" s={32} /><span style={{ font: '400 24px/1 ' + SERIF }}>Kiri</span><span style={{ font: '400 14px/1 ' + SANS, color: P.faint, whiteSpace: 'nowrap' }}>Your lead on Monet</span></>} />} />;
    const Spine = ({ items, k }) => <>{items.map(([t, c], i) => <div key={i} data-t={i === items.length - 1 ? k : undefined} style={{ ...A, left: 48, top: 160 + i * 52, display: 'flex', alignItems: 'center', gap: 12 }}><div style={{ width: 14, height: 1, background: c }} /><Lab s={11}>{t}</Lab></div>)}<div style={{ ...A, left: 48, top: 160 + items.length * 52, display: 'flex', alignItems: 'center', gap: 12 }}><div style={{ width: 34, height: 2, background: P.lime }} /><Lab s={11} c={P.ink}>Now</Lab></div></>;
    const margin = (n) => <>{Array.from({ length: n }, (_, i) => <div key={i} style={{ ...A, left: 48, top: 150 + i * 24, width: i % 4 === 0 ? 14 : 7, height: 1, background: i % 4 === 0 ? P.ink : P.edge, opacity: i % 4 === 0 ? 1 : .45 }} />)}<div style={{ ...A, left: 48, top: 150 + n * 24, width: 34, height: 2, background: P.lime }} /></>;
    const thread = (children) => <div style={{ ...A, left: 300, top: 104, width: 620, height: 670, overflow: 'hidden', display: 'flex', flexDirection: 'column', justifyContent: 'flex-end', gap: 18, WebkitMaskImage: 'linear-gradient(to bottom, transparent 0, #000 56px)', maskImage: 'linear-gradient(to bottom, transparent 0, #000 56px)' }}>{children}</div>;
    const comp = (ph) => <div style={{ ...A, left: 300, top: 800, width: 620, height: 52, boxSizing: 'border-box', display: 'flex', alignItems: 'center', gap: 12, padding: '0 2px', borderBottom: '1px solid ' + P.line2 }}><span style={{ font: '400 20px/1 ' + SANS, color: P.faint }}>+</span><span style={{ flex: 1, font: '400 16px/1 ' + SANS, color: P.faint }}>{ph}</span><Lab>Return</Lab></div>;
    const field = (l, v, hint, k, focus, w) => <div style={{ display: 'flex', flexDirection: 'column', gap: 6, width: w }}><Lab>{l}</Lab><div data-t={k} style={{ minHeight: 46, display: 'flex', alignItems: 'center', borderBottom: focus ? '2px solid ' + P.fern : '1px solid ' + P.line2, font: '400 19px/1.45 ' + READ, color: P.ink, paddingBottom: 4 }}><span>{v}{focus ? caret() : null}</span></div>{hint ? <span style={{ font: '400 13px/1.4 ' + SANS, color: P.faint }}>{hint}</span> : null}</div>;
    const chip = (t) => <span style={{ alignSelf: 'flex-start', padding: '5px 9px', borderRadius: 6, background: P.fernTint, font: '400 11px/1.3 ' + MONO, letterSpacing: '.08em', textTransform: 'uppercase', color: P.ink, whiteSpace: 'nowrap' }}>{t}</span>;
    const check = (on) => <span style={{ width: 16, height: 16, boxSizing: 'border-box', borderRadius: 4, border: '1px solid ' + (on ? P.ink : P.edge), background: on ? P.ink : 'transparent', display: 'flex', alignItems: 'center', justifyContent: 'center', color: P.paper, font: '600 11px/1 ' + SANS, flex: 'none' }}>{on ? '✓' : ''}</span>;
    const dotted = { textDecoration: 'underline', textDecorationStyle: 'dotted', textDecorationColor: P.fern, textUnderlineOffset: 5 };
    const StepRuler = ({ at: a, y }) => { const L = ['This Mac', 'An AI', 'Your goal', 'Your team', 'Home'], X = (i) => 120 + i * 300; return <><div style={{ ...A, left: 120, top: y, width: 1200, height: 1, background: P.line }} />{L.map((t, i) => { const done = i < a - 0.01; return <React.Fragment key={t}><div style={{ ...A, left: X(i) - .5, top: y - (done ? 11 : 6), width: 1, height: done ? 11 : 6, background: done ? P.ink : P.edge, opacity: done ? 1 : .6 }} /><span style={{ ...A, left: X(i), top: y + 12, transform: 'translateX(-50%)', font: '400 12px/1.3 ' + MONO, letterSpacing: '.08em', textTransform: 'uppercase', color: done || Math.abs(i - a) < 0.5 ? P.ink : P.faint, whiteSpace: 'nowrap' }}>{t}</span></React.Fragment>; })}<div style={{ ...A, left: X(a) - 1, top: y - 34, width: 2, height: 34, borderRadius: 1, background: P.lime }} /></>; };
    const sheet = (o, children, l, r) => o <= 0.01 ? null : <div style={{ ...A, inset: 0, opacity: o, zIndex: 6 }}><div style={{ ...A, inset: 0, background: P.scrim }} /><div style={{ ...A, left: l || 420, right: r || l || 420, top: 96, boxSizing: 'border-box', padding: '30px 40px 28px', background: P.paper, borderRadius: 14, boxShadow: P.sheet, display: 'flex', flexDirection: 'column', gap: 18, transform: 'translateY(' + (1 - o) * 12 + 'px)' }}>{children}</div></div>;

    // ===== Help: fees, the document room (Doc + Edit) =====
    const HelpDoc = ({ uD, uE, mode }) => {
      const SEL = 'The fee you see before you confirm is exactly the fee you pay.';
      const isDoc = mode === 'doc', selOn = isDoc && uD >= 0.8 && uD < 5.8, selShown = selOn ? typedC(SEL, uD, 0.8, 1.7) : '';
      const barOn = isDoc && uD >= 1.9 && uD < 3.0, commented = !isDoc || uD >= 5.8, cOpen = isDoc && uD >= 3.0 && uD < 5.8;
      const cText = cOpen ? typedC('Is “exactly” too strong for a help page?', uD, 3.5, 5.3) : '';
      const stripO = isDoc ? 0 : win(uE, 0.1, 6.3, 0.35), saving = !isDoc && uE >= 5.2 && uE < 6.2, saved = !isDoc && uE >= 6.2;
      const added = isDoc ? '' : typedC(' We round once, at the very end, so the two always match.', uE, 1.2, 4.4);
      const pS = { margin: 0, font: '400 19px/1.75 ' + DOCF, color: P.ink };
      const selEl = <span data-t="doc.sel" style={{ position: 'relative' }}>{selOn ? <><span style={{ background: P.fernTint }}>{selShown}</span>{SEL.slice(selShown.length)}</> : <span style={commented ? dotted : null}>{SEL}</span>}{barOn ? <span style={{ ...A, left: 0, top: -54, display: 'flex', gap: 18, padding: '9px 14px', borderRadius: 8, background: P.paper, border: '1px solid ' + P.line2, font: '500 14px/1 ' + SANS, color: P.ink, whiteSpace: 'nowrap', zIndex: 4 }}><span data-t="doc.edit">Edit</span><span data-t="doc.ask">Ask</span><span data-t="doc.comment">Comment</span></span> : null}</span>;
      return <>
        {crumbBar('Monet', 'Document', 'Help: fees')}
        <Spine k="ed.v4" items={[['V1 · Mei · 21 Sep', P.ink], ['V2 · Mei · 28 Sep', P.ink], ['V3 · Mei · approved', P.ink]].concat(saved ? [['V4 · You · 09:16', P.ink]] : [])} />
        {stripO > 0.01 ? <div style={{ ...A, left: 300, top: 84, width: 620, height: 56, opacity: stripO, display: 'flex', alignItems: 'center', gap: 20, borderBottom: '1px solid ' + P.line, font: '500 14px/1 ' + SANS, color: P.ink }}><span>Text ▾</span><span style={{ fontFamily: DOCF }}>Georgia ▾</span><span style={{ width: 14, height: 14, borderRadius: 3, background: P.ink }} /><span style={{ fontWeight: 700 }}>B</span><span style={{ fontStyle: 'italic' }}>I</span><span style={{ color: P.faint, fontWeight: 400 }}>Insert or /</span><span style={{ flex: 1 }} /><Btn kind="lime" k="ed.save" style={{ height: 40, lineHeight: '40px', padding: '0 18px', opacity: saving ? .7 : 1 }}>{saving ? 'Saving…' : 'Save version 4'}</Btn><Btn>Cancel</Btn></div> : null}
        <div style={{ ...A, left: 300, top: 112 + 52 * stripO, width: 620, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Lab>{saved ? 'Help page · version 4 · you · 09:16' : 'Help page · Mei · version 3 · approved'}</Lab>
          <span style={{ font: '400 40px/1.1 ' + DOCF, color: P.ink }}>Help: fees</span>
          {isDoc ? <div style={{ display: 'flex', gap: 22, alignItems: 'center' }}><Btn kind="fern" k="doc.editlink">Edit</Btn><Btn kind="undo">Download</Btn></div> : <div style={{ height: 8 }} />}
          <span style={{ font: '400 25px/1.2 ' + DOCF, color: P.ink, marginTop: 6 }}>How fees work</span>
          <p style={pS}>Every swap has a small fee. {selEl}<span>{added}</span>{!isDoc && uE >= 0.6 && uE < 5.0 ? caret('ed.caret') : null}</p>
          <p style={pS}>Fees go to the people who provide the funds you swap with.</p>
          <p style={pS}>If a swap fails, no fee is charged, and nothing leaves your wallet.</p>
        </div>
        <Shelf>
          <STabs on="Shelf" />
          {cOpen ? <div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingBottom: 14, borderBottom: '1px solid ' + P.line }}><Lab c={P.ink}>Comment</Lab>{chip('“exactly” · paragraph 1 ×')}<div data-t="doc.ccomp" style={{ minHeight: 44, display: 'flex', alignItems: 'center', borderBottom: '2px solid ' + P.fern, font: '400 16px/1.4 ' + READ, color: cText ? P.ink : P.faint }}>{cText || 'Write a comment'}</div><div style={{ display: 'flex', gap: 18 }}><Btn k="doc.csend" style={{ color: P.ink }}>Comment</Btn><Btn kind="undo">Cancel</Btn></div></div> : null}
          <Sec t={'Comments · ' + (commented ? 2 : 1)}>{commented ? <Row c={P.ink} t="You · on “exactly”" m="09:13" /> : null}<Row c={P.ink} t="Sora · on “exactly”" m="answered · v3" /></Sec>
          <Sec t={'Versions · ' + (saved ? 4 : 3)}>{saved ? <Row c={P.ink} t="Version 4" m="you · 09:16" /> : null}<Row c={P.ink} t="Version 3" m="Mei · approved" /><Row c={P.ink} t="Version 2" m="Mei · 28 Sep" /></Sec>
        </Shelf>
        <Foot d={'Thu 1 Oct · ' + (isDoc ? '09:13' : saved ? '09:16' : '09:15')} />
      </>;
    };

    // ===== the deck =====
    const SB = '#1c2733', SI = '#f3f1ec', SS = '#b7c0c9', SA = '#5fb3b3';
    const SlideBody = ({ n }) => {
      const base = { ...A, inset: 0, background: SB, color: SI, fontFamily: DOCF };
      if (n === 1) return <div style={base}><div style={{ ...A, left: 120, top: 120, width: 80, height: 4, background: SA }} /><div style={{ ...A, left: 120, top: 300, font: '400 104px/1.05 ' + DOCF }}>Monet launches Friday</div><div style={{ ...A, left: 120, top: 440, font: '400 38px/1.3 ' + DOCF, color: SS }}>Launch week · 12–16 October</div></div>;
      if (n === 2) return <div style={base}><div style={{ ...A, left: 120, top: 120, font: '400 76px/1.1 ' + DOCF }}>What changed this week</div>{['The fee you see is the fee you pay', 'Gas cost shown in dollars', 'A clearer confirm screen'].map((t, i) => <div key={i} style={{ ...A, left: 120, top: 300 + i * 96, font: '400 44px/1.3 ' + DOCF, color: i === 0 ? SI : SS }}>{'— ' + t}</div>)}</div>;
      if (n === 3) return <div style={base}><div style={{ ...A, left: 120, top: 110, font: '400 104px/1.05 ' + DOCF }}>Shown = charged</div><div style={{ ...A, left: 120, top: 240, font: '400 38px/1.3 ' + DOCF, color: SS }}>2,000 real quotes, to the cent</div><div style={{ ...A, left: 120, right: 120, top: 360, bottom: 120, display: 'flex', alignItems: 'flex-end', gap: 48, borderBottom: '2px solid ' + SS }}>{[40, 62, 50, 78, 66, 90].map((v, i) => <div key={i} style={{ flex: 1, height: v + '%', display: 'flex', gap: 10, alignItems: 'flex-end' }}><div style={{ flex: 1, height: '100%', background: SA }} /><div style={{ flex: 1, height: '100%', background: SI, opacity: .85 }} /></div>)}</div></div>;
      return <div style={base}><div style={{ ...A, left: 120, top: 290, font: '400 96px/1.1 ' + DOCF }}>Friday 16 October, 18:00</div><div style={{ ...A, left: 120, top: 430, font: '400 40px/1.3 ' + DOCF, color: SS }}>Questions?</div></div>;
    };
    const Slide = ({ n, w, k, ring }) => <div data-t={k} style={{ width: w, height: w * 9 / 16, position: 'relative', overflow: 'hidden', borderRadius: w < 300 ? 4 : 6, boxShadow: ring ? '0 0 0 2px ' + P.paper + ',0 0 0 3.5px ' + P.ink : '0 0 0 1px ' + P.line2, flex: 'none' }}><div style={{ ...A, left: 0, top: 0, width: 1440, height: 810, transform: 'scale(' + (w / 1440) + ')', transformOrigin: '0 0' }}><SlideBody n={n} /></div></div>;
    const NOTES = { 1: 'Open on the date. Keep it short; the team did the work.', 3: 'Say: we round once, at the very end. 2,000 real quotes match to the cent.' };

    // ===== Kiri's room (Knows + Find) =====
    const KiriRoom = ({ uK, uF, mode }) => {
      const isK = mode === 'knows', ev = isK && uK >= 1.6, hov = isK && uK >= 3.0, forgot = isK && uK >= 4.4, noted = isK && uK >= 5.6;
      const typed = !isK ? typedC('fee', uF, 0.8, 1.4) : '', found = !isK && uF >= 1.5, opened = !isK && uF >= 3.4;
      return <>
        {kiriBar}
        {margin(isK ? 19 : 21)}
        {thread(isK ? <>
          <div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><span style={{ flex: 1, height: 1, background: P.line }} /><Lab>Today</Lab><span style={{ flex: 1, height: 1, background: P.line }} /></div>
          <Lab c={P.ink}>You merged the exact-fee fix · 07:52</Lab>
          <Pill>Should the home screen show a chart of the fees?</Pill>
          <Said l="Kiri · 09:21">I’d keep it in words. You’ve said you prefer plain sentences over charts on Home, so I’d show the fee as one line under the ask.</Said>
          <span data-t="kn.using" style={{ alignSelf: 'flex-start', font: 'italic 400 17px/24px ' + SERIF, color: P.fern }}>Using what Monet knows ›</span>
          {forgot ? <Lab>Monet forgot one thing you said · 09:22</Lab> : null}
          {noted ? <Said l="Kiri · 09:22">Noted. I won’t assume that again. Shall I sketch both, so you can see?</Said> : null}
        </> : <>
          <Pill>Where did we land on the help page?</Pill>
          <Said l="Kiri · 09:23">Mei’s version 3, with your sentence added this morning as version 4. Sora’s comment on “exactly” is answered.</Said>
        </>)}
        {comp('Write to Kiri')}
        <Shelf>
          {isK && !ev ? <><STabs on="Shelf" /><Sec t="Here"><Row c={P.oat} t="Rounding plan" m="proposal · waits" /></Sec><div style={{ paddingTop: 16, borderTop: '1px solid ' + P.ink }}><Sec t="Monet"><Row c={P.ink} t="Fees round once, at the end" m="knows · you" /><span style={{ display: 'block', paddingTop: 8, font: '400 14px/1.4 ' + SANS, color: P.faint }}>Made 31 · Brought in 12 · Monet knows 27 · Code ›</span></Sec></div></> : null}
          {ev ? <><STabs on="Evidence" /><span style={{ font: '400 22px/1.2 ' + SERIF }}>What Monet knows, used here</span>
            <div data-t="kn.f1" style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '12px 0', borderTop: '1px solid ' + P.line }}>{forgot ? <><Lab c={P.ink}>You asked Monet to forget this · 09:22</Lab><div style={{ display: 'flex' }}><Btn kind="undo" k="kn.undo">Undo</Btn></div></> : <><span style={{ font: '400 18px/1.4 ' + READ }}>Tachi prefers plain words over charts on Home</span><Lab>You said it · 12 Sep · in Kiri’s room</Lab>{hov ? <div style={{ display: 'flex', gap: 18 }}><Btn kind="undo">Correct</Btn><Btn kind="undo" k="kn.forget">Forget</Btn></div> : null}</>}</div>
            <div style={{ display: 'flex', flexDirection: 'column', gap: 6, padding: '12px 0', borderTop: '1px solid ' + P.line }}><span style={{ font: '400 18px/1.4 ' + READ }}>Fees round once, at the end</span><Lab>You decided · Wed 15:20</Lab></div>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', borderTop: '1px solid ' + P.line, paddingTop: 6 }}><Lab>{'Monet knows · ' + (forgot ? 26 : 27)}</Lab><Btn kind="undo">Back to the shelf</Btn></div></> : null}
          {!isK && !opened ? <><STabs on="Shelf" /><Sec t="Here"><Row c={P.oat} t="Rounding plan" m="proposal · waits" /></Sec><div style={{ display: 'flex', flexDirection: 'column', gap: 10, paddingTop: 16, borderTop: '1px solid ' + P.ink }}><Lab c={P.ink}>Monet · the team’s library</Lab><div data-t="fd.search" style={{ height: 44, display: 'flex', alignItems: 'center', gap: 10, borderBottom: uF >= 0.5 ? '2px solid ' + P.fern : '1px solid ' + P.line2 }}><span style={{ flex: 1, font: '400 17px/1 ' + READ, color: typed ? P.ink : P.faint }}>{typed || 'Search Monet’s library'}{uF >= 0.5 ? caret() : null}</span>{found ? <span style={{ font: '400 13px/1 ' + SANS, color: P.faint }}>5 found</span> : null}</div>
            {found ? <div><div data-t="fd.r1"><Row c={P.ink} t="Help: fees" m="document · v4" /></div><Row c={P.ink} t="Exact-fee fix" m="change · merged" /><Row c={P.ink} t="Fees round once, at the end" m="knows · you" /><Row c={P.ink} t="Fee calculator" m="applet · Kiri" /><Row c={P.ink} t="Fee tests" m="tests · Yuki" /></div> : <span style={{ font: '400 14px/1.4 ' + SANS, color: P.faint }}>Made 31 · Brought in 12 · Monet knows 26 · Code</span>}
            {found ? <span style={{ font: '400 13px/1.4 ' + SANS, color: P.faint }}>In Made, Brought in, Monet knows and the code.</span> : null}</div></> : null}
          {opened ? <><STabs on="Evidence" /><div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}><span style={{ font: '400 24px/1.1 ' + SERIF }}>Help: fees</span><span style={{ font: 'italic 400 16px/22px ' + SERIF, color: P.fern }}>Open full ↗</span></div><Lab>Document · version 4 · you · 09:16</Lab><div style={{ display: 'flex', flexDirection: 'column', gap: 10, font: '400 16px/1.6 ' + DOCF, color: P.ink, padding: '14px 0', borderTop: '1px solid ' + P.line, borderBottom: '1px solid ' + P.line }}><span style={{ font: '400 20px/1.2 ' + DOCF }}>How fees work</span><span>Every swap has a small fee. The fee you see before you confirm is exactly the fee you pay. We round once, at the very end, so the two always match.</span></div><div style={{ display: 'flex' }}><Btn kind="undo" k="fd.back">Back to the shelf</Btn></div></> : null}
        </Shelf>
        <Foot d={'Thu 1 Oct · ' + (isK ? (forgot ? '09:22' : '09:21') : '09:24')} />
      </>;
    };

    // ===== the retreat's run of show (Share) =====
    const RunDoc = ({ uS }) => {
      const sO = win(uS, 1.2, 5.4, 0.3), mail = typedC('ines@quintadaserra.pt', uS, 2.0, 3.6), sending = uS >= 4.4 && uS < 5.2, shared = uS >= 5.5;
      const pS = { margin: 0, font: '400 19px/1.75 ' + DOCF, color: P.ink };
      return <>
        {crumbBar('The December retreat', 'Document', 'Run of show')}
        <Spine items={[['V1 · Ada · 24 Nov', P.ink], ['V2 · Ada · approved', P.ink]]} />
        <div style={{ ...A, left: 300, top: 112, width: 620, display: 'flex', flexDirection: 'column', gap: 16 }}>
          <Lab>Run of show · Ada · version 2 · approved</Lab>
          <span style={{ font: '400 40px/1.1 ' + DOCF }}>Run of show</span>
          <div style={{ display: 'flex', gap: 22, alignItems: 'center' }}><Btn kind="fern" k="sh.share">Share</Btn><Btn kind="undo">Download</Btn></div>
          <span style={{ font: '400 25px/1.2 ' + DOCF, marginTop: 6 }}>Thursday 11 December</span>
          <p style={pS}>Guests arrive from 14:00. The welcome dinner moves to 19:30 so the late flights make it.</p>
          <span style={{ font: '400 25px/1.2 ' + DOCF, marginTop: 6 }}>Friday 12 December</span>
          <p style={pS}>The working day: two sessions in the morning, the boat in the afternoon.</p>
        </div>
        <Shelf><STabs on="Shelf" />{shared ? <Sec t="Shared with · 1"><div data-t="sh.row"><Row c={P.oat} t="Inês · Quinta da Serra" m="waiting on her" /></div></Sec> : null}<Sec t="Versions · 2"><Row c={P.ink} t="Version 2" m="Ada · approved" /><Row c={P.ink} t="Version 1" m="Ada · 24 Nov" /></Sec></Shelf>
        {sheet(sO, <>
          <Lab>A review link</Lab>
          <span style={{ font: '400 32px/1.1 ' + SERIF }}>Share “Run of show”</span>
          {field('With', mail || '', null, 'sh.with', uS >= 1.8 && uS < 3.8)}
          {field('They can', 'Read, and comment on passages')}
          <span style={{ font: '400 15px/1.5 ' + SANS, color: P.sub }}>No account needed. Inês sees version 2 only, and her comments arrive here.</span>
          <div style={{ display: 'flex', gap: 22, alignItems: 'center' }}><Btn kind="lime" k="sh.go" style={{ opacity: sending ? .7 : 1 }}>{sending ? 'Sending…' : 'Share it'}</Btn><Btn>Cancel</Btn></div>
        </>)}
        <Foot d={'Wed 2 Dec · 10:10'} />
      </>;
    };

    // ===== Ocean salinity, the analysis room (Data + Read) =====
    const DEP = [['0 m', '35.12', '35.12'], ['100 m', '35.31', '35.33'], ['200 m', '35.40', '35.70'], ['500 m', '34.92', '34.95'], ['1000 m', '34.58', '34.58']];
    const Analysis = ({ uD, uR, mode }) => {
      const isD = mode === 'data', prev = isD && uD >= 2.6 && uD < 5.6, opts = !isD && uR >= 0.6, table = !isD && uR >= 2.2;
      const v2 = [30, 26, 12, 30, 34, 36, 38], v1 = [30, 27, 24, 30, 34, 36, 38];
      const pts = (a) => a.map((v, i) => (i / (a.length - 1) * 100).toFixed(1) + ',' + v).join(' ');
      const chipEl = <span data-t="da.chip" style={{ position: 'relative', padding: '3px 7px', borderRadius: 5, background: P.fernTint, font: '400 11px/1.3 ' + MONO, letterSpacing: '.08em', textTransform: 'uppercase', color: P.ink, whiteSpace: 'nowrap' }}>Argo 2025 · p.4{prev ? <span style={{ ...A, left: 0, top: 26, display: 'flex', flexDirection: 'column', alignItems: 'flex-start', zIndex: 5, textTransform: 'none', letterSpacing: 0 }}><span style={{ width: 1, height: 14, marginLeft: 20, background: P.line2 }} /><span style={{ width: 340, boxSizing: 'border-box', padding: '12px 14px', borderRadius: 10, background: P.paper, border: '1px solid ' + P.line2, display: 'flex', flexDirection: 'column', gap: 6, whiteSpace: 'normal' }}><Lab>Argo 2025 · page 4</Lab><span style={{ font: '400 15px/1.45 ' + READ, color: P.ink }}>Recalibration shifted mid-depth salinity by up to 0.3 PSU.</span><span style={{ font: 'italic 400 16px/22px ' + SERIF, color: P.fern }}>Open the source</span></span></span> : null}</span>;
      return <>
        {crumbBar('Ocean salinity', 'Analysis', 'Salinity by depth')}
        <div style={{ ...A, left: 120, top: 104, width: 780, display: 'flex', flexDirection: 'column', gap: 14 }}>
          <Lab>Analysis · Theo · version 2 · after recalibration</Lab>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}><span style={{ font: '400 36px/1.1 ' + DOCF }}>Salinity by depth</span><span data-t="rd.full" style={{ font: 'italic 400 18px/24px ' + SERIF, color: P.fern }}>Open full ↗</span></div>
          <p style={{ margin: 0, font: '400 21px/1.5 ' + READ, color: P.ink, textWrap: 'pretty' }}>Salinity at 200 m rose 0.3 PSU after recalibration. Every other depth moved by less than 0.03.</p>
          <div data-t="da.fig" style={{ height: 290, position: 'relative', borderBottom: '1px solid ' + P.line }}>
            <div style={{ ...A, inset: 0, opacity: table ? 0 : 1 }}><svg viewBox="0 0 100 40" preserveAspectRatio="none" style={{ ...A, left: 0, top: 10, width: '100%', height: 240 }}><polygon points={'0,40 ' + pts(v2) + ' 100,40'} fill={P.fern} opacity=".16" /><polyline points={pts(v1)} fill="none" stroke={P.faint} strokeWidth="1.2" strokeDasharray="3 3" vectorEffect="non-scaling-stroke" /><polyline points={pts(v2)} fill="none" stroke={P.fern} strokeWidth="1.8" vectorEffect="non-scaling-stroke" /></svg>{['0 m', '200 m', '500 m', '1000 m'].map((t, i) => <Lab key={t} s={11} style={{ ...A, left: ['0%', '32%', '62%', '92%'][i], top: 262 }}>{t}</Lab>)}<Lab s={11} style={{ ...A, right: 0, top: 0 }}>– – v1 · — v2 · PSU</Lab></div>
            <div style={{ ...A, inset: 0, opacity: table ? 1 : 0, display: 'flex', flexDirection: 'column' }}><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '8px 0', borderBottom: '1px solid ' + P.line2 }}><Lab>Depth</Lab><Lab>PSU · v2</Lab><Lab>Change</Lab></div>{DEP.map(([d, a, b]) => <div key={d} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '11px 0', borderBottom: '1px solid ' + P.line, font: '400 16px/1.3 ' + MONO, color: P.ink }}><span>{d}</span><span>{b}</span><span style={{ color: P.sub }}>{(+b - +a >= 0 ? '+' : '') + (+b - +a).toFixed(2)}</span></div>)}</div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '90px minmax(0,1fr)', gap: 14, alignItems: 'baseline', paddingTop: 4 }}><Lab>Method</Lab><span style={{ font: '400 17px/1.6 ' + READ, color: P.ink }}>Argo floats, 2026, recalibrated against the lab’s casts {chipEl}</span></div>
          <div style={{ display: 'grid', gridTemplateColumns: '90px minmax(0,1fr)', gap: 14, alignItems: 'baseline' }}><Lab>Caveats</Lab><span style={{ font: '400 17px/1.6 ' + READ, color: P.sub }}>Floats drift; values below 1,000 m are sparse.</span></div>
        </div>
        <Shelf>
          <STabs on="Shelf" />
          {!opts ? <><Sec t="Uses · 2"><Row c={P.fern} t="argo-2026 · lab server" m="read in place" /><Row c={P.ink} t="Argo 2025 paper" m="PDF · you" /></Sec><Sec t="Salinity knows · 19"><Row c={P.ink} t="Units are PSU, not ppt" m="Theo" /><Row c={P.ink} t="Calibration: lab casts, Sept" m="Theo" /></Sec><span data-t="da.read" style={{ alignSelf: 'flex-start', font: 'italic 400 18px/26px ' + SERIF, color: P.fern }}>How you read it ›</span></> : <>
            <div style={{ display: 'flex', flexDirection: 'column' }}><Lab c={P.ink}>How you read it</Lab><div style={{ marginTop: 8 }}>{[['Figure first', 'Theo shares this', !table, null], ['Table', '', table, 'rd.table'], ['Data essay', '', false, null]].map(([t, m, on, k]) => <div key={t} data-t={k} style={{ display: 'grid', gridTemplateColumns: '18px minmax(0,1fr) auto', gap: 12, alignItems: 'center', padding: '9px 0', borderTop: '1px solid ' + P.line }}>{check(on)}<span style={{ font: '400 17px/1.3 ' + READ }}>{t}</span><Lab s={11}>{m}</Lab></div>)}</div></div>
            <div style={{ display: 'flex', flexDirection: 'column' }}><Lab c={P.ink}>Sources</Lab><div style={{ marginTop: 8 }}>{[['Chips', 'Theo shares this', true], ['Numbered notes', '', false], ['Footnotes', '', false]].map(([t, m, on]) => <div key={t} style={{ display: 'grid', gridTemplateColumns: '18px minmax(0,1fr) auto', gap: 12, alignItems: 'center', padding: '9px 0', borderTop: '1px solid ' + P.line }}>{check(on)}<span style={{ font: '400 17px/1.3 ' + READ }}>{t}</span><Lab s={11}>{m}</Lab></div>)}</div></div>
            <span style={{ font: '400 14px/1.45 ' + SANS, color: P.faint }}>Only for you. Everyone else still sees Theo’s choice.</span>
            {table ? <div style={{ display: 'flex' }}><Btn kind="undo">Back to Theo’s view</Btn></div> : null}
          </>}
        </Shelf>
        <Foot d={'Thu 1 Oct · ' + (isD ? '10:05' : '10:06')} />
      </>;
    };

    // ===== per-scene values =====
    const uDoc = u('Doc'), uEd = u('Edit'), uDk = u('Deck'), uPr = u('Present'), uKn = u('Knows'), uFd = u('Find'), uDm = u('Dmg'), uFw = u('First'), uAi = u('AI'), uGl = u('Goal'), uOl = u('Outline'), uSh = u('Share'), uGs = u('Guest'), uEn = u('End'), uDa = u('Data'), uRd = u('Read'), uDf = u('Diff');
    const dkSl = uDk >= 2.2 ? 3 : 1, prSl = uPr >= 2.2 ? 4 : 3, prX = tw(uPr, 2.0, 2.6, 0, 1);
    const iconX = lerp(140, 460, tw(uDm, 1.2, 3.0, 0, 1)), dropped = uDm >= 3.4;
    const aiSending = uAi >= 3.4 && uAi < 4.2, aiDone = uAi >= 4.2, aiAt = lerp(1, 2, tw(uAi, 4.2, 5.0, 0, 1));
    const glGoal = typedC('Plan a three-day December retreat for 40 people near Lisbon, under $48,000.', uGl, 0.5, 3.4), glName = typedC('The December retreat', uGl, 3.8, 4.8), glAt = lerp(2, 3, tw(uGl, 8.0, 8.8, 0, 1));
    const TEAM = [['noor', 'Noor', 'Lead', 'Plans the retreat and hands out the work.'], ['ada', 'Ada', 'Writer', 'Invitations, the run of show, the welcome pack.'], ['ren', 'Ren', 'Planner', 'Venues, travel and the budget.'], ['juno', 'Juno', 'Reviewer', 'Checks every plan before it reaches you.']];
    const olHover = uOl >= 1.0 && uOl < 3.4 ? lerp(0, 3, tw(uOl, 1.0, 2.9, 0, 1)) : null, olSel = uOl >= 3.4 && uOl < 6.6;
    const OLEV = { 1: 'past', 3: 'past', 8: 'wait', 24: 'go', 40: 'wait' };
    const gsSel = 'The welcome dinner moves to 19:30 so the late flights make it.', gsOn = uGs >= 0.9 && uGs < 5.0, gsShown = gsOn ? typedC(gsSel, uGs, 0.9, 1.7) : '', gsBtn = uGs >= 1.8 && uGs < 2.4, gsBox = uGs >= 2.4, gsText = typedC('The terrace closes at 22:00, so 19:30 works well.', uGs, 2.8, 4.6), gsSent = uGs >= 5.0;
    const enB = clamp((uEn - 3.3) / 0.4, 0, 1), boats = uEn < 5.0, cfSending = uEn >= 6.6 && uEn < 7.3, cfDone = uEn >= 7.3;
    const ENEV = {}; [2, 5, 7, 10, 13, 15, 18, 21, 24, 26, 29, 32, 35, 37, 40, 43, 46, 49, 51, 54, 56, 57].forEach((i) => { ENEV[i] = 'past'; });
    const dfO = win(uDf, 0.1, 5.0, 0.35);

    return (
      <PalCtx.Provider value={P}>
        <div data-screen-label={'t=' + Math.floor(T) + 's'} style={{ ...A, inset: 0, background: P.desk, fontFamily: SANS, color: P.ink }}>
          <div style={{ ...A, width: 1, height: 1, overflow: 'hidden', opacity: 0 }}>{Object.keys(PX).map((k) => <img key={k} src={(window.AT_PORTRAITS && window.AT_PORTRAITS[k]) || ('packages/design/portraits/' + PX[k] + '.webp')} alt="" decoding="sync" loading="eager" />)}</div>
          <div ref={cardRef} style={{ ...A, left: 240, top: 40, width: 1440, height: 900, borderRadius: 14, overflow: 'hidden', background: P.paper, color: P.ink, boxShadow: '0 1px 0 rgba(0,0,0,.06), 0 30px 80px -40px rgba(1,34,18,.35)' }}>

            <K.Scene op={op.Doc}><HelpDoc mode="doc" uD={uDoc} /></K.Scene>
            <K.Scene op={op.Edit}><HelpDoc mode="edit" uE={uEd} /></K.Scene>

            <K.Scene op={op.Deck}>
              {crumbBar('Monet', 'Presentation', 'Launch week')}
              {[1, 2, 3, 4, 2, 1].map((n, i) => <div key={i} style={{ ...A, left: 48, top: 104 + i * 104, display: 'flex', alignItems: 'flex-start', gap: 10 }}><Lab s={11} style={{ width: 14 }}>{i + 1}</Lab><Slide n={n} w={150} k={i === 0 ? 'dk.t1' : i === 2 ? 'dk.t3' : undefined} ring={i + 1 === dkSl} /></div>)}
              <div style={{ ...A, left: 300, top: 104, width: 620, display: 'flex', flexDirection: 'column', gap: 14 }}>
                <Lab>Presentation · Mei · version 2</Lab>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'baseline' }}><span style={{ font: '400 32px/1.1 ' + DOCF }}>Launch week</span><div style={{ display: 'flex', gap: 22, alignItems: 'center' }}><Btn kind="fern" k="dk.present">Present</Btn><Btn kind="undo">Edit</Btn></div></div>
                <Slide n={dkSl} w={620} />
                <Lab style={{ marginTop: 6 }}>{'Notes · slide ' + dkSl}</Lab>
                <span style={{ font: '400 18px/1.55 ' + READ, color: P.ink }}>{NOTES[dkSl]}</span>
              </div>
              <Shelf><STabs on="Shelf" /><Sec t="Comments · 2"><div data-t="dk.c1"><Row c={P.oat} t="Sora · slide 3 · use the new numbers" m="waits for Mei" /></div><Row c={P.ink} t="Kiri · slide 1" m="answered" /></Sec><Sec t="Versions · 2"><Row c={P.ink} t="Version 2" m="Mei · today" /><Row c={P.ink} t="Version 1" m="Mei · Mon" /></Sec></Shelf>
              <Foot d="Thu 1 Oct · 09:19" />
            </K.Scene>

            <K.Scene op={op.Present}>
              <div style={{ ...A, inset: 0, background: SB }} />
              <div style={{ ...A, left: 0, top: 45, width: 1440, height: 810 }}><div style={{ ...A, inset: 0, opacity: 1 - prX }}><SlideBody n={3} /></div><div style={{ ...A, inset: 0, opacity: prX }}><SlideBody n={4} /></div></div>
              <div style={{ ...A, right: 28, bottom: 22, display: 'flex', alignItems: 'center', gap: 14, padding: '9px 14px', borderRadius: 8, background: P.paper, border: '1px solid ' + P.line2 }}><Lab c={P.ink}>{prSl + ' / 8'}</Lab><span style={{ width: 1, height: 14, background: P.line2 }} /><span data-t="pr.stop" style={{ font: '500 13px/1 ' + SANS, color: P.sub, whiteSpace: 'nowrap' }}>Stop presenting · Esc</span></div>
            </K.Scene>

            <K.Scene op={op.Knows}><KiriRoom mode="knows" uK={uKn} /></K.Scene>
            <K.Scene op={op.Find}><KiriRoom mode="find" uF={uFd} /></K.Scene>

            <K.Scene op={op.Dmg}>
              <div style={{ ...A, inset: 0, background: dark ? '#0f120e' : '#e9e5da' }} />
              <div style={{ ...A, left: 360, top: 190, width: 720, height: 470, background: P.paper, border: '1px solid ' + P.line2, borderRadius: 12, boxShadow: '0 24px 60px -30px rgba(0,0,0,.35)', overflow: 'hidden' }}>
                <div style={{ height: 40, display: 'flex', alignItems: 'center', gap: 8, padding: '0 14px', borderBottom: '1px solid ' + P.line }}>{[0, 1, 2].map((i) => <span key={i} style={{ width: 11, height: 11, borderRadius: '50%', border: '1px solid ' + P.line2 }} />)}<span style={{ flex: 1, textAlign: 'center', marginRight: 50 }}><Lab>Atelier</Lab></span></div>
                <div style={{ ...A, left: 460, top: 110, width: 120, height: 120, boxSizing: 'border-box', borderRadius: 18, border: (dropped ? '1px solid ' + P.ink : '1px dashed ' + P.edge), display: 'flex', alignItems: 'center', justifyContent: 'center' }}>{dropped ? <span style={{ font: '400 44px/1 ' + SERIF, display: 'flex', alignItems: 'baseline', gap: 2 }}>a<span style={{ width: 5, height: 5, borderRadius: '50%', background: '#e0875a', display: 'inline-block' }} /></span> : null}</div>
                <Lab style={{ ...A, left: 520, top: 244, transform: 'translateX(-50%)' }}>Applications</Lab>
                <div style={{ ...A, left: 290, top: 170, width: 140, height: 1, background: P.line2 }} /><span style={{ ...A, left: 426, top: 160, font: '400 16px/1 ' + SANS, color: P.edge }}>›</span>
                {!dropped ? <div data-t="dmg.icon" style={{ ...A, left: iconX, top: 110, width: 120, height: 120, boxSizing: 'border-box', borderRadius: 26, background: P.paper, boxShadow: '0 0 0 1px ' + P.line2 + (uDm >= 1.1 ? ', 0 12px 30px -16px rgba(0,0,0,.4)' : ''), display: 'flex', alignItems: 'center', justifyContent: 'center', opacity: 1 - clamp((uDm - 3.0) / 0.4, 0, 1) }}><span style={{ font: '400 64px/1 ' + SERIF, display: 'flex', alignItems: 'baseline', gap: 3 }}>a<span style={{ width: 7, height: 7, borderRadius: '50%', background: '#e0875a', display: 'inline-block' }} /></span></div> : null}
                <Lab style={{ ...A, left: iconX + 60, top: 244, transform: 'translateX(-50%)', opacity: dropped ? 0 : 1 - clamp((uDm - 1.1) / 0.3, 0, 1) }}>Atelier</Lab>
                <div style={{ ...A, left: 0, right: 0, top: 320, display: 'flex', flexDirection: 'column', alignItems: 'center', gap: 8 }}><span style={{ font: '400 28px/1.2 ' + SERIF }}>{dropped ? 'Atelier is in Applications.' : 'Drag Atelier into Applications'}</span>{dropped ? <span style={{ font: '400 15px/1.5 ' + SANS, color: P.sub }}>Open it from there. From now on it starts with this Mac.</span> : null}</div>
              </div>
            </K.Scene>

            <K.Scene op={op.First}>
              {brandBar('Atelier')}
              <div data-t="fw.head" style={{ ...A, left: 120, top: 200 }}><H2 a="A team for " b="your" c=" work." s={64} /></div>
              <p style={{ ...A, left: 120, top: 300, width: 760, margin: 0, font: '400 23px/1.55 ' + READ, color: P.sub, textWrap: 'pretty' }}>Atelier gives you a lead and a small AI team. They turn your goals into finished work while you steer.</p>
              <div style={{ ...A, left: 120, top: 430, display: 'flex', gap: 28, alignItems: 'center' }}><Btn kind="lime" k="fw.start">Start</Btn><Btn kind="fern">Explore an example: the December retreat</Btn></div>
              <span style={{ ...A, left: 120, top: 520, font: '400 15px/1.5 ' + SANS, color: P.faint }}>It runs on this Mac. There’s no terminal, and your work stays here.</span>
              <Foot d="Mon 5 Oct · 09:01" />
            </K.Scene>

            <K.Scene op={op.AI}>
              {brandBar('Atelier')}
              <div style={{ ...A, left: 120, top: 136 }}><H2 a="Which AI should the team " b="think" c=" with?" /></div>
              <div style={{ ...A, left: 120, top: 250, width: 820, display: 'flex', flexDirection: 'column', opacity: aiDone ? 1 - clamp((uAi - 4.2) / 0.3, 0, 1) : 1 }}>
                {[['a', 'Atelier’s own', 'ready', P.fern, 'lime', aiSending ? 'Sending…' : 'Use Atelier’s own', 'ai.use'], ['C', 'Claude', 'not signed in', P.oat, 'fern', 'Sign in', 'ai.r2'], ['G', 'ChatGPT', 'not on this Mac', P.faint, 'fern', 'Get it', null]].map(([ic, n, st, sc, kind, act, k]) => <div key={n} style={{ display: 'grid', gridTemplateColumns: '44px minmax(0,1fr) 170px auto', gap: 22, alignItems: 'center', padding: '16px 0', borderTop: '1px solid ' + P.line }}><span style={{ width: 44, height: 44, boxSizing: 'border-box', borderRadius: 10, border: '1px solid ' + P.line2, display: 'flex', alignItems: 'center', justifyContent: 'center', font: ic === 'a' ? '400 24px/1 ' + SERIF : '400 13px/1 ' + MONO, color: ic === 'a' ? P.ink : P.faint }}>{ic}</span><span style={{ font: '400 24px/1.1 ' + SERIF }}>{n}</span><Lab c={sc}>{st}</Lab><Btn kind={kind} k={k} style={kind === 'lime' && aiSending ? { opacity: .7 } : null}>{act}</Btn></div>)}
                <div style={{ paddingTop: 14, borderTop: '1px solid ' + P.line }}><Btn kind="fern" style={{ fontSize: 18 }}>3 more it works with ›</Btn></div>
              </div>
              {aiDone ? <span style={{ ...A, left: 120, top: 270, font: '400 23px/1.5 ' + READ, opacity: clamp((uAi - 4.4) / 0.3, 0, 1) }}>Atelier’s own is ready. The team thinks with it from now on.</span> : null}
              <StepRuler at={aiDone ? aiAt : 1} y={760} />
              <Foot d="Mon 5 Oct · 09:02" />
            </K.Scene>

            <K.Scene op={op.Goal}>
              {brandBar('Atelier')}
              <div style={{ ...A, left: 120, top: 112 }}><H2 a="What would you like to get " b="done" c="?" /></div>
              <div style={{ ...A, left: 120, top: 220, width: 760, display: 'flex', flexDirection: 'column', gap: 24 }}>
                {field('Your goal', glGoal, 'A few sentences are enough to begin.', 'gl.goal', uGl >= 0.4 && uGl < 3.6)}
                {field('Project name', glName, null, 'gl.name', uGl >= 3.7 && uGl < 5.0, 360)}
                <div style={{ display: 'flex', flexDirection: 'column', gap: 6 }}><Lab>Kind of work</Lab><Tabs items={['Software', 'Writing', 'Events', 'Research', 'Something else']} on={uGl >= 5.4 ? 'Events' : null} tk="gl.k." /></div>
                <div style={{ display: 'flex', gap: 24, alignItems: 'center', marginTop: 8 }}><Btn kind="lime" k="gl.meet">Meet your team</Btn><Btn kind="fern" style={{ fontSize: 18 }}>Not sure where to start? Talk it through with Atelier</Btn></div>
              </div>
              <Shelf><Lab c={P.ink}>{'Your suggested team · ' + TEAM.filter((t, i) => uGl >= 1.0 + i * 0.5).length}</Lab><div>{TEAM.map(([k, n, r, s], i) => uGl >= 1.0 + i * 0.5 ? <div key={k} style={{ display: 'grid', gridTemplateColumns: '40px minmax(0,1fr)', gap: 12, padding: '10px 0', borderTop: '1px solid ' + P.line, opacity: clamp((uGl - 1.0 - i * 0.5) / 0.3, 0, 1) }}><Face k={k} s={36} /><div style={{ display: 'flex', flexDirection: 'column', gap: 3 }}><div style={{ display: 'flex', gap: 10, alignItems: 'baseline' }}><span style={{ font: '400 19px/1 ' + SERIF }}>{n}</span><Lab>{r}</Lab></div><span style={{ font: '400 14px/1.4 ' + READ, color: P.sub }}>{s}</span></div></div> : null)}</div><span style={{ font: '400 13px/1.4 ' + SANS, color: P.faint }}>The team assembles as you type.</span></Shelf>
              <StepRuler at={glAt} y={790} />
              <Foot d="Mon 5 Oct · 09:04" />
            </K.Scene>

            <K.Scene op={op.Outline}>
              {brandBar('Atelier')}
              <div style={{ ...A, left: 120, top: 128, display: 'flex', alignItems: 'center', gap: 22 }}><Mark s={64} /><H2 a="Morning. " b="Three" c=" things before the venue call." /></div>
              <div style={{ ...A, left: 760, top: 548, width: 560, transform: 'translateY(-100%)', display: 'flex', flexDirection: 'column', gap: 12 }}>
                {olSel ? <><Lab>06:45 · Gmail · from Inês, Quinta da Serra</Lab><p style={{ margin: 0, font: '400 25px/1.45 ' + READ, textWrap: 'pretty' }}>Inês asked three questions before your 09:30 call. Ada drafted a reply; it isn’t sent.</p><div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 22px', alignItems: 'center' }}><Btn kind="fern">Read Ada’s draft</Btn><Btn kind="fern">Open in Gmail</Btn><Btn kind="undo" k="ol.back">Back to now</Btn></div></>
                  : <><Lab>07:30 · Atelier · your morning</Lab><p style={{ margin: 0, font: '400 25px/1.45 ' + READ, textWrap: 'pretty' }}>The venue call is at 09:30, and the afternoon is quiet. Ada’s welcome pack is ready for your read.</p><div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 22px', alignItems: 'center' }}><Btn kind="fern">Read the welcome pack</Btn><Btn kind="fern">Ask about this</Btn></div></>}
              </div>
              <DayRuler x={120} y={640} w={1200} n={56} ev={OLEV} now={6} band={[0, 6]} marks={[{ i: 14, t: 'Venue call · 09:30' }]} hover={olHover} sel={olSel ? 3 : null} keys={{ 0: 'ol.t0', 3: 'ol.t3' }} nowLabel="NOW 07:30" />
              {olHover != null && Math.abs(olHover - 3) < 0.35 ? <Tip x={195} y={668} l="06:45 · Gmail" t="Inês asked three questions about the terrace" /> : null}
              <div style={{ ...A, left: 120, top: 748, width: 1200, display: 'grid', gridTemplateColumns: 'repeat(4, minmax(0,1fr))', gap: 32 }}>{[['Overnight · 1', 'Inês wrote about the terrace.'], ['Waiting on you · 2', 'The welcome pack, and the menu.'], ['Today · 3', 'The venue call, Ren books the boats, the menu at 16:00.'], ['Heads-up · 1', 'Rain is forecast for Friday afternoon.']].map(([l, t]) => <div key={l} style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingTop: 12, borderTop: '1px solid ' + P.line }}><Lab c={P.ink}>{l}</Lab><span style={{ font: '400 16px/1.45 ' + READ, color: P.sub }}>{t}</span></div>)}</div>
              <Foot d="Tue 1 Dec · 07:30" />
            </K.Scene>

            <K.Scene op={op.Share}><RunDoc uS={uSh} /></K.Scene>

            <K.Scene op={op.Guest}>
              <div style={{ height: 56, padding: '0 40px', display: 'flex', alignItems: 'center', justifyContent: 'space-between', borderBottom: '1px solid ' + P.line }}><div style={{ display: 'flex', alignItems: 'center', gap: 14 }}><span style={{ font: '400 24px/1 ' + SERIF, display: 'flex', alignItems: 'baseline', gap: 2 }}>a<span style={{ width: 5, height: 5, borderRadius: '50%', background: '#e0875a', display: 'inline-block' }} /></span><Lab>Shared with you by Tachi · The December retreat</Lab></div><Lab>Version 2 · no account needed</Lab></div>
              <div style={{ ...A, left: 260, top: 120, width: 680, display: 'flex', flexDirection: 'column', gap: 18 }}>
                <span style={{ font: '400 46px/1.1 ' + DOCF }}>Run of show</span>
                <span style={{ font: '400 26px/1.2 ' + DOCF, marginTop: 8 }}>Thursday 11 December</span>
                <p style={{ margin: 0, font: '400 20px/1.75 ' + DOCF }}>Guests arrive from 14:00. <span data-t="gs.sel" style={{ position: 'relative' }}>{gsOn ? <><span style={{ background: P.fernTint }}>{gsShown}</span>{gsSel.slice(gsShown.length)}</> : <span style={gsSent ? dotted : null}>{gsSel}</span>}{gsBtn ? <span data-t="gs.cbtn" style={{ ...A, left: 0, top: -52, padding: '9px 14px', borderRadius: 8, background: P.paper, border: '1px solid ' + P.line2, font: '500 14px/1 ' + SANS, color: P.ink, whiteSpace: 'nowrap', zIndex: 4 }}>Comment</span> : null}</span></p>
                <span style={{ font: '400 26px/1.2 ' + DOCF, marginTop: 8 }}>Friday 12 December</span>
                <p style={{ margin: 0, font: '400 20px/1.75 ' + DOCF }}>The working day: two sessions in the morning, the boat in the afternoon.</p>
              </div>
              {gsBox ? <div style={{ ...A, left: 1010, top: 250, width: 330, display: 'flex', flexDirection: 'column', gap: 10, opacity: clamp((uGs - 2.4) / 0.3, 0, 1) }}>
                <div style={{ width: 1, height: 18, background: P.line2 }} />
                {gsSent ? <><Lab>Inês · just now</Lab><span style={{ font: '400 17px/1.5 ' + READ }}>The terrace closes at 22:00, so 19:30 works well.</span><Lab c={P.fern}>Sent to Tachi</Lab></> : <>{chip('“The welcome dinner…” ×')}<div data-t="gs.field" style={{ minHeight: 64, display: 'flex', alignItems: 'flex-start', paddingTop: 8, borderBottom: '2px solid ' + P.fern, font: '400 16px/1.45 ' + READ, color: gsText ? P.ink : P.faint }}><span>{gsText || 'Your comment'}{uGs >= 2.6 ? caret() : null}</span></div><div style={{ display: 'flex', gap: 18, alignItems: 'center' }}><Btn kind="lime" k="gs.send" style={{ height: 44, lineHeight: '44px', padding: '0 22px' }}>Comment</Btn><Btn>Cancel</Btn></div></>}
              </div> : null}
            </K.Scene>

            <K.Scene op={op.End}>
              <div style={{ ...A, inset: 0, opacity: 1 - enB }}>
                {brandBar('The December retreat')}
                <div style={{ ...A, left: 120, top: 120, display: 'flex', alignItems: 'center', gap: 22 }}><Face k="noor" s={64} /><H2 a="The retreat is " b="finished" c="." /></div>
                <span style={{ ...A, left: 206, top: 204, font: '400 15px/1.4 ' + SANS, color: P.sub, whiteSpace: 'nowrap' }}>Noor led, with Ada, Ren and Juno · <span style={{ font: 'italic 400 17px ' + SERIF, color: P.fern }}>Team ›</span></span>
                <div style={{ ...A, left: 760, top: 548, width: 560, transform: 'translateY(-100%)', display: 'flex', flexDirection: 'column', gap: 12 }}><Lab c={P.ink}>Sat 13 Dec · Finished</Lab><p style={{ margin: 0, font: '400 25px/1.45 ' + READ, textWrap: 'pretty' }}>Forty guests came, and it closed $1,940 under budget. My wrap-up is ready, and what the retreat knows stays with you.</p><div style={{ display: 'flex', flexWrap: 'wrap', gap: '4px 22px', alignItems: 'center' }}><Btn kind="fern" k="en.wrap">Read Noor’s wrap-up</Btn><Btn kind="fern" k="en.next">Start the next one from this</Btn><Btn kind="undo">Archive it</Btn></div></div>
                <DayRuler x={120} y={640} w={1200} n={58} ev={ENEV} noNow marks={[{ i: 0, t: 'Started 6 Oct' }, { i: 58, t: 'Finished · 13 Dec', left: true }]} />
                <Lab style={{ ...A, right: 120, top: 676 }}>Today · Fri 2 Jan ›</Lab>
                <div style={{ ...A, right: 120, top: 704 }}><Tabs items={['Hour', 'Day', 'Week', 'Project', '|', 'Lens', 'Pin']} on="Project" /></div>
                <div style={{ ...A, left: 120, top: 780, width: 820, height: 52, boxSizing: 'border-box', display: 'flex', alignItems: 'center', padding: '0 2px', borderBottom: '1px solid ' + P.line2 }}><span style={{ flex: 1, font: '400 16px/1 ' + SANS, color: P.faint }}>Ask Noor about the retreat</span><Lab>Return</Lab></div>
              </div>
              {enB > 0.01 ? <div style={{ ...A, inset: 0, opacity: enB }}>
                <Bar left={<Back t="The December retreat" crumb={<Lab>Start the next one</Lab>} />} />
                <div style={{ ...A, left: 120, top: 112 }}><H2 a="What the next retreat " b="starts" c=" with." /></div>
                <Lab style={{ ...A, left: 120, top: 190 }}>From the December retreat · what it knows</Lab>
                <div style={{ ...A, left: 120, top: 230, width: 760 }}>{[['Budget cap is $48,000', 'you', true], ['3 guests are vegetarian', 'guest list', true], ['Quinta da Serra: the terrace closes at 22:00', 'Inês', true], ['Juno checks every plan', 'team', true], ['Boats, not buses', 'you · 9 Nov', boats, 'cf.boats']].map(([t, m, on, k]) => <div key={t} data-t={k} style={{ display: 'grid', gridTemplateColumns: '18px minmax(0,1fr) auto', gap: 14, alignItems: 'center', padding: '12px 0', borderTop: '1px solid ' + P.line }}>{check(on)}<span style={{ font: '400 19px/1.3 ' + READ, color: on ? P.ink : P.faint }}>{t}</span><Lab s={11}>{m}</Lab></div>)}</div>
                <div style={{ ...A, left: 120, top: 540, display: 'flex', alignItems: 'center', gap: 14 }}><div style={{ display: 'flex', alignItems: 'center' }}>{['noor', 'ada', 'ren', 'juno'].map((k, i) => <Face key={k} k={k} s={i ? 28 : 34} ml={i ? -8 : 0} />)}</div><span style={{ font: '400 16px/1.4 ' + SANS, color: P.sub }}>Noor leads again, with Ada, Ren and Juno.</span></div>
                <div style={{ ...A, left: 120, top: 620, display: 'flex', gap: 22, alignItems: 'center' }}>{cfDone ? <Lab c={P.fern}>Starting the next retreat · 10:14</Lab> : <><Btn kind="lime" k="cf.start" style={{ opacity: cfSending ? .7 : 1 }}>{cfSending ? 'Sending…' : 'Start the next retreat from this'}</Btn><Btn>Change the team</Btn></>}</div>
              </div> : null}
              <Foot d="Fri 2 Jan · 10:12" />
            </K.Scene>

            <K.Scene op={op.Data}><Analysis mode="data" uD={uDa} /></K.Scene>
            <K.Scene op={op.Read}><Analysis mode="read" uR={uRd} /></K.Scene>

            <K.Scene op={op.Diff}>
              <Analysis mode="read" uR={9} />
              {sheet(dfO, <>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}><Lab>Analysis · Ocean salinity</Lab><div style={{ display: 'flex', gap: 14, alignItems: 'center' }}><Btn kind="undo" k="df.close">Close</Btn><Lab>Esc</Lab></div></div>
                <span style={{ font: '400 34px/1.1 ' + DOCF }}>Salinity by depth</span>
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', paddingBottom: 14, borderBottom: '1px solid ' + P.line }}><div style={{ display: 'flex', alignItems: 'center', gap: 10 }}><Face k="theo" s={24} /><span style={{ font: '400 14px/1.3 ' + SANS, color: P.sub }}>Theo · version 2 · today 06:40 · after recalibration</span></div><Tabs items={['Read', 'Changes']} on="Changes" /></div>
                <p style={{ margin: 0, font: '400 21px/1.5 ' + READ }}>Salinity at 200 m rose 0.3 PSU after recalibration. Every other depth moved by less than 0.03.</p>
                <div style={{ display: 'grid', gridTemplateColumns: 'minmax(0,1fr) 260px', gap: 32 }}>
                  <div><div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '8px 0', borderBottom: '1px solid ' + P.line2 }}><Lab>Depth</Lab><Lab>v1 · PSU</Lab><Lab>v2 · PSU</Lab></div>{DEP.map(([d, a, b]) => { const ch = Math.abs(+b - +a) >= 0.1; return <div key={d} data-t={ch ? 'df.row' : undefined} style={{ display: 'grid', gridTemplateColumns: '1fr 1fr 1fr', padding: '10px 0', borderBottom: '1px solid ' + P.line, font: '400 15px/1.3 ' + MONO, background: ch ? P.fernTint : 'transparent' }}><span>{d}</span><span style={ch ? { textDecoration: 'line-through', color: P.faint } : { color: P.sub }}>{a}</span><span>{b}</span></div>; })}</div>
                  <div style={{ display: 'flex', flexDirection: 'column', gap: 6, paddingLeft: 22, borderLeft: '1px solid ' + P.line }}><div style={{ display: 'flex', alignItems: 'center', gap: 8 }}><Face k="sora" s={20} /><Lab>Sora · 200 m</Lab></div><span style={{ font: '400 15px/1.45 ' + READ }}>Units are PSU, not ppt. The calibration file is noted in Salinity knows.</span></div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: 22, paddingTop: 12, borderTop: '1px solid ' + P.line }}><Btn kind="fern">Ask about this</Btn></div>
              </>, 180)}
            </K.Scene>

            {curOp > 0.01 ? <div style={{ ...A, left: cx, top: cy, opacity: curOp, pointerEvents: 'none', zIndex: 30 }}>{clicks.map((ct, i) => { const r = clamp((T - ct) / 0.5, 0, 1); return T >= ct && T < ct + 0.5 ? <div key={i} style={{ ...A, left: -22 * EZ.enter(r) - 4, top: -22 * EZ.enter(r) - 4, width: 44 * EZ.enter(r) + 8, height: 44 * EZ.enter(r) + 8, borderRadius: '50%', border: '1.5px solid ' + P.ink, opacity: 1 - r }} /> : null; })}<svg width="26" height="30" viewBox="0 0 26 30" style={{ position: 'absolute', left: -3, top: -2 }}><path d="M3 2 L3 24 L9 18.5 L13 27 L17 25.2 L13 16.8 L21 16.5 Z" fill={P.ink} stroke={P.paper} strokeWidth="1.5" /></svg></div> : null}
          </div>
          <Captions style={{ left: 240, right: 600, top: 998, bottom: 'auto', textAlign: 'left', font: '400 30px/1.2 ' + SERIF, color: P.ink, textShadow: 'none' }} items={caps} />
          <div style={{ ...A, right: 240, top: 972, display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: 10 }}>
            <span style={{ font: '400 13px/1 ' + MONO, letterSpacing: '.1em', textTransform: 'uppercase', color: P.sub }}>{NAME[curScene]}</span>
            <span style={{ font: '500 34px/1 ' + MONO, color: P.ink, letterSpacing: '.02em' }}>{WHEN[curScene]}</span>
          </div>
        </div>
      </PalCtx.Provider>
    );
  }

  function useSysDark() {
    const on = (() => { try { const q = new URLSearchParams(location.search); return q.has('journeys') || q.has('system'); } catch (e) { return false; } })();
    const mq = on && window.matchMedia ? window.matchMedia('(prefers-color-scheme: dark)') : null;
    const [d, setD] = React.useState(mq ? mq.matches : null);
    React.useEffect(() => { if (!mq) return; const f = (e) => setD(e.matches); if (mq.addEventListener) mq.addEventListener('change', f); else mq.addListener(f); return () => { if (mq.removeEventListener) mq.removeEventListener('change', f); else mq.removeListener(f); }; }, []);
    return d;
  }
  function AtelierJourney() {
    const [t, setTweak] = useTweaks(window.TWEAK_DEFAULTS || { motionEditor: true, dark: false });
    const sd = useSysDark(), dk = sd === null ? !!t.dark : sd;
    return (
      <>
        <CompositionStage width={1920} height={1080} persistKey={'atelier-film:' + decodeURIComponent((location.pathname.split('/').pop() || 'film'))} scenes={window.OM_SCENES} playback={window.OM_PLAYBACK} bg={dk ? PAL.dark.desk : PAL.light.desk}>
          <Piece dark={dk} />
        </CompositionStage>
        <TweaksPanel>
          <TweakSection label="Film" />
          <TweakToggle label="Motion editor" value={t.motionEditor} onChange={(v) => setTweak('motionEditor', v)} />
          <TweakToggle label="Dark" value={t.dark} onChange={(v) => setTweak('dark', v)} />
        </TweaksPanel>
      </>
    );
  }
  window.AtelierJourney = AtelierJourney;
})();
