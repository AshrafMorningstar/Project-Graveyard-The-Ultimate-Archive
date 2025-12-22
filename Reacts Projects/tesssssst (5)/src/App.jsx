/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import React from 'react';
import MenuBar from './components/UI/MenuBar';
import Dock from './components/Dock/Dock';
import Desktop from './components/UI/Desktop';
import { dockItems } from './components/Dock/Dock'; // To pre-register components mapping

// Import App Contents
import AboutApp from './components/Applications/AboutApp';
import ProjectsApp from './components/Applications/ProjectsApp';
import SkillsApp from './components/Applications/SkillsApp';
import ContactApp from './components/Applications/ContactApp';
import ResumeApp from './components/Applications/ResumeApp';
import useWindowStore from './stores/windowStore';

function App() {
  const { openWindow } = useWindowStore();
  
  // A mechanism to map IDs to components
  // In a real app this might be in a registry file
  const appRegistry = {
      about: AboutApp,
      projects: ProjectsApp,
      skills: SkillsApp,
      contact: ContactApp,
      resume: ResumeApp,
  };

  // Enhance the openWindow function to look up the component (hacky but works for this structure)
  // Actually, we should probably do this in the Dock or a separate controller. 
  // But since the Dock calls openWindow, we can just intercept or pass the component there.
  // Let's patch the Dock to use this registry if we can, or just pass it down.
  // Actually, easiest is to just have a useEffect that hydrates the store or just modifies how Dock calls it.

  // Better approach: The Dock imports the registry or we modify the Dock to just pass IDs and the Desktop/Window renders based on ID.
  // But my Window component takes `component` prop.
  // Let's update `Dock.jsx` to import these... wait, avoiding circular deps.
  // Let's just do a Registry here and Update the `Dock` logic to uses a specific "Launcher" function or similar.
  // SIMPLER: I'll just change `Dock.jsx` to NOT receive the component, and `Desktop.jsx` looks it up.
  // BUT `Window.jsx` renders `Content`.
  
  // Let's make a lookup map available to the store or handle it in the event.
  // I will cheat slightly and attach the lookup to the window button click handler in Dock.
  // Wait, I can't pass the Component function to the store easily if it's not serializable (redux rule, but zustand is fine with it).
  
  // I'll update Dock.jsx to import the components? No, circular dependency if App imports Dock and Dock imports Apps... wait strictly App->Dock is fine. Dock->Apps is fine. App->Apps is fine.
  // So I can modify Dock.jsx to import the apps.
  // But I am writing App.jsx now.
  // Let's just allow `openWindow` to take the component. I will update `Dock` in a subsequent step or overwriting it if needed.
  // Actually I already wrote `Dock.jsx` and it doesn't import the apps.
  // I will REWRITE `Dock.jsx` to include the app registry.

  return (
    <div className="h-screen w-screen overflow-hidden text-sm">
      <MenuBar />
      <Desktop /> {/* Desktop reads from store which contains the component references */}
      <Dock /> 
    </div>
  );
}

export default App;
