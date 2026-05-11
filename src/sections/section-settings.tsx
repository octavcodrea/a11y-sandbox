import { useMemo, useState } from "react";
import { useHoverData, useStateStore } from "../lib/hooks";
import SettingsTabProfile from "../components/settings-tab-profile";
import SettingsTabNotifications from "../components/settings-tab-notifications";
import SettingsTabGeneral from "../components/settings-tab-general";
import SDiv from "../components/s-div";
import { Info } from "lucide-react";
import Code from "../components/code";

const tabs = [
    { name: "Profile", id: "profile-tab", controls: "profile-tabpanel" },
    {
        name: "General",
        id: "general-tab",
        controls: "general-tabpanel",
    },
    {
        name: "Notifications",
        id: "notifications-tab",
        controls: "notifications-tabpanel",
    },
];

const Settings = () => {
    const a11yOn = useStateStore((state) => state.a11yOn);

    const { handleMouseEnter: hoverOn, handleMouseLeave: hoverOff } =
        useHoverData();
    const hoverProps = { onMouseEnter: hoverOn, onMouseLeave: hoverOff };

    const [info, setInfo] = useState(false);

    const toggleInfo = () => {
        setInfo(!info);
    };

    const [activeTab, setActiveTab] = useState("Profile");

    const containerClass =
        "flex flex-col sm:flex-row border border-gray-200 rounded-lg";
    const tabContainerClass =
        "flex flex-row sm:flex-col gap-1 p-2 sm:p-4 border-b sm:border-b-0 sm:border-r border-gray-200 sm:min-w-[200px]";
    const settingsContainerClass = "flex flex-col gap-4 w-full";

    const activeTabContent = useMemo(() => {
        switch (activeTab) {
            case "Profile":
                return <SettingsTabProfile />;
            case "General":
                return <SettingsTabGeneral />;
            case "Notifications":
                return <SettingsTabNotifications />;
            default:
                return <SettingsTabProfile />;
        }
    }, [activeTab]);

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold sm:text-3xl">Settings</h2>
            <p>
                An example of a settings panel with tabbed navigation. Users
                should be able to tell which tab is currently active, switch
                between sections, and interact with the content area.
            </p>

            <div className={containerClass}>
                <SDiv
                    className={tabContainerClass}
                    tag={a11yOn ? "nav" : undefined}
                    role={a11yOn ? "tablist" : undefined}
                    aria-label="Settings tabs"
                >
                    {tabs.map((tab) => (
                        <button
                            key={tab.name}
                            id={a11yOn ? tab.id : undefined}
                            onClick={() => setActiveTab(tab.name)}
                            className={`flex justify-start text-sm sm:text-lg ${
                                activeTab === tab.name
                                    ? "font-bold text-blue-600"
                                    : ""
                            }`}
                            role={a11yOn ? "tab" : undefined}
                            aria-selected={
                                a11yOn ? activeTab === tab.name : undefined
                            }
                            aria-controls={a11yOn ? tab.controls : undefined}
                            {...hoverProps}
                        >
                            {tab.name}
                        </button>
                    ))}
                </SDiv>
                <div className={settingsContainerClass}>{activeTabContent}</div>
            </div>

            <div className="mt-6 flex flex-col gap-4">
                <button
                    onClick={toggleInfo}
                    className="mr-auto flex items-center gap-2 px-2 font-semibold text-blue-600"
                    aria-expanded={a11yOn ? info : undefined}
                    {...hoverProps}
                >
                    <Info className="h-5 w-5" /> {info ? "Hide" : "Show"} A11y
                    info - Settings
                </button>

                {info && (
                    <p>
                        Here, the container element has a role of{" "}
                        <Code>tablist</Code> and an <Code>aria-label</Code> of
                        "Settings tabs". Each tab button has a role of{" "}
                        <Code>tab</Code> and an <Code>aria-selected</Code>{" "}
                        attribute that reflects the current active tab.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Settings;
