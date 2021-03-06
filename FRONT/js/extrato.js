function validaLogin() {
    let userTxt = localStorage.getItem("userLogged");



    if (!userTxt) {
        window.location = "index.html"
    }
    let user = JSON.parse(userTxt);

    let comunidadeTxt = localStorage.getItem("comunidade");
    let comunidade = JSON.parse(comunidadeTxt);

    //document.getElementById("comunidade").innerHTML = `${comunidade.nome} `;

    carregar(comunidade.id_comunidade);
    
}

function logout() {
    localStorage.removeItem("userLogged");
    window.location = "index.html";
}

function carregar(id) {

    let comunidade = {
        id_comunidade: id
    }

    let msg = {
        method: 'POST',
        body: JSON.stringify(comunidade),
        headers: {
            'Content-type': 'application/json'
        }
    }

    fetch("http://localhost:8080/modernizacao/busca", msg)
        .then(res => res.json())
        .then(res => listar(res));
}

function listar(modernizacao) {

    let tabelaModernizacao = '<table class="table table-sm"> <tr> <th>Data</th> <th>Descrição</th> <th>Porcentagem</th> <th></th> </tr>';

    for (i = 0; i < modernizacao.length; i++) {
        let data = new Date(modernizacao[i].dataModernizacao).toLocaleDateString("pt-BR");

        tabelaModernizacao = tabelaModernizacao + `<tr> 
                    <td> ${data} </td>
                    <td> ${modernizacao[i].descricao} </td>
                    <td> ${modernizacao[i].percentual} </td>
                        </tr>`;
    }
    tabelaModernizacao += '</table>';
    document.getElementById("tabela").innerHTML = tabelaModernizacao;


}

function voltar() {
    window.location = "usuario.html"
}
