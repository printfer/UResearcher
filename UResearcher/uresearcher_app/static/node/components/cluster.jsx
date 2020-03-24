import React from "react";
import ForceGraph2D from 'react-force-graph-2d';
import Card from "@material-ui/core/Card";
import CardContent from '@material-ui/core/CardContent';
import Loading from "./loading";

export default class Cluster extends React.Component {
	constructor(props) {
		super(props);

		this.graph = React.createRef();
	}

	componentDidMount() {
		// center graph on data
		this.graph.current.centerAt(-80, -50);
		this.graph.current.zoom(4);
	}

	render() {
		var query = this.props.clusters.nodes.length > 0 ? this.props.clusters.nodes[0].name : '';
		return (
			<div className={this.props.show ? 'col p-0' : 'hidden'}>
				<Loading show={!this.props.clustersLoaded}/>
				<Card className={this.props.clustersLoaded ? "d-flex flex-column justify-content-center align-items-center p-3" : "hidden"}>
					<Card className="mb-2">
						<CardContent className="pb-2">
							<h5>Use these clusters to explore some generated <strong>subtopics</strong> of <strong>{query}</strong>.</h5>
							<p>These subtopics are generated from the results of your current search.</p>
						</CardContent>
					</Card>
					<Card>
						<ForceGraph2D
							ref={this.graph}
							graphData={this.props.clusters}
							nodeCanvasObject={(node, ctx, globalScale) => {
								const label = node.name;
								const fontSize = 16 / globalScale;
								ctx.font = `${fontSize}px Sans-Serif`;
								//draw circle
								ctx.fillStyle = 'rgba(255, 0, 0, 1.0)';
								let radius = node.val * 2;
								ctx.beginPath();
								ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
								ctx.fill();
								//draw rectangle
								const textWidth = ctx.measureText(label).width;
								const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding
								ctx.fillStyle = 'rgba(0, 255, 0, 0.8)';
								ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
								// draw text
								ctx.textAlign = 'center';
								ctx.textBaseline = 'middle';
								ctx.fillStyle = 'rgba(255, 255, 255, 1.0)';
								ctx.fillText(label, node.x, node.y);
							}}
							nodeLabel=''// no node label
							onNodeClick={(node) => this.props.selectCluster(node.name)}
							height={400}
							width={600}
						/>
					</Card>
				</Card>
				{/* {this.state.clustersLoaded ? alert('loaded clusters') : ''} // potential method to run code when props/state update */}
			</div>
		)
	}
}