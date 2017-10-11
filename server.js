const express = require('express');
const app = express();
const handlebars = require('express-handlebars');

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);

app.get('/', (request, response) => {
  response.render('home');
});

app.listen(app.get('port'), () => {
  console.log(`Smugmug app running on port ${app.get('port')}`);
});