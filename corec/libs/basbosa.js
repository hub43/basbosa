if (typeof define !== 'function') { var define = require('amdefine')(module); }
define([], function() {
	var Basbosa = function Basbosa(className) {
		if (!className) return Basbosa;
		if (Basbosa.classes[className]) {
			return Basbosa.classes[className];
		} else {
			new Error('Class ' + className + ' not defined or loaded yet');
		}
	};

	Basbosa.add = function(className, instance) {
		Basbosa.classes = Basbosa.classes || [];
		Basbosa.classes[className] = instance;
	};
	if (typeof window !== 'undefined') window.Basbosa = Basbosa;
	return Basbosa;
	
});