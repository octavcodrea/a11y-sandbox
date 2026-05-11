import "@mantine/core/styles.css";
import { Outlet } from "react-router-dom";
import classes from "./App.module.scss";
import Button from "./components/button";
import Footer from "./components/footer";
import KeyboardEventsHandler from "./components/keyboard-events-handler";
import { useHoverData, useStateStore } from "./lib/hooks";
import { cls } from "./lib/utils";

function App() {
    const allyOn = useStateStore((state) => state.a11yOn);
    const overlay = useStateStore((state) => state.overlay);

    const { renderedHoverData } = useHoverData();

    const toggleOverlay = () => {
        useStateStore.setState((state) => ({
            overlay: !state.overlay,
        }));
    };

    const toggleA11y = () => {
        useStateStore.setState((state) => ({
            a11yOn: !state.a11yOn,
        }));
        localStorage.setItem("a11yOn", String(!allyOn));
    };

    return (
        <>
            <div
                className={cls(
                    "fixed bottom-4 left-4 z-50 flex flex-col gap-2",
                    classes.controls,
                )}
            >
                <Button
                    variant={allyOn ? "primary" : "secondary"}
                    size="responsive"
                    onClick={toggleA11y}
                    className="w-fit outline-8 outline-offset-2 outline-orange-400"
                >
                    {allyOn ? "Disable" : "Enable"} A11y Features
                </Button>

                <Button
                    variant={overlay ? "primary" : "secondary"}
                    size="responsive"
                    onClick={toggleOverlay}
                    className="w-fit outline-8 outline-offset-2 outline-orange-400"
                >
                    Toggle overlay
                </Button>
            </div>

            <div
                className={cls(
                    classes.overlay,
                    overlay ? classes.overlayVisible : classes.overlayHidden,
                )}
            />

            <Outlet />
            <Footer />

            <KeyboardEventsHandler />

            {renderedHoverData}
        </>
    );
}

export default App;
