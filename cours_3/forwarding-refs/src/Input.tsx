import { forwardRef } from 'react';
import type { ComponentPropsWithoutRef } from 'react';

interface InputProps extends ComponentPropsWithoutRef<'input'> {
  label: string;
}

// On utilise forwardRef pour capturer la 'ref' envoyée par le parent
const Input = forwardRef<HTMLInputElement, InputProps>(({ label, ...props }, ref) => {
  return (
    <p className="control">
      <label>{label}</label>
      {/* On branche la ref ici sur l'élément natif */}
      <input {...props} ref={ref} />
    </p>
  );
});

export default Input;