const db = require('../models');
const axios = require('axios');
const cheerio = require('cheerio');

module.exports = function(app) {

    // scrape for new articles
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
                articleResult.saved = false;

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
            res.redirect('/articles');
        });
    });

    // get all articles
    app.get('/articles', function(req, res) {
        db.Article.find({}).then(function(articles) {
            res.json(articles);
        }).catch(function(err) {
            res.json(err);
        });
    });

    // get a specific article/comments
    app.get('/articles/:id', function(req, res) {
        db.Article.findOne({_id: req.params.id}).populate('comment').then(function(theArticle) {
            res.json(theArticle);
        }).catch(function(err) {
            res.json(err);
        });
    });

    // comment on an article
    app.post('/articles/:id', function(req, res) {
        db.Comment.create(req.body).then(function(newComment) {
            return db.Article.findOneAndUpdate(
                {_id: req.params.id}, 
                {
                    '$push': {
                        comment: newComment._id
                    }
                }, 
                {new: true});
        }).then(function(updatedArticle) {
            res.json(updatedArticle);
        }).catch(function(err) {
            res.json(err);
        });
    });

    // save an article
    app.put('/articles/:id/save', function(req, res) {
        db.Article.findOneAndUpdate({_id: req.params.id}, {saved: true}, {new: true}).then(function(updated) {
            res.json(updated);
        }).catch(function(err) {
            res.json(err);
        });
    });

    // get saved articles
    app.get('/saved', function(req, res) {
        db.Article.find({saved: true}).then(function(articles) {
            res.json(articles);
        }).catch(function(err) {
            res.json(err);
        });
    });

    // delete an article
    app.delete('/articles/:id/delete', function(req, res) {
        db.Article.remove({_id: req.params.id}).then(function(articles) {
            res.json(articles);
        }).catch(function(err) {
            res.json(err);
        });
    });

    // delete a comment
    app.delete('/articles/:id/deletecomment/:commid', function(req, res) {
        db.Comment.remove({_id: req.params.commid}).then(function(comments) {
            res.json(comments);
        }).catch(function(err) {
            res.json(err);
        });
    });

    // delete all articles
    app.delete('/articles', function(req, res) {
        db.Article.remove({}).then(function(removed) {
            res.redirect('/');
        }).catch(function(err) {
            res.json(err)
        });
    });

    app.delete('/articles/saved', function(req, res) {
        db.Article.remove({saved: true}).then(function(removed) {
            res.redirect('/myarticles');
        }).catch(function(err) {
            res.json(err)
        });
    });

};