import { HTMLAttributes, useMemo } from "react";
import { create } from "zustand";
import { tagBackgrounds } from "./utils";

interface StateStore {
    a11yOn: boolean;
    overlay: boolean;

    firstName: string;
    lastName: string;

    emailNotifications: boolean;
    pushNotifications: boolean;

    is12HourTime: boolean;

    microphoneOn: boolean;
    cameraOn: boolean;
    handRaised: boolean;

    dateOfBirth: string;
    theme: "light" | "dark" | "system";
}

export const useStateStore = create<StateStore>((set) => ({
    a11yOn: localStorage.getItem("a11yOn") === "true" || false,
    overlay: false,

    firstName: "John",
    lastName: "Doe",

    emailNotifications: true,
    pushNotifications: true,

    is12HourTime: true,

    microphoneOn: false,
    cameraOn: false,
    handRaised: false,

    dateOfBirth: "1990-01-01",
    theme: "system",
}));

//implementing a component where the user can hover over elements and see ARIA attributes
interface HoverDataState {
    hoveredElement: HTMLElement | null;
}

const attributesToCheck: {
    label: string;
    value: keyof HTMLAttributes<HTMLElement>;
}[] = [
    { label: "ARIA role", value: "role" },
    { label: "ARIA expanded", value: "aria-expanded" },
    { label: "ARIA checked", value: "aria-checked" },
    { label: "ARIA current", value: "aria-current" },
    { label: "ARIA described by", value: "aria-describedby" },
    { label: "ARIA labelled by", value: "aria-labelledby" },
    { label: "ARIA has popup", value: "aria-haspopup" },
    { label: "ARIA hidden", value: "aria-hidden" },
    { label: "ARIA selected", value: "aria-selected" },
    { label: "ARIA invalid", value: "aria-invalid" },
    { label: "ARIA required", value: "aria-required" },
];

const tagsToMakeLabelFromTextContent = [
    "button",
    "a",
    "h1",
    "h2",
    "h3",
    "h4",
    "h5",
    "h6",
    "p",
    "span",
    "li",
    "label",
];

export const useHoverDataStore = create<HoverDataState>((set) => ({
    hoveredElement: null,
}));

export const useHoverData = () => {
    const { hoveredElement } = useHoverDataStore();

    const handleMouseEnter = (event: React.MouseEvent<HTMLElement>) => {
        const target = event.currentTarget as HTMLElement;
        useHoverDataStore.setState({ hoveredElement: target });
    };

    const handleMouseLeave = (event: React.MouseEvent<HTMLElement>) => {
        useHoverDataStore.setState({ hoveredElement: null });
    };

    const invisibleClass = "opacity-0 bg-transparent shadow-none";
    const visibleClass = "opacity-100 bg-white shadow-md";

    const renderedHoverData = useMemo(() => {
        let noValue = true;

        const ariaLabelValue = hoveredElement?.getAttribute("aria-label");
        const tag = hoveredElement?.tagName.toLowerCase();
        const isInputLike =
            tag === "input" || tag === "select" || tag === "textarea";
        const placeholderValue = isInputLike
            ? hoveredElement?.getAttribute("placeholder")
            : null;
        const textContent =
            hoveredElement && !isInputLike
                ? tagsToMakeLabelFromTextContent.includes(tag ?? "")
                    ? hoveredElement?.textContent?.trim()
                    : null
                : null;

        // label[for] → input relationship
        const labelForValue =
            tag === "label"
                ? hoveredElement?.getAttribute("for")
                : null;
        const labelledInputEl = labelForValue
            ? document.getElementById(labelForValue)
            : null;

        // input[id] → label relationship
        const elementId = hoveredElement?.getAttribute("id");
        const associatedLabelEl = elementId
            ? document.querySelector(`label[for="${elementId}"]`)
            : null;
        const associatedLabelText =
            associatedLabelEl?.textContent?.trim() || null;

        // aria-describedby / aria-labelledby → resolved text
        const describedById =
            hoveredElement?.getAttribute("aria-describedby");
        const describedByText = describedById
            ? document.getElementById(describedById)?.textContent?.trim() ||
              null
            : null;

        const labelledById =
            hoveredElement?.getAttribute("aria-labelledby");
        const labelledByText = labelledById
            ? document.getElementById(labelledById)?.textContent?.trim() ||
              null
            : null;

        if (
            ariaLabelValue ||
            textContent ||
            placeholderValue ||
            labelForValue ||
            associatedLabelText
        ) {
            noValue = false;
        }

        return (
            <div
                className={`fixed bottom-4 right-4 z-50 max-w-[500px] rounded-lg border border-gray-100 shadow-md transition-opacity duration-300 ${hoveredElement ? visibleClass : invisibleClass}`}
                aria-hidden
            >
                {hoveredElement ? (
                    <>
                        <div
                            className={`rounded-t-lg p-2 ${tagBackgrounds[hoveredElement.tagName.toLowerCase()] || "bg-gray-500"}`}
                        >
                            <h3 className="text-sm font-bold text-white">
                                {hoveredElement.tagName.toLowerCase()}
                            </h3>
                        </div>
                        <div className="gap- flex flex-col px-4 py-2">
                            <div
                                key={"label"}
                                className="flex items-center gap-4"
                            >
                                <strong className="text-sm">
                                    {ariaLabelValue
                                        ? "ARIA label"
                                        : placeholderValue
                                          ? "Placeholder"
                                          : textContent
                                            ? "Label (derived from text content)"
                                            : null}
                                </strong>
                                <span>
                                    {ariaLabelValue ||
                                        placeholderValue ||
                                        textContent ||
                                        null}
                                </span>
                            </div>

                            {/* label[for] → shows which input it labels */}
                            {labelForValue && (
                                <div className="flex items-center gap-4">
                                    <strong className="text-sm">
                                        Labels input
                                    </strong>
                                    <span className="text-gray-500">
                                        #{labelForValue}
                                        {labelledInputEl ? (
                                            <span className="ml-1 text-green-600">
                                                ✓ linked
                                            </span>
                                        ) : (
                                            <span className="ml-1 text-red-500">
                                                ✗ no match
                                            </span>
                                        )}
                                    </span>
                                </div>
                            )}

                            {/* input[id] → shows which label points to it */}
                            {associatedLabelText && (
                                <div className="flex items-center gap-4">
                                    <strong className="text-sm">
                                        Labelled by
                                    </strong>
                                    <span>"{associatedLabelText}"</span>
                                </div>
                            )}

                            {attributesToCheck
                                .filter((a) => a.value !== "aria-label")
                                .map((attr) => {
                                    const value = hoveredElement.getAttribute(
                                        attr.value,
                                    );

                                    if (value) {
                                        noValue = false;
                                    }

                                    if (!value) return null;

                                    // resolve referenced element text for id-based attributes
                                    const isDescribedBy =
                                        attr.value === "aria-describedby";
                                    const isLabelledBy =
                                        attr.value === "aria-labelledby";
                                    const resolvedText = isDescribedBy
                                        ? describedByText
                                        : isLabelledBy
                                          ? labelledByText
                                          : null;

                                    return (
                                        <div
                                            key={attr.value}
                                            className="flex items-center gap-4"
                                        >
                                            <strong className="text-sm">
                                                {attr.label}
                                            </strong>
                                            <span>
                                                {resolvedText
                                                    ? `"${resolvedText}"`
                                                    : value}
                                            </span>
                                        </div>
                                    );
                                })}

                            {noValue && (
                                <div className="text-gray-400">
                                    No ARIA attributes found
                                </div>
                            )}
                        </div>
                    </>
                ) : null}
            </div>
        );
    }, [hoveredElement]);

    return {
        hoveredElement,
        handleMouseEnter,
        handleMouseLeave,
        renderedHoverData,
    };
};
