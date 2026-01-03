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

export default function SkeletonLoader() {
  return (
    <div className="w-full h-full p-4 space-y-4 animate-pulse">
      <div className="h-8 bg-gray-700/50 rounded w-1/3" />
      <div className="space-y-2">
        <div className="h-4 bg-gray-700/50 rounded" />
        <div className="h-4 bg-gray-700/50 rounded w-5/6" />
        <div className="h-4 bg-gray-700/50 rounded w-4/6" />
      </div>
      <div className="grid grid-cols-2 gap-4 pt-4">
        <div className="h-24 bg-gray-700/50 rounded" />
        <div className="h-24 bg-gray-700/50 rounded" />
      </div>
    </div>
  )
}
