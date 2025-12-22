/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import AppWindow from '../components/Window'

export default function AboutApp() {
  return (
    <AppWindow title="About Ashraf Morningstar">
      <p className="text-sm leading-relaxed">
        Ashraf Morningstar is a creative frontend developer and software engineer
        who builds interactive web experiences using modern JavaScript,
        animations, and clean architecture.
      </p>
      <a
        href="https://github.com/AshrafMorningstar"
        target="_blank"
        rel="noopener noreferrer"
        className="text-blue-400 underline text-sm"
      >
        Visit GitHub
      </a>
    </AppWindow>
  )
}
