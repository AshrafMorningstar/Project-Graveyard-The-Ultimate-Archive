/*
 * -----------------------------------------------------------------------------
 * @author      Ashraf Morningstar
 * @github      https://github.com/AshrafMorningstar
 * @repository  Project Graveyard - The Ultimate Archive
 * @quote       "Code that defines the future. Designed to inspire."
 * -----------------------------------------------------------------------------
*/

import { useState, useRef, useEffect } from 'react'

export default function Terminal() {
  const [history, setHistory] = useState<string[]>(['Welcome to M-Star Terminal v2.0.0', 'Type "help" for a list of commands.'])
  const [input, setInput] = useState('')
  const [commandHistory, setCommandHistory] = useState<string[]>([])
  const [historyIndex, setHistoryIndex] = useState(-1)
  const inputRef = useRef<HTMLInputElement>(null)
  const bottomRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' })
  }, [history])

  const handleContainerClick = () => {
    inputRef.current?.focus()
  }

  const handleCommand = async (cmd: string) => {
    if (!cmd.trim()) return

    const args = cmd.trim().split(' ')
    const command = args[0].toLowerCase()

    setCommandHistory(prev => [cmd, ...prev])
    setHistoryIndex(-1)

    let output: string | string[] = ''

    switch (command) {
      case 'help':
        output = `Available commands:
  help       - Show this help message
  clear      - Clear the terminal
  about      - Display user info
  projects   - List projects
  github     - Open GitHub
  neofetch   - Show system info
  whoami     - Display current user
  sudo       - Execute a command as superuser
  ls         - List directory contents
  echo [msg] - Print a message`
        break
      case 'clear':
        setHistory([])
        return
      case 'about':
        output = 'Ashraf Morningstar - Full Stack Developer | React, Next.js, Node.js'
        break
      case 'projects':
        output = 'Checking projects... Found 10+ active projects. Open "Projects" app for details.'
        break
      case 'github':
        output = 'Opening GitHub...'
        window.open('https://github.com/AshrafMorningstar', '_blank')
        break
      case 'whoami':
        output = 'admin@morningstar-os'
        break
      case 'ls':
        output = 'Desktop  Documents  Downloads  Music  Pictures  Public  Templates  Videos'
        break
      case 'sudo':
        output = 'User is not in the sudoers file. This incident will be reported.'
        break
      case 'neofetch':
        output = [
          `                   -` ,
          `                  .o+` ,
          `                 .ooo/` ,
          `                .ooooo:` ,
          `               .ooooooo.` ,
          `              .ooooooooo` ,
          `             .oooooooooo+` ,
          `            .oooooooooooo:` ,
          `           .oooooooooooooo.` ,
          `          .oooooooooooooooo` ,
          `         .ooooooooooooooooo+` ,
          `        .ooooooooooooooooooo:` ,
          `       .ooooooooooooooooooooo.` ,
          `      .oooooooooooooooooooooo` ,
          `     .ooooooooooooooooooooooo+` ,
          `    .ooooooooooooooooooooooooo:` ,
          `    ...........................` ,
          ``,
          `   OS: Morningstar OS x86_64`,
          `   Host: Quantum Mainframe`,
          `   Kernel: 5.15.0-custom`,
          `   Uptime: 24 mins`,
          `   Packages: 128 (dpkg)`,
          `   Shell: zsh 5.8`,
          `   Resolution: 1920x1080`,
          `   DE: Aqua`,
          `   WM: M-Star`,
          `   Theme: Dark [GTK2/3]`,
          `   Icons: Lucide [GTK2/3]`,
          `   Terminal: M-Term`,
          `   CPU: Quantum Core i9 (16) @ 5.0GHz`,
          `   GPU: NVIDIA RTX 4090 Ti`,
          `   Memory: 16384MiB / 32768MiB`
        ].join('\n')
        break
      case 'echo':
        output = args.slice(1).join(' ')
        break
      default:
        output = `Command not found: ${command}`
    }

    setHistory(prev => [...prev, `➤ ${cmd}`, output as string])
  }

  const handleKeyDown = (e: React.KeyboardEvent) => {
    if (e.key === 'Enter') {
      handleCommand(input)
      setInput('')
    } else if (e.key === 'ArrowUp') {
      e.preventDefault()
      if (historyIndex < commandHistory.length - 1) {
        const newIndex = historyIndex + 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      }
    } else if (e.key === 'ArrowDown') {
      e.preventDefault()
      if (historyIndex > 0) {
        const newIndex = historyIndex - 1
        setHistoryIndex(newIndex)
        setInput(commandHistory[newIndex])
      } else {
        setHistoryIndex(-1)
        setInput('')
      }
    }
  }

  return (
    <div 
      className="h-full bg-black/95 text-green-400 font-mono p-4 overflow-hidden flex flex-col font-sm leading-relaxed"
      onClick={handleContainerClick}
    >
      <div className="flex-1 overflow-y-auto scrollbar-hide">
        {history.map((line, i) => (
          <div key={i} className={`whitespace-pre-wrap break-words mb-1 ${line.startsWith('➤') ? 'text-pink-400 font-bold' : ''}`}>
             {line}
          </div>
        ))}
        <div ref={bottomRef} />
      </div>
      <div className="flex items-center gap-2 mt-2 pt-2 border-t border-green-900/30">
        <span className="text-pink-500 font-bold">➜</span>
        <span className="text-cyan-400 font-bold">~</span>
        <input
          ref={inputRef}
          type="text"
          value={input}
          onChange={(e) => setInput(e.target.value)}
          onKeyDown={handleKeyDown}
          className="flex-1 bg-transparent outline-none border-none text-green-400 focus:ring-0 placeholder-green-800"
          autoFocus
          spellCheck={false}
          placeholder="Enter command..."
        />
      </div>
    </div>
  )
}
