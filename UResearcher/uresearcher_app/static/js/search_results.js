// function switch_to_articles(query) {
// 	$(".main_col").hide();
// 	$("#article_col").show();
// 	if (!$("#article_col div.row").length)
// 		get_articles(query);
// 	// set url
// 	window.history.pushState({}, null, '/search' + location.search);
// }

// function switch_to_clustering(query) {
// 	$(".main_col").hide();
// 	$("#clustering_col").show();
// 	// checks if clustering canvas exists, otherwise do clustering
// 	if (!$("#clustering_col canvas").length)
// 		do_clustering(query);
// 	// set url
// 	window.history.pushState({}, null, '/clustering' + location.search);
// }

// function switch_to_grant() {

// }

// function switch_to_keyword() {

// }

// function switch_to_lka() {
// 	$(".main_col").hide();
// 	$("#lka_col").show();
// 	// checks if lka plotly graph exists, otherwise do clustering
// 	if (!$("#lka_col .plotly").length)
// 		do_lka_main();
// 	// set url
// 	window.history.pushState({}, null, '/lka' + location.search);
// }