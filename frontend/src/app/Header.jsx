import React from 'react';
import Link from "next/link";

const Header = () => {
    return (
        <header className="flex items-center justify-between p-4 border-b-4">
            <Link href="/" className="text-2xl text-cyan-800 font-bold">eCommerce Website</Link>

            <div className="flex gap-2">
                <Link href="/login">
                    <button className="px-2 py-1 border-2 rounded-lg text-green-700 border-green-700 hover:bg-green-700 hover:text-white duration-300">Log In</button>
                </Link>
                <Link href="/login?signup">
                    <button className="px-2 py-1 border-2 rounded-lg bg-green-700 border-green-700 text-white  hover:bg-green-900 hover:border-green-900 duration-300">Sign Up</button>
                </Link>
            </div>
        </header>
    )
};

export default Header;