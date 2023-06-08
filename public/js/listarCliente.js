var clientes;
conteudo=["semClientes", "hubPesquisa", "erro", "notFundCliente", "listaClientes"];

function mostrarCliente(id){

  for(i=0; i<clientes.length; i++){

    if(clientes[i].idCliente === id){
      
      ModalAlt = new bootstrap.Modal(document.getElementById('modalexibirCliente'), {});

      ModalAlt.show();

      $('#exibirClienteNome').html(clientes[i].nome);
      $('#exibiNomeCliente').val(clientes[i].nome);
      $('#exibiDataCliente').val(clientes[i].dataNasc);
      $('#exibiCpfCliente').val(clientes[i].cpf);
      $('#exibiEmailCliente').val(clientes[i].email);
      $('#exibiCepCliente').val(clientes[i].cep);
      $('#exibiNumCliente').val(clientes[i].numero);
      $('#exibiRuaCliente').val(clientes[i].rua);
      $('#exibiBairroCliente').val(clientes[i].bairro);
      $('#exibiCidadeCliente').val(clientes[i].cidade);
      $('#exibiEstadoCliente').val(clientes[i].estado);
      $('#exibiComplementoCliente').val(clientes[i].complemento);
      $('#exibirObsCliente').val(clientes[i].observacao);
      
      
    }
  }
}
//Verifica se o cep e valido
function validaCepAlt(cep) {
  regexCep = /^[0-9]{5}-?[0-9]{3}$/;

  if(cep=="" || !regexCep.test(cep)){
    //Mostra o alert erro e alterar a cor do input
    $('#alteraCepCliente').css("border-color", "rgba(255,93,125,1)");
    mensagemErroAleterar("Cep invalido!");
    return false;

  }else{
    //Se cep valido normaliza input e esconde a alert
    $("#mensagemErroAleterar").slideUp();
    $('#alteraCepCliente').css("border-color", "#ced4da");
    $("#mensagemErroAleterar").attr("show", "False");
    return true;

  }
}


function consultaCepAlt(cep, callback){

  if(validaCepAlt(cep)){

    //Consulta cep no viacep
    urlCep = "https://viacep.com.br/ws/" + cep + "/json/";
    
    $.ajax({
      url: urlCep,
      type: "GET",
      dataType: "json",
      success: function(endereco) {
        
        if(!endereco.erro){
          
          //Retorno as informaçõe do cep
          
          callback(endereco);

        }else{
          
          //Mostra o alert erro e alterar a cor do input e apaga valor do input
          $('#alteraCepCliente').css("border-color", "rgba(255,93,125,1)");
          mensagemErroAleterar("Cep invalido !");

          $("#alteraRuaCliente").val("");
          $("#alteraBairroCliente").val("");
          $("#alteraCidadeCliente").val("");
          $("#alteraEstadoCliente").val("");
          
          callback(false);

        }
      },
      error: function() {
        
        //Mostra o alert erro e alterar a cor do input
        $('#alteraCepCliente').css("border-color", "rgba(255,93,125,1)");
        mensagemErroAleterar("Tente novamente mais tarde");

        callback(false);

      }
    });

  }else{

    //Mostra o alert erro e alterar a cor do input
    $('#alteraCepCliente').css("border-color", "rgba(255,93,125,1)");
    mensagemErroAleterar("Cep invalido!");

    callback(false);

  }
}

// Exibe o editarCliente
function editarCliente(id) {

  for(i=0; i<clientes.length; i++){

    if(clientes[i].idCliente === id){
      
      ModalAlt = new bootstrap.Modal(document.getElementById('modalAlterarCliente'), {});

      ModalAlt.show();

      $('#idClienteAlt').val(clientes[i].idCliente);
      $('#alteraNomeCliente').val(clientes[i].nome);
      $('#alteraDataNascCliente').val(clientes[i].dataNasc);
      $('#alteraCpfCliente').val(clientes[i].cpf);
      $('#alteraEmailCliente').val(clientes[i].email);
      $('#alteraCepCliente').val(clientes[i].cep);
      $('#alteraNumCliente').val(clientes[i].numero);
      $('#alteraRuaCliente').val(clientes[i].rua);
      $('#alteraBairroCliente').val(clientes[i].bairro);
      $('#alteraCidadeCliente').val(clientes[i].cidade);
      $('#alteraEstadoCliente').val(clientes[i].estado);
      $('#alteraComplementoCliente').val(clientes[i].complemento);
      $('#alteraObsCliente').val(clientes[i].observacao);

      consultaCepAlt(clientes[i].cep, function(endereco){

        
        if(endereco!=false){

          //Cep valido define valor do input e bloqueia digitar
          
          // Define rua
          if(endereco.logradouro==""){$("#alteraRuaCliente").prop("disabled", false);}else{$("#alteraRuaCliente").val(endereco.logradouro);$("#alteraRuaCliente").prop("disabled", true);}

          // Define bairro
          if(endereco.bairro==""){$("#alteraBairroCliente").prop("disabled", false);}else{$("#alteraBairroCliente").val(endereco.bairro);$("#alteraBairroCliente").prop("disabled", true);}

          // Define cidade
          if(endereco.localidade==""){$("#alteraCidadeCliente").prop("disabled", false);}else{$("#alteraCidadeCliente").val(endereco.localidade);$("#alteraCidadeCliente").prop("disabled", true);}

          // Define estado
          if(endereco.uf==""){$("#alteraEstadoCliente").prop("disabled", false);}else{$("#alteraEstadoCliente").val(endereco.uf);$("#alteraEstadoCliente").prop("disabled", true);}

        }

      });
      

    }
  }

}

// Exibe confirmação de exclusão
function excluirCliente(id) {

  for(i=0; i<clientes.length; i++){

    if(clientes[i].idCliente === id){
      
      ModalAlt = new bootstrap.Modal(document.getElementById('modalExcluirCliente'), {});

      ModalAlt.show();

      mensagemExcluir="Deseja realmente excluir o cliente "+clientes[i].nome+"?";
      
      $('#idClienteDel').val(clientes[i].idCliente);
      $('#nomeClienteDel').val(clientes[i].nome);
      $('#excluirClienteNome').html(mensagemExcluir);
      
    }
  } 
}

$(


  function () {

    // Divs utilizadas durante o sistema
    
    
    // Armazena clientes mostrado na tela
    
    // Esconde as divs desnecessarias
    function esconderDivContexto(objecao){

      for(i=0; i<conteudo.length; i++){

        if(conteudo[i]!==objecao){
          $('#'+conteudo[i]).css('display', 'none');
        } 
      }
    }
    // Função responsavel por pesquisar no banco
    function pesquisarCliente(pesquisa, checkCliente, checkEmail){

      dados={
        pesquisa: pesquisa,
        checkCliente:checkCliente,
        checkEmail:checkEmail
      };
      $.ajax({
        url: "app/pesquisaCliente.php",
        type: "POST",
        data: JSON.stringify(dados),
        contentType: "application/json",
        success: function(resposta) {
          
          // Caso não exista cliente entao retonar notFund
          if(resposta=='1'){

            conteudoInd=3;
            css="block";
          
            // Se existe exibe o pesqueisa de cliente
          }else{

            conteudoInd=4;
            css="block";
            // Armazena os clietes
            clientes=JSON.parse(resposta);

            // Limpa a tabela pesquisa
            $('#bodyPesquisar').html("");
            // Adiciona cada cliente na tabela
            for(i=0; clientes.length>i; i++){
              
              // Informações dos clientes
              nome=clientes[i].nome;
              email=clientes[i].email;
              cpf=clientes[i].cpf;
              id=clientes[i].idCliente;

              // Variavel responsavel por adicionar na tabela as informações dos clientes
              clienteInformacoes="<tr><th scope='row'>"+nome+"</th><td>"+cpf+"</td><td>"+email+"</td><td><div class='btn-group notNone' role='group' aria-label='Crud clientes'><button type='button' class='btn btn-primary' onclick='mostrarCliente("+id+")'><i class='bi bi-journal-text'></i></i></button><button type='button' class='btn btn-warning' onclick='editarCliente("+id+")'><i class='bi bi-pencil' aria-hidden='true'></i></button><button type='button' class='btn btn-danger' onclick='excluirCliente("+id+")'><i class='bi bi-trash' aria-hidden='true'></i></button></div></td></tr>";
              $('#bodyPesquisar').append(clienteInformacoes);
            }
            
          }
          esconderDivContexto(conteudo[1]);
          $('#'+conteudo[conteudoInd]).css("display", css);

        },
        error: function() {
          // Caso ocorra um erro
          conteudoInd=2;
          css="block";
          

          esconderDivContexto();
          $('#'+conteudo[conteudoInd]).css("display", css);
        }
    });

    }

    // Se a janela mudar de tamanho altera as div
    $(window).resize(function () { 
      
      if ($(window).width() < 600) {
        
        
        $('#cabecalhoLista').css("display", "block");
        
        if($('#hubPesquisa').css('display')!== "none"){

          $('#hubPesquisa').css("display", "block");

        }
      }else {
        $('#cabecalhoLista').css("display", "flex");
        
        if($('#hubPesquisa').css('display')!== "none"){

          $('#hubPesquisa').css("display", "flex");

        }
      }

      
    });
    // Quando o usuario entra na pagina realiza a consulta, para ver se já existem clientes
    $(document).ready(function() {

      // Caso a tela seja muito pequena
      if ($(window).width() < 600) {
        $('#cabecalhoLista').css("display", "block");
      } else {
        $('#cabecalhoLista').css("display", "flex");
      }

      $.ajax({
        url: "app/existeCliente.php",
        type: "GET",
        contentType: "application/json",
        success: function(resposta) {
          
          
          // Caso não exista cliente já cadastrado mostra erro para cadasrto
          if(resposta=='1'){

            conteudoInd=0;
            css="block";
          
            // Se existe exibe o pesqueisa de cliente
          }else if(resposta=='0'){

            conteudoInd=1;

            if ($(window).width() < 600) {
              css="block";
            } else {
              css="flex";
            }
            
            // Caso  algum erro
          }else{

            conteudoInd=2;
            css="block";
          }
        
          esconderDivContexto();
          $('#'+conteudo[conteudoInd]).css("display", css);

        },
        error: function() {
          // Caso ocorra um erro
          conteudoInd=2;
          css="block";
          

          esconderDivContexto();
          $('#'+conteudo[conteudoInd]).css("display", css);
        }
    });

    });
    
    // Pesquisa a informação digitada
    $('#botaoPesquisar').click(function(){

      // Resgata o termo pesquisado
      pesquisa=$("#pesquisarCliente").val();
      checkEmail=$("#checkEmailCliente").is(':checked');
      checkCliente=$("#checkClienteNome").is(':checked');
  
      pesquisarCliente(pesquisa, checkCliente, checkEmail);

    });
    
    
    //Mostra o alert erro
    function mensagemErroAleterar(mensagem) {

      $('#mensagemErroAleterar').html(mensagem);

      
      if($('#mensagemErroAleterar').attr("show")!="True"){
        $("#mensagemErroAleterar").attr("show", "True");
        $('#mensagemErroAleterar').slideDown('fast');
      }
    
    }

    function limparCampos() {

      // Limpa os campos
      $('#alteraNomeCliente').val("");
      $('#alteraDataNascCliente').val("");
      $('#alteraCpfCliente').val("");
      $('#alteraEmailCliente').val("");
      $('#alteraCepCliente').val("");
      $('#alteraNumCliente').val("");
      $('#alteraRuaCliente').val("");
      $('#alteraBairroCliente').val("");
      $('#alteraCidadeCliente').val("");
      $('#alteraEstadoCliente').val("");
      $('#alteraComplementoCliente').val("");
      $('#alteraObsCliente').val("");

    }


    //Valida o nome
    function validaNomeAlt(nome){
  
      var regexNome = /^[a-zA-ZÀ-ú\s]+$/;
      
      if(nome.length>=100 || !regexNome.test(nome) || nome==""){
        //Mostra o alert erro e alterar a cor do input
        $('#alteraNomeCliente').css("border-color", "rgba(255,93,125,1)");
        mensagemErroAleterar("Nome invalido!");
        return false;
  
      }else{
        //Esconde o alert erro e normaliza o input nome
        $("#mensagemErroAleterar").slideUp();
        $('#alteraNomeCliente').css("border-color", "#ced4da");
        $("#mensagemErroAleterar").attr("show", "False");

        return true;
  
      }
    }
    
    //Verifica se a data de nascimento e valida
    function validaDataAlt(data) {
      
      dataInformada= new Date(data);
      partesData = data.split("-");
    	dataInformada = new Date(partesData[0], partesData[1] - 1, partesData[2]); 
      dataAtual= new Date();
      dataInformada.setHours(0, 0, 0, 0);
      dataAtual.setHours(0, 0, 0, 0);
      
      if(dataInformada>=dataAtual || data==""){
        //Mostra o alert erro e alterar a cor do input
        $('#alteraDataNascCliente').css("border-color", "rgba(255,93,125,1)");
        mensagemErroAleterar("Data invalido!");
        return false;

      }else{
        //Esconde o alert erro e normaliza o input nome
        $("#mensagemErroAleterar").slideUp();
        $('#alteraDataNascCliente').css("border-color", "#ced4da");
        $("#mensagemErroAleterar").attr("show", "False");
        return true;

      }
    }

    //Verifica se o cpf e valido
    function validaCPFAlt(cpf) {

      function cpfInvalido(){

        //Mostra o alert erro e alterar a cor do input
        $('#alteraCpfCliente').css("border-color", "rgba(255,93,125,1)");
        mensagemErroAleterar("CPF invalido!");

      }

      //Remove caracteres especiais
      cpf = cpf.replace(/[^\d]+/g,''); 
      
      // Verifica se tem 11 digitos e não são repetidos
      if (cpf.length !== 11 || /^(\d)\1{10}$/.test(cpf)){ 
        
        cpfInvalido();
        return false;

      }else{

        soma = 0;
        for (i = 0; i < 9; i++) {
          soma += parseInt(cpf.charAt(i)) * (10 - i);
        }

        resto = soma % 11;

        if(resto < 2){

          digito1 = 0;

        }else{

          digito1 = 11 - resto;

        }
        soma = 0;
        for (var i = 0; i < 10; i++) {
          soma += parseInt(cpf.charAt(i)) * (11 - i);
        }
        resto = soma % 11;
        if(resto < 2){

          digito2 = 0;

        }else{

          digito2 = 11 - resto;

        }

        if(cpf.charAt(9) == digito1 && cpf.charAt(10) == digito2){

          //Se cpf valido normaliza input e esconde a alert
          $("#mensagemErroAleterar").slideUp();
          $('#alteraCpfCliente').css("border-color", "#ced4da");
          $("#mensagemErroAleterar").attr("show", "False");

          return true;

        }else{

          cpfInvalido();
          return false;

        }

      }
    }

    //Verifica se o email e valido
    function validaEmailAlt(email) {

      regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if(email=="" || !regexEmail.test(email) || email.length>100){
        //Mostra o alert erro e alterar a cor do input
        $('#alteraEmailCliente').css("border-color", "rgba(255,93,125,1)");
        mensagemErroAleterar("Email invalido!");
        return false;

      }else{
        //Se email valido normaliza input e esconde a alert
        $("#mensagemErroAleterar").slideUp();
        $('#alteraEmailCliente').css("border-color", "#ced4da");
        $("#mensagemErroAleterar").attr("show", "False");
        return true;

      }

    }
    
    // Verifica se endereço não e vazio
    function verfiicaVazioEndereco(idEndereco){

      valor=$("#"+idEndereco).val();

      if(valor=="" || valor.length>100){
        //Mostra o alert erro e alterar a cor do input
        $("#"+idEndereco).css("border-color", "rgba(255,93,125,1)");
        mensagemErroAleterar("Endereço vazio!");
        return false;

      }else{

        //Se idEnderco valido normaliza input e esconde a alert
        $("#mensagemErroAleterar").slideUp();
        $("#"+idEndereco).css("border-color", "#ced4da");
        $("#mensagemErroAleterar").attr("show", "False");
        return true;
        
      }
    }
    

    //Verfica se observacao e valida
    function verificaObsAlt(observacao) {
      
      if(observacao.length>300){

        //Mostra o alert erro e alterar a cor do input
        $('#alteraObsCliente').css("border-color", "rgba(255,93,125,1)");
        mensagemErroAleterar("Observação tem que ser menor de 300 caracteres!");
        return false;

      }else{

        //Se observacao valido normaliza input e esconde a alert
        $("#mensagemErroAleterar").slideUp();
        $('#alteraObsCliente').css("border-color", "#ced4da");
        $("#mensagemErroAleterar").attr("show", "False");
        return true;

      }
    }

    //Verfica se observacao e valida
    function verificaComplementoAlt(complemento) {
      
      if(complemento.length>300){

        //Mostra o alert erro e alterar a cor do input
        $('#mensagemErroAleterar').css("border-color", "rgba(255,93,125,1)");
        mensagemErroAleterar("Complemento tem que ser menor de 100 caracteres!");
        return false;

      }else{

        //Se complemento valido normaliza input e esconde a alert
        $("#mensagemErroAleterar").slideUp();
        $('#alteraComplementoCliente').css("border-color", "#ced4da");
        $("#mensagemErroAleterar").attr("show", "False");
        return true;

      }
    }

    // Função responsavel por cadastar o cliente de maneira correta
    $("#altearaCliente").click(function (){

      // Informações do cliente
      nome=$("#alteraNomeCliente").val();
      dataNasc=$("#alteraDataNascCliente").val();
      cpf=$("#alteraCpfCliente").val();
      email=$("#alteraEmailCliente").val();
      cep=$("#alteraCepCliente").val();
      numero=$("#alteraNumCliente").val();
      complemento=$("#alteraComplementoCliente").val();
      observacao=$("#alteraObsCliente").val();
      idCliente=$('#idClienteAlt').val();

      regexNumero=/^[0-9]+$/;
      
      // Validando se as informações são verdadeiras
      if(validaNomeAlt(nome) &&
        validaDataAlt(dataNasc) &&
        validaCPFAlt(cpf) &&
        validaEmailAlt(email) &&
        verificaObsAlt(observacao) &&
        verificaComplementoAlt(complemento)&&
        idCliente!=""){

          // Validando numero
          if(numero=="" || numero<=0 || !regexNumero.test(numero)){

            //Mostra o alert erro e alterar a cor do input
            $(this).css("border-color", "rgba(255,93,125,1)");
            mensagemErroAleterar("Cep invalido !");
            return false
  
          }else{
            
            // Validando o cep e armazenado o endereco
            consultaCepAlt(cep, function(endereco){ 
              
              if(endereco!=false){

                // Coletando rua
                if(endereco.logradouro==""){rua=$("#alteraRuaCliente").val();}else{rua=endereco.logradouro;}
                
                // Coletando bairro
                if(endereco.bairro==""){bairro=$("#alteraBairroCliente").val();}else{bairro=endereco.bairro;}
                
                // Coletando cidade
                if(endereco.localidade==""){cidade=$("#alteraCidadeCliente").val();}else{cidade=endereco.localidade;}
    
                // Coletando estado
                if(endereco.uf==""){estado=$("#alteraEstadoCliente").val();}else{estado=endereco.uf;}
                

                // Verificando se o endereco rua, bairro, cidade e estado
                if(verfiicaVazioEndereco("alteraRuaCliente") || 
                  verfiicaVazioEndereco("alteraBairroCliente") || 
                  verfiicaVazioEndereco("alteraCidadeCliente") ||
                  verfiicaVazioEndereco("alteraEstadoCliente")){
                    
                    // Define os dados que serão enviados na requisição
                    dados = {
                      nome: nome,
                      dataNasc: dataNasc,
                      cpf: cpf,
                      email: email,
                      cep: cep,
                      rua: rua,
                      bairro: bairro,
                      numero: numero,
                      cidade: cidade,
                      estado: estado,
                      complemento: complemento,
                      observacao: observacao,
                      idCliente:idCliente

                    };

                    // Faz a chamada Ajax utilizando o método $.ajax do jQuery
                    $.ajax({
                      url: "app/alterarCliente.php",
                      type: "POST",
                      data: JSON.stringify(dados),
                      contentType: "application/json",
                      success: function(resposta) {
                       
                        // Caso ocorra um erro
                        if(resposta==="1"){

                          // Valida cada um dos campos buscando erro
                          if(validaNomeAlt(nome) &&
                          validaDataAlt(dataNasc) &&
                          validaCPFAlt(cpf) &&
                          validaEmailAlt(email) &&
                          verificaObsAlt(observacao) &&
                          verificaComplementoAlt(complemento)){

                            if(numero=="" || numero<=0 || !regexNumero.test(numero)){

                              //Mostra o alert erro e alterar a cor do input
                              $(this).css("border-color", "rgba(255,93,125,1)");
                              mensagemErroAleterar("Cep invalido !");
                              return false


                              // Verifica o enderecos
                            }else if(verfiicaVazioEndereco('alteraRuaCliente') &&
                                    verfiicaVazioEndereco('alteraBairroCliente') &&
                                    verfiicaVazioEndereco('alteraCidadeCliente') &&
                                    verfiicaVazioEndereco('alteraEstadoCliente')){


                                      mensagemErroAleterar("Erro inesperado, tente mais tarde");
                                    }
                          // Realizada com sucesso
                          }
                        }else if(resposta==="0"){
                          
                          pesquisarCliente(email, false, true);
                          ModalAlt = new bootstrap.Modal(document.getElementById('modalAlterarCliente'), {});

                          ModalAlt.hide();
                          $('#pesquisarCliente').val(email);
                          

                        }else{

                          mensagemErroAleterar("Tente novamente mais tarde.");
                        }

                      },
                      error: function() {
                        
                      }
                  });

                }

              }

            });
            
          }
       
      }
      
    });

    // 

    // Validando nome digitado
    $("#alteraNomeCliente").keyup(function (){ 
      
      nome=$(this).val();
      validaNomeAlt(nome);
       
    });

    //Validando data de nascimento digitado
    $("#alteraDataNascCliente").change(function(){

      data=$(this).val();
      validaDataAlt(data);

    });

    //Validando cpf digitado
    $("#alteraCpfCliente").keyup(function(){ 
      
      cpf=$(this).val();
      validaCPFAlt(cpf);
      
    });


    //Validando email digitado
    $("#alteraEmailCliente").keyup(function(){ 
      
      email=$(this).val();
      validaEmailAlt(email);
      
    });

    //Validando cep digitado
    $("#alteraCepCliente").keyup(function(){ 
      
      cep=$(this).val();
      validaCepAlt(cep);
      
    });

    //Se o cep for valido preenche os campos de rua, bairro, cidade e estado
    $("#alteraCepCliente").focusout(function(){ 
      
      cep=$(this).val();

      consultaCepAlt(cep, function(endereco){

        
        if(endereco!=false){

          //Cep valido define valor do input e bloqueia digitar
          
          // Define rua
          if(endereco.logradouro==""){$("#alteraRuaCliente").prop("disabled", false);}else{$("#alteraRuaCliente").val(endereco.logradouro);$("#alteraRuaCliente").prop("disabled", true);}

          // Define bairro
          if(endereco.bairro==""){$("#alteraBairroCliente").prop("disabled", false);}else{$("#alteraBairroCliente").val(endereco.bairro);$("#alteraBairroCliente").prop("disabled", true);}

          // Define cidade
          if(endereco.localidade==""){$("#alteraCidadeCliente").prop("disabled", false);}else{$("#alteraCidadeCliente").val(endereco.localidade);$("#alteraCidadeCliente").prop("disabled", true);}

          // Define estado
          if(endereco.uf==""){$("#alteraEstadoCliente").prop("disabled", false);}else{$("#alteraEstadoCliente").val(endereco.uf);$("#alteraEstadoCliente").prop("disabled", true);}

        }

      });
    });


    // Verifica o numero digitado
    $('#alteraNumCliente').keyup(function(){

        numero=$(this).val();

        regexNumero= /^[0-9]+$/ ;

        if(numero=="" || numero<=0 || !regexNumero.test(numero)){

          //Mostra o alert erro e alterar a cor do input
          $(this).css("border-color", "rgba(255,93,125,1)");
          mensagemErroAleterar("Cep invalido !");

        }else{

          //Se numero valido normaliza input e esconde a alert
          $("#mensagemErroAleterar").slideUp();
          $(this).css("border-color", "#ced4da");
          $("#mensagemErroAleterar").attr("show", "False");
        }
    });

    //Validando rua digitada
    $("#alteraRuaCliente").keyup(function(){ 
      
      idEndereco="alteraRuaCliente";
      verfiicaVazioEndereco(idEndereco);
      
    });

    //Validando bairro digitado
    $("#alteraBairroCliente").keyup(function(){ 
      
      idEndereco="alteraBairroCliente";
      verfiicaVazioEndereco(idEndereco);
      
    });

    //Validando cidade digitado
    $("#alteraCidadeCliente").keyup(function(){ 
      
      idEndereco="alteraCidadeCliente";
      verfiicaVazioEndereco(idEndereco);
      
    });

    //Validando estado digitado
    $("#alteraEstadoCliente").keyup(function(){ 
      
      idEndereco="alteraEstadoCliente";
      verfiicaVazioEndereco(idEndereco);
      
    });


    //Validando observacao digitada
    $("#alteraComplementoCliente").keyup(function(){ 
      
      complemento=$(this).val();

      verificaComplementoAlt(complemento);
      
    });

    //Validando observacao digitada
    $("#alteraObsCliente").keyup(function(){ 
      
      observacao=$(this).val();

      verificaObsAlt(observacao);
      
    });

    $('#delCliente').click(function(){ 
      
      idCliente=$("#idClienteDel").val();
      nome=$("#nomeClienteDel").val();
      
      if(idCliente!=""){
        
        $.ajax({
          url: 'app/excluirCliente.php', 
          method: 'POST',
          data: JSON.stringify({id: idCliente}),
          contentType: "application/json",
          success: function(resposta) {
            pesquisarCliente(nome, true, false);
            ModalAlt = new bootstrap.Modal(document.getElementById('modalExcluirCliente'), {});

            ModalAlt.hide();
            $('#pesquisarCliente').val(email);
            
          },
          error: function() {
            pesquisarCliente(nome, true, false);
            
            
            $('#pesquisarCliente').val(email);

          }
      });
      }
    });

    $("#cancelarAlterarCliente").click(function(){limparCampos();});
    // Normaliza o input nome
    $('#alteraNomeCliente').click(function () {$(this).css("border-color", "#ced4da");});

    // Normaliza o input data
    $('#alteraDataNascCliente').click(function () {$(this).css("border-color", "#ced4da");});

    // Normaliza o input data
    $('#alteraDataNascCliente').click(function () {$(this).css("border-color", "#ced4da");});

    // Normaliza o input cpf
    $('#alteraCpfCliente').click(function () {$(this).css("border-color", "#ced4da");});

    // Normaliza o input email
    $('#alteraEmailCliente').click(function () {$(this).css("border-color", "#ced4da");});

    // Normaliza o input cep
    $('#alteraCepCliente').click(function () {$(this).css("border-color", "#ced4da");});
      
    // Normaliza o input numero
    $('#alteraNumCliente').click(function () {$(this).css("border-color", "#ced4da");});

    // Normaliza o input rua
    $('#alteraRuaCliente').click(function () {$(this).css("border-color", "#ced4da");});

    // Normaliza o input bairro
    $('#alteraBairroCliente').click(function () {$(this).css("border-color", "#ced4da");});

    // Normaliza o input cidade
    $('#alteraCidadeCliente').click(function () {$(this).css("border-color", "#ced4da");});

    // Normaliza o input bairro
    $('#alteraEstadoCliente').click(function () {$(this).css("border-color", "#ced4da");});

    // Normaliza o input Complemento
    $('#alteraComplementoCliente').click(function () {$(this).css("border-color", "#ced4da");});

    //Esconde o alert erro
    $('#mensagemErroAleterar').click(function(){$(this).slideUp();$("#mensagemErroAleterar").attr("show", "False");});

    
  }
)