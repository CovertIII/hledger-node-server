import React from 'react';
import R from 'ramda';
import {BarChart, Bar, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

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

const defaultArray = [];

const thStyle = {
  'textAlign': 'left',
  'verticalAlign': 'bottom',
  'padding': '8px 8px 8px 0px',
  'borderBottomStyle': 'solid',
  'borderBottomWidth': '2px',
  'borderColor': 'inherit'
};

const Header = ({header = defaultArray}) => (
  <thead>
    <tr>
      { header.map( h => <th style={thStyle}>{ h }</th> ) }
    </tr>
  </thead>
);

const Body = ({data = defaultArray, go}) => (
  <tbody>
    { data.map( (d = defaultArray) => (
      <tr>
        { d.map( (h, i) =>
          <td onClick={() => go(`register '${h}'`)}>{ h }</td>
        )}
      </tr>
    ))}
  </tbody>
)

const tableStyle = {
  fontSize: '14px',
  lineHeight: '1.25',
  borderCollapse: 'separate',
  borderSpacing: '0px',
  width: '100%'
};

export default ({data = defaultArray, command, formatedData, go}) => (
  <div>
    { displayChart(command, formatedData) }
    <br/><br/>
    <table style={tableStyle}>
      <Header header={R.head(data)}/>
      <Body data={R.tail(data)} go={go}/>
    </table>
  </div>
);

