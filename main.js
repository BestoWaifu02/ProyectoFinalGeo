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
    $("#signupModal").modal("hide");
    console.log("signin");
  });
});
