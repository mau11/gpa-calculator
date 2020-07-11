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
      <div>
        <h3>Course Name, Grade, Credits</h3>
        <form onSubmit={this.handleSubmit}>
          {this.state.rows.map((course, i) => (
          <div key={i} className={'course'+i}>
            <input type="text" name="class" id={'class'+i} />
            <input type="text" name="grade" id={'grade'+i}/>
            <input type="text" name="credits" id={'credits'+i} />
            <input type="button" value="Add" onClick={() => (this.newCourse(i))} />
          </div>
          ))}
          <input type="submit" value="Submit" />
        </form>
        <div>
          <h3>GPA: {this.state.gpa}</h3>
        </div>
      </div>
    )
  }
}
