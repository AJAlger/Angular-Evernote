exampleGetUser(function(err, user) {
    if(err) {
        alert('Invalid Authentication')
        window.location = '/';
    }else{
        $('#username').text(user.username)
    }
});
