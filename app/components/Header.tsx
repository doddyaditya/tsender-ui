"use client"

import { ConnectButton } from "@rainbow-me/rainbowkit"
import { FaGithub } from "react-icons/fa"

export default function Header() {
    return (
        <header className="flex items-center justify-between p-4 bg-white shadow-md">
            <div className="flex items-center space-x-4">
                <a
                    href="https://github.com/doddyaditya/Tsender"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-gray-700 hover:text-gray-900 transition-colors"
                    aria-label="GitHub Repository"
                >
                    <FaGithub size={24} />
                </a>
                <h1 className="text-2xl font-bold text-gray-900">Tsender</h1>
            </div>
            <div>
                <ConnectButton />
            </div>
        </header>
    )
}