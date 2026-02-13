import { useRef } from 'react';
import Form from './Form';
import type { FormHandle } from './Form';

export function App() {
  // 1. On crée une ref typée avec notre interface FormHandle
  const formRef = useRef<FormHandle>(null);

  function handleRestart() {
    // 2. On appelle la méthode clear() exposée par le composant Form
    formRef.current?.clear();
  }

  return (
    <div id="app">
      {/* 3. On lie la ref au composant personnalisé */}
      <button onClick={handleRestart}>Restart</button>
      <Form ref={formRef} />
    </div>
  );
}