// Lookup Spaces by ID
// https://developer.twitter.com/en/docs/twitter-api/spaces/lookup

const needle = require('needle');
const fs = require('fs');

// The code below sets the bearer token from your environment variables
// To set environment variables on macOS or Linux, run the export command below from the terminal:
// export BEARER_TOKEN='YOUR-TOKEN'
const token = "AAAAAAAAAAAAAAAAAAAAAPOBcgEAAAAAajnERWrtht%2Fti7R1JLNgv4qdnvc%3DB3VZC7Z9IAA6cOJb1YZRXyYD9LjYq2WCf8C9qks6AtuRxzldhV";

const endpointUrl = `https://api.twitter.com/2/tweets/search/recent`;

async function getRequest() {

    // Edit query parameters below and specify a search query
    // optional params: host_ids,conversation_controls,created_at,creator_id,id,invited_user_ids,is_ticketed,lang,media_key,participants,scheduled_start,speaker_ids,started_at,state,title,updated_at
    const params = {
        'query': 'nubank seguranca',
        'max_results': 10,
        'tweet.fields': 'author_id,created_at,in_reply_to_user_id,possibly_sensitive,lang'
    }

    const res = await needle('get', endpointUrl, params, {
        headers: {
            "authorization": `Bearer ${token}`
        }
    })

    if (res.body) {
        return res.body;
    } else {
        throw new Error('Unsuccessful request');
    }
}

(async () => {

    try {
        // Make request
        const response = await getRequest();
        // console.dir(response, {
        //     depth: null
        // });

        var jsonContent = JSON.stringify(response);

        fs.writeFile("output.json", jsonContent, 'utf8', function (err) {
            if (err) {
                console.log("An error occured while writing JSON Object to File.");
                return console.log(err);
            }
         
            console.log("JSON file has been saved.");
        });


    } catch (e) {
        console.log(e);
        process.exit(-1);
    }
    process.exit();
})();