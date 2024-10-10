// components/QuestionDetail.jsx
'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const QuestionDetail = () => {
    const router = useRouter();
    const { id } = router.query;
    const [question, setQuestion] = useState(null);
    const [answers, setAnswers] = useState([]);

    useEffect(() => {
        const fetchQuestionDetails = async () => {
            if (id) {
                const response = await axios.get(`http://127.0.0.1:8000/apis/questions/${id}/`);
                setQuestion(response.data);
                setAnswers(response.data.answers);
            }
        };

        fetchQuestionDetails();
    }, [id]);

    const handleLike = async (id, type) => {
        try {
            const data ={ answer: id, vote: 'like' }; 
            
            await axios.post(`http://127.0.0.1:8000/apis/like-dislike/`, data);
    
            // Optionally, refresh the question list or update the local state
            console.log(`Successfully liked ${type} with id ${id}`);
        } catch (error) {
            console.error("Error liking the item", error);
        }
    };
    const handleFollow = async (userId) => {
        await axios.post(`http://127.0.0.1:8000/apis/follow/${userId}`);
        // Optionally, update local state to reflect the follow action
    };
    
    const handleDislike = async (id) => {
        try {
            const data = { answer: id, vote: 'dislike' };
    
            await axios.post(`http://127.0.0.1:8000/apis/like-dislike/`, data);
    
            // Optionally, refresh the question list or update the local state
            console.log(`Successfully disliked ${type} with id ${id}`);
        } catch (error) {
            console.error("Error disliking the item", error);
        }
    };
    

    if (!question) return <div>Loading...</div>;

    return (
        <div>
            <h2>{question.title}</h2>
            <p>{question.content}</p>
            <button onClick={() => handleFollow(question.user.id)}>Follow {question.user.username}</button>
            <h3>Answers</h3>
            <ul>
                {answers.map((answer) => (
                    <li key={answer.id}>
                        {answer.content}
                        <button onClick={() => handleLike(answer.id)}>👍 {answer.likes}</button>
                        <button onClick={() => handleDislike(answer.id)}>👎 {answer.dislikes}</button>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default QuestionDetail;
