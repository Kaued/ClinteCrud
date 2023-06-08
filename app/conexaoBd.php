<?php

// Definindo propriedades do banco de dados
require_once("../config/config.php");


// Classe de conxeção com o db
class ClassConexao{

  // Realiza a conexão com o banco de dados
  public function conexaoBd(){

    try{
      // Conxeção com banco de dados
      $con= new \PDO("mysql:host=".HOST.";dbname=".DB."","".USER."","".PASS."");

      return $con;

    }catch(\PDOException $Erro){  

      // Caso não funciona retorna erro
      return $Erro->getMessage();

    }

  }
}
?>