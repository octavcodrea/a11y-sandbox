import { Switch } from "@mantine/core";
import { useHoverData, useStateStore } from "../lib/hooks";
import { settingsLabelContainerClass, tabContentClass } from "../lib/utils";

const SettingsTabNotifications = () => {
    const { a11yOn, emailNotifications, pushNotifications } = useStateStore(
        (state) => state,
    );

    const { handleMouseEnter: hoverOn, handleMouseLeave: hoverOff } =
        useHoverData();
    const hoverProps = { onMouseEnter: hoverOn, onMouseLeave: hoverOff };

    const labelClass = "font-semibold text-sm";

    const handleEmailNotificationsChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        useStateStore.setState({ emailNotifications: event.target.checked });
    };

    const handlePushNotificationsChange = (
        event: React.ChangeEvent<HTMLInputElement>,
    ) => {
        useStateStore.setState({ pushNotifications: event.target.checked });
    };

    return (
        <div
            id="notifications-tabpanel"
            className={tabContentClass}
            role={a11yOn ? "tabpanel" : undefined}
            aria-labelledby="notifications-tab"
        >
            <h3 className="text-base font-bold sm:text-xl">Notifications</h3>
            <div className={settingsLabelContainerClass}>
                <p
                    id={a11yOn ? "settings-email-notif-label" : undefined}
                    className={labelClass}
                    {...hoverProps}
                >
                    Email notifications
                </p>
                <Switch
                    checked={emailNotifications}
                    onChange={handleEmailNotificationsChange}
                    aria-labelledby={
                        a11yOn ? "settings-email-notif-label" : undefined
                    }
                    wrapperProps={{
                        ...hoverProps,
                        "aria-labelledby": a11yOn
                            ? "settings-email-notif-label"
                            : undefined,
                    }}
                />
            </div>

            <div className={settingsLabelContainerClass}>
                <p
                    id={a11yOn ? "settings-push-notif-label" : undefined}
                    className={labelClass}
                    {...hoverProps}
                >
                    Push notifications
                </p>
                <Switch
                    checked={pushNotifications}
                    onChange={handlePushNotificationsChange}
                    aria-labelledby={
                        a11yOn ? "settings-push-notif-label" : undefined
                    }
                    wrapperProps={{
                        ...hoverProps,
                        "aria-labelledby": a11yOn
                            ? "settings-push-notif-label"
                            : undefined,
                    }}
                />
            </div>
        </div>
    );
};

export default SettingsTabNotifications;
