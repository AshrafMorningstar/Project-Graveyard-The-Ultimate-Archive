/*
 Copyright (c) 2026 Ashraf Morningstar
 These are personal recreations of existing projects, developed by Ashraf Morningstar
 for learning and skill development.
 Original project concepts remain the intellectual property of their respective creators.
 Repository: https://github.com/AshrafMorningstar
*/

#
# -----------------------------------------------------------------------------
# @author      Ashraf Morningstar
# @github      https://github.com/AshrafMorningstar
# @repository  Project Graveyard - The Ultimate Archive
# @quote       "Code that defines the future. Designed to inspire."
# -----------------------------------------------------------------------------
#

/**
 * Author: Ashraf Morningstar
 * GitHub: https://github.com/AshrafMorningstar
 * Project: AI-Powered Study Note Summarizer
 */

from flask import Flask, request, jsonify
from flask_cors import CORS
# In a real environment, you would use:
# from transformers import pipeline

app = Flask(__name__)
# Enable CORS for all routes to allow frontend to talk to this backend
CORS(app) 

# Mock Summarization Logic (Robust Fallback)
def summarize_text(text):
    # Simulate NLP processing
    sentences = text.split('.')
    sentences = [s.strip() for s in sentences if len(s.strip()) > 10]
    
    if len(sentences) == 0:
        return text[:100] + "..."
    
    # Pick first and last significant sentence as a basic heuristic summary
    summary = f"{sentences[0]}. "
    if len(sentences) > 1:
        summary += f"Moreover, {sentences[-1]}."
        
    return summary

@app.route('/api/summarize', methods=['POST'])
def summarize():
    try:
        data = request.json
        if not data or 'text' not in data:
            return jsonify({"error": "No text provided"}), 400
            
        text = data['text']
        if len(text) < 20:
            return jsonify({"error": "Text too short to summarize"}), 400

        summary = summarize_text(text)
        
        return jsonify({
            "success": True,
            "original_length": len(text),
            "summary_length": len(summary),
            "summary": summary,
            "author": "Ashraf Morningstar"
        })
        
    except Exception as e:
        return jsonify({"error": str(e)}), 500

@app.route('/', methods=['GET'])
def health_check():
    return "AI Summarizer Backend is Active. Author: Ashraf Morningstar"

if __name__ == '__main__':
    print("Starting AI Summarizer Backend on Port 5000...")
    print("Ensure you have installed Flask and flask-cors: pip install flask flask-cors")
    app.run(debug=True, port=5000)
