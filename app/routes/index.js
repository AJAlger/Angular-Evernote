var Evernote = require('evernote').Evernote;

var config = require('../../config.json');
var callbackUrl = "http://localhost:9001/oauth_callback";

// home page
exports.index = function(req, res) {
    if(req.session.oauthAccessToken) {
        var token = req.session.oauthAccessToken;
        var client = new Evernote.Client({
            token: token,
            sandbox: config.SANDBOX
        });
        res.sendFile('index.html', {root: './app'});
    } else {
        res.redirect('../login.html');
    }
};

// OAuth
exports.oauth = function(req, res) {
    var client = new Evernote.Client({
        consumerKey: config.API_CONSUMER_KEY,
        consumerSecret: config.API_CONSUMER_SECRET,
        sandbox: config.SANDBOX
    });

    client.getRequestToken(callbackUrl, function(error, oauthToken, oauthTokenSecret, results){
        if(error) {
            req.session.error = JSON.stringify(error);
            res.redirect('/');
        }
        else {
            // store the tokens in the session
            req.session.oauthToken = oauthToken;
            req.session.oauthTokenSecret = oauthTokenSecret;

            // redirect the user to authorize the token
            res.redirect(client.getAuthorizeUrl(oauthToken));
        }
    });

};

// OAuth callback
exports.oauth_callback = function(req, res) {
    var client = new Evernote.Client({
        consumerKey: config.API_CONSUMER_KEY,
        consumerSecret: config.API_CONSUMER_SECRET,
        sandbox: config.SANDBOX
    });

    client.getAccessToken(
        req.session.oauthToken,
        req.session.oauthTokenSecret,
        req.param('oauth_verifier'),
        function(error, oauthAccessToken, oauthAccessTokenSecret, results) {
            if(error) {
                console.log('error');
                console.log(error);
                res.redirect('/');
            } else {
                // store the access token in the session
                req.session.oauthAccessToken = oauthAccessToken;
                req.session.oauthAccessTtokenSecret = oauthAccessTokenSecret;
                req.session.edamShard = results.edam_shard;
                req.session.edamUserId = results.edam_userId;
                req.session.edamExpires = results.edam_expires;
                req.session.edamNoteStoreUrl = results.edam_noteStoreUrl;
                req.session.edamWebApiUrlPrefix = results.edam_webApiUrlPrefix;
                res.redirect('/');
            }
        });
};


// Send an Evernote Note
exports.postNote = function(req, res) {
    if (req.session.oauthAccessToken) {
        var token = req.session.oauthAccessToken;
        var client = new Evernote.Client({
            token: token,
            sandbox: config.SANDBOX
        });

        var note = new Evernote.Note();

        var nBody = req.body.content;
        note.title = 'Sent from EverVoice';

        note.content = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
        note.content += "<!DOCTYPE en-note SYSTEM \"http://xml.evernote.com/pub/enml2.dtd\">";
        note.content += "<en-note>" + nBody + "</en-note>";

        console.log('This is the content body: ' + nBody);

        var noteStore = client.getNoteStore();
        noteStore.createNote(note, function (err, newNote) {
            if (err) {
                console.log(err);
            } else {
                //callback(newNote);
                console.log("Successfully created a new note with GUID: " + newNote.guid);
            }
        });

        console.log("create success");
        res.redirect('/');

    }
};


