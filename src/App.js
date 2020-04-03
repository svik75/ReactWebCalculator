import React from 'react';
import './App.scss';

class Button extends React.Component {


  render() {
    let styleBtn = { width: '70px' };

    if (this.props.val === 'AC') styleBtn = { width: '140px', backgroundColor: 'red' };

    if (this.props.val === '0') styleBtn = { width: '140px' };

    if (this.props.val === '=') styleBtn = { width: '70px', backgroundColor: 'brown' };

    return (
      <div>
        <button style={styleBtn} onClick={this.props.numbers} value={this.props.val}>{this.props.val}</button>
      </div>
    )
  }
}

Button.defaultProps = { width: '70px' };

class Display extends React.Component {

  render() {
    console.log('Display:'+this.props.value);
    return (
      <div className="display">
        <label >{this.props.value}</label>
      </div>
    )
  }
}
Display.defaultProps = { value: 0 };

class App extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      currentValue: 0,
      prevValue: 0,
      currentSign: '',
      formula: ''
    };
    this.numbers = this.numbers.bind(this);
  }

  numbers(e) {
    console.log(this.state.prevValue + ':' + this.state.currentSign + ':' +this.state.currentValue);

    if (e.target.value === 'AC') { this.setState({ currentValue: 0, prevValue: 0, currentSign: '' }); return; }
    if (e.target.value === '<-') { 
      if (this.state.currentSign.length){
      this.setState({ currentValue: Math.floor(this.state.currentValue / 10) }); return; }
      else {
        this.setState({ prevValue: Math.floor(this.state.prevValue / 10) });return;
      }
      }
    if (e.target.value === '+') { this.setState({ currentSign: '+' }); return; }
    if (e.target.value === '-') { this.setState({ currentSign: '-' }); return; }
    if (e.target.value === 'X') { this.setState({ currentSign: '*' }); return; }
    if (e.target.value === '/') { this.setState({ currentSign: '/' }); return; }
    if (e.target.value === '.') { this.setState({ currValue: this.state.currentValue + '.' }); return; }

    if (e.target.value === '=') {
      switch (this.state.currentSign) {
        case '+': { this.setState({ prevValue: this.state.currentValue + this.state.prevValue}); this.setState({ currentValue: 0, currentSign: '' }); return; }
        case '-': { this.setState({ prevValue: this.state.prevValue - this.state.currentValue}); this.setState({ currentValue: 0, currentSign: '' }); return; }
        case '/': { this.setState({ prevValue: this.state.prevValue / this.state.currentValue}); this.setState({ currentValue: 0, currentSign: '' }); return; }
        case '*': { this.setState({ prevValue: this.state.prevValue * this.state.currentValue}); this.setState({ currentValue: 0, currentSign: '' }); console.log('ddd');return; }

        default: break;
      }
    }
    if (this.state.currentSign.length)
      this.setState({ currentValue: this.state.currentValue * 10 + Number(e.target.value) });
    else this.setState({ prevValue: this.state.prevValue * 10 + Number(e.target.value) });

  }


  render() {
    let cv = '';
    if(this.state.currentValue>0) cv=String(this.state.currentValue);
    let val = String(this.state.prevValue) + String(this.state.currentSign) + cv;
    return (
      <div className="App">
        <Display value={val} />
        <Button id="clear" val={'AC'} width={'140px'} numbers={this.numbers} /><Button id="divide " val={'/'} numbers={this.numbers} /><Button id="delete" val={'<-'} numbers={this.numbers} />

        <Button id="seven" val={7} numbers={this.numbers} /><Button id="eight" val={8} numbers={this.numbers} /><Button id="nine" val={9} numbers={this.numbers} /><Button id="muliply" val={'X'} numbers={this.numbers} />

        <Button id="four" val={4} numbers={this.numbers} /><Button id="five" val={5} numbers={this.numbers} /><Button id="six" val={6} numbers={this.numbers} /><Button id="subtract" val={'-'} numbers={this.numbers} />
        <Button id="one" val={1} numbers={this.numbers} /><Button id="two" val={2} numbers={this.numbers} /><Button id="three" val={3} numbers={this.numbers} /><Button id="add" val={'+'} numbers={this.numbers} />


        <Button id="zero" val={0} numbers={this.numbers} width={'140px'} /><Button id="decimal" val={'.'} numbers={this.numbers} /><Button id="equals" val={'='} numbers={this.numbers}/>
      </div>

    );
  }
}

export default App;
