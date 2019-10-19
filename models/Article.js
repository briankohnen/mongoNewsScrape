const mongoose = require('mongoose');

const Schema = mongoose.Schema;

const ArticleSchema = new Schema({
    image: {
        type: String,
        required: false
    },
    link: {
        type: String,
        require: true
    },
    headline: {
        type: String,
        required: true
    },
    summary: {
        type: String,
        required: true
    },
    category: {
        type: String,
        required: true
    },
    saved: {
        type: Boolean,
        required: true
    },
    comment: [{
        type: Schema.Types.ObjectId,
        ref: 'Comment'
    }]
});

const Article = mongoose.model('Article', ArticleSchema);

module.exports = Article;