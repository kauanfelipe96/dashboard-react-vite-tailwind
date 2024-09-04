import React, { Component, useRef, useState } from "react";
import { debugData } from "../utils/debugData";
import Dashboard from "../components/Dashboard";
import { IDashboardData } from "../types";
import { useNuiEvent } from "../hooks/useNuiEvent";

debugData<boolean | IDashboardData>([
    { action: "dashboard:show", data: true },
    {
        action: "dashboard:setDashboardData",
        data: {
            model: "Comet",
            class: "A+",
            plate: "AHV-4169",
            velocity: "A+",
            acceleration: "S",
            traction: "C+",
            brakes: "A",
            score: 89,
            newClass: "A",
        },
    },
]);

function App() {
    const [dashboardData, setDashboardData] = useState<IDashboardData>();

    useNuiEvent("dashboard:setDashboardData", (data?: IDashboardData) => {
        setDashboardData(data);
    });

    return <>{dashboardData && <Dashboard data={dashboardData} />}</>;
}

export default App;
