import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers, applyMiddleware } from 'redux'
import { Provider, connect } from 'react-redux'

let Actions = {};
let Thunks = [];
let Reducers = [];
let Store;

export function Component(component, mapStateToProps) {
	return connect(mapStateToProps)(React.createClass(component));
}

export function Reducer(initialState, handlers) {
	Reducers.push(handlers);
	return (state = initialState, action) => {
		if (handlers.hasOwnProperty(action.type)) {
			return handlers[action.type](state, action.payload);
		} else {
			return state;
		}
	}
}

export function Thunk(id, thunk) {
    Thunks.push({id, thunk});
}

export function CreateStore(reducers, middleware) {
    let rootReducer = combineReducers(reducers);
	Store = middleware ? createStore(rootReducer, applyMiddleware(...middleware)) : createStore(rootReducer);
	Reducers.forEach(reducer => {
		Object.keys(reducer).forEach(actionType => {
			Actions[actionType] = payload => Store.dispatch({payload, type: actionType});
		});
	});
	Thunks.forEach(action => Actions[action.id] = action.thunk(Store.dispatch, Store.getState));
	return Store;
}

export function Render(app, entryPoint = document.getElementById('root')) {
	render(<Provider store={Store}>{app}</Provider>, entryPoint);
}

export {Actions};