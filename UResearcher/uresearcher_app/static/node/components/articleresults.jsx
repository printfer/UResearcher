import React from "react";
import Loading from "./loading";

export default class ArticleResults extends React.Component {
	constructor(props) {
		super(props);

		this.state = {showAbstract: Array(100).fill(false)}
	}

	toggleAbstract(idx, event) {
		event.preventDefault();
		var newShowAbstract = this.state.showAbstract;
		newShowAbstract[idx] = !this.state.showAbstract[idx];
		this.setState({showAbstract: newShowAbstract});
	}

	render() {
		return (
			<div className={this.props.show ? 'col m-3' : 'hidden'}>
				<Loading show={!this.props.articlesLoaded}/>

				{/* iterates over each article here */}
				{/* TODO: add pagination */}
				<div className={this.props.articlesLoaded ? "" : "hidden"}>
					{this.props.articles.map((article, index) => (
						<div key={index} className="mb-3">
							<div className="row" >
								<div className="col-11">
									<h5>{article.title}</h5>
								</div>
								<div className="col-1">
									<a href={article.link} target="_blank">[Link]</a>
								</div>
							</div>
							<div className="row">
								<div className="col">
									{/* below line first checks if the abstract exists, then checks if showAbstract is true, using nested ternary operators because you can't use if blocks in the return statement */}
									<p className="col-11">
										{article.abstract ? (this.state.showAbstract[index] ? article.abstract : article.abstract.substr(0, 200) + '...') : 'Abstract Not Found.' }
										<a href="#" onClick={(e) => this.toggleAbstract(index, e)}>
											{article.abstract ? (this.state.showAbstract[index] ? ' less' : ' more') : ''}
										</a>
									</p>
									
								</div>
							</div>
							<div className="row">
								<div className="col-6">
									<p>Published: {article.publish_date}</p>
								</div>
								<div className="col-6">
									<p>Published By: {article.publisher}</p>
								</div>
							</div>
						</div>
					))}
				</div>
			</div>
		)
	}
}