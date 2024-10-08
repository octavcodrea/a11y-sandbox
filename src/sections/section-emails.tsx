import { Checkbox, Tooltip } from "@mantine/core";
import { Star } from "lucide-react";
import React, { useMemo, useState } from "react";
import { emailCategories, emailExamples } from "../lib/constants";
import { useHoverData, useStateStore } from "../lib/hooks";
import { EmailCategoryType, EmailExampleType } from "../lib/types";
import SDiv from "../components/s-div";
import ViewEmail from "../components/view-email";
import { formatDate } from "../lib/utils";

const Emails = () => {
    const a11yOn = useStateStore((state) => state.a11yOn);

    const { handleMouseEnter: hoverOn, handleMouseLeave: hoverOff } =
        useHoverData();
    const hoverProps = { onMouseEnter: hoverOn, onMouseLeave: hoverOff };

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

    const handleMarkAsUnread = (id: string) => {
        setEmailsData(
            emailsData.map((email) => {
                if (email.id === id) {
                    return {
                        ...email,
                        read: false,
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
            <h2 className="text-3xl font-bold">Emails</h2>
            <p>An example of an email client, with a list of emails.</p>

            <div className="flex min-h-[500px] flex-col gap-4 rounded-md border border-gray-200 p-2">
                {viewingEmail ? null : (
                    <div className="flex w-full gap-2">
                        {emailCategories.map((category) => {
                            const ThisIcon = React.cloneElement(category.icon, {
                                className: `${selectedCategory === category.id ? "stroke-blue-600" : "stroke-gray-500"} w-5 h-5`,
                            });

                            return (
                                <button
                                    role={a11yOn ? "tab" : undefined}
                                    key={category.id}
                                    onClick={() =>
                                        setSelectedCategory(category.id)
                                    }
                                    className={`flex w-full gap-2 ${
                                        selectedCategory === category.id
                                            ? "bg-blue-100 font-semibold text-blue-600"
                                            : "bg-gray-100"
                                    } rounded-md p-2`}
                                    aria-selected={
                                        a11yOn
                                            ? selectedCategory === category.id
                                            : undefined
                                    }
                                    {...hoverProps}
                                >
                                    {ThisIcon}
                                    {category.name}
                                </button>
                            );
                        })}
                    </div>
                )}
                <div className="min-h-[300px] overflow-auto">
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
                                        className={` ${email.read ? "bg-gray-100" : "font-semibold"} relative flex w-full cursor-pointer items-center py-2`}
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

                                        <td className="flex max-w-[168px] flex-1">
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
                                        <td className="flex px-4 text-right">
                                            {formatDate(email.date)}
                                        </td>
                                    </tr>
                                ))}
                            </tbody>
                        </table>
                    )}
                </div>
            </div>
        </div>
    );
};

export default Emails;
