// components/Layout.jsx

import React from 'react'

export default class Layout extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return(
      <div id='app-layout'>
        <div className="jumbotron">
          <h1 className="display-3">The Gabin Sequence</h1>
          <p className="lead">A little math experiment</p>
          <hr />
          <p>This little math experiment app lets you input a few number & run the calculation of a "special" suite. My friend Gabin asked me to code a program to test the suite he imagined, so that's it!</p>
          <p className="lead">
            <a className="btn btn-primary btn-lg" href="#about" role="button">Learn more</a>
          </p>
        </div>
        <div className="container-fluid">
          {this.props.children}
        </div>
        </div>
    )
  }
}
