const loggedOutLinks = document.querySelectorAll(".logged-out");
const loggedInLinks = document.querySelectorAll(".logged-in");
const map = document.getElementById("map");
const loginCheck = (user) => {
  if (user) {
    loggedInLinks.forEach((link) => {
      link.style.display = "block";
    });
    loggedOutLinks.forEach((link) => {
      link.style.display = "none";
    });
    map.style.display = "block";
  } else {
    loggedInLinks.forEach((link) => {
      link.style.display = "none";
    });
    loggedOutLinks.forEach((link) => {
      link.style.display = "block";
    });
    map.style.display = "none";
  }
};

//SignUp
const signupForm = document.querySelector("#signup-form");

signupForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.querySelector("#signup-email").value;
  const password = document.querySelector("#signup-password").value;
  auth
    .createUserWithEmailAndPassword(email, password)
    .then((userCredential) => {
      signupForm.reset();
      $("#signupModal").modal("hide");
      console.log("signup");
    });
});

//SignIn
const signinForm = document.querySelector("#login-form");

signinForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const email = document.querySelector("#login-email").value;
  const password = document.querySelector("#login-password").value;
  auth.signInWithEmailAndPassword(email, password).then((userCredential) => {
    signupForm.reset();
    $("#signinModal").modal("hide");
    console.log("signin");
  });
});

const logout = document.querySelector("#logout");

logout.addEventListener("click", (e) => {
  e.preventDefault();
  auth.signOut().then(() => {
    console.log("sign out");
  });
});

//google Login
const googleButton = document.querySelector("#googleLogin");

googleButton.addEventListener("click", (e) => {
  const provider = new firebase.auth.GoogleAuthProvider();
  auth
    .signInWithPopup(provider)
    .then((result) => {
      signupForm.reset();
      $("#signinModal").modal("hide");
    })
    .catch((err) => {
      console.log(err);
    });
});

//Facebook Login
const facebookButton = document.querySelector("#facebookLogin");

facebookButton.addEventListener("click", (e) => {
  e.preventDefault();
  const provider = new firebase.auth.FacebookAuthProvider();
  auth
    .signInWithPopup(provider)
    .then((result) => {
      signupForm.reset();
      $("#signinModal").modal("hide");
    })
    .catch((err) => {
      console.log(err);
    });
});

//Posts
const postList = document.querySelector(".posts");

const setupPosts = (data) => {
  if (data.length) {
    let html = "";
    data.forEach((doc) => {
      const post = doc.data();
      const li = `
                  <div class="card col-12 col-sm-6 col-md-4" style="width: 18rem;">
                  <img src='./images/${post.imagen}' class="card-img-top" alt="...">
                  <div class="card-body">
                  <h5 class="card-title">${post.title}</h5>
                  <p class="card-text">${post.description}.</p>
                  <a href="https://github.com/BestoWaifu02" class="btn btn-primary">Contacta al vendedor</a>
                  </div>
            </div>
          `;
      html += li;
      postList.innerHTML = html;
    });
  } else {
    postList.innerHTML = `<p class='text-center'>Logeate para ver las publicaciones</p>`;
  }
};

//Events
//List for auth state changes
auth.onAuthStateChanged((user) => {
  if (user) {
    fs.collection("posts")
      .get()
      .then((snapshot) => {
        setupPosts(snapshot.docs);
        loginCheck(user);
      });
  } else {
    setupPosts([]);
    loginCheck(user);
  }
});

//Consumiendo API Clima

const getClima = async () => {
  const cityValue = "León";
  const countryValue = "Mx";
  WEATHER_KEY = "d4c3616ace82a1c186dd0e884c61bbba";

  const URI = `https://api.openweathermap.org/data/2.5/weather?q=${cityValue},${countryValue}&appid=${WEATHER_KEY}&units=metric`;
  const response = await fetch(URI);
  const data = await response.json();
  console.log(data.main.temp, data.name, data.sys.country);

  const Ciudad = document.getElementById("Ciudad");
  const Pais = document.getElementById("Pais");
  const Temp = document.getElementById("Temp");
  const Hum = document.getElementById("Hum");

  Ciudad.innerHTML = data.name;
  Pais.innerHTML = data.sys.country;
  Temp.innerHTML = data.main.temp;
  Hum.innerHTML = data.main.humidity;
};

getClima();
