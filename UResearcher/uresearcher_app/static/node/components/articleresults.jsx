import React from "react";
import Loading from "./loading";

import TodayIcon from '@material-ui/icons/Today';
import PersonIcon from '@material-ui/icons/Person';
import LinkIcon from '@material-ui/icons/Link';
import ImportContactsIcon from '@material-ui/icons/ImportContacts';
import Modal from '@material-ui/core/Modal';

export default class ArticleResults extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			showAbstract: Array(100).fill(false),
			showModal: Array(100).fill(false),
			modalContents: (<p>test</p>)
		}
	}

	toggleAbstract(idx, event) {
		event.preventDefault();
		var newShowAbstract = this.state.showAbstract;
		newShowAbstract[idx] = !this.state.showAbstract[idx];
		this.setState({ showAbstract: newShowAbstract });
	}

	openModal(event, idx, doi) {
		event.preventDefault();
		var newShowModal = this.state.showModal;
		newShowModal[idx] = true;
		this.setState({ showModal: newShowModal });

		// gets citation info for clicked article
		if (doi != null) {
			fetch("/citation/" + doi.replace('/', '_'))
			.then(res => res.json())
			.then((result) => {
				this.setState({
				modalContents: (<p>{JSON.stringify(result)}</p>)
				});
			});
		}
		else {
			this.setState({
				modalContents: (<p>Could not get citation information.</p>)
			});
		}
		
	}

	closeModal(event, idx) {
		event.preventDefault();
		var newShowModal = this.state.showModal;
		newShowModal[idx] = false;
		this.setState({ showModal: newShowModal });
	}

	render() {
		const articleInfoIconStyle = {
			display: 'flex',
			alignItems: 'center'
		}

		return (
			<div className={this.props.show ? 'col m-3' : 'hidden'}>
				<Loading show={!this.props.articlesLoaded} />

				{/* iterates over each article here */}
				{/* TODO: add pagination */}
				<div className={this.props.articlesLoaded ? "" : "hidden"}>
					{this.props.articles.map((article, index) => (
						<div key={index} className="mb-3">
							<div className="row" >
								<div className="col-10">
									<h5>{article.title}</h5>
									<div className="row">
										<div className="col">
											{/* below line first checks if the abstract exists, then checks if showAbstract is true, using nested ternary operators because you can't use if blocks in the return statement */}
											<p className="col-11">
												{article.abstract ? (this.state.showAbstract[index] ? article.abstract : article.abstract.substr(0, 200) + '...') : 'Abstract Not Found.'}
												<a href="#" onClick={(e) => this.toggleAbstract(index, e)}>
													{article.abstract ? (this.state.showAbstract[index] ? ' less' : ' more') : ''}
												</a>
											</p>
										</div>
									</div>
								</div>
								<div className="col-2">
                                    {/* <p style={articleInfoIconStyle}> <LinkIcon /> <a href={article.link} target="_blank">Link</a></p> */}
                                    <a href={article.link} target="_blank">Link</a>
									<br />
									<br />
                                    {/* <p style={articleInfoIconStyle}> <ImportContactsIcon /> <a href="#" onClick={(e) => this.openModal(e, index, article.doi)}>Citation Info</a> </p> */}
                                    <a href="#" onClick={(e) => this.openModal(e, index, article.doi)}>Citation Info</a>
								</div>
							</div>
							<div className="row">
								<div className="col-6">
									<p style={articleInfoIconStyle}><TodayIcon/> Published: {article.publish_date}</p>
								</div>
								<div className="col-6">
									<p style={articleInfoIconStyle}><PersonIcon /> Published By: {article.publisher}</p>
								</div>
							</div>
							<Modal
								open={this.state.showModal[index]}
								onClose={(e) => this.closeModal(e, index)}
							>
								<div className="modal-dialog">
									<div className="modal-content">
										<div className="modal-header">
											<div className="flex-column">
												<h5 className="modal-title">Citation Information</h5>
												<h6 className="modal-title">For: {article.title}</h6>
											</div>

											<button type="button" className="close" aria-label="Close" onClick={(e) => this.closeModal(e, index)}>
												<span aria-hidden="true">&times;</span>
											</button>
										</div>
										<div className="modal-body">
											{this.state.modalContents}
										</div>
									</div>
								</div>
							</Modal>
						</div>
					))}
				</div>
			</div>
		)
	}
}
