import React, { PureComponent } from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  {
    name: '0s',
    potencia: 4000,
    torque: 2400,
  },
  {
    name: '5s',
    potencia: 3000,
    torque: 1398,
  },
  {
    name: '10',
    potencia: 2000,
    torque: 9800,
  },
  {
    name: '15',
    potencia: 2780,
    torque: 3908,
  },
  {
    name: '20',
    potencia: 1890,
    torque: 4800,
  },
  {
    name: '25',
    potencia: 2390,
    torque: 3800,
  },
  {
    name: '30',
    potencia: 3490,
    torque: 4300,
  },
];

export default class Example extends PureComponent {
  static demoUrl = 'https://codesandbox.io/p/sandbox/line-chart-width-xaxis-padding-8v7952';

  render() {
    return (
      <ResponsiveContainer width="100%" height="100%">
        <LineChart
          width={300}
          height={100}
          data={data}
          margin={{
            top: 10,
            right: 30,
            left: 20,
            bottom: 5,
          }}
        >
          <Legend />
          <Line type="monotone" dataKey="torque" stroke="#8884d8" strokeWidth={2} />
          <Line type="monotone" dataKey="potencia" stroke="#991b1b" strokeWidth={2} />
        </LineChart>
      </ResponsiveContainer>
    );
  }
}
