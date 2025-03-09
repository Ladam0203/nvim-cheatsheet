import Link from "next/link";
import Image from "next/image";
import {Github} from "lucide-react";
import {useEffect, useState} from "react";

export default function Navbar() {
    const [stars, setStars] = useState(0)

    useEffect(() => {
        fetchStars()
    }, []);

    const fetchStars = async () => {
        const res = await fetch("https://api.github.com/repos/Ladam0203/nvim-cheatsheet")
        const data = await res.json()
        setStars(data.stargazers_count)
    }

    return (
        <nav className="navbar bg-base-200 shadow-lg">
            <div className={"container mx-auto"}>
                <div className="navbar-start">
                    <Link className="btn btn-ghost btn-sm" href={"/public"}>
                        <Image src="/icon.png" alt="NeoVim Cheatsheet" width={24} height={24}/>
                        <span className="text-lg font-bold">NeoVim Cheatsheet</span>
                    </Link>
                </div>
                <div className="navbar-end">
                    <Link href={'https://github.com/Ladam0203/nvim-cheatsheet'} target={'_blank'}
                          className="btn btn-ghost btn-sm">
                        <Github className="w-5 h-5"/>
                        <span className="badge">{stars}</span>
                    </Link>
                </div>
            </div>
        </nav>
    )
}