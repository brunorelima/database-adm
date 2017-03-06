<?php
	require_once("ConfiguracaoApp.class.php");
	require_once(ConfiguracaoApp::PATH_INICIALIZAR);

	$pid = isset($_GET["pid"]) ? $_GET["pid"] : 0;
	$host = $_SERVER['HTTP_HOST'];
	
	//Usado para fazer a validação se o processo é da pessoa que esta no sistema
	$row = Conexao::query( "SELECT pid FROM pg_stat_activity WHERE datname = 'virtualif_testes' AND client_addr = '" . $host . "' AND pid = " . $pid . " " );
		
	if (!empty($pid) && !empty($row)){
		$row = Conexao::query( "select pg_terminate_backend( " . $pid . ")" );				
	}
	else {
		$row[0]["pg_terminate_backend"] = false;
	}
	
	echo json_encode($row);
