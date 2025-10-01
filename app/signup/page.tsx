"use client";

import axios from "axios";
import { useRouter } from "next/navigation"
import React, { useState } from "react";
import Link from "next/link";


export default function SignUp() {
    const router = useRouter();
    const [user, setUser] = useState({
        username: "",
        email: "",
        password: "",
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            const response = await axios.post('/api/auth/signup', user);
            console.log("Signup success:", response.data);
            router.push('/login');
        } catch (error: any) {
            console.error("Signup failed:", error);
            setError(error.response?.data?.error || "Signup failed. Please try again.")
        } finally {
            setLoading(false);
        }

    }


    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center text-gray-900">
                    Create an account
                </h1>
                {error && <p className="text-center text-red-500">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
                    <div>
                        <label htmlFor="username" className="text-sm font-medium text-gray-700">
                            Username
                        </label>
                        <input id="username" name="username" type="text" value={user.username} onChange={handleInputChange} className="w-full px-3 py-2 text-gray-600 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                    </div>

                    <div>
                        <label htmlFor="email" className="text-sm font-medium text-gray-700">
                            Email
                        </label>
                        <input id="email" name="email" type="email" value={user.email} onChange={handleInputChange} className="w-full px-3 py-2 text-gray-600 mt-1 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                    </div>

                    <div>
                        <label htmlFor="password" className="text-sm font-medium text-gray-700">
                            Password
                        </label>
                        <input id="password" name="password" type="password" value={user.password} onChange={handleInputChange} className="w-full px-3 py-2 mt-1 text-gray-600 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500" required />
                    </div>

                    <div>
                        <button type="submit" disabled={loading} className="w-full px-4 py-2 text-sm font-medium text-white bg-indigo-600 border border-transparent rounded-md shadow-sm hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 disabled:bg-indigo-400">
                            {loading ? "Creating account..." : "Sign Up"}
                        </button>
                    </div>
                </form>


                <p className="text-sm text-center text-gray-600">
                    Already have an account?{' '}
                    <Link href="/login" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Log In
                    </Link>
                </p>
            </div>
        </div>
    )

}