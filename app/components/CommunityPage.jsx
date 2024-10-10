'use client';

import React, { useState } from 'react';
import QuestionList from './QuestionList';
import AskQuestion from './AskQuestion';

const CommunityPage = () => {
    const [searchQuery, setSearchQuery] = useState('');

    const handleSearch = (e) => {
        setSearchQuery(e.target.value);
    };

    return (
        <div className="min-h-screen bg-gray-100 p-6">
            {/* Header Section */}
            <div className="text-center mb-8">
                <h2 className="text-4xl font-bold text-black mb-4">Community Forum</h2>
                <p className="text-lg text-gray-600">Join the discussion, ask questions, and help others with their tech-related issues!</p>
            </div>

            {/* Search and Ask Question Section */}
            <div className="flex justify-center items-center mb-10">
                <input 
                    type="text" 
                    value={searchQuery} 
                    onChange={handleSearch} 
                    placeholder="Search questions..." 
                    className="w-1/2 p-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 text-black"
                />
            </div>

            {/* Ask Question Button */}
            <div className="flex justify-center mb-12">
                <AskQuestion />
            </div>

            {/* Question List */}
            <div className="max-w-6xl mx-auto">
                <QuestionList searchQuery={searchQuery} />
            </div>
        </div>
    );
};

export default CommunityPage;
