# TP : React Avancé

### 1. Transfert de props

Réalisez cet exercice dans le dossier forwarded-props.

Votre tâche consiste à travailler sur le composant **Input** (dans le fichier input.tsx) afin qu’il retourne soit un élément `<textarea>`, soit un élément `<input>`, selon que la prop **richText** du composant **Input** est vraie ou fausse.

Par exemple, s’il est utilisé de cette manière :
```jsx
<Input richText />
```
le composant **Input** doit afficher un `<textarea>`. Dans le cas contraire, il doit afficher un `<input>`.

De plus, le composant **Input** doit **transmettre toutes les autres props** directement à l’élément `<textarea>` ou `<input>` rendu.

Cela signifie qu’il doit pouvoir être utilisé comme suit :
```jsx
<Input type="text" placeholder="Votre nom" />
```
(comme on peut le voir dans le fichier **App.js** existant).

L'ui final devra ressembler à ça : 

![transfert-de-props](./forwarded-props-exercice.png)

---

### 2. Création de composants flexibles

Réalisez cet exercice dans le dossier flexible-components.

Votre tâche consiste à concevoir un composant **Button** très réutilisable et personnalisable, pouvant être utilisé de toutes les manières suivantes (voir également le code dans le fichier **App.js**) :

#### **2.1. Mode "Filled" (par défaut)**
```jsx
<Button>Default</Button>
```
ou
```jsx
<Button mode="filled">Filled</Button>
```
Ces syntaxes doivent produire un bouton avec un style "rempli" (comme illustré dans les exemples visuels) : 

![default_filled_buttons](./default_filled.png)


#### **2.2. Mode "Outline"**
```jsx
<Button mode="outline">Outline</Button>
```
Cela doit générer un bouton avec un contour visible (style "outline") : 

![outline_buttons](./outline_button.png)

#### **2.3. Mode "Text-only"**
```jsx
<Button mode="text">Text</Button>
```
Cela doit afficher un bouton sous forme de texte simple, sans fond ni bordure prononcée : 

![text_buttons](./text_button.png)  

#### **2.4. Avec icône**
```jsx
<Button Icon={HomeIcon}>Home</Button>
```
ou
```jsx
<Button Icon={PlusIcon} mode="text">
  Add
</Button>
```
Ces syntaxes doivent produire des boutons intégrant une icône à gauche du texte : 

![home_add_buttons](./home_add_buttons.png)

#### **2.5. Le boutton doit supportter n'importe quelles props**

```jsx
<p>
   <Button mode="filled" disabled>
   Disabled
   </Button>
</p>
<p>
   <Button onClick={() => console.log('Clicked!')}>Click me</Button>
</p>
```

Le composant Button doit être également capable par défaut de prendre en compte les autres arguments passés au composant, comme avec l'exemple ci-dessus.

Les boutons résultants du code jsx ci-dessus devront avoir cet aspect : 

![disabled_button](./disabled_button.png)


**Astuce** :
- Pour que l’icône soit correctement affichée, enveloppez-la dans une balise `<span>` avec la classe **"button-icon"**.
- Enveloppez également la prop **children** (le texte du bouton) dans une balise `<span>`.

### Instructions techniques
1. **Classes CSS** :
   - Tous les boutons doivent avoir la classe de base **button**.
   - Selon le **mode** (`filled`, `outline`, `text`), ajoutez les classes CSS supplémentaires définies dans le fichier **index.css**.

2. **Props standard** :
   - Votre composant **Button** doit accepter **toutes les props standard** d’un élément `<button>` natif (comme `onClick`, `disabled`, etc.).
   - Ces props doivent être **transmises directement** à l’élément `<button>` utilisé en interne.

3. **Comportement par défaut** :
   - Si aucune prop **mode** n’est spécifiée, le mode **"filled"** doit être appliqué par défaut.

### Objectif
Votre mission est de modifier le composant **Button** fourni dans le fichier **Button.js** pour qu’il prenne en charge tous ces modes et fonctionnalités, **sans créer de nouveaux composants**. Assurez-vous que le composant reste simple, flexible et réutilisable.

---

### 3.**Liaison bidirectionnelle (Two-Way Binding)**

Réalisez cet exercice dans le dossier two-way-binding.

Votre tâche consiste à **collecter les valeurs saisies** dans les deux contrôles d’entrée (un `<textarea>` et un `<input>`) en utilisant la **liaison bidirectionnelle** (two-way binding).

Ensuite, vous devrez **transmettre ces valeurs** via les props appropriées au composant **Review**, qui existe déjà dans le projet.

### **Fonctionnement final attendu**
L’application doit permettre aux utilisateurs de :
1. Saisir des valeurs dans les champs d’entrée.
2. Voir ces valeurs **affichées en temps réel** dans le composant **Review**, situé sous les champs d’entrée.

**Exemple visuel** : Le rendu final doit ressembler à l’illustration fournie (avec les valeurs saisies reflétées dans le composant **Review**).

![two-way-binding-ex](./two-way-binding-ex.png)

**Remarque** : Le bouton **"Save"** est présent à titre décoratif – **aucun développement n'est nécessaire** de votre part pour ce bouton.

---
