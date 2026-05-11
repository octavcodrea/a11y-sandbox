import { useHoverData, useStateStore } from "../lib/hooks";
import {
    inputRootClass,
    settingsLabelContainerClass,
    tabContentClass,
} from "../lib/utils";
import { useDisclosure } from "@mantine/hooks";
import { Modal } from "@mantine/core";
import Button from "./button";
const themes = [
    { value: "light", label: "Light" },
    { value: "dark", label: "Dark" },
    { value: "system", label: "System" },
] as const;

const SettingsTabProfile = () => {
    const { a11yOn, firstName, lastName, dateOfBirth, theme } = useStateStore(
        (state) => state,
    );

    const { handleMouseEnter: hoverOn, handleMouseLeave: hoverOff } =
        useHoverData();
    const hoverProps = { onMouseEnter: hoverOn, onMouseLeave: hoverOff };

    const [opened, { open, close }] = useDisclosure(false);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        useStateStore.setState({ firstName: e.target.value });
    };

    const labelClass = "font-semibold text-sm";

    return (
        <>
            <div
                id="profile-tabpanel"
                className={tabContentClass}
                role={a11yOn ? "tabpanel" : undefined}
                aria-labelledby="profile-tab"
            >
                <h3 className="text-base font-bold sm:text-xl">Profile</h3>
                <div className={settingsLabelContainerClass}>
                    {a11yOn ? (
                        <label
                            htmlFor="settings-first-name"
                            className={labelClass}
                            {...hoverProps}
                        >
                            First name
                        </label>
                    ) : (
                        <p className={labelClass}>First name</p>
                    )}
                    <div className={inputRootClass}>
                        <input
                            id={a11yOn ? "settings-first-name" : undefined}
                            placeholder="First name"
                            className="border-none outline-none"
                            value={firstName}
                            onChange={handleInputChange}
                            {...hoverProps}
                        />
                    </div>
                </div>

                <div className={settingsLabelContainerClass}>
                    {a11yOn ? (
                        <label
                            htmlFor="settings-last-name"
                            className={labelClass}
                            {...hoverProps}
                        >
                            Last name
                        </label>
                    ) : (
                        <p className={labelClass}>Last name</p>
                    )}
                    <div className={inputRootClass}>
                        <input
                            id={a11yOn ? "settings-last-name" : undefined}
                            placeholder="Last name"
                            className="border-none outline-none"
                            value={lastName}
                            onChange={(e) =>
                                useStateStore.setState({
                                    lastName: e.target.value,
                                })
                            }
                            {...hoverProps}
                        />
                    </div>
                </div>

                {/* Date of birth */}
                <div className={settingsLabelContainerClass}>
                    {a11yOn ? (
                        <label
                            htmlFor="settings-dob"
                            className={labelClass}
                            {...hoverProps}
                        >
                            Date of birth
                        </label>
                    ) : (
                        <p className={labelClass}>Date of birth</p>
                    )}
                    <div className={inputRootClass}>
                        <input
                            id={a11yOn ? "settings-dob" : undefined}
                            type="date"
                            value={dateOfBirth}
                            onChange={(e) =>
                                useStateStore.setState({
                                    dateOfBirth: e.target.value,
                                })
                            }
                            className="border-none outline-none"
                            {...hoverProps}
                        />
                    </div>
                </div>

                {/* App theme */}
                <div className={settingsLabelContainerClass}>
                    <p
                        id={a11yOn ? "settings-theme-label" : undefined}
                        className={labelClass}
                        {...hoverProps}
                    >
                        App theme
                    </p>
                    <div
                        role={a11yOn ? "group" : undefined}
                        aria-labelledby={
                            a11yOn ? "settings-theme-label" : undefined
                        }
                        className="flex gap-2"
                        {...hoverProps}
                    >
                        {themes.map((t) =>
                            a11yOn ? (
                                <label
                                    key={t.value}
                                    className={`cursor-pointer rounded-md border px-3 py-1 text-xs sm:text-sm ${
                                        theme === t.value
                                            ? "border-blue-500 bg-blue-50 font-semibold text-blue-600"
                                            : "border-gray-200 text-gray-700"
                                    }`}
                                    {...hoverProps}
                                >
                                    <input
                                        type="radio"
                                        name="settings-theme"
                                        value={t.value}
                                        checked={theme === t.value}
                                        onChange={() =>
                                            useStateStore.setState({
                                                theme: t.value,
                                            })
                                        }
                                        className="sr-only"
                                        {...hoverProps}
                                    />
                                    {t.label}
                                </label>
                            ) : (
                                <div
                                    key={t.value}
                                    onClick={() =>
                                        useStateStore.setState({
                                            theme: t.value,
                                        })
                                    }
                                    className={`cursor-pointer rounded-md border px-3 py-1 text-xs sm:text-sm ${
                                        theme === t.value
                                            ? "border-blue-500 bg-blue-50 font-semibold text-blue-600"
                                            : "border-gray-200 text-gray-700"
                                    }`}
                                    {...hoverProps}
                                >
                                    {t.label}
                                </div>
                            ),
                        )}
                    </div>
                </div>

                <div className={settingsLabelContainerClass}>
                    <p className={labelClass}>Delete account</p>
                    <Button
                        variant="danger"
                        onClick={open}
                        {...hoverProps}
                    >
                        Delete
                    </Button>
                </div>
            </div>

            <Modal
                opened={opened}
                onClose={close}
                title={
                    <h3 className="text-base font-bold sm:text-xl">
                        Confirm account deletion
                    </h3>
                }
                centered
                closeButtonProps={{
                    "aria-label": a11yOn ? "Close modal" : undefined,
                    ...hoverProps,
                }}
            >
                <p>
                    Are you sure you want to delete your account? This action
                    cannot be undone.
                </p>
                <div className="mt-5 flex justify-end gap-4">
                    <Button variant="secondary" onClick={close} {...hoverProps}>
                        Cancel
                    </Button>
                    <Button variant="danger" onClick={close} {...hoverProps}>
                        Delete
                    </Button>
                </div>
            </Modal>
        </>
    );
};

export default SettingsTabProfile;
