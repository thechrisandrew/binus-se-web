$(function(){
    $("#signOut").click(()=>{
	    document.cookie = "token=";
        window.location.href = "http://127.0.0.1:5500/public/login.html"
    });
});