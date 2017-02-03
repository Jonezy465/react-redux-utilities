A set of utilities to reduce boilerplate when using React and Redux.

**Install:**

```
npm install --save react-redux-utilities
```

**Usage:**

A simple Counter app

```
import { Reducer, Component, Actions, Render } from 'react-redux-utilities'

const counterReducer = Reducer(0, {
	increment: (state, action) => state + 1,
	decrement: (state, action) => state - 1
});

const globalReducer = {count: counterReducer};

const Counter = Component({
	render() {
		return (
			<div>
				{this.props.count}
				<button onClick={() => Actions.increment()}>+</button>
				<button onClick={() => Actions.decrement()}>-</button>
			</div>
		);
	}
}, state => ({count: state.count}));

Render(globalReducer, <Counter />);
```

By default, the Render function will render to `document.getElementById('root')`, but you can add a third argument to render to a different element.