'use client';
import React, { useState } from 'react';
import axios from 'axios';

const AskQuestion = () => {
    const [title, setTitle] = useState('');
    const [content, setContent] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();
        await axios.post('http://127.0.0.1:8000/apis/questions/', { title, content });
        // Optionally, clear the form or refresh the question list
        setTitle('');  // Clear the title
        setContent('');  // Clear the content
    };

    return (
        <form 
            onSubmit={handleSubmit} 
            className="bg-white shadow-md rounded-lg p-6 max-w-lg mx-auto mb-6"
        >
            <h3 className="text-xl font-bold text-black mb-4">Ask a Question</h3>
            
            {/* Title Input */}
            <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Title"
                required
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
            />

            {/* Content Textarea */}
            <textarea
                value={content}
                onChange={(e) => setContent(e.target.value)}
                placeholder="Your question..."
                required
                className="w-full p-3 mb-4 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black h-32 resize-none"
            ></textarea>

            {/* Submit Button */}
            <button 
                type="submit" 
                className="w-full bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-lg transition-colors duration-300"
            >
                Submit
            </button>
        </form>
    );
};

export default AskQuestion;
