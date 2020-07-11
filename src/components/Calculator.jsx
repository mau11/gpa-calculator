import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class Calculator extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rows : [0],
      grades: {
         A   : 4.0,
        'A-' : 3.7,
        'B+' : 3.3,
         B   : 3.0,
        'B-' : 2.7,
        'C+' : 2.3,
         C   : 2.0,
        'C-' : 1.7,
        'D+' : 1.3,
         D   : 1.0,
         F   : 0.0
      },
      gpa : 0
    }
    this.handleSubmit = this.handleSubmit.bind(this)
  }

  newCourse(val) {
    let courses = this.state.rows
    courses.push(val)
    this.setState({rows: courses})
  }

  removeCourse(val) {
    let courses = this.state.rows
    courses.splice(val, 1)
    this.setState({rows: courses})
  }

  handleSubmit(e) {
    e.preventDefault()
    const data = new FormData(e.target)
    this.calculate(data)
  }

  calculate(data) {
    let allCreds = data.getAll('credits')
    let adjCreds = 0

    // calculate adjusted credits based on grade
    data.getAll('grade').map((letter,i) => {
      adjCreds+= this.state.grades[letter] * parseInt(allCreds[i])
    })

    // get sum of all credits
    allCreds = allCreds.map(cred => (parseInt(cred))).reduce((a,b) => { return a + b}, 0)

    // calculate GPA
    let gpa = (adjCreds / allCreds).toFixed(2)
    this.setState({gpa : gpa})
  }

  render() {
    return (
      <div className="container">
        <form onSubmit={this.handleSubmit}>
          {this.state.rows.map((course, i) => (
          <div key={i} className="form-group form-inline col-12">
            <input className="form-control col-5" type="text" name="class" id={'class'+i} placeholder={'Course #'+ (i+1)} />
            <select className="form-control col-2" name="grade" id={'grade'+i}>
              {Object.keys(this.state.grades).map( (grade, index) => (
                <option key={index}>{grade}</option>
              ))}
            </select>
            <input className="form-control col-2" type="number" name="credits" id={'credits'+i}placeholder="Credits" min="0.5" max="999" step="0.5" required/>
            <img className="col-1" type="button" src="./images/add.svg" onClick={() => (this.newCourse(i))} />
            {this.state.rows.length > 1 ?
            <img className="col-1" type="button" src="./images/remove.svg" onClick={() => (this.removeCourse(i))} />
            : <span className="col-1"></span>
            }
          </div>
          ))}
          <input type="submit" value="Submit" className="btn btn-secondary"/>
        </form>
        <div>
          <h3 className="mt-2">GPA: {this.state.gpa}</h3>
        </div>
      </div>
    )
  }
}
