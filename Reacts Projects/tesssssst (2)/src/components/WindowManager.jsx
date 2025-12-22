/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { useStore } from '../store/useStore'
import AboutApp from '../apps/AboutApp'

export default function WindowManager() {
  const windows = useStore(s => s.windows)

  return (
    <>
      {windows.about && <AboutApp />}
    </>
  )
}
