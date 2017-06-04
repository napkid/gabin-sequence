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
          <p>This little math experiment app lets you input a few number & run the calculation of the suite.<br />
          My friend Gabin asked me to code something to test the suite he imagined, so that's it !</p>
          <p className="lead">
            <a className="btn btn-primary btn-lg" href="#try" role="button">I wanna try that !</a>
          </p>
        </div>
        <div style={{height:"1vh"}}>
          <div className="container-fluid" id="try">
            {this.props.children}
          </div>
          <div className="card text-center" style={{marginTop:"3em"}}>
            <div className="card-block">
              <p class="card-text">This project is released under the <a href="https://github.com/napkid/gabin-sequence/blob/master/LICENSE">MIT License</a>.
              <br />Special thanks to Gabin Perez !
              <br />(c) Copyright Clément Dandrieux 2017
              </p>
            </div>
          </div>
        </div>
      </div>
    )
  }
}
