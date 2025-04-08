// /api/auth/signup.js

import axios from 'axios';

export async function POST(req) {
  const { username, email, password } = await req.json();

  try {
    const response = await axios.post('https://pcrepair.vercel.app/apis/signup/', {
      username,
      email,
      password,
    });
    // console.log("Response:",response)

    // Check if the response is successful
    if (response.status >= 200 && response.status < 300) {
      return new Response(JSON.stringify({ message: "Signup successful! You can now log in." }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify({ message: "An error occurred. Please try again later." }), {
        status: 400,
        headers: { 'Content-Type': 'application/json' },
      });
    }
  } catch (error) {
    console.error(error); // Log the error for debugging
    const message = error.response?.data?.message || "An unexpected error occurred.";
    return new Response(JSON.stringify({ message }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    });
  }
}