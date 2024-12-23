import React from "react";


function RegisterPage() {
    return (
        <div className="flex max-h-screen">
            <div className="w-full md:w-1/2 flex flex-col justify-center items-center bg-white p-8">
                <h2 className="text-2xl font-semibold mb-6">Create a new account</h2>
                <form className="w-full max-w-sm">
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="email">
                            Email Address
                        </label>
                        <div className="relative">
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-10"
                                id="email"
                                type="email"
                                placeholder="alex@email.com"
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <i className="fas fa-envelope text-gray-400"></i>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="password">
                            Password
                        </label>
                        <div className="relative">
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-10"
                                id="password"
                                type="password"
                                placeholder="Enter your password"
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <i className="fas fa-lock text-gray-400"></i>
                            </div>
                        </div>
                    </div>
                    <div className="mb-4">
                        <label className="block text-gray-700 text-sm font-bold mb-2" htmlFor="confirm-password">
                            Confirm Password
                        </label>
                        <div className="relative">
                            <input
                                className="shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline pl-10"
                                id="confirm-password"
                                type="password"
                                placeholder="Confirm your password"
                            />
                            <div className="absolute inset-y-0 left-0 flex items-center pl-3">
                                <i className="fas fa-lock text-gray-400"></i>
                            </div>
                        </div>
                        <div className="flex items-center justify-between mb-6">
                            <a className="inline-block align-baseline font-bold text-sm text-blue-500 hover:text-blue-800" href="/login">
                                Already have an account?
                            </a>
                        </div>
                    </div>
                    <div className="flex items-center justify-between mb-6">
                        <button
                            className="bg-gray-800 hover:bg-gray-700 text-white font-bold py-2 px-4 rounded w-full"
                            type="button"
                        >
                            Register
                        </button>
                    </div>
                </form>
            </div>
            <div className="hidden md:block bg-cover bg-no-repeat bg-center">
                <img
                    src="/src/assets/background.jpg"
                    alt="A mystical forest with a glowing tunnel at the end of a path"
                    className="h-full w-full"
                />
            </div>
        </div>
    );
}

export default RegisterPage;