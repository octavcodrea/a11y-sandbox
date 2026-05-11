import { ArrowLeft, Trash } from "lucide-react";
import profile2 from "../assets/profile2.jpg";
import { useHoverData, useStateStore } from "../lib/hooks";
import { EmailExampleType } from "../lib/types";

type ViewEmailProps = {
    email: EmailExampleType;

    setViewingEmail: (email: EmailExampleType | null) => void;
};

const ViewEmail = (props: ViewEmailProps) => {
    const a11yOn = useStateStore((state) => state.a11yOn);

    const { handleMouseEnter: hoverOn, handleMouseLeave: hoverOff } =
        useHoverData();
    const hoverProps = { onMouseEnter: hoverOn, onMouseLeave: hoverOff };

    const { email, setViewingEmail } = props;

    return (
        <div className="w-full">
            <div className="flex w-full flex-col gap-2">
                <div className="flex items-center gap-4">
                    <button
                        className="flex items-center gap-2 rounded-md border border-gray-200 px-3 py-1 text-gray-700"
                        onClick={() => setViewingEmail(null)}
                        {...hoverProps}
                    >
                        <ArrowLeft className="h-4 w-4" />
                        <span className="font-semibold">Back</span>
                    </button>
                    <button
                        className="text-gray-500"
                        aria-label={a11yOn ? "Delete email" : undefined}
                        {...hoverProps}
                    >
                        <Trash />
                    </button>
                </div>
                <div className="flex items-center gap-4 p-2">
                    <h3 className="text-base font-bold sm:text-xl">{email.subject}</h3>
                </div>
                <div className="flex w-full items-center justify-between px-2">
                    <div className="flex items-center gap-2">
                        <img
                            src={profile2}
                            alt={a11yOn ? "Profile" : undefined}
                            className="h-8 w-8 rounded-full"
                        />
                        <p className="font-bold">{email.from}</p>
                        <p>
                            {`<`}
                            {email.fromEmail}
                            {`>`}
                        </p>
                    </div>
                    <p>{email.date}</p>
                </div>
            </div>
            <div className="px-2 py-8">
                <p>{email.message}</p>
            </div>
        </div>
    );
};

export default ViewEmail;
