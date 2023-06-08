$(

  function () { 

    //Mostra o alert erro
    function mensagemErroAdd(mensagem) {

      $('#mensagemErroAdd').html(mensagem);

      if($('#mensagemSucessoAdd').attr("show")!="False"){

        $("#mensagemSucessoAdd").slideUp();
        $("#mensagemSucessoAdd").attr("show", "False");

      }
      if($('#mensagemErroAdd').attr("show")!="True"){
        $("#mensagemErroAdd").attr("show", "True");
        $('#mensagemErroAdd').slideDown('fast');
      }
    
    }

    function limparCampos() {

      // Limpa os campos
      $('#addNomeCliente').val("");
      $('#addNascCliente').val("");
      $('#addCpfCliente').val("");
      $('#addEmailCliente').val("");
      $('#addCepCliente').val("");
      $('#addNumCliente').val("");
      $('#addRuaCliente').val("");
      $('#addBairroCliente').val("");
      $('#addCidadeCliente').val("");
      $('#addEstadoCliente').val("");
      $('#addComplementoCliente').val("");
      $('#addObsCliente').val("");

    }

    //Mostra o alert sucesso
    function mensagemSucessoAdd(mensagem) {

      $('#mensagemSucessoAdd').html(mensagem);

      if($('#mensagemErroAdd').attr("show")!="False"){

        $("#mensagemErroAdd").slideUp();
        $("#mensagemErroAdd").attr("show", "False");

      }
      if($('#mensagemSucessoAdd').attr("show")!="True"){
        $("#mensagemSucessoAdd").attr("show", "True");
        $('#mensagemSucessoAdd').slideDown('fast');
      }
    
    }

    //Valida o nome
    function validaNomeAdd(nome){
  
      var regexNome = /^[a-zA-ZÀ-ú\s]+$/;
      
      if(nome.length>=100 || !regexNome.test(nome) || nome==""){
        //Mostra o alert erro e alterar a cor do input
        $('#addNomeCliente').css("border-color", "rgba(255,93,125,1)");
        mensagemErroAdd("Nome invalido!");
        return false;
  
      }else{
        //Esconde o alert erro e normaliza o input nome
        $("#mensagemErroAdd").slideUp();
        $('#addNomeCliente').css("border-color", "#ced4da");
        $("#mensagemErroAdd").attr("show", "False");

        return true;
  
      }
    }
    
    //Verifica se a data de nascimento e valida
    function validaDataAdd(data) {
      
      dataInformada= new Date(data);
      partesData = data.split("-");
    	dataInformada = new Date(partesData[0], partesData[1] - 1, partesData[2]); 
      dataAtual= new Date();
      dataInformada.setHours(0, 0, 0, 0);
      dataAtual.setHours(0, 0, 0, 0);
      
      if(dataInformada>=dataAtual || data==""){
        //Mostra o alert erro e alterar a cor do input
        $('#addNascCliente').css("border-color", "rgba(255,93,125,1)");
        mensagemErroAdd("Data invalido!");
        return false;

      }else{
        //Esconde o alert erro e normaliza o input nome
        $("#mensagemErroAdd").slideUp();
        $('#addNascCliente').css("border-color", "#ced4da");
        $("#mensagemErroAdd").attr("show", "False");
        return true;

      }
    }

    //Verifica se o cpf e valido
    function validaCPFAdd(cpf) {

      function cpfInvalido(){

        //Mostra o alert erro e alterar a cor do input
        $('#addCpfCliente').css("border-color", "rgba(255,93,125,1)");
        mensagemErroAdd("CPF invalido!");

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
          $("#mensagemErroAdd").slideUp();
          $('#addCpfCliente').css("border-color", "#ced4da");
          $("#mensagemErroAdd").attr("show", "False");

          return true;

        }else{

          cpfInvalido();
          return false;

        }

      }
    }

    //Verifica se o email e valido
    function validaEmailAdd(email) {

      regexEmail = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

      if(email=="" || !regexEmail.test(email) || email.length>100){
        //Mostra o alert erro e alterar a cor do input
        $('#addEmailCliente').css("border-color", "rgba(255,93,125,1)");
        mensagemErroAdd("Email invalido!");
        return false;

      }else{
        //Se email valido normaliza input e esconde a alert
        $("#mensagemErroAdd").slideUp();
        $('#addEmailCliente').css("border-color", "#ced4da");
        $("#mensagemErroAdd").attr("show", "False");
        return true;

      }

    }

    //Verifica se o cep e valido
    function validaCepAdd(cep) {
      regexCep = /^[0-9]{5}-?[0-9]{3}$/;

      if(cep=="" || !regexCep.test(cep)){
        //Mostra o alert erro e alterar a cor do input
        $('#addCepCliente').css("border-color", "rgba(255,93,125,1)");
        mensagemErroAdd("Cep invalido!");
        return false;

      }else{
        //Se cep valido normaliza input e esconde a alert
        $("#mensagemErroAdd").slideUp();
        $('#addCepCliente').css("border-color", "#ced4da");
        $("#mensagemErroAdd").attr("show", "False");
        return true;

      }
    }

    function consultaCepAdd(cep, callback){

      if(validaCepAdd(cep)){

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
              $('#addCepCliente').css("border-color", "rgba(255,93,125,1)");
              mensagemErroAdd("Cep invalido !");

              $("#addRuaCliente").val("");
              $("#addBairroCliente").val("");
              $("#addCidadeCliente").val("");
              $("#addEstadoCliente").val("");
              
              callback(false);

            }
          },
          error: function() {
            
            //Mostra o alert erro e alterar a cor do input
            $('#addCepCliente').css("border-color", "rgba(255,93,125,1)");
            mensagemErroAdd("Tente novamente mais tarde");

            callback(false);

          }
        });

      }else{

        //Mostra o alert erro e alterar a cor do input
        $('#addCepCliente').css("border-color", "rgba(255,93,125,1)");
        mensagemErroAdd("Cep invalido!");

        callback(false);

      }
    }

    function verfiicaVazioEndereco(idEndereco){

      valor=$("#"+idEndereco).val();

      if(valor=="" || valor.length>100){
        //Mostra o alert erro e alterar a cor do input
        $("#"+idEndereco).css("border-color", "rgba(255,93,125,1)");
        mensagemErroAdd("Endereço vazio!");
        return false;

      }else{

        //Se idEnderco valido normaliza input e esconde a alert
        $("#mensagemErroAdd").slideUp();
        $("#"+idEndereco).css("border-color", "#ced4da");
        $("#mensagemErroAdd").attr("show", "False");
        return true;
        
      }
    }
    

    //Verfica se observacao e valida
    function verificaObsAdd(observacao) {
      
      if(observacao.length>300){

        //Mostra o alert erro e alterar a cor do input
        $('#addObsCliente').css("border-color", "rgba(255,93,125,1)");
        mensagemErroAdd("Observação tem que ser menor de 300 caracteres!");
        return false;

      }else{

        //Se observacao valido normaliza input e esconde a alert
        $("#mensagemErroAdd").slideUp();
        $('#addObsCliente').css("border-color", "#ced4da");
        $("#mensagemErroAdd").attr("show", "False");
        return true;

      }
    }

    //Verfica se observacao e valida
    function verificaComplementoAdd(complemento) {
      
      if(complemento.length>300){

        //Mostra o alert erro e alterar a cor do input
        $('#mensagemErroaddComplementoClienteAdd').css("border-color", "rgba(255,93,125,1)");
        mensagemErroAdd("Complemento tem que ser menor de 100 caracteres!");
        return false;

      }else{

        //Se complemento valido normaliza input e esconde a alert
        $("#mensagemErroAdd").slideUp();
        $('#addComplementoCliente').css("border-color", "#ced4da");
        $("#mensagemErroAdd").attr("show", "False");
        return true;

      }
    }

    // Função responsavel por cadastar o cliente de maneira correta
    $("#adicionarCliente").click(function (){

      // Informações do cliente
      nome=$("#addNomeCliente").val();
      dataNasc=$("#addNascCliente").val();
      cpf=$("#addCpfCliente").val();
      email=$("#addEmailCliente").val();
      cep=$("#addCepCliente").val();
      numero=$("#addNumCliente").val();
      complemento=$("#addComplementoCliente").val();
      observacao=$("#addObsCliente").val();

      regexNumero=/^[0-9]+$/;
      
      // Validando se as informações são verdadeiras
      if(validaNomeAdd(nome) &&
        validaDataAdd(dataNasc) &&
        validaCPFAdd(cpf) &&
        validaEmailAdd(email) &&
        verificaObsAdd(observacao) &&
        verificaComplementoAdd(complemento)){

          // Validando numero
          if(numero=="" || numero<=0 || !regexnumero.test(numero)){

            //Mostra o alert erro e alterar a cor do input
            $(this).css("border-color", "rgba(255,93,125,1)");
            mensagemErroAdd("Cep invalido !");
            return false
  
          }else{
            
            // Validando o cep e armazenado o endereco
            consultaCepAdd(cep, function(endereco){ 
              
              if(endereco!=false){

                // Coletando rua
                if(endereco.logradouro==""){rua=$("#addRuaCliente").val();}else{rua=endereco.logradouro;}
                
                // Coletando bairro
                if(endereco.bairro==""){bairro=$("#addBairroCliente").val();}else{bairro=endereco.bairro;}
                
                // Coletando cidade
                if(endereco.localidade==""){cidade=$("#addCidadeCliente").val();}else{cidade=endereco.localidade;}
    
                // Coletando estado
                if(endereco.uf==""){estado=$("#addEstadoCliente").val();}else{estado=endereco.uf;}
                

                // Verificando se o endereco rua, bairro, cidade e estado
                if(verfiicaVazioEndereco("addRuaCliente") || 
                  verfiicaVazioEndereco("addBairroCliente") || 
                  verfiicaVazioEndereco("addCidadeCliente") ||
                  verfiicaVazioEndereco("addEstadoCliente")){
                    
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
                      observacao: observacao

                    };

                    // Faz a chamada Ajax utilizando o método $.ajax do jQuery
                    $.ajax({
                      url: "app/adicionarCliente.php",
                      type: "POST",
                      data: JSON.stringify(dados),
                      contentType: "application/json",
                      success: function(resposta) {
                        
                        // Caso ocorra um erro
                        if(resposta==="1"){

                          // Valida cada um dos campos buscando erro
                          if(validaNomeAdd(nome) &&
                          validaDataAdd(dataNasc) &&
                          validaCPFAdd(cpf) &&
                          validaEmailAdd(email) &&
                          verificaObsAdd(observacao) &&
                          verificaComplementoAdd(complemento)){

                            if(numero=="" || numero<=0 || !regexnumero.test(numero)){

                              //Mostra o alert erro e alterar a cor do input
                              $(this).css("border-color", "rgba(255,93,125,1)");
                              mensagemErroAdd("Cep invalido !");
                              return false


                              // Verifica o enderecos
                            }else if(verfiicaVazioEndereco('addRuaCliente') &&
                                    verfiicaVazioEndereco('addBairroCliente') &&
                                    verfiicaVazioEndereco('addCidadeCliente') &&
                                    verfiicaVazioEndereco('addEstadoCliente')){


                                      mensagemErroAdd("Erro inesperado, tente mais tarde");
                                    }
                          // Realizada com sucesso
                          }
                        }else if(resposta==="0"){
                          
                          mensagemSucessoAdd("Cliente adicionado com sucesso");

                          conteudo=["semClientes", "hubPesquisa", "erro", "notFundCliente", "listaClientes"];

                          for(i=0; i<conteudo.length; i++){

                            
                            $('#'+conteudo[i]).css('display', 'none');
                            
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
                                css="flex";
                                // Caso  algum erro
                              }else{
                    
                                conteudoInd=2;
                                css="block";
                              }
                            
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

                          limparCampos();
                          

                        }else{

                          mensagemErroAdd("Tente novamente mais tarde.");
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

    $("#botaoAdicionarCliente").click(function () { 
      ModalAdd = new bootstrap.Modal(document.getElementById('modalAddCliente'), {});

      ModalAdd.show();
      
    });

    //Abrir modal da adicionar cliente
    $("#addCliente").click(function (){ 

      ModalAdd = new bootstrap.Modal(document.getElementById('modalAddCliente'), {});

      ModalAdd.show();

    });


    // Validando nome digitado
    $("#addNomeCliente").keyup(function (){ 
      
      nome=$(this).val();
      validaNomeAdd(nome);
       
    });

    //Validando data de nascimento digitado
    $("#addNascCliente").change(function(){

      data=$(this).val();
      validaDataAdd(data);

    });

    //Validando cpf digitado
    $("#addCpfCliente").keyup(function(){ 
      
      cpf=$(this).val();
      validaCPFAdd(cpf);
      
    });


    //Validando email digitado
    $("#addEmailCliente").keyup(function(){ 
      
      email=$(this).val();
      validaEmailAdd(email);
      
    });

    //Validando cep digitado
    $("#addCepCliente").keyup(function(){ 
      
      cep=$(this).val();
      validaCepAdd(cep);
      
    });

    //Se o cep for valido preenche os campos de rua, bairro, cidade e estado
    $("#addCepCliente").focusout(function(){ 
      
      cep=$(this).val();

      consultaCepAdd(cep, function(endereco){

        
        if(endereco!=false){

          //Cep valido define valor do input e bloqueia digitar
          
          // Define rua
          if(endereco.logradouro==""){$("#addRuaCliente").prop("disabled", false);}else{$("#addRuaCliente").val(endereco.logradouro);$("#addRuaCliente").prop("disabled", true);}

          // Define bairro
          if(endereco.bairro==""){$("#addBairroCliente").prop("disabled", false);}else{$("#addBairroCliente").val(endereco.bairro);$("#addBairroCliente").prop("disabled", true);}

          // Define cidade
          if(endereco.localidade==""){$("#addCidadeCliente").prop("disabled", false);}else{$("#addCidadeCliente").val(endereco.localidade);$("#addCidadeCliente").prop("disabled", true);}

          // Define estado
          if(endereco.uf==""){$("#addEstadoCliente").prop("disabled", false);}else{$("#addEstadoCliente").val(endereco.uf);$("#addEstadoCliente").prop("disabled", true);}

        }

      });
    });


    // Verifica o numero digitado
    $('#addNumCliente').keyup(function(){

        numero=$(this).val();

        regexnumero= /^[0-9]+$/ ;

        if(numero=="" || numero<=0 || !regexnumero.test(numero)){

          //Mostra o alert erro e alterar a cor do input
          $(this).css("border-color", "rgba(255,93,125,1)");
          mensagemErroAdd("Cep invalido !");

        }else{

          //Se numero valido normaliza input e esconde a alert
          $("#mensagemErroAdd").slideUp();
          $(this).css("border-color", "#ced4da");
          $("#mensagemErroAdd").attr("show", "False");
        }
    });

    //Validando rua digitada
    $("#addRuaCliente").keyup(function(){ 
      
      idEndereco="addRuaCliente";
      verfiicaVazioEndereco(idEndereco);
      
    });

    //Validando bairro digitado
    $("#addBairroCliente").keyup(function(){ 
      
      idEndereco="addBairroCliente";
      verfiicaVazioEndereco(idEndereco);
      
    });

    //Validando cidade digitado
    $("#addCidadeCliente").keyup(function(){ 
      
      idEndereco="addCidadeCliente";
      verfiicaVazioEndereco(idEndereco);
      
    });

    //Validando estado digitado
    $("#addEstadoCliente").keyup(function(){ 
      
      idEndereco="addEstadoCliente";
      verfiicaVazioEndereco(idEndereco);
      
    });


    //Validando observacao digitada
    $("#addComplementoCliente").keyup(function(){ 
      
      complemento=$(this).val();

      verificaComplementoAdd(complemento);
      
    });

    //Validando observacao digitada
    $("#addObsCliente").keyup(function(){ 
      
      observacao=$(this).val();

      verificaObsAdd(observacao);
      
    });

    $("#cancelarAdicionarCliente").click(function(){limparCampos();});
    // Normaliza o input nome
    $('#addNomeCliente').click(function () {$(this).css("border-color", "#ced4da");});

    // Normaliza o input data
    $('#addNascCliente').click(function () {$(this).css("border-color", "#ced4da");});

    // Normaliza o input data
    $('#addNascCliente').click(function () {$(this).css("border-color", "#ced4da");});

    // Normaliza o input cpf
    $('#addCpfCliente').click(function () {$(this).css("border-color", "#ced4da");});

    // Normaliza o input email
    $('#addEmailCliente').click(function () {$(this).css("border-color", "#ced4da");});

    // Normaliza o input cep
    $('#addCepCliente').click(function () {$(this).css("border-color", "#ced4da");});
      
    // Normaliza o input numero
    $('#addNumCliente').click(function () {$(this).css("border-color", "#ced4da");});

    // Normaliza o input rua
    $('#addRuaCliente').click(function () {$(this).css("border-color", "#ced4da");});

    // Normaliza o input bairro
    $('#addBairroCliente').click(function () {$(this).css("border-color", "#ced4da");});

    // Normaliza o input cidade
    $('#addCidadeCliente').click(function () {$(this).css("border-color", "#ced4da");});

    // Normaliza o input bairro
    $('#addEstadoCliente').click(function () {$(this).css("border-color", "#ced4da");});

    // Normaliza o input Complemento
    $('#addComplementoCliente').click(function () {$(this).css("border-color", "#ced4da");});

    //Esconde o alert erro
    $('#mensagemErroAdd').click(function(){$(this).slideUp();$("#mensagemErroAdd").attr("show", "False");});

    //Esconde o alert sucesso
    $('#mensagemSucessoAdd').click(function(){$(this).slideUp();$("#mensagemSucessoAdd").attr("show", "False");});
})