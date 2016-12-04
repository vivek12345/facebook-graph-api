import React,{ Component } from 'react';
import FacebookConfig from '../config/facebook_config';
import axios from 'axios';

import CustomCss from '../stylesheets/custom';
import Bootstrap from 'bootstrap';
import FixedTable from '../components/fixed-table';

const url = `https://graph.facebook.com`;
const instance = axios.create({
	baseURL: url,
});

export default class TopContainer extends Component {
	constructor(props) {
		super(props);
		this.state = {
			places:{},
			bookMarkedPlaces: [],
			bookMarkedPlacesId: [],
			activeTab: 'all',
			isLoading: false
		}
	}
	componentWillMount() {
		if(this.isLocalStorageAvailable()) {
			const localStorage = window.localStorage;
			let bookMarkedPlaces = [], bookMarkedPlacesId = bookMarkedPlaces;
			try {
				bookMarkedPlaces = JSON.parse(localStorage.getItem('bookMarkedPlaces'));
			} catch(e) {
				console.error(e);
			}
			if(bookMarkedPlaces && bookMarkedPlaces.length>0) {
				bookMarkedPlacesId = bookMarkedPlaces.map((place) => {
					return place.id;
				});
				this.setState({
					bookMarkedPlaces: bookMarkedPlaces,
					bookMarkedPlacesId: bookMarkedPlacesId
				});
			}
		}
	}
	isLocalStorageAvailable() {
		const isLocalStorageAvailable = (window && window.localStorage)?true:false;
		return isLocalStorageAvailable;
	}
	handleSearchClick(query) {
		this.setState({
			isLoading: true
		});
		const searchUrl = `${url}/search?q=${query}&type=place&access_token=${FacebookConfig.access_token}`;
		this.fetchPlacesData(searchUrl);
	}
	handleTabChange(activeTab) {
		this.setState({
			activeTab: activeTab
		});
	}
	handleBookmarkClick(newBookmarkedPlace) {
		let updatedBookMarkedPlaces = [],updatedBookMarkedIds = updatedBookMarkedPlaces;
		if(this.state.bookMarkedPlacesId.indexOf(newBookmarkedPlace.id)<0) {
			updatedBookMarkedPlaces = [...this.state.bookMarkedPlaces, newBookmarkedPlace];
			updatedBookMarkedIds = [...this.state.bookMarkedPlacesId, newBookmarkedPlace.id];
		} else {
			updatedBookMarkedPlaces = this.state.bookMarkedPlaces.filter((place) => {
				return place.id !== newBookmarkedPlace.id
			});
			updatedBookMarkedIds = updatedBookMarkedPlaces.map((place) => {
					return place.id;
			});
		}
		updatedBookMarkedPlaces = updatedBookMarkedPlaces?updatedBookMarkedPlaces:[];
		updatedBookMarkedIds = updatedBookMarkedIds?updatedBookMarkedIds:[];
		if(this.isLocalStorageAvailable()) {
			const localStorage = window.localStorage;
			try {
				const stringifiedJson =  JSON.stringify(updatedBookMarkedPlaces);
				localStorage.setItem('bookMarkedPlaces', JSON.stringify(updatedBookMarkedPlaces));
				this.setState({
					bookMarkedPlaces: updatedBookMarkedPlaces,
					bookMarkedPlacesId: updatedBookMarkedIds
				});
			} catch(e) {
				console.error(e);
			}
		}
	}
	fetchPlacesData(url) {
		instance.get(url)
		.then((response) => {
			this.setState({
				places: response.data,
				isLoading: false
			});
		})
		.catch((error) => {
			this.setState({
				isLoading: false
			});
		});

	}
	render() {
		const placesData = this.state.places.data?this.state.places.data:[];
		return (
			<FixedTable
				data={placesData}
				bookMarkedPlaces={this.state.bookMarkedPlaces}
				bookMarkedPlacesId={this.state.bookMarkedPlacesId}
				isLoading={this.state.isLoading}
				activeTab={this.state.activeTab}
				handleSearchClick={(query) => this.handleSearchClick(query)}
				handleBookmarkClick={(newBookmarkedPlace) => this.handleBookmarkClick(newBookmarkedPlace) }
				handleTabChange={(activeTab) => this.handleTabChange(activeTab)} />
		)
	}
}

