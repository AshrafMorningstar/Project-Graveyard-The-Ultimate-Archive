/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React, { useEffect, useState } from "react";
import Header from "./components/Header";
import InputBox from "./components/Inputbox";
import ExtraOptions from "./components/ExtraOptions";
import OutputBox from "./components/OutputBox";
import "./App.css";

function App() {
  const [temp, setTemp] = useState("");
  const [word, setWord] = useState("");
  const [size, setSize] = useState(200);
  const [bgColor, setBgColor] = useState("ffffff");
  const [qrCode, setQrCode] = useState("");

  // Changing the URL only when the user changes the input
  useEffect(() => {
    setQrCode(
      `http://api.qrserver.com/v1/create-qr-code/?data=${word}!&size=${size}x${size}&bgcolor=${bgColor}`
    );
  }, [word, size, bgColor]);

  // Updating the input word when user clicks on the generate button
  function handleClick() {
    setWord(temp);
  }

  return (
    <div className="flex flex-col items-center gap-12 pt-8">
      <Header />
      <div className="flex flex-col items-center gap-4">
        <InputBox setTemp={setTemp} handleClick={handleClick} />
        <ExtraOptions setBgColor={setBgColor} size={size} setSize={setSize} />
      </div>
      <OutputBox qrCode={qrCode} />
    </div>
  );
}

export default App;
