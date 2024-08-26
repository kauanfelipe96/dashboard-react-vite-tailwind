import React from "react";
import Graph from "./Graph";
import { IoSpeedometer } from "react-icons/io5";
import { MdTimer } from "react-icons/md";
import { HiWrenchScrewdriver } from "react-icons/hi2";
import { MdPanTool } from "react-icons/md";
import { FaCircleInfo } from "react-icons/fa6";
import { PieChart, Pie, Legend, Tooltip, ResponsiveContainer } from "recharts";

const data = {
    carro: "Comet",
    categoria: "Esportivo",
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
            <div className="w-[50%] py-5 bg-[#202020] rounded-3xl flex items-center justify-start">
                <div className="px-5">
                    <div className="w-[40px] h-[40px] bg-[#3f3f3f] rounded-full"></div>
                </div>
                <div className="grid grid-cols-4 gap-4 w-[100%] bg-slate-900 p-5">
                    <div className="p-5 bg-slate-700 rounded-md bg-opacity-25 flex justify-between items-center">
                        <div className="info">
                            <div className="text-slate-50 font-bold text-lg">
                                {data.velocidade}
                            </div>
                            <div className="text-slate-500 font-semmibold text-sm">
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
                            <div className="text-slate-500 font-semmibold text-sm">
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
                            <div className="text-slate-500 font-semmibold text-sm">
                                Tracao{" "}
                            </div>
                        </div>
                        <div className="flex items-center justify-center p-2 bg-orange-600/20 rounded-lg">
                            <HiWrenchScrewdriver className="text-[20px] text-orange-600" />
                        </div>
                    </div>
                    <div className="p-3 bg-slate-700 rounded-md bg-opacity-25 flex justify-between items-center">
                        <div className="info">
                            <div className="text-slate-50 font-bold text-lg">
                                {data.frenagem[2]}
                            </div>
                            <div className="text-slate-500 font-semmibold text-sm">
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
                            <div className="info flex justify-between items-center">
                                <FaCircleInfo className="text-[18px]" />
                                Informacoes do veiculo
                            </div>
                            <div className="carro">Nome: {data.carro}</div>
                            <div className="categoria">
                                Categoria: {data.categoria}
                            </div>
                            <div className="classe">Classe: {data.classe}</div>
                            <div className="placa">Placa: {data.placa}</div>
                        </div>
                        <div className="p-3 text-slate-50 bg-slate-700 rounded-md bg-opacity-25">
                            <div className="info flex justify-between items-center">
                                <FaCircleInfo className="text-[18px]" />
                                Resultado
                            </div>
                            <div className="carro">Nome: {data.carro}</div>
                            <div className="classe">Classe: {data.novaClase}</div>
                            <div className="placa">Nota: {data.nota}</div>
                        </div>
                    </div>
                </div>
                <div className="px-5">
                    <div className="w-[12px] h-[12px] bg-[#3f3f3f] rounded-full"></div>
                </div>
            </div>
        );
    }
}
