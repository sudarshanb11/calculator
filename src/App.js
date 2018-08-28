import React, { Component } from 'react'
import {infixToPostfix} from 'infix-to-postfix'
import {postfixCalculator} from 'postfix-calculator'
import './App.scss';

const CalcDisplay = (props) => {
  const {display} = props
  return (
    <input type="text" className='calc-display' value={display}/>
  )
}

const Button = (props) => {
  const {text, val, action} = props
  return  (
    <button onClick={() => action(val)}>{text}</button>
  )
}

class App extends Component {
  constructor() {
    super();
    this.state = {
      display: ''
    }
  }

  addtoExp = (val) => {
    this.setState({display: this.state.display + val})
  }

  evaluate = () => {
    const convertExp = infixToPostfix(this.state.display)
    var answer = postfixCalculator(convertExp)
    if (window.isNaN(answer) === false) {
      this.setState({display: answer})
    }
  }

  percentage = (val) => {
    if (infixToPostfix(this.state.display) === null) {
      return
    }
    const convertExp = infixToPostfix(this.state.display).split(' ')
    const percent = convertExp.length == 1 ? '' : convertExp.splice(convertExp.length-2, 2)
    const sum = convertExp.length == 1 ? Number(convertExp[0]) : postfixCalculator(convertExp.join(' '))
    var answer
    switch(percent[1]) {
      case '+':
      answer = sum + (sum/100)*percent[0]
      break
      case '-':
      answer = sum - (sum/100)*percent[0]
      break
      case '*':
      answer = sum * (sum/100)*percent[0]
      break
      case '/':
      answer = sum / (sum/100)*percent[0]
      break
      default:
      answer = sum
    }
    this.setState({display: answer})
  }

  squareRoot = () => {
    if (infixToPostfix(this.state.display) === null) {
      return
    }
    const convertExp = infixToPostfix(this.state.display).split(' ')
    const val = convertExp.length == 1 ? '' : convertExp.splice(convertExp.length-2, 2)
    const sum = convertExp.length == 1 ? Number(convertExp[0]) : postfixCalculator(convertExp.join(' '))
    var answer
    switch(val[1]) {
      case '+':
      answer = sum + Math.sqrt(val[0])
      break
      case '-':
      answer = sum - Math.sqrt(val[0])
      break
      case '*':
      answer = sum * Math.sqrt(val[0])
      break
      case '/':
      answer = sum / Math.sqrt(val[0])
      break
      default:
      answer = Math.sqrt(sum)
    }
    this.setState({display: answer})
  }

  clearAll = () => {
    this.setState({display: ''})
  }

  clearStep = () => {
    const answer = this.state.display.slice(0, this.state.display.length-1)
    this.setState({display: answer})
  }

  render() {
    return (
      <div className='App'>
        <div className='calc'>
          <CalcDisplay display={this.state.display} />
          <div className='calc-btns'>
            <div className='row'>
              <Button val=' ' text='%' action={this.percentage}/>
              <Button val='7' text='7' action={this.addtoExp}/>
              <Button val='8' text='8' action={this.addtoExp}/>
              <Button val='9' text='9' action={this.addtoExp}/>
              <Button val=' / ' text='/' action={this.addtoExp}/>
            </div>
            <div className='row'>
              <Button val='SQRT' text='&#8730;' action={this.squareRoot}/>
              <Button val='4' text='4' action={this.addtoExp}/>
              <Button val='5' text='5' action={this.addtoExp}/>
              <Button val='6' text='6' action={this.addtoExp}/>
              <Button val=' * ' text='&times;' action={this.addtoExp}/>
            </div>
            <div className='row'>
              <Button val='C' text='C' action={this.clearStep}/>
              <Button val='1' text='1' action={this.addtoExp}/>
              <Button val='2' text='2' action={this.addtoExp}/>
              <Button val='3' text='3' action={this.addtoExp}/>
              <Button val=' - ' text='&#8722;' action={this.addtoExp}/>
            </div>
            <div className='row'>
              <Button val='A' text='AC' action={this.clearAll}/>
              <Button val='0' text='0' action={this.addtoExp}/>
              <Button val='.' text='.' action={this.addtoExp}/>
              <Button val='=' text='=' action={this.evaluate}/>
              <Button val=' + ' text='+' action={this.addtoExp}/>
            </div>
          </div>
        </div>
      </div>
    );
  }
}

export default App;
