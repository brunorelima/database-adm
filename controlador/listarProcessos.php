<?php
	require_once("ConfiguracaoApp.class.php");
	require_once(ConfiguracaoApp::PATH_INICIALIZAR);
	
	//WHERE datname = 'virtualif_testes'
	$row = Conexao::query( "
			SELECT * , to_char( (now() - query_start) , 'HH24:MI:SS') AS tempo_idle
			FROM pg_stat_activity 
			ORDER BY tempo_idle desc, client_addr, pid" );
	
	$retorno['obj'] = $row;
	$retorno['host'] = $_SERVER['HTTP_HOST'];
	
	echo json_encode($retorno);
