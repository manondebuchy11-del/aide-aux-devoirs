"use client";

import { useMemo, useState } from "react";

const subjects = [
  { icon: "＋", name: "Mathématiques", detail: "Calcul, fractions et géométrie", color: "blue" },
  { icon: "A", name: "Français", detail: "Grammaire, conjugaison et lecture", color: "red" },
  { icon: "⌛", name: "Histoire-Géo", detail: "Dates, cartes et civilisations", color: "amber" },
  { icon: "⚗", name: "Sciences", detail: "SVT, physique et expériences", color: "green" },
  { icon: "EN", name: "Anglais", detail: "Vocabulaire et expressions", color: "purple" },
  { icon: "✎", name: "Méthodologie", detail: "S'organiser et mieux apprendre", color: "cyan" }
];

export default function Home() {
  const [level, setLevel] = useState("6e");
  const [query, setQuery] = useState("");
  const [answer, setAnswer] = useState("");
  const [result, setResult] = useState("");

  const filtered = useMemo(() => subjects.filter((s) =>
    `${s.name} ${s.detail}`.toLowerCase().includes(query.toLowerCase())
  ), [query]);

  function checkAnswer(e) {
    e.preventDefault();
    if (!answer.trim()) return setResult("Entre d’abord une réponse.");
    setResult(Number(answer.replace(",", ".")) === 15 ? "Bravo ! 3 × 5 = 15 🎉" : "Presque ! Compte 3 groupes de 5.");
  }

  return (
    <main>
      <header className="topbar">
        <a className="brand" href="#top" aria-label="Accueil Réussite Plus"><span>R+</span> Réussite+</a>
        <nav aria-label="Navigation principale">
          <a href="#matieres">Matières</a><a href="#exercice">Exercice</a><a href="#methode">Méthode</a>
        </nav>
        <a className="smallButton" href="#exercice">Je commence</a>
      </header>

      <section className="hero" id="top">
        <div className="heroCopy">
          <span className="eyebrow">DU CP À LA 3E · 100 % GRATUIT</span>
          <h1>Un coup de pouce pour <em>comprendre</em>, pas seulement répondre.</h1>
          <p>Des cours courts, des exemples concrets et des exercices corrigés pour avancer à ton rythme.</p>
          <div className="finder">
            <label htmlFor="search">Que veux-tu réviser ?</label>
            <div><input id="search" value={query} onChange={(e) => setQuery(e.target.value)} placeholder="Ex. fractions, passé composé…" /><a href="#matieres">Chercher</a></div>
          </div>
          <div className="levels" aria-label="Choisir une classe">
            {['CP','CE1','CE2','CM1','CM2','6e','5e','4e','3e'].map((item) => <button key={item} onClick={() => setLevel(item)} className={level === item ? "active" : ""}>{item}</button>)}
          </div>
        </div>
        <div className="heroCard" aria-label="Aperçu de progression">
          <div className="mascot">✓</div>
          <p className="mini">PROGRAMME DU JOUR · {level}</p>
          <h2>Prêt pour une petite victoire ?</h2>
          <ul><li><b>1.</b><span>Relis la leçon<small>5 minutes</small></span></li><li><b>2.</b><span>Fais un exercice<small>Sans regarder la correction</small></span></li><li><b>3.</b><span>Vérifie et comprends<small>Corrige tes erreurs</small></span></li></ul>
          <div className="progress"><span /></div><small>2 étapes sur 3 aujourd’hui</small>
        </div>
      </section>

      <section className="section" id="matieres">
        <div className="sectionHead"><div><span className="eyebrow">CHOISIS TA MATIÈRE</span><h2>Tout pour progresser</h2></div><p>Classe sélectionnée : <strong>{level}</strong></p></div>
        <div className="subjectGrid">
          {filtered.map((s) => <article className={`subject ${s.color}`} key={s.name}><div className="subjectIcon">{s.icon}</div><div><h3>{s.name}</h3><p>{s.detail}</p></div><span aria-hidden="true">→</span></article>)}
        </div>
        {filtered.length === 0 && <p className="empty">Aucune matière trouvée. Essaie un autre mot.</p>}
      </section>

      <section className="exerciseWrap" id="exercice">
        <div className="exerciseIntro"><span className="eyebrow light">EXERCICE EXPRESS</span><h2>Teste-toi en 2 minutes</h2><p>Une petite question permet de vérifier que la leçon est bien comprise.</p></div>
        <form className="exercise" onSubmit={checkAnswer}><span>Mathématiques · niveau {level}</span><h3>Quel est le résultat de 3 × 5 ?</h3><label htmlFor="answer">Ta réponse</label><div><input id="answer" inputMode="decimal" value={answer} onChange={(e) => setAnswer(e.target.value)} placeholder="Écris le résultat" /><button>Vérifier</button></div><p className="result" aria-live="polite">{result}</p></form>
      </section>

      <section className="method section" id="methode"><span className="eyebrow">LA BONNE MÉTHODE</span><h2>Apprendre devient plus simple</h2><div><article><b>01</b><h3>Je comprends</h3><p>Je lis l’explication et je regarde l’exemple.</p></article><article><b>02</b><h3>Je m’entraîne</h3><p>Je fais l’exercice seul, même si je doute.</p></article><article><b>03</b><h3>Je progresse</h3><p>Je corrige mes erreurs et je recommence.</p></article></div></section>

      <footer><a className="brand" href="#top"><span>R+</span> Réussite+</a><p>L’aide aux devoirs simple, claire et gratuite.</p><small>© 2026 Réussite+</small></footer>
    </main>
  );
}
