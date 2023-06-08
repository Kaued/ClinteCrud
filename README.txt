ClienteCRUD

Este é um projeto que realiza as operações do CRUD (Create, Read, Update e Delete) em uma tabela de clientes com as seguintes informações: nome, cpf, data de nascimento, endereço, e-mail e observação. Os campos complemento e observação são opcionais.


Pré-requisitos

Para que o projeto funcione corretamente, é necessário criar o banco de dados no arquivo "bd_cliente.txt" em SQL e ter o servidor XAMPP ou outro servidor web com PHP instalado. Necessita de conexão com internet para utilização.


Instalação

1- Baixe o arquivo do projeto e extraia-o em sua máquina.
2- Coloque a pasta do projeto na pasta htdocs do XAMPP ou em outra pasta que possua um servidor web configurado.
3- Crie o banco de dados usando o arquivo "bd_cliente.txt" que está na raiz do projeto.
4- Abra o arquivo "conexaoBd.php" que está na pasta "app" e altere as configurações de conexão de acordo com o seu ambiente.
5- Acesse a página do projeto pelo navegador e comece a utilizar o CRUD de clientes.


Utilização

O projeto possui as seguintes funcionalidades:

Create: permite adicionar novos clientes com as informações de nome, cpf, data de nascimento, endereço e e-mail. Os campos complemento e observação são opcionais.

Read: permite visualizar a lista de todos os clientes cadastrados.

Update: permite editar as informações de um cliente existente, incluindo nome, cpf, data de nascimento, endereço, e-mail e observação. Os campos complemento e observação são opcionais.

Delete: permite excluir um cliente cadastrado.