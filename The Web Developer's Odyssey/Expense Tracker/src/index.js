/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

/**
 * Maintainer: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 */

import React from "react";
import ReactDOM from "react-dom";
import { SpeechProvider } from '@speechly/react-client';
import { Provider } from "./context/context";
import App from "./App";
import "./index.css";

ReactDOM.render(
  <SpeechProvider appId="a8683a14-d5a5-45de-a181-f802999ee72e" language="en-US">
    <Provider>
      <App />
    </Provider>
  </SpeechProvider>,
  document.getElementById('root'),
);
