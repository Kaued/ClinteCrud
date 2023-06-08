<?php

// Autoload
require_once ("conexaoBd.php");

// Classe cliente
class Clientes extends ClassConexao{

  // Dados do cliente
  private $idCliente, $nome, $dataNasc, $cpf, $email, $cep, $rua, $bairro, $cidade, $estado, $complemento, $observacao, $db, $valid, $numero;
  	
  // Metodos para acesso do nome
  public function getIdCliente() { return $this->idCliente; }
  public function setIdCliente($idCliente) { $this->idCliente = $idCliente; }

  // Metodos para acesso do nome
  public function getNome() { return $this->nome; }
  public function setNome($nome) { $this->nome = $nome; }

  // Metodos para acesso da data de nascimento
  public function getDataNasc() { return $this->dataNasc; }
  public function setDataNasc($dataNasc) { $this->dataNasc = $dataNasc; }

  // Metodos para acesso do nome
  public function getCpf() { return $this->cpf; }
  public function setCpf($cpf) { $this->cpf = $cpf; }

  // Metodos para acesso do email
  public function getEmail() { return $this->email; }
  public function setEmail($email) { $this->email = $email; }

  // Metodos para acesso do cep 
  public function getCep() { return $this->cep; }
  public function setCep($cep) { $this->cep = $cep; }

  // Metodos para acesso da rua
  public function getRua() { return $this->rua; }
  public function setRua($rua) { $this->rua = $rua; }

  // Metodos para acesso do bairro
  public function getBairro() { return $this->bairro; }
  public function setBairro($bairro) { $this->bairro = $bairro; }

  // Metodos para acesso da cidade
  public function getCidade() { return $this->cidade; }
  public function setCidade($cidade) { $this->cidade = $cidade; }

  // Metodos para acesso do nome
  public function getNumero() { return $this->numero; }
  public function setNumero($numero) { $this->numero = $numero; }

  // Metodos para acesso do estado
  public function getEstado() { return $this->estado; }
  public function setEstado($estado) { $this->estado = $estado; }

  // Metodos para acesso do complemento
  public function getComplemento() { return $this->complemento; }
  public function setComplemento($complemento) { $this->complemento = $complemento; }

  // Metodos para acesso da observação
  public function getObservacao() { return $this->observacao; }
  public function setObservacao($observacao) { $this->observacao = $observacao; }

  private function consultaCep($cep){

    $url = "https://viacep.com.br/ws/{$cep}/json/";

    // Realiza a consulta na API do ViaCEP
    $curl = curl_init();
    curl_setopt($curl, CURLOPT_URL, $url);
    curl_setopt($curl, CURLOPT_RETURNTRANSFER, true);
    $response = curl_exec($curl);
    curl_close($curl);

    // Decodifica o JSON de resposta da API do ViaCEP
    $data = json_decode($response);

    // Verifica se houve um erro na consulta
    if (isset($data->erro)) {
       
       return false;
    }

    // Obtém as informações do CEP

    if(isset($data->logradouro) && $data->logradouro!=""){$this->setRua($data->logradouro);}
    if(isset($data->bairro) && $data->bairro!=""){$this->bairro;}
    if(isset($data->cidade) && $data->cidade!=""){$this->cidade;}
    if(isset($data->estado) && $data->estado!=""){$this->estado;}

    return true;

  }

  //Função para validar cpf
  public function verificarCPF($cpf){
      
    // Remove os pontos e traços do CPF
    $cpf = str_replace(array(".", "-"), "", $cpf);

    // Verifica se o CPF tem 11 dígitos
    if (strlen($cpf) != 11) {
        return false;
    }

    // Verifica se todos os dígitos são iguais
    if (preg_match("/^([0-9])\\1{10}$/", $cpf)) {
        return false;
    }

    // Calcula os dígitos verificadores
    $soma1 = 0;
    $soma2 = 0;
    for ($i = 0; $i < 9; $i++) {
        $soma1 += $cpf[$i] * (10 - $i);
        $soma2 += $cpf[$i] * (11 - $i);
    }
    $dv1 = ($soma1 % 11 < 2) ? 0 : 11 - ($soma1 % 11);
    $soma2 += $dv1 * 2;
    $dv2 = ($soma2 % 11 < 2) ? 0 : 11 - ($soma2 % 11);

    // Verifica se os dígitos verificadores são iguais aos do CPF
    if ($cpf[9] != $dv1 || $cpf[10] != $dv2) {
        return false;
    }

    // CPF válido
    return true;

  }

  public function adicionarCliente(){


    // Consulta informações do cep
  
    // Para validar o nome
    $regexNome='/^[A-Za-zÀ-ÿ]+$/';

    //Para validar a data de nascimento
    $data= new DateTime($this->dataNasc);
    $dataAtual= new DateTime();

    // Para validar cep
    $regexCep = "/^[0-9]{5}-?[0-9]{3}$/"; 

    //Valida cada inforamação do usuario nome
    if(preg_match($regexNome, $this->nome) && $this->nome!="" && strlen($this->nome)<=100 &&
      // data de nascimento
      $data < $dataAtual && ($data || $data->format("Y-m-d")===$this->dataNasc)&&
      // cpf
      $this->verificarCPF($this->cpf) &&
      // Email
      filter_var($this->email, FILTER_VALIDATE_EMAIL)&& strlen($this->email)<100 &&
      // cep
      preg_match($regexCep, $this->cep) && $this->consultaCep($this->cep) &&
      // endereco
      !empty($this->rua) && strlen($this->rua)<100 &&
      !empty($this->bairro) && strlen($this->bairro)<100 &&
      !empty($this->cidade) && strlen($this->cidade)<100 &&
      !empty($this->estado) && strlen($this->estado)<100 &&
      strlen($this->complemento)<100 &&
      // observação
      strlen($this->observacao)<100 &&
      // numero
      $this->numero>0 && $this->numero!=""
      ){

        // Tenta realizar a pesquisa para ver se já não esta cadastrado
        try{  

          // Procura por cpf iguais
          $this->valid=$this->conexaoBd()->prepare("select idCliente from clientes where cpf=:cpf");
          $this->valid->bindParam(":cpf", $this->cpf, \PDO::PARAM_STR);
          $this->valid->execute();

          // Verifica se já não existe registro
          if($this->valid->fetchColumn()<=0){
            
            // Se não existe continua a adicionar
            $addInsert="";
            $addValues="";

            // Verifica se não tem complemento
            if(!empty($this->complemento)){

              // Se tiver adiciona ao query
              $addInsert=", complemento";
              $addValues=", :complemento";

            }

            // Verifica se não tem observação
            if(!empty($this->observacao)){

              // Se ttive adiciona ao query
              $addInsert=$addInsert.", observacao";
              $addValues=$addValues.", :observacao";

            }

            // Remove os "-" e "."
            $this->cpf = str_replace(array(".", "-"), "", $this->cpf);

            // Query de insert do cliente no db
            $this->db=$this->conexaoBd()->prepare("insert into clientes(nome, dataNasc, cpf, email, cep, rua, bairro, numero, cidade, estado{$addInsert})
            values(:nome, :dataNasc, :cpf, :email, :cep, :rua, :bairro, :numero, :cidade, :estado{$addValues})");

            // Parametros do cliente
            $this->db->bindParam(":nome", $this->nome, \PDO::PARAM_STR);
            $this->db->bindParam(":dataNasc", $this->dataNasc, \PDO::PARAM_STR);
            $this->db->bindParam(":cpf", $this->cpf, \PDO::PARAM_STR);
            $this->db->bindParam(":email", $this->email, \PDO::PARAM_STR);
            $this->db->bindParam(":cep", $this->cep, \PDO::PARAM_STR);
            $this->db->bindParam(":rua", $this->rua, \PDO::PARAM_STR);
            $this->db->bindParam(":numero", $this->numero, \PDO::PARAM_STR);
            $this->db->bindParam(":bairro", $this->bairro, \PDO::PARAM_STR);
            $this->db->bindParam(":cidade", $this->cidade, \PDO::PARAM_STR);
            $this->db->bindParam(":estado", $this->estado, \PDO::PARAM_STR);

            // Caso haja complemento adiciona
            if(!empty($this->complemento)){

              $this->db->bindParam(":complemento", $this->complemento, \PDO::PARAM_STR);

            }

            // Caso haja observacao adiciona
            if(!empty($this->observacao)){

              $this->db->bindParam(":observacao", $this->observacao, \PDO::PARAM_STR);

            }
            
            // Executa
            $this->db->execute();

            return true;

          }else{
            // Caso já exista
            return false;
          }
          
          // Caso de algum erro
        }catch(\PDOException $Erro){

          return $Erro;

        }

    }else{
      // valores invalidos
      return false  ;

    }
    

  }

  // Verifica se existe alguem cliente cadastrado no db
  public function existeCliente(){

    try{
      $this->valid=$this->conexaoBd()->query("select idCliente from clientes");

      // Verifica se já não existe registro
      if($this->valid->fetchColumn()<=0){

        return false;

      }else{

        return true;

      }
    }catch(\PDOException $Erro){

      return $Erro;

    }

  }

  public function pesquisaCliente($pesquisa, $checkCliente, $checkEmail){

    try{  

      $addWhere="";

      $pesquisa='%'.$pesquisa.'%';
      // Se adicionou pesquisar nome
      if($checkCliente){

        $addWhere='nome Like :nome';

      }

      // Se adicionou pesquisar email
      if($checkEmail){
        
        // Caso queira pesquisar nome e email = pesquisa  
        if($addWhere!=""){

          $addWhere=$addWhere.' or email Like :email';
        
        }else{

          $addWhere=$addWhere.'email Like :email';

        }
        
      }
      // Requisição ao banco de dados
      $this->valid=$this->conexaoBd()->prepare("select * from clientes where {$addWhere} limit 10");

      // Se adicionou pesquisar cliente
      if($checkCliente){

        $this->valid->bindParam(":nome", $pesquisa, \PDO::PARAM_STR);

      }

      // Se adicionou pesquisar email
      if($checkEmail){

        $this->valid->bindParam(":email", $pesquisa, \PDO::PARAM_STR);
        
      }
      
      // Executa
      $this->valid->execute();

      // Pega o resultado do cliente
      $clientes=$this->valid->fetchAll(\PDO::FETCH_ASSOC);

      // Verifca se existe cliente
      if(count($clientes)<=0){

        return false;

      }else{

        return $clientes;

      }
      
    }catch(\PDOException $Erro){

      return $Erro;

    }

  }

  public function alterarCliente(){


    // Consulta informações do cep
  
    // Para validar o nome
    $regexNome='/^[A-Za-zÀ-ÿ]+$/';

    //Para validar a data de nascimento
    $data= new DateTime($this->dataNasc);
    $dataAtual= new DateTime();

    // Para validar cep
    $regexCep = "/^[0-9]{5}-?[0-9]{3}$/"; 

    //Valida cada inforamação do usuario nome
    if(preg_match($regexNome, $this->nome) && $this->nome!="" && strlen($this->nome)<=100 &&
      // data de nascimento
      $data < $dataAtual && ($data || $data->format("Y-m-d")===$this->dataNasc)&&
      // cpf
      $this->verificarCPF($this->cpf) &&
      // Email
      filter_var($this->email, FILTER_VALIDATE_EMAIL)&& strlen($this->email)<100 &&
      // cep
      preg_match($regexCep, $this->cep) && $this->consultaCep($this->cep) &&
      // endereco
      !empty($this->rua) && strlen($this->rua)<100 &&
      !empty($this->bairro) && strlen($this->bairro)<100 &&
      !empty($this->cidade) && strlen($this->cidade)<100 &&
      !empty($this->estado) && strlen($this->estado)<100 &&
      strlen($this->complemento)<100 &&
      // observação
      strlen($this->observacao)<100 &&
      // numero
      $this->numero>0 && $this->numero!="" &&
      // idCliente
      $this->idCliente!=""
      ){

        // Tenta realizar a pesquisa para ver se já não esta cadastrado
        try{  

          // Procura por cpf iguais
          $this->valid=$this->conexaoBd()->prepare("select idCliente from clientes where cpf=:cpf and idCliente <> :idCliente");
          $this->valid->bindParam(":cpf", $this->cpf, \PDO::PARAM_STR);
          $this->valid->bindParam(":idCliente", $this->idCliente, \PDO::PARAM_INT);
          $this->valid->execute();
          
          // Verifica se já não existe registro
          if($this->valid->fetchColumn()<=0){
            
            // Se não existe continua a alterar
            $addValues="";

            // Verifica se não tem complemento
            if(!empty($this->complemento)){

              // Se tiver adiciona ao query
              $addValues=", complemento =:complemento";

            }

            // Verifica se não tem observação
            if(!empty($this->observacao)){

              // Se ttive adiciona ao query
              $addValues=$addValues.", observacao=:observacao";

            }

            // Remove os "-" e "."
            $this->cpf = str_replace(array(".", "-"), "", $this->cpf);

            // Query de update do cliente no db
            $this->db=$this->conexaoBd()->prepare("update clientes set nome = :nome, dataNasc = :dataNasc, cpf = :cpf, email = :email, cep = :cep, rua = :rua, bairro = :bairro, numero = :numero, cidade = :cidade, estado = :estado{$addValues} WHERE idCliente = :idCliente;
            ");

            // Parametros do cliente
            $this->db->bindParam(":nome", $this->nome, \PDO::PARAM_STR);
            $this->db->bindParam(":dataNasc", $this->dataNasc, \PDO::PARAM_STR);
            $this->db->bindParam(":cpf", $this->cpf, \PDO::PARAM_STR);
            $this->db->bindParam(":email", $this->email, \PDO::PARAM_STR);
            $this->db->bindParam(":cep", $this->cep, \PDO::PARAM_STR);
            $this->db->bindParam(":rua", $this->rua, \PDO::PARAM_STR);
            $this->db->bindParam(":numero", $this->numero, \PDO::PARAM_INT);
            $this->db->bindParam(":bairro", $this->bairro, \PDO::PARAM_STR);
            $this->db->bindParam(":cidade", $this->cidade, \PDO::PARAM_STR);
            $this->db->bindParam(":estado", $this->estado, \PDO::PARAM_STR);
            $this->db->bindParam(":idCliente", $this->idCliente, \PDO::PARAM_INT);

            // Caso haja complemento adiciona
            if(!empty($this->complemento)){

              $this->db->bindParam(":complemento", $this->complemento, \PDO::PARAM_STR);

            }

            // Caso haja observacao adiciona
            if(!empty($this->observacao)){

              $this->db->bindParam(":observacao", $this->observacao, \PDO::PARAM_STR);

            }
            
            // Executa
            $this->db->execute();
            return true;

            

          }else{
            // Caso já exista
            return false;
          }
          
          // Caso de algum erro
        }catch(\PDOException $Erro){

          return $Erro;

        }

    }else{
      // valores invalidos
      return false  ;

    }
    

  }

  public function removerCliente(){

    try{  

      // excluir cliente
      $this->valid=$this->conexaoBd()->prepare("delete from clientes where idCliente = :idCliente");
      $this->valid->bindParam(":idCliente", $this->idCliente, \PDO::PARAM_INT);
      $this->valid->execute();
      
      return true;

    }catch(\PDOException $Erro){

      return $Erro;

    }
  }
}
?>