"use client"

import { useState, useEffect } from "react"
import Fuse from "fuse.js"
import { Search, Frown, BookOpen, Command, Code, Edit, ArrowRight, Sun, Heart, Lightbulb } from "lucide-react"
import { commands } from "@/app/data/commands"
import CommandCard from "@/app/components/command-card"
import Navbar from "@/app/components/navbar"
import Footer from "@/app/components/footer"
import StarReminderModal from "@/app/components/star-reminder-modal"

function useDebounce(value, delay) {
    const [debouncedValue, setDebouncedValue] = useState(value)

    useEffect(() => {
        const timer = setTimeout(() => setDebouncedValue(value), delay)
        return () => clearTimeout(timer)
    }, [value, delay])

    return debouncedValue
}

export default function NvimCheatsheet() {
    const [searchQuery, setSearchQuery] = useState("")
    const debouncedSearchQuery = useDebounce(searchQuery, 300)
    const [isLoading, setIsLoading] = useState(false)
    const [activeCategory, setActiveCategory] = useState("all")
    const [favorites, setFavorites] = useState([])
    const [showFavoritesOnly, setShowFavoritesOnly] = useState(false)
    const [showStarModal, setShowStarModal] = useState(false)

    useEffect(() => {
        const savedFavorites = localStorage.getItem("nvim-favorites")
        if (savedFavorites) {
            setFavorites(JSON.parse(savedFavorites))
        }
    }, [])

    useEffect(() => {
        localStorage.setItem("nvim-favorites", JSON.stringify(favorites))
    }, [favorites])

    useEffect(() => {
        setIsLoading(true)
        const timer = setTimeout(() => setIsLoading(false), 300)
        return () => clearTimeout(timer)
    }, [searchQuery])

    const toggleFavorite = (commandId) => {
        setFavorites((prev) => {
            const newFavorites = prev.includes(commandId) ? prev.filter((id) => id !== commandId) : [...prev, commandId]

            // Check if we should show the star modal
            if (!prev.includes(commandId)) {
                // Only when adding to favorites
                const hasStarred = localStorage.getItem("nvim-starred") === "true"
                const reminderTime = localStorage.getItem("nvim-reminder-time")
                const currentTime = new Date().getTime()

                if (!hasStarred && (!reminderTime || currentTime > Number.parseInt(reminderTime))) {
                    setShowStarModal(true)
                }
            }

            return newFavorites
        })
    }

    const handleStarRepo = () => {
        // Mark as starred so we don't show the modal again
        localStorage.setItem("nvim-starred", "true")
        // Open GitHub repo in a new tab
        window.open("https://github.com/Ladam0203/nvim-cheatsheet", "_blank")
        setShowStarModal(false)
    }

    const handleRemindLater = () => {
        // Set reminder for 24 hours later
        const reminderTime = new Date().getTime() + 24 * 60 * 60 * 1000
        localStorage.setItem("nvim-reminder-time", reminderTime.toString())
        setShowStarModal(false)
    }

    const categories = [
        { id: "all", name: "All", icon: <BookOpen className="w-4 h-4" /> },
        { id: "motions", name: "Motions", icon: <ArrowRight className="w-4 h-4" /> },
        { id: "editing", name: "Editing", icon: <Edit className="w-4 h-4" /> },
        { id: "commands", name: "Commands", icon: <Command className="w-4 h-4" /> },
        { id: "coding", name: "Coding", icon: <Code className="w-4 h-4" /> },
        { id: "search", name: "Search", icon: <Search className="w-4 h-4" /> },
        { id: "visual", name: "Visual", icon: <Sun className="w-4 h-4" /> },
        { id: "plugin", name: "Plugins", icon: <Lightbulb className="w-4 h-4" /> },
    ]

    const fuse = new Fuse(commands, {
        keys: ["command", "description"],
        threshold: 0.3,
    })

    let filteredCommands = debouncedSearchQuery
        ? fuse.search(debouncedSearchQuery).map((result) => result.item)
        : commands

    filteredCommands = filteredCommands.filter((cmd) => activeCategory === "all" || cmd.category === activeCategory)

    if (showFavoritesOnly) {
        filteredCommands = filteredCommands.filter((cmd) => favorites.includes(cmd.id))
    }

    filteredCommands.sort((a, b) => (favorites.includes(b.id) ? 1 : 0) - (favorites.includes(a.id) ? 1 : 0))

    return (
        <div className="flex flex-col min-h-screen bg-base-100 transition-colors duration-300">
            <Navbar />

            <main className="container mx-auto px-4 py-8 flex-grow">
                <div className="flex flex-col md:flex-row gap-2 mb-8">
                    <div className="flex gap-4 flex-1">
                        <div className="flex gap-2 flex-1">
                            <input
                                type="text"
                                placeholder="Search commands..."
                                className="input input-bordered w-full focus:outline-none focus:border-primary"
                                value={searchQuery}
                                onChange={(e) => {
                                    setSearchQuery(e.target.value)
                                    setActiveCategory("all")
                                }}
                            />
                            <button className="btn btn-primary">
                                <Search className="w-5 h-5" />
                            </button>
                        </div>
                    </div>
                </div>

                <div className="flex flex-wrap justify-between mb-6 gap-2">
                    <div className="tabs tabs-boxed flex-grow md:flex-grow-0">
                        {categories.map((category) => (
                            <button
                                key={category.id}
                                className={`tab gap-2 ${activeCategory === category.id ? "tab-active" : ""}`}
                                onClick={() => {
                                    setActiveCategory(category.id)
                                    setShowFavoritesOnly(false)
                                    setSearchQuery("")
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

                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
                    {isLoading
                        ? // Show loading cards
                        Array(12)
                            .fill(0)
                            .map((_, index) => (
                                <div key={`loading-${index}`} className="card bg-base-200 p-4 animate-pulse">
                                    <div className="h-6 bg-base-300 rounded w-1/3 mb-2"></div>
                                    <div className="h-4 bg-base-300 rounded w-2/3 mb-2"></div>
                                    <div className="h-4 bg-base-300 rounded w-1/2"></div>
                                </div>
                            ))
                        : // Show actual commands with ad inserted at a random position
                        filteredCommands.map((cmd) => (
                            <CommandCard
                                key={cmd.id}
                                command={cmd}
                                isFavorite={favorites.includes(cmd.id)}
                                onToggleFavorite={toggleFavorite}
                            />
                        ))}
                </div>

                {!isLoading && filteredCommands.length === 0 && (
                    <div className="alert mt-4">
                        <div className={"flex items-center gap-2"}>
                            <Frown className="w-5 h-5" />
                            <span>
                No commands found. Try different filters or open a{" "}
                                <a
                                    href="https://github.com/Ladam0203/nvim-cheatsheet/pulls"
                                    target={"_blank"}
                                    className={"link"}
                                    rel="noreferrer"
                                >
                  pull request
                </a>{" "}
                                to add a new command!
              </span>
                        </div>
                    </div>
                )}
            </main>

            <Footer />

            <StarReminderModal
                isOpen={showStarModal}
                onClose={() => setShowStarModal(false)}
                onStarRepo={handleStarRepo}
                onRemindLater={handleRemindLater}
            />
        </div>
    )
}

