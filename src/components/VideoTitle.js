import React from "react";

const VideoTitle = ({ title, overview }) => {
  return (
    <div className=" absolute w-screen aspect-video pt-[12%] px-6 md:px-24 text-white bg-gradient-to-r from-black">
      <h1 className="font-bold my-2 text-lg md:text-5xl md:my-6">{title}</h1>
      <p className="w-1/4 my-6 hidden md:inline-block">{overview}</p>
      <div className="flex flex-col md:flex-row items-start md:items-center">
        <button className='text-black bg-white px-2 py-1 md:px-6 md:py-2 rounded-lg md:font-bold md:text-lg '><img src="https://img.icons8.com/ios-glyphs/30/play--v1.png" className="h-5 w-5 md:h-7 md:w-7 inline-flex justify-center"></img> Play</button>


        <button className="text-white px-2 py-1 mt-2 bg-[rgb(61,74,92)] opacity-95 md:mx-4  md:px-3 md:py-2 rounded-lg md:font-bold md:text-lg">
          <img className="inline-flex md:w-7 md:h-7 mx-1 w-5 h-5 justify-center" src="https://img.icons8.com/pastel-glyph/128/FFFFFF/info--v1.png"></img>More Info
        </button>
      </div>
    </div>
  );
};

export default VideoTitle;
