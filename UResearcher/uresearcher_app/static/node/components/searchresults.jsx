import React from "react";
import ReactDOM from "react-dom";

import Tabs from '@material-ui/core/Tabs';
import Tab from '@material-ui/core/Tab';
import { Paper, Card, CardContent, Divider, Typography } from "@material-ui/core";
import Breadcrumbs from '@material-ui/core/Breadcrumbs';
import NavigateNextIcon from '@material-ui/icons/NavigateNext';

import ArticleResults from "./articleresults"
import Cluster from "./cluster"
import Grant from "./grant"
import Keyword from "./keyword"
import LKA from "./lka"
import Summary from "./summary"
import Menu from "./menu"


class SearchResults extends React.Component {
	constructor(props) {
		super(props);

		this.state = {
			selectedTab: 0,
			breadcrumbs: [],
			articles: Array(0),
			articlesLoaded: false,
			clusters: { nodes: [], links: [] },
			clustersLoaded: false,
			keywordData: [[{ x: 0, y: 0 }]],
			keywordLabels: ['a'],
			tsneData: [],
			tsneLabels: [],
			tsneLoaded: false,
			autocompleteVocab: [],
			summary: ""
		};

		this.selectCluster = this.selectCluster.bind(this);
	}

    getQuery() {
		let query = window.location.search.substr(7);
        return query;
    }

	componentDidMount() {
		// does an ajax call to get the articles using the query in the url
		var query = window.location.search.substr(7);
		fetch("/search/" + query)
			.then(res => res.json())
			.then((result) => {
				this.setState({
					articles: result['article_list'],
					articlesLoaded: true,
					breadcrumbs: [query]
				});

				this.articlesUpdated(query);
			});
	}

	// called by the cluster component to select a cluster
	selectCluster(cluster) {
		// move the user back to the article results
		this.setState({ selectedTab: 0, articlesLoaded: false });
		// update breadcrumbs
		this.state.breadcrumbs.push(cluster);
		// fetch articles for selected cluster
		fetch("/select-cluster/" + cluster)
			.then(res => res.json())
			.then((result) => {
				this.setState({
					articles: result["articles"],
					articlesLoaded: true,
				});
				// fetch new data for new articles
				this.articlesUpdated(cluster);
			});
	}

	// this does all the necessary ajax calls once an article search is complete
	articlesUpdated(cluster) {
		this.getClusterData(cluster);
		this.getKeywordData();
		this.getLKAData();
		this.getTSNEData();
		this.getSummary();
	}

	getClusterData(cluster) {
		this.setState({
			clusters: { nodes: [], links: [] },
			clustersLoaded: false
		});
		// does an ajax call to get the clusters using the current search
		fetch("/clusters/" + cluster)
			.then(res => res.json())
			.then((result) => {
				this.setState({
					clusters: result['clusters'],
					clustersLoaded: true
				});
			});
	}

	getKeywordData() {
		// does an ajax call to get the tsne data using the current search
		fetch("/keyword")
			.then(res => res.json())
			.then((result) => {
				this.setState({
					keywordData: result['data'],
					keywordLabels: result['labels'],
				});
			});
	}

	getLKAData() {
		// does an ajax call to get the vocab data using the current search
		fetch("/vocab")
			.then(res => res.json())
			.then((result) => {
				this.setState({
					autocompleteVocab: result['vocab']
				});
			});
	}

	getTSNEData() {
		this.setState({ tsneLoaded: false });
		// does an ajax call to get the tsne data using the current search
		fetch("/tsne")
			.then(res => res.json())
			.then((result) => {
				this.setState({
					tsneLoaded: true,
					tsneData: result['data'],
					tsneLabels: result['labels']
				});
			});
	}

	getSummary() {
		// does an ajax call to get the summary using the current search
		fetch("/summary")
			.then(res => res.json())
			.then((result) => {
				this.setState({
					summary: result['summary']
				});
			});
	}


	render() {
        let searchValue = this.getQuery().replace(/%20/g, ' ');
        let searchPlaceholder = "Search...";
        let enableSearchBar = true;


		return (
			<div className="container-fluid">

                {/* Menu */}
				<Menu searchValueInput={searchValue} placeholderInput={searchPlaceholder} enableSearchBar={enableSearchBar}/>

                {/* Content */}
				<div className="row">

                    {/* Sidebar */}
					<div className="col-1 p-0 m-1" id="sidebar" style={{ minWidth: "150px" }}>
						<Paper style={{ height: "calc(100vh - 4.5rem)", position: "relative" }}>
							<Tabs
								value={this.state.selectedTab}
								onChange={(event, newValue) => this.setState({ selectedTab: newValue })}
								variant="fullWidth"
								indicatorColor="secondary"
								textColor="secondary"
								orientation="vertical"
							>
								<Tab icon={<i className="fas fa-list"></i>} label="ARTICLES" />
								<Tab icon={<i className="fas fa-project-diagram"></i>} label="CLUSTERS" />
								<Tab icon={<i className="fas fa-money-check-alt"></i>} label="GRANT TRENDS" />
								<Tab icon={<i className="fas fa-chart-bar"></i>} label="KEYWORD TRENDS" />
								<Tab icon={<i className="fas fa-brain"></i>} label="LATENT KNOWLEDGE" />
								<Tab icon={<i className="fas fa-book-reader"></i>} label="SUMMARY" />
							</Tabs>
						</Paper>
					</div>

                    {/* SearchResult */}
					<div className="col p-0 m-1">
						<div className="row col">
							{/* breadcrumbs */}
							<span className="mt-1">Search Path: &nbsp;</span>
							{this.state.breadcrumbs.map((word, i) =>
								<span key={i} className="mt-1">
									{unescape(word)}
									{i + 1 < this.state.breadcrumbs.length ? <NavigateNextIcon /> : ''}
								</span>
							)}
							<Paper className="w-100 mt-2">
								<ArticleResults
									show={this.state.selectedTab == 0}
									articles={this.state.articles}
									articlesLoaded={this.state.articlesLoaded}
								/>
								<Cluster
									show={this.state.selectedTab == 1}
									clusters={this.state.clusters}
									clustersLoaded={this.state.clustersLoaded}
									selectCluster={this.selectCluster}
								/>
								<Grant show={this.state.selectedTab == 2} />
								<Keyword
									show={this.state.selectedTab == 3}
									data={this.state.keywordData}
									labels={this.state.keywordLabels}
									legendClickHandler={this.keywordClickHandler}
								/>
								<LKA
									show={this.state.selectedTab == 4}
									vocab={this.state.autocompleteVocab}
									tsneData={this.state.tsneData}
									tsneLabels={this.state.tsneLabels}
									tsneLoaded={this.state.tsneLoaded}
								/>
								<Summary 
									show={this.state.selectedTab == 5}
									summary={this.state.summary}
								/>
							</Paper>
						</div>
					</div>

					<div className="col-1">
						{/* this is just padding */}
					</div>

				</div>
			</div>
		);
	}
}

ReactDOM.render(
	<SearchResults />,
	document.getElementById("searchresults")
);
