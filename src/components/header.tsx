import { Menu, Text, rem } from "@mantine/core";
import {
    Bell,
    CircleHelp,
    FilePlus2,
    LogOut,
    Mail,
    Settings,
} from "lucide-react";
import logo from "../assets/logo.svg";
import profilePic from "../assets/profile.jpg";
import { useHoverData, useStateStore } from "../lib/hooks";
import SDiv from "./s-div";
import SearchBar from "./search-bar";

const profileMenuItems = [
    { name: "Account settings", icon: Settings },
    { name: "Help", icon: CircleHelp },
    { name: "Log out", icon: LogOut },
];

const Header = () => {
    const a11yOn = useStateStore((state) => state.a11yOn);

    const { handleMouseEnter: hoverOn, handleMouseLeave: hoverOff } =
        useHoverData();
    const hoverProps = { onMouseEnter: hoverOn, onMouseLeave: hoverOff };

    const logoClass = "h-auto w-16";

    return (
        <SDiv
            className={`flex items-center justify-between gap-4 bg-white p-4 shadow-md`}
            tag={a11yOn ? "header" : undefined}
            role={a11yOn ? "banner" : undefined}
            {...hoverProps}
        >
            <div className="flex items-center gap-4">
                <a
                    href="/"
                    {...hoverProps}
                    aria-label={a11yOn ? "Home" : undefined}
                >
                    <img
                        src={logo}
                        role={a11yOn ? "img" : undefined}
                        alt=""
                        className={logoClass}
                    />
                </a>

                {/* <span className="hidden sm:block">
                    <BreadcrumbsComponent />
                </span> */}
            </div>

            <div className={`flex items-center gap-4`}>
                <span className="hidden sm:block">
                    <SearchBar a11yOn={a11yOn} />
                </span>

                <Menu shadow="md" width={250} position="bottom-end">
                    <Menu.Target>
                        <SDiv
                            tag={a11yOn ? "button" : undefined}
                            aria-label={a11yOn ? "Notifications" : undefined}
                            className={
                                "text-color-gray-700 h-10 w-10 cursor-pointer rounded-md p-2 hover:bg-gray-100 active:bg-gray-200"
                            }
                            {...hoverProps}
                        >
                            <Bell className="h-full w-full text-gray-500" />
                        </SDiv>
                    </Menu.Target>

                    <Menu.Dropdown>
                        <Menu.Label>
                            <Text size="sm" style={{ marginBottom: rem(10) }}>
                                Notifications
                            </Text>
                        </Menu.Label>
                        <Menu.Item {...hoverProps}>
                            <FilePlus2 className="text-gray-500" /> New file
                            uploaded
                        </Menu.Item>

                        <Menu.Item {...hoverProps}>
                            <Mail className="text-gray-500" />
                            New message received
                        </Menu.Item>

                        <Menu.Item {...hoverProps}>
                            <Mail className="text-gray-500" />
                            New message received
                        </Menu.Item>
                    </Menu.Dropdown>
                </Menu>

                <Menu shadow="md" width={200} position="bottom-end">
                    <Menu.Target>
                        <SDiv
                            tag={a11yOn ? "button" : undefined}
                            aria-label={a11yOn ? "Profile" : undefined}
                            className={
                                "h-12 w-12 cursor-pointer overflow-hidden rounded-full p-0"
                            }
                            {...hoverProps}
                        >
                            <img
                                className="h-full w-auto object-cover"
                                src={profilePic}
                                alt={a11yOn ? "Profile" : undefined}
                                role={a11yOn ? "img" : undefined}
                            />
                        </SDiv>
                    </Menu.Target>

                    <Menu.Dropdown>
                        {profileMenuItems.map((item, index) => (
                            <Menu.Item
                                key={`profile-menu-item-${index}`}
                                {...hoverProps}
                            >
                                <item.icon className="text-gray-500" />
                                {item.name}
                            </Menu.Item>
                        ))}
                    </Menu.Dropdown>
                </Menu>
            </div>
        </SDiv>
    );
};

export default Header;
