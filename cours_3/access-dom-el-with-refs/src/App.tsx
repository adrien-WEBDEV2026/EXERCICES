import { useRef } from 'react';
import './App.css';

function App() {
  const filePickerRef = useRef<HTMLInputElement>(null);

  function handleStartPickImage() {
        
    if (filePickerRef.current) {
      filePickerRef.current.click();
    } else {
      console.log("Erreur : La ref n'est pas attachée à l'élément.");
    }
  }

  return (
    <div id="app">
      <p>Please select an image</p>
      <p>
        <input 
          data-testid="file-picker" 
          type="file" 
          accept="image/*" 
          ref={filePickerRef} 
        />
        
        <button onClick={handleStartPickImage}>Pick Image</button>
      </p>
    </div>
  );
}

export default App;