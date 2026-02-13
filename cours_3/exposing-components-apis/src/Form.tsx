import { useRef, useImperativeHandle, forwardRef } from 'react';

// On définit l'interface pour TypeScript afin que le parent sache ce qui est exposé
export interface FormHandle {
  clear: () => void;
}

// On utilise forwardRef pour recevoir la ref du parent
const Form = forwardRef<FormHandle>((_props, ref) => {
  // Une ref interne pour accéder à l'élément HTML <form>
  const formInternalRef = useRef<HTMLFormElement>(null);

  // useImperativeHandle définit ce que "form.current" sera dans le composant App
  useImperativeHandle(ref, () => ({
    clear() {
      console.log('Réinitialisation du formulaire...');
      formInternalRef.current?.reset(); // Appel de la méthode native JS reset()
    },
  }));

  return (
    <form ref={formInternalRef}>
      <p>
        <label>Name</label>
        <input type="text" />
      </p>

      <p>
        <label>Email</label>
        <input type="email" />
      </p>
      <p id="actions">
        <button type="submit">Save</button>
      </p>
    </form>
  );
});

export default Form;