var evervoice=angular.module("evervoiceApp",[]);evervoice.config(function(e){console.log(e.defaults.headers.post)}),evervoice.controller("myCtrl",["$scope","voiceRecord","$http",function(e,n,o){n.setListener(function(n){e.$apply(function(){e.interimTranscript=n,console.log("Transcript: ",e.interimTranscript)})}),e.dictate=function(){n.startRecognition()},e.createNote=function(){var n=JSON.stringify({content:e.interimTranscript});o.post("/postNote",n).success(function(e,n){console.log("success",n)}).error(function(e,n){console.log("error",n)})}}]),evervoice.service("voiceRecord",function(){var e;return{setListener:function(n){e=n},startRecognition:function(){var n=new webkitSpeechRecognition,o=!0;n.lang=["English",["en-US","United States"]],n.continuous=!0,n.interimResults=!0,n.onstart=function(){console.log("Recognizing speech...")},n.onspeechend=function(){console.log("Speech processed."),o=!1},n.onresult=function(n){for(var o="",t=n.resultIndex;t<n.results.length;t++)o=n.results[t][0].transcript,e&&e(o)},n.start()}}});