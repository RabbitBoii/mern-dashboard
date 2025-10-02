"use client"


import axios from "axios";
import Link from "next/link";
import { useRouter } from "next/navigation"
import { NextResponse } from "next/server";
import React, { useState } from "react";


export default function Login() {
    const router = useRouter();
    const [user, setUser] = useState({
        email: '',
        password: '',
    })
    const [error, setError] = useState("");
    const [loading, setLoading] = useState(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setUser((prevUser) => ({ ...prevUser, [name]: value }));
    }

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setError("");
        setLoading(true);

        try {
            await axios.post('/api/auth/login', user);
            router.push('/dashboard');
        }
        // catch (error: any) {
        //     console.error("Login failed:", error);
        //     setError(error.response?.data?.error || "Login failed. Please try again.")
        // }
        catch (error: unknown) {
            if (error instanceof Error) {
                return NextResponse.json({ error: error.message }, { status: 500 });
            }
            return NextResponse.json({ error: 'An internal server error occurred' }, { status: 500 });
        }
        finally {
            setLoading(false);
        }

    }



    return (
        <div className="flex flex-col items-center justify-center min-h-screen py-2 bg-gray-100">
            <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-md">
                <h1 className="text-3xl font-bold text-center text-gray-900">
                    Log in to your account
                </h1>
                {error && <p className="text-center text-red-500">{error}</p>}

                <form onSubmit={handleSubmit} className="space-y-6">
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
                            {loading ? "Logging in..." : "Log in"}
                        </button>
                    </div>
                </form>


                <p className="text-sm text-center text-gray-600">
                    Don't have an account?{' '}
                    <Link href="/signup" className="font-medium text-indigo-600 hover:text-indigo-500">
                        Sign Up
                    </Link>
                </p>
            </div>
        </div>
    )


}