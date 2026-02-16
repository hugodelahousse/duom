import type { Question } from './types';

export const questions: Question[] = [

  // ───────── 1. scenario ─────────
  {
    id: 1,
    type: 'scenario',
    signal: false,
    text: {
      fr: "Vous faites face à un obstacle qui semble insurmontable — un projet bloqué, une situation figée, aucune issue visible.",
      en: "You face an obstacle that seems insurmountable — a blocked project, a frozen situation, no visible way out."
    },
    options: [
      { text: { fr: "Je fonce. Ma détermination finira par ouvrir une brèche.", en: "I push through. My determination will force an opening." }, scores: { V: 3, C: 0, P: 1, I: 0 } },
      { text: { fr: "Je reformule le problème. La solution est peut-être dans un angle que personne n'a vu.", en: "I reframe the problem. The solution may lie in an angle no one has seen." }, scores: { V: 0, C: 3, P: 0.5, I: 1 } },
      { text: { fr: "Je m'accroche et je travaille, jour après jour. La persévérance viendra à bout de tout.", en: "I dig in and work, day after day. Persistence will overcome anything." }, scores: { V: 1, C: 0, P: 3, I: 0 } },
      { text: { fr: "Je prends du recul pour comprendre pourquoi ça bloque. Peut-être que l'obstacle a quelque chose à m'apprendre.", en: "I step back to understand why it's stuck. Maybe the obstacle has something to teach me." }, scores: { V: 1, C: 1, P: 1, I: 3 } },
    ]
  },

  // ───────── 2. binary ─────────
  {
    id: 2,
    type: 'binary',
    signal: false,
    text: {
      fr: "Aube ou crépuscule ?",
      en: "Dawn or dusk?"
    },
    options: [
      { text: { fr: "L'aube — la promesse de ce qui va naître.", en: "Dawn — the promise of what is about to be born." }, scores: { V: 2, C: 1, P: 0.5, I: 0 } },
      { text: { fr: "Le crépuscule — la beauté de ce qui s'achève.", en: "Dusk — the beauty of what is ending." }, scores: { V: 0.5, C: 2, P: 1, I: 1 } },
    ]
  },

  // ───────── 3. preference – SIGNAL ─────────
  {
    id: 3,
    type: 'preference',
    signal: true,
    text: {
      fr: "Ce qui vous définit le mieux :",
      en: "What best defines you:"
    },
    options: [
      { text: { fr: "Ma détermination. Quand je décide, rien ne m'arrête.", en: "My determination. Once I decide, nothing stops me." }, scores: { V: 5, C: 0, P: 1, I: 0 } },
      { text: { fr: "Mon imagination. Je vois ce que les autres ne voient pas.", en: "My imagination. I see what others cannot." }, scores: { V: 0, C: 5, P: 0.5, I: 1 } },
      { text: { fr: "Mon endurance. Je tiens quand les autres abandonnent.", en: "My endurance. I hold on when others give up." }, scores: { V: 1, C: 0, P: 5, I: 0 } },
      { text: { fr: "Mon écoute. Je trouve l'harmonie entre les contraires.", en: "My ability to listen. I find harmony between opposites." }, scores: { V: 1, C: 1, P: 1, I: 4 } },
    ]
  },

  // ───────── 4. scenario ─────────
  {
    id: 4,
    type: 'scenario',
    signal: false,
    text: {
      fr: "On vous offre une page blanche totale : un budget illimité, aucune contrainte, aucun délai. Vous pouvez créer le projet de vos rêves.",
      en: "You are given a completely blank slate: unlimited budget, no constraints, no deadlines. You can create the project of your dreams."
    },
    options: [
      { text: { fr: "Je sais déjà ce que je veux. J'avance sans hésiter.", en: "I already know what I want. I move forward without hesitation." }, scores: { V: 3, C: 0, P: 1, I: 0 } },
      { text: { fr: "Je commence à esquisser des idées — le plus fou, le plus inattendu possible.", en: "I start sketching ideas — the wildest, most unexpected ones possible." }, scores: { V: 0, C: 3, P: 0.5, I: 1 } },
      { text: { fr: "Je m'organise méthodiquement. La liberté totale demande la discipline la plus rigoureuse.", en: "I organize myself methodically. Total freedom requires the strictest discipline." }, scores: { V: 0.5, C: 0.5, P: 3, I: 0.5 } },
      { text: { fr: "Je prends le temps de réfléchir à ce qui aurait vraiment du sens — pour moi et pour les autres.", en: "I take time to reflect on what would truly matter — for me and for others." }, scores: { V: 1, C: 1, P: 1, I: 3 } },
    ]
  },

  // ───────── 5. binary ─────────
  {
    id: 5,
    type: 'binary',
    signal: false,
    text: {
      fr: "L'épée ou le pinceau ?",
      en: "The sword or the brush?"
    },
    options: [
      { text: { fr: "L'épée — trancher, décider, agir.", en: "The sword — to cut, decide, act." }, scores: { V: 2, C: 0.5, P: 1, I: 0 } },
      { text: { fr: "Le pinceau — créer, révéler, transformer.", en: "The brush — to create, reveal, transform." }, scores: { V: 0.5, C: 2, P: 0.5, I: 1 } },
    ]
  },

  // ───────── 6. scenario ─────────
  {
    id: 6,
    type: 'scenario',
    signal: false,
    text: {
      fr: "Un ami traverse une crise grave. Vous pourriez intervenir, mais votre aide pourrait aussi empirer les choses si elle est mal dosée.",
      en: "A close friend is going through a serious crisis. You could step in, but your help could also make things worse if it's poorly calibrated."
    },
    options: [
      { text: { fr: "J'interviens immédiatement, quelles que soient les conséquences. L'inaction est pire.", en: "I step in immediately, whatever the consequences. Inaction is worse." }, scores: { V: 3, C: 0, P: 1, I: -1 } },
      { text: { fr: "Je cherche une approche inattendue — un angle que mon ami n'a pas envisagé.", en: "I look for an unexpected approach — an angle my friend hasn't considered." }, scores: { V: 0.5, C: 3, P: 0.5, I: 1 } },
      { text: { fr: "Je suis là, présent, solide. Je ne lâche pas, même si ça prend du temps.", en: "I'm there, present, solid. I don't let go, even if it takes time." }, scores: { V: 1, C: 0, P: 3, I: 0.5 } },
      { text: { fr: "Je prends un moment pour comprendre vraiment ce qu'il traverse avant d'agir.", en: "I take a moment to truly understand what they're going through before acting." }, scores: { V: 1, C: 1, P: 1, I: 3 } },
    ]
  },

  // ───────── 7. element ─────────
  {
    id: 7,
    type: 'element',
    signal: false,
    text: {
      fr: "Quel élément vous attire le plus ?",
      en: "Which element calls to you most?"
    },
    options: [
      { text: { fr: "Le feu — brûlant, souverain, indomptable.", en: "Fire — burning, sovereign, untamable." }, scores: { V: 3, C: 0.5, P: 1, I: 0 } },
      { text: { fr: "L'air — libre, insaisissable, porteur de visions.", en: "Air — free, elusive, carrying visions." }, scores: { V: 0, C: 3, P: 0.5, I: 1 } },
      { text: { fr: "La terre — patiente, solide, inépuisable.", en: "Earth — patient, solid, inexhaustible." }, scores: { V: 0.5, C: 0, P: 3, I: 1 } },
      { text: { fr: "L'eau — fluide, adaptable, cherchant toujours l'harmonie.", en: "Water — fluid, adaptable, always seeking harmony." }, scores: { V: 1, C: 1, P: 1, I: 3 } },
    ]
  },

  // ───────── 8. binary ─────────
  {
    id: 8,
    type: 'binary',
    signal: false,
    text: {
      fr: "Commander ou inventer ?",
      en: "To command or to invent?"
    },
    options: [
      { text: { fr: "Commander — tracer la voie pour les autres.", en: "To command — to chart the path for others." }, scores: { V: 2, C: 0.5, P: 1, I: 0 } },
      { text: { fr: "Inventer — tracer des chemins qui n'existent pas encore.", en: "To invent — to trace paths that do not yet exist." }, scores: { V: 0.5, C: 2, P: 0.5, I: 1 } },
    ]
  },

  // ───────── 9. scenario ─────────
  {
    id: 9,
    type: 'scenario',
    signal: false,
    text: {
      fr: "On vous demande de réaliser quelque chose que tout le monde considère comme impossible.",
      en: "You are asked to accomplish something everyone considers impossible."
    },
    options: [
      { text: { fr: "Je décrète que c'est possible et je m'y mets avec une conviction absolue.", en: "I declare it possible and begin with absolute conviction." }, scores: { V: 3, C: 1, P: 0.5, I: 0 } },
      { text: { fr: "L'impossible me fascine. Mon esprit s'enflamme de mille idées.", en: "The impossible fascinates me. My mind blazes with a thousand ideas." }, scores: { V: 0, C: 3, P: 0.5, I: 1 } },
      { text: { fr: "Je me prépare pour un très long travail. La patience viendra à bout de l'impossible.", en: "I prepare for a very long endeavour. Patience will overcome the impossible." }, scores: { V: 0.5, C: 0, P: 3, I: 0.5 } },
      { text: { fr: "Je cherche d'abord à comprendre pourquoi c'est considéré comme impossible.", en: "I first try to understand why it is deemed impossible." }, scores: { V: 1, C: 1, P: 1, I: 3 } },
    ]
  },

  // ───────── 10. preference ─────────
  {
    id: 10,
    type: 'preference',
    signal: false,
    text: {
      fr: "Parmi ces qualités, laquelle admirez-vous le plus chez les autres ?",
      en: "Which quality do you admire most in others?"
    },
    options: [
      { text: { fr: "Le courage de décider quand tout le monde hésite.", en: "The courage to decide when everyone else hesitates." }, scores: { V: 3, C: 0, P: 1, I: 0.5 } },
      { text: { fr: "La capacité de voir la beauté là où les autres ne voient rien.", en: "The ability to see beauty where others see nothing." }, scores: { V: 0, C: 3, P: 0.5, I: 1 } },
      { text: { fr: "La force de continuer malgré l'épuisement et la douleur.", en: "The strength to keep going despite exhaustion and pain." }, scores: { V: 1, C: 0, P: 3, I: 0.5 } },
      { text: { fr: "La sagesse de réconcilier des gens ou des idées opposées.", en: "The wisdom to reconcile people or opposing ideas." }, scores: { V: 1, C: 1, P: 1, I: 3 } },
    ]
  },

  // ───────── 11. scenario ─────────
  {
    id: 11,
    type: 'scenario',
    signal: false,
    text: {
      fr: "Vous avez une journée entière sans aucune obligation. Pas de travail, pas de contrainte, rien à faire.",
      en: "You have an entire day with no obligations whatsoever. No work, no constraints, nothing to do."
    },
    options: [
      { text: { fr: "J'en profite pour avancer sur un projet personnel ambitieux.", en: "I use it to advance an ambitious personal project." }, scores: { V: 3, C: 0.5, P: 0.5, I: 0 } },
      { text: { fr: "Je me perds dans quelque chose de créatif — écrire, dessiner, explorer.", en: "I lose myself in something creative — writing, drawing, exploring." }, scores: { V: 0, C: 3, P: 0.5, I: 1 } },
      { text: { fr: "Je m'entraîne, je range, j'organise. Le temps libre est un luxe, j'en tire le maximum.", en: "I train, I tidy, I organize. Free time is a luxury — I make the most of it." }, scores: { V: 1, C: 0.5, P: 3, I: 0 } },
      { text: { fr: "Je passe du temps avec les gens que j'aime, ou simplement à profiter du calme.", en: "I spend time with people I love, or simply enjoy the peace." }, scores: { V: 1, C: 1, P: 1, I: 3 } },
    ]
  },

  // ───────── 12. binary ─────────
  {
    id: 12,
    type: 'binary',
    signal: false,
    text: {
      fr: "La flèche ou le bouclier ?",
      en: "The arrow or the shield?"
    },
    options: [
      { text: { fr: "La flèche — choisir sa cible et ne pas la manquer.", en: "The arrow — choose your target and never miss." }, scores: { V: 2, C: 1, P: 0.5, I: 0 } },
      { text: { fr: "Le bouclier — tenir bon, protéger, durer.", en: "The shield — hold fast, protect, endure." }, scores: { V: 0.5, C: 0.5, P: 2, I: 1 } },
    ]
  },

  // ───────── 13. preference – SIGNAL ─────────
  {
    id: 13,
    type: 'preference',
    signal: true,
    text: {
      fr: "Face à quelqu'un qui a plus de pouvoir ou d'influence que vous :",
      en: "When facing someone with more power or influence than you:"
    },
    options: [
      { text: { fr: "Je refuse de me soumettre. Ma conviction peut dépasser leur influence.", en: "I refuse to submit. My conviction can surpass their influence." }, scores: { V: 5, C: 0, P: 1, I: -1 } },
      { text: { fr: "Je cherche la faille inattendue, l'angle que personne n'a envisagé.", en: "I look for the unexpected flaw, the angle no one has considered." }, scores: { V: 0.5, C: 5, P: 0.5, I: 1 } },
      { text: { fr: "J'encaisse et je persiste. La résistance est ma meilleure arme.", en: "I take the hits and persist. Endurance is my greatest weapon." }, scores: { V: 1, C: 0, P: 5, I: 0.5 } },
      { text: { fr: "J'observe, je m'adapte, et je retourne la situation à mon avantage.", en: "I observe, adapt, and turn the situation to my advantage." }, scores: { V: 1, C: 1, P: 1, I: 4 } },
    ]
  },

  // ───────── 14. binary ─────────
  {
    id: 14,
    type: 'binary',
    signal: false,
    text: {
      fr: "Le silence ou la tempête ?",
      en: "Silence or the storm?"
    },
    options: [
      { text: { fr: "La tempête — la force qui balaie et renouvelle.", en: "The storm — the force that sweeps and renews." }, scores: { V: 2, C: 0.5, P: 1, I: 0 } },
      { text: { fr: "Le silence — l'espace où naissent les visions.", en: "Silence — the space where visions are born." }, scores: { V: 0.5, C: 2, P: 0.5, I: 1 } },
    ]
  },

  // ───────── 15. scenario ─────────
  {
    id: 15,
    type: 'scenario',
    signal: false,
    text: {
      fr: "Vous découvrez que vous avez un talent rare — quelque chose qui vous distingue vraiment. Avec le temps, qu'en faites-vous ?",
      en: "You discover you have a rare talent — something that truly sets you apart. Over time, what do you do with it?"
    },
    options: [
      { text: { fr: "J'en fais un outil de leadership. Je veux influencer et guider.", en: "I make it a tool for leadership. I want to influence and guide." }, scores: { V: 3, C: 0.5, P: 0.5, I: 0 } },
      { text: { fr: "J'explore ses limites créatives. Je veux produire des choses qui n'existent nulle part.", en: "I explore its creative limits. I want to produce things that exist nowhere else." }, scores: { V: 0, C: 3, P: 0.5, I: 1 } },
      { text: { fr: "Je le perfectionne sans relâche. Je veux atteindre la maîtrise absolue.", en: "I perfect it relentlessly. I want to achieve absolute mastery." }, scores: { V: 1, C: 0, P: 3, I: 0 } },
      { text: { fr: "Je l'utilise pour rapprocher les gens et créer du lien.", en: "I use it to bring people together and build connections." }, scores: { V: 1, C: 1, P: 1, I: 3 } },
    ]
  },

  // ───────── 16. preference ─────────
  {
    id: 16,
    type: 'preference',
    signal: false,
    text: {
      fr: "Quel rôle occupez-vous naturellement dans un groupe ?",
      en: "What role do you naturally take in a group?"
    },
    options: [
      { text: { fr: "Le meneur — celui qui prend les décisions.", en: "The leader — the one who makes the decisions." }, scores: { V: 3, C: 0, P: 1, I: 0.5 } },
      { text: { fr: "Le visionnaire — celui qui propose les idées nouvelles.", en: "The visionary — the one who proposes new ideas." }, scores: { V: 0, C: 3, P: 0.5, I: 1 } },
      { text: { fr: "Le pilier — celui sur qui on peut compter, toujours.", en: "The pillar — the one who can always be relied upon." }, scores: { V: 0.5, C: 0, P: 3, I: 1 } },
      { text: { fr: "Le médiateur — celui qui maintient la cohésion.", en: "The mediator — the one who keeps everyone together." }, scores: { V: 1, C: 1, P: 1, I: 3 } },
    ]
  },

  // ───────── 17. binary ─────────
  {
    id: 17,
    type: 'binary',
    signal: false,
    text: {
      fr: "Construire ou détruire pour reconstruire ?",
      en: "To build, or to destroy in order to rebuild?"
    },
    options: [
      { text: { fr: "Détruire pour reconstruire — il faut parfois tout raser.", en: "Destroy to rebuild — sometimes everything must be torn down." }, scores: { V: 2, C: 1, P: 0.5, I: 0 } },
      { text: { fr: "Construire — bâtir sur ce qui existe, pierre après pierre.", en: "Build — add to what exists, stone by stone." }, scores: { V: 0.5, C: 0.5, P: 2, I: 1 } },
    ]
  },

  // ───────── 18. scenario – SIGNAL ─────────
  {
    id: 18,
    type: 'scenario',
    signal: true,
    text: {
      fr: "Vous vivez un moment de grâce : tout ce que vous avez construit — vos compétences, vos expériences, vos efforts — semble enfin converger. Que ressentez-vous ?",
      en: "You experience a moment of grace: everything you've built — your skills, your experiences, your efforts — seems to finally converge. What do you feel?"
    },
    options: [
      { text: { fr: "Une certitude absolue. J'ai toujours su que j'y arriverais.", en: "Absolute certainty. I always knew I would get here." }, scores: { V: 5, C: 0.5, P: 1, I: -1 } },
      { text: { fr: "L'émerveillement. Je vois soudain des possibilités infinies.", en: "Wonder. I suddenly see infinite possibilities." }, scores: { V: 0, C: 5, P: 0.5, I: 1 } },
      { text: { fr: "La fierté du travail accompli. Chaque heure a compté.", en: "Pride in the work done. Every hour counted." }, scores: { V: 1, C: 0.5, P: 5, I: 0 } },
      { text: { fr: "La paix. Tout s'accorde enfin — mon ambition, ma vision et mes efforts.", en: "Peace. Everything comes into accord at last — my ambition, my vision, and my efforts." }, scores: { V: 1, C: 1, P: 1, I: 4 } },
    ]
  },

  // ───────── 19. scenario ─────────
  {
    id: 19,
    type: 'scenario',
    signal: false,
    text: {
      fr: "Vous avez l'occasion d'avoir un impact significatif sur le monde autour de vous. Quel est votre premier réflexe ?",
      en: "You have the chance to make a significant impact on the world around you. What is your first instinct?"
    },
    options: [
      { text: { fr: "Protéger ceux que j'aime. Bâtir une sécurité autour de mon cercle.", en: "Protect those I love. Build a safe haven around my circle." }, scores: { V: 3, C: 0.5, P: 1, I: 0 } },
      { text: { fr: "Créer quelque chose de beau qui inspire les gens.", en: "Create something beautiful that inspires people." }, scores: { V: 0, C: 3, P: 0.5, I: 1 } },
      { text: { fr: "Tester mes propres limites — jusqu'où suis-je capable d'aller ?", en: "Test my own limits — how far am I capable of going?" }, scores: { V: 1, C: 0.5, P: 3, I: 0 } },
      { text: { fr: "Construire des ponts entre des gens ou des mondes qui ne se parlent pas.", en: "Build bridges between people or worlds that don't communicate." }, scores: { V: 1, C: 1, P: 1, I: 3 } },
    ]
  },

  // ───────── 20. binary ─────────
  {
    id: 20,
    type: 'binary',
    signal: false,
    text: {
      fr: "La montagne ou l'océan ?",
      en: "The mountain or the ocean?"
    },
    options: [
      { text: { fr: "La montagne — immobile, invincible, dominant tout.", en: "The mountain — still, invincible, dominating everything." }, scores: { V: 2, C: 0.5, P: 1, I: 0 } },
      { text: { fr: "L'océan — profond, changeant, impossible à saisir.", en: "The ocean — deep, ever-changing, impossible to grasp." }, scores: { V: 0.5, C: 1.5, P: 1, I: 1 } },
    ]
  },

  // ───────── 21. scenario ─────────
  {
    id: 21,
    type: 'scenario',
    signal: false,
    text: {
      fr: "Vous arrivez dans une ville étrangère où vous ne connaissez personne. Tout est nouveau : la langue, les codes, les rues.",
      en: "You arrive in a foreign city where you know no one. Everything is new: the language, the customs, the streets."
    },
    options: [
      { text: { fr: "J'impose mon rythme. Je me repère vite et je prends mes marques.", en: "I impose my own rhythm. I orient myself quickly and establish my bearings." }, scores: { V: 3, C: 0.5, P: 0.5, I: 0 } },
      { text: { fr: "Je me perds volontairement dans les ruelles. C'est là qu'on découvre les vraies choses.", en: "I deliberately lose myself in the alleys. That's where you find the real things." }, scores: { V: 0, C: 3, P: 0.5, I: 1 } },
      { text: { fr: "Je marche longtemps, sans me lasser. La ville se révélera à force de patience.", en: "I walk for hours, without tiring. The city will reveal itself through patience." }, scores: { V: 0.5, C: 0, P: 3, I: 0.5 } },
      { text: { fr: "Je m'assieds dans un café et j'observe. Les gens me raconteront la ville mieux que n'importe quelle carte.", en: "I sit in a café and observe. People will tell me the city better than any map." }, scores: { V: 1, C: 1, P: 1, I: 3 } },
    ]
  },

  // ───────── 22. binary ─────────
  {
    id: 22,
    type: 'binary',
    signal: false,
    text: {
      fr: "L'étoile ou la lune ?",
      en: "The star or the moon?"
    },
    options: [
      { text: { fr: "L'étoile — brûlante, lointaine, irréductible.", en: "The star — burning, distant, unyielding." }, scores: { V: 1.5, C: 1, P: 1, I: 0 } },
      { text: { fr: "La lune — changeante, douce, fidèle aux marées.", en: "The moon — changing, gentle, faithful to the tides." }, scores: { V: 0.5, C: 1.5, P: 0.5, I: 1.5 } },
    ]
  },

  // ───────── 23. scenario ─────────
  {
    id: 23,
    type: 'scenario',
    signal: false,
    text: {
      fr: "Vous sentez monter en vous une énergie intense — la veille d'un moment décisif. Demain, tout va changer. Comment vous préparez-vous ?",
      en: "You feel an intense energy building — the eve of a decisive moment. Tomorrow, everything will change. How do you prepare?"
    },
    options: [
      { text: { fr: "Je me concentre sur ce que je veux obtenir. Ma volonté sera mon moteur.", en: "I focus on what I want to achieve. My will is my engine." }, scores: { V: 3, C: 0, P: 1, I: 0 } },
      { text: { fr: "Je laisse mon esprit vagabonder. Les meilleures idées viennent quand on les cherche le moins.", en: "I let my mind wander. The best ideas come when you least look for them." }, scores: { V: 0, C: 3, P: 0.5, I: 1 } },
      { text: { fr: "Je m'entraîne, je révise, je me prépare physiquement et mentalement.", en: "I train, I review, I prepare physically and mentally." }, scores: { V: 1, C: 0, P: 3, I: 0 } },
      { text: { fr: "Je respire. La préparation est finie — maintenant il faut trouver l'équilibre intérieur.", en: "I breathe. Preparation is done — now I need to find inner balance." }, scores: { V: 1, C: 1, P: 1, I: 3 } },
    ]
  },

  // ───────── 24. binary ─────────
  {
    id: 24,
    type: 'binary',
    signal: false,
    text: {
      fr: "Le pont ou la porte ?",
      en: "The bridge or the door?"
    },
    options: [
      { text: { fr: "Le pont — relier, enjamber, ne laisser aucun abîme infranchissable.", en: "The bridge — to connect, to span, to leave no chasm uncrossable." }, scores: { V: 1, C: 0.5, P: 1, I: 2 } },
      { text: { fr: "La porte — ouvrir sur l'inconnu, franchir un seuil vers un autre monde.", en: "The door — to open onto the unknown, to step across a threshold into another world." }, scores: { V: 0.5, C: 2, P: 0.5, I: 1 } },
    ]
  },

  // ───────── 25. scenario ─────────
  {
    id: 25,
    type: 'scenario',
    signal: false,
    text: {
      fr: "Vous rencontrez quelqu'un dont l'approche de la vie est radicalement différente de la vôtre. Ses idées vous déstabilisent.",
      en: "You meet someone whose approach to life is radically different from yours. Their ideas unsettle you."
    },
    options: [
      { text: { fr: "Je défends mes positions. La confrontation des idées révèle la vérité.", en: "I defend my positions. The clash of ideas reveals the truth." }, scores: { V: 3, C: 0.5, P: 1, I: -1 } },
      { text: { fr: "Je suis fasciné. J'écoute tout, je veux comprendre leur vision.", en: "I am fascinated. I listen to everything; I want to understand their vision." }, scores: { V: 0, C: 3, P: 0.5, I: 1 } },
      { text: { fr: "Je reste ancré dans mes convictions. Leurs idées ne changeront pas qui je suis.", en: "I stay grounded in my beliefs. Their ideas won't change who I am." }, scores: { V: 1, C: 0, P: 3, I: 0.5 } },
      { text: { fr: "Je propose un échange. Unir nos perspectives pourrait être extraordinaire.", en: "I suggest an exchange. Combining our perspectives could be extraordinary." }, scores: { V: 1, C: 1, P: 1, I: 3 } },
    ]
  },

  // ───────── 26. scenario ─────────
  {
    id: 26,
    type: 'scenario',
    signal: false,
    text: {
      fr: "Vous devez improviser — présenter une idée, résoudre un problème, prendre une décision — sans aucune préparation.",
      en: "You must improvise — present an idea, solve a problem, make a decision — with no preparation at all."
    },
    options: [
      { text: { fr: "Je prends le contrôle de la situation avec assurance. L'hésitation est mon ennemi.", en: "I take charge of the situation with confidence. Hesitation is my enemy." }, scores: { V: 3, C: 0.5, P: 1, I: 0 } },
      { text: { fr: "J'improvise avec plaisir — les contraintes stimulent ma créativité.", en: "I improvise with pleasure — constraints stimulate my creativity." }, scores: { V: 0, C: 3, P: 0.5, I: 1 } },
      { text: { fr: "Je m'appuie sur ce que je sais déjà. Mon expérience me guide.", en: "I rely on what I already know. My experience guides me." }, scores: { V: 0.5, C: 0.5, P: 3, I: 0 } },
      { text: { fr: "Je m'adapte au contexte et aux gens autour de moi. La bonne réponse émergera.", en: "I adapt to the context and the people around me. The right answer will emerge." }, scores: { V: 1, C: 1, P: 1, I: 3 } },
    ]
  },

  // ───────── 27. preference (value) ─────────
  {
    id: 27,
    type: 'preference',
    signal: false,
    text: {
      fr: "Quel héritage souhaiteriez-vous laisser ?",
      en: "What legacy would you wish to leave behind?"
    },
    options: [
      { text: { fr: "Un monde transformé par mes décisions.", en: "A world transformed by my decisions." }, scores: { V: 3, C: 0.5, P: 0.5, I: 0 } },
      { text: { fr: "Des œuvres qui émerveillent longtemps après ma disparition.", en: "Works that inspire wonder long after I am gone." }, scores: { V: 0, C: 3, P: 0.5, I: 1 } },
      { text: { fr: "L'exemple d'une vie vécue sans jamais plier.", en: "The example of a life lived without ever bending." }, scores: { V: 1, C: 0, P: 3, I: 0 } },
      { text: { fr: "Des liens durables entre les gens que j'ai aimés.", en: "Lasting bonds between the people I have loved." }, scores: { V: 1, C: 1, P: 1, I: 3 } },
    ]
  },

  // ───────── 28. binary ─────────
  {
    id: 28,
    type: 'binary',
    signal: false,
    text: {
      fr: "La racine ou l'aile ?",
      en: "The root or the wing?"
    },
    options: [
      { text: { fr: "La racine — ancrée, profonde, inébranlable.", en: "The root — anchored, deep, unshakeable." }, scores: { V: 1, C: 0.5, P: 2, I: 0.5 } },
      { text: { fr: "L'aile — libre, légère, ouverte à tous les horizons.", en: "The wing — free, light, open to every horizon." }, scores: { V: 0.5, C: 2, P: 0.5, I: 1 } },
    ]
  },

  // ───────── 29. scenario ─────────
  {
    id: 29,
    type: 'scenario',
    signal: false,
    text: {
      fr: "Votre passion grandit, mais elle exige un prix. Plus vous vous y consacrez, plus elle vous consume. Comment réagissez-vous ?",
      en: "Your passion is growing, but it demands a price. The more you devote yourself to it, the more it consumes you. How do you respond?"
    },
    options: [
      { text: { fr: "Je paierai le prix. Une vie sans engagement total n'en vaut pas la peine.", en: "I will pay the price. A life without total commitment is not worth living." }, scores: { V: 3, C: 0, P: 1, I: 0 } },
      { text: { fr: "Je cherche un moyen de contourner le prix — il doit exister un chemin plus malin.", en: "I look for a way around the price — there must be a smarter path." }, scores: { V: 0, C: 3, P: 0.5, I: 1 } },
      { text: { fr: "Je renforce ma discipline et mon hygiène de vie pour tenir plus longtemps.", en: "I strengthen my discipline and lifestyle to hold out longer." }, scores: { V: 0.5, C: 0, P: 3, I: 0.5 } },
      { text: { fr: "Je cherche un équilibre entre passion et repos. Tout excès est une faille.", en: "I seek a balance between passion and rest. Any excess is a weakness." }, scores: { V: 1, C: 1, P: 1, I: 3 } },
    ]
  },

  // ───────── 30. scenario – SIGNAL ─────────
  {
    id: 30,
    type: 'scenario',
    signal: true,
    text: {
      fr: "Le monde autour de vous est en train de changer profondément. Vous sentez que vous pouvez influencer la direction que prendra ce changement.",
      en: "The world around you is changing profoundly. You feel you can influence the direction that change will take."
    },
    options: [
      { text: { fr: "Je prends les commandes. L'avenir sera celui que je décide.", en: "I take command. The future will be the one I choose." }, scores: { V: 5, C: 0.5, P: 1, I: -1 } },
      { text: { fr: "J'imagine un avenir que personne d'autre n'a osé envisager.", en: "I imagine a future no one else has dared to envision." }, scores: { V: 0.5, C: 5, P: 0.5, I: 1 } },
      { text: { fr: "Je m'ancre et je tiens bon. Le monde a besoin de stabilité.", en: "I anchor myself and hold firm. The world needs stability." }, scores: { V: 1, C: 0, P: 5, I: 0.5 } },
      { text: { fr: "J'écoute toutes les voix, puis je tisse le changement ensemble.", en: "I listen to every voice, then weave the change together." }, scores: { V: 1, C: 1, P: 1, I: 4 } },
    ]
  },

  // ───────── 31. binary ─────────
  {
    id: 31,
    type: 'binary',
    signal: false,
    text: {
      fr: "Le marbre ou l'argile ?",
      en: "Marble or clay?"
    },
    options: [
      { text: { fr: "Le marbre — éternel, exigeant, impitoyable envers l'erreur.", en: "Marble — eternal, demanding, unforgiving of error." }, scores: { V: 2, C: 0.5, P: 1, I: 0 } },
      { text: { fr: "L'argile — souple, vivante, toujours prête à être remodelée.", en: "Clay — supple, alive, always ready to be reshaped." }, scores: { V: 0.5, C: 2, P: 0.5, I: 1 } },
    ]
  },

  // ───────── 32. scenario ─────────
  {
    id: 32,
    type: 'scenario',
    signal: false,
    text: {
      fr: "Vous découvrez une discipline, un art ou un savoir qui mêle des domaines que vous pensiez incompatibles.",
      en: "You discover a discipline, art, or body of knowledge that blends fields you thought were incompatible."
    },
    options: [
      { text: { fr: "Je veux maîtriser les règles de cette discipline. Comprendre pour dominer.", en: "I want to master the rules of this discipline. Understand in order to command." }, scores: { V: 3, C: 0.5, P: 0.5, I: 0 } },
      { text: { fr: "Je m'y plonge avec enthousiasme — mélanger les genres, c'est là que naissent les chefs-d'œuvre.", en: "I dive in enthusiastically — mixing genres is where masterpieces are born." }, scores: { V: 0, C: 3, P: 0.5, I: 1 } },
      { text: { fr: "Je m'y consacre avec méthode, à mon rythme. Pas de raccourci.", en: "I devote myself to it methodically, at my own pace. No shortcuts." }, scores: { V: 0.5, C: 0, P: 3, I: 0.5 } },
      { text: { fr: "Je vois cette fusion comme une invitation à élargir ma vision du monde.", en: "I see this fusion as an invitation to broaden my understanding of the world." }, scores: { V: 1, C: 1, P: 1, I: 3 } },
    ]
  },

  // ───────── 33. element ─────────
  {
    id: 33,
    type: 'element',
    signal: false,
    text: {
      fr: "Quel instrument résonne le plus en vous ?",
      en: "Which instrument resonates most deeply within you?"
    },
    options: [
      { text: { fr: "Le tambour — primitif, souverain, battant le rythme de la marche.", en: "The drum — primal, sovereign, beating the rhythm of the march." }, scores: { V: 3, C: 0.5, P: 1, I: 0 } },
      { text: { fr: "La harpe — délicate, aérienne, tissant des mélodies impossibles.", en: "The harp — delicate, ethereal, weaving impossible melodies." }, scores: { V: 0, C: 3, P: 0.5, I: 1 } },
      { text: { fr: "L'enclume — brute, puissante, forgeant sans relâche.", en: "The anvil — raw, powerful, forging without rest." }, scores: { V: 1, C: 0, P: 3, I: 0 } },
      { text: { fr: "Le carillon — chaque note en accord, chaque vibration en harmonie.", en: "The chime — every note in accord, every vibration in harmony." }, scores: { V: 1, C: 1, P: 1, I: 3 } },
    ]
  },

  // ───────── 34. scenario ─────────
  {
    id: 34,
    type: 'scenario',
    signal: false,
    text: {
      fr: "Vous marchez seul dans une forêt ancienne. Le sentier se divise en quatre chemins. Aucune indication, aucun repère.",
      en: "You walk alone through an ancient forest. The path splits into four. There are no signs, no landmarks."
    },
    options: [
      { text: { fr: "Je choisis le plus raide et le plus direct. On verra bien.", en: "I choose the steepest and most direct one. We shall see." }, scores: { V: 3, C: 0, P: 1, I: 0 } },
      { text: { fr: "Je prends celui qui semble le plus étrange — les courbes me parlent.", en: "I take the one that looks strangest — the curves speak to me." }, scores: { V: 0, C: 3, P: 0.5, I: 1 } },
      { text: { fr: "Je marche sur celui qui paraît le plus long. J'ai la patience.", en: "I walk the one that seems longest. I have the patience." }, scores: { V: 0.5, C: 0, P: 3, I: 0.5 } },
      { text: { fr: "Je m'arrête au croisement. J'écoute la forêt avant de choisir.", en: "I stop at the crossing. I listen to the forest before choosing." }, scores: { V: 1, C: 1, P: 1, I: 3 } },
    ]
  },

  // ───────── 35. binary ─────────
  {
    id: 35,
    type: 'binary',
    signal: false,
    text: {
      fr: "La certitude ou le doute ?",
      en: "Certainty or doubt?"
    },
    options: [
      { text: { fr: "La certitude — avancer sans trembler, décider sans revenir.", en: "Certainty — to advance without trembling, to decide without looking back." }, scores: { V: 2, C: 0.5, P: 1, I: 0 } },
      { text: { fr: "Le doute — le terreau de la curiosité, la porte de l'invention.", en: "Doubt — the soil of curiosity, the doorway to invention." }, scores: { V: 0.5, C: 2, P: 0.5, I: 1 } },
    ]
  },

  // ───────── 36. scenario ─────────
  {
    id: 36,
    type: 'scenario',
    signal: false,
    text: {
      fr: "Vous apprenez une nouvelle compétence exigeante. Au début, c'est frustrant et douloureux — vous n'y arrivez pas.",
      en: "You are learning a demanding new skill. At first, it is frustrating and painful — you can't get it right."
    },
    options: [
      { text: { fr: "Je force le passage. La frustration ne m'arrêtera pas.", en: "I force my way through. Frustration won't stop me." }, scores: { V: 3, C: 0, P: 1, I: 0 } },
      { text: { fr: "Je modifie mon approche. Il doit y avoir une façon plus créative d'apprendre.", en: "I change my approach. There must be a more creative way to learn." }, scores: { V: 0.5, C: 3, P: 0.5, I: 0.5 } },
      { text: { fr: "Je recommence chaque jour, méthodiquement, jusqu'à ce que ça devienne naturel.", en: "I start again each day, methodically, until it becomes natural." }, scores: { V: 0.5, C: 0, P: 3, I: 0.5 } },
      { text: { fr: "Je cherche le point d'équilibre entre effort et lâcher-prise.", en: "I seek the point of balance between effort and surrender." }, scores: { V: 1, C: 1, P: 1, I: 3 } },
    ]
  },

  // ───────── 37. scenario ─────────
  {
    id: 37,
    type: 'scenario',
    signal: false,
    text: {
      fr: "On vous donne une feuille blanche et on vous dit simplement : « Crée. » Pas de thème, pas de consigne.",
      en: "You are given a blank sheet and simply told: 'Create.' No theme, no instructions."
    },
    options: [
      { text: { fr: "Je sais déjà ce que je veux. Je commence immédiatement.", en: "I already know what I want. I start immediately." }, scores: { V: 3, C: 1, P: 0.5, I: 0 } },
      { text: { fr: "L'absence de contrainte m'exalte. Les idées les plus folles jaillissent.", en: "The absence of constraint excites me. The wildest ideas pour out." }, scores: { V: 0, C: 3, P: 0.5, I: 1 } },
      { text: { fr: "Je pose des fondations solides. Même la liberté a besoin de structure.", en: "I lay solid foundations. Even freedom needs structure." }, scores: { V: 0.5, C: 0, P: 3, I: 0.5 } },
      { text: { fr: "Je prends un moment de silence. L'inspiration viendra quand je serai en paix.", en: "I take a quiet moment. Inspiration will come when I'm at peace." }, scores: { V: 1, C: 1, P: 1, I: 3 } },
    ]
  },

  // ───────── 38. scenario ─────────
  {
    id: 38,
    type: 'scenario',
    signal: false,
    text: {
      fr: "Vous entrez dans un lieu qui amplifie vos capacités — un studio, un laboratoire, un espace parfait pour ce que vous faites. Tout ce que vous produirez ici sera meilleur.",
      en: "You enter a place that amplifies your abilities — a studio, a laboratory, a space perfectly suited to what you do. Everything you produce here will be better."
    },
    options: [
      { text: { fr: "Parfait. Je réalise exactement ce que j'ai en tête, sans compromis.", en: "Perfect. I execute exactly what I have in mind, without compromise." }, scores: { V: 3, C: 0.5, P: 1, I: 0 } },
      { text: { fr: "Je laisse ma créativité courir librement — cet espace amplifiera la beauté.", en: "I let my creativity run free — this space will amplify the beauty." }, scores: { V: 0, C: 3, P: 1, I: 0.5 } },
      { text: { fr: "J'absorbe tout ce que cet endroit peut m'offrir pour me renforcer.", en: "I absorb everything this place can offer to strengthen myself." }, scores: { V: 1, C: 0, P: 3, I: 0 } },
      { text: { fr: "Je prends le temps de ressentir l'énergie de ce lieu avant d'agir.", en: "I take time to feel the energy of this place before acting." }, scores: { V: 1, C: 1, P: 1, I: 3 } },
    ]
  },

  // ───────── 39. preference ─────────
  {
    id: 39,
    type: 'preference',
    signal: false,
    text: {
      fr: "Si vous pouviez développer une seule qualité au plus haut niveau, laquelle choisiriez-vous ?",
      en: "If you could develop a single quality to the highest level, which would you choose?"
    },
    options: [
      { text: { fr: "L'autorité naturelle — être suivi sans avoir à forcer.", en: "Natural authority — to be followed without having to force." }, scores: { V: 3, C: 0, P: 0.5, I: 0.5 } },
      { text: { fr: "L'inventivité pure — imaginer ce qui n'existe nulle part.", en: "Pure inventiveness — to imagine what exists nowhere." }, scores: { V: 0, C: 3, P: 0.5, I: 1 } },
      { text: { fr: "La résilience absolue — ne jamais céder, quoi qu'il arrive.", en: "Absolute resilience — to never yield, no matter what." }, scores: { V: 1, C: 0, P: 3, I: 0 } },
      { text: { fr: "L'empathie profonde — ressentir et comprendre tout le monde.", en: "Deep empathy — to feel and understand everyone." }, scores: { V: 1, C: 1, P: 1, I: 3 } },
    ]
  },

  // ───────── 40. binary ─────────
  {
    id: 40,
    type: 'binary',
    signal: false,
    text: {
      fr: "La flamme ou la braise ?",
      en: "The flame or the ember?"
    },
    options: [
      { text: { fr: "La flamme — vive, impatiente, dévorante.", en: "The flame — vivid, impatient, devouring." }, scores: { V: 2, C: 1, P: 0.5, I: 0 } },
      { text: { fr: "La braise — patiente, discrète, prête à embraser le monde.", en: "The ember — patient, discreet, ready to set the world ablaze." }, scores: { V: 0.5, C: 0.5, P: 2, I: 1 } },
    ]
  },

  // ───────── 41. scenario ─────────
  {
    id: 41,
    type: 'scenario',
    signal: false,
    text: {
      fr: "Vous avez atteint un haut niveau d'expertise dans votre domaine. On vous demande de transmettre votre savoir. Comment enseignez-vous ?",
      en: "You have reached a high level of expertise in your field. You are asked to pass on your knowledge. How do you teach?"
    },
    options: [
      { text: { fr: "Par l'exemple et l'exigence. Mes élèves devront se dépasser.", en: "By example and rigour. My students will have to surpass themselves." }, scores: { V: 3, C: 0, P: 1, I: 0.5 } },
      { text: { fr: "En montrant que chacun doit trouver son propre chemin.", en: "By showing that everyone must find their own path." }, scores: { V: 0, C: 3, P: 0.5, I: 1 } },
      { text: { fr: "Par la répétition et la discipline. La maîtrise vient du travail.", en: "Through repetition and discipline. Mastery comes from work." }, scores: { V: 1, C: 0, P: 3, I: 0.5 } },
      { text: { fr: "En créant un espace de confiance où chacun peut explorer sans crainte.", en: "By creating a space of trust where everyone can explore without fear." }, scores: { V: 1, C: 1, P: 1, I: 3 } },
    ]
  },

  // ───────── 42. preference – SIGNAL ─────────
  {
    id: 42,
    type: 'preference',
    signal: true,
    text: {
      fr: "Au fond de vous, qu'est-ce qui compte le plus ?",
      en: "Deep down, what matters most to you?"
    },
    options: [
      { text: { fr: "Avoir le dernier mot. Que ma volonté façonne le monde.", en: "Having the last word. That my will shapes the world." }, scores: { V: 5, C: 0, P: 1, I: -1 } },
      { text: { fr: "Laisser une trace unique — une œuvre, une idée, une vision.", en: "Leaving a unique mark — a work, an idea, a vision." }, scores: { V: 0, C: 5, P: 0.5, I: 1 } },
      { text: { fr: "Traverser chaque épreuve sans rompre. Être indestructible.", en: "Surviving every trial without breaking. Being indestructible." }, scores: { V: 1, C: 0, P: 5, I: 0 } },
      { text: { fr: "Que les gens autour de moi soient en paix, et que je sois en paix avec moi-même.", en: "That the people around me be at peace, and that I be at peace with myself." }, scores: { V: 1, C: 1, P: 1, I: 4 } },
    ]
  },

  // ───────── 43. scenario ─────────
  {
    id: 43,
    type: 'scenario',
    signal: false,
    text: {
      fr: "Quelqu'un vous confie une responsabilité importante — un projet, une équipe, une mission. C'est au-delà de ce que vous avez fait jusque-là.",
      en: "Someone entrusts you with a major responsibility — a project, a team, a mission. It's beyond anything you've done before."
    },
    options: [
      { text: { fr: "Je saisis l'opportunité. C'est exactement ce que j'attendais.", en: "I seize the opportunity. This is exactly what I was waiting for." }, scores: { V: 3, C: 0.5, P: 1, I: 0 } },
      { text: { fr: "Je suis enthousiaste — je vois déjà comment faire les choses autrement.", en: "I'm enthusiastic — I already see how to do things differently." }, scores: { V: 0, C: 3, P: 0.5, I: 1 } },
      { text: { fr: "J'accepte et je me prépare minutieusement. La rigueur sera ma meilleure alliée.", en: "I accept and prepare meticulously. Rigour will be my greatest ally." }, scores: { V: 0.5, C: 0, P: 3, I: 0.5 } },
      { text: { fr: "J'écoute d'abord ceux qui sont déjà impliqués. Comprendre le contexte est essentiel.", en: "I first listen to those already involved. Understanding the context is essential." }, scores: { V: 1, C: 1, P: 1, I: 3 } },
    ]
  },

  // ───────── 44. element ─────────
  {
    id: 44,
    type: 'element',
    signal: false,
    text: {
      fr: "Quel moment de la journée vous ressemble le plus ?",
      en: "Which time of day most resembles you?"
    },
    options: [
      { text: { fr: "Le zénith — le soleil au plus haut, sans ombre, sans compromis.", en: "High noon — the sun at its peak, no shadows, no compromise." }, scores: { V: 3, C: 0, P: 1, I: 0 } },
      { text: { fr: "L'heure bleue — cet entre-deux où le réel vacille et le rêve s'éveille.", en: "The blue hour — that in-between where reality wavers and dreams awaken." }, scores: { V: 0, C: 3, P: 0.5, I: 1 } },
      { text: { fr: "La nuit profonde — silencieuse, résistante, immense.", en: "The deep night — silent, enduring, immense." }, scores: { V: 0.5, C: 0.5, P: 3, I: 0.5 } },
      { text: { fr: "Le lever du jour — le monde entier en équilibre entre obscurité et lumière.", en: "Daybreak — the whole world balanced between darkness and light." }, scores: { V: 1, C: 1, P: 1, I: 3 } },
    ]
  },

  // ───────── 45. scenario ─────────
  {
    id: 45,
    type: 'scenario',
    signal: false,
    text: {
      fr: "Vous devez résoudre un problème d'une complexité vertigineuse — un système que personne n'a réussi à démêler avant vous.",
      en: "You must solve a problem of staggering complexity — a system no one has managed to untangle before you."
    },
    options: [
      { text: { fr: "Je ne cherche pas à tout comprendre. Je tranche par la force de ma conviction.", en: "I don't try to understand everything. I cut through by the force of my conviction." }, scores: { V: 3, C: 0, P: 1, I: -0.5 } },
      { text: { fr: "J'étudie les motifs. Tout système complexe a une logique cachée, une beauté secrète.", en: "I study the patterns. Every complex system has a hidden logic, a secret beauty." }, scores: { V: 0, C: 3, P: 0.5, I: 1 } },
      { text: { fr: "J'y consacre tout mon temps et toute mon énergie, aussi longtemps qu'il le faudra.", en: "I devote all my time and energy to it, for as long as it takes." }, scores: { V: 0.5, C: 0, P: 3, I: 0.5 } },
      { text: { fr: "J'entre en résonance avec le problème. Peut-être que la solution émerge quand on cesse de forcer.", en: "I enter into resonance with the problem. Perhaps the solution emerges when you stop forcing." }, scores: { V: 1, C: 1, P: 1, I: 3 } },
    ]
  },

  // ───────── 46. preference (value) ─────────
  {
    id: 46,
    type: 'preference',
    signal: false,
    text: {
      fr: "Qu'est-ce que vous seriez prêt à sacrifier pour protéger ce qui compte ?",
      en: "What would you be willing to sacrifice to protect what matters?"
    },
    options: [
      { text: { fr: "Mon confort et ma sécurité — je prendrai tous les risques.", en: "My comfort and safety — I will take every risk." }, scores: { V: 3, C: 0, P: 1, I: 0.5 } },
      { text: { fr: "Mon anonymat — je créerai quelque chose de visible, quoi qu'il m'en coûte.", en: "My anonymity — I will create something visible, whatever it costs me." }, scores: { V: 0.5, C: 3, P: 0.5, I: 0.5 } },
      { text: { fr: "Mon corps — il peut souffrir si mon esprit reste intact.", en: "My body — it can suffer as long as my mind stays intact." }, scores: { V: 1, C: 0, P: 3, I: 0 } },
      { text: { fr: "Mon ego — je m'effacerai si cela maintient l'harmonie.", en: "My ego — I will step aside if it preserves harmony." }, scores: { V: 1, C: 1, P: 1, I: 3 } },
    ]
  },

  // ───────── 47. binary ─────────
  {
    id: 47,
    type: 'binary',
    signal: false,
    text: {
      fr: "Le cristal ou la fumée ?",
      en: "Crystal or smoke?"
    },
    options: [
      { text: { fr: "Le cristal — clair, pur, tranchant.", en: "Crystal — clear, pure, sharp." }, scores: { V: 2, C: 0.5, P: 1, I: 0 } },
      { text: { fr: "La fumée — insaisissable, changeante, pleine de formes secrètes.", en: "Smoke — elusive, shifting, full of hidden shapes." }, scores: { V: 0.5, C: 2, P: 0.5, I: 1 } },
    ]
  },

  // ───────── 48. scenario ─────────
  {
    id: 48,
    type: 'scenario',
    signal: false,
    text: {
      fr: "Quelqu'un essaie de vous manipuler — vous sentez la pression, les arguments spécieux, la tentative de contrôle.",
      en: "Someone is trying to manipulate you — you feel the pressure, the specious arguments, the attempt at control."
    },
    options: [
      { text: { fr: "Je contre-attaque immédiatement. Je ne me laisse pas faire.", en: "I counter-attack immediately. I won't be pushed around." }, scores: { V: 3, C: 0, P: 1, I: 0 } },
      { text: { fr: "Je retourne la situation avec intelligence — ils ne s'attendent pas à ça.", en: "I turn the situation around with wit — they won't expect that." }, scores: { V: 0.5, C: 3, P: 0.5, I: 0.5 } },
      { text: { fr: "Je résiste en silence. Aucune pression ne me fera bouger.", en: "I resist in silence. No pressure will make me budge." }, scores: { V: 1, C: 0, P: 3, I: 0 } },
      { text: { fr: "Je cherche à comprendre pourquoi ils font ça — puis j'agis en connaissance de cause.", en: "I try to understand why they're doing this — then act with full awareness." }, scores: { V: 1, C: 1, P: 1, I: 3 } },
    ]
  },

  // ───────── 49. preference (value) ─────────
  {
    id: 49,
    type: 'preference',
    signal: false,
    text: {
      fr: "À la fin de tout, qu'espérez-vous avoir été ?",
      en: "At the end of everything, what do you hope to have been?"
    },
    options: [
      { text: { fr: "Quelqu'un qui a changé le cours des choses.", en: "Someone who changed the course of things." }, scores: { V: 3, C: 0.5, P: 0.5, I: 0 } },
      { text: { fr: "Quelqu'un qui a vu le monde autrement et qui l'a montré.", en: "Someone who saw the world differently and showed it." }, scores: { V: 0, C: 3, P: 0.5, I: 1 } },
      { text: { fr: "Quelqu'un qui n'a jamais abandonné, quoi qu'il arrive.", en: "Someone who never gave up, no matter what." }, scores: { V: 0.5, C: 0, P: 3, I: 0.5 } },
      { text: { fr: "Quelqu'un qui a su écouter, comprendre et unir.", en: "Someone who knew how to listen, understand, and unite." }, scores: { V: 1, C: 1, P: 1, I: 3 } },
    ]
  },

  // ───────── 50. scenario – SIGNAL (finale) ─────────
  {
    id: 50,
    type: 'scenario',
    signal: true,
    text: {
      fr: "L'épreuve ultime. Tout ce que vous avez construit est menacé. Tout ce que vous êtes — votre volonté, votre créativité, votre endurance — doit servir en cet instant.",
      en: "The ultimate trial. Everything you have built is threatened. Everything you are — your will, your creativity, your endurance — must serve in this moment."
    },
    options: [
      { text: { fr: "Je me dresse et j'impose ma volonté. Rien ne tombera tant que je serai debout.", en: "I rise and impose my will. Nothing will fall while I stand." }, scores: { V: 5, C: 0.5, P: 1, I: 0 } },
      { text: { fr: "J'invente. La solution la plus audacieuse, la plus inattendue — celle qui changera tout.", en: "I invent. The boldest, most unexpected solution — the one that will change everything." }, scores: { V: 0.5, C: 5, P: 1, I: 0.5 } },
      { text: { fr: "Je tiens. Pierre après pierre, souffle après souffle. Je ne lâche pas.", en: "I hold. Stone by stone, breath by breath. I do not let go." }, scores: { V: 1, C: 0.5, P: 5, I: 0 } },
      { text: { fr: "Je rassemble tout — ma volonté, ma vision, ma force — en un seul geste parfait.", en: "I gather everything — my will, my vision, my strength — into one single, perfect gesture." }, scores: { V: 1, C: 1, P: 1, I: 4 } },
    ]
  },

];
