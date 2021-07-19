import React from 'react';
import { useRouter } from "next/router";
import nookies from 'nookies';

const LoginPage = () => 
{
    //var validacao = false;
    const router = useRouter();
    const [usuario, setUsuario] = React.useState("");
    //const [usuarios, setUsuarios] = React.useState("");

    // React.useEffect(() =>
    // {
        // fetch("https://graphql.datocms.com/", 
        // { method: "POST",
        // headers: 
        // {
        //   "Authorization" : "22fb87ddc0aee2cd60a0f0efa2e2fb",
        //   "Content-Type" : "application/json",
        //   "Accept" : "application/json"
        // },
        // body: JSON.stringify(
        //   {
        //     query: `query 
        //     {
        //         allUsuarios 
        //         {
        //           id
        //           login
        //         }
        //       }`})
        // })
        // .then(async (respostaDATO) =>  
        // {
        //     const dados = await respostaDATO.json();
        //     const usuariosResposta = dados.data.allUsuarios
        //     setUsuarios(usuariosResposta);
        // })

        
    // });

    const redirecionar = (evento) =>
    {
        evento.preventDefault();

        fetch("https://alurakut.vercel.app/api/login", 
        { 
            method: "POST",
            headers: 
            {
                "Content-Type" : "application/json",
            },
            body: JSON.stringify(
            { 
                githubUser: usuario
            })
        })
        .then(async (respostaServidor) =>  
        {
            const dados = await respostaServidor.json();
            const token = dados.token;
            nookies.set(null, "USER_TOKEN", token,
            {
                path: "/",
                maxAge: 86400 * 7
            })
            router.push("/")
        })

        // usuarios.map(usuarioTemp =>
        // {
        //     console.log(usuarioTemp.login)
        //     if (usuario === usuarioTemp.login) 
        //     { 
        //         validacao = true; 
        //         return router.push("/");
        //     }
        // })

        // if (!validacao) 
        // {
        //     alert("Usuário inválido!"); 
        //     validacao = false;
        // }       
    }

    const pegarUsuario = (evento) =>
    {
        setUsuario(evento.target.value);
    }

    return (  
        <main style={{ display: "flex", flex: 1, alignItems: "center", justifyContent: "center"}}>
            <div className="loginScreen">
                <section className="logoArea">
                    <img src="http://alurakut.vercel.app/logo.svg" />

                    <p> <strong> Conecte-se </strong> aos seus amigos e familiares usando recados e mensagens instantâneas </p>
                    <p> <strong> Conheça </strong> novas pessoas através de amigos de seus amigos e comunidades </p>
                    <p> <strong> Compartilhe </strong> seus videos, fotos e paixões em um só lugar </p>
                </section>

                <section className="formArea">
                    <form className="box" onSubmit={(evento) => redirecionar(evento)}>
                        <p> Acesse agora mesmo com seu usuário do <strong> GitHub </strong> </p>
                        <input placeholder="Usuário" name="usuario" value={usuario} onChange={e => pegarUsuario(e)}/>
                        <button type="submit"> Login </button>
                    </form>

                    <footer className="box">
                        <p>Ainda não é membro? <br /> <a href="/login"> <strong> ENTRAR JÁ </strong> </a> </p>
                    </footer>
                </section>

                <footer className="footerArea">
                    <p>
                        @ {new Date().getFullYear()} teste.com.br - <a href="/"> Sobre o Orkut.br </a> - <a href="/"> Centro de Segurança </a> - <a href="/"> Privacidade </a> - <a href="/"> Termos </a> - <a href="/"> Contato </a>
                    </p>
                </footer>
            </div>
        </main>
    );
}
 
export default LoginPage;