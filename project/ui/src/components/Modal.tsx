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
    velocidade: "200 km/h",
    aceleracao: 4000,
    tracao: 2400,
    frenagem: 2000,
};

const data02 = [
    { name: "Group A", value: 2400 },
    { name: "Group B", value: 4567 },
    { name: "Group C", value: 1398 },
    { name: "Group D", value: 9800 },
    { name: "Group E", value: 3908 },
    { name: "Group F", value: 4800 },
];

export default class Modal extends React.Component {
    render() {
        return (
            <div className="w-[50%] py-5 bg-[#202020] rounded-3xl flex items-center justify-start">
                <div className="px-5">
                    <div className="w-[40px] h-[40px] bg-[#3f3f3f] rounded-full"></div>
                </div>
                <div className="grid grid-cols-4 gap-4 w-[100%] bg-slate-900 p-5">
                    <div className="p-5 text-slate-50 bg-slate-700 rounded-md bg-opacity-25">
                        <IoSpeedometer className="text-[30px]"/>
                        <div className="">Velocidade</div>
                        <div className="">{data.velocidade}</div>
                    </div>
                    <div className="p-3 text-slate-50 bg-slate-700 rounded-md bg-opacity-25">
                        <MdTimer />
                        <div className="">Aceleracao</div>
                        <div className="">{data.aceleracao}</div>
                    </div>
                    <div className="p-3 text-slate-50 bg-slate-700 rounded-md bg-opacity-25">
                        <HiWrenchScrewdriver />
                        <div className="">Tracao </div>
                        <div className="">{data.tracao}</div>
                    </div>
                    <div className="p-3 text-slate-50 bg-slate-700 rounded-md bg-opacity-25">
                        <MdPanTool />
                        <div className="">Frenagem</div>
                        <div className="">{data.frenagem}</div>
                    </div>
                    <div className="p-3 text-slate-50 col-span-3 bg-slate-700 h-[300px] rounded-md bg-opacity-25">
                        <Graph />
                    </div>
                    <div className="p-3 text-slate-50 bg-slate-700 rounded-md bg-opacity-25">
                        <FaCircleInfo />
                        Informacoes do veiculo
                        <div className="carro">Nome: {data.carro}</div>
                        <div className="categoria">
                            Categoria: {data.categoria}
                        </div>
                        <div className="classe">Classe: {data.classe}</div>
                    </div>
                </div>
                <div className="px-5">
                    <div className="w-[12px] h-[12px] bg-[#3f3f3f] rounded-full"></div>
                </div>
            </div>
        );
    }
}
