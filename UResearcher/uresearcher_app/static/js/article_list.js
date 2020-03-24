function get_articles(query) {
	$.ajax({
		url: "/search/" + query,
		method: "GET",
	}).done(function (result) {
		$("#article_col").empty()
		$("#article_col").html(result)
	}).fail(function (jqXHR, textStatus, errorThrown) {

	});
}