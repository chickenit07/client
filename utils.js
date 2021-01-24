window.onload = () => {
  if (getCookie("isLogin") == "") {
    setCookie("isLogin", "false");
  }
  if (getCookie("isLogin") === "false") {
    window.location.replace("http://127.0.0.1:5500/signIn.html");
  }
};
const init = () => {
  document.getElementById("welcome").innerHTML = "Hi " + getCookie("email");
};
function getCookie(cname) {
  var name = cname + "=";
  var decodedCookie = decodeURIComponent(document.cookie);
  var ca = decodedCookie.split(";");
  for (var i = 0; i < ca.length; i++) {
    var c = ca[i];
    while (c.charAt(0) == " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) == 0) {
      return c.substring(name.length, c.length);
    }
  }
  return "";
}
