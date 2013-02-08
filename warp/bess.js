/**
* Bess Compiler
**/
exports.compile = function(tools, rule) {
	var Manifest = tools.Manifest;

	var css = new Manifest();
	var js = new Manifest();

	css.merge();
	
	js.merge();
	js.pre('<script type="text/javascript">');
	js.post('</script>')

	return {
		bess: '<style>*bess</style>'+css.out(),
		js: js.out(),
	};
};