import React, { useState, useEffect, useMemo, useRef } from 'react';
import { Check, Share2, RotateCcw, Search, MessageSquare, Download } from 'lucide-react';

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

// Asian Paints L-series catalogue names. Preview HEX values are approximate screen representations,
// not official colour specifications; verify the final shade against a physical shade card.
const L_SERIES_SHADES = [
  ['L101','Swan Wing','#F4F1E8'], ['L102','Milky Way','#F4EFE3'], ['L103','Pearl Star','#F1EEDF'],
  ['L104','Cotton Wool','#F7F4EC'], ['L105','Crystal Peak','#F2F4F0'], ['L107','Virgin Lace','#FAF5EC'],
  ['L108','Cream Pudding','#F4EBDD'], ['L109','Icy Peak','#E8F1F2'], ['L111','Sheer Ice','#E6F0F1'],
  ['L112','White Echo','#F4F3EE'], ['L113','Seagull Point','#E9ECEB'], ['L114','Aqua Hint','#DDEFEF'],
  ['L115','White Bisque','#F3E9D9'], ['L116','Menthol','#E3F0E5'], ['L117','Mint Essence','#DDEFE4'],
  ['L118','Water Spray','#DDEFEF'], ['L119','White Satin','#F6F2E9'], ['L120','Mint Lustre','#D9EBDD'],
  ['L121','Moonlight','#F0EFE8'], ['L122','Skimmed Cream','#F5EBDD'], ['L123','Angel Cloud','#F2F1EA'],
  ['L124','Pure Ivory','#F5EEDF'], ['L125','Silver Comet','#E6E8E8'], ['L126','Sugared Nut','#EDE2D2'],
  ['L127','Sesame Seed','#E9DCCB'], ['L129','Cold Coffee','#D8C6B1'], ['L131','Lovely Lace','#F3ECE3'],
  ['L132','Natural Linen','#E8DDCE'], ['L133','Arabian Sand','#DCC8AF'], ['L134','Double Cream','#F1E3C8'],
  ['L135','Sahara Dream','#DCC4A2'], ['L136','Pebble White','#E9E6DE'], ['L138','Snow Blush','#F4E8E8'],
  ['L139','Blush','#EBD7D8'], ['L140','Crushed Ice','#E5E8E8'], ['L141','South Pole','#E9ECEF'],
  ['L142','Mica Matte','#DADBD7'], ['L143','Rain Drop','#DDE7E9'], ['L144','Love Song','#F0DDE4'],
  ['L145','White Cameo','#F5EEE8'], ['L146','Sonnet','#E9E0E3'], ['L147','Harmony','#E7E9E2'],
  ['L148','Blossom Tint','#F0DCE4'], ['L149','Eggshell','#F0E8D9'], ['L150','Pressed Linen','#E8DDCD'],
  ['L151','Raw Jute','#D8C7B0'], ['L152','Cream Pie','#F3E5CB'], ['L153','Pristine Linen','#EDE5D8'],
  ['L154','Pipe Dream','#E5E6E6'], ['L155','Pale Sisal','#E7DCCB'], ['L156','Almost Ivory','#F1E9D9'],
  ['L157','White Canvas','#F5F1E8'], ['L158','Silence','#E8E9E5'], ['L159','Dreamy Night','#E3E6EA'],
  ['L160','Soft Silk','#EEE6DD'], ['L161','Absolute White','#F7F7F4'], ['L162','Biennale White','#F5F3ED'],
  ['L163','Salt White','#F4F5F1'], ['L164','White Butter','#F5EBD5'], ['L165','Indian Cotton','#F1E8DA'],
  ['L166','Sour Cream','#F2EBDD'], ['L169','Spotless','#F7F6F2'], ['L170','Sea Shine','#DDEBEA'],
  ['L171','White Silk','#F4F1E9'], ['L172','Pure Cotton','#F7F4EE'], ['L173','White Fog','#E9EBE9'],
  ['L174','Vanilla Mist','#F2E8D7'], ['L175','Soft Snow','#F5F5F1'], ['L176','White Bush','#ECE8DF'],
  ['L177','White Cheese','#F1E6D4'], ['L178','Daisy Bloom','#F5EFD9'], ['L179','Retro White','#F0E8DB'],
  ['L180','Innocent White','#F5F3EC'], ['L181','White Sugar','#F6F4EC'], ['L183','Chalk Powder','#F1F1EC'],
  ['L184','White Forest','#E8ECE7'], ['L185','Night Jasmine','#E5E0D7'], ['L186','Lap Of Himalaya','#E9ECEF'],
  ['L187','Baby Orchid','#E9DDE9'], ['L188','Buttercream-N','#F2E4C8'], ['L189','Light Butter-N','#F1E4C5'],
  ['L190','Dawn Dew-N','#F0E7D8']
].map(([code, name, hex]) => ({ id: `asian-l-${code}`, code, name, hex, family: 'L Series' }));


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
    <svg viewBox="0 0 1000 625" className="w-full h-full block" role="img" aria-label={`${roomId} colour preview`} preserveAspectRatio="xMidYMid meet">
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
      <div className="rounded-2xl sm:rounded-3xl overflow-hidden shadow-lg ring-1 ring-[#D5D0C7] aspect-[4/3] sm:aspect-[16/10]">
        <Scene uid="h" roomId="living-room" colors={{ backWall: p.hex, leftWall: '#EFEAE0', rightWall: '#E9E3D8' }} />
      </div>
      <div className="absolute left-4 bottom-4 bg-[#C8B28A] text-[#34332F] rounded-2xl p-3 pr-5 flex items-center gap-3 shadow-xl">
        <span className="w-10 h-10 rounded-xl border border-slate-200" style={{ background: p.hex, transition: 'background .9s' }} />
        <span><span className="block text-sm font-bold leading-tight">{p.name}</span><span className="block text-xs text-slate-500">{L('Shade')} {p.code}</span></span>
      </div>
      <div className="absolute right-4 bottom-4 flex items-center gap-2">
        <div className="flex gap-1.5 bg-[#34332F]/75 rounded-full px-2.5 py-2">
          {picks.map((s, k) => <button key={s.id} onClick={() => setI(k)} aria-label={`Show ${s.name}`} className={`w-3 h-3 rounded-full border border-white/60 ${k === i ? 'scale-125 ring-2 ring-amber-300' : ''}`} style={{ background: s.hex }} />)}
        </div>
        <button onClick={onOpen} className="bg-[#C8B28A] hover:bg-[#BBA47B] text-[#34332F] text-xs font-bold px-4 py-2.5 rounded-full shadow-lg">{L("Try your own")}</button>
      </div>
    </div>
  );
}

/* ---------- Full studio ---------- */
export default function RoomStudio({ shades, families, wa, incoming, L = (s) => s, language, lang }) {
  const hi = {
    "Room Colour Studio":"कमरे के रंग का स्टूडियो",
    "Pick a room, tap a wall, then choose a shade. Slide the Before / After control to see the difference. Screens vary, so confirm the final shade on a physical shade card in store.":"कमरा चुनें, दीवार पर टैप करें और रंग चुनें। पहले / बाद का स्लाइडर चलाकर बदलाव देखें। स्क्रीन पर रंग अलग दिख सकते हैं, इसलिए दुकान में असली शेड कार्ड से पुष्टि करें।",
    "Rooms":"कमरे", "Living Room":"बैठक कक्ष", "Bedroom":"शयनकक्ष", "Kitchen":"रसोई", "Dining Room":"भोजन कक्ष", "Exterior":"बाहरी भाग",
    "Main wall":"मुख्य दीवार", "Window wall":"खिड़की वाली दीवार", "Side wall":"साइड की दीवार", "Headboard wall":"बेड के पीछे की दीवार", "Cabinet wall":"कैबिनेट वाली दीवार", "Feature wall":"विशेष दीवार", "Upper facade":"ऊपरी बाहरी हिस्सा", "Ground floor":"भूतल", "Side wing":"साइड हिस्सा",
    "Before":"पहले", "After":"बाद में", "Before / After":"पहले / बाद में", "Before and after slider":"पहले और बाद का स्लाइडर",
    "Reset room":"कमरे के रंग रीसेट करें", "Download palette":"रंग पैलेट डाउनलोड करें", "Download room image":"कमरे की तस्वीर डाउनलोड करें",
    "1. Choose a wall":"1. दीवार चुनें", "2. Pick a shade":"2. रंग चुनें", "Search shades":"रंग खोजें", "Search name or code":"नाम या कोड खोजें",
    "L-series preview colours are approximate screen samples. Confirm with a physical shade card.":"L-सीरीज़ के रंग स्क्रीन पर अनुमानित हैं। असली शेड कार्ड से पुष्टि करें।",
    "No shades match. Try another name or code.":"कोई रंग नहीं मिला। दूसरा नाम या कोड खोजें।", "Ask about":"इसके बारे में पूछें", "Send this palette on WhatsApp":"यह रंग पैलेट WhatsApp पर भेजें",
    "Room":"कमरा", "Wall":"दीवार", "Shade name / code":"रंग का नाम / कोड", "Shade":"रंग", "All":"सभी", "L Series":"एल सीरीज़"
  };
  const isHindi = (() => {
    const selected = String(language ?? lang ?? (typeof document !== 'undefined' ? (document.documentElement.lang || (document.body?.innerText?.includes('हिन्दी') ? 'hi' : '')) : '')).toLowerCase();
    return selected.startsWith('hi') || selected.includes('hindi') || selected.includes('हिन्दी') || selected.includes('हिंदी');
  })();
  const tx = (text) => isHindi ? (hi[text] || L(text)) : L(text);
  const roomSvgRef = useRef(null);
  const [roomId, setRoomId] = useState('living-room');
  const [wallId, setWallId] = useState('backWall');
  const [colors, setColors] = useState(DEF);
  const [fam, setFam] = useState('All');
  const [q, setQ] = useState('');
  const [cmp, setCmp] = useState(false);
  const [pos, setPos] = useState(50);

  const room = ROOMS.find((r) => r.id === roomId);
  const wc = colors[roomId];
  const allShades = useMemo(() => [...shades.filter((s) => !String(s.code).toUpperCase().startsWith('L')), ...L_SERIES_SHADES], [shades]);
  const shadeOf = (hex) => allShades.find((s) => s.hex.toLowerCase() === hex.toLowerCase());
  const setWall = (hex) => setColors((p) => ({ ...p, [roomId]: { ...p[roomId], [wallId]: hex } }));
  useEffect(() => { if (incoming) setWall(incoming.shade.hex); }, [incoming]); // eslint-disable-line
  const shadeFamilies = useMemo(() => ['All', 'L Series', ...families.filter((f) => f !== 'All' && f !== 'L Series')], [families]);
  const list = allShades.filter((s) => (fam === 'All' || s.family === fam) && (s.name.toLowerCase().includes(q.toLowerCase()) || s.code.toLowerCase().includes(q.toLowerCase())));
  const cur = shadeOf(wc[wallId]);
  const label = (id) => room.walls.find((w) => w[0] === id)[1];
  const before = { backWall: NEUTRAL, leftWall: NEUTRAL, rightWall: NEUTRAL };
  const palette = room.walls.map(([id, l]) => `${l}: ${shadeOf(wc[id]) ? `${shadeOf(wc[id]).name} (${shadeOf(wc[id]).code})` : wc[id]}`).join(', ');

  const downloadPalette = () => {
    const rows = [[tx("Room"), room.name], [tx("Wall"), tx("Shade name / code"), "HEX"]];
    room.walls.forEach(([id, wallLabel]) => {
      const shade = shadeOf(wc[id]);
      rows.push([wallLabel, shade ? `${shade.name} (${shade.code})` : wc[id], wc[id]]);
    });
    const csv = rows.map((row) => row.map((cell) => `"${String(cell).replaceAll('"', '""')}"`).join(',')).join('\n');
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url; a.download = `shiva-traders-${roomId}-palette.csv`; document.body.appendChild(a); a.click(); a.remove();
    setTimeout(() => URL.revokeObjectURL(url), 1500);
  };

  const downloadRoomPreview = () => {
    const svg = roomSvgRef.current?.querySelector('svg');
    if (!svg) { alert('Room preview is not ready yet.'); return; }
    const clone = svg.cloneNode(true);
    clone.setAttribute('xmlns', 'http://www.w3.org/2000/svg');
    clone.setAttribute('width', '1200');
    clone.setAttribute('height', '750');
    const svgText = new XMLSerializer().serializeToString(clone);
    const svgBlob = new Blob([svgText], { type: 'image/svg+xml;charset=utf-8' });
    const svgUrl = URL.createObjectURL(svgBlob);
    const image = new Image();
    image.onload = () => {
      const canvas = document.createElement('canvas');
      canvas.width = 1200; canvas.height = 750;
      const ctx = canvas.getContext('2d');
      if (!ctx) { URL.revokeObjectURL(svgUrl); alert('Could not prepare image download.'); return; }
      ctx.fillStyle = '#F7F6F3'; ctx.fillRect(0, 0, canvas.width, canvas.height);
      ctx.drawImage(image, 0, 0, canvas.width, canvas.height);
      canvas.toBlob((blob) => {
        URL.revokeObjectURL(svgUrl);
        if (!blob) { alert('Image export failed. Please try again.'); return; }
        const pngUrl = URL.createObjectURL(blob);
        const a = document.createElement('a');
        a.href = pngUrl; a.download = `shiva-traders-${roomId}-room.png`;
        document.body.appendChild(a); a.click(); a.remove();
        setTimeout(() => URL.revokeObjectURL(pngUrl), 1500);
      }, 'image/png');
    };
    image.onerror = () => { URL.revokeObjectURL(svgUrl); alert('Could not export room image. Please try again.'); };
    image.src = svgUrl;
  };

  return (
    <div className="w-full min-w-0 overflow-x-hidden bg-[#F7F6F3] text-[#34332F]">
      <div className="w-full max-w-7xl mx-auto min-w-0 px-3 sm:px-5 lg:px-8 py-5 sm:py-8 lg:py-10 space-y-5 sm:space-y-7 lg:space-y-8">
        <div className="max-w-3xl space-y-2">
          <h1 className="text-3xl sm:text-5xl font-semibold">{tx("Room Colour Studio")}</h1>
          <p className="text-[#66645F] text-sm sm:text-base">{tx("Pick a room, tap a wall, then choose a shade. Slide the Before / After control to see the difference. Screens vary, so confirm the final shade on a physical shade card in store.")}</p>
        </div>
        <div className="flex flex-wrap gap-2 min-w-0" role="tablist" aria-label={tx("Rooms")}>
          {ROOMS.map((r) => (
            <button type="button" key={r.id} role="tab" aria-selected={roomId === r.id} onClick={() => { setRoomId(r.id); setWallId('backWall'); }}
              className={`px-2.5 sm:px-5 py-2.5 rounded-full text-xs sm:text-sm font-semibold whitespace-nowrap ${roomId === r.id ? 'bg-[#C8B28A] text-[#34332F]' : 'bg-[#E9E5DD] hover:bg-[#DDD7CC] text-[#34332F]'}`}>{tx(r.name)}</button>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-4 sm:gap-6 items-start min-w-0">
          <div className="min-w-0 lg:col-span-8 space-y-3">
            <div ref={roomSvgRef} className="relative w-full min-w-0 aspect-[4/3] sm:aspect-[16/10] lg:aspect-[16/10] rounded-2xl sm:rounded-3xl overflow-hidden ring-1 ring-[#D5D0C7] shadow-lg bg-[#F7F6F3]">
              <Scene uid="a" roomId={roomId} colors={wc} selected={cmp ? null : wallId} onSelect={setWallId} />
              {cmp && (
                <>
                  <div className="absolute inset-0 pointer-events-none" style={{ clipPath: `inset(0 ${100 - pos}% 0 0)` }}>
                    <Scene uid="c" roomId={roomId} colors={before} />
                  </div>
                  <div className="absolute top-0 bottom-0 w-0.5 bg-white pointer-events-none" style={{ left: `${pos}%` }}><span className="absolute top-1/2 -translate-x-1/2 -translate-y-1/2 w-9 h-9 rounded-full bg-white shadow-xl text-[#34332F] text-xs font-black flex items-center justify-center">⇄</span></div>
                  <span className="absolute top-3 left-3 bg-[#34332F]/75 text-white text-xs font-semibold px-3 py-1 rounded-full">{tx("Before")}</span>
                  <span className="absolute top-3 right-3 bg-[#34332F]/75 text-white text-xs font-semibold px-3 py-1 rounded-full">{tx("After")}</span>
                </>
              )}
              {!cmp && <span className="absolute left-3 bottom-3 bg-[#34332F]/75 backdrop-blur text-white text-xs font-semibold px-3 py-1.5 rounded-full">{tx(label(wallId))}: {cur ? `${cur.name} · ${cur.code}` : wc[wallId]}</span>}
            </div>
            <div className="flex flex-wrap items-center gap-2 sm:gap-3 min-w-0">
              <button type="button" onClick={() => setCmp(!cmp)} aria-pressed={cmp} className={`px-4 py-2 rounded-full text-xs font-bold ${cmp ? 'bg-[#C8B28A] text-[#34332F]' : 'bg-[#E9E5DD] hover:bg-[#DDD7CC] text-[#34332F]'}`}>{tx("Before / After")}</button>
              {cmp && <input type="range" min="0" max="100" value={pos} onChange={(e) => setPos(+e.target.value)} aria-label={tx("Before and after slider")} className="flex-1 accent-[#C8B28A]" />}
              <button type="button" onClick={() => { setColors((p) => ({ ...p, [roomId]: { ...DEF[roomId] } })); setWallId('backWall'); setCmp(false); setPos(50); }} className="ml-auto px-4 py-2 rounded-full text-xs font-bold bg-[#E9E5DD] hover:bg-[#DDD7CC] text-[#34332F] flex items-center gap-1.5"><RotateCcw className="w-3.5 h-3.5" aria-hidden="true" /> {tx("Reset room")}</button>
              <button type="button" onClick={downloadPalette} className="px-3 py-2 rounded-full text-xs font-bold bg-[#C8B28A] hover:bg-[#BBA47B] text-[#34332F] flex items-center gap-1.5"><Download className="w-3.5 h-3.5" aria-hidden="true" /> {tx("Download palette")}</button>
              <button type="button" onClick={downloadRoomPreview} className="px-3 py-2 rounded-full text-xs font-bold bg-[#E9E5DD] hover:bg-[#DDD7CC] text-[#34332F] flex items-center gap-1.5"><Download className="w-3.5 h-3.5" aria-hidden="true" /> {tx("Download room image")}</button>
            </div>
          </div>

          <div className="min-w-0 lg:col-span-4 space-y-4 sm:space-y-5">
            <div className="bg-[#EFEBE4] rounded-2xl p-3 sm:p-4 space-y-2 ring-1 ring-[#D5D0C7]">
              <h2 className="text-sm font-bold">{tx("1. Choose a wall")}</h2>
              {room.walls.map(([id, l]) => {
                const s = shadeOf(wc[id]);
                return (
                  <button type="button" key={id} onClick={() => setWallId(id)} aria-pressed={wallId === id} className={`w-full flex items-center gap-3 p-2.5 rounded-xl text-left ${wallId === id ? 'bg-[#C8B28A] text-[#34332F]' : 'bg-[#E4DFD6] hover:bg-[#D9D3C9] text-[#34332F]'}`}>
                    <span className="w-8 h-8 rounded-lg border border-black/20" style={{ background: wc[id] }} />
                    <span className="flex-1"><span className="block text-xs font-bold">{tx(l)}</span><span className="block text-xs opacity-75">{s ? `${s.name} · ${s.code}` : wc[id]}</span></span>
                    {wallId === id && <Check className="w-4 h-4" aria-hidden="true" />}
                  </button>
                );
              })}
            </div>
            <div className="bg-[#EFEBE4] rounded-2xl p-3 sm:p-4 space-y-3 ring-1 ring-[#D5D0C7]">
              <h2 className="text-sm font-bold">{tx("2. Pick a shade")}</h2>
              <div className="relative"><Search className="w-4 h-4 text-[#77746E] absolute left-3 top-3" aria-hidden="true" /><input value={q} onChange={(e) => setQ(e.target.value)} aria-label={tx("Search shades")} placeholder={tx("Search name or code")} className="w-full min-w-0 pl-9 pr-3 py-2.5 rounded-xl bg-[#F7F6F3] border border-[#D5D0C7] text-[#34332F] text-sm placeholder:text-[#77746E] focus:outline-none focus:ring-2 focus:ring-[#C8B28A]" /></div>
              <p className="text-[10px] sm:text-xs text-[#75644B]">{tx("L-series preview colours are approximate screen samples. Confirm with a physical shade card.")}</p>
              <div className="flex gap-1.5 overflow-x-auto overscroll-x-contain pb-2 -mx-1 px-1 max-w-full">
                {shadeFamilies.map((f) => <button type="button" key={f} onClick={() => setFam(f)} aria-pressed={fam === f} className={`shrink-0 px-3 py-1.5 rounded-full text-xs font-semibold ${fam === f ? 'bg-[#C8B28A] text-[#34332F]' : 'bg-[#E9E5DD] hover:bg-[#DDD7CC] text-[#34332F]'}`}>{tx(f)}</button>)}
              </div>
              <div className="grid grid-cols-4 xs:grid-cols-5 sm:grid-cols-7 md:grid-cols-8 lg:grid-cols-6 xl:grid-cols-8 gap-1.5 sm:gap-2 max-h-64 sm:max-h-72 overflow-y-auto overscroll-contain pr-1 min-w-0">
                {list.map((s) => <button type="button" key={s.id} onClick={() => setWall(s.hex)} aria-label={`${s.name}, code ${s.code}`} title={`${s.name} (${s.code})`} className={`aspect-square rounded-lg border border-[#D5D0C7] hover:scale-110 transition-transform ${cur && cur.id === s.id ? 'ring-2 ring-[#C8B28A] ring-offset-2 ring-offset-[#EFEBE4]' : ''}`} style={{ background: s.hex }} />)}
                {list.length === 0 && <p className="col-span-6 text-xs text-[#77746E]">{tx("No shades match. Try another name or code.")}</p>}
              </div>
            </div>
            <div className="space-y-2">
              {cur && <a href={wa(`Hello Shiva Traders, I like Asian Paints shade ${cur.name} (${cur.code}). Please confirm availability and price.`)} target="_blank" rel="noopener noreferrer" className="w-full bg-[#E9E5DD] hover:bg-[#DDD7CC] text-[#34332F] text-sm font-bold py-3 rounded-xl flex items-center justify-center gap-2"><MessageSquare className="w-4 h-4" aria-hidden="true" /> {tx('Ask about')} {cur.name}</a>}
              <a href={wa(`Hello Shiva Traders, I planned a palette in your Room Colour Studio. Room: ${room.name}. ${palette}. Please advise on paint required.`)} target="_blank" rel="noopener noreferrer" className="w-full bg-[#25D366] hover:bg-[#1DA851] text-white text-sm font-bold py-3.5 rounded-xl flex items-center justify-center gap-2"><Share2 className="w-4 h-4" aria-hidden="true" /> {tx("Send this palette on WhatsApp")}</a>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
