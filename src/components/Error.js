import React from "react";
import Header from "./Header";

const Error = () => {
  return (
    <div>
      <Header />
      <div className="bg-black w-screen h-screen text-white flex justify-center items-center ">
        <div className=" w-[90%] md:w-1/2 flex flex-col justify-center items-center h-3/4">
          <h1 className=" text-2xl md:text-4xl font-bold text-center md:mt-0 mt-12  mb-4">
            Oops! Something Went Wrong
          </h1>
          <p className="w-[90%] md:text-[18px] mx-auto mb-4">
            We are unable to fetch the data right now. This could be due to a
            network issue. Don't worry, here are a few things you can try:
          </p>
          <ul className="list-disc list-inside text-white">
            <li>
              <span className="text-red-600 font-bold text-[18px] hover:underline">Refresh</span> the Page 
            </li>
            <li className="list-none ml-6 mb-4">Sometimes a simple refresh does the trick! Please
            try refreshing the page once.</li>
            <li >
                <span className="text-red-600 font-bold text-[18px] hover:underline">Check your Network </span>
              
            </li>
            <li className="list-none ml-6">If you're using a <span className="text-red-600 font-bold text-[18px] hover:underline">JIO</span> connection, our system
              may have trouble fetching the data from our servers. Try switching
              to another network like Wi-Fi or a different mobile data provider.</li>
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Error;
