import React, { Component } from 'react'
import ReactDOM from 'react-dom'
import Calculator from './Calculator.jsx'

export default class Layout extends Component {

  render() {
    return (
      <div className="container text-center">
        <h1 className="font-weight-light">GPA Calculator</h1>
        <p className="text-muted"><em>Calculate your GPA based on the 4.0 scale</em></p>
        <Calculator />
      </div>
    )
  }
}
