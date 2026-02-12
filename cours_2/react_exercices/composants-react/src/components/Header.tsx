import reactImg from '../assets/react.svg';

const techDescriptions = ['React', 'TypeScript', 'Vite', 'CSS'];

function getRandomString(arr: string[]): string {
  return arr[Math.floor(Math.random() * arr.length)];
}

export default function Header() {
  const description = getRandomString(techDescriptions);

  return (
    <header>
      <img src={reactImg} alt="React logo" />
      <h1>Mon Application React</h1>
      <h2>Technologie utilisée : {description}</h2>
    </header>
  );
}