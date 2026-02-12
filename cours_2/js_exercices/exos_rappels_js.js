import fs from 'fs';
import Car from './Car.js';

// ============================================================================
// 1. LECTURE ET MANIPULATION DE FICHIERS JSON
// ============================================================================
console.log("=== 1. Lecture et manipulation de fichiers JSON ===");

// Lecture du fichier (format brut / Buffer)
const rawData = fs.readFileSync('voitures.json');
// Transformation en objet JavaScript (Parsing)
const parsedData = JSON.parse(rawData);
// Transformation en chaîne de caractères formatée (Stringification)
const stringifiedData = JSON.stringify(parsedData, null, 2);

console.log("Données parsées (objet) :", parsedData[0].modele.nom);
console.log("Données stringifiées :\n", stringifiedData);

// ============================================================================
// 2. CRÉATION ET IMPORT DE CLASSE
// ============================================================================
console.log("\n=== 2. Création et import de classe ===");

const myCar = new Car(1, "Testarossa", "Enzo", "Ferrari", 90, 290);
myCar.printEssentialCarInfos();
Car.sayHello();

// ============================================================================
// 3. TRANSFORMATION DE DONNÉES
// ============================================================================
console.log("\n=== 3. Transformation de données ===");

// On mappe le JSON vers des instances de la classe Car
const cars = parsedData.map(v => new Car(
    v.id, 
    v.modele.nom, 
    v.proprietaire.prenom, 
    v.proprietaire.nom || "Inconnu", 
    v.proprietaire.age || 0, 
    v.modele.vitesse_de_pointe_kmH
));

console.log(`${cars.length} instances de Car créées.`);

// ============================================================================
// 4. UTILISATION DES MÉTHODES DE TABLEAUX
// ============================================================================
console.log("\n=== 4. Utilisation des méthodes de tableaux ===");

// 4.1. ForEach pour afficher
cars.forEach(car => car.printEssentialCarInfos());

// 4.2. Find pour la Clio
const clio = cars.find(car => car.model.name === "Clio");
console.log("Voiture Clio trouvée :", clio?.model.name);

// 4.3. Reduce pour la somme des âges
const totalAge = cars.reduce((sum, car) => sum + car.owner.age, 0);
console.log("Somme des âges :", totalAge);

// 4.4. Moyenne de vitesse
const avgSpeed = cars.reduce((sum, car) => sum + car.model.topSpeed, 0) / cars.length;
console.log("Vitesse de pointe moyenne :", avgSpeed.toFixed(2), "km/H");

// ============================================================================
// 5. DESTRUCTURATION
// ============================================================================
console.log("\n=== 5. Destructuration ===");

// 5.1. Destructuration de tableau
const [clioCar, alpineCar, ferrariCar] = cars;

// 5.2. Destructuration d'objet imbriqué
const { owner: { firstName: p, lastName: n, age: a } } = alpineCar;
console.log(`Conducteur Alpine : ${p} ${n}, ${a} ans`);

// 5.3. Fonction avec destructuration de paramètre (owner)
function showOwner({ firstName, lastName, age }) {
    console.log(`Propriétaire : ${firstName} ${lastName || ""} (${age || 0} ans)`);
}
showOwner(ferrariCar.owner);

// 5.4. Destructuration complète d'une voiture
function showCarDetails({ id, model: { name, topSpeed }, owner: { firstName } }) {
    console.log(`Voiture ${id}: ${name} (${topSpeed}km/h), conduite par ${firstName}`);
}
showCarDetails(ferrariCar);

// ============================================================================
// 6. SPREAD OPERATOR
// ============================================================================
console.log("\n=== 6. Spread Operator ===");

// 6.1. Copie par référence (Mauvaise pratique ici)
let voitures = cars;
voitures[0].id = 999; 
console.log("ID 'cars' après modif 'voitures' :", cars[0].id); // Les deux ont changé !

// 6.2. Copie superficielle (Shallow copy)
let automobiles = [...cars];
automobiles[0] = { ...cars[0], id: 101 }; // On recrée l'objet
console.log("ID 'cars' :", cars[0].id, "| ID 'automobiles' :", automobiles[0].id);

// ============================================================================
// 7. HIGHER ORDER FUNCTIONS
// ============================================================================
console.log("\n=== 7. Higher Order Functions ===");

const anonymousFunc = function(msg) { console.log("Anon:", msg); };
const arrowFunc = (msg) => console.log("Arrow:", msg);

// 7.1 & 7.2. Formateur universel
const formatStringsInObject = (obj, formatter) => {
    const newObj = { ...obj };
    Object.entries(newObj).forEach(([key, value]) => {
        if (typeof value === 'string') newObj[key] = formatter(value);
    });
    return newObj;
};

const toUpper = s => s.toUpperCase();
const toLower = s => s.toLowerCase();

// 7.3 & 7.4 Application
const formattedOwner = formatStringsInObject(alpineCar.owner, toUpper);
console.log("Owner formaté :", formattedOwner);

// ============================================================================
// 8. GESTION DES ERREURS
// ============================================================================
console.log("\n=== EXERCICE 8 : GESTION DES ERREURS ===");

// 8.1. Try-Catch
function parseCarData(jsonString) {
    try {
        return JSON.parse(jsonString);
    } catch (e) {
        console.error("Erreur de parsing :", e.message);
        return null;
    }
}

// 8.2. Erreurs personnalisées
class CarValidationError extends Error {
    constructor(message) {
        super(message);
        this.name = "CarValidationError";
    }
}

function validateCar(car) {
    if (!car.id || !car.modele || !car.proprietaire) {
        throw new CarValidationError("Propriété manquante (id, modele ou proprietaire)");
    }
}

// 8.3. Finally
function loadCarsFromFile(filename) {
    try {
        const data = fs.readFileSync(filename, 'utf-8');
        return JSON.parse(data);
    } catch (e) {
        console.error(`Erreur lecture ${filename} :`, e.message);
    } finally {
        console.log("Opération de lecture terminée.");
    }
}

// 8.4. Propagation
class MissingDataError extends Error {}

function calculateAverageSpeed(carsList) {
    if (!Array.isArray(carsList)) throw new TypeError("Un tableau est requis");
    if (carsList.length === 0) return 0;

    return carsList.reduce((acc, car) => {
        if (car.model.topSpeed === undefined || car.model.topSpeed === null) {
            throw new MissingDataError("Vitesse manquante pour une voiture");
        }
        return acc + car.model.topSpeed;
    }, 0) / carsList.length;
}

function safeCalculateAverageSpeed(carsList) {
    try {
        const res = calculateAverageSpeed(carsList);
        return { success: true, result: res };
    } catch (e) {
        return { success: false, error: e.message };
    }
}

// 8.6. Batch Processing (Bonus)
function processCarBatch(carDataArray) {
    const result = { successful: [], failed: [] };
    
    carDataArray.forEach((data, index) => {
        try {
            if (typeof data !== 'object') throw new Error("Format invalide");
            if (!data.id || !data.modele) throw new Error("Données incomplètes");
            
            const newCar = new Car(
                data.id, 
                data.modele.nom || "Inconnu",
                data.proprietaire?.prenom || "N/A",
                data.proprietaire?.nom || "N/A",
                data.proprietaire?.age || 0,
                data.modele.vitesse_de_pointe_kmH || 0
            );
            result.successful.push(newCar);
        } catch (e) {
            result.failed.push({ index, data, error: e.message });
        }
    });
    return result;
}