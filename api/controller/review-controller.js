module.exports = () => {
    var gplay = require('google-play-scraper');
    const controller = {};

    controller.getReviews = function (req, res) {
        gplay.reviews({
            appId: req.query.appId,
            num: req.query.num
        }).then(res.status(200).json.bind(res));
    };

    return controller;
}