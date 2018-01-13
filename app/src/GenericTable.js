import React from 'react';
import R from 'ramda';

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

const tdStyle = {
  'textAlign': 'left',
  'verticalAlign': 'bottom',
  'padding': '8px 8px 8px 0px',
  'borderColor': 'inherit'
};

const Body = ({data = defaultArray}) => (
  <tbody>
    { data.map( (d = defaultArray) => (
      <tr>
        { d.map( (h, i) =>
          <td style={tdStyle}>{ h }</td>
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

export const GenericTable = ({data = defaultArray}) => (
  <table style={tableStyle}>
    <Header header={R.head(data)}/>
    <Body data={R.tail(data)}/>
  </table>
);

