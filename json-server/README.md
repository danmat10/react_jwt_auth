<!DOCTYPE html>
<html lang="en">

<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <title>JSON Server com Autenticação JWT</title>
</head>

<body>
    <h1>JSON Server com Autenticação JWT</h1>
    <p>Este projeto configura um servidor json-server com autenticação JWT, permitindo criar uma API REST simulada protegida por tokens.</p>

    <h2>Requisitos</h2>
    <ul>
        <li>Node.js v12 ou superior</li>
        <li>npm</li>
    </ul>

    <h2>Instalação</h2>
    <p>Para instalar todas as dependências do projeto, execute o seguinte comando na pasta principal do projeto:</p>
    <pre><code>npm install</code></pre>

    <h2>Uso</h2>
    <p>O servidor pode ser iniciado com o seguinte comando:</p>
    <pre><code>node server.js</code></pre>
    <p>Isso iniciará o servidor na porta 3000.</p>

    <h3>Autenticação</h3>
    <p>Para autenticar, faça uma solicitação POST para <code>/auth/login</code> com um objeto JSON contendo <code>username</code> e <code>password</code>.</p>
    <pre>
    <code>
    {

"username": "usuario1",
"password": "senha1"
}
</code>

</pre>

    <h3>Endpoints Protegidos</h3>
    <p>Os endpoints sob <code>/db</code> e <code>/users</code> estão protegidos e requerem um token de acesso válido no cabeçalho de autorização.</p>

    <h3>Arquivos de Dados</h3>
    <p>Os dados da API são armazenados no arquivo <code>db.json</code>, e os usuários são armazenados no arquivo <code>users.json</code>.</p>

    <h2>Aviso</h2>
    <p>Este projeto é apenas um exemplo e não deve ser usado em produção sem modificações adicionais. Por favor, considere adicionar recursos adicionais de segurança, como hashing de senhas e manipulação segura de tokens de atualização.</p>

    <h2>Contribuição</h2>
    <p>Se você encontrar algum problema ou tiver alguma sugestão, sinta-se à vontade para abrir uma issue ou fazer uma pull request.</p>

    <h2>Licença</h2>
    <p>Este projeto é licenciado sob a licença MIT. Veja o arquivo <code>LICENSE</code> para mais detalhes.</p>

</body>

</html>
