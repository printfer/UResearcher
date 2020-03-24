// var words = [];

// // Phrase Projection
// function do_lka_main() {
// 	$.ajax({
// 		url: "/lka-main",
// 		method: "GET",
// 	}).done(function (result) {
// 		var data = {
// 			x: result["xs"],
// 			y: result["ys"],
// 			text: result["words"],
// 			mode: 'markers'
// 		};
// 		make_tsne(data);
// 		words = result["words"];
// 		make_autocomplete();
// 	}).fail(function (jqXHR, textStatus, errorThrown) {

// 	});
// }

// function make_tsne(data) {
// 	$("#lka_spinner").empty();
// 	Plotly.newPlot('tsne-div', [data], {}, {showSendToCloud: true, responsive: true});
// }

// // Cosine Similarity
// function get_cosine(word) {
// 	if (word == "") {
// 		return;
// 	}
	
//     $.ajax({
// 		url: "/lka-cosine/" + word,
// 		method: "GET",
// 	}).done(function (result) {
// 		$("#cosineSimilarityList").empty();
// 		$("#cosineSimilarityList").html(result);
// 	}).fail(function (jqXHR, textStatus, errorThrown) {

// 	});
// }

// $(document).ready(function () {
//     $("#vocabWord").on('keyup', function (e) {
//         if (e.keyCode === 13) {
//             get_cosine($('#vocabWord').val());
//         }
//     });
// });

// // Phrase Connections
// function add_tertiary_phrase() {
// 	$("#tertiary-col").append("<div class=\"tertiary-row\">\r\n	<div class=\"row mb-1\">\r\n		<div class=\"col\">\r\n			<input type=\"text\" class=\"form-control vocab_autocomplete tertiery-phrase\"  placeholder=\"Enter a phrase...\">\r\n		</div>\r\n	</div>\r\n	<div class=\"row mb-3\">\r\n		<div class=\"col\">\r\n			<label>Connections: </label>\r\n		</div>\r\n		<div class=\"col\">\r\n			<input type=\"number\" min=\"1\" class=\"form-control connections\">\r\n		</div>\r\n	</div>\r\n</div>");
// 	make_autocomplete();
// }

// function del_tertiary_phrase() {
// 	$("#tertiary-col").children().last().remove();
// }

// function get_phrase_connections() {
// 	var main_phrase = $("#primary-phrase").val();
// 	var tert_phrases = $("#tertiary-col div.row.mb-1 input").map((idx, elem) => {return $(elem).val()}).get();
// 	var connections = $(".connections").map((idx, elem) => {return $(elem).val()}).get();

// 	if (main_phrase == "" || tert_phrases.includes("") || connections.includes("")){
// 		return;
// 	}
	
// 	var data = JSON.stringify({
// 		main_phrase: main_phrase,
// 		tert_phrases: tert_phrases,
// 		connections: connections
// 	});

// 	$.ajax({
// 		url: "/lka-connections",
// 		method: "POST",
// 		contentType: "application/json",
// 		dataType: "json",
// 		data: data
// 	}).done(function (result) {
// 		make_phrase_connections(result);
// 	}).fail(function (jqXHR, textStatus, errorThrown) {

// 	});
// }

// function make_phrase_connections(data) {
// 	const Graph = ForceGraph()
// 	(document.getElementById('phrase-connections-graph'))
// 		.graphData(data)
// 		.height(500)
// 		.width($("#graph-col").width())
// 		.nodeCanvasObject((node, ctx, globalScale) => {
// 			const label = node.id;
// 			const fontSize = 12/globalScale;
// 			ctx.font = `${fontSize}px Sans-Serif`;
// 			const textWidth = ctx.measureText(label).width;
// 			const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding
// 			ctx.fillStyle = 'rgba(0, 0, 0, 1.0)';
// 			ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
// 			ctx.textAlign = 'center';
// 			ctx.textBaseline = 'middle';
// 			ctx.fillStyle = 'rgba(255, 255, 255, 1.0)';
// 			ctx.fillText(label, node.x, node.y);
// 		  });
// }

// // Analogies
// function get_analogy(event, word1, word2, word3) {
// 	event.preventDefault();
// 	if (word1 == "" || word2 == "" || word3 == "") {
// 		return;
// 	}
	
//     $.ajax({
// 		url: "/lka-analogy/" + word1 + "/" + word2 + "/" + word3,
// 		method: "GET",
// 	}).done(function (result) {
// 		$("#analogyList").empty()
// 		$("#analogyList").html(result)
// 		$('#analogy_four').attr('placeholder', $('#analogyList tr:nth-child(1) > td:nth-child(2)').text())
// 	}).fail(function (jqXHR, textStatus, errorThrown) {

// 	});
// }

// // General
// function make_autocomplete() {
// 	$("input.vocab_autocomplete").autocomplete({
// 		source: words
// 	});
// }