import Link from "next/link";
import {Github, Coffee} from "lucide-react";

export default function Footer() {
    return (
        <footer className="bg-base-200 py-6 mt-auto">
            <div className="container mx-auto px-4">
                <div className="flex flex-col md:flex-row justify-between items-center">
                    <div className="mb-4 md:mb-0">
                        <p className="text-sm">© {new Date().getFullYear()} NeoVim Cheatsheet. All rights reserved.</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <Link href={'https://buymeacoffee.com/ladam0203'}
                                target={'_blank'}
                                className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                        >
                            <Coffee className="w-4 h-4"/>
                            <span>Buy me a coffee</span>
                        </Link>

                        <Link
                            href="https://github.com/Ladam0203/nvim-cheatsheet"
                            target={'_blank'}
                            className="flex items-center gap-2 text-sm hover:text-primary transition-colors"
                            onClick={() => {localStorage.setItem("nvim-starred", "true")}}
                        >
                            <Github className="w-4 h-4"/>
                            <span>GitHub</span>
                        </Link>
                    </div>
                </div>
            </div>
        </footer>
    )
}