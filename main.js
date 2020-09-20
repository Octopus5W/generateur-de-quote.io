let intro = document.getElementById('intro');
let quote = document.getElementById('quote');
let author = document.getElementById('author');

function generator() {
    fetch("https://breaking-bad-quotes.herokuapp.com/v1/quotes")
        .then(res => {
            if (res.ok) {
                res.json().then(data => {
                    quote.innerHTML = data[0].quote;
                    author.innerHTML = data[0].author;
                    oneTimeFavorite = 0; // sécurité pour n'afficher qu'une seule fois
                    oneTimeaffFavorite = 0; // sécurité pour n'afficher qu'une seule fois
                })
            } else {
                intro.innerHTML = "L'URL de l'API est inexistante.";
                quote.innerHTML = "T'as encore tout cassé...";
            }
        })
}



//compteur pour incrémentation du localStorage 
// && compteur si l'user n'a cliqué que sur Favori à son entrée sur le site
let cpt = 0;

let oneTimeFavorite = 0;

// fonction d'ajout au localStorage/favori par un bouton 
function favorite() {
    if (oneTimeFavorite == 0) { // sécurité pour n'afficher qu'une seule fois
        if (cpt != 0) {
            //envoie dans le localStorage
            localStorage.setItem('quote' + cpt, quote.innerHTML);
            localStorage.setItem('author' + cpt, author.innerHTML);
        } else {
            localStorage.setItem('quote' + cpt, document.getElementById('quote').textContent);
            localStorage.setItem('author' + cpt, document.getElementById('author').textContent);
        }
        //incrémentation
        cpt++;
        oneTimeFavorite++;
    }
}


let oneTimeaffFavorite = 0;

function affFavorite() { // affiche et suprrime les favorites en fonction des ajoutes
    console.log(oneTimeaffFavorite + " " + oneTimeFavorite + " " + cpt)
    if (oneTimeFavorite == 1 && oneTimeaffFavorite == 0) { // sécurité pour n'afficher qu'une seule fois
        for (i = cpt; i > 0; i--) {
            // initialisation des variables de capture du localStorage
            let quoteLS = localStorage.getItem('quote' + i);
            let authorLS = localStorage.getItem('author' + i);

            // création d'un paragraphe pour afficher la quote
            let addPQuote = document.createElement('p');
            addPQuote.class = "quote";
            addPQuote.textContent = quoteLS;

            // création d'un paragraphe pour afficher l'auteur
            let addPAuthor = document.createElement('p');
            addPAuthor.class = "author";
            addPAuthor.textContent = authorLS;

            //affichage des quotes et auteurs
            document.getElementById("droite").appendChild(addPQuote);
            document.getElementById("droite").appendChild(addPAuthor);
            oneTimeaffFavorite++;
        }
    } else if (oneTimeFavorite == 1 && cpt == 1) {

    } else {
        let noFavorite = document.createElement('p');
        noFavorite.class = "quote";
        noFavorite.textContent = "Tu n'as pas de favori";
        document.getElementById("droite").appendChild(noFavorite);
    }
}


function supFavorite() {
    localStorage.clear()
}





console.log(localStorage.length)
console.log(localStorage[localStorage.length - 1])