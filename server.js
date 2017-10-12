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
    uri: 'https://www.smugmug.com/api/v2/album/pvRWcT!images?APIKey=' + process.env.SMUGMUG_API_KEY,
    // uri: 'https://www.smugmug.com/api/v2/user/robbiejaeger!albums?APIKey=' + process.env.SMUGMUG_API_KEY,
    // uri: 'https://www.smugmug.com/api/v2/album/pvRWcT/image/5GpFbBM-0?APIKey=' + process.env.SMUGMUG_API_KEY,
    headers: {
        'Accept': 'application/json'
    },
    json: true
  };

  rp(options)
    .then((res) => {
      // console.log(res.Response.AlbumImage)
      let thumbnailUrls = res.Response.AlbumImage.map((image) => {
        return image.ThumbnailUrl;
      });
      response.render('home', { thumbnailUrls });
    })
    .catch((err) => {
      console.error(err);
    })
});

app.listen(app.get('port'), () => {
  console.log(`Smugmug app running on port ${app.get('port')}`);
});