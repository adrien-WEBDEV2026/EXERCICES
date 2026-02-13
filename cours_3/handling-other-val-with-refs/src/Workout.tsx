import { useRef } from 'react';

// On aligne l'interface sur les données envoyées par App.tsx
interface WorkoutProps {
  title: string;
  description: string;
  time: number;       // App.tsx envoie 'time'
  onComplete: () => void; // Envoyé par App.tsx
}

export default function Workout({ title, description, time, onComplete }: WorkoutProps) {
  // 1. On crée la ref pour l'ID du minuteur
  const timer = useRef<ReturnType<typeof setTimeout> | null>(null);

  function handleStart() {
    // Sécurité : évite de lancer plusieurs minuteurs en même temps
    if (timer.current) return;

    console.log(`Démarrage de ${title} pour ${time}ms`);

    // 2. Lancement du minuteur
    timer.current = setTimeout(() => {
      handleStop(); // 3. Expiration : on exécute la même logique que Stop
    }, time);
  }

  function handleStop() {
    // Si un minuteur est en cours
    if (timer.current) {
      clearTimeout(timer.current);
      timer.current = null;
      
      // On informe le composant App que l'exercice est fini
      onComplete(); 
      console.log(`${title} terminé.`);
    }
  }

  return (
    <article>
      <h3>{title}</h3>
      <p>{description}</p>
      {/* Affichage du temps en secondes */}
      <p>Objectif : {time / 1000}s</p>
      <p>
        <button onClick={handleStart}>Start</button>
        <button onClick={handleStop}>Stop</button>
      </p>
    </article>
  );
}