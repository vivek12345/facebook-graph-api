import React,{ Component } from 'react';

export const Loader = () => {
	return (
		<svg width='120px' height='120px' xmlns="http://www.w3.org/2000/svg" viewBox="0 0 100 100" preserveAspectRatio="xMidYMid" className="uil-balls">
			<rect x="0" y="0" width="100" height="100" fill="none" className="bk"></rect>
			<g transform="rotate(0 50 50)">
				<circle r="5" cx="30" cy="50">
					<animateTransform attributeName="transform" type="translate" begin="0s" repeatCount="indefinite" dur="1s" values="0 0;19.999999999999996 -20" keyTimes="0;1"/>
					<animate attributeName="fill" dur="1s" begin="0s" repeatCount="indefinite"  keyTimes="0;1" values="#fefefe;#cec9c9"/>
				</circle>
			</g>
			<g transform="rotate(90 50 50)">
				<circle r="5" cx="30" cy="50">
					<animateTransform attributeName="transform" type="translate" begin="0s" repeatCount="indefinite" dur="1s" values="0 0;19.999999999999996 -20" keyTimes="0;1"/>
					<animate attributeName="fill" dur="1s" begin="0s" repeatCount="indefinite"  keyTimes="0;1" values="#cec9c9;#3c302e"/>
				</circle>
			</g>
			<g transform="rotate(180 50 50)">
				<circle r="5" cx="30" cy="50">
				<animateTransform attributeName="transform" type="translate" begin="0s" repeatCount="indefinite" dur="1s" values="0 0;19.999999999999996 -20" keyTimes="0;1"/>
				<animate attributeName="fill" dur="1s" begin="0s" repeatCount="indefinite"  keyTimes="0;1" values="#3c302e;#bb171a"/>
				</circle>
			</g>
			<g transform="rotate(270 50 50)">
				<circle r="5" cx="30" cy="50">
					<animateTransform attributeName="transform" type="translate" begin="0s" repeatCount="indefinite" dur="1s" values="0 0;19.999999999999996 -20" keyTimes="0;1"/>
					<animate attributeName="fill" dur="1s" begin="0s" repeatCount="indefinite"  keyTimes="0;1" values="#bb171a;#fefefe"/>
				</circle>
			</g>
		</svg>
	)
}
