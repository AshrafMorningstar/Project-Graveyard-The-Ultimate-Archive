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

import React from 'react';
import { Mail, Github, Linkedin, Twitter } from 'lucide-react';

const Contact = () => {
  return (
    <div style={{ height: '100%', display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', background: '#f5f5f7' }}>
      <h1 style={{ fontSize: '32px', marginBottom: '10px' }}>Let's Connect</h1>
      <p style={{ color: '#666', marginBottom: '30px' }}>Feel free to reach out for collaborations or just a friendly hello!</p>
      
      <div style={{ display: 'flex', gap: '30px' }}>
        <a href="mailto:ashraf@example.com" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none', color: '#333' }}>
          <div style={{ width: '60px', height: '60px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
            <Mail size={30} color="#007aff" />
          </div>
          <span style={{ marginTop: '10px', fontWeight: '500' }}>Email</span>
        </a>
        
        <a href="https://github.com/AshrafMorningstar" target="_blank" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none', color: '#333' }}>
          <div style={{ width: '60px', height: '60px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
            <Github size={30} color="#24292e" />
          </div>
          <span style={{ marginTop: '10px', fontWeight: '500' }}>GitHub</span>
        </a>

        <a href="#" style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', textDecoration: 'none', color: '#333' }}>
          <div style={{ width: '60px', height: '60px', background: '#fff', borderRadius: '50%', display: 'flex', alignItems: 'center', justifyContent: 'center', boxShadow: '0 5px 15px rgba(0,0,0,0.1)' }}>
            <Linkedin size={30} color="#0077b5" />
          </div>
          <span style={{ marginTop: '10px', fontWeight: '500' }}>LinkedIn</span>
        </a>
      </div>

      <div style={{ marginTop: '50px', padding: '20px', background: 'white', borderRadius: '15px', width: '80%', maxWidth: '400px', boxShadow: '0 5px 20px rgba(0,0,0,0.05)' }}>
        <h3 style={{ marginTop: 0 }}>Send a Message</h3>
        <input type="text" placeholder="Name" style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '8px', boxSizing: 'border-box' }} />
        <textarea rows="4" placeholder="Message" style={{ width: '100%', padding: '10px', marginBottom: '10px', border: '1px solid #ddd', borderRadius: '8px', boxSizing: 'border-box' }}></textarea>
        <button style={{ width: '100%', padding: '10px', background: '#007aff', color: 'white', border: 'none', borderRadius: '8px', cursor: 'pointer', fontWeight: 'bold' }}>Send</button>
      </div>
    </div>
  );
};

export default Contact;
