module.exports = () => {
    var gplay = require('google-play-scraper');
    var appStore = require('app-store-scraper');
    const needle = require('needle');
    const controller = {};

    const token = ""; // Enter your twitter token api here
    const endpointUrl = `https://api.twitter.com/2/tweets/search/recent`;

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

    controller.getUserTweets = async function (req, res) {

        const params = {
            'query': req.query.text + ' -is:retweet -is:reply -is:quote',
            'max_results': req.query.num,
            'tweet.fields': req.query.fields
        }

        try {
            const response = await needle('get', endpointUrl, params, {
                headers: {
                    "authorization": `Bearer ${token}`
                }
            })
    
            res.json(response.body)
        }catch (err) {
            res.status(500).json.bind("Internal Server Error")
        }

    };

    return controller;
}
