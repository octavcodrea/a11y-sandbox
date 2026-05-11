import { Checkbox, Tooltip } from "@mantine/core";
import { Info, Star } from "lucide-react";
import React, { useMemo, useState } from "react";
import { emailCategories, emailExamples } from "../lib/constants";
import { useHoverData, useStateStore } from "../lib/hooks";
import { EmailCategoryType, EmailExampleType } from "../lib/types";
import Code from "../components/code";
import SDiv from "../components/s-div";
import TabButton from "../components/tab-button";
import ViewEmail from "../components/view-email";
import { formatDate } from "../lib/utils";

const Emails = () => {
    const a11yOn = useStateStore((state) => state.a11yOn);

    const { handleMouseEnter: hoverOn, handleMouseLeave: hoverOff } =
        useHoverData();
    const hoverProps = { onMouseEnter: hoverOn, onMouseLeave: hoverOff };

    const [info, setInfo] = useState(false);

    const [selectedCategory, setSelectedCategory] =
        useState<EmailCategoryType | null>(null);

    const [emailsData, setEmailsData] = useState(emailExamples);
    const [selectedEmails, setSelectedEmails] = useState<string[]>([]);

    const [viewingEmail, setViewingEmail] = useState<EmailExampleType | null>(
        null,
    );

    const handleToggleSelectEmail = (id: string) => {
        if (selectedEmails.includes(id)) {
            setSelectedEmails(selectedEmails.filter((email) => email !== id));
        } else {
            setSelectedEmails([...selectedEmails, id]);
        }
    };

    const handleToggleFavorite = (id: string) => {
        setEmailsData(
            emailsData.map((email) => {
                if (email.id === id) {
                    return {
                        ...email,
                        favorite: !email.favorite,
                    };
                }

                return email;
            }),
        );
    };

    const filteredEmails = useMemo(() => {
        if (selectedCategory === null) {
            return emailsData;
        }

        return emailsData.filter(
            (email) => email.category === selectedCategory,
        );
    }, [selectedCategory, emailsData]);

    return (
        <div className="flex flex-col gap-4">
            <h2 className="text-xl font-bold sm:text-3xl">Emails</h2>
            <p>
                An example of an email client with category filters and a
                message list. Users should be able to filter by category,
                identify unread messages, and open individual emails.
            </p>

            <div className="flex flex-col gap-4 rounded-md border border-gray-200 p-2 sm:min-h-[500px]">
                {viewingEmail ? null : (
                    <div className="flex w-full gap-2 overflow-x-auto pb-1">
                        {emailCategories.map((category) => {
                            const isActive = selectedCategory === category.id;
                            const icon = React.cloneElement(category.icon, {
                                className: `${isActive ? "stroke-blue-600" : "stroke-gray-500"} w-5 h-5`,
                            });

                            return (
                                <TabButton
                                    role={a11yOn ? "tab" : undefined}
                                    key={category.id}
                                    active={isActive}
                                    icon={icon}
                                    onClick={() =>
                                        setSelectedCategory(category.id)
                                    }
                                    className="flex-shrink-0 sm:flex-1"
                                    aria-selected={
                                        a11yOn ? isActive : undefined
                                    }
                                    {...hoverProps}
                                >
                                    {category.name}
                                </TabButton>
                            );
                        })}
                    </div>
                )}
                <div className="overflow-auto sm:min-h-[300px]">
                    {viewingEmail ? (
                        <ViewEmail
                            email={viewingEmail}
                            setViewingEmail={setViewingEmail}
                        />
                    ) : (
                        <table className="block w-full">
                            <thead className="hidden">
                                <tr>
                                    <th></th>
                                    <th></th>
                                    <th>From</th>
                                    <th>Subject</th>
                                    <th>Date</th>
                                </tr>
                            </thead>
                            <tbody className="block w-full">
                                {filteredEmails.map((email) => (
                                    <tr
                                        key={email.id}
                                        className={` ${email.read ? "bg-gray-100" : "font-semibold"} relative flex w-full cursor-pointer items-center py-2 text-xs sm:text-base`}
                                        onClick={() => setViewingEmail(email)}
                                    >
                                        <td className="flex px-2">
                                            <Checkbox
                                                checked={selectedEmails.includes(
                                                    email.id,
                                                )}
                                                onChange={() =>
                                                    handleToggleSelectEmail(
                                                        email.id,
                                                    )
                                                }
                                                onClick={(e) =>
                                                    e.stopPropagation()
                                                }
                                                aria-label={
                                                    a11yOn
                                                        ? `Select email ${email.subject}`
                                                        : undefined
                                                }
                                                {...hoverProps}
                                            />
                                        </td>
                                        <td className="flex px-2">
                                            <Tooltip label="Favorite">
                                                <SDiv
                                                    tag={
                                                        a11yOn
                                                            ? "button"
                                                            : undefined
                                                    }
                                                    onClick={(e) => {
                                                        e.stopPropagation();
                                                        handleToggleFavorite(
                                                            email.id,
                                                        );
                                                    }}
                                                    className="cursor-pointer"
                                                    aria-label={`${a11yOn ? (email.favorite ? "Favorite" : "Not favorite") : ""}`}
                                                    {...hoverProps}
                                                >
                                                    <Star
                                                        className={`${email.favorite ? "fill-yellow-500 stroke-yellow-500" : "stroke-gray-400"} `}
                                                    />
                                                </SDiv>
                                            </Tooltip>
                                        </td>

                                        <td className="flex flex-1 sm:max-w-[168px]">
                                            {email.from}
                                        </td>
                                        <td className="flex flex-1 text-center">
                                            <SDiv
                                                tag={
                                                    a11yOn
                                                        ? "button"
                                                        : undefined
                                                }
                                                className="flex flex-1"
                                                {...hoverProps}
                                            >
                                                {email.subject}
                                            </SDiv>
                                        </td>
                                        <td className="hidden px-4 text-right sm:flex">
                                            {formatDate(email.date)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>

            <div className="mt-6 flex flex-col gap-4">
                <button
                    onClick={() => setInfo(!info)}
                    className="mr-auto flex items-center gap-2 px-2 font-semibold text-blue-600"
                    aria-expanded={a11yOn ? info : undefined}
                    {...hoverProps}
                >
                    <Info className="h-5 w-5" /> {info ? "Hide" : "Show"} A11y
                    info - Emails
                </button>

                {info && (
                    <p>
                        The category tabs use <Code>role="tab"</Code> and{" "}
                        <Code>aria-selected</Code> when accessibility is on, so
                        assistive technology announces which filter is active
                        and presents the row as a proper tab list. Without
                        these, the tabs are plain buttons with no indication of
                        their selected state beyond visual styling.
                        <br />
                        <br />
                        Each row's checkbox gets an{" "}
                        <Code>aria-label</Code> tied to the email subject, so
                        screen readers read "Select email: Project update" rather
                        than just "checkbox". The favourite star is a focusable{" "}
                        <Code>button</Code> with an <Code>aria-label</Code>{" "}
                        describing its current state ("Favorite" / "Not
                        favorite") when a11y is on — without it, the control is
                        an unlabelled, non-interactive element.
                        <br />
                        <br />
                        The email subject cell becomes a <Code>button</Code>{" "}
                        when a11y is on, making it keyboard-reachable. The table
                        also has a visually hidden <Code>thead</Code> with
                        column labels so screen readers can associate each cell
                        with its column when navigating by row.
                    </p>
                )}
            </div>
        </div>
    );
};

export default Emails;
