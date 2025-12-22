/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

export default function Home() {
  return (
    <main className="flex-1 flex flex-col items-center justify-center p-8 text-center">
      <h1 className="text-4xl md:text-6xl font-bold bg-gradient-to-r from-green-400 to-green-600 text-transparent bg-clip-text mb-6">
        Music for everyone.
      </h1>
      <p className="text-xl text-gray-400 max-w-2xl mb-8">
        Millions of songs. No credit card needed.
      </p>
      
      <div className="flex gap-4">
        <a 
          href="/login" 
          className="bg-primary text-black font-bold py-3 px-8 rounded-full hover:scale-105 transition-transform"
        >
          Get Started
        </a>
        <a 
          href="/browse" 
          className="border border-gray-500 text-white font-bold py-3 px-8 rounded-full hover:border-white transition-colors"
        >
          Browse Web Player
        </a>
      </div>
    </main>
  );
}
