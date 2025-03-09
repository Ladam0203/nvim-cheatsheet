"use client"

import { useState, useEffect } from "react"
import { Search, Star, BookOpen, Command, Code, Edit, ArrowRight, Sun, Github, Heart } from "lucide-react"
import Link from "next/link"
import { commands } from "@/app/data/commands"
import CommandCard from "@/app/components/command-card"
import Image from "next/image"

export default function NvimCheatsheet() {
    const [searchQuery, setSearchQuery] = useState("")
    const [activeCategory, setActiveCategory] = useState("all")
    const [favorites, setFavorites] = useState([])
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)

    // Load favorites from localStorage on component mount
    useEffect(() => {
        const savedFavorites = localStorage.getItem("nvim-favorites")
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites))
        }
    }, [])

    // Save favorites to localStorage whenever they change
    useEffect(() => {
        localStorage.setItem("nvim-favorites", JSON.stringify(favorites))
    }, [favorites])

    const toggleFavorite = (commandId) => {
        setFavorites((prev) => (prev.includes(commandId) ? prev.filter((id) => id !== commandId) : [...prev, commandId]))
    }

    // Command categories
    const categories = [
        { id: "all", name: "All", icon: <BookOpen className="w-4 h-4" /> },
        { id: "motions", name: "Motions", icon: <ArrowRight className="w-4 h-4" /> },
        { id: "editing", name: "Editing", icon: <Edit className="w-4 h-4" /> },
        { id: "commands", name: "Commands", icon: <Command className="w-4 h-4" /> },
        { id: "coding", name: "Coding", icon: <Code className="w-4 h-4" /> },
        { id: "search", name: "Search", icon: <Search className="w-4 h-4" /> },
        { id: "visual", name: "Visual", icon: <Sun className="w-4 h-4" /> },
    ]

    // Filter commands based on search query, active category, and selected modes
    const filteredCommands = commands.filter((cmd) => {
        const matchesSearch =
            cmd.command.toLowerCase().includes(searchQuery.toLowerCase()) ||
            cmd.description.toLowerCase().includes(searchQuery.toLowerCase())

        const matchesCategory = activeCategory === "all" || cmd.category === activeCategory

        if (showFavoritesOnly) {
            return matchesSearch && matchesCategory && favorites.includes(cmd.id)
        }

        return matchesSearch && matchesCategory
    })

    // Get favorite commands for the favorites section
    const favoriteCommands = commands.filter((cmd) => favorites.includes(cmd.id))

    return (
        <div className="flex flex-col min-h-screen bg-base-100 transition-colors duration-300">
            <nav className="navbar bg-base-200 shadow-lg">
                <div className={"container mx-auto"}>
                    <div className="navbar-start">
                        <Link className="btn btn-ghost btn-sm" href={"/"}>
                            <Image src="/icon.png" alt="NeoVim Cheatsheet" width={24} height={24} />
                            <span className="text-lg font-bold">NeoVim Cheatsheet</span>
                        </Link>
                    </div>
                    <div className="navbar-end">
                        <Link href={'https://github.com/Ladam0203/nvim-cheatsheet'} className="btn btn-ghost btn-sm">
                            <Github className="w-5 h-5" />
                        </Link>
                    </div>
                </div>
            </nav>
            <main className="container mx-auto px-4 py-8 flex-grow">
                {/* Search and filter */}
                <div className="flex flex-col md:flex-row gap-2 mb-8">
                    <div className="flex gap-4 flex-1">
                        <div className="flex gap-2 flex-1">
                            <input
                                type="text"
                                placeholder="Search commands..."
                                className="input input-bordered w-full focus:outline-none focus:border-primary"
                                value={searchQuery}
                                onChange={(e) => setSearchQuery(e.target.value)}
                            />
                            <button className="btn btn-primary">
                                <Search className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                {/* Categories with Favorites on the right */}
                <div className="flex flex-wrap justify-between mb-6 gap-2">
                    <div className="tabs tabs-boxed flex-grow md:flex-grow-0">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                className={`tab gap-2 ${activeCategory === category.id ? "tab-active" : ""}`}
                                onClick={() => {
                                    setActiveCategory(category.id)
                                    setShowFavoritesOnly(false)
                                }}
                            >
                                {category.icon}
                                {category.name}
                            </button>
                        ))}
                    </div>

                    <button
                        className={`tab gap-2 ${showFavoritesOnly ? "tab-active" : ""} 
                                  bg-base-200 rounded-lg px-4 py-2 flex items-center`}
                        onClick={() => {
                            setShowFavoritesOnly(!showFavoritesOnly)
                            setActiveCategory("all")
                        }}
                    >
                        <Heart className={`w-4 h-4 ${showFavoritesOnly ? "fill-current" : ""}`} />
                        <span className="hidden sm:inline">Favorites</span>
                        <span className="inline sm:hidden">Favs</span>
                        <span className="badge badge-sm ml-1">{favorites.length}</span>
                    </button>
                </div>

                {/* Commands list */}
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {filteredCommands.map((cmd) => (
                        <CommandCard
                            key={cmd.id}
                            command={cmd}
                            isFavorite={favorites.includes(cmd.id)}
                            onToggleFavorite={toggleFavorite}
                        />
                    ))}
                </div>

                {filteredCommands.length === 0 && (
                    <div className="alert mt-4">
                        <div className={"flex items-center gap-2"}>
                            <Star className="w-5 h-5" />
                            <span>No commands found. Try a different search or category.</span>
                        </div>
                    </div>
                )}
            </main>

            <footer className="bg-base-200 py-6 mt-auto">
                <div className="container mx-auto px-4">
                    <div className="flex flex-col md:flex-row justify-between items-center">
                        <div className="mb-4 md:mb-0">
                            <p className="text-sm">© {new Date().getFullYear()} NeoVim Cheatsheet. All rights reserved.</p>
                        </div>
                        <div className="flex items-center gap-4">
                            <Link
                                href="https://github.com/Ladam0203/nvim-cheatsheet"
                                className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                            >
                                <Github className="w-4 h-4" />
                                <span>GitHub</span>
                            </Link>
                        </div>
                    </div>
                </div>
            </footer>
        </div>
    )
}

