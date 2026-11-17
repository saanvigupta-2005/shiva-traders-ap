import React, { useState, useEffect, useMemo } from 'react';
import { Check, Share2, RotateCcw, Search, MessageSquare } from 'lucide-react';

const NEUTRAL = '#EDE8DF';
const LOOK = { g: 0.12, t: 0.3 };
export const ROOMS = [
  { id: 'living-room', name: 'Living Room', walls: [['backWall', 'Main wall'], ['leftWall', 'Window wall'], ['rightWall', 'Side wall']] },
  { id: 'bedroom', name: 'Bedroom', walls: [['backWall', 'Headboard wall'], ['leftWall', 'Window wall'], ['rightWall', 'Side wall']] },
  { id: 'kitchen', name: 'Kitchen', walls: [['backWall', 'Cabinet wall'], ['leftWall', 'Window wall'], ['rightWall', 'Side wall']] },
  { id: 'dining', name: 'Dining Room', walls: [['backWall', 'Feature wall'], ['leftWall', 'Window wall'], ['rightWall', 'Side wall']] },
  { id: 'exterior', name: 'Exterior', walls: [['backWall', 'Upper facade'], ['leftWall', 'Ground floor'], ['rightWall', 'Side wing']] }
];
const DEF = {
  'living-room': { backWall: '#81D4FA', leftWall: '#F0F4F1', rightWall: '#E8EFEA' },
  bedroom: { backWall: '#FADEE1', leftWall: '#F5F5F0', rightWall: '#F0EBE2' },
  kitchen: { backWall: '#FFF59D', leftWall: '#F0F4F1', rightWall: '#E6D7C3' },
  dining: { backWall: '#D1C4E9', leftWall: '#FAF0E6', rightWall: '#E8EFEA' },
  exterior: { backWall: '#F3EFE6', leftWall: '#D9C5B2', rightWall: '#E06D53' }
};
const INT_WALLS = [['leftWall', '0,0 230,95 230,530 0,625'], ['backWall', '230,95 770,95 770,530 230,530'], ['rightWall', '770,95 1000,0 1000,625 770,530']];
const EXT_WALLS = [['rightWall', '700,230 960,230 960,530 700,530'], ['leftWall', '220,320 700,320 700,530 220,530'], ['backWall', '220,130 700,130 700,320 220,320']];

const Sh = ({ x, y, rx, ry, o = 0.3, u }) => <ellipse cx={x} cy={y} rx={rx} ry={ry} fill="#000" opacity={o} filter={`url(#${u}blur)`} />;
const Frame = ({ x, y, w, h }) => (
  <g><rect x={x} y={y} width={w} height={h} fill="#fff" stroke="#2a2420" strokeWidth="7" />
    <rect x={x + 12} y={y + 12} width={w - 24} height={h - 24} fill="#e8dfd0" />
    <circle cx={x + w * 0.4} cy={y + h * 0.5} r={h * 0.22} fill="#c9824f" opacity=".85" />
    <path d={`M${x + 12} ${y + h - 12} L${x + w * 0.55} ${y + h * 0.45} L${x + w - 12} ${y + h - 12}Z`} fill="#6f8f7a" opacity=".8" /></g>
);

export function Scene({ roomId, colors, selected, onSelect, uid = 's' }) {
  const u = uid;
  const f = LOOK;
  const ext = roomId === 'exterior';
  const walls = ext ? EXT_WALLS : INT_WALLS;
  const pick = (id) => (onSelect ? () => onSelect(id) : undefined);
  const lg = (id, x2, y2, stops) => (
    <linearGradient id={u + id} x1="0" y1="0" x2={x2} y2={y2}>{stops.map(([o, c, a], i) => <stop key={i} offset={o} stopColor={c} stopOpacity={a} />)}</linearGradient>
  );
  return (
    <svg viewBox="0 0 1000 625" className="w-full h-full block" role="img" aria-label={`${roomId} colour preview`} preserveAspectRatio="xMidYMid slice">
      <defs>
        {lg('l', 1, 0, [[0, '#000', 0.3], [1, '#000', 0.04]])}
        {lg('r', 1, 0, [[0, '#000', 0.04], [1, '#000', 0.3]])}
        <radialGradient id={u + 'b'} cx=".5" cy=".3" r=".8"><stop offset="0" stopColor="#fff" stopOpacity=".18" /><stop offset="1" stopColor="#000" stopOpacity=".18" /></radialGradient>
        {lg('g', 1, 1, [[0, '#fff', f.g], [0.45, '#fff', 0], [1, '#fff', f.g * 0.5]])}
        {lg('fl', 0, 1, [[0, '#b58859', 1], [1, '#7a5230', 1]])}
        {lg('ce', 0, 1, [[0, '#fff', 1], [1, '#e7e2da', 1]])}
        {lg('sky', 0, 1, [[0, '#9fd2ff', 1], [1, '#eef7ff', 1]])}
        {lg('fab', 0, 1, [[0, '#7a8896', 1], [1, '#4b5864', 1]])}
        {lg('wd', 0, 1, [[0, '#9a6a42', 1], [1, '#6e4628', 1]])}
        {lg('lawn', 0, 1, [[0, '#79b36f', 1], [1, '#4d8a4c', 1]])}
        <pattern id={u + 'tile'} width="26" height="26" patternUnits="userSpaceOnUse"><rect width="26" height="26" fill="#f4f2ec" /><path d="M0 0H26M0 0V26" stroke="#d6d2c8" strokeWidth="1.5" /></pattern>
        <filter id={u + 'blur'}><feGaussianBlur stdDeviation="9" /></filter>
        <filter id={u + 'grain'}><feTurbulence type="fractalNoise" baseFrequency=".9" numOctaves="2" result="n" /><feColorMatrix in="n" values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 .55 -.18" /><feComposite in2="SourceGraphic" operator="in" /></filter>
        <clipPath id={u + 'fc'}><polygon points="0,625 230,530 770,530 1000,625" /></clipPath>
      </defs>

      {ext ? (
        <g pointerEvents="none">
          <rect width="1000" height="625" fill={`url(#${u}sky)`} />
          <circle cx="830" cy="110" r="95" fill="#fff6d6" opacity=".7" filter={`url(#${u}blur)`} />
          <ellipse cx="200" cy="90" rx="110" ry="26" fill="#fff" opacity=".85" /><ellipse cx="620" cy="60" rx="90" ry="20" fill="#fff" opacity=".7" />
          {[60, 170, 880, 960].map((x) => <circle key={x} cx={x} cy="450" r="70" fill="#5f9570" opacity=".75" />)}
          <rect y="520" width="1000" height="105" fill={`url(#${u}lawn)`} />
          <polygon points="430,625 570,625 545,528 455,528" fill="#d3cbbd" />
        </g>
      ) : (
        <g pointerEvents="none">
          <polygon points="0,0 1000,0 770,95 230,95" fill={`url(#${u}ce)`} />
          <polygon points="0,625 230,530 770,530 1000,625" fill={`url(#${u}fl)`} />
          <g clipPath={`url(#${u}fc)`} stroke="#5d3d22" strokeWidth="1.6" opacity=".45">
            {[-300, -150, 0, 150, 300, 450, 600, 750, 900, 1050, 1200, 1350].map((x) => <line key={x} x1={x} y1="625" x2="500" y2="300" />)}
          </g>
          <polygon points="0,625 230,530 770,530 1000,625" fill="#fff" opacity=".06" />
        </g>
      )}

      {walls.map(([id, pts]) => (
        <g key={id}>
          <polygon points={pts} style={{ fill: colors[id], transition: 'fill .9s ease' }} onClick={pick(id)} cursor={onSelect ? 'pointer' : undefined} />
          <polygon points={pts} fill={`url(#${u}${!ext && id === 'leftWall' ? 'l' : !ext && id === 'rightWall' ? 'r' : 'b'})`} pointerEvents="none" />
          <polygon points={pts} fill="#000" filter={`url(#${u}grain)`} opacity={f.t} pointerEvents="none" />
          <polygon points={pts} fill={`url(#${u}g)`} pointerEvents="none" />
        </g>
      ))}

      <g pointerEvents="none">
        {!ext && (
          <g>
            <rect x="230" y="95" width="540" height="10" fill="#fff" opacity=".9" />
            <rect x="230" y="514" width="540" height="16" fill="#faf8f4" /><polygon points="0,608 230,514 230,530 0,625" fill="#f1eee8" /><polygon points="770,514 1000,608 1000,625 770,530" fill="#f1eee8" />
            <polygon points="20,600 190,545 340,556 170,622" fill="#fff6dc" opacity=".16" filter={`url(#${u}blur)`} />
            <polygon points="40,165 150,187 150,403 40,419" fill={`url(#${u}sky)`} stroke="#faf7f1" strokeWidth="7" strokeLinejoin="round" />
            <line x1="95" y1="176" x2="95" y2="411" stroke="#faf7f1" strokeWidth="5" />
            <polygon points="22,150 62,160 62,432 22,442" fill="#ddd3c4" opacity=".95" />
          </g>
        )}

        {roomId === 'living-room' && (
          <g>
            <polygon points="300,545 700,545 800,612 200,612" fill="#d8ccb8" /><polygon points="318,553 682,553 764,603 236,603" fill="none" stroke="#b9a98d" strokeWidth="3" />
            <Frame x={380} y={185} w={120} h={86} /><Frame x={525} y={205} w={72} h={56} />
            <Sh u={u} x={500} y={528} rx={200} ry={13} />
            <rect x="320" y="362" width="360" height="92" rx="20" fill={`url(#${u}fab)`} /><rect x="296" y="408" width="44" height="98" rx="16" fill={`url(#${u}fab)`} /><rect x="660" y="408" width="44" height="98" rx="16" fill={`url(#${u}fab)`} />
            <rect x="334" y="436" width="332" height="66" rx="14" fill="#6b7987" />
            {[344, 450, 556].map((x) => <rect key={x} x={x} y="440" width="100" height="50" rx="10" fill="#7d8b99" />)}
            <rect x="312" y="504" width="10" height="20" fill="#2a2420" /><rect x="678" y="504" width="10" height="20" fill="#2a2420" />
            <Sh u={u} x={500} y={582} rx={95} ry={9} o={0.3} />
            <polygon points="420,560 580,560 602,584 398,584" fill={`url(#${u}wd)`} /><rect x="410" y="584" width="9" height="22" fill="#4a2f1b" /><rect x="581" y="584" width="9" height="22" fill="#4a2f1b" />
            <circle cx="740" cy="290" r="70" fill="#ffd88a" opacity=".3" filter={`url(#${u}blur)`} />
            <line x1="740" y1="318" x2="740" y2="522" stroke="#2f2f2f" strokeWidth="5" /><polygon points="712,262 768,262 756,322 724,322" fill="#f6e7c1" />
            <polygon points="262,492 304,492 296,528 270,528" fill="#b0603a" />
            {[[283, 450, -20], [270, 465, 30], [300, 462, 50]].map(([x, y, r], i) => <ellipse key={i} cx={x} cy={y} rx="12" ry="32" fill="#3f7d4e" transform={`rotate(${r} ${x} ${y})`} />)}
          </g>
        )}

        {roomId === 'bedroom' && (
          <g>
            <polygon points="280,545 720,545 820,614 180,614" fill="#d6cdbf" />
            <Frame x={400} y={165} w={200} h={90} />
            <Sh u={u} x={500} y={526} rx={225} ry={14} />
            <rect x="300" y="285" width="400" height="160" rx="16" fill="#7a6b5f" />
            {[330, 420, 510, 600].map((x) => <rect key={x} x={x} y="300" width="68" height="130" rx="10" fill="#8a7a6d" />)}
            <rect x="290" y="432" width="420" height="90" rx="8" fill="#5a4636" />
            <rect x="296" y="404" width="408" height="96" rx="14" fill="#efede7" /><rect x="296" y="450" width="408" height="38" fill="#c6d0d8" />
            <rect x="322" y="380" width="120" height="48" rx="18" fill="#fbfaf6" /><rect x="558" y="380" width="120" height="48" rx="18" fill="#fbfaf6" /><rect x="448" y="386" width="104" height="40" rx="16" fill="#e8dccb" />
            {[250, 705].map((x) => <g key={x}><Sh u={u} x={x + 22} y={528} rx={34} ry={7} /><rect x={x} y="452" width="46" height="74" fill="#6b4b33" /><rect x={x + 16} y="420" width="14" height="32" fill="#333" /><polygon points={`${x + 4},386 ${x + 42},386 ${x + 36},424 ${x + 10},424`} fill="#f6e7c1" /></g>)}
          </g>
        )}

        {roomId === 'kitchen' && (
          <g>
            <rect x="260" y="262" width="480" height="108" fill={`url(#${u}tile)`} />
            <rect x="258" y="120" width="484" height="126" fill="#34475a" />
            {[338, 418, 498, 578, 658].map((x) => <line key={x} x1={x} y1="120" x2={x} y2="246" stroke="#1f2d3a" strokeWidth="2" />)}
            {[318, 398, 478, 558, 638, 718].map((x) => <rect key={x} x={x - 4} y="222" width="3" height="16" fill="#cfd4d8" />)}
            <rect x="248" y="368" width="504" height="16" fill="#dcd8d0" /><rect x="254" y="384" width="492" height="134" fill="#34475a" />
            {[338, 418, 498, 578, 658].map((x) => <line key={x} x1={x} y1="384" x2={x} y2="518" stroke="#1f2d3a" strokeWidth="2" />)}
            {[318, 398, 478, 558, 638, 718].map((x) => <rect key={x} x={x - 4} y="396" width="3" height="16" fill="#cfd4d8" />)}
            <rect x="440" y="364" width="120" height="6" fill="#222" /><rect x="640" y="352" width="30" height="16" rx="4" fill="#b9bec3" />
            <Sh u={u} x={500} y={606} rx={210} ry={12} />
            <polygon points="330,552 670,552 700,574 300,574" fill="#ece8df" /><rect x="312" y="574" width="376" height="48" fill="#34475a" />
            {[430, 570].map((x) => <g key={x}><line x1={x} y1="90" x2={x} y2="195" stroke="#2a2a2a" strokeWidth="3" /><path d={`M${x - 26} 232 A26 38 0 0 1 ${x + 26} 232Z`} fill="#e9c46a" transform={`translate(0 -34)`} /></g>)}
          </g>
        )}

        {roomId === 'dining' && (
          <g>
            <polygon points="300,540 700,540 790,612 210,612" fill="#cfc4b2" />
            <Frame x={390} y={165} w={220} h={140} />
            <rect x="320" y="428" width="360" height="98" rx="4" fill="#5b3d28" /><line x1="500" y1="428" x2="500" y2="526" stroke="#3b2616" strokeWidth="2" /><line x1="410" y1="428" x2="410" y2="526" stroke="#3b2616" strokeWidth="2" /><line x1="590" y1="428" x2="590" y2="526" stroke="#3b2616" strokeWidth="2" />
            <ellipse cx="400" cy="408" rx="20" ry="22" fill="#d9d4c8" /><rect x="392" y="372" width="16" height="20" fill="#d9d4c8" />
            {[418, 560].map((x) => <rect key={x} x={x} y="458" width="58" height="72" rx="8" fill="#3c3835" />)}
            <Sh u={u} x={500} y={590} rx={190} ry={12} />
            <polygon points="372,532 628,532 668,574 332,574" fill={`url(#${u}wd)`} /><rect x="346" y="574" width="12" height="46" fill="#4a2f1b" /><rect x="642" y="574" width="12" height="46" fill="#4a2f1b" />
            <circle cx="500" cy="238" r="80" fill="#ffd88a" opacity=".22" filter={`url(#${u}blur)`} />
            <line x1="500" y1="100" x2="500" y2="196" stroke="#a8843a" strokeWidth="4" /><path d="M450 236 A50 40 0 0 1 550 236Z" fill="#d9b25a" transform="translate(0 -30)" /><ellipse cx="500" cy="212" rx="50" ry="8" fill="#f6dc9a" />
          </g>
        )}

        {ext && (
          <g>
            <polygon points="690,230 830,150 970,230" fill="#5b4a42" /><rect x="200" y="112" width="520" height="22" fill="#fbfaf7" />
            <rect x="220" y="320" width="480" height="20" fill="#000" opacity=".12" filter={`url(#${u}blur)`} />
            {[270, 560].map((x) => <rect key={x} x={x} y="172" width="116" height="100" fill={`url(#${u}sky)`} stroke="#fbfaf7" strokeWidth="8" />)}
            {[250, 580].map((x) => <rect key={x} x={x} y="384" width="100" height="92" fill={`url(#${u}sky)`} stroke="#fbfaf7" strokeWidth="8" />)}
            <rect x="730" y="330" width="90" height="100" fill={`url(#${u}sky)`} stroke="#fbfaf7" strokeWidth="8" />
            <rect x="260" y="296" width="200" height="6" fill="#33302d" /><rect x="260" y="296" width="200" height="1" />
            <rect x="430" y="384" width="100" height="146" fill="#4a2f1f" /><circle cx="516" cy="460" r="5" fill="#e0b24a" /><rect x="400" y="358" width="160" height="14" fill="#fbfaf7" />
            <rect x="408" y="372" width="10" height="158" fill="#fbfaf7" /><rect x="542" y="372" width="10" height="158" fill="#fbfaf7" />
            {[250, 620].map((x) => <ellipse key={x} cx={x + 30} cy="520" rx="40" ry="26" fill="#3f7d4e" />)}
          </g>
        )}
      </g>

      {walls.map(([id, pts]) => selected === id && <polygon key={id} points={pts} fill="none" stroke="#fbbf24" strokeWidth="5" strokeLinejoin="round" pointerEvents="none" />)}
    </svg>
  );
}

/* ---------- Animated hero room ---------- */
const HERO = ['5182', '8036', '7541', '8092', '7164', '7912'];
export function HeroRoom({ shades, onOpen, L = (s) => s }) {
  const picks = useMemo(() => HERO.map((c) => shades.find((s) => s.code === c)).filter(Boolean), [shades]);
  const [i, setI] = useState(0);
  useEffect(() => {
    if (window.matchMedia && window.matchMedia('(prefers-reduced-motion: reduce)').matches) return undefined;
    const id = setInterval(() => setI((n) => (n + 1) % picks.length), 3400);
    return () => clearInterval(id);
  }, [picks.length]);
  const p = picks[i] || { hex: '#81D4FA', name: '', code: '' };
  return (
    <div className="relative">
      <div className="rounded-3xl overflow-hidden shadow-2xl ring-1 ring-white/10 aspect-[16/10]">
        <Scene uid="h" roomId="living-room" colors={{ backWall: p.hex, leftWall: '#EFEAE0', rightWall: '#E9E3D8' }} />
      </div>
      <div className="absolute left-4 bottom-4 bg-white text-slate-900 rounded-2xl p-3 pr-5 flex items-center gap-3 shadow-xl">
        <span className="w-10 h-10 rounded-xl border border-slate-200" style={{ background: p.hex, transition: 'background .9s' }} />
        <span><span className="block text-sm font-bold leading-tight">{p.name}</span><span className="block text-xs text-slate-500">{L('Shade')} {p.code}</span></span>
      </div>
      <div className="absolute right-4 bottom-4 flex items-center gap-2">
        <div className="flex gap-1.5 bg-slate-900/70 rounded-full px-2.5 py-2">
          {picks.map((s, k) => <button key={s.id} onClick={() => setI(k)} aria-label={`Show ${s.name}`} className={`w-3 h-3 rounded-full border border-white/60 ${k === i ? 'scale-125 ring-2 ring-amber-300' : ''}`} style={{ background: s.hex }} />)}
        </div>
        <button onClick={onOpen} className="bg-amber-500 hover:bg-amber-400 text-slate-950 text-xs font-bold px-4 py-2.5 rounded-full shadow-lg">{L("Try your own")}</button>
      </div>
    </div>
  );
}

/* ---------- Full studio ---------- */
export default function RoomStudio({ shades, families, wa, incoming, L = (s) => s }) {
  const [roomId, setRoomId] = useState('living-room');
  const [wallId, setWallId] = useState('backWall');
  const [colors, setColors] = useState(DEF);
  const [fam, setFam] = useState('All');
  const [q, setQ] = useState('');
  const [cmp, setCmp] = useState(false);
  const [pos, setPos] = useState(50);

  const room = ROOMS.find((r) => r.id === roomId);
  const wc = colors[roomId];
  const shadeOf = (hex) => shades.find((s) => s.hex.toLowerCase() === hex.toLowerCase());
  const setWall = (hex) => setColors((p) => ({ ...p, [roomId]: { ...p[roomId], [wallId]: hex } }));
  useEffect(() => { if (incoming) setWall(incoming.shade.hex); }, [incoming]); // eslint-disable-line
  const list = shades.filter((s) => (fam === 'All' || s.family === fam) && (s.name.toLowerCase().includes(q.toLowerCase()) || s.code.toLowerCase().includes(q.toLowerCase())));
  const cur = shadeOf(wc[wallId]);
  const label = (id) => room.walls.find((w) => w[0] === id)[1];
  const before = { backWall: NEUTRAL, leftWall: NEUTRAL, rightWall: NEUTRAL };
  const palette = room.walls.map(([id, l]) => `${l}: ${shadeOf(wc[id]) ? `${shadeOf(wc[id]).name} (${shadeOf(wc[id]).code})` : wc[id]}`).join(', ');

  return (
    <div className="bg-[#0e1420] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10 space-y-8">
        <div className="max-w-3xl space-y-2">
          <h1 className="text-3xl sm:text-5xl font-semibold">{L("Room Colour Studio")}</h1>
          <p className="text-slate-300 text-sm sm:text-base">{L("Pick a room, tap a wall, then choose a shade. Slide the Before / After control to see the difference. Screens vary, so confirm the final shade on a physical shade card in store.")}</p>
        </div>
        <div className="flex flex-wrap gap-2" role="tablist" aria-label="Rooms">
          {ROOMS.map((r) => (
            <button key={r.id} role="tab" aria-selected={roomId === r.id} onClick={() => { setRoomId(r.id); setWallId('backWall'); }}
              className={`px-5 py-2.5 rounded-full text-sm font-semibold ${roomId === r.id ? 'bg-amber-500 text-slate-950' : 'bg-white/10 hover:bg-white/20'}`}>{L(r.name)}</button>
          ))}
        </div>

        <div className="grid lg:grid-cols-12 gap-6 items-start">
          <div className="lg:col-span-8 space-y-3">
            <div className="relative aspect-[16/10] rounded-3xl overflow-hidden ring-1 ring-white/10 shadow-2xl bg-slate-800">
              <Scene uid="a" roomId={roomId} colors={wc} selected={cmp ? null : wallId} onSelect={setWallId} />
              {cmp && (
                <>
                  <div className="absolute inset-0 pointer-events-none" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
                    <Scene uid="c" roomId={roomId} colors={before} />
                  </div>
                  <div className="absolute top-0 bottom-0 w-0.5 bg-white pointer-events-none" style={{ left: `${pos}%` }}><span className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-xl text-slate-900 text-xs font-black flex items-center justify-center">⇄</span></div>
                  <span className="absolute top-3 left-3 bg-black/60 text-xs font-semibold px-3 py-1 rounded-full">{L("Before")}</span>
                  <span className="absolute top-3 right-3 bg-black/60 text-xs font-semibold px-3 py-1 rounded-full">{L("After")}</span>
                </>
              )}
              {!cmp && <span className="absolute left-3 bottom-3 bg-black/65 backdrop-blur text-xs font-semibold px-3 py-1.5 rounded-full">{L(label(wallId))}: {cur ? `${cur.name} · ${cur.code}` : wc[wallId]}</span>}
            </div>
            <div className="flex flex-wrap items-center gap-3">
              <button onClick={() => setCmp(!cmp)} aria-pressed={cmp} className={`px-4 py-2 rounded-full text-xs font-bold ${cmp ? 'bg-amber-500 text-slate-950' : 'bg-white/10 hover:bg-white/20'}`}>{L("Before / After")}</button>
              {cmp && <input type="range" min="0" max="100" value={pos} onChange={(e) => setPos(+e.target.value)} aria-label="Before and after slider" className="flex-1 accent-amber-500" />}
              <button onClick={() => setColors((p) => ({ ...p, [roomId]: DEF[roomId] }))} className="ml-auto px-4 py-2 rounded-full text-xs font-bold bg-white/10 hover:bg-white/20 flex items-center gap-1.5"><RotateCcw className="w-3.5 h-3.5" aria-hidden="true" /> {L("Reset room")}</button>
            </div>
          </div>

          <div className="lg:col-span-4 space-y-5">
            <div className="bg-white/5 rounded-2xl p-4 space-y-2 ring-1 ring-white/10">
              <h2 className="text-sm font-bold">{L("1. Choose a wall")}</h2>
              {room.walls.map(([id, l]) => {
                const s = shadeOf(wc[id]);
                return (
                  <button key={id} onClick={() => setWallId(id)} aria-pressed={wallId === id} className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left ${wallId === id ? 'bg-amber-500 text-slate-950' : 'bg-white/5 hover:bg-white/10'}`}>
                    <span className="w-8 h-8 rounded-lg border border-black/20" style={{ background: wc[id] }} />
                    <span className="flex-1"><span className="block text-xs font-bold">{L(l)}</span><span className="block text-xs opacity-75">{s ? `${s.name} · ${s.code}` : wc[id]}</span></span>
                    {wallId === id && <Check className="w-4 h-4" aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
            <div className="bg-white/5 rounded-2xl p-4 space-y-3 ring-1 ring-white/10">
              <h2 className="text-sm font-bold">{L("2. Pick a shade")}</h2>
              <div className="relative"><Search className="w-4 h-4 text-slate-400 absolute left-3 top-3" aria-hidden="true" /><input value={q} onChange={(e) => setQ(e.target.value)} aria-label="Search shades" placeholder={L("Search name or code")} className="w-full pl-9 pr-3 py-2.5 rounded-xl bg-white/10 text-sm placeholder:text-slate-400 focus:outline-none focus:ring-2 focus:ring-amber-400" /></div>
              <div className="flex gap-1.5 overflow-x-auto pb-1">
                {families.map((f) => <button key={f} onClick={() => setFam(f)} aria-pressed={fam === f} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold ${fam === f ? 'bg-white text-slate-900' : 'bg-white/10 hover:bg-white/20'}`}>{L(f)}</button>)}
              </div>
              <div className="grid grid-cols-6 gap-2 max-h-52 overflow-y-auto pr-1">
                {list.map((s) => <button key={s.id} onClick={() => setWall(s.hex)} aria-label={`${s.name}, code ${s.code}`} title={`${s.name} (${s.code})`} className={`aspect-square rounded-lg border border-white/20 hover:scale-110 transition-transform ${cur && cur.id === s.id ? 'ring-2 ring-amber-400 ring-offset-2 ring-offset-[#0e1420]' : ''}`} style={{ background: s.hex }} />)}
                {list.length === 0 && <p className="col-span-6 text-xs text-slate-400">{L("No shades match. Try another name or code.")}</p>}
              </div>
            </div>
            <div className="space-y-2">
              {cur && <a href={wa(`Hello Shiva Traders, I like Asian Paints shade ${cur.name} (${cur.code}). Please confirm availability and price.`)} target="_blank" rel="noopener noreferrer" className="w-full bg-white/10 hover:bg-white/20 text-sm font-bold py-3 rounded-xl flex items-center justify-center gap-2"><MessageSquare className="w-4 h-4" aria-hidden="true" /> {L('Ask about')} {cur.name}</a>}
              <a href={wa(`Hello Shiva Traders, I planned a palette in your Room Colour Studio. Room: ${room.name}. ${palette}. Please advise on paint required.`)} target="_blank" rel="noopener noreferrer" className="w-full bg-emerald-600 hover:bg-emerald-500 text-sm font-bold py-3.5 rounded-xl flex items-center justify-center gap-2"><Share2 className="w-4 h-4" aria-hidden="true" /> {L("Send this palette on WhatsApp")}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
