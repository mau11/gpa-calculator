import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Calculator from './Calculator.jsx'

export default class Layout extends Component {

  render() {
    return (
      <div>
        <h1>GPA Calculator</h1>
        <Calculator />
      </div>
    )
  }
}
