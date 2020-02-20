const path = require('path');
const dataMapper = require('../dataMapper');

const mainController = {

  // méthode pour la page d'accueil
  homePage: (request, response) => {
    dataMapper.getAllFigurine((figurineList) => {
      // Ici comme le retour est une array (tableau) il faut le renvoyer à la vue à l'intérieur d'un objet
      response.render('accueil', {figurineList : figurineList});
    });
    
  },

  // méthode pour la page article
  articlePage: (request, response) => {

    const figurineId = parseInt(request.params.id);

    if(isNaN(figurineId)){
      // error
    }

    dataMapper.getOneFigurineById(figurineId, (figurines) => {
      // Ici comme figurine qui a été renviyer a notre callback est déjà un objet, pas besoin de l'envoyer a notre vue dans un autre objet. Rien ne nous empêche de le faire, mais c'est une étape non nécessaire.
      const reviewList = [];
      for(let figurine of figurines){

        reviewList.push({
          AUTHOR: figurine.AUTHOR,
          TITLE: figurine.TITLE,
          MESSAGE: figurine.MESSAGE,
          NOTE: figurine.NOTE
        });
      }
      response.render('article', {figurine: figurines[0], reviewList: reviewList});
    });

  }

};


module.exports = mainController;
