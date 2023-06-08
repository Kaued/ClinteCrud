<?php

  
  require_once("ClassCliente.php");

  // Inicia uma nova insta
  $clientes= new Clientes;

  if($clientes->existeCliente()){
    // Exite cliente
    echo("0");

  }else{
    //  Não existe cliente cadastado
    echo("1");
    
  }
?>