import type { ComponentProps, ElementType } from 'react';

type ButtonProps = ComponentProps<'button'> & {
  mode?: 'filled' | 'outline' | 'text';
  Icon?: ElementType;
};

export default function Button({ mode = 'filled', Icon, children, ...props }: ButtonProps) {
  // 1. On commence avec la classe de base "button"
  // 2. On ajoute le mode avec le suffixe "-button" pour correspondre au CSS (ex: "filled-button")
  let cssClasses = `button ${mode}-button`;

  // 3. Si une icône est présente, on ajoute la classe "icon-button" 
  // (C'est elle qui gère le display: inline-flex et l'alignement dans ton CSS)
  if (Icon) {
    cssClasses += ' icon-button';
  }

  // 4. On préserve les classes passées via props (ex: className="custom-class")
  if (props.className) {
    cssClasses += ` ${props.className}`;
  }

  return (
    <button className={cssClasses} {...props}>
      {Icon && (
        <span className="button-icon">
          <Icon />
        </span>
      )}
      <span>{children}</span>
    </button>
  );
}