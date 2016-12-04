import React, { Component } from 'react';
import { Link } from 'react-router';

import { Loader } from './loader';

export default class FixedTable extends Component {

	handleSearchClick(event) {
		event.preventDefault();
		const query = document.getElementById('place-search').value;
		this.props.handleSearchClick(query);
	}
	handleBookmarkClick(event, place) {
		event.preventDefault();
		this.props.handleBookmarkClick(place);
	}
	handleTabChange(event) {
		event.preventDefault();
		const currentTarget = event.currentTarget;
		const activeTab = currentTarget.getAttribute('data-name');
		this.props.handleTabChange(activeTab);
	}
	renderLoader() {
		return <Loader />
	}
	renderPlaces() {
		const data = (this.props.activeTab === 'bookmarks')?this.props.bookMarkedPlaces:this.props.data;
		let _this = this;
		return data.map((place) => {
			const bookMarkClass = (_this.props.bookMarkedPlacesId.indexOf(place.id)<0)?"glyphicon glyphicon glyphicon-bookmark":"glyphicon glyphicon glyphicon-bookmark active";
			return (
				<tr key={place.id}>
					<td className='bookmark-holder' onClick={(event)=>this.handleBookmarkClick(event, place)}>
						<span className={bookMarkClass} aria-hidden="true"></span>
					</td>
					<td><Link to={place.id}>{place.name}</Link></td>
					<td>{place.location.city}</td>
					<td>{place.category}</td>
				</tr>
			)
		});
	}
	renderTabs() {
		return (
			<ul className="nav nav-tabs">
				<li className={ (this.props.activeTab === 'all')?'active':'' }>
					<a href="#tab1" data-toggle="tab" onClick={(event)=>this.handleTabChange(event)} data-name="all">All Places</a>
				</li>
				<li className={ (this.props.activeTab === 'bookmarks')?'active':'' }>
					<a href="#tab2" data-toggle="tab" onClick={(event)=>this.handleTabChange(event)} data-name="bookmarks">Bookmarked Places</a>
				</li>
			</ul>
		)
	}
	render() {
		let rowsCount = (this.props.activeTab === 'bookmarks')?this.props.bookMarkedPlaces.length:this.props.data.length;
		let placesData = (
			<table className="table table-striped table-bordered table-list">
				<thead>
					<tr>
						<th></th>
						<th>Name</th>
						<th>City</th>
						<th>Category</th>
					</tr>
				</thead>
				<tbody>
					{ this.renderPlaces() }
				</tbody>
			</table>
		);
		if(this.props.isLoading) {
			placesData = this.renderLoader();
		}
		return (
			<div className="col-md-10 col-md-offset-1">
				<div className="panel panel-default panel-table">
					<div className="panel-heading">
						<div className="row">
							<div className="col col-xs-6">
								<h3 className="panel-title custom-title">Panel Heading</h3>
							</div>
							<div className="col col-xs-6 text-right">
								<div className="form-group">
									<div className="input-group">
										<input type="text" className="form-control" placeholder="Search for places..." id="place-search" />
										<span className="input-group-btn">
											<button className="btn btn-default search-btn" type="button" onClick={ (event) => this.handleSearchClick(event) }>
												<span>Search</span>
											</button>
										</span>
									</div>
								</div>
							</div>
						</div>
					</div>
					<div className="panel-body custom-body">
						<span className="pull-right">
							{ this.renderTabs() }
						</span>
						{ placesData }
					</div>
					<div className="panel-footer">
						<div className="row">
							<div className="col col-xs-4">Showing { rowsCount } Places
							</div>
						</div>
					</div>
				</div>
			</div>
		)
	}
}
