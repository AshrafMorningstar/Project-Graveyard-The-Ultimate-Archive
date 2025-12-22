/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

export default function AppWindow({ title, children }) {
  return (
    <div className="absolute top-24 left-24 w-96 bg-neutral-800 rounded-xl shadow-2xl">
      <div className="h-8 px-3 flex items-center bg-neutral-900 rounded-t-xl text-xs">
        {title}
      </div>
      <div className="p-4 space-y-3">
        {children}
      </div>
    </div>
  )
}
