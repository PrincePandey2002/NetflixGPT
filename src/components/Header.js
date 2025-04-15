import React, { useEffect } from "react";
import { onAuthStateChanged, signOut } from "firebase/auth";
import { auth } from "../utils/firebase";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { addUser, removeUser } from "../utils/userSlice";
import { LOGO, SUPPORTED_LANGUAGES } from "../utils/constants";
import { toogleGptSearchView } from "../utils/gptSlice";
import { changeLanguage } from "../utils/configSlice";
import lang from "../utils/languageConstants";

const Header = () => {
  const langKey=useSelector(store=>store.config.lang);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const showGptSearch=useSelector(store=>store.gpt.showGptSearch);
  const user = useSelector((store) => store.user);

  const handleSignOut = () => {
    signOut(auth)
      .then(() => {})
      .catch((error) => {
        navigate("/error");
      });
  };

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        const { uid, email, displayName, photoURL } = user;
        dispatch(
          addUser({
            uid: uid,
            email: email,
            displayName: displayName,
            photoURL: photoURL,
          })
        );
        navigate("/browse");
      } else {
        dispatch(removeUser());
        navigate("/");
      }
    });
    return () => unsubscribe();
  }, []);

  const handleGptSearchView = () => {
    dispatch(toogleGptSearchView());
  };

  const handleChangeLanguage = (e) => {
    dispatch(changeLanguage(e.target.value));
  };
  return (
    <div className="absolute w-screen px-8 py-2 bg-gradient-to-b from-black z-10 flex flex-col md:flex-row justify-between">
      {/* <div > */}
        <h1 className="text-red-600 mx-auto md:mx-4 text-3xl md:text-5xl font-bold mt-4">{lang[langKey].NetflixGPT}</h1>
      {/* <img className="w-32 md:w-44 mx-auto md:mx-0" src={LOGO} alt="Netflix logo"></img>
      <span className="text-red-600 text-5xl font-bold w-32 md:w-44 mx-auto md:mx-0">GPT</span> */}
      {/* </div> */}
      {user && (
        <div className="flex p-2 gap-2 items-center">
           
            <select
              className="p-2 m-2 bg-gray-800 text-white rounded-lg "
              onChange={handleChangeLanguage}
            >
              {SUPPORTED_LANGUAGES.map((language) => (
                <option key={language.identifier} value={language.identifier}>
                  {language.name}
                </option>
              ))}
            </select>
          
          <button
            onClick={handleGptSearchView}
            className="mx-auto md:mx-2 my-2 px-2 py-1 md:px-4 md:py-2 bg-purple-800 text-white rounded-lg hover:opacity-90"
          >
            {!showGptSearch?<img src="https://img.icons8.com/?size=100&id=132&format=png&color=ffffff" className="w-5 h-5 mr-2 mb-1 inline-flex justify-between"></img>:<img src="https://img.icons8.com/?size=100&id=2797&format=png&color=ffffff" className="w-5 h-5 mr-2 mb-1 inline-flex justify-between"></img>}
            {showGptSearch ? "Home":"GPT Search"}
          </button>
          {/* <img
            src={user.photoURL}
            alt="userProfile"
            className="w-8 h-8 md:w-10 md:h-10 rounded "
          ></img> */}
          <button
            onClick={handleSignOut}
            className=" text-white hover:opacity-95 bg-blue-500 py-1 px-2 md:py-2 md:px-4 ml-2 rounded-lg"
          >
            Sign out
          </button>
        </div>
      )}
    </div>
  );
};

export default Header;
