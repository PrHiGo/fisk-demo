import { useEffect, useState } from "react";


export const useControls = (key: string, controlType: "keyboard" | "mouse" = "keyboard") => {
    const [control, setControl] = useState(false);
    const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

    useEffect(() => {
        if (controlType === "keyboard") {
            const handleKeyDown = (event: KeyboardEvent) => {
                if (event.code === key) {
                    setControl(true);
                }
            };

            const handleKeyUp = (event: KeyboardEvent) => {
                if (event.code === key) {
                    setControl(false);
                }
            };

            document.addEventListener("keydown", handleKeyDown);
            document.addEventListener("keyup", handleKeyUp);

            return () => {
                document.removeEventListener("keydown", handleKeyDown);
                document.removeEventListener("keyup", handleKeyUp);
            };
        } else if (controlType === "mouse") {
            const handleMouseMove = (event: MouseEvent) => {
                setMousePosition({ x: event.clientX, y: event.clientY });
            };

            document.addEventListener("mousemove", handleMouseMove);

            return () => {
                document.removeEventListener("mousemove", handleMouseMove);
            };
        }
    }, [key, controlType]);

    return controlType === "keyboard" ? control : mousePosition;
};
