import React, { Component } from 'react';
import axios from 'axios';
import { InlineForm, Table, Heading } from 'rebass';
import R from 'ramda';
import numeral from 'numeral';
import {LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend} from 'recharts';

const api = axios.create({
  baseURL: 'http://0.0.0.0:3000/api',
  timeout: 1000
});

class App extends Component {

  constructor() {
    super();

    this.state = {
      data: [],
      formatedData: [],
      tree: [],
      command: ''
    };

    this.handleChange = this.handleChange.bind(this);
    this.go = this.go.bind(this);
  }

  go(e){
    e.preventDefault();
    api.post('', {
      cmd: this.state.command
    }).then( ({data}) => {
      const header = R.head(data);
      const json = R.compose(
        R.reject(R.propEq('account', 'total')),
        R.tail,
        R.map(R.compose(
          R.zipObj(header),
          R.map(number => {
            const n = numeral(number).value();
            if(!n || isNaN(n) ){
              return number;
            }
            return n;
          })
        )),
        R.tail
      )(data);

      this.setState({
        data,
        formatedData: json
      });
    });
  }

  handleChange(event) {
    this.setState({command: event.target.value});
  }

  render() {
    return (
      <div>
        <Heading level={1}>
         HLedger React Web
        </Heading>
        <InlineForm
        buttonLabel="Search"
        label="InlineForm"
        name="inline_form"
        onChange={this.handleChange}
        onClick={this.go}
        />
        <br/><br/>
        <LineChart width={1000} height={500} data={this.state.formatedData}
              margin={{top: 5, right: 30, left: 20, bottom: 5}}>
         <XAxis dataKey="date"/>
         <YAxis/>
         <CartesianGrid strokeDasharray="3 3"/>
         <Tooltip/>
         <Legend />
         <Line type="monotone" dataKey="total" stroke="#82ca9d" />
        </LineChart>
      <br/><br/>
        <Table 
          data={R.tail(this.state.data)}
          headings={R.head(this.state.data)}
        />
      </div>
    );
  }
}

export default App;
