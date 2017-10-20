import React from 'react';
import ReactDOM from 'react-dom';
import { Provider } from 'react-redux';
import { HashRouter as Router, Route } from 'react-router-dom';
import configureStore from './store/configureStore';
const store = configureStore();
require('./assets/less/index.less');

import HomeContainer from './containers/HomeContainer';
import Detaillist from './pages/social/DetailList';
import Pendingproblem from './pages/social/PendingProblem';
import ArticleContainer from './containers/ArticleContainer';
import LoginContainer from './containers/LoginContainer';


const App = (
	<Provider store={store}>
		<Router basename='/'>
			<div>
				<Route exact path='/' component={HomeContainer} />
				<Route exact path='/article/:cid/:id' component={ArticleContainer} />
				<Route exact path='/detailList/:title' component={Detaillist} />
				<Route exact path='/pendingPromblem/:title' component={Pendingproblem} />
				<Route exact path='/login' component={LoginContainer} />
			</div>
		</Router>
	</Provider>
);

ReactDOM.render(App, document.getElementById('root'));
