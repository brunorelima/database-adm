/**
 * Criado por Bruno Lima
 * 
 */

var app = angular.module('myAppBr', []);
app.controller('FormController', function($scope, $http) {
	$scope.clkBtnPesquisar = function(){					
		$http.get("./controlador/listarProcessos.php")
		.then(function(response) {	
			$scope.processosVetor = response.data.obj;
			$scope.host = response.data.host;
			
			if ($scope.filtro == null && $scope.host.toString().indexOf("192.168.1.") >= 0 ) {
				$scope.filtro = $scope.host;			
			}
		});
	};
	
	$scope.clkBtnPesquisar();
	
	$scope.podeExibirBotaoKill = function(item){
		return (item != null && item.state != "active" && item.client_addr == $scope.host); 
	}
	
	$scope.podeExibirDestaqueIP = function(item){
		return (item != null && item.client_addr == $scope.host); 
	}
	
	$scope.clkOpcaoKill = function(item){
		var params =  "pid=" + item.pid ;
		$http.get("./controlador/matarProcesso.php?" + params)
		.then(function(response) {
			if (response.data[0].pg_terminate_backend == false){
				alert("Não foi possível matar este processo! \nVerifique se o processo está ativo e se ele é seu.");
			}
			else {
				$scope.clkBtnPesquisar();
				$scope.clkOpcaoInfoClose();
				$scope.ultimoProcessoFechado = item.pid;
			}
		});
	}
	
	$scope.clkOpcaoInfo = function(item){
		$scope.processo = angular.copy(item);
	}
	
	$scope.clkOpcaoInfoClose = function(){
		$scope.processo = null;
	}
	
});

//Criando um filtro para formatar a data do banco
app.filter('dateToISO', function() {
	  return function(input) {
//		  return (input != null) ? new Date(input).toISOString() : "-";  // Não está funcionando no Firefox
		  
		  if (input == null){
			return "-";
		  }		  
		  var p = input.split(/[- :]/);
  	      return new Date(p[0], p[1]-1, p[2], p[3], p[4], p[5]).getTime();  /* new Date(year, month [, day, hour, minute, second, millisecond]);  Banco: 2015-12-11 15:00:00*/
	  };
});
