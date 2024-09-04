import React, { useEffect, useState } from "react";
import Graph from "./Graph";
import { IoSpeedometer } from "react-icons/io5";
import { MdTimer } from "react-icons/md";
import { HiWrenchScrewdriver } from "react-icons/hi2";
import { MdPanTool } from "react-icons/md";
import { FaPlay, FaWifi } from "react-icons/fa6";
import { IoBatteryFull } from "react-icons/io5";
import moment from "moment";
import CountUp from "react-countup";
import { IDashboardData } from "../types";

interface IDashboardProps {
    data: IDashboardData;
}

const Dashboard: React.FC<IDashboardProps> = ({ data }) => {
    const grades = ["D", "D+", "C", "C+", "B", "B+", "A", "A+", "S", "X"];
    const [show, setShow] = useState<boolean>(false);
    const [showNewClass, setShowNewClass] = useState<boolean>(false);
    const [velocityGrade, setVelocityGrade] = useState("D");
    const [accelerationGrade, setAccelerationGrade] = useState("D");
    const [tractionGrade, setTractionGrade] = useState("D");
    const [brakesGrade, setBrakesGrade] = useState("D");
    const incrementGrade = () => {
        setVelocityGrade((prev) => nextGrade(prev, data.velocity));
        setAccelerationGrade((prev) => nextGrade(prev, data.acceleration));
        setTractionGrade((prev) => nextGrade(prev, data.traction));
        setBrakesGrade((prev) => nextGrade(prev, data.brakes));
    };
    const nextGrade = (current: string, target: string) => {
        const currentIndex = grades.indexOf(current);
        const targetIndex = grades.indexOf(target);
        return currentIndex < targetIndex ? grades[currentIndex + 1] : current;
    };

    const changeColor = (grade:string) => {
        const color = {
            "D": "bg-gradient-to-tl from-red-400 to-red-900 text-[60px]",
            "D+": "bg-gradient-to-tl from-orange-700 to-orange-900 text-[50px]",
            "C": "bg-gradient-to-tl from-amber-600 to-amber-800 text-[60px]",
            "C+": "bg-gradient-to-tl from-amber-400 to-yellow-600 text-[50px]",
            "B": "bg-gradient-to-tl from-yellow-400 to-yellow-500 text-[60px]",
            "B+": "bg-gradient-to-tl from-yellow-500 to-lime-900 text-[50px]",
            "A": "bg-gradient-to-tl from-green-400 to-green-900 text-[60px]",
            "A+": "bg-gradient-to-tl from-teal-500 to-teal-700 text-[50px]",
            "S": "bg-gradient-to-tl from-sky-600 to-sky-800 text-[60px]",
            "X": "bg-gradient-to-br from-black to-zinc-900 text-[60px]",
        }
        return color[grade as keyof typeof color]
    }

    useEffect(() => {
        let interval: NodeJS.Timeout;

        if (show) {
            interval = setInterval(() => {
                incrementGrade();
            }, 2000);

            setTimeout(() => {
                clearInterval(interval);
            }, 20000);
        }

        return () => clearInterval(interval);
    }, [show]);

    useEffect(() => {
        if (show) {
            const timer = setTimeout(() => {
                setShowNewClass(true);
            }, 20000);

            return () => clearTimeout(timer);
        } else {
            setShowNewClass(false);
        }
    }, [show]);

    return (
        <div className="h-[100vh] w-[100vw] flex items-center justify-center">
            <div className="w-[65%] p-5 bg-neutral-950 rounded-xl flex items-center justify-start">
                <div className="w-[100%] bg-slate-900">
                    <div className="flex justify-end items-center text-slate-50 bg-black/20 px-5 py-1">
                        <div className="flex items-center justify-start gap-1 ">
                            <span className="text-[10px] mt-1">100%</span>
                            <IoBatteryFull className="text-[20px]" />
                            <FaWifi className="mx-2" />
                            <span className="text-[11px] mt-1">
                                {moment().format("ddd")} {moment().format("DD")}{" "}
                                {moment().format("MMM")} {moment().format("LT")}
                            </span>
                        </div>
                    </div>
                    <div className="flex justify-between items-center mt-4 px-5 py-5">
                        <h1 className="text-slate-50 text-3xl font-extrabold mb-5">
                            Dashboard
                        </h1>
                        <button
                            className="bg-green-800 rounded-lg border-none p0 cursor-pointer outline-4 hover:bg-green-700"
                            onClick={() => setShow(true)}
                        >
                            <span className="block p-[3px_20px] rounded-lg text-xl bg-green-600 text-white transform -translate-y-1.5 active:transform active:-translate-y-0.5 hover:bg-green-700 font-bold flex justify-center items-center gap-2">
                                <FaPlay />
                                Start
                            </span>
                        </button>
                    </div>
                    <div className="grid grid-cols-4 gap-4 px-5">
                        <div className="p-5 bg-slate-700 rounded-md bg-opacity-25 flex justify-between items-center">
                            <div className="info">
                                <div className="text-slate-50 font-bold text-lg">
                                    {show ? velocityGrade : "-"}
                                </div>
                                <div className="text-slate-500 font-semibold text-sm">
                                    Velocidade
                                </div>
                            </div>
                            <div className="flex items-center justify-center p-2 bg-teal-600/20 rounded-lg">
                                <IoSpeedometer className="text-[20px] text-teal-600" />
                            </div>
                        </div>
                        <div className="p-3 bg-slate-700 rounded-md bg-opacity-25 flex justify-between items-center">
                            <div className="info">
                                <div className="text-slate-50 font-bold text-lg">
                                    {show ? accelerationGrade : "-"}
                                </div>
                                <div className="text-slate-500 font-semibold text-sm">
                                    Aceleracao
                                </div>
                            </div>
                            <div className="flex items-center justify-center p-2 bg-lime-600/20 rounded-lg">
                                <MdTimer className="text-[20px] text-lime-600" />
                            </div>
                        </div>
                        <div className="p-3 bg-slate-700 rounded-md bg-opacity-25 flex justify-between items-center">
                            <div className="info">
                                <div className="text-slate-50 font-bold text-lg">
                                    {show ? tractionGrade : "-"}
                                </div>
                                <div className="text-slate-500 font-semibold text-sm">
                                    Tracao
                                </div>
                            </div>
                            <div className="flex items-center justify-center p-2 bg-orange-600/20 rounded-lg">
                                <HiWrenchScrewdriver className="text-[20px] text-orange-400" />
                            </div>
                        </div>
                        <div className="p-3 bg-slate-700 rounded-md bg-opacity-25 flex justify-between items-center">
                            <div className="info">
                                <div className="text-slate-50 font-bold text-lg">
                                    {show ? brakesGrade : "-"}
                                </div>
                                <div className="text-slate-500 font-semibold text-sm">
                                    Frenagem
                                </div>
                            </div>
                            <div className="flex items-center justify-center p-2 bg-pink-600/20 rounded-lg">
                                <div className="flex items-center justify-center p-2 bg-rose-600/20 rounded-lg">
                                    <MdPanTool className="text-[20px] text-rose-600" />
                                </div>
                            </div>
                        </div>
                        <div className="p-3 text-slate-50 col-span-3 bg-slate-700 h-full rounded-md bg-opacity-25">
                            {show && <Graph />}
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="p-3 text-slate-50 bg-slate-700 rounded-md bg-opacity-25">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center w-[90px] h-[90px] bg-violet-600/20 rounded-lg">
                                        <div className="text-[50px] font-bold text-violet-400">
                                            {show && data.class}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="info mb-2">
                                            <div className="text-slate-50 font-bold text-lg">
                                                {show ? data.model : "-"}
                                            </div>
                                            <div className="text-slate-500 font-semibold text-sm">
                                                Nome
                                            </div>
                                        </div>
                                        <div className="info">
                                            <div className="text-slate-50 font-bold text-lg">
                                                {show ? data.plate : "-"}
                                            </div>
                                            <div className="text-slate-500 font-semibold text-sm">
                                                Placa
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-3 text-slate-50 bg-slate-700 rounded-md bg-opacity-25 flex items-center justify-center">
                                <div className="flex items-center justify-center gap-8">
                                    <div className="flex flex-col items-center justify-center">
                                        <div className="flex items-center justify-center w-[60px] h-[60px] bg-gray-200/20 rounded-lg mb-2">
                                            <div className="text-[30px] font-bold text-gray-400">
                                                {showNewClass && data.class}
                                            </div>
                                        </div>
                                    </div>

                                    <div className="arrow-6"></div>

                                    <div className="flex flex-col items-center justify-center">
                                        {showNewClass ? (
                                            <div className={`flex items-center justify-center w-[90px] h-[90px] ${changeColor(data.newClass)} rounded-lg mb-2`}>
                                                <div className=" font-bold text-gray-200">
                                                    {data.newClass}
                                                </div>
                                            </div>
                                        ) : (
                                            <div className="w-[90px] h-[90px]"></div>
                                        )}
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-4 py-10">
                        <button className="bg-blue-800 rounded-lg border-none p0 cursor-pointer outline-4 hover:bg-blue-700">
                            <span className="block p-[3px_20px] rounded-lg text-xl bg-blue-600 text-white transform -translate-y-1.5 active:transform active:-translate-y-0.5 hover:bg-blue-700 font-bold">
                                Register
                            </span>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Dashboard;
