// components/QuestionList.jsx
'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Link from 'next/link';

const QuestionList = () => {
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchQuestions = async () => {
            const response = await axios.get('http://127.0.0.1:8000/apis/questions/');
            setQuestions(response.data);
        };

        fetchQuestions();
    }, []);

    const handleLike = async (id, type) => {
        try {
            const data = type === 'question' 
                ? { question: id, vote: 'like' } 
                : { answer: id, vote: 'like' };
            
            await axios.post(`http://127.0.0.1:8000/apis/like-dislike/`, data);
    
            // Optionally, refresh the question list or update the local state
            console.log(`Successfully liked ${type} with id ${id}`);
        } catch (error) {
            console.error("Error liking the item", error);
        }
    };
    
    const handleDislike = async (id, type) => {
        try {
            const data = type === 'question' 
                ? { question: id, vote: 'dislike' } 
                : { answer: id, vote: 'dislike' };
    
            await axios.post(`http://127.0.0.1:8000/apis/like-dislike/`, data);
    
            // Optionally, refresh the question list or update the local state
            console.log(`Successfully disliked ${type} with id ${id}`);
        } catch (error) {
            console.error("Error disliking the item", error);
        }
    };
    

    return (
        <div>
            <h3>Questions</h3>
            <ul>
                {questions.map((question) => (
                    <li key={question.id}>
                        <Link href={`/community/${question.id}`}>
                            {question.title}
                        </Link>
                        <button onClick={() => handleLike(question.id)}>👍 {question.likes}</button>
                        <button onClick={() => handleDislike(question.id)}>👎 {question.dislikes}</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuestionList;
