module.exports = () => {
    var gplay = require('google-play-scraper');
    var appStore = require('app-store-scraper');
    const controller = {};

    controller.getGooglePlayReviews = function (req, res) {
        gplay.reviews({
            appId: req.query.appId,
            num: req.query.num,
            lang: 'pt',
            country: 'br',
            sort: gplay.sort.NEWEST
        }).then(res.status(200).json.bind(res));
    };

    controller.getAppStoreReviews = function (req, res) {
        appStore.reviews({
            id: req.query.id,
            sort: appStore.sort.RECENT,
            page: req.query.page,
            country: 'br'
        }).then(res.status(200).json.bind(res));
    };

    return controller;
}
