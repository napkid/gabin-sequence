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
      array: this.props.array.slice(),
      index: 1,
      status: 'stopped',
      stats: {}
    }
    this.start = this.start.bind(this)
    this.pause = this.pause.bind(this)
    this.resume = this.resume.bind(this)
    this.togglePause = this.togglePause.bind(this)
    this.reset = this.reset.bind(this)
  }
  start(first=true){
    if(first){
      return new Promise((resolve, reject) => {
        this.setState(Object.assign({}, this.state, {
          status: 'started',
          stats: {
            startTime: new Date().getTime()
          }
        }), () => {
          this.start(false)
          .then(() => {
            resolve()
          })
        })
      })
    }
    return new Promise((resolve, reject) => {
      var c = subNumber(this.state.array, this.state.index)
      this.setState(Object.assign({}, this.state, {
        index: this.state.index+1,
        array: c
      }), () => {
        if(c === 'end'){
          var duration = new Date().getTime() - this.state.stats.startTime
          var freq = this.state.index/duration
          var period = 1/freq
          this.setState(Object.assign({}, this.state, {
            status: 'ended',
            stats: {
              duration,
              freq,
              period
            }
          }), () => {
            resolve()
          })
        } else {
          if(this.state.status === 'started'){
            setTimeout(() => {
              this.start(false)
              .then(() => {
                resolve()
              })
            }, 0)
          } else {
            this.setState(Object.assign({}, this.state, {
              stats: {
                duration: new Date().getTime() - this.state.stats.startTime
              }
            }))
          }

        }
      })
    })
  }
  reset(props=this.props){
    function resetSequence(){
      this.setState(Object.assign({}, this.state, {
        array: props.array.slice(),
        status: 'stopped',
        index: 0,
        stats: {}
      }))
    }
    resetSequence = resetSequence.bind(this)
    if(this.state.status !== 'stopped'){
      this.pause()
      .then(() => {
        setTimeout(() => {
          resetSequence()
        }, 100)
      })
    } else {
      resetSequence()
    }
  }
  pause(){
    return new Promise((resolve, reject) => {
      this.setState(Object.assign({}, this.state, {
        status: 'paused'
      }), () => {
        resolve()
      })
    })
  }
  resume(){
      this.setState(Object.assign({}, this.state, {
        status: 'started',
        stats: {
          startTime: new Date().getTime() - this.state.stats.duration
        }
      }), () => {
        this.start(false)
      })
  }
  togglePause(){
    if(this.state.status === 'paused'){
      this.resume()
    } else {
      this.pause()
    }
  }
  renderArray(){
    if(this.state.array !== "end"){
      return JSON.stringify(this.state.array)
    } else {
      return "End !"
    }
  }
  componentWillReceiveProps(props){
    this.reset(props)
  }
  render(){
    var info = ""
    var buttons = ""
    switch(this.state.status){
      case 'started':
        info = <p>Running time: {(new Date().getTime() - this.state.stats.startTime)/1000||0}ms</p>
        buttons = buttons = <div className="row justify-content-center" style={{paddingTop:"1em"}}>
          <div className="col-6">
            <button className="btn btn-block btn-warning" onClick={() => this.togglePause()} >Pause</button>
          </div>
          <div className="col-6">
            <button className="btn btn-block btn-default" onClick={() => this.reset()} disabled >Reset</button>
            </div>
        </div>
        break
      case 'ended':
        info = <div>
          <p>Time elapsed: {this.state.stats.duration/1000}s</p>
          <p>Step/second: {this.state.stats.freq.toFixed(3)}</p>
          <p>One step average duration: {this.state.stats.period.toFixed(3)}ms</p>
        </div>
        buttons = <div className="row justify-content-center" style={{paddingTop:"1em"}}>
          <div className="col-6">
            <button className="btn btn-block btn-success" disabled >Start</button>
          </div>
          <div className="col-6">
            <button className="btn btn-block btn-default" onClick={() => this.reset()} >Reset</button>
            </div>
        </div>
        break
      case 'paused':
        info = <p>Time elapsed: {this.state.stats.duration/1000}s</p>
        buttons = <div className="row justify-content-center" style={{paddingTop:"1em"}}>
          <div className="col-6">
            <button className="btn btn-block btn-success" onClick={() => this.togglePause()} >Resume</button>
          </div>
          <div className="col-6">
            <button className="btn btn-block btn-default" onClick={() => this.reset()} >Reset</button>
            </div>
        </div>
        break
      case 'stopped':
      buttons = <div className="row justify-content-center" style={{paddingTop:"1em"}}>
        <div className="col-6">
          <button className="btn btn-block btn-success" onClick={() => this.start()} >Start !</button>
        </div>
        <div className="col-6">
          <button className="btn btn-block btn-default" onClick={() => this.reset()} >Reset</button>
          </div>
      </div>
    }
    return(
      <div className="card" style={{marginTop:"2em"}}>
        <div className="card-block">
          <div className="row">
            <div className="col-md-6 col-xs-12 text-center" style={{paddingBottom:"2em"}}>
              <h1 className="display-3">{this.renderArray()}</h1>
              <h2 className="display-4">Step: {this.state.index}</h2>
            </div>
            <div className="col-md-6 col-sm-12">
              {info}
            </div>
          </div>
          {buttons}
        </div>
      </div>
    )
  }
}
