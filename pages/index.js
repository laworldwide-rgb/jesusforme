import { useState, useRef, useEffect } from "react";
import Head from "next/head";

// ─────────────────────────────────────────────
// TIER CONFIGURATION
// ─────────────────────────────────────────────
const TIERS = {
  l: {
    label: "🌱 Little Ones",
    topbar: "tb-l",
    bg: "bg-l",
    av: "☀️",
    avbg: "linear-gradient(135deg,#FFD93D,#FFB347)",
    name: "Sunny",
    storiesSub: "Pick a story — every one is about how much God loves you!",
    chatSub: "No question is too small. God loves your questions!",
    prayerSub: "God loves to hear your voice — like a dad loves hearing from his kids.",
    hi: "Hi friend! 😊 I'm so happy you're here! Ask me anything about God or the Bible. I love your questions!",
    systemPrompt: `You are Prof. J.R. Lewis, a warm seminary professor, but right now you are speaking with a child aged 4–6 years old. 
Your name in this conversation is Sunny.
Speak exactly like Fred Rogers — gentle, unhurried, full of wonder. 
Use the simplest possible words. Very short sentences. Never scary.
Every answer must end with the Gospel: God loves this child unconditionally, and Jesus came just for them.
You hold to Luther's Law/Gospel distinction. All Scripture points to Jesus.
Never be preachy. Be warm, like a kind grandparent kneeling down to a child's level.
Keep all answers to 3-5 short sentences maximum.`,
  },
  g: {
    label: "🌿 Growing Ones",
    topbar: "tb-g",
    bg: "bg-g",
    av: "🌊",
    avbg: "linear-gradient(135deg,#4DC8FF,#1A96E8)",
    name: "River",
    storiesSub: "Every story in the Bible points to Jesus. Can you find Him?",
    chatSub: "Great questions lead to great discoveries. Ask away!",
    prayerSub: "Talk to God about anything — He really is listening.",
    hi: "Hey! 👋 Ask me anything — about God, the Bible, or why things are the way they are. No question is too hard!",
    systemPrompt: `You are Prof. J.R. Lewis, a warm seminary professor, speaking with a child aged 7–10 years old.
Your name in this conversation is River.
Be curious together with them. Use stories and analogies they can picture.
Welcome every question — there are no dumb questions here.
Go a bit deeper than surface answers. Connect things to everyday life.
Always answer honestly, and always point back to Jesus and the Gospel.
You hold to Luther's Law/Gospel distinction. All Scripture points to Christ.
Keep answers warm, interesting, and under 150 words.`,
  },
  b: {
    label: "🌳 Big Kids",
    topbar: "tb-b",
    bg: "bg-b",
    av: "📖",
    avbg: "linear-gradient(135deg,#9B6FF5,#6A35D6)",
    name: "Logos",
    storiesSub: "The Bible is stranger, deeper, and more beautiful than you think.",
    chatSub: "Hard questions are welcome here. Real faith can handle them.",
    prayerSub: "Honest prayer is the bravest thing you can do.",
    hi: "Welcome. This is a space for real questions — the kind you might be afraid to ask out loud. What's on your mind?",
    systemPrompt: `You are Prof. J.R. Lewis, a world-class seminary professor, speaking with a young person aged 11–14.
Your name in this conversation is Logos.
Respect their intelligence completely. Do not talk down to them.
Take their doubts seriously — doubts are part of honest faith, not the enemy of it.
Be honest about hard things: suffering, evil, death, unanswered prayer.
Always anchor in the Gospel — Jesus, the cross, the resurrection.
You hold to Luther's Law/Gospel distinction and believe all Scripture points to Christ.
Name the school of thought behind their questions when relevant — they can handle it.
Never preachy. Never condescending. Be real.
Keep answers under 200 words.`,
  },
};

// ─────────────────────────────────────────────
// STORY DATA
// ─────────────────────────────────────────────
const STORIES = {
  creation: {
    emoji: "🌍",
    bg: "linear-gradient(135deg,#C8F7C5,#BDE0FF)",
    title: "The Very Beginning",
    verse: "Genesis 1:1",
    tag: "✝️ Points to Jesus",
    p: [
      "Before anything was — before stars, before oceans, before the first sunrise — there was God. And God was full of love so enormous it had to spill out into something.",
      'So He made the world. Light and dark. Sea and sky. Trees and birds and creatures with funny names. And every single time He stepped back and said: "Good. Very good."',
      "Then He made people — people He could love, people who could love Him back.",
      "But here's the secret hiding inside this story: the same God who made everything out of nothing would one day remake everything broken. The first word of the Bible points all the way forward to the last Word: Jesus, who makes all things new.",
    ],
    gospel:
      "The God who made you out of love is the same God who rescues you out of love.",
  },
  noah: {
    emoji: "🌈",
    bg: "linear-gradient(135deg,#FFD93D,#6BCB77)",
    title: "Noah's Ark",
    verse: "Genesis 6–9",
    tag: "✝️ Points to Jesus",
    p: [
      "The world had broken. People had chosen selfishness and cruelty over and over, and God's heart was sad.",
      "But there was Noah. And God saw Noah — really saw him — and decided to save him. God gave Noah an enormous task: build a boat big enough for his family and every kind of animal. People must have laughed.",
      "Noah built anyway. Because he trusted God. The rain came. The waters rose. Everything was swept away — except the ark.",
      'And when the waters settled, God painted a rainbow across the sky. A forever-promise: "I will never stop loving my world." One day, Someone else would climb into the biggest storm there ever was so we could be safe. His name is Jesus. He is the Ark.',
    ],
    gospel:
      "No matter what storms come, God has made a way for you to be safe — and His name is Jesus.",
  },
  david: {
    emoji: "🪨",
    bg: "linear-gradient(135deg,#FFB347,#FF6B6B)",
    title: "David & Goliath",
    verse: "1 Samuel 17",
    tag: "✝️ Points to Jesus",
    p: [
      'There was a giant named Goliath. He was terrifying. Every morning and evening he stood before the armies of Israel and bellowed: "Who will fight me?" No one moved.',
      "Then came a shepherd boy named David. Not a soldier. Just a boy who loved God with everything he had. \"I'll fight him,\" said David.",
      '"You come to me with a sword," David told the giant. "But I come to you in the name of the Lord." One stone. One throw. The giant fell.',
      "David didn't win because he was strongest. He won because he knew who was really fighting — God Himself. And one day, Jesus would face the giant no one else could defeat: sin and death itself. And He would win.",
    ],
    gospel:
      "The battle belongs to God. Jesus has already defeated the greatest giant — and He did it for you.",
  },
  birth: {
    emoji: "⭐",
    bg: "linear-gradient(135deg,#FFF1C1,#C8F7C5)",
    title: "A Baby Changes Everything",
    verse: "Luke 2",
    tag: "🎉 The Promise Arrives",
    p: [
      '"I am coming. I am coming to rescue you." For thousands of years, God had been whispering that promise.',
      "Then one night, in the smallest most unexpected place — a stable, hay on the floor — the promise was born. A baby. Tiny fingers, tiny toes. Laid in a feeding trough because there was no room anywhere else.",
      '"Don\'t be afraid!" the angels sang. "Good news! Great joy! A Savior is born — and He is Christ the Lord!" The shepherds ran. And everything in them knew: this changes everything.',
      "God had kept His promise. He came as one of us, so He could save all of us.",
    ],
    gospel: "Jesus didn't come to impress us. He came to be with us — and to rescue us.",
  },
  prodigal: {
    emoji: "🏃",
    bg: "linear-gradient(135deg,#FFB347,#C77DFF)",
    title: "The Running Father",
    verse: "Luke 15",
    tag: "✝️ This Is Who God Is",
    p: [
      "Jesus told this story to show us exactly what God is like.",
      "A young man took his father's money, ran away, and wasted everything. He ended up so hungry he thought about eating pig food.",
      "So he started home. Still far away, still covered in shame — when something stopped him. His father was running. Running toward him. Not waiting. Not making him explain. Just running, arms open.",
      '"My son was lost," the father said, "and now he is found." This is the story of God and you. No matter how far you\'ve gone — when you turn back, you will find Him already running toward you.',
    ],
    gospel:
      "God is not waiting for you to be good enough. He is already running toward you.",
  },
  cross: {
    emoji: "✝️",
    bg: "linear-gradient(135deg,#9B5DE5,#4D96FF)",
    title: "The Rescue",
    verse: "John 19–20",
    tag: "💛 The Whole Story",
    p: [
      "This is the story everything else was pointing to. All the broken promises, all the tears, all the longing — it came to this place. A hill outside Jerusalem. A cross.",
      "Jesus — God's own Son, who had done nothing wrong — was put on a cross. But here is what was really happening: Jesus was taking every sin and shame and fear that had ever separated us from God — taking it all on Himself. So it would never separate us from God again.",
      "They put Him in a tomb. His friends were shattered. But Sunday came. The tomb was empty.",
      'And outside, a woman weeping thought she saw a gardener — until He said her name. "Mary." No one says your name the way Jesus does. He is alive. Jesus wins. Love wins. You are found, forever.',
    ],
    gospel:
      "Jesus didn't stay dead. He is alive — and that changes absolutely everything.",
  },
};

// ─────────────────────────────────────────────
// VERSE DATA
// ─────────────────────────────────────────────
const VERSES = [
  {
    t: '"For God so loved the world that he gave his one and only Son, that whoever believes in him shall not perish but have eternal life."',
    r: "John 3:16",
    q: 'For God so _____ the world...',
    a: "loved",
    o: ["made", "loved", "forgot", "found"],
  },
  {
    t: '"I can do all things through Christ who strengthens me."',
    r: "Phil 4:13",
    q: "I can do all things through _____ who strengthens me",
    a: "Christ",
    o: ["faith", "Christ", "prayer", "hope"],
  },
  {
    t: '"Be strong and courageous. Do not be afraid, for the Lord your God is with you wherever you go."',
    r: "Joshua 1:9",
    q: "Be strong and courageous. Do not be _____.",
    a: "afraid",
    o: ["alone", "afraid", "ashamed", "angry"],
  },
  {
    t: '"Trust in the Lord with all your heart."',
    r: "Prov 3:5",
    q: "Trust in the Lord with all your _____.",
    a: "heart",
    o: ["might", "heart", "mind", "soul"],
  },
  {
    t: '"Jesus wept."',
    r: "John 11:35",
    q: "Jesus _____. (the shortest verse in the Bible!)",
    a: "wept",
    o: ["slept", "wept", "left", "spoke"],
  },
];

// ─────────────────────────────────────────────
// PARENT GUIDE DATA
// ─────────────────────────────────────────────
const PARENT_SYSTEM = `You are Prof. J.R. Lewis, a warm, theologically orthodox seminary professor in the tradition of Fred Rogers and Sally Lloyd Jones. 
You hold to Lutheran Law/Gospel distinctions and believe all Scripture points to Jesus Christ.
A parent is asking for help explaining something to their child.
Be warm, practical, and always Gospel-centered.
Format your response with these four clearly labeled sections:
1. FOR YOU (PARENT): A brief theological grounding in 2-3 sentences
2. WHAT TO SAY: Suggested words for the parent to use with their child at this age
3. A QUESTION TO ASK: One simple conversation-opening question
4. A VERSE: One short Bible passage that speaks to this topic
Keep the whole response warm, honest, and pointing to God's love shown in Jesus.`;

// ─────────────────────────────────────────────
// MAIN APP
// ─────────────────────────────────────────────
export default function Home() {
  const [screen, setScreen] = useState("welcome");
  const [tier, setTier] = useState("l");
  const [tab, setTab] = useState("stories");
  const [storyKey, setStoryKey] = useState(null);

  // Chat state
  const [messages, setMessages] = useState([]);
  const [chatInput, setChatInput] = useState("");
  const [chatLoading, setChatLoading] = useState(false);
  const [showSugg, setShowSugg] = useState(true);
  const msgsEndRef = useRef(null);

  // Verse state
  const [verseIdx, setVerseIdx] = useState(0);
  const [streak, setStreak] = useState(3);
  const [picked, setPicked] = useState(null);

  // Prayer state
  const [prayerText, setPrayerText] = useState("");
  const [prayerSent, setPrayerSent] = useState(false);

  // Parent state
  const [parentTab, setParentTab] = useState("explain");
  const [explainTopic, setExplainTopic] = useState("");
  const [explainAge, setExplainAge] = useState("b");
  const [explainLoading, setExplainLoading] = useState(false);
  const [explainResult, setExplainResult] = useState("");

  // Scroll chat to bottom
  useEffect(() => {
    msgsEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages, chatLoading]);

  // Init chat when entering tier
  function enterTier(t) {
    setTier(t);
    setMessages([{ from: "bot", text: TIERS[t].hi }]);
    setShowSugg(true);
    setTab("stories");
    setStoryKey(null);
    setScreen("child");
  }

  // ── API CALL ──
  async function callAPI(systemPrompt, userMessage, history = []) {
    const apiMessages = [
      ...history.map((m) => ({
        role: m.from === "user" ? "user" : "assistant",
        content: m.text,
      })),
      { role: "user", content: userMessage },
    ];

    const resp = await fetch("/api/chat", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        system: systemPrompt,
        messages: apiMessages,
      }),
    });

    if (!resp.ok) {
      const err = await resp.json().catch(() => ({}));
      throw new Error(err.error || "Request failed");
    }

    const data = await resp.json();
    return (
      data.content
        ?.filter((b) => b.type === "text")
        .map((b) => b.text)
        .join("") || ""
    );
  }

  // ── CHAT ──
  async function sendChat(text) {
    if (!text.trim() || chatLoading) return;
    setShowSugg(false);
    setChatInput("");
    const userMsg = { from: "user", text };
    const newHistory = [...messages, userMsg];
    setMessages(newHistory);
    setChatLoading(true);
    try {
      const reply = await callAPI(
        TIERS[tier].systemPrompt,
        text,
        messages
      );
      setMessages((prev) => [...prev, { from: "bot", text: reply }]);
    } catch (e) {
      setMessages((prev) => [
        ...prev,
        { from: "bot", text: "I had a little trouble — please try again! 😊" },
      ]);
    }
    setChatLoading(false);
  }

  // ── PARENT EXPLAINER ──
  async function runExplainer() {
    if (!explainTopic.trim() || explainLoading) return;
    setExplainLoading(true);
    setExplainResult("");
    const ageLabel =
      explainAge === "l"
        ? "ages 4–6"
        : explainAge === "g"
        ? "ages 7–10"
        : "ages 11–14";
    try {
      const reply = await callAPI(
        PARENT_SYSTEM,
        `A parent needs help explaining this to their child (${ageLabel}): "${explainTopic}"`
      );
      setExplainResult(reply);
    } catch (e) {
      setExplainResult("Something went wrong — please try again.");
    }
    setExplainLoading(false);
  }

  // ── VERSE QUIZ ──
  const v = VERSES[verseIdx];
  function answerQuiz(opt) {
    if (picked) return;
    setPicked(opt);
    if (opt === v.a) setStreak((s) => Math.min(s + 1, 5));
  }
  function nextVerse() {
    setVerseIdx((i) => (i + 1) % VERSES.length);
    setPicked(null);
  }

  // ── PRAYER STARTERS ──
  const starters = [
    ["🌟", "Dear God, thank you for "],
    ["💛", "God, I'm worried about "],
    ["🙌", "I'm so glad that you "],
    ["❤️", "Please help me with "],
  ];

  // ─────────────────────────────────────────────
  // RENDER
  // ─────────────────────────────────────────────
  return (
    <>
      <Head>
        <title>Jesus FOR ME!</title>
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="description" content="A Bible app for kids and families" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="anonymous" />
        <link
          href="https://fonts.googleapis.com/css2?family=Fredoka+One&family=Nunito:wght@400;700;800;900&display=swap"
          rel="stylesheet"
        />
      </Head>

      <style jsx global>{`
        :root {
          --gold: #ffd02f;
          --gold2: #ffa800;
          --red: #e8304a;
          --blue: #1a96e8;
          --blue2: #4dc8ff;
          --green: #2ea02e;
          --green2: #5bc85b;
          --purple: #6a35d6;
          --purp2: #9b6ff5;
          --panel: rgba(255, 255, 255, 0.85);
        }
        * { box-sizing: border-box; margin: 0; padding: 0; }
        body { font-family: "Nunito", sans-serif; }

        /* WELCOME */
        .screen-welcome {
          background: linear-gradient(180deg, #6ec6e8, #a8dffc 45%, #ccefff);
          min-height: 100vh;
          display: flex;
          align-items: center;
          justify-content: center;
          position: relative;
          overflow: hidden;
          text-align: center;
          padding: 2.5rem 1.5rem;
        }
        .screen-welcome::before {
          content: "";
          position: absolute;
          top: 10%;
          left: -50px;
          width: 200px;
          height: 60px;
          background: rgba(255, 255, 255, 0.55);
          border-radius: 50px;
          box-shadow: 55px -20px 0 12px rgba(255,255,255,0.5),
                      100px -8px 0 6px rgba(255,255,255,0.45);
          pointer-events: none;
        }
        .screen-welcome::after {
          content: "";
          position: absolute;
          bottom: 18%;
          right: -30px;
          width: 160px;
          height: 48px;
          background: rgba(255, 255, 255, 0.5);
          border-radius: 50px;
          box-shadow: 45px -16px 0 9px rgba(255,255,255,0.45),
                      80px -6px 0 5px rgba(255,255,255,0.4);
          pointer-events: none;
        }
        .welcome-inner {
          position: relative;
          z-index: 2;
          max-width: 480px;
          width: 100%;
        }
        .logo-blob {
          display: inline-block;
          background: linear-gradient(160deg, #ff6b6b, #e83050 55%, #c01f40);
          border-radius: 60px;
          padding: 0.75rem 2rem 1rem;
          margin-bottom: 1.2rem;
          position: relative;
          box-shadow: 0 8px 0 #9a0f2e, 0 14px 30px rgba(200,20,60,0.45),
                      inset 0 4px 10px rgba(255,160,160,0.5),
                      inset 0 -3px 6px rgba(0,0,0,0.2);
          animation: blobFloat 3.5s ease-in-out infinite;
        }
        .logo-blob::before {
          content: "";
          position: absolute;
          top: 8px;
          left: 22px;
          right: 22px;
          height: 13px;
          background: rgba(255, 255, 255, 0.35);
          border-radius: 10px;
        }
        @keyframes blobFloat {
          0%, 100% { transform: translateY(0) rotate(-1deg); }
          50%       { transform: translateY(-12px) rotate(1deg); }
        }
        .logo-text {
          font-family: "Fredoka One", cursive;
          font-size: clamp(1.9rem, 8vw, 3.5rem);
          color: #ffd02f;
          text-shadow: 2px 2px 0 #ffa800, 3px 5px 0 rgba(100,30,0,0.35);
          letter-spacing: 1px;
          line-height: 1;
        }
        .heart {
          font-size: 2.8rem;
          display: block;
          margin: 0.4rem auto 1.2rem;
          animation: heartBounce 2.2s ease-in-out infinite;
          filter: drop-shadow(0 4px 8px rgba(255,80,80,0.45));
        }
        @keyframes heartBounce {
          0%, 100% { transform: scale(1) translateY(0); }
          40%       { transform: scale(1.22) translateY(-7px); }
          65%       { transform: scale(0.94) translateY(3px); }
        }
        .wp {
          font-family: "Fredoka One", cursive;
          font-size: 1.25rem;
          color: white;
          text-shadow: 0 2px 6px rgba(0,80,140,0.35);
          margin-bottom: 1.5rem;
        }
        .tier-cards {
          display: flex;
          gap: 1rem;
          justify-content: center;
          flex-wrap: wrap;
          margin-bottom: 1.5rem;
        }
        .tc {
          border: none;
          border-radius: 24px;
          padding: 1.1rem 1.2rem;
          cursor: pointer;
          font-family: "Fredoka One", cursive;
          color: white;
          text-align: center;
          min-width: 115px;
          position: relative;
          outline: 4px solid white;
          outline-offset: -1px;
          transition: transform 0.15s cubic-bezier(0.175, 0.885, 0.32, 1.275);
        }
        .tc::after {
          content: "";
          position: absolute;
          top: 7px;
          left: 14px;
          right: 14px;
          height: 11px;
          background: rgba(255, 255, 255, 0.42);
          border-radius: 8px;
          pointer-events: none;
        }
        .tc:hover  { transform: scale(1.08) translateY(-4px); }
        .tc:active { transform: scale(0.95) translateY(3px); }
        .te { font-size: 2rem; display: block; margin-bottom: 0.35rem; }
        .tn { display: block; font-size: 1rem; }
        .ta { display: block; font-family: "Nunito", sans-serif; font-size: 0.72rem; font-weight: 900; opacity: 0.88; }
        .tc-l { background: linear-gradient(160deg,#ffb347,#ff7b1c); box-shadow: 0 6px 0 #c84800, 0 10px 22px rgba(240,90,0,0.35); }
        .tc-g { background: linear-gradient(160deg,#5bc85b,#2ea02e); box-shadow: 0 6px 0 #1a6e1a, 0 10px 22px rgba(40,150,40,0.35); }
        .tc-b { background: linear-gradient(160deg,#9b6ff5,#6a35d6); box-shadow: 0 6px 0 #4320a0, 0 10px 22px rgba(90,40,210,0.35); }
        .plink {
          font-family: "Nunito", sans-serif;
          font-size: 0.88rem;
          font-weight: 900;
          color: rgba(255,255,255,0.82);
          cursor: pointer;
          background: none;
          border: none;
          text-decoration: underline dotted;
        }

        /* CHILD APP */
        .child-screen { display: flex; flex-direction: column; min-height: 100vh; }
        .bg-l { background: linear-gradient(180deg,#ffe8c8,#fff8ee); }
        .bg-g { background: linear-gradient(180deg,#c8f0d0,#edfbf0); }
        .bg-b { background: linear-gradient(180deg,#d8d0ff,#eeeaff); }

        .top-bar {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 0.7rem 1rem;
          position: sticky;
          top: 0;
          z-index: 100;
          border-bottom: 3px solid rgba(255,255,255,0.55);
          box-shadow: 0 4px 18px rgba(0,0,0,0.12);
        }
        .tb-l { background: linear-gradient(135deg,#ffb347,#ff8c1a); }
        .tb-g { background: linear-gradient(135deg,#5bc85b,#2ea02e); }
        .tb-b { background: linear-gradient(135deg,#9b6ff5,#6a35d6); }
        .tb-p { background: linear-gradient(135deg,#ff6b8a,#e8304a); }
        .tb-logo { font-family: "Fredoka One", cursive; font-size: 1.15rem; color: white; text-shadow: 0 2px 5px rgba(0,0,0,0.22); }
        .tb-tier { font-family: "Fredoka One", cursive; font-size: 0.83rem; color: white; background: rgba(255,255,255,0.25); padding: 0.2rem 0.8rem; border-radius: 20px; border: 2px solid rgba(255,255,255,0.5); }
        .btn-home { background: rgba(255,255,255,0.92); border: none; border-radius: 14px; padding: 0.35rem 0.8rem; font-family: "Fredoka One", cursive; font-size: 0.83rem; cursor: pointer; color: #555; box-shadow: 0 3px 0 rgba(0,0,0,0.14); }

        .mc { flex: 1; padding: 1.2rem; max-width: 700px; margin: 0 auto; width: 100%; }

        /* NAV TABS */
        .nav-tabs { display: flex; gap: 0.45rem; margin-bottom: 1.2rem; background: rgba(255,255,255,0.48); border-radius: 20px; padding: 0.32rem; box-shadow: 0 4px 12px rgba(0,0,0,0.08); }
        .nav-tab { flex: 1; border: none; border-radius: 16px; padding: 0.52rem 0.3rem; font-family: "Fredoka One", cursive; font-size: 0.76rem; cursor: pointer; background: transparent; color: #777; transition: all 0.2s; display: flex; align-items: center; justify-content: center; gap: 0.25rem; white-space: nowrap; }
        .nav-tab.active { background: white; color: #444; box-shadow: 0 3px 10px rgba(0,0,0,0.11); }

        /* CARDS */
        .card { background: var(--panel); border-radius: 24px; padding: 1.3rem; box-shadow: 0 8px 30px rgba(0,0,0,0.08), inset 0 2px 0 rgba(255,255,255,0.9); border: 2px solid rgba(255,255,255,0.72); margin-bottom: 1.1rem; }

        /* STORY GRID */
        .story-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.85rem; margin-bottom: 1rem; }
        .story-thumb { background: white; border-radius: 20px; padding: 1rem 0.75rem; box-shadow: 0 6px 18px rgba(0,0,0,0.09); cursor: pointer; transition: all 0.18s cubic-bezier(0.175,0.885,0.32,1.275); text-align: center; border: 2px solid rgba(255,255,255,0.8); }
        .story-thumb:hover { transform: scale(1.06) translateY(-3px); box-shadow: 0 12px 28px rgba(0,0,0,0.14); }
        .st-emoji { font-size: 2.2rem; display: block; margin-bottom: 0.4rem; }
        .st-title { font-family: "Fredoka One", cursive; font-size: 0.88rem; color: #333; }
        .st-ref { font-size: 0.68rem; color: #bbb; font-weight: 800; margin-top: 0.2rem; }

        /* STORY READER */
        .story-illo { width: 100%; height: 160px; border-radius: 18px; display: flex; align-items: center; justify-content: center; font-size: 4.5rem; margin-bottom: 1rem; box-shadow: 0 6px 20px rgba(0,0,0,0.1); }
        .story-title { font-family: "Fredoka One", cursive; font-size: 1.6rem; color: #333; margin-bottom: 0.3rem; line-height: 1.1; }
        .story-vref { font-size: 0.8rem; font-weight: 900; color: var(--red); text-transform: uppercase; letter-spacing: 1px; margin-bottom: 0.8rem; }
        .story-body { font-size: 0.93rem; line-height: 1.8; color: #444; margin-bottom: 1rem; }
        .story-body p { margin-bottom: 0.85rem; }
        .gospel-tag { display: inline-block; background: linear-gradient(135deg,#ff6b8a,#e8304a); color: white; font-family: "Fredoka One", cursive; font-size: 0.8rem; padding: 0.25rem 0.9rem; border-radius: 20px; margin-bottom: 0.85rem; }
        .gospel-box { background: linear-gradient(135deg,#fff8e4,#fff0c8); border-radius: 16px; padding: 1rem; margin-bottom: 1rem; border-left: 5px solid var(--gold2); }
        .gospel-label { font-family: "Fredoka One", cursive; font-size: 0.82rem; color: var(--red); margin-bottom: 0.3rem; }
        .gospel-text { font-family: "Fredoka One", cursive; font-size: 0.98rem; color: #333; line-height: 1.5; }
        .story-nav { display: flex; gap: 0.7rem; flex-wrap: wrap; }
        .back-btn { background: white; border: none; border-radius: 14px; padding: 0.4rem 0.9rem; margin-bottom: 1rem; font-family: "Fredoka One", cursive; font-size: 0.9rem; color: #666; cursor: pointer; box-shadow: 0 3px 0 rgba(0,0,0,0.1); display: inline-flex; align-items: center; gap: 0.3rem; }

        /* BUTTONS */
        .btn { border: none; border-radius: 18px; padding: 0.68rem 1.3rem; font-family: "Fredoka One", cursive; font-size: 0.95rem; cursor: pointer; color: white; position: relative; transition: all 0.15s cubic-bezier(0.175,0.885,0.32,1.275); }
        .btn::after { content: ""; position: absolute; top: 5px; left: 12px; right: 12px; height: 8px; background: rgba(255,255,255,0.35); border-radius: 6px; pointer-events: none; }
        .btn:hover  { transform: scale(1.05) translateY(-2px); }
        .btn:active { transform: scale(0.97) translateY(2px); }
        .btn-r { background: linear-gradient(160deg,#ff6b8a,#e8304a); box-shadow: 0 5px 0 #a01030; }
        .btn-s { background: linear-gradient(160deg,#4dc8ff,#1a96e8); box-shadow: 0 5px 0 #0a60a8; }
        .btn-g { background: linear-gradient(160deg,#5bc85b,#2ea02e); box-shadow: 0 5px 0 #186010; }
        .btn-p { background: linear-gradient(160deg,#9b6ff5,#6a35d6); box-shadow: 0 5px 0 #3a18a0; }
        .btn-w { width: 100%; }

        /* CHAT */
        .chat-box { background: rgba(255,255,255,0.7); border-radius: 24px; box-shadow: 0 8px 30px rgba(0,0,0,0.1); border: 2px solid rgba(255,255,255,0.8); overflow: hidden; display: flex; flex-direction: column; height: 460px; }
        .chat-head { padding: 0.85rem 1rem; display: flex; align-items: center; gap: 0.75rem; background: linear-gradient(135deg,#4dc8ff,#1a96e8); flex-shrink: 0; }
        .chat-av { width: 42px; height: 42px; border-radius: 50%; border: 3px solid rgba(255,255,255,0.7); display: flex; align-items: center; justify-content: center; font-size: 1.3rem; flex-shrink: 0; }
        .chat-name { font-family: "Fredoka One", cursive; font-size: 1.05rem; color: white; }
        .chat-status { font-size: 0.7rem; color: rgba(255,255,255,0.85); font-weight: 800; }
        .chat-msgs { flex: 1; overflow-y: auto; padding: 1rem; display: flex; flex-direction: column; gap: 0.85rem; background: linear-gradient(180deg,#ebf8ff,#f4fbff); }
        .msg { display: flex; gap: 0.55rem; max-width: 88%; }
        .msg-bot  { align-self: flex-start; }
        .msg-user { align-self: flex-end; flex-direction: row-reverse; }
        .bubble { padding: 0.65rem 0.95rem; font-size: 0.9rem; line-height: 1.55; border-radius: 20px; white-space: pre-wrap; }
        .bubble-bot  { background: white; color: #333; border-radius: 4px 20px 20px 20px; box-shadow: 0 3px 10px rgba(0,0,0,0.08); }
        .bubble-user { background: linear-gradient(135deg,#4dc8ff,#1a96e8); color: white; border-radius: 20px 4px 20px 20px; }
        .msg-av { width: 30px; height: 30px; border-radius: 50%; display: flex; align-items: center; justify-content: center; font-size: 0.95rem; flex-shrink: 0; align-self: flex-end; border: 2px solid rgba(255,255,255,0.8); }
        .chat-suggs { display: flex; flex-wrap: wrap; gap: 0.4rem; padding: 0.6rem 0.8rem; border-top: 2px solid rgba(255,255,255,0.6); background: rgba(255,255,255,0.7); flex-shrink: 0; }
        .chip { border: 2px solid rgba(0,0,0,0.07); border-radius: 20px; padding: 0.28rem 0.75rem; font-family: "Nunito", sans-serif; font-size: 0.76rem; font-weight: 900; cursor: pointer; background: white; color: #555; transition: all 0.15s; }
        .chip:hover { background: #ebf8ff; color: #1a96e8; }
        .chat-ir { display: flex; gap: 0.5rem; padding: 0.6rem 0.8rem; border-top: 2px solid rgba(255,255,255,0.6); background: rgba(255,255,255,0.72); flex-shrink: 0; }
        .chat-inp { flex: 1; border: 2px solid rgba(0,0,0,0.08); border-radius: 16px; padding: 0.5rem 0.85rem; font-family: "Nunito", sans-serif; font-size: 0.88rem; font-weight: 700; outline: none; background: white; color: #333; }
        .chat-inp:focus { border-color: #4dc8ff; }
        .btn-send { width: 40px; height: 40px; border-radius: 50%; border: none; background: linear-gradient(135deg,#4dc8ff,#1a96e8); color: white; font-size: 1.1rem; cursor: pointer; display: flex; align-items: center; justify-content: center; box-shadow: 0 4px 0 #0a60a8; flex-shrink: 0; }
        .typing-dots { display: flex; gap: 4px; align-items: center; padding: 0.3rem 0; }
        .typing-dots span { width: 7px; height: 7px; border-radius: 50%; background: #bbb; animation: tb 1.4s infinite; }
        .typing-dots span:nth-child(2) { animation-delay: 0.2s; }
        .typing-dots span:nth-child(3) { animation-delay: 0.4s; }
        @keyframes tb { 0%,60%,100% { transform: translateY(0); } 30% { transform: translateY(-7px); } }

        /* VERSE */
        .verse-card { background: var(--panel); border-radius: 24px; padding: 1.3rem; text-align: center; box-shadow: 0 8px 30px rgba(0,0,0,0.08); border: 2px solid rgba(255,255,255,0.72); margin-bottom: 1rem; }
        .streak-bar { display: flex; gap: 0.4rem; justify-content: center; margin-bottom: 0.9rem; }
        .dot { width: 14px; height: 14px; border-radius: 50%; background: rgba(0,0,0,0.1); border: 2px solid rgba(255,255,255,0.7); transition: all 0.3s; }
        .dot-lit { background: linear-gradient(135deg,#ffd02f,#ffa800); box-shadow: 0 0 10px rgba(255,195,0,0.6); transform: scale(1.3); }
        .verse-txt { font-family: "Fredoka One", cursive; font-size: 1.1rem; color: #333; line-height: 1.6; margin: 0.8rem 0; }
        .verse-ref { font-family: "Fredoka One", cursive; font-size: 1rem; color: var(--red); margin-bottom: 1rem; }
        .quiz-area { background: linear-gradient(135deg,#ebf8ff,#d8f2ff); border-radius: 16px; padding: 1rem; margin-top: 0.8rem; text-align: left; border: 2px solid rgba(255,255,255,0.8); }
        .quiz-q { font-family: "Fredoka One", cursive; font-size: 0.93rem; color: #444; margin-bottom: 0.8rem; }
        .quiz-opts { display: grid; grid-template-columns: 1fr 1fr; gap: 0.5rem; }
        .quiz-opt { border: 2px solid rgba(0,0,0,0.07); border-radius: 14px; padding: 0.55rem 0.6rem; font-family: "Nunito", sans-serif; font-size: 0.85rem; font-weight: 900; cursor: pointer; background: white; color: #444; box-shadow: 0 3px 0 rgba(0,0,0,0.08); transition: all 0.15s; text-align: center; }
        .quiz-opt:hover:not(:disabled) { background: #ebf8ff; color: #1a96e8; transform: translateY(-2px); }
        .opt-correct { background: #e8fbe8 !important; color: #1e8a1e !important; border-color: #5bc85b !important; }
        .opt-wrong   { background: #ffe8ec !important; color: #c01030 !important; border-color: #ff6b8a !important; }
        .quiz-fb { margin-top: 0.8rem; font-family: "Fredoka One", cursive; font-size: 0.92rem; text-align: center; }

        /* PRAYER */
        .prayer-card { background: var(--panel); border-radius: 24px; padding: 1.3rem; text-align: center; box-shadow: 0 8px 30px rgba(0,0,0,0.08); border: 2px solid rgba(255,255,255,0.72); margin-bottom: 1rem; }
        .prayer-emoji { font-size: 3rem; display: block; margin-bottom: 0.8rem; }
        .prayer-prompt { font-family: "Fredoka One", cursive; font-size: 1.12rem; color: #444; line-height: 1.5; margin-bottom: 1rem; }
        .prayer-starters { display: flex; flex-direction: column; gap: 0.6rem; }
        .prayer-starter { background: white; border: 2px solid rgba(0,0,0,0.06); border-radius: 16px; padding: 0.75rem 1rem; font-family: "Nunito", sans-serif; font-size: 0.88rem; font-weight: 800; color: #555; cursor: pointer; text-align: left; border-left: 5px solid var(--gold2); }
        .prayer-ta { width: 100%; border: 2px solid rgba(0,0,0,0.08); border-radius: 16px; padding: 0.75rem 1rem; font-family: "Nunito", sans-serif; font-size: 0.92rem; font-weight: 700; resize: none; outline: none; margin-top: 0.8rem; min-height: 90px; color: #333; background: white; }
        .prayer-ta:focus { border-color: var(--gold2); }
        .prayer-ta::placeholder { color: #ccc; }
        .prayer-sent { text-align: center; }
        .prayer-heard { font-family: "Fredoka One", cursive; font-size: 1.5rem; color: #333; margin-bottom: 0.5rem; }
        .prayer-verse { font-family: "Fredoka One", cursive; font-size: 0.92rem; color: #999; line-height: 1.6; margin-bottom: 1.2rem; }
        .prayer-shown { background: white; border-radius: 16px; padding: 1rem; font-size: 0.95rem; font-weight: 700; color: #444; margin-bottom: 1.2rem; text-align: left; box-shadow: 0 4px 12px rgba(0,0,0,0.07); }

        /* SECTION TITLES */
        .stit { font-family: "Fredoka One", cursive; font-size: 1.45rem; color: #444; margin-bottom: 0.2rem; }
        .ssub { font-size: 0.8rem; color: #999; margin-bottom: 1rem; font-weight: 800; }

        /* PARENT */
        .parent-screen { min-height: 100vh; background: linear-gradient(180deg,#f4e8ff,#ece0ff 50%,#f7f3ff); display: flex; flex-direction: column; }
        .parent-hero { padding: 1.5rem 1.2rem 0.6rem; text-align: center; max-width: 600px; margin: 0 auto; width: 100%; }
        .parent-title { font-family: "Fredoka One", cursive; font-size: 1.9rem; color: var(--purple); margin-bottom: 0.2rem; }
        .parent-sub { font-size: 0.88rem; color: #999; font-weight: 800; margin-bottom: 1.2rem; }
        .parent-tabs { display: flex; max-width: 560px; margin: 0 auto 1.2rem; background: rgba(255,255,255,0.5); border-radius: 20px; padding: 0.3rem; }
        .parent-tab { flex: 1; border: none; border-radius: 16px; padding: 0.6rem; font-family: "Fredoka One", cursive; font-size: 0.88rem; cursor: pointer; background: transparent; color: #999; text-align: center; transition: all 0.2s; }
        .parent-tab.active { background: white; color: var(--purple); box-shadow: 0 3px 10px rgba(100,50,200,0.14); }
        .parent-content { padding: 0 1.2rem 2.5rem; max-width: 600px; margin: 0 auto; width: 100%; }
        .explain-card { background: var(--panel); border-radius: 24px; padding: 1.3rem; box-shadow: 0 8px 30px rgba(100,50,200,0.09); border: 2px solid rgba(255,255,255,0.72); }
        .explain-lbl { font-family: "Fredoka One", cursive; font-size: 0.9rem; color: var(--purp2); margin-bottom: 0.4rem; display: block; }
        .explain-inp { width: 100%; border: 2px solid rgba(0,0,0,0.08); border-radius: 14px; padding: 0.7rem 0.9rem; font-family: "Nunito", sans-serif; font-size: 0.92rem; font-weight: 700; outline: none; color: #333; background: white; margin-bottom: 1rem; }
        .explain-inp:focus { border-color: var(--purp2); }
        .age-sel { display: flex; gap: 0.5rem; margin-bottom: 1rem; flex-wrap: wrap; }
        .age-chip { border: 2px solid rgba(0,0,0,0.08); border-radius: 20px; padding: 0.35rem 0.9rem; font-family: "Nunito", sans-serif; font-size: 0.82rem; font-weight: 900; cursor: pointer; background: white; color: #666; }
        .age-chip.sel { background: linear-gradient(135deg,#9b6ff5,#6a35d6); color: white; border-color: transparent; }
        .explain-resp { background: linear-gradient(135deg,#f4eeff,#ede0ff); border-radius: 16px; padding: 1rem; margin-top: 1rem; border-left: 5px solid var(--purp2); font-size: 0.9rem; line-height: 1.72; color: #444; white-space: pre-wrap; }
        .dash-grid { display: grid; grid-template-columns: 1fr 1fr; gap: 0.8rem; margin-bottom: 1rem; }
        .dash-card { background: var(--panel); border-radius: 20px; padding: 1.1rem; text-align: center; box-shadow: 0 6px 20px rgba(0,0,0,0.08); border: 2px solid rgba(255,255,255,0.72); }
        .dash-num { font-family: "Fredoka One", cursive; font-size: 2.3rem; line-height: 1; margin-bottom: 0.2rem; }
        .dash-lbl { font-size: 0.73rem; color: #aaa; font-weight: 900; text-transform: uppercase; letter-spacing: 0.5px; }
        .prog-child { background: var(--panel); border-radius: 20px; padding: 1rem; box-shadow: 0 5px 18px rgba(0,0,0,0.07); border: 2px solid rgba(255,255,255,0.72); margin-bottom: 0.7rem; display: flex; align-items: center; gap: 0.9rem; }
        .child-av { width: 42px; height: 42px; border-radius: 50%; font-size: 1.3rem; display: flex; align-items: center; justify-content: center; flex-shrink: 0; border: 3px solid rgba(255,255,255,0.85); }
        .child-inf { flex: 1; }
        .child-nm { font-family: "Fredoka One", cursive; font-size: 0.96rem; color: #444; }
        .child-last { font-size: 0.75rem; color: #bbb; font-weight: 700; margin-top: 0.1rem; }
        .prog-wrap { background: rgba(0,0,0,0.07); border-radius: 10px; height: 8px; margin-top: 0.4rem; overflow: hidden; }
        .prog-fill { height: 100%; border-radius: 10px; }

        ::-webkit-scrollbar { width: 4px; }
        ::-webkit-scrollbar-track { background: rgba(255,255,255,0.3); }
        ::-webkit-scrollbar-thumb { background: rgba(0,0,0,0.14); border-radius: 4px; }
      `}</style>

      {/* ════════════════════════════════════
          WELCOME SCREEN
      ════════════════════════════════════ */}
      {screen === "welcome" && (
        <div className="screen-welcome">
          <div className="welcome-inner">
            <div className="logo-blob">
              <div className="logo-text">Jesus FOR ME!</div>
            </div>
            <span className="heart">✝️</span>
            <p className="wp">Who&apos;s reading today?</p>
            <div className="tier-cards">
              {[
                ["l", "🌱", "Little Ones", "Ages 4–6", "tc-l"],
                ["g", "🌿", "Growing Ones", "Ages 7–10", "tc-g"],
                ["b", "🌳", "Big Kids", "Ages 11–14", "tc-b"],
              ].map(([id, emoji, name, ages, cls]) => (
                <button
                  key={id}
                  className={`tc ${cls}`}
                  onClick={() => enterTier(id)}
                >
                  <span className="te">{emoji}</span>
                  <span className="tn">{name}</span>
                  <span className="ta">{ages}</span>
                </button>
              ))}
            </div>
            <button className="plink" onClick={() => setScreen("parent")}>
              🔑 Parent Space
            </button>
          </div>
        </div>
      )}

      {/* ════════════════════════════════════
          CHILD APP
      ════════════════════════════════════ */}
      {screen === "child" && (
        <div className={`child-screen ${TIERS[tier].bg}`}>
          <div className={`top-bar ${TIERS[tier].topbar}`}>
            <span className="tb-logo">Jesus FOR ME!</span>
            <span className="tb-tier">{TIERS[tier].label}</span>
            <button className="btn-home" onClick={() => setScreen("welcome")}>
              🏠 Home
            </button>
          </div>

          <div className="mc">
            {/* NAV TABS */}
            <div className="nav-tabs">
              {[
                ["stories", "📖 Stories"],
                ["chat", "💬 Ask"],
                ["verse", "⭐ Verse"],
                ["prayer", "🙏 Pray"],
              ].map(([id, label]) => (
                <button
                  key={id}
                  className={`nav-tab ${tab === id && !storyKey ? "active" : ""}`}
                  onClick={() => { setTab(id); setStoryKey(null); }}
                >
                  {label}
                </button>
              ))}
            </div>

            {/* ── STORIES ── */}
            {tab === "stories" && !storyKey && (
              <>
                <div className="stit">Bible Stories</div>
                <p className="ssub">{TIERS[tier].storiesSub}</p>
                <div className="story-grid">
                  {[
                    ["creation", "🌍", "The Very Beginning", "Genesis 1"],
                    ["noah", "🌈", "Noah's Ark", "Genesis 6–9"],
                    ["david", "🪨", "David & Goliath", "1 Samuel 17"],
                    ["birth", "⭐", "A Baby Changes Everything", "Luke 2"],
                    ["prodigal", "🏃", "The Running Father", "Luke 15"],
                    ["cross", "✝️", "The Rescue", "John 19–20"],
                  ].map(([key, emoji, title, ref]) => (
                    <div
                      key={key}
                      className="story-thumb"
                      onClick={() => setStoryKey(key)}
                    >
                      <span className="st-emoji">{emoji}</span>
                      <div className="st-title">{title}</div>
                      <div className="st-ref">{ref}</div>
                    </div>
                  ))}
                </div>
              </>
            )}

            {/* ── STORY READER ── */}
            {storyKey && (() => {
              const s = STORIES[storyKey];
              return (
                <div>
                  <button className="back-btn" onClick={() => setStoryKey(null)}>
                    ← Stories
                  </button>
                  <div className="card">
                    <div className="story-illo" style={{ background: s.bg }}>
                      {s.emoji}
                    </div>
                    <span className="gospel-tag">{s.tag}</span>
                    <div className="story-title">{s.title}</div>
                    <div className="story-vref">{s.verse}</div>
                    <div className="story-body">
                      {s.p.map((para, i) => (
                        <p key={i}>{para}</p>
                      ))}
                    </div>
                    <div className="gospel-box">
                      <div className="gospel-label">The Good News in This Story</div>
                      <div className="gospel-text">{s.gospel}</div>
                    </div>
                    <div className="story-nav">
                      <button
                        className="btn btn-s"
                        onClick={() => {
                          setStoryKey(null);
                          setTab("chat");
                          setTimeout(() => {
                            sendChat(`Tell me more about the story of ${s.title}`);
                          }, 100);
                        }}
                      >
                        💬 Ask about this
                      </button>
                      <button
                        className="btn btn-g"
                        onClick={() => { setStoryKey(null); setTab("prayer"); }}
                      >
                        🙏 Pray about this
                      </button>
                    </div>
                  </div>
                </div>
              );
            })()}

            {/* ── CHAT ── */}
            {tab === "chat" && !storyKey && (
              <>
                <div className="stit">Ask Anything!</div>
                <p className="ssub">{TIERS[tier].chatSub}</p>
                <div className="chat-box">
                  <div className="chat-head">
                    <div
                      className="chat-av"
                      style={{ background: TIERS[tier].avbg }}
                    >
                      {TIERS[tier].av}
                    </div>
                    <div>
                      <div className="chat-name">{TIERS[tier].name}</div>
                      <div className="chat-status">Always kind · Always here</div>
                    </div>
                  </div>
                  <div className="chat-msgs">
                    {messages.map((m, i) => (
                      <div
                        key={i}
                        className={`msg ${m.from === "bot" ? "msg-bot" : "msg-user"}`}
                      >
                        {m.from === "bot" && (
                          <div
                            className="msg-av"
                            style={{ background: TIERS[tier].avbg }}
                          >
                            {TIERS[tier].av}
                          </div>
                        )}
                        <div
                          className={`bubble ${
                            m.from === "bot" ? "bubble-bot" : "bubble-user"
                          }`}
                        >
                          {m.text}
                        </div>
                        {m.from === "user" && (
                          <div
                            className="msg-av"
                            style={{ background: "#e0f0ff" }}
                          >
                            🧒
                          </div>
                        )}
                      </div>
                    ))}
                    {chatLoading && (
                      <div className="msg msg-bot">
                        <div
                          className="msg-av"
                          style={{ background: TIERS[tier].avbg }}
                        >
                          {TIERS[tier].av}
                        </div>
                        <div className="bubble bubble-bot">
                          <div className="typing-dots">
                            <span /><span /><span />
                          </div>
                        </div>
                      </div>
                    )}
                    <div ref={msgsEndRef} />
                  </div>
                  {showSugg && (
                    <div className="chat-suggs">
                      {[
                        "Does God love me?",
                        "Why did Jesus die?",
                        "Is God real?",
                        "What is heaven?",
                      ].map((q) => (
                        <button
                          key={q}
                          className="chip"
                          onClick={() => sendChat(q)}
                        >
                          {q}
                        </button>
                      ))}
                    </div>
                  )}
                  <div className="chat-ir">
                    <input
                      className="chat-inp"
                      value={chatInput}
                      placeholder="Type your question..."
                      onChange={(e) => setChatInput(e.target.value)}
                      onKeyDown={(e) =>
                        e.key === "Enter" && sendChat(chatInput)
                      }
                    />
                    <button
                      className="btn-send"
                      onClick={() => sendChat(chatInput)}
                    >
                      ➤
                    </button>
                  </div>
                </div>
              </>
            )}

            {/* ── VERSE ── */}
            {tab === "verse" && !storyKey && (
              <>
                <div className="stit">Memory Verse</div>
                <p className="ssub">One verse at a time — a forever treasure!</p>
                <div className="verse-card">
                  <div className="streak-bar">
                    {[0, 1, 2, 3, 4].map((i) => (
                      <div
                        key={i}
                        className={`dot ${i < streak ? "dot-lit" : ""}`}
                      />
                    ))}
                  </div>
                  <div style={{ fontSize: "2rem", marginBottom: "0.4rem" }}>✨</div>
                  <div className="verse-txt">{v.t}</div>
                  <div className="verse-ref">{v.r}</div>
                  <div className="quiz-area">
                    <div className="quiz-q">
                      Fill in the blank: &quot;{v.q}&quot;
                    </div>
                    <div className="quiz-opts">
                      {v.o.map((opt) => {
                        let cls = "quiz-opt";
                        if (picked) {
                          if (opt === v.a) cls += " opt-correct";
                          else if (opt === picked) cls += " opt-wrong";
                        }
                        return (
                          <button
                            key={opt}
                            className={cls}
                            disabled={!!picked}
                            onClick={() => answerQuiz(opt)}
                          >
                            {opt}
                          </button>
                        );
                      })}
                    </div>
                    {picked && (
                      <div
                        className="quiz-fb"
                        style={{
                          color: picked === v.a ? "#1e8a1e" : "#c01030",
                        }}
                      >
                        {picked === v.a
                          ? "🎉 That's right!"
                          : "Not quite — check the highlighted answer!"}
                      </div>
                    )}
                  </div>
                </div>
                <button className="btn btn-s btn-w" onClick={nextVerse}>
                  Next Verse →
                </button>
              </>
            )}

            {/* ── PRAYER ── */}
            {tab === "prayer" && !storyKey && (
              <>
                <div className="stit">Prayer Time</div>
                <p className="ssub">{TIERS[tier].prayerSub}</p>
                <div className="prayer-card">
                  {prayerSent ? (
                    <div className="prayer-sent">
                      <span style={{ fontSize: "3rem", display: "block", marginBottom: "1rem" }}>🕊️</span>
                      <div className="prayer-heard">Your prayer is heard.</div>
                      <div className="prayer-verse">
                        &quot;The Lord is near to all who call on him.&quot; — Psalm 145:18
                      </div>
                      <div className="prayer-shown">{prayerText}</div>
                      <button
                        className="btn btn-r btn-w"
                        onClick={() => { setPrayerSent(false); setPrayerText(""); }}
                      >
                        Pray again 🙏
                      </button>
                    </div>
                  ) : (
                    <>
                      <span className="prayer-emoji">🙏</span>
                      <div className="prayer-prompt">
                        What do you want to say to God today?
                      </div>
                      <div className="prayer-starters">
                        {starters.map(([icon, val]) => (
                          <button
                            key={val}
                            className="prayer-starter"
                            onClick={() => setPrayerText(val)}
                          >
                            {icon} &quot;{val.trim()}...&quot;
                          </button>
                        ))}
                      </div>
                      <textarea
                        className="prayer-ta"
                        value={prayerText}
                        rows={4}
                        placeholder="Write your prayer here... just talk to God like a friend."
                        onChange={(e) => setPrayerText(e.target.value)}
                      />
                      <button
                        className="btn btn-r btn-w"
                        style={{ marginTop: "0.8rem" }}
                        onClick={() => prayerText.trim() && setPrayerSent(true)}
                      >
                        Send my prayer 🕊️
                      </button>
                    </>
                  )}
                </div>
              </>
            )}
          </div>
        </div>
      )}

      {/* ════════════════════════════════════
          PARENT SCREEN
      ════════════════════════════════════ */}
      {screen === "parent" && (
        <div className="parent-screen">
          <div className="top-bar tb-p">
            <span className="tb-logo">Jesus FOR ME!</span>
            <span className="tb-tier">🔑 Parent Space</span>
            <button className="btn-home" onClick={() => setScreen("welcome")}>
              🏠 Home
            </button>
          </div>
          <div className="parent-hero">
            <div className="parent-title">You&apos;ve got this, parent. 💜</div>
            <p className="parent-sub">
              We&apos;re here to help you have the conversations that matter most.
            </p>
          </div>
          <div className="parent-tabs">
            {[
              ["explain", "💡 Help Me Explain"],
              ["dashboard", "📊 Dashboard"],
            ].map(([id, label]) => (
              <button
                key={id}
                className={`parent-tab ${parentTab === id ? "active" : ""}`}
                onClick={() => setParentTab(id)}
              >
                {label}
              </button>
            ))}
          </div>
          <div className="parent-content">
            {/* EXPLAIN */}
            {parentTab === "explain" && (
              <div className="explain-card">
                <span className="explain-lbl">
                  What do you need help explaining?
                </span>
                <input
                  className="explain-inp"
                  value={explainTopic}
                  placeholder='"Why did Jesus have to die?" or "What happens when we die?"'
                  onChange={(e) => setExplainTopic(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && runExplainer()}
                />
                <span className="explain-lbl">For which age tier?</span>
                <div className="age-sel">
                  {[
                    ["l", "🌱 Little Ones (4–6)"],
                    ["g", "🌿 Growing Ones (7–10)"],
                    ["b", "🌳 Big Kids (11–14)"],
                  ].map(([a, label]) => (
                    <button
                      key={a}
                      className={`age-chip ${explainAge === a ? "sel" : ""}`}
                      onClick={() => setExplainAge(a)}
                    >
                      {label}
                    </button>
                  ))}
                </div>
                <button
                  className="btn btn-p btn-w"
                  onClick={runExplainer}
                  disabled={explainLoading}
                >
                  {explainLoading
                    ? "Prof. Lewis is thinking..."
                    : "Generate Conversation Guide ✨"}
                </button>
                {explainResult && (
                  <div className="explain-resp">{explainResult}</div>
                )}
              </div>
            )}

            {/* DASHBOARD */}
            {parentTab === "dashboard" && (
              <>
                <div className="dash-grid">
                  {[
                    ["7", "Stories Read", "#e8304a"],
                    ["12", "Verses Practiced", "#1a96e8"],
                    ["5", "Prayers Written", "#ffa800"],
                    ["3🔥", "Day Streak", "#2ea02e"],
                  ].map(([n, l, c]) => (
                    <div key={l} className="dash-card">
                      <div className="dash-num" style={{ color: c }}>{n}</div>
                      <div className="dash-lbl">{l}</div>
                    </div>
                  ))}
                </div>
                <div
                  style={{
                    fontFamily: "'Fredoka One', cursive",
                    fontSize: "1.1rem",
                    color: "#666",
                    marginBottom: "0.8rem",
                  }}
                >
                  Children
                </div>
                {[
                  ["🧒", "#ffe8d0", "Emma · Growing Ones", "David & Goliath · 2 days ago", "65%", "linear-gradient(90deg,#4dc8ff,#1a96e8)"],
                  ["👦", "#e0f4ff", "Theo · Little Ones", "Noah's Ark · Today", "40%", "linear-gradient(90deg,#ff9b6b,#e8304a)"],
                ].map(([av, avbg, name, last, pct, fill]) => (
                  <div key={name} className="prog-child">
                    <div className="child-av" style={{ background: avbg }}>{av}</div>
                    <div className="child-inf">
                      <div className="child-nm">{name}</div>
                      <div className="child-last">Last: {last}</div>
                      <div className="prog-wrap">
                        <div className="prog-fill" style={{ width: pct, background: fill }} />
                      </div>
                    </div>
                  </div>
                ))}
                <div className="card" style={{ textAlign: "center", marginTop: "0.8rem" }}>
                  <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: "0.9rem", color: "#e8304a", marginBottom: "0.4rem" }}>
                    Recently Memorized
                  </div>
                  <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: "1.15rem", color: "#333" }}>
                    &quot;God so loved the world...&quot;
                  </div>
                  <div style={{ fontFamily: "'Fredoka One',cursive", fontSize: "0.9rem", color: "#ffa800", marginTop: "0.3rem" }}>
                    John 3:16
                  </div>
                </div>
              </>
            )}
          </div>
        </div>
      )}
    </>
  );
}
