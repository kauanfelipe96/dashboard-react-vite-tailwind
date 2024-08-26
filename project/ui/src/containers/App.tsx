import React, { Component, useRef, useState } from "react";
import { debugData } from "../utils/debugData";
import Modal from "../components/Modal"

// This will set the NUI to visible if we are
// developing in browser
debugData<boolean>([
    {
        action: "charcreation:show",
        data: true,
    },
]);

const App: React.FC = () => {
    return (
        <div className="h-[100vh] w-[100vw] flex items-center justify-center bg-slate-800">
        <Modal/>
        </div>
    );
};

export default App;
