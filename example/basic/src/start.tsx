import * as React from 'react'
import * as ReactDOM from 'react-dom'
import App from './App'
import './reset.css'
import './App.css'

function render() {
  ReactDOM.render(<App />, document.getElementById('app'))
}

//@ts-ignore
if (module.hot) module.hot.accept(render)

render()
