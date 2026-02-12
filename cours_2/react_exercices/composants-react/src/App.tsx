import { useState, type FC } from 'react'; // 7.2 : Import du hook useState
import './App.css';
import Header from './components/Header';
import CoreConcept from './components/CoreConcept';
import TabButton from './components/TabButton';
import { CORE_CONCEPTS, EXAMPLES } from './data'; // On n'oublie pas d'importer EXAMPLES

const App: FC = () => {
  // 7.2 : Initialisation du State. 
  // On précise que selectedTab peut être une string ou undefined (au début).
  const [selectedTab, setSelectedTab] = useState<string>('components');

  // 6.1 & 7.1 : La fonction qui sera passée au bouton
  function handleSelect(selectedButton: string) {
    setSelectedTab(selectedButton);
    console.log("Bouton cliqué : " + selectedButton);
  }

  // 7.4 : Récupération des données dans l'objet EXAMPLES
  // Utilisation de "as keyof typeof EXAMPLES" pour satisfaire TypeScript
  const tabData = EXAMPLES[selectedTab as keyof typeof EXAMPLES];

  return (
    <div>
      <Header />
      <main>
        <section id="core-concepts">
          <h2>Concepts importants</h2>
          <ul>
            {CORE_CONCEPTS.map((concept) => (
              <CoreConcept key={concept.title} {...concept} />
            ))}
          </ul>
        </section>

        {/* 5.1 & 7.2 : Section des exemples */}
        <section id="examples">
          <h2>Exemples</h2>
          <menu>
            {/* 7.1 : On passe la fonction handleSelect via la prop onSelect */}
            <TabButton 
              isSelected={selectedTab === 'components'} 
              onSelect={() => handleSelect('components')}
            >
              Components
            </TabButton>
            <TabButton 
              isSelected={selectedTab === 'jsx'} 
              onSelect={() => handleSelect('jsx')}
            >
              JSX
            </TabButton>
            <TabButton 
              isSelected={selectedTab === 'props'} 
              onSelect={() => handleSelect('props')}
            >
              Props
            </TabButton>
            <TabButton 
              isSelected={selectedTab === 'state'} 
              onSelect={() => handleSelect('state')}
            >
              State
            </TabButton>
          </menu>

          {/* 7.3 & 7.4 : Affichage dynamique du contenu */}
          <div id="tab-content">
            <h3>{tabData.title}</h3>
            <p>{tabData.description}</p>
            <pre>
              <code>{tabData.code}</code>
            </pre>
          </div>
        </section>
      </main>
    </div>
  );
};

export default App;