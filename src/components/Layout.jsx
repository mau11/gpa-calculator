import React, { Component } from 'react'
import ReactDOM from 'react-dom'

export default class Layout extends Component {
  constructor(props) {
    super(props)
    this.state = {
      rows : [0]
    }
  }

  newCourse(val) {
    let courses = this.state.rows
    courses.push(val)
    this.setState({rows: courses})
  }

  handleSubmit(e) {
    e.preventDefault()
  }

  render() {
    return (
      <div>
        <h1>GPA Calculator</h1>
        <form onSubmit={this.handleSubmit}>
          {this.state.rows.map((course, i) => (
          <div key={i} className={course}>
            <input type="text" name="class" id={'class'+i} />
            <input type="text" name="grade" id={'grade'+i}/>
            <input type="text" name="units" id={'units'+i} />
            <button onClick={() => (this.newCourse(i))}>
              Add
            </button>
          </div>
          ))}
          <input type="submit" value="Submit" />
        </form>
      </div>
    )
  }
}
