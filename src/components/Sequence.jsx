// components/Sequence.jsx

import React from 'react'
import _ from 'lodash'

var i=0



function subNumber(arr, index, numIndex=undefined){
  if(typeof numIndex === 'undefined'){
    var numIndex = arr.length-1
  }
  if(arr[numIndex] === 0){
    arr[numIndex] = index
    if(numIndex !== 0){
      arr = subNumber(arr, index, numIndex-1)
    } else {
      return 'end'
    }
  } else {
    arr[numIndex]--
  }
  return arr
}

export default class Sequence extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      initialArray: this.props.array.slice(),
      array: this.props.array.slice(),
      index: 1
    }
    this.start = this.start.bind(this)
  }
  start(){
    return new Promise((resolve, reject) => {
      var c = subNumber(this.state.array, this.state.index)
      this.setState(Object.assign({}, this.state, {
        index: this.state.index+1,
        array: c,
        lastUpdate: new Date().getTime()
      }), () => {
        if(c === 'end'){
          resolve()
        } else {
          setTimeout(() => {
            this.start()
            .then(() => {
              resolve()
            })
          }, 0)

        }
      })
    })
  }
  reset(){
    this.setState(Object.assign({}, this.state, {
      array: this.state.initialArray.slice(),
      index: 1
    }))
  }
  renderArray(){
    if(this.state.array !== "end"){
      return JSON.stringify(this.state.array)
    } else {
      return "End !"
    }
  }
  render(){
    return(
      <div>
        <h1>{this.renderArray()}</h1>
        <h2>Current index: {this.state.index}</h2>
        <button className="btn btn-success" onClick={() => this.start()} >Start !</button>
        <button className="btn btn-default" onClick={() => this.reset()} >Reset</button>
      </div>
    )
  }
}
