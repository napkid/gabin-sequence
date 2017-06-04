// components/Display.jsx

import React from 'react'
import Sequence from './Sequence.jsx'

export default class Display extends React.Component {
  constructor(props){
    super(props)
    this.state = {
      array: [0, 0]
    }
    this.changeHandler = this.changeHandler.bind(this)
    this.addInput = this.addInput.bind(this)
    this.removeInput = this.removeInput.bind(this)
  }
  addInput(){
    if(this.state.array.length >= 4){
      return
    }
    var newArray = _.clone(this.state.array)
    newArray.push(0)
    this.setState(Object.assign({}, this.state, {
      array: newArray
    }))
  }
  removeInput(){
    if(this.state.array.length <= 2){
      return
    }
    var newArray = _.clone(this.state.array)
    newArray.pop(0)
    this.setState(Object.assign({}, this.state, {
      array: newArray
    }))
  }
  changeHandler(evt, index){
    var newArray = _.clone(this.state.array)
    var newVal = parseInt(evt.target.value)
    newArray.splice(index, 1, newVal)
    this.setState(Object.assign({}, this.state, {
      array: newArray
    }))
  }
  renderInputs(){
    return this.state.array.map((value, index) => {
      return <div className="col">
        <input type="number" min="0" max="15" className="form-control" value={value} onChange={(evt) => {this.changeHandler(evt, index)}}/>
      </div>
    })
  }
  render(){
    var inputs = this.renderInputs()
    var dispArray = this.state.array.map((elem) => {
      if(!elem){
        return 0
      } else {
        return elem
      }
    })
    return(
      <div id="display" style={{marginTop:"3em"}}>
        <div className="text-center">
          <p>Please input your parameters.</p>
        </div>
        <form className="form" onSubmit={(evt) => {evt.preventDefault()}}>
          <div className="row justify-content-center">
            {inputs}
          </div>
          <div className="row justify-content-center" style={{paddingTop:"1em"}}>
            <div className="col-6">
              <button className="btn btn-success btn-block" onClick={this.addInput}>Add</button>
            </div>
            <div className="col-6">
              <button className="btn btn-secondary btn-block" onClick={this.removeInput}>Remove</button>
            </div>
          </div>
        </form>
        <Sequence array={dispArray} />
      </div>
    )
  }
}
