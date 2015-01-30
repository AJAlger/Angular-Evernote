# Angular Evernote

This app uses the Evernote API, AngularJS, Gulp, NodeJS and ExpressJS to use the Evernote API with the Speech Recognition API on Chrome. I have also included Bourbon and Neat to run in NodeJS.

###
The landing login and app pages have been customized using Angular Material. It is extremely basic. If you want to use the project, you can change the values in the ```config.json``` file. However, you will have to create your own Evernote developer account. The Heroku project works and you can sign-in to your own Evernote account.

Additionally, you can configure the port using the ```gulpfile.js``` or in ```app.js```. You can add all sorts of options in ```index.js``` located in ```app/routes```. See http://dev.evernote.com.

You can also change the port in ExpressJS or Gulpfile.js. It depends on what you want to do. If you want to run ```node``` or ```nodemon```, you will use the port in ```app.js```. On the other hand, if you run ```gulp``` you will run the port in the Gulp file. Remember, if you run ```node app.js```, the HTML and stylesheet files will not update automatically. They will running ```gulp```. Also, note that if you run both ```node app.js``` and ```gulp``` using the same port, you will receive an error. Make sure that the ports are different (e.g. 9000 and 9001).

Gulp file:

```
var express_port = 9000;
```

The file to run the routes using the Evernote API is located in the ```app/routes``` folder. Configure the files as you see fit. I'd recommend not changing the ```/oauth``` and ```/oauth_callback``` routes. These are important, since they direct you to the login page to use the API.

```index.js``` file:

You may want to change the ```callbackURL```. You will have to change it when you deploy to Heroku, or any other place by replacing ```localhost:9000``` to ```myapp.herokuapp.com/oauth_callback```, for example.

```var callbackUrl = "http://localhost:9001/oauth_callback";```


If you have any suggestions, feel free to email me or send a pull request. It is the aim of this project to continue to develop. I hope to add APIs for Twitter and possibly Facebook soon.

##License
The MIT License (MIT)

Copyright (c) 2014 Abdullah J. Alger

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
