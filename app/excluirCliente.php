<?php

  require_once("ClassCliente.php");
  
  $data = json_decode(file_get_contents("php://input"));

  $idCliente=$data->id;
  

  $clientes= new Clientes();

  if($idCliente!= ""){

    $clientes->setIdCliente($idCliente);
    $resposta=$clientes->removerCliente();

    // Verfica qual foi o resultado
    if($resposta==false){

      // Não encotrou ou erro
      echo (1);
      
    }else{
 
      // Usuarios deletado
      echo (0);

    }
  }else{

    echo (1);
    
  }

  
?>
