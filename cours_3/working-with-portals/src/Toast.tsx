import { createPortal } from 'react-dom';

interface ToastProps {
  message: string;
}

export default function Toast({ message }: ToastProps) {
  // createPortal prend deux arguments : 
  // 1. Le JSX à rendre.
  // 2. L'élément du DOM réel où l'injecter (ici le body).
  return createPortal(
    <aside className="toast" data-testid="toast">
      <p>{message}</p>
    </aside>,
    document.querySelector('body')! // On force l'injection à la racine du body
  );
}