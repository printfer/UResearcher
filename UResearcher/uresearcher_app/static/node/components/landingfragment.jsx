import React from "react";
import { Carousel } from 'react-responsive-carousel';

export default class LandingFragment extends React.Component {
    render() {
        const jumbotronStyle = {
            backgroundColor: "inherit",
            padding: 0
        };

        const subHeroStyle = {
            width: "20rem",
        };

        const ourStoryStyle = {
            backgroundColor: "inherit",
            backgroundColor: "rgba(0,0,0,0.2)",
        };

        const footerStyle= {
            backgroundColor: "rgba(0,0,0,0.8)",
            color: "white",
            height: "80px",
        };

        return (
            <div>
                <div className="container-fluid p-0">
                    {/* Our Story */ }
                    < div className="jumbotron jumbotron-fluid py-5" style={ourStoryStyle} >
                        <div className="container-fluid text-center">
                            <h1 className="mb-4">Why UResearcher?</h1>
                            <div className="container">
                                <img src="static/images/UResearcher_magnifier.png" className="rounded mx-auto d-block mb-4 img-fluid" style={subHeroStyle} alt="UResearcher_LOGO" />
                            </div>
                            <div className="container">
                                <p className="">UResearcher is a search engine devoted to organizing and analyzing research articles for new insights into desired fields.  Given the current large influx of research papers, reading through all possible papers in a subject would take hours and cause frustration; furthermore, more research articles are published regularly, contributing to the already sizable workload.  UResearcher addresses these concerns by refining the search process and adding useful features, such as clustering, grant trends, keyword graphing, and phrase analysis.  With, these tools potential and seasoned researches will quickly analyze papers and discover new research potentials.</p>
                            </div>
                        </div>
                    </div >

                    {/* Function Intro */}
                    < div className="jumbotron jumbotron-fluid my-5 py-5" style={jumbotronStyle} >
                        <div className="container-fluid text-center">
                            <h1 className="mb-4">Our Functions</h1>

                            <div className="card-deck mx-5 mb-5">
                                <div className="card shadow">
                                    <div className="card-body">
                                        <i className="fas fa-search fa-3x m-3"></i>
                                        <h5 className="card-title">Search Engine</h5>
                                        <p className="card-text">The URresearcher application features a simple and intuitive search bar that allows users to efficiently conduct searches within articles found in the Department of Academic Journals (DOAJ) database.   A search finds relevant articles and post them in order from most relevant to least relevant.  In addition, the page offers links to the provided articles.</p>
                                    </div>
                                </div>
                                <div className="card shadow">
                                    <div className="card-body">
                                        <i className="fas fa-project-diagram fa-3x m-3"></i>
                                        <h5 className="card-title">Clusters</h5>
                                        <p className="card-text">The clustering feature of UResearcher gathers the article results and groups them under labels through mini batch k-means.  These clusters provide potential subtopics within the original search and provide increased outlets for exploration.  Furthermore, clicking the clusters initializes a new search into the subtopic within the original search.</p>
                                    </div>
                                </div>
                                <div className="card shadow">
                                    <div className="card-body">
                                        <i className="fas fa-money-check-alt fa-3x m-3"></i>
                                        <h5 className="card-title">Grant Trends</h5>
                                        <p className="card-text">In addition to analyzing articles, UResearcher gathers and graphs relevant grant information.  Using resources from website grants.gov, the application graphs the sum of grant rewards with respect to time.  These sums are divided into ceilings and floors such that the ceilings represent the maximum values while the floors represent the minimum values.</p>
                                    </div>
                                </div>
                                <div className="card shadow">
                                    <div className="card-body">
                                        <i className="fas fa-chart-bar fa-3x m-3"></i>
                                        <h5 className="card-title">Keyword Trends</h5>
                                        <p className="card-text">The UResearcher web application also tracks keyword trends in articles.  From the research papers in the results page, the website analyzes the frequency of words and constructs specified line graphs, and these graphs may be modified for specific keywords.</p>
                                    </div>
                                </div>
                                <div className="card shadow">
                                    <div className="card-body">
                                        <i className="fas fa-brain fa-3x m-3"></i>
                                        <h5 className="card-title">Latent Knowledge</h5>
                                        <p className="card-text">The primary feature of UResearcher, latent knowledge analysis approximates relations among words within the search space to provide tangible relations between words.  Through Word2Vec, this feature calculates the connections of words in a group sentences and reveals new insights.  In particular, the application displays 2D graphs, a ranking list, and phrase graphs for a given search.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div >


                    {/* Show Cases */}
                    <div className="jumbotron jumbotron-fluid my-5 py-5" style={ourStoryStyle} >
                        <div className="container-fluid text-center">
                            <h1 className="mb-4">Show Cases</h1>
                            <div className="d-flex justify-content-center">
                                <Carousel autoPlay infiniteLoop width="1000px">
                                    <div>
                                        <img alt="" src="static/images/Screenshot_1.png" />
                                        {/* <p className="legend">Legend 1</p> */}
                                    </div>
                                    <div>
                                        <img alt="" src="static/images/Screenshot_2.png" />
                                        {/* <p className="legend">Legend 2</p> */}
                                    </div>
                                    <div>
                                        <img alt="" src="static/images/Screenshot_3.png" />
                                        {/* <p className="legend">Legend 3</p> */}
                                    </div>
                                    <div>
                                        <img alt="" src="static/images/Screenshot_4.png" />
                                        {/* <p className="legend">Legend 4</p> */}
                                    </div>
                                    <div>
                                        <img alt="" src="static/images/Screenshot_5.png" />
                                        {/* <p className="legend">Legend 4</p> */}
                                    </div>
                                    <div>
                                        <img alt="" src="static/images/Screenshot_6.png" />
                                        {/* <p className="legend">Legend 4</p> */}
                                    </div>
                                </Carousel>
                            </div>
                        </div>
                    </div>


                    {/* Developers */ }
                    <div className="jumbotron jumbotron-fluid my-5 py-5" style={jumbotronStyle} >
                        <div className="container text-center">
                            <h1 className="mb-4">Developers</h1>
                            <div className="row justify-content-center">
                                <div className="col-5 text-left mb-4">
                                    <p><i className="fas fa-envelope mx-1"></i><span>Christopher Allan Liu:</span> <span>csadness1123 AT gmail.com</span></p>
                                    <p><i className="fas fa-envelope mx-1"></i><span>William Frank:</span> <span>willfrank98 AT gmail.com</span></p>
                                    <p><i className="fas fa-envelope mx-1"></i><span>Michael Tata:</span> <span>michaeltata.a AT gmail.com</span></p>
                                    <p><i className="fas fa-envelope mx-1"></i><span>Jack Zhao:</span> <span>u1129777 AT utah.edu</span></p>
                                    <p><i className="fas fa-envelope mx-1"></i><span>Ritesh Sharma:</span> <span>rit007esh AT gmail.com</span></p>
                                </div>
                            </div>
                        </div>
                    </div >

                    {/* Footer */ }
                    <footer className="footer" style={footerStyle}>
                        <div className="container text-center">
                            <p className="pt-3">Support us on <i class="fab fa-github mx-1"></i> <a href="https://github.com/printfer/UResearcher" target="_blank">@UResearcher</a></p>
                        </div>
                    </footer>
                </div>
            </div >

        )
    }
}
