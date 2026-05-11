import "@mantine/core/styles.css";
import classes from "./App.module.scss";
import Header from "./components/header";
import SDiv from "./components/s-div";
import ConferenceControls from "./sections/section-conference-controls";
import Emails from "./sections/section-emails";
import FileList from "./sections/section-file-list";
import Settings from "./sections/section-settings";
import Chat from "./sections/section-chat";
import SignupForm from "./sections/section-signup-form";
import { useHoverData, useStateStore } from "./lib/hooks";
import { cls } from "./lib/utils";
import { useState } from "react";
import { Info } from "lucide-react";
import Code from "./components/code";

const PageHome = () => {
    const a11yOn = useStateStore((state) => state.a11yOn);

    const { handleMouseEnter: hoverOn, handleMouseLeave: hoverOff } =
        useHoverData();
    const hoverProps = { onMouseEnter: hoverOn, onMouseLeave: hoverOff };

    const [info, setInfo] = useState(false);

    const toggleInfo = () => {
        setInfo(!info);
    };

    return (
        <>
            <Header />
            <SDiv tag={a11yOn ? "main" : "div"}>
                <div
                    className={cls(
                        classes.body,
                        "mx-auto flex max-w-5xl flex-col gap-16 p-4 py-12",
                    )}
                >
                    <div className="flex flex-col gap-4">
                        <h1 className="text-2xl font-extrabold text-gray-800 sm:text-4xl">
                            A11y Sandbox
                        </h1>
                        <p>
                            This application demonstrates examples of a basic
                            user interface with both accessible and inaccessible
                            practices.
                            <br />
                            The goal is to illustrate how a UI that appears
                            adequate to a sighted user can be challenging when
                            using assistive technology.
                            <br />
                            {/* You can toggle the accessibility features using the
                            button below. */}
                        </p>

                        <p>
                            Visually, this application appears the same whether
                            accessibility features are enabled or not.
                            <br /> However, the accessibility enhancements are
                            present and most noticeable when using a screen
                            reader or keyboard navigation.
                        </p>

                        <p>
                            The app uses{" "}
                            <a
                                href="https://mantine.dev"
                                target="_blank"
                                rel="noreferrer"
                                className="text-blue-600 underline"
                            >
                                Mantine
                            </a>{" "}
                            as a component library. While Mantine provides
                            accessible primitives, using a component library
                            alone does not substitute for deliberate
                            accessibility implementation — correct ARIA
                            attributes, semantic markup, and labelling still
                            require intentional choices from the developer.
                        </p>
                    </div>

                    <div className="flex flex-col gap-4">
                        <button
                            onClick={toggleInfo}
                            className="mr-auto flex items-center gap-2 px-2 font-semibold text-blue-600"
                            aria-expanded={a11yOn ? info : undefined}
                            {...hoverProps}
                        >
                            <Info className="h-5 w-5" />{" "}
                            {info ? "Hide" : "Show"} A11y info - Header
                        </button>

                        {info && (
                            <p>
                                The header element can be rendered with a{" "}
                                <Code>header</Code> tag.
                                <br />
                                The <Code>header</Code> tag is used to indicate
                                that the content is a header for the page or
                                section, and can be navigated to using landmarks
                                in screen readers.
                                <br />
                                <br />
                                The breadcrumb navigation is also rendered using
                                a <Code>nav</Code> tag, which is used to
                                indicate that the content is a navigation menu.
                                The <Code>aria-current</Code> attribute is used
                                to indicate the current page.
                                <br />
                                <br />
                                The search bar, which is wrapped in a{" "}
                                <Code>form</Code> tag to indicate that it is a
                                form, with the <Code>role="search"</Code> .
                                <br />
                                <br />
                                The clickable icons are wrapped in a{" "}
                                <Code>button</Code> element when accessibility
                                features are enabled, making them focusable. The
                                buttons are labeled with their purpose using{" "}
                                <Code>aria-label</Code> .
                                <br />
                                If they have menus, the{" "}
                                <Code>aria-expanded</Code> attribute is used to
                                indicate whether the menu is open or closed.
                                <br />
                            </p>
                        )}
                    </div>

                    <FileList />

                    <div className="flex w-full border-t border-gray-200" />

                    <ConferenceControls />
                    <div className="flex w-full border-t border-gray-200" />

                    <Settings />

                    <div className="flex w-full border-t border-gray-200" />

                    <Emails />

                    <div className="flex w-full border-t border-gray-200" />

                    <SignupForm />

                    <div className="flex w-full border-t border-gray-200" />

                    <Chat />

                    <div className="flex w-full border-t border-gray-200" />
                </div>

                <div
                    className={"aria-announcer"}
                    role="status"
                    aria-live="polite"
                    aria-atomic="true"
                >
                    Accessibility features are {a11yOn ? "enabled" : "disabled"}
                </div>
            </SDiv>
        </>
    );
};

export default PageHome;
