import React from 'react'
import { render } from 'react-dom'
import { createStore, combineReducers } from 'redux'
import { Provider, connect } from 'react-redux'

let Actions = {};
let Reducers = [];
let Store = null;

export function Component(component, mapStateToProps) {
	return connect(mapStateToProps)(React.createClass(component));
}

export function Reducer(initialState, handlers) {
	Reducers.push(handlers);
	return (state = initialState, action) => {
		if (handlers.hasOwnProperty(action.type)) {
			return handlers[action.type](state, action.data);
		} else {
			return state;
		}
	}
}

export function Render(appState, app, entryPoint = document.getElementById('root')) {
	const stateReducer = combineReducers(appState);
	Store = createStore(stateReducer);
	for (let reducer in Reducers) {
		for(let actionType in Reducers[reducer]) {
			Actions[actionType] = (data) => Store.dispatch({data, type: actionType});
		}
	}
	render(
		<Provider store={Store}>{app}</Provider>,
		entryPoint
	);
}

export {Actions};