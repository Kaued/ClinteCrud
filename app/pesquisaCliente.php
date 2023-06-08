<?php

  require_once("ClassCliente.php");
  
  $data = json_decode(file_get_contents("php://input"));

  $pesquisa=$data->pesquisa;
  $checkCliente=$data->checkCliente;
  $checkEmail=$data->checkEmail;

  $clientes= new Clientes();

  if(($checkCliente || $checkEmail) && $pesquisa!= ""){

    
    $resposta=$clientes->pesquisaCliente($pesquisa, $checkCliente, $checkEmail);

    // Verfica qual foi o resultado
    if($resposta==false){

      // Não encotrou ou erro
      echo (1);
      
    }else{
 
      // Usuarios encotrados
      echo (json_encode($resposta));

    }
  }else{

    echo(1);
    
  }

  
?>