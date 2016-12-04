import React,{ Component } from 'react';
import { render } from 'react-dom';
import TaskRouter from './router';

class Index extends Component {
	render() {
		return (
			<div>
				{ TaskRouter }
			</div>
		)
	}
}

render(<Index/>, document.querySelector('.main-container'));

