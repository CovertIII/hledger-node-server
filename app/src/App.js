import React, { Component } from 'react';
import axios from 'axios';
import { InlineForm, Heading } from 'rebass';
import R from 'ramda';
import numeral from 'numeral';
import Display from './Display';

const socket = new WebSocket("ws://0.0.0.0:8081");

socket.onopen = function (event) {
  socket.send("I'm connecting!"); 
};


const api = axios.create({
  baseURL: 'http://0.0.0.0:3000/api',
  timeout: 1000
});

class App extends Component {

  constructor() {
    super();

    const lastCommand = localStorage.lastCommand;

    this.state = {
      data: [],
      formatedData: [],
      tree: [],
      command: lastCommand || ''
    };

    if(lastCommand){
      setTimeout( () => this.go(), 500);
    }

    socket.onmessage = (event) => {
      console.log(event.data);
      if(event.data === 'fileChanged' && this.state.command){
        this.go();
      }
    }


    this.handleChange = this.handleChange.bind(this);
    this.go = this.go.bind(this);
  }

  go(e){
    if(e){
      e.preventDefault();
    }
    localStorage.lastCommand = this.state.command;
    api.post('', {
      cmd: this.state.command
    }).then( ({data}) => {
      const header = R.head(data);
      const json = R.compose(
        R.reject(R.propEq('account', 'total')),
        R.tail,
        R.map(R.compose(
          R.zipObj(header),
          R.addIndex(R.map)((number, i) => {
            if(['balance', 'total', 'amount'].some(R.equals(header[i]))){
              const n = numeral(number).value();
              if(!n || isNaN(n) ){
                return number;
              }
              return n;
            }
            return number;
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
          value={this.state.command}
          onChange={this.handleChange}
          onClick={this.go}
        />
        <br/><br/>
        <Display 
          data={this.state.data}
          formatedData={this.state.formatedData}
          command={this.state.command}
        />
      </div>
    );
  }
}

export default App;
