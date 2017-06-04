// components/App.jsx

import React from 'react'

import '../bootstrap/scss/bootstrap.scss'
// import {createSequence, setSequenceHandler, startSequence, stopSequence, resetSequence} from '../sequence/api'
import Sequence from './Sequence.jsx'

var sequence = {}

export default class App extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return(
      <Sequence array={[8,1]} />
    )
  }
}
