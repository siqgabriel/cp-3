let listaUsuarios = [
    {nome: "Gabriel", email: "gabriel@email.com", senha: "123"},
    {nome: "Hadassa", email: "hadassa@email.com", senha: "123"},
    {nome: "Pedro", email: "pedro@email.com", senha: "123"},
    {nome: "Alexandre", email: "ale@email.com", senha: "123"},
];

function validaLogin(event) {
    event.preventDefault();

    let inputEmail = document.getElementById("idEmail");
    let inputSenha = document.getElementById("idSenha");
    let msgStatus = document.getElementById("popUpMessage");
    let modal = document.getElementById("popUp");

    try {
        let usuarioValido = listaUsuarios.find(usuario => usuario.email === inputEmail.value && usuario.senha === inputSenha.value);

        if (usuarioValido) {
            if (msgStatus) {
                msgStatus.setAttribute("class", "sucesso");
                msgStatus.innerText = "Login bem-sucedido!";
            }

            localStorage.setItem("usuarioLogado", JSON.stringify(usuarioValido));

            modal.style.display = "block";

            setTimeout(() => {
                modal.style.display = "none";
                window.location.href = "../pages/index.html";
            }, 3000);
        } else {
            if (msgStatus) {
                msgStatus.setAttribute("class", "erro");
                msgStatus.innerText = "Email ou senha incorretos.";
            }

            modal.style.display = "block";
        }

    } catch (error) {
        console.error("Erro ao validar login: ", error);
    }

    return false;
}

function closePopup() {
    let modal = document.getElementById("popUp");
    modal.style.display = "none";
}

function getNameFromEmail(email) {
    const namePart = email.split('@')[0];
    return namePart.charAt(0).toUpperCase() + namePart.slice(1);
}

function displayUserName() {
    const loggedUser = JSON.parse(localStorage.getItem("usuarioLogado"));
    if (loggedUser) {
        const userName = loggedUser.nome;
        const userEmail = loggedUser.email;
        const userSenha = loggedUser.senha;
        const welcomeMessageElement = document.getElementById("welcomeMessage");
        if (welcomeMessageElement) {
            welcomeMessageElement.textContent = `${userName}! e-mail: ${userEmail} senha: ${userSenha}`;
            
        }
    }
}

function logout() {
    localStorage.removeItem("usuarioLogado");
    window.location.href = "/login.html";
}

// irá exibir o nome do usuário logado ao carregar a página
window.onload = displayUserName;
