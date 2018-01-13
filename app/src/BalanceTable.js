import React from 'react';

const defaultArray = [];
const defaultObj = {
  account: '',
  balance: 0
};

const thStyle = {
  'textAlign': 'left',
  'verticalAlign': 'bottom',
  'padding': '8px 8px 8px 0px',
  'borderBottomStyle': 'solid',
  'borderBottomWidth': '2px',
  'borderColor': 'inherit'
};

const Header = () => (
  <thead>
    <tr>
      <th style={thStyle}>Account</th>
      <th style={thStyle}>Balance</th>
    </tr>
  </thead>
);

const tdStyle = {
  'textAlign': 'left',
  'verticalAlign': 'bottom',
  'padding': '8px 8px 8px 0px',
  'borderColor': 'inherit'
};

const tdStyleRed = {
  'color': 'red',
  'textAlign': 'left',
  'verticalAlign': 'bottom',
  'padding': '8px 8px 8px 0px',
  'borderColor': 'inherit'
};

const Body = ({data = defaultArray, go}) => (
  <tbody>
    { data.map( (d = defaultObj ) => (
      <tr key={d.account}>
        <td style={tdStyle} onClick={() => go(`register '${d.account}'`)}>{ d.account }</td>
        <td style={d.balance < 0 ? tdStyleRed : tdStyle} >{ d.balance }</td>
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

export const BalanceTable = ({data, go}) => (
  <table style={tableStyle}>
    <Header />
    <Body data={data} go={go}/>
  </table>
);
