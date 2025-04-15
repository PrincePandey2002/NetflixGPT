import { useRef, useState } from "react";
import Header from "./Header";
import { checkValidation } from "../utils/checkValidation";
import {
  createUserWithEmailAndPassword,
  signInWithEmailAndPassword,
  updateProfile,
} from "firebase/auth";
import { auth } from "../utils/firebase";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { BG_IMAGE, USER_AVATAR } from "../utils/constants";

const Login = () => {
  const [isSignInForm, setIsSignInForm] = useState(true);
  const [errorMessage, setErrorMessage] = useState(null);
  const dispatch=useDispatch();
  const name = useRef(null);
  const email = useRef(null);
  const password = useRef(null);

  function toggleSignInForm() {
    setIsSignInForm(!isSignInForm);
  }
  function handleFormSubmission() {
    const message = checkValidation(
      email.current.value,
      password.current.value
    );
    setErrorMessage(message);

    //if the message is not null, means there is an error in email or password
    if (message) {
      // console.log(message);
      return;
    }

    if (!isSignInForm) {
      // Sign Up Logic
      createUserWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          const user = userCredential.user;
          // (user);
          updateProfile(user, {
            displayName: name.current.value,
            photoURL: USER_AVATAR,
          })
            .then(() => {
              const { uid, email, displayName,photoURL } = auth.currentUser;
              dispatch(addUser({ uid: uid, email: email, displayName: displayName,photoURL:photoURL }));
            })
            .catch((error) => {
              setErrorMessage(error.message);
            });
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    } else {
      // Sign In Logic
      signInWithEmailAndPassword(
        auth,
        email.current.value,
        password.current.value
      )
        .then((userCredential) => {
          // Signed in
          const user = userCredential.user;
          // console.log(user);
        })
        .catch((error) => {
          const errorCode = error.code;
          const errorMessage = error.message;
          setErrorMessage(errorCode + "-" + errorMessage);
        });
    }
  }

  return (
    <div>
      <Header />
      <div className="absolute ">
        <img className="h-screen object-cover md:w-screen" src={BG_IMAGE}></img>
      </div>
      <form
        onSubmit={(e) => e.preventDefault()}
        className=" absolute w-8/12 md:w-3/12 p-4 md:p-12 my-24 md:my-36 mx-auto left-0 right-0 text-[#ffffff] bg-[#060606] opacity-90 rounded"
      >
        <h1 className=" md:my-2 font-bold  md:text-3xl">
          {isSignInForm ? "Sign in" : "Sign up"}
        </h1>
        {!isSignInForm && (
          <input
            className="p-2 mt-2 mb-2 md:p-4 md:my-4 w-full rounded bg-transparent border md:font-[700] placeholder:font-normal peer border-white"
            type="text"
            placeholder="Full Name"
            ref={name}
          ></input>
        )}
        <input
          className="p-2 mt-2 mb-2 md:p-4 md:my-4 w-full rounded  bg-transparent border font-[300] md:font-[700] placeholder:font-normal peer border-white"
          type="text"
          placeholder="Email Address"
          ref={email}
        />
        <input
          className="p-2 my-2 md:p-4 md:my-4 w-full rounded  bg-transparent border font-[300] md:font-[700] placeholder:font-normal peer border-white"
          type="password"
          placeholder="Password"
          ref={password}
        ></input>
        {errorMessage && (
          <p className="text-red-500 font-bold text-lg">{errorMessage}</p>
        )}
        <button
          className="p-2 my-2 md:p-4 md:my-6 rounded bg-[#b20710]  w-full "
          onClick={handleFormSubmission}
        >
          {isSignInForm ? "Sign in" : "Sign up"}
        </button>
        <h1>
          {isSignInForm ? "New to Netflix?" : "Already registered?"}{" "}
          <span
            className="cursor-pointer font-bold hover:underline"
            onClick={toggleSignInForm}
          >
            {isSignInForm ? "Sign up now" : "Sign in now"}
          </span>
        </h1>
      </form>
    </div>
  );
};
export default Login;
