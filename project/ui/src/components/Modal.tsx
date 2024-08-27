import React from "react";
import Graph from "./Graph";
import { IoSpeedometer } from "react-icons/io5";
import { MdTimer } from "react-icons/md";
import { HiWrenchScrewdriver } from "react-icons/hi2";
import { MdPanTool } from "react-icons/md";
import { FaCircleInfo, FaCircleCheck } from "react-icons/fa6";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";

const data = {
    carro: "Comet",
    classe: "S+",
    placa: "AHV-4169",
    velocidade: "200 km/h",
    aceleracao: "4000 m/s²",
    tracao: ["4x2", "4x4", "AWD", "dianteira", "traseira"],
    frenagem: ["disco", "tambor", "ABS"],
    nota: 89,
    novaClase: "A",
};

export default class Modal extends React.Component {
    render() {
        return (
            <div className="w-[50%] p-5 bg-[#202020] rounded-3xl flex items-center justify-start">
                <div className="w-[100%] bg-slate-900 p-5">
                    <h1 className="text-slate-50 text-3xl font-extrabold mb-5">
                        Dashboard
                    </h1>
                    <div className="grid grid-cols-4 gap-4 ">
                        <div className="p-5 bg-slate-700 rounded-md bg-opacity-25 flex justify-between items-center">
                            <div className="info">
                                <div className="text-slate-50 font-bold text-lg">
                                    {data.velocidade}
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
                                    {data.aceleracao}
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
                                    {data.tracao[1]}
                                </div>
                                <div className="text-slate-500 font-semibold text-sm">
                                    Tracao{" "}
                                </div>
                            </div>
                            <div className="flex items-center justify-center p-2 bg-orange-600/20 rounded-lg">
                                <HiWrenchScrewdriver className="text-[20px] text-orange-400" />
                            </div>
                        </div>
                        <div className="p-3 bg-slate-700 rounded-md bg-opacity-25 flex justify-between items-center">
                            <div className="info">
                                <div className="text-slate-50 font-bold text-lg">
                                    {data.frenagem[2]}
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
                            <Graph />
                        </div>
                        <div className="grid grid-cols-1 gap-4">
                            <div className="p-3 text-slate-50 bg-slate-700 rounded-md bg-opacity-25">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center w-[90px] h-[90px] bg-violet-600/20 rounded-lg">
                                        <div className="text-[60px] font-bold text-violet-400">
                                            {data.classe}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="info mb-2">
                                            <div className="text-slate-50 font-bold text-lg">
                                                {data.carro}
                                            </div>
                                            <div className="text-slate-500 font-semibold text-sm">
                                                Nome
                                            </div>
                                        </div>
                                        <div className="info">
                                            <div className="text-slate-50 font-bold text-lg">
                                                {data.placa}
                                            </div>
                                            <div className="text-slate-500 font-semibold text-sm">
                                                Placa
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className="p-3 text-slate-50 bg-slate-700 rounded-md bg-opacity-25">
                                <div className="flex items-center gap-4">
                                    <div className="flex items-center justify-center w-[90px] h-[90px] bg-indigo-600/20 rounded-lg">
                                        <div className="text-[60px] font-bold text-indigo-400">
                                            {data.novaClase}
                                        </div>
                                    </div>

                                    <div>
                                        <div className="info mb-2">
                                            <div className="text-slate-50 font-bold text-lg">
                                                {data.nota}
                                            </div>
                                            <div className="text-slate-500 font-semibold text-sm">
                                                Nota
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                    <div className="flex items-center justify-center gap-4 mt-5">
                        <button className="py-1 px-4 rounded-lg bg-cyan-500 font-bold text-cyan-950">
                            Iniciar
                        </button>
                        <button className="py-1 px-4 rounded-lg bg-green-500 font-bold text-green-950">
                            Registrar
                        </button>
                    </div>
                </div>
            </div>
        );
    }
}
