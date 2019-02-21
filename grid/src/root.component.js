import React from 'react'
import { Scoped } from 'kremling'
import { Link } from '@reach/router'

export default class Root extends React.Component {

  state = {
    hasError: false
  }

  componentDidCatch (error, info) {
    this.setState({hasError: true})
  }

  render () {
    return (
      <p>PROGRAMAR UNA TABLA DINÁMICA</p>
    )
  }
}
