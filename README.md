A set of utilities to reduce boilerplate when using React and Redux.

## Install:

`npm install --save react-redux-utilities`

## Usage:

A simple async counter app

    import React from 'react';
    import {
        Component, 
        Actions, 
        Thunk, 
        Reducer, 
        CreateStore, 
        Render
    } from 'react-redux-utilities';

    Thunk('asyncIncrement', () => setTimeOut(Actions.increment, 1000));

    const counterReducer = Reducer(0, {
        increment: (state, action) => state + 1,
        decrement: (state, action) => state - 1
    });

    const rootReducer = {count: counterReducer};

    const App = Component({
        render() {
            return (
                <div>
                    {this.props.count}
                    <button onClick={() => Actions.asyncIncrement()}>+</button>
                    <button onClick={() => Actions.decrement()}>-</button>
                </div>
            );
        }
    }, state => ({count: state.count}));

    const store = CreateStore(rootReducer);
    Render(store, <App />);

## API

**Component(componentObject, mapStateToProps)**

Creates a connected component using `React.createClass()` on `componentObject` and connecting it with `mapStateToProps` using Redux's `connect()`.

**Actions.actionType(actionData)**

Sends an action to the global reducer that has the form `{type: 'actionType', data: actionData}`.

**Reducer(initialValue, actionHandlers)**

Returns a new reducer. Each key in `actionHandlers` is added to the Actions object.

**Thunk(name, func)**

Returns a new Thunk (async function) that can be accessed by `Actions.name`. The `func` parameter expects a function with the form: `(getState, dispatch) => ...`.

**CreateStore(rootReducer, middleware)**

Returns a new Redux store using `createStore(rootReducer)`. Takes an optional parameter `middleware`, which expects an array of middleware to be applied to the store with `applyMiddleware(...middleware)`.

**Render(store, app, entryPoint)**

Wraps `app` with react-redux's `<Provider>` tag and passes it `store` as its store prop. Renders the app with `React.render(app, entryPoint)`. If `entryPoint` is not provided, it will default to `document.getElementById('root')`.