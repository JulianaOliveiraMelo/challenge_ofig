const express = require('express');
const session = require('express-session');

// on importe le router
const router = require('./app/router');

// un peu de config
const PORT = process.env.PORT || 5000;


const app = express();

// servir les fichiers statiques qui sont dans "integration"
app.use(express.static('integration'));

// On defini le moteur de template de notre application express
app.set('view engine', 'ejs');

// Définir ou se trouves nos fichiers ejs (views)
app.set('views', 'app/views');

// On ibitialize le middleware de session
app.use(session({
  secret: 'keyboard cat',
  resave: true,
  saveUninitialized: true
}));

// Afin de s'assurer que la propriété cart existe dans notre session
// On créer un middlware maison gérant son initialisation
app.use((request, response, next)=>{
  if (!request.session.cart) {
    request.session.cart = {};
  }
  next();
});

// routage !
app.use(router);


// on lance le serveur
app.listen(PORT, () => {
  console.log(`Listening on ${PORT}`);
});
