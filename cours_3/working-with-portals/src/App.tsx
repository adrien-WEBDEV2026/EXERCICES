import { useState } from 'react';
import Toast from './Toast';

export function App() {
  // État pour savoir si on affiche le toast ou non
  const [isEnrolled, setIsEnrolled] = useState(false);

  function handleEnrol() {
    // 1. Afficher le toast
    setIsEnrolled(true);

    // 2. Supprimer le toast après 3 secondes (3000ms)
    setTimeout(() => {
      setIsEnrolled(false);
    }, 3000);
  }

  return (
    <div id="app">
      <article>
        <h2>React Pro Course</h2>
        <p>Master React hooks and portals to build professional apps.</p>
        {/* Bouton pour déclencher l'inscription */}
        <button onClick={handleEnrol}>Enrol</button>
      </article>

      {/* Rendu conditionnel : le Toast ne s'affiche que si isEnrolled est vrai */}
      {isEnrolled && <Toast message="You have successfully enrolled!" />}
    </div>
  );
}