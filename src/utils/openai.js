// import OpenAI from "openai";
import { OPENAI_KEY } from "./constants";
// const openai=new OpenAI({
//     apiKey:process.env.REACT_APP_OPENAI_KEY,
//     dangerouslyAllowBrowser:true,
// })
// export default openai;
// src/utils/gemini.js

import { GoogleGenerativeAI } from "@google/generative-ai";

// Load key from .env
const openai = new GoogleGenerativeAI(OPENAI_KEY);
console.log("Gemini api key: ",OPENAI_KEY);

export default openai;
