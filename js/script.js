// LOADER
window.addEventListener('load', function() {
  setTimeout(() => {
    document.getElementById('loader').style.opacity = "0";
  }, 800);
  setTimeout(function(){
    document.getElementById('loader').style.display = "none";
  }, 1300);
});


// Sélection des éléments nécessaires dans le DOM
const selectBtn = document.querySelector(".select-btn"),
  list_items = document.querySelector(".list-items");
items = document.querySelectorAll(".item");

// Vérification de l'existence des éléments
if (items && list_items && selectBtn) {
  // Ajout d'un écouteur d'événements sur le bouton de sélection
  selectBtn.addEventListener("click", () => {
    selectBtn.classList.toggle("open");
  });

  // Parcours de chaque élément de la liste
  items.forEach((item) => {
    item.addEventListener("click", () => {
      // Désélection de tous les autres éléments
      items.forEach((otherItem) => {
        if (otherItem !== item) {
          otherItem.classList.remove("checked");
          const otherInput = otherItem.querySelector("input[name='games']");
          if (otherInput) {
            otherInput.checked = false;
          }
        }
      });

      // Sélection de l'élément cliqué
      item.classList.add("checked");
      const input = item.querySelector("input[name='games']");
      if (input) {
        input.checked = true;
      }

      let checked = document.querySelectorAll(".checked"),
        btnText = document.querySelector(".btn-text");

      // Mise à jour du texte du bouton en fonction du nombre d'éléments sélectionnés
      if (checked && checked.length > 0) {
        btnText.innerText = `${checked.length} sélectionné(s)`;
      } else {
        btnText.innerText = "Sélectionner un jeu";
      }

      // Récupération des catégories sélectionnées
      const selectedCategories = Array.from(checked).map(
        (checkbox) => checkbox.querySelector("input[name='games']").value
      );
      // Recherche des éléments de la classe gamesAll
      const categoriesAll = document.getElementsByClassName("gamesAll");
      const cardArray = searchCard(categoriesAll);

      // Gestion de l'affichage des cartes en fonction de la sélection
      if (!selectedCategories.includes("all")) {
        cardArray.forEach((card) => {
          let categoryTitle1 = document.getElementById("games__all"),
            categoryTitle2 = document.getElementById("logiciel__all");
          card.classList.add("hidden");
          categoryTitle1.classList.add("hidden");
          categoryTitle2.classList.add("hidden");
        });
      } else if (cardArray[0].className.includes("hidden")) {
        cardArray.forEach((card) => {
          let categoryTitle1 = document.getElementById("games__all"),
            categoryTitle2 = document.getElementById("logiciel__all");
          card.classList.remove("hidden");
          categoryTitle1.classList.remove("hidden");
          categoryTitle2.classList.remove("hidden");
        });
      }

      // Recherche des éléments de la classe games
      const categoriesCracks = document.getElementsByClassName("games");
      const cardQueries = searchCard(categoriesCracks);
      let cardResult = [];

      // Suppression des doublons
      for (let i = 0; i < cardQueries.length; i++) {
        if (!cardResult.includes(cardQueries[i])) {
          cardResult.push(cardQueries[i]);
        }
      }

      // Gestion de l'affichage des cartes en fonction de la sélection
      for (let i = 0; i < cardResult.length; i++) {
        const cardCategories = cardResult[i]
          .getAttribute("name")
          .replace(/ /g, "_")
          .split(",");
        cardCategories.forEach((cardCategory) => {
          let categoryTitle = document.getElementById(cardCategory);
          let containerCard = document.getElementById("games__" + cardCategory);
          if (selectedCategories?.includes(cardCategory)) {
            if (!categoryTitle || !containerCard) return;
            categoryTitle.classList.remove("hidden");
            containerCard.classList.remove("hidden");
          } else {
            if (!categoryTitle || !containerCard) return;
            categoryTitle.classList.add("hidden");
            containerCard.classList.add("hidden");
          }
        });
      }
    });
  });
}


// Fonction pour rechercher des cartes
function searchCard(categories) {
  let result = [];
  for (let i = 0; i < categories.length; i++) {
    const categoryCards = categories[i].getElementsByClassName("card");
    for (let j = 0; j < categoryCards.length; j++) {
      const card = categoryCards[j];
      result.push(card);
    }
  }
  return result;
}

// Fonction pour rechercher des jeux
function searchGames() {
  // Récupération de la requête de recherche du champ de saisie et conversion en minuscules
  var searchQuery = document.getElementById("searchInput").value.toLowerCase();

  // Récupération de tous les éléments de carte
  var cards = document.getElementsByClassName("card");

  // Variable pour suivre si des cartes correspondantes sont trouvées
  var matchFound = false;

  // Parcours de chaque carte et vérification si l'ID correspond à la requête de recherche
  for (var i = 0; i < cards.length; i++) {
    var cardId = cards[i].getAttribute("id").toLowerCase();

    // Affichage ou masquage de la carte en fonction de la requête de recherche
    if (cardId.includes(searchQuery)) {
      cards[i].style.display = "flex";
      cards[i].style.flexDirection = "column";
      matchFound = true;
    } else {
      cards[i].style.display = "none";
    }
  }
}

// Ajout d'un écouteur d'événements sur le champ de recherche
const search = document.getElementById("searchInput")
if(search){
  search.addEventListener("input", searchGames);
}

