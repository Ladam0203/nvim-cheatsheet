"use client"

import { useEffect } from "react"
import { Github, Star, Users, Lightbulb, X } from "lucide-react"

export default function StarReminderModal({ isOpen, onClose, onStarRepo, onRemindLater }) {
    // Close modal when Escape key is pressed
    useEffect(() => {
        const handleEscKey = (e) => {
            if (e.key === "Escape" && isOpen) {
                onClose()
            }
        }

        window.addEventListener("keydown", handleEscKey)
        return () => window.removeEventListener("keydown", handleEscKey)
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div className="modal modal-open">
            <div className="modal-box relative">
                <button className="btn btn-sm absolute right-2 top-2" onClick={onClose}>
                    <X className="w-4 h-4" />
                </button>

                <h3 className="font-bold text-lg flex items-center gap-2">
                    Enjoying NeoVim Cheatsheet?
                </h3>

                <p className="py-2 text-sm">Your star helps others discover this project and motivates us!</p>

                <div className="grid grid-cols-3 gap-4 py-4">
                    <div className="flex flex-col items-center text-center gap-2">
                        <div className="bg-base-200 p-3 rounded-full">
                            <Users className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-medium">Grow Community</span>
                    </div>

                    <div className="flex flex-col items-center text-center gap-2">
                        <div className="bg-base-200 p-3 rounded-full">
                            <Lightbulb className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-medium">Inspire Updates</span>
                    </div>

                    <div className="flex flex-col items-center text-center gap-2">
                        <div className="bg-base-200 p-3 rounded-full">
                            <Star className="w-5 h-5" />
                        </div>
                        <span className="text-xs font-medium">Show Support</span>
                    </div>
                </div>

                <div className="modal-action justify-between">
                    <button className="btn" onClick={onRemindLater}>
                        Remind Later
                    </button>
                    <button className="btn btn-primary" onClick={onStarRepo}>
                        <Github className="w-4 h-4" />
                        Star on GitHub
                    </button>
                </div>
            </div>
        </div>
    )
}

