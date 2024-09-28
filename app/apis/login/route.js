// app/apis/login/route.js

import axios from 'axios';

export async function POST(req) {
  const { username, password } = await req.json();

  try {
    const response = await axios.post('https://aipcrepair.onrender.com/apis/login/', {
      username,
      password,
    });

    // Check if the response is successful
    if (response.status >= 200 && response.status < 300) {
      const { access, refresh } = response.data; // Adjust this based on your API response structure
      return new Response(JSON.stringify({ access, refresh, message: "Login successful!" }), {
        status: 200,
        headers: { 'Content-Type': 'application/json' },
      });
    } else {
      return new Response(JSON.stringify({ message: "An error occurred. Please try again later.Make sure your email is authenticated or check your email to verify" }), {
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
