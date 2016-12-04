import React,{ Component } from 'react';
import { Router, Route, IndexRoute, browserHistory } from 'react-router';

import App from './components/app';
import PlaceDetail from './components/place-detail';
import TopContainer from './containers/top-container';

const taskRouter = (
	<Router history={browserHistory}>
		<Route path="/" component={App}>
			<IndexRoute component={TopContainer} />
			<Route path="/:id" component={PlaceDetail} />
		</Route>
	</Router>
);
export default taskRouter;
