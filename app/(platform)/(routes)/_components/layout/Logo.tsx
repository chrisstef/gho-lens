import Link from "next/link";
import Image from "next/image";

export const Logo = () => {
    return (
        <Link href="/dashboard">
            <div className="hover:opacity-75 transition duration-200 items-center gap-x-2 hidden md:flex">
                <Image src="/logo.svg" alt="Logo" height={30} width={30} />
                <p className="text-lg font-extrabold">GHO Lens</p>
            </div>
        </Link>
    );
};
