# Compl-ment-web
Voici les Tp/TD de complément web



Points clés du dossier
Cours JS et projet HotHotHot détaillent l'apprentissage de JavaScript, y compris les bases, les templates HTML et les PWA pour une application domotique.

# Javascript  2
## Compléments à la séance 1

### Fonctions et  Expressions régulières

Le langage JavaScript propose différentes manières pour mettre en œuvre les expressions régulières.

Une expression régulière correspond à une notation compacte et puissante qui décrit de manière concise un ensemble de chaînes de caractères. Elle peut être appliquée à une chaîne de caractères afin de déterminer si elle correspond à des critères particuliers.

Une expression régulière obéit à une syntaxe particulière.

**La classe RegExp**

Javascript met à disposition une classe `RegExp` correspondante aux expressions régulières qui offres des méthodes de test et d’exécution de l’expression sur une chaine.

Comme souvent en Javascript une instance de l’objet `RegExp` peut être obtenu à partir d’un new ou par une forme littérale.

var O_pattern =new RegExp(modele,modificateurs);

ou plus simplement

var O_pattern =/modele/modificateurs;

Modele = pattern.
Modificateurs = modifiers.

	/* Création d’une expression régulière depuis la forme littérale. On utilise le séparateur /.  
	Recherche la chaine “test “ de manière non case sensitive.*/

	var O_pattern = /test/i ;

	// Création de la même expression depuis la classe. 
	var O_pattern = new Regexp(“test“, “i“);

#### Méthodes

**test**

Description : Teste si une chaine de caractères répond au pattern.

Paramètres :

- String: La chaine à tester.

Retour :

- Bool : true si le test est ok, sinon false.

 ```js  
var S_maChaine = "J’aime Les Fruits"; 
var O_pattern = /fruit/i ;

if(O_pattern.test(S_maChaine)){  
	console.log("ma chaine contient bien le mot : fruit") ;
}
```

**exec**

Description : Cherche dans une chaine le pattern et retourne l’extrait trouvé.

Paramètres :
- String : La chaine à tester.

Retour :
- String : La chaine trouvée. Sinon Null.

```js
var S_maChaine = "J'aime Les Fruits";  
var O_pattern = /fruit/i;  
var S_match = O_pattern.exec(S_maChaine);
//S_match = "Fruit" ;

S_match = O_pattern.exec("J’aime les légumes");
//S_match = Null ;
```

#### Modificateurs

Modificateurs

Les modificateurs correspondent à des configurations de l’expression.

- i : recherche non sensible à la casse.

- g : recherche globale. Recherche l’ensemble des extraits au lieu de s’arrêter au premier.

- m : Exécute la recherche sur plusieurs lignes.

#### Syntaxe du modèle

Le modèle d’une expression régulière, également nommé pattern, est une chaine de caractère décrivant une syntaxe construite à partir d’une grammaire particulière.

#### Les jeux de caractères
Vous pouvez définir une recherche pour un jeu de caractères à l’aide d’une syntaxe propre à l’aide des crochets et parenthèses.

| Expression | Description |
|--|--|
| `[abc]` | Cherche tout caractère qui apparait entre les crochets |
| `[^abc]` | Cherche tout caractère qui n’apparaît pas entre les crochets |
| `[0-9]` | Cherche tout chiffre de 0 à 9 |
| `[A-Z]` | Cherche tout caractère de majuscule A à majuscule Z  |
| `[a-z]` | Cherche tout caractère de minuscule a à minuscule z |
| `[A-z]` |Cherche tout caractère de majuscule A à minuscule z |
| `(rouge|bleu|vert)` | Cherche toutes les alternatives spécifiées. Recherche donc les mots « rouge » ou « bleu » ou « vert »
|

Il existe également des méta-caractères qui ont chacun une signification particulière. En voici une rapide liste non complète.
| Expression | Description |
|--|--|
| `.` | Cherche un caractère sauf retour à la ligne et fin de ligne |
| `\w` | Cherche tout caractère de mots|
| `\W` | Cherche tout caractère qui n’est pas un caractère de mot|
| `\d` | Cherche tout caractère décimal|
| `\D` | Cherche tout caractère non décimal|
| `\s` | Cherche tout caractère d’espacement|
| `\S` | Cherche tout caractère autre que d’espacement|

#### Quantifieurs
Quand vous écrivez un pattern d’expression régulière il est souvent utile de pouvoir poser des règles et conditions sur la recherche des jeux de caractères.
| Expression | Description |
|--|--|
|n`+`|Correspond à toute chaine contenant au moins une occurrence de n|
|n`*`|Correspond à toute chaine contenant zéro ou plus occurrences de n|
| n`?`|Correspond à toute chaine contenant zéro ou une occurrence de n|
|n`{X}`|Correspond à toute chaine contenant X occurrences de n|
|n`{X,Y}`|Correspond à toute chaine contenant de X à Y occurrences de n|
|n`{X,}`|Correspond à toute chaine contenant au moins X occurrences de n|
|n`$`|Correspond à toute chaine terminant par une occurrence de n|
|`^`n|Correspond à toute chaine commençant par une occurrence de n|
|`?=`n| Correspond à toute chaine suivie d’une occurrence de n|
|`?!`n|Correspond à toute chaine non suivie d’une occurrence de n|

> Aller plus loin : [https://lumadis.be/regex/tuto_pcre.php](https://lumadis.be/regex/tuto_pcre.php)

**Exemples :**
Une expression régulière pour tester si une chaîne de caractères ne contient pas de caractère décimal
```js
    /[^0-9]/
```
Une expression régulière afin de tester si une chaine contient au moins 10 caractères et pas de caractère décimal.
```js
    /^[^0-9]{10,}$/
```

Test d'un email (incomplet si on se réfère aux RFC correspondantes)
```js
	/^([a-zA-Z0-9]+(([\.\-\_]?[a-zA-Z0-9]+)+)?)\@(([a-zA-Z0-9]+[\.\-\_])+[a-zA- Z]{2,4})$/
```
> Tester en ligne : https://www.debuggex.com/

### Fonctions et fermetures (closure)
Le concept de fermeture consiste pour une fonction interne à une autre, (appelons cette dernière fonction parente), à pouvoir continuer d'accéder aux variables de celle-ci, après son exécution.

Il est notamment couramment utilisé pour créer des variables "privées", non accessibles dans la fonction parente.

C'est par exemple le cas d'un compteur : l'objectif est de faire appel à une fonction en charge d'incrémenter un compteur.

- Le compteur devra être propre à notre fonction, personne d'autre ne devra être en mesure de le modifier (exit la solution d'une variable globale !),
- Elle devra donc initialiser le compteur,
- Seule cette fonction devra être en mesure d'effectuer l'incrémentation du compteur.

**Rappel sur la portée des variables**
Dans une fonction et son contexte, une variable est accessible à la ou les fonctions situées dans la fonction parente. L'inverse n'est pas vrai, la fonction parente n'a pas accès aux variables des fonctions internes.

C'est ce concept de fermeture qui va nous permettre de réaliser notre compteur :
```js
    function compteur(){
        let I_count = 0; // une seule initialisation
       
        //on renvoie la fonction interne
        return function() {
              return I_count++; // on renvoie la valeur PUIS on incrémente
        };
    }
    let F_plusUn = compteur();
    
    console.log(F_plusUn()); //0
    console.log(F_plusUn()); //1
    console.log(F_plusUn()); //2
```

I_count survit dans notre fonction F_plusUn.


Nous pouvons également créer autant de compteurs que nécessaire, indépendamment les uns des autres, chaque affectation de `compteur()` étant enfermé dans les variables  de type fonction créées.
```js
	let F_plusUn = compteur();
	let F_unAutrePlusUn = compteur();
	
	console.log(F_plusUn()); //0
	console.log(F_plusUn()); //1
	console.log(F_unAutrePlusUn()); //0
	console.log(F_unAutrePlusUn()); //1
```
En utilisant les listener vous pouvez donc compter aisément le nombre de clics sur tel ou tel élément de votre page web.


## Prototypes et objets en Javascript

### les prototypes
Mécanisme d'héritage entre objets, les prototypes en Javascript diffèrent de ce qu'il est habituel de voir en POO.
- Un objet dispose d'un prototype objet dont il hérite des caractéristiques (attributs et méthodes),
- ce prototype peut lui même disposer d'un autre prototype,
- => c'est la chaîne de prototypage, un prototype est aussi un objet.

Cette chaîne de prototypage a pour conséquences :

- un objet dispose des attributs et méthodes d'autres objets
- Il s'agit d'un **lien** entre l'objet instancié et son constructeur
- Lorsqu'on remonte cette chaîne on arrive à un objet `null`

Regardons cela de plus près :
```js
	// Constructeur d'objet
	function C_cstrObjet(paramAttribut1, paramAttribut2){
			this.attribut1 = paramAttribut1;
			this.attribut2 = paramAttribut2;

			this.maMethode = function(){
				console.log('Je suis la méthode affichant les deux attributs de mon objet : ' + this.attribut1 +' '+ this.attribut2 );
			}

	}

	var O_monObjet = new C_cstrObjet("param 1","param 2");
	console.log(O_monObjet);
```

Nous avons ci-dessus un exemple classique, chaque instance de l'objet dispose directement de deux attributs et d'une méthode. De même que le constructeur (le prototype).

![](https://i.ibb.co/H7J2Rzs/Capture-d-e-cran-2022-01-27-a-09-32-46.png)


Utilisons plutôt le prototypage :
```js
	// Constructeur d'objet
	function C_cstrObjet(paramAttribut1, paramAttribut2){
			this.attribut1 = paramAttribut1;
			this.attribut2 = paramAttribut2;
	}
	// la méthode est désormais dans le prototype
	C_cstrObjet.prototype.maMethode = function(){
		console.log('Je suis la méthode affichant les deux attributs de mon objet : ' + this.attribut1 +' '+ this.attribut2 );
	}

	var O_monObjet = new C_cstrObjet("param 1","param 2");
	console.log(O_monObjet);
```

La différence entre ces deux extraits de code est qu'au lieu de se servir de la fonction comme d'un moule (classique en POO), en déportant la méthode dans le prototype, chaque objet créé dispose d'un lien vers celle-ci.

![](https://i.ibb.co/QDFjgc1/Capture-d-e-cran-2022-01-27-a-09-44-59.png)

Nous économisons donc des ressources en exploitant les prototypes et les liens plutôt que de "copier" autant de fois la méthode qu'il y a d'instances.

Remontons la chaîne de prototypage de notre objet :
```js		
	var O_monObjet = new C_cstrObjet("param 1","param 2");

	// Prototype de notre objet initial
	console.log(Object.getPrototypeOf(O_monObjet));

	// Prototype du prototype ?
	var O_proto = Object.getPrototypeOf(O_monObjet);
	console.log(Object.getPrototypeOf(O_proto));

	// Prototype du prototype du Prototype ?
	// Null
	//le prototype n'a pas de prototype, nous avons remonté la chaîne.
	var O_proto2 = Object.getPrototypeOf(O_proto);
	console.log(Object.getPrototypeOf(O_proto2));
```
![](https://i.ibb.co/G0JQ5S3/Capture-d-e-cran-2022-01-27-a-10-30-51.png)



### Les Classes

Depuis ES5, une sur couche a été ajoutée avec  l'apparition des classes.
La système d'héritage ne change pas il s'agit simplement de fonctions particulières, déclarées de la même manière.

Remplacez dans les extraits de code précédents la fonction par `class` et ajoutez le `constructor`, vous ne verrez aucune différence dans les usages, y compris les prototypes.

```js
class C_cstrObjet {
  constructor(paramAttribut1, paramAttribut2) {
	this.attribut1 = paramAttribut1;
	this.attribut2 = paramAttribut2;
  }
}
```


D'autres mots clés et fonctionnalités apparaissent, en voici quelques uns :

**Getter** `get` **et setter** `set`

```js
get unTruc() {
    return "Mon truc;
  }
set unBidule(valeur) {
    this.caracteristique = valeur;
  }
```


**static**
Pour les méthodes statiques
```js
	class ClassAvecMethodeStatique {
	  static proprieteStatique = 'Ma valeur';
	  static methodeStatique() {
	    return 'Appel de ma méthode';
	  }

	}

	console.log(ClassAvecMethodeStatique.proprieteStatique);
	// output: "Ma valeur"
	console.log(ClassAvecMethodeStatique.methodeStatique());
	// output: "Appel de ma méthode."
```

**L'héritage avec `extends`**
```js
	class ClasseFille extends ClasseMere {
	
	}
```
**champs et méthodes privés**
Précédés d'un `#` les champs et méthodes privés ne sont accessibles que dans leur contexte de classe.

```js
class C_ClasseAvecChampPrive{
  #monChampPrive

  constructor() {
    this.#monChampPrive = 'machin';
  }
}
``` 


```js
    static #C_ClasseAvecMethodePrivee() {
        return 'machin';
    }

```


**super**
Appelle des fonctions de l'objet parent
```js		
	class ClasseMere{
		constructor(paramAttribut1, paramAttribut2) {
			this.attribut1 = paramAttribut1;
			this.attribut2 = paramAttribut2;
		  }
	}

	class ClasseFille extends ClasseMere {
		constructor() {
			//Appel du constructeur de ClasseMere
				super ("truc","bidule");
			}
	}

	 O_objet = new ClasseFille;
	 console.log(O_objet.attribut1); // truc
```


### Organisons notre code

Longtemps, Javascript ne permettait pas d'inclure des fichiers dans des fichiers. Ce type de fonctionnalité est apparu avec Node.js et d'autres outils tels webpack.

Dorénavant, les navigateurs sont capables de gérer cela grâce aux modules

#### Modules
- Fichier d'extension .mjs (mais pour de sombres histoires de type mime et de compatibilité nous resterons en .js)
- intégrable avec  l'attribut type
  ```js
  <script type="module" src="main.js"></script>
  ```

Ou

```js
	<script type="module">
	  /* Code du module JavaScript */
	</script>
```
Ainsi pour une arborescence de fichiers du type :

	- main.js
	- lib/
		   autre_code.js

Nous utiliserons les mots clés `export` et `import` pour lier l'ensemble

**export**

Dans le fichier `autre_code.js` nous pourrons placer l'instruction devant les valeurs et fonctions pouvant être exportées.

```js
export const S_param = 'mon paramètre';

export function maFonction(){


}
```
il est également possible, en toute fin de fichier de lister ce qui est exportable en en passant les références en paramètres
```js
	export{ S_param, maFonction };
```


**import**
Pour importer il faut lister les variables et fonctions puis définir le chemin vers le fichier où elles se situent (ce chemin ayant comme base la racine du site).
Dans main.js :

```js
import { S_param, mafonction, reportArea, reportPerimeter } from '/lib/autre_code.js';
```

Afin d'éviter les conflits de noms il est possible de renommer les variables et fonctions avec `export`
```js
	export{ S_param as S_nouveauParam, maFonction as maNouvelleFonction };
```
Bien entendu, ce sont ces nouveaux noms qu'il faut utiliser lors de l'import.

> Note : Pour pouvoir utiliser les modules vous devez placer vos
> fichiers dans un environnement de serveur web. L'ouverture directe de
> votre fichier HTML dans le navigateur provoquera une erreur se
> sécurité.

## Les Promesses

Les promesses sont des objets retournés par une fonction qui n'a pas encore terminé son travail.
Particulièrement utiles dans un cadre asynchrone, en voici un exemple.
```js
function faireQqc() {
  return new Promise((successCallback, failureCallback) => {
    console.log("C'est fait");
    // réussir une fois sur deux
    if (Math.random() > .5) {
      successCallback("Réussite");
    } else {
      failureCallback("Échec");
    }
  })
}

const promise = faireQqc();
promise.then(successCallback, failureCallback);
``` 

À la différence des imbrications de  _callbacks_, une promesse apporte certaines garanties :

-   Les  _callbacks_  ne seront jamais appelés avant la fin du parcours de la boucle d'évènements JavaScript courante
-   Les  _callbacks_  ajoutés grâce à  `then`  seront appelés, y compris après le succès ou l'échec de l'opération asynchrone
-   Plusieurs  _callbacks_  peuvent être ajoutés en appelant  `then`  plusieurs fois, ils seront alors exécutés l'un après l'autre selon l'ordre dans lequel ils ont été insérés.


## AJAX / Fetch et JSON

**Modalités de chargement des scripts**
Lors du premier TD vous avez bien évidemment été confrontés à la problématique du moment adéquat de l'éxécution de vos scripts.

Impossible de faire fonctionner un listener en l'état s'ils sont situés dans le head de votre page. En effet votre script se charge et se lance avant que le DOM ne soit lui chargé.

Plusieurs possibilités, plus ou moins élégantes, s'offrent à vous pour gérer le chargement de vos scripts, ou le moment de leur exécution.

Lorsque vous utilisez la balise script et un attribut src, vous pouvez  ajouter certains attributs dont `async` et `defer`, qui sont des bouléens.

**defer**

Cet attribut indique au navigateur s'il doit exécuter le script après le chargement du DOM (événement `DOMContentLoaded`) mais avant le chargement des feuilles de style, images etc.

Il indique également au navigateur d'être chargé en parallèle des autres, et non de manière successive. (Sur cet aspect les navigateurs actuels gèrent cela d'eux mêmes).


	<script defer src="monfichier.js">

**async**
Cet attribut indique au navigateur qu'il est en mesure d'être exécuté une fois chargé, sans attendre que les autres scripts le soient.

Très utile pour gagner du temps mais à manipuler avec précaution car vous pourriez avoir des dépendances entre vos différents scripts/fichiers !

	<script async src="monfichier.js">




### AJAX
AJAX  (Asynchronous JavaScript + XML) est un mélange de diverses techniques afin de gérer des requêtes vers un serveur (HTTP) de manière asynchrone (donc sans rechargement complet de nos pages web) afin d'envoyer et de récupérer des données au format XML (mais pas que...).

Javascript en est le liant, exploitant l'API du DOM, il détecte un événement déclencheur (un clic par exemple), et exploite ensuite l'objet XMLHttpRequest pour envoyer la requête, attendre son retour et, en fonction de celui-ci déclencher d'autres modification du DOM.

Exemple :
Soit un tableau de données HTML dans une page avec, pour chaque ligne un ensemble de données et un bouton de suppression.

- Détection du clic sur le bouton
- récupération des informations nécessaires (l'id de la donnée à supprimer par exemple, etc.) à l'aide du parcourt du DOM et des attributs (usage typique des attributs `data-` )
- Envoi d'une requête vers le serveur avec les paramètres nécessaires (type de donnée à supprimer et son identifiant)
- Le serveur fait ce qu'il a à faire (avec du PHP, JAVA, Python etc.)
- et renvoie des informations au format XML (Ou JSON, ou HTML... nous y reviendrons)
- Javascript récupère ces informations et décide de la conduite à tenir concernant le DOM. Si la suppression s'est bien déroulée, il parcourt le DOM pour identifier le noeud `<tr>`, et le supprime.
- La ligne de notre tableau disparait : opération terminée !

Comme nous n'allons pas perdre de temps avec de la programmation côté serveur dans ce cours (il y a déjà bien assez à faire), nous allons utiliser des fichiers JSON déjà formé pour la partie côté serveur.

Après tout, le rôle des langages côté serveur est de générer des données de type texte, au format HTML, JSON ou encore XML. Nous ne feront donc que simuler ces données.

Bien entendu il vous faudra un environnement avec un serveur web classique, Apache, Nginx etc. selon vos préférences.
```js
	function maRequeteAjax(e){
	 const  reqXhr = new XMLHttpRequest();
	 reqXhr.open('POST', 'http://urlversmonserveur', true);
	 //Nous allons envoyer des données au serveur au format JSON		
	 reqXhr.setRequestHeader('Content-Type', 'application/json');
	 reqXhr.send(JSON.stringify({
 			    param1: 'valeur'
 		}));

	  reqXhr.onreadystatechange = function(event) {
     //XMLHttpRequest.DONE ===  4
     
     if (this.readyState === XMLHttpRequest.DONE) {
     	if (this.status === 200) { //ok, tout va bien
			// on récupère les données reçues du serveur pour les traiter	
	 		var O_jo = JSON.parse(reqXhr.responseText);
	 		updatePage(O_jo); // on appelle une fonction qui va se charger de mettre à jour le DOM de notre page.

     	} else {
     		console.log("Status de la réponse: %d (%s)", this.status, this.statusText);
     	}
     }
 };
 }
```
C'est un peu Old School mais cela permet de comprendre les mécanismes en oeuvre.
Il existe une API, `Fetch`, plus souple et exploitant les promesses, qui permet de simplifier tout cela.

### Simplification avec l'API Fetch

```js	
	fetch("http://urlversmonserveur",
		{
		    headers: {
		      'Accept': 'application/json',
		      'Content-Type': 'application/json'
		    },
		    method: "POST",
		    body: JSON.stringify({param1: 'valeur'})
	})
	.then(function(response) {
		//S'il s'agit de JSON nous pouvons l'exploiter à l'aide de json()
		return response.json().then(function(O_json) {  
			//traitement de notre objet en provenance du Json
		});	
	})
	.catch(function() {

	});
```

Fetch retourne une promesse et les traitements en cas de succès s'effectuent dans le `then` En cas d'erreurs c'est le `catch` qui prend le relai.

Il est possible d'utiliser autant de `then` que nécessaires.

### Manipulation de fichiers JSON avec Javascript
Vous aurez noté l'apparition du JSON dans les extraits de code précédent.
JSON : JavaScript Object Notation

Il s'agit d'un format de données, une chaîne de caractères,  ressemblant à la structure des objets javascript.
```js
	{
	   "type":"Liste d'étudiants",
	   "origine":"AMU, IUT info",
	   "anneeCreation":2022,
	   "etudiants":[
	      {
	         "nom":"DUPONT",
	         "age":22,
	         "competences":[
	            "HTML",
	            "CSS",
	            "PHP"
	         ]
	      },
	      {
	         "nom":"DUPOND",
	         "age":21,
	         "competences":[
	            "PHP",
	            "Javascript"
	         ]
	      }
	   ]
	}
```


Outre la fonction json() de l'API `Fetch` Javascript met à disposition diverses méthodes pour transformer le JSON en Objet exploitable et inversement, d'un objet ou tableau en chaîne de caractères JSON.

-   [`parse()`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/JSON/parse)  qui accepte un objet JSON sous la forme d'une chaîne de caractères en paramètre et renvoie l'objet JavaScript correspondant.

-   [`stringify()`](https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)  qui accepte un objet JavaScript en paramètre et renvoie son équivalent sous la forme d'une chaîne de caractères JSON.

## Introduction à ARIA (Accessibility for Rich Internet Application)

### Accessibilité et web

> « Mettre le Web et ses services à la disposition de tous les
> individus, quel que soit leur matériel ou logiciel, leur
> infrastructure réseau, leur langue maternelle, leur culture, leur
> localisation géographique, ou leurs aptitudes physiques ou mentales.
> »
>
> Tim Berners-Lee, directeur du W3C et inventeur du World Wide Web


Le principe d'ARIA est simple : ajouter du sens par l'intermédiaire d'attributs HTML définissant plus précisément le rôle et l'état de nos balises.
Cette notion d'état est particulièrement utile lorsque nous utilisons Javascript pour manipuler le DOM.

A noter qu'ARIA est très loin d'être une nouveauté, lors de l'avènement d'HTML 5, nombre de rôles y furent intégrés.
Dès lors il est préférable d'utiliser les balises HTML 5 plutôt qu'un attribut ARIA.

Enfin, nous verrons un peu plus tard que ces attributs nous seront très utiles pour personnaliser notre code HTML avec des templates.

Ainsi, préférez
```html

	<nav>
		<ul>
			<li>... //lien 1
			<li>... //lien 2
			//etc.
		</ul>
	</nav>
```			

 à 
```html
	<div role='nav'>
		<ul>
			<li>... //lien 1
			<li>... //lien 2
			//etc.
		</ul>
	</div>
```

### Les rôles
De nombreux rôles existent, en voici quelques-uns.

**Rôle `alert`**

CSS

```css
	.hidden {
	  display:none;
	}
```

HTML

```html
	<p id="avertTemp" role="alert" class="hidden">Brrrrrrr, un peu froid ce matin, mets ta cagoule !</p>
```
JS

```js
	document.getElementById("avertTemp").classList.remove('hidden');
```

Lors du retrait de la classe hidden un lecteur écran interprètera le rôle `alert` et avertira l'utilisateur de son existence.


**Rôle `dialog`**

Il signale la présence d'une boîte de dialogue, c'est à dire un ensemble cohérent, séparé du reste de l'interface.

```html
	<section role="dialog" aria-labelledby="dialogTitre" aria-describedby="dialogDesc">
	  <h1 id="dialogTitre">Votre profil a été mis à jour</h1>
	  <p id="dialogDesc">Vous pouvez à tout instant modifier vos informations personnelles dans la rubrique "Mon compte"</p>
	  <button>fermer</button>
	</section>
```
Vous aurez noté la présence d'attributs supplémentaires. En effet si le rôle est primordial, il est loin d'être seul.
Ici,
`aria-labelledby`  indique une relation de type libellé entre un élément et un second, identifié par un id.

`aria-describedby`  indique une relation de type descriptive entre deux éléments, la description étant identifié par un id.



**Rôles `tabs, tablist, tabpanel`**
Ils permettent  de gérer sémantiquement un sytème d'onglets.

- `tabs` pour le conteneur du sytème d'onglets,
- `tablist` pour le conteneur du système de navigation de nos onglets,
- `tabpanel` pour le contenu de chaque onglet.


### Les états et propriétés
Gestion des modifications, notamment asynchrones.``
Quelques exemples :

**`aria-label`**
A utiliser lorsque sens d'un élément d'interface est transmis uniquement par le visuel.
Ce libellé n'apparaît pas sur l'interface.
Exemple : un bouton de fermeture avec une croix.

```html
	 <button aria-label="Fermer">X</button>
```

**`aria-disabled`**
Indique que l'élément n'est pas actif dans l'interface mais qu'il existe potentiellement.
Il s'agit par exemple de proposer un bouton qui avant d'être actif nécessite certaines actions de la part de l'utilisateur (contrôle que tous les champs d'un formulaire sont remplis avant de rendre opérationnel le bouton d'envoi).
```html
	<button aria-disabled="true">Envoyer le formulaire</button>
```
Cet attribut pourra évidemment être associé à un style CSS correspondant à son état (bouton grisé par exemple)

**`aria-haspopup`**
Indique qu'un élément est lié à l'apparition d'un popup

Valeurs :
- `false`  (default)
  L'élément n'a pas de popup

- `true`
  Le popup est un menu

- `menu`
  Le popup est un menu

- `listbox`
  Le popup est une liste

- `tree`
  Le popup est un arbre

- `grid`
  Le popup est une grille

- `dialog`
  Le popup est une boîte de dialogue


Lorsque nous utilisons Ajax pour rafraichir partiellement le contenu de nos pages, il est primordial de signifier les assistants de type lecteur d'écran qu'une zone va potentiellement être concernés, qu'elle a été mise à jour. En effet, un lecteur écran lit la page dans l'ordre du code HTML et si on ne lui signifie pas, il ne saura pas qu'un élément déjà lu a été modifié ou alors, détectant un changement, le lecteur recommence la lecture de l'ensemble de la page...

**`aria-live`**
Cet attribut permet d'identifier les zones susceptibles d'être rafraichies ainsi que la conduite à tenir (interruption de la lecture de la page pour lire la zone modifiée, attente de la fin de lecture de la page avant de revenir à la partie modifiée, ne rien faire etc.

C'est le rôle de la "VALEUR_POLITESSE" d'aria-live

-  `aria-live = 'off'`

Aucune réaction de la part du lecteur vocal

-   `aria-live = 'polite'`
    lecture lorsque la tâche en cours est terminée


-  `aria-live = 'assertive'`
   Interruption de la tâche en cours et lecture


Pour travailler plus finement :

**`aria-atomic`**
Acceptant un bouléen cet attribut est utilisé pour définir si le lecteur d’écran doit ou non présenter la zone « Live » comme un ensemble, même si une partie seulement de la zone est modifiée, et donc lire l'ensemble de la zone ou une partie seulement.

**`aria-relevant`**

L’attribut  `aria-relevant=[LISTE_DES_CHANGEMENTS]`  est utilisé pour définir quel type de changements est adéquat à une zone « Live » – les valeurs possibles sont  `additions`  (addition)/`removals`  (suppression)/`text`  (texte)/`all`  (tous). La valeur par défaut est « `additions text`. »

**`aria-labelledby`**

L’attribut  `aria-labelledby=[LISTE_ID]`  est utilisé pour associer un ou des libellés à une zone. Le fonctionnement est similaire à celui d'`aria-controls`  mais les références d'id pointent vers les libellés associés aux blocs identifiés, et les références multiples sont également séparées par un espace.

**`aria-describedby`**

L’attribut  `aria-describedby=[LISTE_ID]`  est utilisé pour associer une ou des descriptions à une zone. Le fonctionnement est similaire à celui d'`aria-controls` mais les références d'id pointent vers les textes descriptifs associés aux blocs identifiés, et les références multiples sont également séparées par un espace.

> Aller plus loin :
> https://developer.mozilla.org/fr/docs/Web/Accessibility/ARIA/ARIA_Techniques

#### Exemples :

Le W3C met à disposition des exemples de mise en oeuvre avec extraits de code pour la plupart des composants d'interface :
https://github.com/w3c/aria-practices/tree/main/examples

Allons étudier ensemble le cas d'un groupe d'onglets :
https://www.w3.org/TR/wai-aria-practices/examples/tabs/tabs-2/tabs.html


### Traitement asynchrone et accessibilité
Revenons à nos requête de type AJAX qui ne sont pas sans poser problèmes.
En effet elles ont, en l'état, pour conséquences :
- perte de l'état du DOM (il est modifié mais un lecteur écran n'est par exemple pas averti de cette modification)
- pas d'historique dans le navigateur (bouton retour non opérationnel)
- impossibilité d'obtenir une URL permettant de pointer directement sur l'état modifié (plutôt fâcheux si AJAX a été utilisé pour une navigation).

Il existe des solutions, voici un exemple commenté.

Nous allons créer une navigation à l'aide d'Ajax.
Lors du clic sur un élément du menu, nous allons rafraîchir, le titre h2 de notre page et le contenu d'un paragraphe. Cela à l'aide de données au format JSON.
Un peu de PHP nous sera également utile pour comparer les comportements et rendre accessibles nos url de manière très classique avec la méthode GET.

Vous pouvez trouver le code à cette adresse :
https://github.com/moinal/Navigation-avec-Ajax

#### Usage des attributs ARIA

La `section` de notre page se voit attribuée 3 attributs :
```html
	<section id ="content" aria-live="polite" aria-atomic="true" aria-relevant="all">
```
Ainsi la zone susceptible d'être mise à jour est indiquée comme telle, elle doit être considérée comme un ensemble et, enfin, le type de mise à jour consiste en l'ajout et la suppression de contenus.

#### Manipulation de l'historique du navigateur

Afin de conserver les fonctionnalités "précédent" et "suivant" du navigateur, lors d'une modification via Ajax, nous injectons dans son historique le contenu de notre page au format JSON, le titre de la page et son url.
```js
	history.pushState({O_json, title: O_json.Titre},null, O_json.Url);
```
https://developer.mozilla.org/en-US/docs/Web/API/History/pushState

Lorsque l'historique est utilisé nous redéclenchons la mise à jour des éléments à l'aide de ces données stockées. Cela est possible car notre page et donc son code JavaScript est bien en cache.
```js
	window.onpopstate = function(event) {  
		  if(event.state != null){  
			  updatePage(event.state.O_json);  
	  }  
	};	
```

https://developer.mozilla.org/fr/docs/Web/API/WindowEventHandlers/onpopstate

### This en Javascript

https://developer.mozilla.org/fr/docs/Web/JavaScript/Reference/Operators/this

## TD : A vous de jouer !

1 - Ajouter du sens avec ARIA à vos travaux du TD précédent en indiquant :
- que l'élément comprenant votre valeur (donnée d'un capteur  thermique, jusque là simulé par les données de votre tableau)  est susceptible d'être mis à jour (point 5 du TD 1), en utilisant aria-live.

- qu'un nouvel élément a été ajouté au DOM (point 6 du TD 1), en utilisant `alert` (celui d'ARIA, bien entendu !)

2 - Construisez un système d'onglets (accessible, cela  va de soi !), le premier recevra votre (ou vos) données de(s) capteur(s), le second, leur historique (fictif jusqu'ici).

3 - Organisez vos scripts avec des classes pour nourrir le HTML de vos onglets. Lorsqu'une valeur de notre capteur fictif est évaluée, trois modifications sont à effectuer :

-	Afficher la valeur courante,
-	nourrir la partie "historique" de nos onglets (un simple tableau Html suffira pour l'instant),
-	afficher, ou non un message d'alerte.


4 Rendons dynamique tout cela !
-	Utilisez Ajax/ Fetch pour rafraichir la valeur de nos capteurs.
url de l'API des capteurs : http://api.hothothot.dog
- stockez (par un script, à la main, peu importe à ce stade), un certain nombre de valeurs dans un fichier JSON côté serveur.
- Servez vous en pour nourrir l'onglet "historique"

5 - Approfondissement, mettez en place une navigation avec AJAX permettant d'accéder à une rubrique "mon compte", les données proviendront d'un fichier JSON côté serveur. N'oubliez pas l'accessibilité avec ARIA et la gestion de l'historique du navigateur.

<!--stackedit_data:
eyJoaXN0b3J5IjpbODM4NDY3MzQzLDI2ODE3OTc2NCwtMTA1ND
M1MzI2MSwxNTkwMzQ1NzksLTExMDM4MDMyOTAsLTExNDYwNTAz
NiwtMzUyNTA3MTkxLDE2NjM5MTE0MDcsODY1MzgyMTg0LDE0ND
I2NzYxODksLTYxNzk4MzE4OSwtMjcxMTY5MjAwLC0yMTg0MDM0
NDYsLTIwMTc5Mjc4NTUsLTE4NjQ2NjM1MzksMTE2NTIzODE1My
w3OTcwNTg3MjgsLTE5NTI0MjM4MjksOTMzNDMxMjQ4LC0xMDMw
NDQ2NjMwXX0=
-->