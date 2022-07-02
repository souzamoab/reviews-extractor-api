module.exports = app => {
    var gplay = require('google-play-scraper');
    const controller = require('../controller/review-controller')();
    app.route('/api/v1/extract/reviews/gplay').get(controller.getGooglePlayReviews);
    app.route('/api/v1/extract/reviews/appstore').get(controller.getAppStoreReviews);
    app.route('/api/v1/extract/reviews/twitter').get(controller.getUserTweets);
}