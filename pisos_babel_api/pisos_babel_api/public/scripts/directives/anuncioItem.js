angular.module('pisosBabel').directive('anuncioItem', function(){
	// Runs during compile
	return {
		// name: '',
		// priority: 1,
		// terminal: true,
		scope: {
			model : '=',
			moreInfo : '&'
		}, // {} = isolate, true = child, false/undefined = no change
		// controller: function($scope, $element, $attrs, $transclude) {},
		// require: 'ngModel', // Array = multiple requires, ? = optional, ^ = check parent elements
		restrict: 'AE', // E = Element, A = Attribute, C = Class, M = Comment
		template: '<div class="row" ng-repeat="data in model track by data._id">'+
            '<div class="col-xs-12 col-sm-12 col-md-12">'+
                '<div class="thumbnail">'+
                    '<div class="row">'+
                        '<div class="caption">'+
                            '<div class="col-sm-4">'+
                               '<img ng-src="{{data.fotos[0]}}" class="img-responsive">'+
                            '</div>'+'<div class="col-sm-8"><h3 class="title">{{::data.calle}}, {{::data.codigoPostal}}, {{::data.ciudad}}</h3><span ng-if="data.compra">Precio: {{::data.precio}} euros</span><span ng-if="data.compra==false">Precio: {{::data.precio}} euros al mes</span><p>{{::data.descripcion}}</p></div><p class="text-right"><button class="btn btn-success" ng-click="moreInfo({stuff: data})">Más información</button></p></div></div></div></div></div>',
		// templateUrl: '',
		// replace: true,
		// transclude: true,
		// compile: function(tElement, tAttrs, function transclude(function(scope, cloneLinkingFn){ return function linking(scope, elm, attrs){}})),
		link: function($scope, iElm, iAttrs, controller) {
			
		}
	};
});