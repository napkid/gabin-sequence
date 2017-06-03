// components/App.jsx

import React from 'react'

import '../bootstrap/scss/bootstrap.scss'


export default class App extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div className="jumbotron">
        <h1>Hello world!!</h1>
      </div>
    )
  }
}
