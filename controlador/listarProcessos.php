<?php
	require_once("ConfiguracaoApp.class.php");
	require_once(ConfiguracaoApp::PATH_INICIALIZAR);
	
	$row = OutletExtension::execSql( "SELECT * FROM pg_stat_activity WHERE datname = 'virtualif_testes' ORDER BY client_addr, pid" );
	
	$retorno['obj'] = $row;
	$retorno['host'] = $_SERVER['HTTP_HOST'];
	
	echo json_encode($retorno);
