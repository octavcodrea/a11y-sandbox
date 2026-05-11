import { Radio, Select } from "@mantine/core";
import { useHoverData, useStateStore } from "../lib/hooks";
import { settingsLabelContainerClass, tabContentClass } from "../lib/utils";
import SDiv from "./s-div";

const SettingsTabGeneral = () => {
    const { a11yOn, is12HourTime } = useStateStore((state) => state);

    const { handleMouseEnter: hoverOn, handleMouseLeave: hoverOff } =
        useHoverData();
    const hoverProps = { onMouseEnter: hoverOn, onMouseLeave: hoverOff };

    const labelClass = "font-semibold text-sm";

    return (
        <div
            id="general-tabpanel"
            className={tabContentClass}
            role={a11yOn ? "tabpanel" : undefined}
            aria-labelledby="general-tab"
        >
            <h3 className="text-base font-bold sm:text-xl">General</h3>
            <div className={settingsLabelContainerClass}>
                <p className={labelClass}>First day of the week</p>
                <Select
                    data={["Sunday", "Monday", "Saturday"]}
                    placeholder="Select day"
                    {...hoverProps}
                />
            </div>

            <div className={settingsLabelContainerClass}>
                <p className={labelClass}>Time display</p>
                <div className="flex gap-4">
                    <SDiv
                        className="flex items-center gap-2"
                        tag={a11yOn ? "label" : "div"}
                        {...hoverProps}
                    >
                        12 hours
                        <Radio
                            checked={is12HourTime}
                            onChange={(e) =>
                                useStateStore.setState({
                                    is12HourTime: e.target.checked,
                                })
                            }
                        />
                    </SDiv>
                    <SDiv
                        className="flex items-center gap-2"
                        tag={a11yOn ? "label" : "div"}
                        {...hoverProps}
                    >
                        24 hours
                        <Radio
                            checked={!is12HourTime}
                            onChange={(e) =>
                                useStateStore.setState({
                                    is12HourTime: !e.target.checked,
                                })
                            }
                        />
                    </SDiv>
                </div>
            </div>
        </div>
    );
};

export default SettingsTabGeneral;
