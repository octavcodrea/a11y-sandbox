import { ArrowLeft } from "lucide-react";
import { useHoverData } from "./lib/hooks";

const PageAbout = () => {
    const { handleMouseEnter: hoverOn, handleMouseLeave: hoverOff } =
        useHoverData();
    const hoverProps = { onMouseEnter: hoverOn, onMouseLeave: hoverOff };

    return (
        <div className="flex h-screen flex-col items-center justify-center gap-4">
            <h1 className="text-3xl font-bold text-gray-800 sm:text-6xl">About</h1>
            <div
                className={
                    "max-w-lg text-center text-base font-semibold text-gray-600 sm:text-xl"
                }
            >
                App built by{" "}
                <a
                    className="text-blue-600 hover:underline"
                    href="https://github.com/octavcodrea"
                    rel="noreferrer"
                    target="_blank"
                    {...hoverProps}
                >
                    Octav Codrea
                </a>
                .
                <br />
                <br />
                <a
                    className="flex items-center justify-center gap-1 text-blue-600 hover:underline"
                    href="/"
                    {...hoverProps}
                >
                    <ArrowLeft /> Home
                </a>
            </div>
        </div>
    );
};

export default PageAbout;
