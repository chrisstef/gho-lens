import Link from "next/link";
import localFont from "next/font/local";
import { cn } from "@/lib/utils";
import { Button } from "@/components/ui/button";
import { Icons } from "@/components/icons";

const poppins = localFont({
    src: "../../public/fonts/Poppins-Regular.ttf",
});

const LandingPage = () => {
    return (
        <div className="flex items-center justify-center flex-col">
            <div className={cn("flex items-center justify-center flex-col")}>
                <div className="mb-4 flex items-center border shadow-sm p-4 bg-amber-100 text-amber-700 rounded-full">
                    <Icons.star className="h-6 w-6 mr-2" />
                    GHO Lens Data Analytics
                </div>
                <h1 className="text-2xl md:text-5xl text-center mb-6">
                    Empowering Your Blockchain Journey
                </h1>
                <div
                    className={cn(
                        "text-2xl text-center font-bold md:text-5xl bg-gradient-to-r from-violet-300 to-indigo-800 text-white px-4 p-4 rounded-md py-4 w-fit shadow-md",
                        poppins.className
                    )}
                >
                    Visualize data from the GHO Ecosystem effortlessly.{" "}
                </div>
            </div>
            <div className="text-sm md:text-xl text-neutral-400 mt-4 max-w-xs md:max-w-2xl text-center mx-auto">
                Explore real-time insights, analyze reserves and incentives,
                delve into historical data, and stay updated on network
                activities. Whether you're a crypto enthusiast or seasoned
                investor, GHO Lens is your GHO-to portal for an evergrowing
                ecosystem.
            </div>
            <Button className="mt-6" size="lg" asChild>
                <Link href="/login">Let's GHO</Link>
            </Button>
        </div>
    );
};

export default LandingPage;
