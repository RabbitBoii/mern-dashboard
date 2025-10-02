"use client"

import axios from "axios";
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react";
import Link from "next/link";
import Image from "next/image";
import { assets } from "@/assets/assets";

export default function Navbar() {
    const router = useRouter();
    const [isMenuOpen, setIsMenuOpen] = useState(false);
    const [user, setUser] = useState<{ username: string } | null>(null)


    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const response = await axios.get('/api/user/profile');
                setUser(response.data.data);
            } catch (error) {
                console.error("Failed to fetch profile, ", error)
            }
        };
        fetchProfile();
    }, [user])


    const handleLogout = async () => {
        try {
            await axios.get('/api/auth/logout');
            router.push('/login');
        } catch (error) {
            console.error("Logout failed, ", error)
        }
    }

    return (
        <nav className="bg-white shadow-md">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex items-center justify-between h-16">
                    <div className="flex-shrink-0">
                        <Link href='/dashboard' className="text-2xl font-bold">
                            {/* Logo */}

                            <Image src={assets.logo} alt="logo" className="w-40 h-10" />
                        </Link>
                    </div>

                    <div>
                        <button
                            onClick={() => setIsMenuOpen(!isMenuOpen)}
                            className="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-indigo-500 ">

                            <svg className="h-6 w-6" stroke="currentColor" fill="none" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M4 6h16M4 12h16m-7 6h7" />
                            </svg>
                        </button>

                        {isMenuOpen && (
                            <div className="origin-top-right absolute right-15 mt-2 w-48 rounded-md shadow-lg py-1 bg-white ring-1 ring-black ring-opacity-5">

                                <div className="px-4 py-2 text-sm text-gray-700">
                                    Signed in as <br />
                                    <span className="font-bold text-lg">{user?.username}</span>
                                </div>
                                <div className="border-t border-gray-100"></div>

                                <Link href='/dashboard/profile' className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Your Profile
                                </Link>

                                <button
                                    onClick={handleLogout}
                                    className="w-full text-left block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100">
                                    Sign Out
                                </button>

                            </div>
                        )}
                    </div>
                </div>
            </div>
        </nav >
    )
}