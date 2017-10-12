const fs = require('fs');
const request = require('request');
const cheerio = require('cheerio');

const main_url = '';
const base_url = '';

request(main_url, (err, response, body) => {
  if (err) { return console.log(err); }

  const $ = cheerio.load(body);
  const page = $('img');
  const download = function (uri, filename, callback) {
    request.head(uri, (err, res, body) => {
      request(uri).pipe(fs.createWriteStream(filename)).on('close', callback);
    });
  };
  for (const i in page) {
    try {
      download(base_url + page[i].attribs.src.replace('png', 'jpg').replace('/la/thumb', ''), page[i].attribs.src.replace('/la/thumb/', ':'), () => {
        console.log('done');
      });
    } catch (er) {

    }
  }
});
