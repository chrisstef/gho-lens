import Link from "next/link";
import { Button } from "@/components/ui/button";
import { Logo } from "./Logo";

export const Navbar = () => {
    return (
        <nav className="w-full h-20 px-4 md-px-8 flex items-center">
            <div className="md:max-w-screen-4xl mx-auto flex items-center w-full justify-between">
                <Logo />
                <Button variant="default" asChild>
                    <Link href="/login">Let's GHO</Link>
                </Button>
            </div>
        </nav>
    );
};
