$(function () {
	let token = getCookie("token");
	if (token === undefined) {
		window.location.href = "http://127.0.0.1:5500/public/login.html";
	} else {
		console.log("login success");
	}
});

function getCookie(cookieName) {
	let cookie = {};
	document.cookie.split(";").forEach(function (el) {
		let [key, value] = el.split("=");
		cookie[key.trim()] = value;
	});
	return cookie[cookieName];
}
