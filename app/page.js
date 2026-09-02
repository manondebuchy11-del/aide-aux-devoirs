"use client";

import { useEffect, useMemo, useState } from "react";

const levels = ["CP", "CE1", "CE2", "CM1", "CM2", "6e", "5e", "4e", "3e"];
const subjects = [
  { id: "maths", icon: "＋", name: "Mathématiques", color: "blue", intro: "Multiplier, c’est additionner plusieurs fois le même nombre.", example: "3 × 5 signifie 5 + 5 + 5. Le résultat est 15.", tip: "Dessine les groupes si le calcul te paraît difficile.", questions: [{ q: "Combien font 4 × 6 ?", a: "24", help: "Additionne 6 quatre fois." }, { q: "Combien font 7 × 3 ?", a: "21", help: "3 + 3 + 3 + 3 + 3 + 3 + 3." }] },
  { id: "francais", icon: "A", name: "Français", color: "red", intro: "Le sujet indique qui fait l’action. Le verbe indique l’action.", example: "Dans « Lina prépare son cartable », Lina est le sujet et prépare est le verbe.", tip: "Pour trouver le verbe, demande-toi : que fait le sujet ?", questions: [{ q: "Quel est le verbe : « Paul mange une pomme » ?", a: "mange", help: "Cherche l’action de Paul." }, { q: "Quel est le sujet : « Les élèves travaillent » ?", a: "les élèves", help: "Qui travaille ?" }] },
  { id: "histoire", icon: "⌛", name: "Histoire-Géo", color: "amber", intro: "Une frise chronologique place les événements du plus ancien au plus récent.", example: "L’Antiquité vient avant le Moyen Âge, qui vient avant l’époque moderne.", tip: "Lis toujours une frise de gauche à droite.", questions: [{ q: "Quelle période vient après l’Antiquité ?", a: "moyen âge", help: "C’est la période des châteaux forts." }, { q: "Dans quel pays se trouve Paris ?", a: "france", help: "C’est la capitale du pays." }] },
  { id: "sciences", icon: "⚗", name: "Sciences", color: "green", intro: "L’eau existe sous trois états : solide, liquide et gazeux.", example: "La glace est solide, l’eau du robinet est liquide et la vapeur est gazeuse.", tip: "Un changement de température peut faire changer l’état de l’eau.", questions: [{ q: "Quel est l’état de la glace ?", a: "solide", help: "Elle garde sa forme." }, { q: "Comment appelle-t-on l’eau sous forme de gaz ?", a: "vapeur", help: "On la voit au-dessus d’une casserole chaude." }] },
  { id: "anglais", icon: "EN", name: "Anglais", color: "purple", intro: "Le verbe « to be » permet de dire qui l’on est ou comment on se sent.", example: "I am = je suis. You are = tu es. He or she is = il ou elle est.", tip: "Répète les phrases à voix haute pour mieux les mémoriser.", questions: [{ q: "Complète : I ___ happy.", a: "am", help: "Avec I, utilise la forme am." }, { q: "Que signifie « hello » en français ?", a: "bonjour", help: "C’est une formule pour saluer." }] },
  { id: "methode", icon: "✎", name: "Méthodologie", color: "cyan", intro: "Une séance courte et régulière est plus efficace qu’une longue séance au dernier moment.", example: "Lis 10 minutes, ferme le cours, puis explique avec tes propres mots.", tip: "Travaille 25 minutes, puis fais une pause de 5 minutes.", questions: [{ q: "Après 25 minutes de travail, combien de minutes de pause ?", a: "5", help: "La pause est courte pour garder le rythme." }, { q: "Vaut-il mieux réviser régulièrement ? (oui/non)", a: "oui", help: "Un peu chaque jour aide la mémoire." }] }
];

const clean = (value) => value.trim().toLowerCase().normalize("NFD").replace(/[\u0300-\u036f]/g, "").replace(/[.!?]/g, "");

export default function Home() {
  const [level, setLevel] = useState("6e");
  const [query, setQuery] = useState("");
  const [selected, setSelected] = useState(subjects[0]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [answer, setAnswer] = useState("");
  const [feedback, setFeedback] = useState(null);
  const [profileOpen, setProfileOpen] = useState(false);
  const [nameInput, setNameInput] = useState("");
  const [profile, setProfile] = useState(null);
  const [completed, setCompleted] = useState([]);
  const [homeworkText, setHomeworkText] = useState("");
  const [homeworkImage, setHomeworkImage] = useState("");
  const [homeworkPreview, setHomeworkPreview] = useState("");
  const [solution, setSolution] = useState("");
  const [solving, setSolving] = useState(false);
  const [solveError, setSolveError] = useState("");

  useEffect(() => {
    try {
      const savedProfile = JSON.parse(localStorage.getItem("reussite-profile"));
      const savedProgress = JSON.parse(localStorage.getItem("reussite-progress")) || [];
      if (savedProfile?.name) { setProfile(savedProfile); setLevel(savedProfile.level || "6e"); setNameInput(savedProfile.name); }
      setCompleted(savedProgress);
    } catch {}
  }, []);

  const filtered = useMemo(() => subjects.filter((s) => `${s.name} ${s.intro}`.toLowerCase().includes(query.toLowerCase())), [query]);
  const question = selected.questions[questionIndex];
  const progress = Math.round((completed.length / 12) * 100);

  function chooseSubject(subject) {
    setSelected(subject); setQuestionIndex(0); setAnswer(""); setFeedback(null);
    setTimeout(() => document.getElementById("cours")?.scrollIntoView({ behavior: "smooth" }), 0);
  }

  function checkAnswer(e) {
    e.preventDefault();
    if (!answer.trim()) return setFeedback({ ok: false, text: "Écris d’abord ta réponse." });
    const ok = clean(answer) === clean(question.a);
    setFeedback({ ok, text: ok ? "Bravo, bonne réponse !" : `Pas encore. ${question.help}` });
    if (ok) {
      const key = `${selected.id}-${questionIndex}`;
      if (!completed.includes(key)) {
        const next = [...completed, key]; setCompleted(next); localStorage.setItem("reussite-progress", JSON.stringify(next));
      }
    }
  }

  function nextQuestion() { setQuestionIndex((questionIndex + 1) % selected.questions.length); setAnswer(""); setFeedback(null); }
  function saveProfile(e) {
    e.preventDefault(); if (!nameInput.trim()) return;
    const next = { name: nameInput.trim(), level }; setProfile(next); localStorage.setItem("reussite-profile", JSON.stringify(next)); setProfileOpen(false);
  }

  function prepareImage(file) {
    if (!file) return;
    if (!file.type.startsWith("image/")) return setSolveError("Choisis une photo de l’exercice.");
    const reader = new FileReader();
    reader.onload = () => {
      const img = new Image();
      img.onload = () => {
        const max = 1600;
        const scale = Math.min(1, max / Math.max(img.width, img.height));
        const canvas = document.createElement("canvas");
        canvas.width = Math.round(img.width * scale); canvas.height = Math.round(img.height * scale);
        canvas.getContext("2d").drawImage(img, 0, 0, canvas.width, canvas.height);
        const compressed = canvas.toDataURL("image/jpeg", .78);
        setHomeworkImage(compressed); setHomeworkPreview(compressed); setSolveError(""); setSolution("");
      };
      img.onerror = () => setSolveError("Cette photo ne peut pas être lue.");
      img.src = reader.result;
    };
    reader.readAsDataURL(file);
  }

  async function solveHomework(e) {
    e.preventDefault();
    if (!homeworkText.trim() && !homeworkImage) return setSolveError("Ajoute une photo ou écris l’énoncé.");
    setSolving(true); setSolveError(""); setSolution("");
    try {
      const response = await fetch("/api/aide", { method: "POST", headers: { "Content-Type": "application/json" }, body: JSON.stringify({ text: homeworkText, image: homeworkImage, level }) });
      const data = await response.json();
      if (!response.ok) throw new Error(data.error || "La correction n’est pas disponible.");
      setSolution(data.answer);
    } catch (error) { setSolveError(error.message); }
    finally { setSolving(false); }
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#accueil"><span>R+</span> Réussite+</a>
        <nav><a href="#aide">Mon exercice</a><a href="#matieres">Matières</a><a href="#progres">Progression</a></nav>
        <button className="profileButton" onClick={() => setProfileOpen(true)}>{profile ? `Bonjour ${profile.name}` : "Créer mon profil"}</button>
      </header>

      <section className="dashboard" id="accueil">
        <div className="welcome"><span className="eyebrow">APPRENDRE À SON RYTHME</span><h1>{profile ? `Bonjour ${profile.name} !` : "Prêt à progresser ?"}</h1><p>Choisis ta classe et une matière. Lis le cours, puis réponds aux questions.</p><div className="levels" aria-label="Choisir une classe">{levels.map((item) => <button key={item} onClick={() => setLevel(item)} className={level === item ? "active" : ""}>{item}</button>)}</div></div>
        <div className="progressCard" id="progres"><div><span>Ta progression</span><strong>{progress}%</strong></div><div className="progress"><span style={{ width: `${progress}%` }} /></div><p>{completed.length} exercice{completed.length > 1 ? "s" : ""} réussi{completed.length > 1 ? "s" : ""} sur 12</p></div>
      </section>

      <section className="helper section" id="aide">
        <div className="helperIntro"><span className="eyebrow">AIDE PERSONNALISÉE</span><h2>Fais-toi expliquer ton exercice</h2><p>Prends une photo bien droite ou recopie l’énoncé. Réussite+ t’explique la méthode étape par étape.</p><ul><li>Photographie toute la consigne</li><li>Choisis ta classe en haut</li><li>Lis les étapes avant la réponse</li></ul></div>
        <form className="homeworkForm" onSubmit={solveHomework}>
          <label className="photoPicker"><input type="file" accept="image/*" capture="environment" onChange={(e) => prepareImage(e.target.files?.[0])} /><span>{homeworkPreview ? "Changer la photo" : "📷 Prendre une photo"}</span></label>
          {homeworkPreview && <img className="homeworkPreview" src={homeworkPreview} alt="Exercice photographié" />}
          <label htmlFor="homework">Ou écris l’énoncé</label>
          <textarea id="homework" rows="5" value={homeworkText} onChange={(e) => setHomeworkText(e.target.value)} placeholder="Ex. Calcule 3/4 + 1/2 et explique les étapes…" />
          <button className="solveButton" disabled={solving}>{solving ? "Analyse en cours…" : "M’aider à comprendre"}</button>
          {solveError && <p className="solveError" aria-live="polite">{solveError}</p>}
        </form>
        {solution && <article className="solution" aria-live="polite"><span className="eyebrow">EXPLICATION</span><div>{solution}</div><button onClick={() => { setSolution(""); setHomeworkText(""); setHomeworkImage(""); setHomeworkPreview(""); }}>Faire un autre exercice</button></article>}
      </section>

      <section className="section" id="matieres">
        <div className="sectionHead"><div><span className="eyebrow">PROGRAMME DE {level.toUpperCase()}</span><h2>Choisis une matière</h2></div><label className="search"><span>Rechercher</span><input value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ex. anglais, calcul…" /></label></div>
        <div className="subjectGrid">{filtered.map((s) => <button className={`subject ${s.color} ${selected.id === s.id ? "selected" : ""}`} key={s.id} onClick={() => chooseSubject(s)}><span className="subjectIcon">{s.icon}</span><span><strong>{s.name}</strong><small>1 cours · 2 exercices</small></span><b>→</b></button>)}</div>
        {!filtered.length && <p className="empty">Aucune matière trouvée. Essaie un autre mot.</p>}
      </section>

      <section className="lessonArea" id="cours">
        <div className="lesson"><span className={`lessonBadge ${selected.color}`}>{selected.icon} {selected.name} · {level}</span><h2>La leçon du jour</h2><p className="lead">{selected.intro}</p><div className="example"><b>Exemple</b><p>{selected.example}</p></div><div className="tip"><b>Astuce</b><p>{selected.tip}</p></div></div>
        <form className="quiz" onSubmit={checkAnswer}><div className="quizTop"><span>Question {questionIndex + 1} sur {selected.questions.length}</span><span>{selected.name}</span></div><h3>{question.q}</h3><label htmlFor="answer">Ta réponse</label><input id="answer" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Écris ta réponse ici" autoComplete="off" /><button className="checkButton">Vérifier ma réponse</button>{feedback && <div className={`feedback ${feedback.ok ? "correct" : "wrong"}`} aria-live="polite"><b>{feedback.text}</b>{feedback.ok && <button type="button" onClick={nextQuestion}>Question suivante →</button>}</div>}</form>
      </section>

      <section className="steps section"><span className="eyebrow">LA BONNE MÉTHODE</span><h2>Trois étapes pour réussir</h2><div><article><b>01</b><h3>Je lis</h3><p>Je prends le temps de comprendre la leçon.</p></article><article><b>02</b><h3>Je réponds</h3><p>Je tente une réponse sans regarder l’aide.</p></article><article><b>03</b><h3>Je corrige</h3><p>Je comprends mon erreur et je recommence.</p></article></div></section>
      <footer><a className="brand" href="#accueil"><span>R+</span> Réussite+</a><p>Cours et exercices gratuits du CP à la 3e.</p></footer>

      {profileOpen && <div className="modalBackdrop" onMouseDown={(e) => e.target === e.currentTarget && setProfileOpen(false)}><div className="modal" role="dialog" aria-modal="true" aria-labelledby="profile-title"><button className="close" onClick={() => setProfileOpen(false)} aria-label="Fermer">×</button><span className="eyebrow">MON ESPACE</span><h2 id="profile-title">Créer mon profil</h2><p>Ton prénom et ta progression resteront enregistrés sur cet appareil.</p><form onSubmit={saveProfile}><label htmlFor="name">Prénom</label><input id="name" value={nameInput} onChange={(e) => setNameInput(e.target.value)} placeholder="Ex. Lucas" /><label htmlFor="class">Classe</label><select id="class" value={level} onChange={(e) => setLevel(e.target.value)}>{levels.map((item) => <option key={item}>{item}</option>)}</select><button>Enregistrer mon profil</button></form></div></div>}
    </main>
  );
}
