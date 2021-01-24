window.onload = () => {
  if (getCookie("isLogin") == "") {
    setCookie("isLogin", "false");
  }
  if (getCookie("isLogin") === "false") {
    window.location.replace("http://127.0.0.1:5500/signIn.html");
  }
  document.getElementById("welcome").innerHTML = "Hi " + getCookie("email");
  var today = new Date();
  var dd = String(today.getDate()).padStart(2, "0");
  var mm = String(today.getMonth() + 1).padStart(2, "0"); //January is 0!
  var yyyy = today.getFullYear();
  var hour = today.getHours();
  var min = today.getMinutes();
  today = hour + ":" + min + " - " + +dd + "/" + mm + "/" + yyyy;
  document.getElementById("currDate").innerHTML = today;
};

const logout = () => {
  delete_cookie("isLogin");
  delete_cookie("token");
  delete_cookie("email");
  window.location.replace("http://127.0.0.1:5500");
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

function delete_cookie(name) {
  document.cookie = name + "=; Path=/; Expires=Thu, 01 Jan 1970 00:00:01 GMT;";
}
