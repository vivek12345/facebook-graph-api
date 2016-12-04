import React, { Component } from 'react';
import axios from 'axios';
import FacebookConfig from '../config/facebook_config';

const url = `https://graph.facebook.com`;
const instance = axios.create({
	baseURL: url,
});

export default class PlaceDetail extends Component {
	constructor(props) {
		super(props);
		this.state = {
			placeDetail: {}
		};
	}
	componentWillMount() {
		instance.get(`/${this.props.params.id}?access_token=${FacebookConfig.access_token}`)
		.then((response) => {
			this.setState({
				placeDetail: response.data
			});
		})
		.catch((error) => {
			console.log(error);
		});
	}
	getAboutUsInfo() {
		if(this.state.placeDetail.about) {
			return (
				<div className="bs-callout bs-callout-danger">
					<h4>About</h4>
					<p>
						{ this.state.placeDetail.about }
					</p>
				</div>
			)
		}
	}
	getDescription() {
		if(this.state.placeDetail.description) {
			return (
				<div className="bs-callout bs-callout-danger">
					<h4>Description</h4>
					<p>
						{ this.state.placeDetail.description }
					</p>
				</div>
			)
		}
	}
	render() {
		const placeDetail = this.state.placeDetail;
		let coverImage = "http://placehold.it/300x300";
		if(placeDetail.cover && placeDetail.cover.source) {
			coverImage = placeDetail.cover.source;
		}
		return (
			<div className='container'>
				<div className='row'>
					<div className="col-md-10 col-md-offset-1">
						<div className="panel panel-default">
							<div className="panel-heading resume-heading">
								<div className="row">
									<div className="col-lg-12">
										<div className="col-xs-12 col-sm-4">
											<figure>
												<img className="img img-responsive" alt="" src={coverImage} />
											</figure>
										</div>
										<div className="col-xs-12 col-sm-8">
											<ul className="list-group">
												<li className="list-group-item"><b>Name:&nbsp;</b> { placeDetail.name }</li>
												<li className="list-group-item"><b>Category:&nbsp;</b> { placeDetail.category }</li>
												<li className="list-group-item"><b>Checkins:&nbsp;</b> { placeDetail.checkins }</li>
												<li className="list-group-item"><b>Likes:&nbsp;</b> { placeDetail.likes }</li>
												<li className="list-group-item"><b>Were here_count:&nbsp;</b> { placeDetail.were_here_count }</li>
												<li className="list-group-item"><i className="fa fa-phone"></i><b>Phone:&nbsp;</b> { placeDetail.phone }</li>
												<li className="list-group-item"><i className="fa fa-envelope"></i><b>Link:&nbsp;</b> <a href={ placeDetail.link }>{ placeDetail.link }</a></li>
											</ul>
										</div>
									</div>
								</div>
							</div>
							{ this.getAboutUsInfo() }
							{ this.getDescription() }
						</div>
					</div>
				</div>
			</div>
		)
	}
}
