import { useEffect, useMemo, useState } from 'react';
import { ArrowDown, ArrowUpRight, Heart, LockKeyhole, Sparkles, Volume2, VolumeX, X } from 'lucide-react';

const photos = [
  { src: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=900&q=85', alt: 'Portrait éditorial', label: 'L’éclat', note: 'Cette lumière que tu portes sans même t’en rendre compte.' },
  { src: 'https://images.unsplash.com/photo-1524504388940-b1c1722653e1?w=900&q=85', alt: 'Portrait féminin', label: 'La douceur', note: 'Ta gentillesse est une force, jamais une faiblesse.' },
  { src: 'https://images.unsplash.com/photo-1529139574466-a303027c1d8b?w=900&q=85', alt: 'Silhouette mode', label: 'L’audace', note: 'Continue d’oser les choses qui te ressemblent.' },
  { src: 'https://images.unsplash.com/photo-1531123897727-8f129e1688ce?w=900&q=85', alt: 'Portrait lumineux', label: 'La détermination', note: 'Tu avances à ta manière, et c’est aussi ce qui fait ta singularité.' },
  { src: 'https://images.unsplash.com/photo-1515886657613-9f3515b0c78f?w=900&q=85', alt: 'Portrait mode', label: 'Le caractère', note: 'Un peu têtue, parfois redoutable… mais tellement attachante.' },
  { src: 'https://images.unsplash.com/photo-1524250502761-1ac6f2e30d43?w=900&q=85', alt: 'Portrait naturel', label: 'L’authenticité', note: 'Ne laisse jamais le monde éteindre ce qui te rend unique.' },
  { src: 'https://images.unsplash.com/photo-1508214751196-bcfd4ca60f91?w=900&q=85', alt: 'Portrait élégant', label: 'La grâce', note: 'Tu as le droit de prendre ta place et de briller.' },
  { src: 'https://images.unsplash.com/photo-1488426862026-3ee34a7d66df?w=900&q=85', alt: 'Portrait studio', label: 'Le renouveau', note: 'Que cette nouvelle année t’ouvre des portes inattendues.' },
];

const wishes = [
  { n: '01', title: 'Tes ambitions', text: 'Que tes études portent leurs fruits, que tes projets trouvent leur chemin et que chacune de tes entreprises rencontre les bonnes personnes, les bonnes occasions et le bon moment.' },
  { n: '02', title: 'Ton bonheur', text: 'Que tu sois entourée de relations sincères, respectueuses et réciproques. Que tu saches reconnaître l’amour qui t’élève et t’éloigner de ce qui t’éteint.' },
  { n: '03', title: 'Ta foi', text: 'Que Dieu guide tes pas, éclaire tes décisions et fortifie chaque jour ta relation avec Lui. Qu’Il t’accorde la paix intérieure, la sagesse et la patience.' },
  { n: '04', title: 'Ton abondance', text: 'Que le succès financier t’accompagne, non comme une fin en soi, mais comme une liberté : celle de choisir, de construire, d’aider et de profiter dignement du fruit de tes efforts.' },
];

function Balloons({ onLaunch }: { onLaunch: () => void }) {
  return <div className="intro-screen"><div className="intro-grain"/><div className="balloon-field" aria-hidden="true">{Array.from({length:18},(_,i)=><span key={i} className={`balloon balloon-${i%6}`} style={{left:`${(i*19+4)%100}%`,animationDelay:`${(i%7)*-.8}s`,animationDuration:`${10+(i%5)*2}s`}}/>)}</div><div className="intro-copy"><span className="eyebrow"><Sparkles size={13}/> A LITTLE SOMETHING FOR YOU</span><p className="intro-kicker">A new chapter begins</p><h1>Happy <em>23</em>,<br/>Jennifer<span>.</span></h1><p className="intro-sub">Une surprise imaginée avec amour,<br/>juste pour toi.</p><button className="pill-button light" onClick={onLaunch}>Ouvrir ma surprise <ArrowUpRight size={16}/></button><span className="intro-foot">03 · 11 · 2026 <i/> MADE WITH LOVE</span></div><div className="intro-side">SCROLL INTO YOUR DAY · 23 YEARS OF YOU</div></div>;
}

export default function App() {
  const [entered,setEntered] = useState(false);
  const [active,setActive] = useState<number|null>(null);
  const [opened,setOpened] = useState<number[]>([]);
  const [letter,setLetter] = useState(false);
  const [sealed,setSealed] = useState(false);
  const [typed,setTyped] = useState(false);
  const [music,setMusic] = useState(false);
  const reveal = (n:number) => setOpened(v=>v.includes(n)?v:[...v,n]);
  const allOpened = opened.length===wishes.length;
  useEffect(()=>{ if(letter){setTyped(false);const t=window.setTimeout(()=>setTyped(true),2600);return()=>clearTimeout(t);} },[letter]);
  const heartTiles = useMemo(()=>photos.map((p,i)=><button key={p.label} className={`archive-tile tile-${i+1}`} onClick={()=>setActive(i)} aria-label={`Découvrir ${p.label}`}><img src={p.src} alt={p.alt}/><span>{p.label}</span></button>),[]);
  if(!entered) return <Balloons onLaunch={()=>setEntered(true)}/>;
  return <main className="site-shell">
    <nav className="top-nav"><a className="brand" href="#top"><span>✳</span> JENNIFER</a><div><a href="#archive">ARCHIVE</a><a href="#wishes">WISHES</a><a href="#letter">THE LETTER</a></div><button className="sound-toggle" onClick={()=>setMusic(!music)} aria-label="Activer ou désactiver la musique">{music?<Volume2 size={15}/>:<VolumeX size={15}/>}</button></nav>
    <section className="archive-hero" id="top">
      <div className="hero-overline"><span>CHAPTER 23</span><span>03 NOVEMBER 2003 — FOREVER</span></div>
      <div className="heart-mosaic" aria-label="Une mosaïque de portraits de Jennifer">{heartTiles}</div>
      <div className="hero-bottom"><h1><span>Everything</span><br/>that makes<br/><em>you, you.</em></h1><div className="hero-center-note">A life in little moments.<br/>A whole lot of reasons to celebrate.</div><p className="hero-right">23 YEARS<br/><strong>of becoming.</strong></p></div>
      <a className="scroll-cue" href="#archive"><span>DISCOVER HER STORY</span><ArrowDown size={15}/></a>
    </section>
    <section className="archive-section" id="archive">
      <div className="section-heading"><span className="eyebrow">01 / THE ARCHIVE</span><p>Une collection de petits instants,<br/>et tout ce qu’ils racontent de toi.</p></div>
      <div className="floating-gallery">{photos.map((p,i)=><button key={p.label} className={`gallery-photo photo-${i+1}`} onClick={()=>setActive(i)}><img src={p.src} alt={p.alt}/><span className="photo-caption">{p.label} <ArrowUpRight size={13}/></span></button>)}</div>
      <div className="archive-end"><span>NOT JUST A PRETTY PICTURE.</span><span>A THOUSAND LITTLE THINGS TO LOVE.</span></div>
    </section>
    <section className="manifesto">
      <span className="eyebrow">A NOTE FROM YOUR BROTHER</span>
      <h2>Strong in your own way.<br/><em>Beautiful in every way.</em></h2>
      <p>Ta force n’a pas besoin de faire du bruit. Elle se voit dans ta façon de recommencer, de rêver, de tenir bon et de continuer à avancer.</p>
      <span className="manifesto-mark">J.</span>
    </section>
    <section className="wishes-section" id="wishes">
      <div className="section-heading"><span className="eyebrow">02 / THE WISH LIST</span><p>Quatre petites portes.<br/>Ouvre-les une à une.</p></div>
      <div className="wish-grid">{wishes.map((w,i)=><button key={w.n} className={`wish-card ${opened.includes(i)?'is-open':''}`} onClick={()=>reveal(i)}><span className="wish-number">{w.n}</span><span className="wish-lock">{opened.includes(i)?<Heart size={16} fill="currentColor"/>:<LockKeyhole size={16}/>}</span><span className="wish-title">{w.title}</span><span className="wish-text">{opened.includes(i)?w.text:'Un vœu que je garde pour toi…'}</span><span className="wish-action">{opened.includes(i)?'WITH LOVE':'TAP TO REVEAL'} <ArrowUpRight size={13}/></span></button>)}</div>
      {allOpened&&<p className="all-opened"><Sparkles size={15}/> Tu as ouvert tous mes vœux. Il en reste un, écrit rien que pour toi.</p>}
    </section>
    <section className="letter-section" id="letter">
      <div className="letter-intro"><span className="eyebrow">03 / SEALED WITH LOVE</span><h2>Some things<br/>deserve <em>paper.</em></h2><p>Quand les mots du quotidien ne suffisent pas,<br/>il reste une lettre à ouvrir.</p><button className="pill-button" onClick={()=>setLetter(true)}>{letter?'Revoir la lettre':'Dérouler le papyrus'} <ArrowUpRight size={16}/></button></div>
      {letter&&<div className={`parchment-wrap ${typed?'is-written':''}`}><div className="parchment"><div className="paper-top-roll"/><div className="paper-content"><span className="paper-date">À TOI, JENNIFER · EN CE 3 NOVEMBRE</span><p className="handwriting">Ma chère Jennifer,</p><p className="letter-copy">Je ne te le dis peut-être pas assez souvent, mais je suis reconnaissant de t’avoir dans ma vie. Je vois ta force, ta gentillesse, ton courage et cette sensibilité que tu caches parfois derrière ton caractère bien trempé. Tu es ambitieuse, pleine de ressources, drôle à ta façon et profondément attachante. Oui, tu peux être têtue, me faire lever les yeux au ciel et parfois mettre ma patience à l’épreuve… mais ce sont aussi ces petites imperfections qui font que tu es toi. Je suis fier de la personne que tu deviens, et je souhaite que tu n’oublies jamais que tu peux compter sur moi.</p><p className="letter-copy">Pour tes 23 ans, je prie que Dieu accompagne chacun de tes pas. Qu’Il bénisse tes études, tes projets, tes entreprises et les rêves que tu n’as pas encore osé partager. Qu’Il t’accorde des relations saines, un amour sincère, une foi grandissante et une paix que rien ne pourra voler. Que ton travail ouvre des portes, que tes efforts deviennent des réussites et que l’abondance financière te donne les moyens de bâtir la vie que tu souhaites. Je te souhaite des éclats de rire, des voyages, des découvertes, de belles surprises et surtout la joie profonde de devenir pleinement la femme que tu es appelée à être.</p><p className="handwriting signature">Ton frère, Kenneth.</p><div className={`wax-seal ${sealed?'pressed':''}`}><span>J</span><small>WITH LOVE</small></div></div><div className="paper-bottom-roll"/></div><button className="seal-button" onClick={()=>setSealed(true)} disabled={sealed}>{sealed?'LE SCEAU EST APPOSÉ':'APPOSER LE SCEAU'} <Sparkles size={14}/></button></div>}
    </section>
    <footer className="footer"><span className="eyebrow">END OF THIS LITTLE UNIVERSE</span><h2>Keep becoming,<br/><em>Jennifer.</em></h2><p>Le monde est plus beau avec toi dedans.</p><div className="footer-bottom"><span>MADE FOR JENNIFER · 23</span><button onClick={()=>{setEntered(false);setActive(null);setOpened([]);setLetter(false);setSealed(false);window.scrollTo({top:0,behavior:'smooth'});}}>REPLAY THE SURPRISE ↗</button><span>FROM YOUR BROTHER, WITH LOVE.</span></div></footer>
    {active!==null&&<div className="photo-modal" role="dialog" aria-modal="true" onClick={()=>setActive(null)}><button className="modal-close" onClick={()=>setActive(null)}><X/></button><div className="modal-image" onClick={e=>e.stopPropagation()}><img src={photos[active].src} alt={photos[active].alt}/><div><span className="eyebrow">A LITTLE REMINDER</span><h3>{photos[active].label}</h3><p>{photos[active].note}</p><button onClick={()=>setActive((active+1)%photos.length)}>NEXT PORTRAIT <ArrowUpRight size={14}/></button></div></div></div>}
  </main>;
}
