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

import React from "react";

function OutputBox({ qrCode }) {
  return (
    <div className="flex flex-col items-center gap-10">
      <img src={qrCode} alt="Generated QR Code" />
      <a href={qrCode} download="QRCode">
        <button className="h-9 w-24 text-lg text-white bg-green-600 shadow-md hover:bg-green-700 active:shadow-none">
          Download
        </button>
      </a>
    </div>
  );
}

export default OutputBox;
