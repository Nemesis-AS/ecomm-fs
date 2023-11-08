"use client";

import React from 'react';
import { useSearchParams } from "next/navigation";
import Link from "next/link";

const Login = () => {
    // @todo! Validate Form Data;
    const [searchParams, setSearchParams] = useSearchParams();

    const submitSignUpForm = e => {
        e.preventDefault();

        console.log(e.target);

        const formData = new FormData(e.target);
        console.log(...formData);
        // @todo! Send the Data to the Backend;
    };

    const submitLoginForm = e => {
        e.preventDefault();

        const formData = new FormData(e.target);
        console.log(...formData);
        // @todo! Send the Data to the Backend;
    };

    if (searchParams && searchParams.includes("signup")) return (
        <div className="w-100 p-4 flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-gray-700">Sign Up</h2>

            <div className="login-card shadow-lg p-4 w-full md:w-4/5 max-w-xl">
                <form method="post" className="flex flex-col gap-4 w-full" onSubmit={submitSignUpForm}>
                    <div className="flex flex-col gap-1 my-2">
                        <label htmlFor="signUpMail" className="block w-full">Email</label>
                        <input id="signUpMail" type="email" name="email" className="block rounded-lg p-2" placeholder="me@example.com" autoComplete="off" />
                    </div>

                    <div className="flex flex-col gap-1 my-2">
                        <label htmlFor="signUpPwd" className="block w-full">Password</label>
                        <input id="signUpPwd" type="password" name="password" className="block rounded-lg p-2" placeholder="Password" autoComplete="off" />
                    </div>

                    <div className="flex flex-col gap-1 my-2">
                        <label htmlFor="signUpPwd2" className="block w-full">Confirm Password</label>
                        <input id="signUpPwd2" type="password" name="confirmPassword" className="block rounded-lg p-2" placeholder="Password" autoComplete="off" />
                    </div>

                    <button className="block w-full p-2 rounded-lg text-white font-bold bg-green-700 hover:bg-green-900 duration-300" type="submit">Submit</button>
                </form>
            </div>
        </div>
    );

    return (
        <div className="w-100 p-4 flex flex-col items-center justify-center">
            <h2 className="text-2xl font-bold text-gray-700">Log In</h2>

            <div className="login-card shadow-lg p-4 w-full md:w-4/5 max-w-xl">
                <form method="post" className="flex flex-col gap-4 w-full" onSubmit={submitLoginForm}>
                    <div className="flex flex-col gap-1 my-2">
                        <label htmlFor="signInMail" className="block w-full">Email</label>
                        <input id="signInMail" name="email" type="email" className="block rounded-lg p-2" placeholder="me@example.com" autoComplete="off" />
                    </div>

                    <div className="flex flex-col gap-1 my-2">
                        <label htmlFor="signInPwd" className="block w-full">Password</label>
                        <input id="signInPwd" name="password" type="password" className="block rounded-lg p-2" placeholder="Password" />
                    </div>

                    <div className="flex justify-between p-2 text-sm">
                        <div className="flex items-center gap-2">
                            <input type="checkbox" name="remember" id="rememberCheck" />
                            <label htmlFor="rememberCheck">Remember Me</label>
                        </div>


                        <Link href="#" className="font-bold text-blue-600 hover:text-blue-800 duration-300">Forgot Password?</Link>
                    </div>

                    <button className="block w-full p-2 rounded-lg text-white font-bold bg-green-700 hover:bg-green-900 duration-300">Submit</button>
                </form>
            </div>
        </div>
    )
};

export default Login;
