'use strict';

Object.defineProperty(exports, "__esModule", {
	value: true
});
exports.Actions = undefined;
exports.Component = Component;
exports.Reducer = Reducer;
exports.Render = Render;

var _react = require('react');

var _react2 = _interopRequireDefault(_react);

var _reactDom = require('react-dom');

var _redux = require('redux');

var _reactRedux = require('react-redux');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var Actions = {};
var Reducers = [];
var Store = null;

function Component(component, mapStateToProps) {
	return (0, _reactRedux.connect)(mapStateToProps)(_react2.default.createClass(component));
}

function Reducer(initialState, handlers) {
	Reducers.push(handlers);
	return function () {
		var state = arguments.length > 0 && arguments[0] !== undefined ? arguments[0] : initialState;
		var action = arguments[1];

		if (handlers.hasOwnProperty(action.type)) {
			return handlers[action.type](state, action.data);
		} else {
			return state;
		}
	};
}

function Render(appState, app) {
	var entryPoint = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : document.getElementById('root');

	var stateReducer = (0, _redux.combineReducers)(appState);
	Store = (0, _redux.createStore)(stateReducer);
	for (var reducer in Reducers) {
		var _loop = function _loop(actionType) {
			Actions[actionType] = function (data) {
				return Store.dispatch({ data: data, type: actionType });
			};
		};

		for (var actionType in Reducers[reducer]) {
			_loop(actionType);
		}
	}
	(0, _reactDom.render)(_react2.default.createElement(
		_reactRedux.Provider,
		{ store: Store },
		app
	), entryPoint);
}

exports.Actions = Actions;