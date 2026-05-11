import { Menu, rem, Text } from "@mantine/core";
import { Search, X } from "lucide-react";
import { useCallback, useEffect, useRef, useState } from "react";
import { cls, inputRootClass } from "../lib/utils";
import SDiv from "./s-div";

import { File, Folder, Image } from "lucide-react";
import { useHoverData } from "../lib/hooks";

type SearchBarProps = {
    a11yOn?: boolean;
};

const SearchBar = (props: SearchBarProps) => {
    const { a11yOn } = props;

    const { handleMouseEnter: hoverOn, handleMouseLeave: hoverOff } =
        useHoverData();
    const hoverProps = { onMouseEnter: hoverOn, onMouseLeave: hoverOff };

    const [inputValue, setInputValue] = useState("");
    const [searchResultsOpen, setSearchResultsOpen] = useState(false);
    const [lastAnnouncement, setLastAnnouncement] = useState("");
    const [inputFocused, setInputFocused] = useState(false);

    const openSearchTimer = useRef<NodeJS.Timeout | null>(null);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setInputValue(e.target.value);
    };

    const checkIfSearching = useCallback(() => {
        if (inputValue) {
            setSearchResultsOpen(true);
            setLastAnnouncement(`Found ${inputValue.length} results`);
        } else {
            setSearchResultsOpen(false);
        }
    }, [inputValue]);

    useEffect(() => {
        if (openSearchTimer.current) {
            clearTimeout(openSearchTimer.current);
        }

        if (inputValue) {
            openSearchTimer.current = setTimeout(() => {
                checkIfSearching();
            }, 500);
        } else {
            setSearchResultsOpen(false);
        }
    }, [inputValue, checkIfSearching]);

    return (
        <div>
            <Menu
                shadow="md"
                width={250}
                position="bottom-end"
                opened={searchResultsOpen}
                trapFocus={false}
            >
                <Menu.Target>
                    <SDiv
                        className={cls(
                            inputRootClass,
                            inputFocused ? "shadow-md" : "",
                        )}
                        tag={a11yOn ? "form" : undefined}
                        role={a11yOn ? "search" : undefined}
                        {...hoverProps}
                    >
                        <input
                            aria-label={a11yOn ? "Search" : undefined}
                            placeholder="Search for files"
                            className="border-none outline-none"
                            value={inputValue}
                            onChange={handleInputChange}
                            onFocus={() => setInputFocused(true)}
                            onBlur={() => setInputFocused(false)}
                            {...hoverProps}
                        />
                        <button
                            className={
                                inputValue ? "text-gray-400" : "invisible"
                            }
                            onClick={() => setInputValue("")}
                            aria-label={a11yOn ? "Search" : undefined}
                            {...hoverProps}
                        >
                            <Search className="text-gray-500" />
                        </button>
                        <button
                            className={
                                inputValue ? "text-gray-400" : "invisible"
                            }
                            onClick={() => setInputValue("")}
                            aria-label={a11yOn ? "Clear search" : undefined}
                            {...hoverProps}
                        >
                            <X className="text-gray-500" />
                        </button>
                    </SDiv>
                </Menu.Target>

                <Menu.Dropdown>
                    <Menu.Label>
                        <Text size="sm" style={{ marginBottom: rem(10) }}>
                            Search results
                        </Text>
                    </Menu.Label>
                    <Menu.Item {...hoverProps}>
                        <File className="text-gray-500" /> File 1
                    </Menu.Item>

                    <Menu.Item {...hoverProps}>
                        <Folder className="text-gray-500" />
                        Folder 1
                    </Menu.Item>

                    <Menu.Item {...hoverProps}>
                        <Image className="text-gray-500" />
                        Image 1
                    </Menu.Item>
                </Menu.Dropdown>
            </Menu>

            {a11yOn && (
                <div
                    className="aria-announcer"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    {lastAnnouncement}
                </div>
            )}
        </div>
    );
};

export default SearchBar;
