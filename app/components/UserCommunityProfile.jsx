// components/UserProfile.jsx
'use client'
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import Link from 'next/link';

const UserProfile = () => {
    const router = useRouter();
    const { userId } = router.query; // Assuming userId is passed in the URL
    const [user, setUser] = useState(null);
    const [questions, setQuestions] = useState([]);

    useEffect(() => {
        const fetchUserProfile = async () => {
            if (userId) {
                const response = await axios.get(`http://127.0.0.1:8000/apis/users/${userId}/`);
                setUser(response.data);
                const questionsResponse = await axios.get(`/apis/users/${userId}/questions/`);
                setQuestions(questionsResponse.data);
            }
        };

        fetchUserProfile();
    }, [userId]);

    if (!user) return <div>Loading...</div>;

    return (
        <div>
            <h2>{user.username}&apos;s Profile</h2>
            <img src={user.profile_picture} alt={`${user.username}'s profile`} />
            <h3>Questions Asked</h3>
            <ul>
                {questions.map((question) => (
                    <li key={question.id}>
                        <Link href={`/community/${question.id}`}>
                            {question.title}
                        </Link>
                    </li>
                ))}
            </ul>
        </div>
    );
};

export default UserProfile;
