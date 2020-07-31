import React from 'react'
import { render } from 'react-dom'

import App, { store } from './components/App'

const renderApp = () => render(<App />, document.getElementById('root'))

renderApp()
store.subscribe(renderApp)
