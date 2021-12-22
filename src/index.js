import React from 'react';
import ReactDOM from 'react-dom';
import App from './Components/App';
import 'semantic-ui-css/semantic.min.css'
import { createStore } from 'redux';
import { Provider } from 'react-redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import rootReducer from './reducers/IndexReducer';

const store = createStore(rootReducer, composeWithDevTools());

ReactDOM.render(<Provider store={store} > <App /> </Provider>, document.getElementById('root'));

