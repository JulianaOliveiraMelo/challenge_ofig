const path = require('path');
const dataMapper = require('../dataMapper');

const cartController = {

  // méthode pour afficher le panier
  cartPage: (request, response) => {
    /*
    Au final on désire récupérer un objet cart enrichi avec les données des figurines se trouvent dedans
    {
      figurineId: {
        QTY : nombreArticle,
        NAME: NAME,
        CATEGORY: CATEGORY...
      },
      figurineId: nombreArticle
    }
    */
    dataMapper.getAllFigurine((figurineList) => {

      // Ici c'est l'initialisation du tablea qui contiendra les figurines de notre panier
      // Losqu'on initialise un array ou un object, on peut les définir en tant que constante, même si les valeurs à l'intérieur vont variés. Car ceux-)ci resteront du même type.
      const listFigurineInCart = [];

      let totalHT = 0;
      const fraisPort = 9.99;
      const txTVA = 0.2;

      // Création du tableau contenant la liste des figurines présentes dans le panier et ajout de la quantité de celles-ci
      for (let figurine of figurineList) {
        // On vérifie que la figurine est présente dans le panier
        if (request.session.cart[figurine.ID]) {
          // On y ajoute la quantité mise préalablement dans le panier
          figurine.QTY = request.session.cart[figurine.ID];
          // Et finalament on ajoute la figurine au tableau que nous allons renvoyer a la vue
          listFigurineInCart.push(figurine);

          // Calcul de notre total HT
          totalHT += figurine.PRICE * figurine.QTY;
        }
      }

      // On ajoute les frais de port
      totalHT += fraisPort;

      //Calcul du montant de la TVA 
      const montantTVA = parseFloat(totalHT * txTVA);

      //Calcul de notre total TTC
      const totalTTC = parseFloat(totalHT + montantTVA);

      // On affiche la vue
      response.render('panier', {
        listFigurineInCart: listFigurineInCart,
        totalHT: totalHT,
        fraisPort: fraisPort,
        txTVA: txTVA,
        montantTVA: montantTVA,
        totalTTC: totalTTC
      });
    });

  },

  cartAdd: (request, response) => {
    const figurineId = parseInt(request.params.id);

    if (isNaN(figurineId)) {
      console.error("l'id n'est pas une nombre");
    }

    /*
    Je désire stocké mes article dans mon panier sous cette forme : 
    {
      figurineId: quantité,
      figurineId: quantité
    }
    */
    // Afin de pouvoir stocker le nom d'article d'une figurine en particulier on utilise l'incrémentation 
    // l'ajout des [] ici, ne veut pas dire que nous nous trouvons dans un array, c'est utilisé afin de pouvoir appelé une propriété de façon dynamique
    // Ici cela peut correspondre par exemple à : request.session.2
    if (!request.session.cart[figurineId]) {
      request.session.cart[figurineId] = 0;
    }
    request.session.cart[figurineId]++;

    // On redirige vers l'affichage du panier
    response.redirect('/cart');

  },

  cartDelete: (request, response) => {
    const figurineId = parseInt(request.params.id);

    if (isNaN(figurineId)) {
      console.error("l'id n'est pas une nombre");
    }

    if(request.session.cart[figurineId] && request.session.cart[figurineId] > 0){
      request.session.cart[figurineId]--;
    }

    //Si la quantité d'article est 0 alors on supprime la figurine du panier
    if(request.session.cart[figurineId] === 0){
      delete request.session.cart[figurineId];
    }

    console.log(request.session.cart);

    response.redirect('/cart');

  }

};



module.exports = cartController;
