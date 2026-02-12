import componentLogo from './assets/package_google.png';
import propsLogo from './assets/gear_google.png';
import jsxLogo from './assets/jsx.png';
import stateLogo from './assets/database.png';

export const CORE_CONCEPTS = [
  {
    image: componentLogo,
    title: 'Components',
    description:
      'Le concept de base de toutes les applications web modernes, on créé les interfaces en combinant les composants.',
  },
  {
    image: jsxLogo,
    title: 'JSX',
    description:
      "Un mélange de HTML et de Javascript permettant une meilleur flexibilité dans l'affichage.",
  },
  {
    image: propsLogo,
    title: 'Props',
    description:
      "Permet aux composant d'être configurable et réutilisable en leurs injectant des données.",
  },
  {
    image: stateLogo,
    title: 'State',
    description:
      "Données du composants qui une fois changés déclenche un nouveau rendu du composant et une maj de l'ui.",
  },
];
export const EXAMPLES = {
  components: {
    title: 'Components',
    description:
      'Les composants sont les blocs de construction des applications React. Un composant est essentiellement une fonction JavaScript qui retourne du JSX.',
    code: `
function Welcome() {
  return <h1>Hello, World!</h1>;
}`,
  },
  jsx: {
    title: 'JSX',
    description:
      'JSX est une extension de syntaxe pour JavaScript. Il ressemble à du HTML mais permet de générer dynamiquement du contenu avec JavaScript.',
    code: `
<div>
  <h1>Hello {userName}</h1>
  <p>Bienvenue sur React !</p>
</div>`,
  },
  props: {
    title: 'Props',
    description:
      'Les props (propriétés) permettent de passer des données des composants parents aux composants enfants, rendant vos composants configurables.',
    code: `
function Welcome(props) {
  return <h1>Hello, {props.name}</h1>;
}`,
  },
  state: {
    title: 'State',
    description:
      'Le State est un objet qui contient des données spécifiques à un composant qui peuvent changer au fil du temps. Quand le state change, le composant se re-déclenche.',
    code: `
const [isVisible, setIsVisible] = useState(false);

function handleClick() {
  setIsVisible(true);
}`,
  },
};