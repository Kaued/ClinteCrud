<?php

require_once "ClassCliente.php";


  // Recebe as inforamcoes do cliente
  $data = json_decode(file_get_contents("php://input"));

  $nome=$data->nome;
  $dataNasc=$data->dataNasc;
  $cpf=$data->cpf;
  $email=$data->email;
  $cep=$data->cep;
  $rua=$data->rua;
  $bairro=$data->bairro;
  $numero=$data->numero;
  $cidade=$data->cidade;
  $estado=$data->estado;
  $complemento=$data->complemento;
  $observacao=$data->observacao;

  // Instacia um novo cliente
  $cliente= new Clientes();

  // Envia dados do novo cliente
  $cliente->setNome($nome);
  $cliente->setDataNasc($dataNasc);
  $cliente->setCpf($cpf);
  $cliente->setEmail($email);
  $cliente->setCep($cep);
  $cliente->setRua($rua);
  $cliente->setBairro($bairro);
  $cliente->setNumero($numero);
  $cliente->setCidade($cidade);
  $cliente->setEstado($estado);
  $cliente->setComplemento($complemento);
  $cliente->setObservacao($observacao);

  // Resposta
  $resultado=$cliente->adicionarCliente();

  if ($resultado){
    // Cadastrado com sucesso
    echo("0");

  }else{
    // Não foi possivel realizar o cadastro
    echo("1");

  }
?>