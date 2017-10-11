const express = require('express');
const app = express();
const handlebars = require('express-handlebars');
const rp = require('request-promise-native');
require('dotenv').config();

app.engine('handlebars', handlebars({defaultLayout: 'main'}));
app.set('view engine', 'handlebars');
app.set('port', process.env.PORT || 3000);

app.get('/', (request, response) => {
  const options = {
    method: 'GET',
    uri: 'https://www.smugmug.com/api/v2/user/robbiejaeger?APIKey=' + process.env.SMUGMUG_API_KEY,
    headers: {
        'Accept': 'application/json'
    },
    json: true
  };

  rp(options)
    .then((res) => {
      console.log(res)
      response.render('home', { smugResponse: JSON.stringify(res, null, 2) });
    })
    .catch(
      (err) => {console.error("error", { err });
    })
});

app.listen(app.get('port'), () => {
  console.log(`Smugmug app running on port ${app.get('port')}`);
});