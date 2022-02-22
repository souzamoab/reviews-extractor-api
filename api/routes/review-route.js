module.exports = app => {
    var gplay = require('google-play-scraper');
    const controller = require('../controller/review-controller')();
    app.route('/api/v1/extract/reviews').get(controller.getReviews);
}