// function do_clustering(query) {
// 	$.ajax({
// 		url: "/cluster/" + query,
// 		method: "GET",
// 	}).done(function (result) {
// 		make_clusters(result)
// 	}).fail(function (jqXHR, textStatus, errorThrown) {

// 	});
// }

// function make_clusters(data) {
// 	const Graph = ForceGraph()
// 	(document.getElementById('cluster_graph'))
// 		.graphData(data)
// 		.height(400)
// 		.centerAt([150], [0], 0)
// 		.zoom(4)
// 		.onNodeClick(node => {
// 			select_cluster(node.name)
// 		}).nodeLabel(node => {
// 			// do nothing on hover
// 		}).nodeCanvasObject((node, ctx, globalScale) => {
// 			const label = node.name;
// 			const fontSize = 12/globalScale;
// 			ctx.font = `${fontSize}px Sans-Serif`;
// 			//draw circle
// 			ctx.fillStyle = 'rgba(255, 0, 0, 1.0)';
// 			radius = node.val * 2;
// 			ctx.beginPath();
// 			ctx.arc(node.x, node.y, radius, 0, 2 * Math.PI, false);
// 			ctx.fill();
// 			//draw rectangle
// 			const textWidth = ctx.measureText(label).width;
//           	const bckgDimensions = [textWidth, fontSize].map(n => n + fontSize * 0.2); // some padding
// 			ctx.fillStyle = 'rgba(0, 255, 0, 0.8)';
//           	ctx.fillRect(node.x - bckgDimensions[0] / 2, node.y - bckgDimensions[1] / 2, ...bckgDimensions);
// 			// draw text
// 			ctx.textAlign = 'center';
// 			ctx.textBaseline = 'middle';
// 			ctx.fillStyle = 'rgba(255, 255, 255, 1.0)';
// 			ctx.fillText(label, node.x, node.y);
// 		});
// }

// function select_cluster(name) {
// 	$.ajax({
// 		url: "/cluster-select/" + name,
// 		method: "GET",
// 	}).done(function (result) {
// 		$(".main_col").hide();
// 		$("#article_col").show();
// 		$("#article_col").empty();
// 		$("#article_col").html(result);
// 	}).fail(function (jqXHR, textStatus, errorThrown) {

// 	});
// }