import React from 'react'
import { createStore, applyMiddleware } from 'redux'
import { Provider } from 'react-redux'
import thunkMiddleware from 'redux-thunk'

import SwitchNavigation from './navigation/SwitchNavigation'
import reducer from './redux/index'

const middleware = applyMiddleware(thunkMiddleware)
const store = createStore(reducer, middleware)

export default class App extends React.Component {
    render() {
        return (
            <Provider store={store}>
                <SwitchNavigation />
            </Provider>
        )
    }
}