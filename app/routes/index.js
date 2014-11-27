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
        var noteStore = client.getNoteStore();
        noteStore.listNotebooks(function(err, notebooks){
            req.session.notebooks = notebooks;
            res.redirect('../index.html');
        });
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

// Clear session
exports.clear = function(req, res) {
    req.session.destroy();
    res.redirect('/');
};

// CREATE A NOTE
exports.create = function(req, res) {
    if(req.session.oauthAccessToken) {
        res.sendfile("views/create.html");
    }else{
        res.redirect('/');
    }

};

exports.receive = function(req, res) {
    var token = req.session.oauthAccessToken;
    var client = new Evernote.Client({
        token: token,
        sandbox: config.SANDBOX
    });
    var myBody = req.body.content;
    var nBody = "<?xml version=\"1.0\" encoding=\"UTF-8\"?>";
    nBody += "<!DOCTYPE en-note SYSTEM \"http://xml.evernote.com/pub/enml2.dtd\">";
    nBody += "<en-note>" + myBody + "</en-note>";

    var ourNote = new Evernote.Note();
    ourNote.title = req.body.title;
    console.log("Create note:" + ourNote.title);
    ourNote.content = nBody;
    console.log("Content:" + nBody);

    var noteStore = client.getNoteStore();
    noteStore.createNote(ourNote, function(err, note) {
        if (err) {
            console.log(err);
        } else {
            //callback(note);
        }
    });

    console.log("create success");
    res.redirect('/');
};


