const baseUrl = "https://iot-demo1.herokuapp.com";

const submitLoginForm = () => {
  const form = document.getElementById("loginForm");
  let data = {
    email: form.email.value,
    password: form.password.value,
  };
  var obj = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(baseUrl + "/users/signin", obj)
    .then((response) => response.json())
    .then((response) => {
      if (response.success === true) {
        setCookie("isLogin", true);
        setCookie("token", response.result.accessToken);
        setCookie("email", response.result.email);
        window.location.replace("http://127.0.0.1:5500");
      } else alert(response.message);
    });
};

const submitRegisterForm = () => {
  const form = document.getElementById("loginForm");
  let data = {
    email: form.email.value,
    password: form.password.value,
  };
  var obj = {
    crossDomain: true,
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(baseUrl + "/users/signup", obj)
    .then((response) => response.json())
    .then((response) => {
      alert(response.message);
      if (response.success) window.location.replace("http://127.0.0.1:5500");
    });
};

const submitDateForm = () => {
  const form = document.getElementById("dateForm");
  let data = {
    email: getCookie("email"),
    token: getCookie("token"),
    date: convertDate(form.date.value),
  };
  var obj = {
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(baseUrl + "/sensors/data/average", obj)
    .then((response) => response.json())
    .then((response) => {
      if (response.status !== 1) {
        return;
      }
      if (response.data.status === 1) {
        document.getElementById("chosenDate").innerHTML = convertDate(
          form.date.value
        );
        document.getElementById(
          "averageTemp"
        ).innerHTML = response.data.average_temperature.toFixed(2);
        document.getElementById(
          "averageHumi"
        ).innerHTML = response.data.average_humidity.toFixed(2);
      } else {
        document.getElementById("chosenDate").innerHTML = convertDate(
          form.date.value
        );
        document.getElementById(
          "averageTemp"
        ).innerHTML = "unknown";
        document.getElementById(
          "averageHumi"
        ).innerHTML = "unknown";
      }
    });
};

function convertDate(inputFormat) {
  function pad(s) {
    return s < 10 ? "0" + s : s;
  }
  var d = new Date(inputFormat);
  return [pad(d.getDate()), pad(d.getMonth() + 1), d.getFullYear()].join("-");
}

const toggleLight = () => {
  var toggleLight = document.getElementById("toggleLight");
  if (toggleLight.checked) {
    turnOnLight();
  } else turnOffLight();
};

const turnOnLight = () => {
  let data = {
    email: getCookie("email"),
    token: getCookie("token"),
  };
  var obj = {
    crossDomain: true,
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(baseUrl + "/sensors/handle/led/on", obj)
    .then((response) => response.json())
    .then((response) => {});
};
const turnOffLight = () => {
  let data = {
    email: getCookie("email"),
    token: getCookie("token"),
  };
  var obj = {
    crossDomain: true,
    method: "POST",
    mode: "cors",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(data),
  };
  fetch(baseUrl + "/sensors/handle/led/off", obj)
    .then((response) => response.json())
    .then((response) => {});
};

function setCookie(cname, cvalue) {
  document.cookie = cname + "=" + cvalue + ";" + "path=/";
}

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
