'use client';

import { useEffect, useState } from 'react';

const subjects = [
  'Mathématiques',
  'Français',
  'Anglais',
  'Histoire-Géo',
  'Sciences',
  'Physique-Chimie'
];

const icons = ['🔢', '🇫🇷', '🇬🇧', '🌍', '🧪', '⚛️'];

const quizData: any = {
  'Mathématiques': [
    {
      question: 'Combien font 7 × 8 ?',
      answers: ['48', '54', '56', '64'],
      correct: 2,
      explanation: '7 × 8 = 56.'
    },
    {
      question: 'Quelle est la moitié de 150 ?',
      answers: ['50', '65', '75', '80'],
      correct: 2,
      explanation: '150 ÷ 2 = 75.'
    },
    {
      question: 'Combien font 3 × 9 + 2 ?',
      answers: ['27', '29', '31', '33'],
      correct: 1,
      explanation: '3 × 9 = 27, puis 27 + 2 = 29.'
    },
    {
      question: 'Quel nombre complète : 100 - ? = 35 ?',
      answers: ['55', '60', '65', '75'],
      correct: 2,
      explanation: '100 - 65 = 35.'
    },
    {
      question: 'Combien vaut 1/2 de 40 ?',
      answers: ['10', '20', '30', '40'],
      correct: 1,
      explanation: 'La moitié de 40 est 20.'
    }
  ],

  'Français': [
    {
      question: 'Quel mot est un verbe ?',
      answers: ['Maison', 'Courir', 'Rouge', 'Demain'],
      correct: 1,
      explanation: 'Courir est un verbe : il exprime une action.'
    },
    {
      question: 'Quel est le pluriel de "cheval" ?',
      answers: ['Chevals', 'Chevaus', 'Chevaux', 'Chevales'],
      correct: 2,
      explanation: 'Le pluriel de cheval est chevaux.'
    },
    {
      question: 'Dans "Paul mange une pomme", quel est le sujet ?',
      answers: ['Paul', 'mange', 'une', 'pomme'],
      correct: 0,
      explanation: 'Paul est celui qui réalise l’action.'
    },
    {
      question: 'Quel mot est correctement orthographié ?',
      answers: ['Toujour', 'Toujours', 'Toujoure', 'Toujourse'],
      correct: 1,
      explanation: 'Le mot s’écrit toujours avec un s à la fin.'
    },
    {
      question: 'Quel est le contraire de "rapide" ?',
      answers: ['Grand', 'Petit', 'Lent', 'Fort'],
      correct: 2,
      explanation: 'Le contraire de rapide est lent.'
    }
  ],

  'Anglais': [
    {
      question: 'Que signifie "Hello" ?',
      answers: ['Merci', 'Bonjour', 'Au revoir', 'Maison'],
      correct: 1,
      explanation: '"Hello" signifie bonjour.'
    },
    {
      question: 'Comment dit-on "chat" en anglais ?',
      answers: ['Dog', 'Cat', 'Bird', 'Fish'],
      correct: 1,
      explanation: '"Cat" signifie chat.'
    },
    {
      question: 'Que signifie "blue" ?',
      answers: ['Rouge', 'Vert', 'Bleu', 'Jaune'],
      correct: 2,
      explanation: '"Blue" signifie bleu.'
    },
    {
      question: 'Comment dit-on "merci" en anglais ?',
      answers: ['Please', 'Sorry', 'Goodbye', 'Thank you'],
      correct: 3,
      explanation: '"Thank you" signifie merci.'
    },
    {
      question: 'Que signifie "school" ?',
      answers: ['École', 'Maison', 'Voiture', 'Livre'],
      correct: 0,
      explanation: '"School" signifie école.'
    }
  ],

  'Histoire-Géo': [
    {
      question: 'Quelle est la capitale de la France ?',
      answers: ['Lyon', 'Paris', 'Marseille', 'Bordeaux'],
      correct: 1,
      explanation: 'Paris est la capitale de la France.'
    },
    {
      question: 'Dans quel pays se trouve Rome ?',
      answers: ['Espagne', 'Italie', 'Portugal', 'Grèce'],
      correct: 1,
      explanation: 'Rome est la capitale de l’Italie.'
    },
    {
      question: 'Quel océan se trouve à l’ouest de la France ?',
      answers: [
        'Océan Atlantique',
        'Océan Indien',
        'Océan Arctique',
        'Océan Pacifique'
      ],
      correct: 0,
      explanation: 'La façade ouest de la France donne sur l’océan Atlantique.'
    },
    {
      question: 'Quelle est la capitale du Royaume-Uni ?',
      answers: ['Dublin', 'Manchester', 'Londres', 'Liverpool'],
      correct: 2,
      explanation: 'Londres est la capitale du Royaume-Uni.'
    },
    {
      question: 'Sur quel continent se trouve l’Égypte ?',
      answers: ['Europe', 'Afrique', 'Asie', 'Amérique'],
      correct: 1,
      explanation: 'L’Égypte se trouve principalement en Afrique.'
    }
  ],

  'Sciences': [
    {
      question: 'Quel organe permet principalement de respirer ?',
      answers: ['Le cœur', 'Les poumons', 'Le foie', 'L’estomac'],
      correct: 1,
      explanation: 'Les poumons permettent les échanges respiratoires.'
    },
    {
      question: 'De quoi une plante a-t-elle notamment besoin pour pousser ?',
      answers: [
        'De lumière et d’eau',
        'De plastique',
        'De métal',
        'De peinture'
      ],
      correct: 0,
      explanation: 'Une plante utilise notamment de l’eau et de la lumière.'
    },
    {
      question: 'Quel animal est un mammifère ?',
      answers: ['Dauphin', 'Truite', 'Lézard', 'Poule'],
      correct: 0,
      explanation: 'Le dauphin est un mammifère.'
    },
    {
      question: 'À température ambiante, l’eau liquide est dans quel état ?',
      answers: ['Solide', 'Liquide', 'Gazeux', 'Plasma'],
      correct: 1,
      explanation: 'À température ambiante, l’eau est généralement liquide.'
    },
    {
      question: 'Quel astre éclaire naturellement la Terre pendant la journée ?',
      answers: ['La Lune', 'Mars', 'Le Soleil', 'Vénus'],
      correct: 2,
      explanation: 'La lumière du jour provient du Soleil.'
    }
  ],

  'Physique-Chimie': [
    {
      question: 'Quelle est l’unité de la masse dans le système international ?',
      answers: ['Mètre', 'Seconde', 'Kilogramme', 'Litre'],
      correct: 2,
      explanation: 'L’unité SI de la masse est le kilogramme.'
    },
    {
      question: 'Quel instrument mesure la température ?',
      answers: ['Balance', 'Thermomètre', 'Chronomètre', 'Règle'],
      correct: 1,
      explanation: 'Le thermomètre sert à mesurer la température.'
    },
    {
      question: 'L’eau pure gèle approximativement à quelle température ?',
      answers: ['0 °C', '10 °C', '50 °C', '100 °C'],
      correct: 0,
      explanation: 'À pression atmosphérique normale, l’eau pure gèle vers 0 °C.'
    },
    {
      question: 'Quelle particule porte une charge électrique négative ?',
      answers: ['Proton', 'Neutron', 'Électron', 'Noyau'],
      correct: 2,
      explanation: 'L’électron possède une charge électrique négative.'
    },
    {
      question: 'Quelle unité utilise-t-on pour mesurer une durée ?',
      answers: ['Mètre', 'Kilogramme', 'Seconde', 'Volt'],
      correct: 2,
      explanation: 'La seconde est l’unité SI de durée.'
    }
  ]
};

function getLevel(points: number) {
  if (points >= 500) return '🏆 Expert';
  if (points >= 250) return '🥇 Champion';
  if (points >= 100) return '🚀 Explorateur';
  return '⭐ Débutant';
}

export default function Home() {
  const [q, setQ] = useState('');
  const [a, setA] = useState('');
  const [s, setS] = useState(subjects[0]);
  const [loading, setLoading] = useState(false);

  const [quizSubject, setQuizSubject] = useState(subjects[0]);
  const [questionIndex, setQuestionIndex] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [quizScore, setQuizScore] = useState(0);
  const [points, setPoints] = useState(0);
  const [finished, setFinished] = useState(false);

  useEffect(() => {
    const saved = localStorage.getItem('devoirio-points');
    if (saved) setPoints(Number(saved));
  }, []);

  function savePoints(value: number) {
    setPoints(value);
    localStorage.setItem('devoirio-points', String(value));
  }

  async function ask() {
    if (!q.trim()) return;

    setLoading(true);

    try {
      const r = await fetch('/api/tutor', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          question: q,
          subject: s
        })
      });

      const d = await r.json();
      setA(d.answer || d.error || 'Erreur.');
    } catch {
      setA('Erreur de connexion.');
    } finally {
      setLoading(false);
    }
  }

  const questions = quizData[quizSubject];
  const current = questions[questionIndex];

  function answerQuiz(index: number) {
    if (selected !== null) return;

    setSelected(index);

    if (index === current.correct) {
      setQuizScore(quizScore + 1);
      savePoints(points + 10);
    }
  }

  function nextQuestion() {
    if (questionIndex < questions.length - 1) {
      setQuestionIndex(questionIndex + 1);
      setSelected(null);
    } else {
      const finalScore =
        quizScore + (selected === current.correct ? 1 : 0);

      if (finalScore === questions.length) {
        savePoints(points + 20);
      }

      setFinished(true);
    }
  }

  function restartQuiz(subject = quizSubject) {
    setQuizSubject(subject);
    setQuestionIndex(0);
    setSelected(null);
    setQuizScore(0);
    setFinished(false);

    setTimeout(() => {
      document
        .getElementById('quiz')
        ?.scrollIntoView({ behavior: 'smooth' });
    }, 50);
  }

  return (
    <>
      <header>
        <div className="brand">
          🎓 <b>Devoirio</b>
        </div>

        <nav>
          <a href="#aide">Aide</a>
          <a href="#matieres">Matières</a>
          <a href="#quiz">Quiz</a>
          <a href="#tarifs">Tarifs</a>
        </nav>
      </header>

      <main>
        <section className="hero">
          <div>
            <span className="tag">✨ Assistant scolaire</span>

            <h1>
              Bloqué sur un exercice ?
              <em> On t'aide à comprendre.</em>
            </h1>

            <p>
              Écris ton exercice et découvre une explication claire,
              étape par étape.
            </p>

            <a className="btn" href="#aide">
              📚 Essayer gratuitement
            </a>
          </div>

          <div className="demo">
            <b>🤖 Assistant Devoirio</b>

            <div className="msg user">
              Comment résoudre 3x + 7 = 22 ?
            </div>

            <div className="msg">
              💡 On enlève 7 des deux côtés, puis on divise par 3.
              Donc x = 5.
            </div>
          </div>
        </section>

        <section id="aide" className="section">
          <div className="center">
            <small>AIDE AUX DEVOIRS</small>
            <h2>Pose ta question</h2>
          </div>

          <div className="tutor">
            <div className="panel">
              <label>Matière</label>

              <select
                value={s}
                onChange={e => setS(e.target.value)}
              >
                {subjects.map(x => (
                  <option key={x}>{x}</option>
                ))}
              </select>

              <label>Ton exercice</label>

              <textarea
                value={q}
                onChange={e => setQ(e.target.value)}
                placeholder="Ex. Résous 2x + 6 = 18 et explique-moi la méthode."
              />

              <button
                className="btn full"
                onClick={ask}
              >
                {loading
                  ? 'Réflexion…'
                  : '🤖 M’aider à comprendre'}
              </button>
            </div>

            <div className="panel result">
              <b>💡 Explication</b>

              {a ? (
                <p className="answer">{a}</p>
              ) : (
                <p className="hint">
                  Ton explication apparaîtra ici.
                </p>
              )}
            </div>
          </div>
        </section>

        <section
          id="matieres"
          className="section gray"
        >
          <div className="center">
            <small>MATIÈRES</small>
            <h2>Révise à ton rythme</h2>
          </div>

          <div className="grid">
            {subjects.map((x, i) => (
              <article key={x}>
                <span>{icons[i]}</span>
                <h3>{x}</h3>
                <p>Exercices, méthodes et quiz.</p>

                <button
                  className="outline"
                  onClick={() => restartQuiz(x)}
                >
                  🎯 Faire le quiz
                </button>
              </article>
            ))}
          </div>
        </section>

        <section
          id="quiz"
          className="section"
        >
          <div className="center">
            <small>QUIZ DEVOIRIO</small>
            <h2>🎯 Joue, apprends et gagne des points !</h2>

            <p>
              ⭐ {points} points — {getLevel(points)}
            </p>
          </div>

          <div
            className="panel"
            style={{
              maxWidth: 700,
              margin: '30px auto'
            }}
          >
            <label>Choisis ta matière</label>

            <select
              value={quizSubject}
              onChange={e => restartQuiz(e.target.value)}
            >
              {subjects.map(x => (
                <option key={x}>{x}</option>
              ))}
            </select>

            {!finished ? (
              <>
                <p
                  style={{
                    marginTop: 25,
                    fontWeight: 700
                  }}
                >
                  Question {questionIndex + 1} / {questions.length}
                </p>

                <h3>{current.question}</h3>

                <div
                  style={{
                    display: 'grid',
                    gap: 10,
                    marginTop: 20
                  }}
                >
                  {current.answers.map(
                    (answer: string, index: number) => {
                      let background = '';

                      if (selected !== null) {
                        if (index === current.correct) {
                          background = '#d9f7df';
                        } else if (index === selected) {
                          background = '#ffdede';
                        }
                      }

                      return (
                        <button
                          key={answer}
                          className="outline"
                          disabled={selected !== null}
                          onClick={() => answerQuiz(index)}
                          style={{
                            padding: 14,
                            background
                          }}
                        >
                          {answer}
                        </button>
                      );
                    }
                  )}
                </div>

                {selected !== null && (
                  <div
                    style={{
                      marginTop: 20,
                      padding: 16,
                      borderRadius: 12,
                      background: '#f5f5f5'
                    }}
                  >
                    <b>
                      {selected === current.correct
                        ? '✅ Bravo ! +10 points'
                        : '💡 Pas encore.'}
                    </b>

                    <p>{current.explanation}</p>

                    <button
                      className="btn"
                      onClick={nextQuestion}
                    >
                      {questionIndex === questions.length - 1
                        ? 'Voir mon résultat 🏆'
                        : 'Question suivante →'}
                    </button>
                  </div>
                )}
              </>
            ) : (
              <div
                style={{
                  textAlign: 'center',
                  padding: 30
                }}
              >
                <div style={{ fontSize: 60 }}>
                  {quizScore === questions.length
                    ? '🏆'
                    : quizScore >= 3
                    ? '🎉'
                    : '💪'}
                </div>

                <h2>Quiz terminé !</h2>

                <p>
                  Tu as obtenu
                  <b>
                    {' '}
                    {quizScore} / {questions.length}
                  </b>
                </p>

                {quizScore === questions.length && (
                  <p>
                    🌟 Sans-faute : bonus de 20 points !
                  </p>
                )}

                <p>
                  Ton total : <b>{points} points</b>
                </p>

                <p>{getLevel(points)}</p>

                <button
                  className="btn"
                  onClick={() => restartQuiz()}
                >
                  🔄 Rejouer
                </button>
              </div>
            )}
          </div>
        </section>

        <section
          id="tarifs"
          className="section gray"
        >
          <div className="center">
            <small>TARIFS</small>
            <h2>Commence gratuitement</h2>
          </div>

          <div className="prices">
            <article>
              <h3>Gratuit</h3>
              <strong>0 €</strong>
              <p>5 aides par semaine</p>

              <button className="outline">
                Commencer
              </button>
            </article>

            <article className="popular">
              <h3>Plus</h3>

              <strong>
                5,99 €
                <small>/mois</small>
              </strong>

              <p>
                Aide IA étendue, quiz et progression.
              </p>

              <button className="btn">
                Choisir Plus
              </button>
            </article>
          </div>
        </section>
      </main>

      <footer>
        🎓 Devoirio — Apprends, progresse et gagne des récompenses !
      </footer>
    </>
  );
} un
