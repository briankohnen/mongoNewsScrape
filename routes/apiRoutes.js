const db = require('../models');
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = function(app) {

    app.get('/scrape', function(req, res) {
        axios.get('https://chicago.suntimes.com/entertainment-and-culture').then(function(response) {
            let $ = cheerio.load(response.data);

            $('div.c-compact-river__entry').each(function(i, element) {
                let articleResult = {};

                let image = $(element).find('noscript').text().split(' ').pop().slice(5, -2);
                let headline = $(element).find('h2.c-entry-box--compact__title').find('a').text().trim();
                let link = $(element).find('h2.c-entry-box--compact__title').find('a').attr('href').trim();
                let summary = $(element).find('p.p-dek').text().trim();
                let category = $(element).find('ul').find('span').text().trim();

                articleResult.image = image;
                articleResult.link = link;
                articleResult.headline = headline;
                articleResult.summary = summary;
                articleResult.category = category;

                db.Article.findOne({headline: headline}).then(function(checkIfDup) {
                    if (checkIfDup) {
                        console.log('duplicate article');
                        return;
                    } else {
                        db.Article.create(articleResult).then(function(newArticle) {
                            console.log(newArticle);
                        }).catch(function(err) {
                            console.log(err);
                        });
                    }
                });
            });
        });
    });
};