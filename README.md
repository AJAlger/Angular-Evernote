# Angular Evernote

This app uses the Evernote API, Angular, Gulp and Express to use the Evernote API with the Web Speech API on Chrome. I have also included Bourbon and Neat to run through NodeJS. 

###
The landing login page has not been customized. It is extremely basic. If you want to use the project, you must change the values in the ```config.json``` file.


```
{
    "API_CONSUMER_KEY" : "your key",
    "API_CONSUMER_SECRET" : "your secret",
    "SANDBOX" : true
}
```


Additionally, you can configure the port using the ```gulpfile.js``` or in ```index.js``` in ```app/routes```.

Gulp file:

```
var express_port = 9000;
```


```index.js``` file:

```var callbackUrl = "http://localhost:9001/oauth_callback";```


If you have any suggestions, feel free to email me or send a pull request. It is the aim of this project to continue to develop. I hope to add APIs for Twitter and possibly Facebook soon.
