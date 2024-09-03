import React, {
    Context,
    createContext,
    useContext,
    useEffect,
    useState,
} from "react";
import { useNuiEvent } from "../hooks/useNuiEvent";
import { fetchNui } from "../utils/fetchNui";
import { isEnvBrowser } from "../utils/misc";
import { IDashboardData } from "../types";

const VisibilityCtx = createContext<VisibilityProviderValue | null>(null);

interface VisibilityProviderValue {
    setVisible: (visible: boolean) => void;
    visible: boolean;
}

const startData: IDashboardData = {
    velocity: "-",
    acceleration: "-",
    traction: "-",
    brakes: "-",
    model: "-",
    class: "-",
    plate: "-",
    score: 0,
    newClass: "-",
};

export const VisibilityProvider: React.FC<{ children: React.ReactNode }> = ({
    children,
}) => {
    const [visible, setVisible] = useState(false);
    const [data, setData] = useState<IDashboardData>(startData);
    const resetData = () => {
        setData(startData);
    };

    useNuiEvent<boolean>("dashboard:show", setVisible);

    useEffect(() => {
        if (!visible) return;

        const keyHandler = (e: KeyboardEvent) => {
            if (["Escape"].includes(e.code)) {
                if (!isEnvBrowser()) fetchNui("dashboard:hide");
                else setVisible(!visible);
            }
        };

        window.addEventListener("keydown", keyHandler);

        return () => window.removeEventListener("keydown", keyHandler);
    }, [visible]);

    useEffect(() => {
        if (!visible) {
            resetData();
        }
    }, [visible]);

    return (
        <VisibilityCtx.Provider
            value={{
                visible,
                setVisible,
            }}
        >
            <div
                style={{
                    visibility: visible ? "visible" : "hidden",
                    height: "100%",
                }}
            >
                {children}
            </div>
        </VisibilityCtx.Provider>
    );
};

export const useVisibility = () =>
    useContext<VisibilityProviderValue>(
        VisibilityCtx as Context<VisibilityProviderValue>
    );
