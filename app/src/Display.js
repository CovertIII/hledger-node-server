import React from 'react';
import R from 'ramda';
import {BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

import { GenericTable } from './GenericTable';
import { BalanceTable } from './BalanceTable';

const registerGraph = (formatedData) => (
  <LineChart width={1000} height={500} data={formatedData}
    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
    <XAxis dataKey="date"/>
    <YAxis/>
    <CartesianGrid strokeDasharray="3 3"/>
    <Tooltip/>
    <Legend />
    <Line type="monotone" dataKey="total" stroke="#82ca9d" />
  </LineChart>
);

const balanceChart = (formatedData) => (
  <BarChart width={600} height={300} data={formatedData}
    margin={{top: 5, right: 30, left: 20, bottom: 5}}>
    <XAxis dataKey="account"/>
    <YAxis/>
    <CartesianGrid strokeDasharray="3 3"/>
    <Tooltip/>
    <Legend />
    <Bar dataKey="balance" fill="#8884d8" />
  </BarChart>
);

const displayChart = (command, formatedData) => {
  if(R.test(/^register/, command)){
    return registerGraph(formatedData)
  }
  if(R.test(/^balance/, command)){
    return balanceChart(formatedData)
  }
};

const displayTable = ({command, formatedData, data, go}) => {
  if(R.test(/^balance/, command)){
    return (<BalanceTable data={formatedData} go={go}/>)
  }
  return <GenericTable data={data} />
};

const defaultArray = [];

export default ({data = defaultArray, command, formatedData, go}) => (
  <div>
    { displayChart(command, formatedData) }
    <br/><br/>
    { displayTable({command, formatedData, data, go}) }
  </div>
);

