import React, { useState, useMemo } from 'react';
import './App.css';

// --- CONSTANTES ---
const OBJECTIVES_DATA = [
  { id: 'sedentaire', label: 'Sédentaire', minFactor: 0.8, maxFactor: 1.0 },
  { id: 'endurance', label: 'Endurance', minFactor: 1.2, maxFactor: 1.6 },
  { id: 'maintien', label: 'Maintien Masse', minFactor: 1.6, maxFactor: 1.8 },
  { id: 'masse', label: 'Prise de Masse', minFactor: 1.8, maxFactor: 2.2 },
];

const ProteinCalculator = () => {
  // --- ÉTAT (STATE) ---
  const [minWeight, setMinWeight] = useState(50);
  const [maxWeight, setMaxWeight] = useState(100);
  const [rowCount, setRowCount] = useState(10); // Par défaut 10 lignes
  const [selectedObjectives, setSelectedObjectives] = useState(['maintien', 'masse']);
  const [error, setError] = useState('');

  // --- LOGIQUE & HANDLERS ---
  const handleObjectiveChange = (id) => {
    setSelectedObjectives((prev) => {
      if (prev.includes(id)) {
        return prev.length > 1 ? prev.filter((item) => item !== id) : prev;
      } else {
        return [...prev, id];
      }
    });
  };

  // Validation améliorée (Bonus)
  const validateInput = (value, type) => {
    const val = parseInt(value, 10);
    if (isNaN(val)) return 0;
    
    // Limite stricte pour éviter le crash du navigateur
    if (type === 'rows' && val > 500) return 500;
    
    return val;
  };

  // --- CALCUL DYNAMIQUE ---
  const tableData = useMemo(() => {
    if (minWeight >= maxWeight) {
      setError("Le poids minimum doit être inférieur au poids maximum.");
      return [];
    }
    if (rowCount < 2) {
      setError("Il faut au moins 2 lignes.");
      return [];
    }
    setError('');

    const step = (maxWeight - minWeight) / (rowCount - 1);
    const rows = [];

    for (let i = 0; i < rowCount; i++) {
      const currentWeight = Math.round(minWeight + (i * step));
      const rowData = {
        weight: currentWeight,
        needs: {}
      };

      selectedObjectives.forEach((objId) => {
        const objective = OBJECTIVES_DATA.find(o => o.id === objId);
        if (objective) {
          const minProtein = Math.round(currentWeight * objective.minFactor);
          const maxProtein = Math.round(currentWeight * objective.maxFactor);
          // On stocke les valeurs brutes pour l'export, et formatées pour l'affichage
          rowData.needs[objId] = {
            text: `${minProtein} – ${maxProtein} g`,
            min: minProtein,
            max: maxProtein
          };
        }
      });
      rows.push(rowData);
    }
    return rows;
  }, [minWeight, maxWeight, rowCount, selectedObjectives]);

  // --- FONCTION EXPORT CSV (Bonus) ---
  const downloadCSV = () => {
    if (tableData.length === 0) return;

    // 1. Création de l'en-tête
    const headers = ['Poids (kg)'];
    selectedObjectives.forEach(objId => {
      const obj = OBJECTIVES_DATA.find(o => o.id === objId);
      headers.push(obj.label);
    });

    // 2. Création des lignes de données
    const csvRows = tableData.map(row => {
      const rowValues = [row.weight];
      selectedObjectives.forEach(objId => {
        rowValues.push(row.needs[objId].text);
      });
      return rowValues.join(';'); // Utilisation du point-virgule pour Excel fr
    });

    // 3. Assemblage du contenu CSV avec BOM pour les accents (UTF-8)
    const csvContent = '\uFEFF' + [headers.join(';'), ...csvRows].join('\n');

    // 4. Création du lien de téléchargement
    const blob = new Blob([csvContent], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const link = document.createElement('a');
    link.href = url;
    link.setAttribute('download', `besoins_proteines_${minWeight}-${maxWeight}kg.csv`);
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  // --- RENDU (JSX) ---
  return (
    <div className="container">
      <header className="header">
        <h1>🥩 Calculateur de Protéines</h1>
      </header>

      <div className="controls-panel">
        
        {/* Objectifs */}
        <div className="control-group">
          <h3>1. Objectifs</h3>
          <div className="checkbox-group">
            {OBJECTIVES_DATA.map((obj) => (
              <label key={obj.id} className={`checkbox-label ${selectedObjectives.includes(obj.id) ? 'active' : ''}`}>
                <input
                  type="checkbox"
                  checked={selectedObjectives.includes(obj.id)}
                  onChange={() => handleObjectiveChange(obj.id)}
                />
                {obj.label}
              </label>
            ))}
          </div>
        </div>

        {/* Paramètres avec Validation Visuelle */}
        <div className="control-group">
          <h3>2. Configuration</h3>
          <div className="inputs-row">
            <div className="input-wrapper">
              <label>Poids Min (kg)</label>
              <input 
                type="number" 
                className={minWeight >= maxWeight ? 'input-error' : ''}
                value={minWeight} 
                onChange={(e) => setMinWeight(validateInput(e.target.value, 'weight'))} 
              />
            </div>
            <div className="input-wrapper">
              <label>Poids Max (kg)</label>
              <input 
                type="number" 
                value={maxWeight} 
                onChange={(e) => setMaxWeight(validateInput(e.target.value, 'weight'))} 
              />
            </div>
            <div className="input-wrapper">
              <label>Lignes (Max 500)</label>
              <input 
                type="number" 
                value={rowCount} 
                onChange={(e) => setRowCount(validateInput(e.target.value, 'rows'))} 
              />
            </div>
          </div>
        </div>
      </div>

      {error && <div className="error-message">⚠️ {error}</div>}

      {/* Actions (Export) */}
      {!error && tableData.length > 0 && (
        <>
          <div className="actions-bar">
            <button className="btn-export" onClick={downloadCSV}>
              📥 Télécharger en CSV
            </button>
          </div>

          <div className="table-container">
            <table className="protein-table">
              <thead>
                <tr>
                  <th>Poids</th>
                  {selectedObjectives.map(objId => {
                    const obj = OBJECTIVES_DATA.find(o => o.id === objId);
                    return <th key={objId}>{obj.label}</th>;
                  })}
                </tr>
              </thead>
              <tbody>
                {tableData.map((row, index) => (
                  <tr key={index}>
                    <td className="weight-cell"><strong>{row.weight} kg</strong></td>
                    {selectedObjectives.map(objId => (
                      <td key={objId}>{row.needs[objId].text}</td>
                    ))}
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </>
      )}
    </div>
  );
};

export default ProteinCalculator;