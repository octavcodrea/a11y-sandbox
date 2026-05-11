import { useHoverData, useStateStore } from "../lib/hooks";
import FileListItem, { FileListItemType } from "../components/file-list-item";
import { useState } from "react";
import { ChevronDown, ChevronUp, Info } from "lucide-react";
import SDiv from "../components/s-div";
import Code from "../components/code";

const folders: FileListItemType[] = [
    { title: "Folder 1", type: "folder" },
    { title: "Folder 2", type: "folder" },
    { title: "Folder 3", type: "folder" },
];

const files: FileListItemType[] = [
    { title: "File 1", type: "document" },
    { title: "File 2", type: "image" },
    { title: "File 3", type: "video" },
    { title: "File 4", type: "audio" },
];

const FileList = () => {
    const a11yOn = useStateStore((state) => state.a11yOn);

    const { handleMouseEnter: hoverOn, handleMouseLeave: hoverOff } =
        useHoverData();
    const hoverProps = { onMouseEnter: hoverOn, onMouseLeave: hoverOff };

    const [info, setInfo] = useState(false);

    const [foldersOpen, setFoldersOpen] = useState(false);
    const [filesOpen, setFilesOpen] = useState(false);

    const toggleFolders = () => {
        setFoldersOpen(!foldersOpen);
    };

    const toggleFiles = () => {
        setFilesOpen(!filesOpen);
    };

    const toggleInfo = () => {
        setInfo(!info);
    };

    const headerClass =
        "flex items-center justify-between cursor-pointer w-full";
    const titleClass = "text-base font-bold text-gray-700 sm:text-xl";
    const listClass = "flex flex-col gap-2";

    return (
        <div className="flex flex-col gap-5">
            <h2 className="text-xl font-bold sm:text-3xl">File manager</h2>
            <p>
                An example of a file manager with collapsible accordion
                sections. Users should be able to understand the structure of
                the file system at a glance,                 and expand or collapse sections with ease.
            </p>

            <div className="flex flex-col gap-4">
                <div
                    className={
                        "flex flex-col gap-4 rounded-lg border border-gray-300 p-4"
                    }
                >
                    <SDiv
                        tag={a11yOn ? "button" : undefined}
                        className={headerClass}
                        onClick={toggleFolders}
                        aria-expanded={a11yOn ? foldersOpen : undefined}
                        {...hoverProps}
                    >
                        <h3 className={titleClass}>Folders</h3>

                        {foldersOpen ? (
                            <ChevronUp className="text-gray-500" />
                        ) : (
                            <ChevronDown className="text-gray-500" />
                        )}
                    </SDiv>

                    {foldersOpen && (
                        <SDiv
                            tag={a11yOn ? "ul" : undefined}
                            className={listClass}
                            {...hoverProps}
                        >
                            {folders.map((file, index) => (
                                <FileListItem
                                    key={index}
                                    {...file}
                                    a11yOn={a11yOn}
                                />
                            ))}
                        </SDiv>
                    )}
                </div>

                <div
                    className={
                        "flex flex-col gap-4 rounded-lg border border-gray-300 p-4"
                    }
                >
                    <SDiv
                        tag={a11yOn ? "button" : undefined}
                        className={headerClass}
                        onClick={toggleFiles}
                        aria-expanded={a11yOn ? filesOpen : undefined}
                        {...hoverProps}
                    >
                        <h3 className={titleClass}>Files</h3>

                        {filesOpen ? (
                            <ChevronUp className="text-gray-500" />
                        ) : (
                            <ChevronDown className="text-gray-500" />
                        )}
                    </SDiv>

                    {filesOpen && (
                        <SDiv
                            tag={a11yOn ? "ul" : undefined}
                            className={listClass}
                        >
                            {files.map((file, index) => (
                                <FileListItem
                                    key={index}
                                    {...file}
                                    a11yOn={a11yOn}
                                />
                            ))}
                        </SDiv>
                    )}
                </div>
            </div>

            <div className="mt-6 flex flex-col gap-4">
                <button
                    onClick={toggleInfo}
                    className="mr-auto flex items-center gap-2 px-2 font-semibold text-blue-600"
                    aria-expanded={a11yOn ? info : undefined}
                    {...hoverProps}
                >
                    <Info className="h-5 w-5" /> {info ? "Hide" : "Show"} A11y
                    info - File manager
                </button>

                {info && (
                    <p>
                        In this example, <Code>aria-expanded</Code> is used to
                        indicate whether the section is open or closed. The
                        sections can be toggled by clicking on the headers.
                        <br />
                        <br />
                        To make the headers focusable, they are wrapped in a{" "}
                        <Code>button</Code> element when accessibility features
                        are enabled.
                        <br />
                        <br />
                        The elements are wrapped in an <Code>ul</Code> element
                        to indicate that they are a list.
                        <br />
                        Icon buttons that toggle the options for each item are
                        labeled with <Code>aria-label</Code>, and use{" "}
                        <Code>aria-expanded</Code> to indicate whether the
                        options are open or closed.
                    </p>
                )}
            </div>
        </div>
    );
};

export default FileList;
