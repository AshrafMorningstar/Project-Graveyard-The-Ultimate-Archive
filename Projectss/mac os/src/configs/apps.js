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

import { Folder, FileText, Cpu, Mail, Image, Archive, Terminal, Settings, Brain, Shapes, UserCircle, Music as MusicIcon, Calculator, StickyNote, Calendar as CalendarIcon, Sun, Camera, Pencil, Gamepad2, Map, List, Clock as ClockIcon, Book, TrendingUp, Mic, User, Grid, Github, Layout, Table, Presentation, Activity, HardDrive, Radio, ShoppingBag, Languages, Home, LocateFixed, Video, CreditCard, Command, Palette, History, Type, PenTool, Trash2 } from 'lucide-react';

export const apps = [
  {
    id: 'portfolio',
    title: 'Project Nebula',
    icon: Folder,
    desktop: true,
  },
  {
    id: 'profile',
    title: 'Cosmic Profile',
    icon: UserCircle,
  },
  {
      id: 'neuro-ai',
      title: 'Neuro AI',
      icon: Brain
  },
  {
      id: 'matter-shaper',
      title: 'Matter Shaper',
      icon: Shapes
  },
  {
    id: 'articles',
    title: 'Latest Updates', 
    icon: FileText,
  },
  {
    id: 'skills',
    title: 'My Skills',
    icon: Cpu,
  },
  {
    id: 'gallery',
    title: 'Gallery',
    icon: Image,
  },
  {
    id: 'contact',
    title: 'Contact Me',
    icon: Mail,
  },
  {
    id: 'archive',
    title: 'Archive',
    icon: Archive
  },
  {
     id: 'terminal',
     title: 'Chronos Terminal',
     icon: Terminal
  },
  {
      id: 'settings',
      title: 'System Prefs',
      icon: Settings
  },
  {
      id: 'music',
      title: 'Music',
      icon: MusicIcon
  },
  {
      id: 'calculator',
      title: 'Calculator',
      icon: Calculator
  },
  {
      id: 'notepad',
      title: 'Notes',
      icon: StickyNote
  },
  {
      id: 'calendar',
      title: 'Calendar',
      icon: CalendarIcon
  },
  {
      id: 'finder',
      title: 'Finder',
      icon: Folder,
      desktop: true // Ensure desktop icons open it? Actually handled by desktop icon logic normally, but here we just map icons
  },
  {
      id: 'safari',
      title: 'Safari',
      icon: FileText 
  },
  {
      id: 'messages',
      title: 'Messages',
      icon: Mail
  },
  {
      id: 'vscode',
      title: 'VS Code',
      icon: Terminal
  },
  {
      id: 'photos',
      title: 'Photos',
      icon: Image
  },
  {
      id: 'weather',
      title: 'Weather',
      icon: Sun
  },
  {
      id: 'camera',
      title: 'Camera',
      icon: Camera
  },
  {
      id: 'paint',
      title: 'Paint',
      icon: Pencil
  },
  {
      id: 'tictactoe',
      title: 'Tic Tac Toe',
      icon: Gamepad2
  },
  {
      id: 'mail',
      title: 'Mail',
      icon: Mail
  },
  {
      id: 'maps',
      title: 'Maps',
      icon: Map
  },
  {
      id: 'reminders',
      title: 'Reminders',
      icon: List
  },
  {
      id: 'photos',
      title: 'Photos',
      icon: Image
  },
  {
      id: 'clock',
      title: 'Clock',
      icon: ClockIcon
  },
  {
      id: 'stocks',
      title: 'Stocks',
      icon: TrendingUp
  },
  {
      id: 'books',
      title: 'Books',
      icon: Book
  },
  {
      id: 'voicememos',
      title: 'Voice Memos',
      icon: Mic
  },
  {
      id: 'contacts',
      title: 'Contacts',
      icon: User
  },
  {
      id: 'github',
      title: 'GitHub',
      icon: Github
  },
  {
      id: 'appstore',
      title: 'App Store',
      icon: ShoppingBag
  },
  {
      id: 'podcasts',
      title: 'Podcasts',
      icon: Radio
  },
  {
      id: 'pages',
      title: 'Pages',
      icon: Layout
  },
  {
      id: 'numbers',
      title: 'Numbers',
      icon: Table
  },
  {
      id: 'keynote',
      title: 'Keynote',
      icon: Presentation
  },
  {
      id: 'activity',
      title: 'Activity',
      icon: Activity
  },
  {
      id: 'disk',
      title: 'Disk Utility',
      icon: HardDrive
  },
  {
      id: 'translate',
      title: 'Translate',
      icon: Languages
  },
  {
      id: 'home',
      title: 'Home',
      icon: Home
  },
  {
      id: 'findmy',
      title: 'Find My',
      icon: LocateFixed
  },
  { id: 'facetime', title: 'FaceTime', icon: Video },
  { id: 'wallet', title: 'Wallet', icon: CreditCard },
  { id: 'shortcuts', title: 'Shortcuts', icon: Command },
  { id: 'freeform', title: 'Freeform', icon: Shapes },
  { id: 'stickies', title: 'Stickies', icon: StickyNote },
  { id: 'textedit', title: 'TextEdit', icon: PenTool },
  { id: 'dictionary', title: 'Dictionary', icon: Book },
  { id: 'fontbook', title: 'Font Book', icon: Type },
  { id: 'grapher', title: 'Grapher', icon: Activity },
  { id: 'colormeter', title: 'Color Meter', icon: Palette },
  { id: 'chess', title: 'Chess', icon: Grid },
  { id: 'solitaire', title: 'Solitaire', icon: Grid },
  { id: 'sudoku', title: 'Sudoku', icon: Grid },
  { id: 'minesweeper', title: 'Minesweeper', icon: Grid },
  { id: 'game2048', title: '2048', icon: Grid },
  { id: 'dinorun', title: 'Dino Run', icon: Grid },
  { id: 'timemachine', title: 'Time Machine', icon: History },
  { id: 'devtools', title: 'DevTools', icon: Terminal },
  { id: 'recyclebin', title: 'Bin', icon: Trash2 },
];

// Note: I am reusing icon imports or need to add new ones. 
// Assuming some icons need to be imported. I will handle imports in a separate step or try to batch.
// Actually replace is safer.

export const socialLinks = [
    {
        id: 'github',
        title: 'GitHub',
        icon: Github,
        url: 'https://github.com/AshrafMorningstar' // From prev context
    },
    {
        id: 'linkedin',
        title: 'LinkedIn',
        icon: Linkedin,
        url: 'https://linkedin.com' // Placeholder
    }
]
