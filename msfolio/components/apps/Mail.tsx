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

/**
 * @file Mail.tsx
 * @author Ashraf Morningstar <https://github.com/AshrafMorningstar>
 * @copyright 2025 Ashraf Morningstar
 * @license MIT
 *
 * 🌌 MSFolio - The Ultimate Microsoft-Style Portfolio
 * "The future is unwritten, but the code is compiled."
 */

import React, { useState } from 'react';
import { useStore } from '../../store/useStore';
import { soundService } from '../../utils/sound';

interface Email {
    id: number;
    from: string;
    subject: string;
    body: string;
    time: string;
    read: boolean;
}

const MOCK_EMAILS: Email[] = [
    { id: 1, from: "Google Cloud", subject: "Your Gemini API Key", body: "Welcome to Google Cloud. Your API usage has increased...", time: "10:30 AM", read: false },
    { id: 2, from: "GitHub", subject: "[AshrafMorningstar] Security Alert", body: "A new sign-in on device macOS detected.", time: "Yesterday", read: true },
    { id: 3, from: "Recruiter", subject: "Senior Frontend Role Opportunity", body: "Hi Ashraf, came across your portfolio and I'm impressed...", time: "2 days ago", read: false },
    { id: 4, from: "Vercel", subject: "Deployment Successful", body: "ashraf-os-v2 has been successfully deployed to production.", time: "Last Week", read: true },
];

const Mail: React.FC = () => {
  const [view, setView] = useState<'inbox' | 'compose'>('inbox');
  const [selectedEmail, setSelectedEmail] = useState<Email | null>(null);
  const [emails, setEmails] = useState(MOCK_EMAILS);
  
  // Compose State
  const [to, setTo] = useState('');
  const [subject, setSubject] = useState('');
  const [body, setBody] = useState('');
  const [sending, setSending] = useState(false);

  const { settings, addNotification } = useStore();

  const handleSelect = (email: Email) => {
      setSelectedEmail(email);
      setEmails(prev => prev.map(e => e.id === email.id ? {...e, read: true} : e));
      soundService.playClick();
  };

  const handleSend = (e: React.FormEvent) => {
      e.preventDefault();
      setSending(true);
      setTimeout(() => {
          setSending(false);
          setView('inbox');
          setTo('');
          setSubject('');
          setBody('');
          addNotification({
              title: "Mail Sent",
              message: `Email to ${to} sent successfully.`,
              appId: 'mail'
          });
          soundService.playClick();
      }, 1500);
  };

  return (
    <div className="h-full flex flex-col md:flex-row bg-white/5">
      {/* Sidebar List (Inbox) */}
      <div className={`w-full md:w-1/3 border-r border-white/10 flex flex-col ${(selectedEmail || view === 'compose') && 'hidden md:flex'}`}>
        <div className="p-3 border-b border-white/10 bg-white/5 flex justify-between items-center">
            <span className="font-semibold text-sm">Inbox</span>
            <button 
                onClick={() => { setView('compose'); setSelectedEmail(null); soundService.playClick(); }}
                className="w-6 h-6 rounded hover:bg-white/10 flex items-center justify-center text-lg leading-none"
            >
                +
            </button>
        </div>
        <div className="overflow-y-auto flex-1">
            {emails.map(email => (
                <div 
                    key={email.id}
                    onClick={() => handleSelect(email)}
                    className={`p-4 border-b border-white/5 cursor-pointer hover:bg-white/10 transition-colors ${selectedEmail?.id === email.id ? 'bg-white/10' : ''}`}
                >
                    <div className="flex justify-between mb-1">
                        <span className={`text-sm ${!email.read ? 'font-bold text-white' : 'text-gray-300'}`}>{email.from}</span>
                        <span className="text-xs text-gray-500">{email.time}</span>
                    </div>
                    <div className={`text-sm mb-1 truncate ${!email.read ? 'font-semibold text-white' : 'text-gray-300'}`}>{email.subject}</div>
                    <div className="text-xs text-gray-500 line-clamp-2">{email.body}</div>
                </div>
            ))}
        </div>
      </div>

      {/* Main Pane (Reading or Composing) */}
      <div className={`flex-1 bg-black/20 flex flex-col ${(!selectedEmail && view !== 'compose') && 'hidden md:flex'}`}>
        {view === 'compose' ? (
             <div className="h-full flex flex-col">
                 <div className="p-4 border-b border-white/10 flex items-center justify-between">
                     <button className="md:hidden text-xs text-blue-400" onClick={() => setView('inbox')}>Cancel</button>
                     <h3 className="font-bold text-white">New Message</h3>
                     <div className="w-8 md:hidden"></div>
                 </div>
                 <form onSubmit={handleSend} className="flex-1 flex flex-col p-4 gap-4">
                     <input 
                        type="email" 
                        placeholder="To:" 
                        required
                        value={to}
                        onChange={e => setTo(e.target.value)}
                        className="bg-transparent border-b border-white/10 p-2 text-white outline-none focus:border-blue-500"
                     />
                     <input 
                        type="text" 
                        placeholder="Subject:" 
                        required
                        value={subject}
                        onChange={e => setSubject(e.target.value)}
                        className="bg-transparent border-b border-white/10 p-2 text-white outline-none focus:border-blue-500"
                     />
                     <textarea 
                        placeholder="Message..." 
                        required
                        value={body}
                        onChange={e => setBody(e.target.value)}
                        className="flex-1 bg-transparent p-2 text-white outline-none resize-none"
                     />
                     <div className="flex justify-end">
                         <button 
                            type="submit" 
                            disabled={sending}
                            className="px-6 py-2 rounded text-white font-medium disabled:opacity-50 transition-all active:scale-95"
                            style={{ backgroundColor: settings.accentColor }}
                         >
                             {sending ? 'Sending...' : 'Send'}
                         </button>
                     </div>
                 </form>
             </div>
        ) : selectedEmail ? (
            <>
                <div className="p-6 border-b border-white/10 bg-white/5">
                    <button 
                        className="md:hidden mb-4 text-xs text-blue-400"
                        onClick={() => setSelectedEmail(null)}
                    >
                        &larr; Back to Inbox
                    </button>
                    <h2 className="text-xl font-bold text-white mb-2">{selectedEmail.subject}</h2>
                    <div className="flex justify-between items-center">
                        <div className="flex gap-2 items-center">
                            <div className="w-8 h-8 rounded-full bg-gradient-to-tr from-blue-500 to-purple-500 flex items-center justify-center font-bold text-white">
                                {selectedEmail.from[0]}
                            </div>
                            <div className="flex flex-col">
                                <span className="text-sm font-medium text-white">{selectedEmail.from}</span>
                                <span className="text-xs text-gray-400">To: Me</span>
                            </div>
                        </div>
                        <span className="text-xs text-gray-500">{selectedEmail.time}</span>
                    </div>
                </div>
                <div className="p-8 text-gray-200 leading-relaxed overflow-y-auto">
                    {selectedEmail.body}
                    <br/><br/>
                    <div className="w-full h-px bg-white/10 my-4" />
                    <button 
                        className="px-4 py-2 rounded text-sm text-white font-medium transition-colors"
                        style={{ backgroundColor: settings.accentColor }}
                        onClick={() => {
                            setTo(selectedEmail.from.toLowerCase().replace(' ', '') + '@example.com');
                            setSubject(`Re: ${selectedEmail.subject}`);
                            setView('compose');
                        }}
                    >
                        Reply
                    </button>
                </div>
            </>
        ) : (
            <div className="h-full flex flex-col items-center justify-center text-gray-500">
                <svg className="w-16 h-16 mb-4 opacity-20" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2.003 5.884L10 9.882l7.997-3.998A2 2 0 0016 4H4a2 2 0 00-1.997 1.884z" />
                    <path d="M18 8.118l-8 4-8-4V14a2 2 0 002 2h12a2 2 0 002-2V8.118z" />
                </svg>
                <p>Select an email to read</p>
            </div>
        )}
      </div>
    </div>
  );
};

export default Mail;
