module.exports = function(application) {
	application.get("/dashboard", function(req, res) {
		res.render('pages/dashboard');
	});
}