"use client"

import { useState } from "react"
import { Heart, Copy } from "lucide-react"
import { motion } from "framer-motion"

export default function CommandCard({ command, isFavorite, onToggleFavorite }) {
    const [copied, setCopied] = useState(false)
    const [copiedRemap, setCopiedRemap] = useState(null)
    const [selectedRemap, setSelectedRemap] = useState(null)

    const copyToClipboard = () => {
        navigator.clipboard.writeText(command.command)
        setCopied(true)
        setTimeout(() => setCopied(false), 2000)
    }

    const copyRemapCode = (text) => {
        navigator.clipboard.writeText(text)
        setCopiedRemap(text)
        setTimeout(() => setCopiedRemap(null), 2000)
    }

    const getBadgeColor = (mode) => {
        switch (mode) {
            case "normal":
                return "badge-info"
            case "insert":
                return "badge-success"
            case "visual":
                return "badge-warning"
            case "command":
                return "badge-error"
            default:
                return "badge-ghost"
        }
    }

    return (
        <div className="card bg-base-200 shadow-md hover:shadow-lg transition-all">
            <div className="card-body p-4">
                <div className="flex justify-between items-center">
                    <div className="flex items-center gap-2">
                        <kbd className="kbd kbd-lg font-mono">{command.command}</kbd>
                    </div>
                    <div className="flex gap-2">
                        <button
                            className="btn btn-circle btn-ghost btn-sm tooltip"
                            data-tip={copied ? "Copied!" : "Copy command"}
                            onClick={copyToClipboard}
                        >
                            <Copy className={copied ? "w-4 h-4 text-success" : "w-4 h-4 text-base-content"} />
                        </button>
                        <button
                            className="btn btn-circle btn-ghost btn-sm tooltip"
                            data-tip={isFavorite ? "Remove from favorites" : "Add to favorites"}
                            onClick={() => onToggleFavorite(command.id)}
                        >
                            <Heart
                                className={
                                    isFavorite
                                        ? "w-4 h-4 transition-colors fill-error text-error"
                                        : "w-4 h-4 transition-colors text-base-content"
                                }
                            />
                        </button>
                    </div>
                </div>

                <p className="text-sm mt-2">{command.description}</p>

                <div className="card-actions justify-start mt-2">
                    {Array.isArray(command.mode) ? (
                        command.mode.map((mode) => (
                            <div key={mode} className={`badge ${getBadgeColor(mode)}`}>
                                {mode}
                            </div>
                        ))
                    ) : (
                        <div className={`badge ${getBadgeColor(command.mode)}`}>{command.mode}</div>
                    )}
                </div>

                {/* Remaps Section */}
                {command.remaps && command.remaps.length > 0 && (
                    <div className="mt-4">
                        <h4 className="font-bold text-lg">Remaps</h4>
                        <ul className="list-inside mt-2">
                            {command.remaps.map((remap, index) => (
                                <li key={index} className="text-sm">
                                    <label
                                        htmlFor="remap-modal"
                                        className="kbd kbd-sm font-mono cursor-pointer hover:text-primary"
                                        onClick={() => setSelectedRemap(remap)}
                                    >
                                        {remap}
                                    </label>
                                </li>
                            ))}
                        </ul>
                    </div>
                )}
            </div>

            {/* DaisyUI Modal */}
            {selectedRemap && (
                <>
                    <input type="checkbox" id="remap-modal" className="modal-toggle" />
                    <div className="modal">
                        <div className="modal-box">
                            <h3 className="font-bold text-lg">Remap: {selectedRemap}</h3>

                            <div className="mt-4">
                                <h4 className="font-semibold">Lua (Neovim)</h4>
                                <div className="relative bg-base-300 p-2 rounded mt-2">
                                    <code className="text-sm">
                                        vim.keymap.set(&#39;n&#39;, &#123;selectedRemap&#125;, &#123;command.command&#125;, &#123;&#123; noremap
                                        = true, silent = true &#125;&#125;)
                                    </code>
                                    <button
                                        className="absolute top-2 right-2 btn btn-ghost btn-xs"
                                        onClick={() => copyRemapCode(`vim.keymap.set('n', '${selectedRemap}', '${command.command}', { noremap = true, silent = true })`)}
                                    >
                                        <Copy
                                            className={copiedRemap === `vim.keymap.set('n', '${selectedRemap}', '${command.command}', { noremap = true, silent = true })` ? "w-4 h-4 text-success" : "w-4 h-4"}/>
                                    </button>
                                </div>
                            </div>

                            <div className="mt-4">
                                <h4 className="font-semibold">Vimscript</h4>
                                <div className="relative bg-base-300 p-2 rounded mt-2">
                                    <code className="text-sm">
                                        nnoremap {selectedRemap} {command.command}
                                    </code>
                                    <button
                                        className="absolute top-2 right-2 btn btn-ghost btn-xs"
                                        onClick={() => copyRemapCode(`nnoremap ${selectedRemap} ${command.command}`)}
                                    >
                                        <Copy className={copiedRemap === `nnoremap ${selectedRemap} ${command.command}` ? "w-4 h-4 text-success" : "w-4 h-4"} />
                                    </button>
                                </div>
                            </div>

                            <div className="modal-action">
                                <label htmlFor="remap-modal" className="btn">Close</label>
                            </div>
                        </div>
                    </div>
                </>
            )}
        </div>
    )
}