import { Component } from "solid-js";




const Partner: Component<{ name: string, notice: string, tags: string[] }> = (props) => {

	return <div>
		<p>{props.name}</p>
		<p>Themen: {props.tags}</p>
		<p>Beachte: {props.notice}</p>
	</div>;
};


export default Partner
