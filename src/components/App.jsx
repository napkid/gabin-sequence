// components/App.jsx

import React from 'react'

import '../bootstrap/scss/bootstrap.scss'

import Layout from './Layout.jsx'
import Display from './Display.jsx'
import Sequence from './Sequence.jsx'

var sequence = {}

export default class App extends React.Component {
  constructor(props){
    super(props)
  }
  render(){
    return(
      <Layout>
        <Display />
      </Layout>

    )
  }
}
