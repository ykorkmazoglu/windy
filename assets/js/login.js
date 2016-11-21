
(function($){
    var username = localStorage.getItem('nurego-user');
    if(username != null && username != "null"){
        $('body').addClass('loggedin');
        $('.login-link a').text(username)
        $('.login-link a').attr('href','javascript:void(0)');
        $('.login-link a').click(function(e){
            localStorage.setItem('nurego-user',null);
            window.location.href = "index.html";
        })
    }
})($)
