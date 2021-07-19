import React from 'react';
import nookies from 'nookies';
import jwt from 'jsonwebtoken';
import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from "../src/lib/ProjetoCommons"
import ProfileSideBar from '../src/components/ProfileSideBar'
import ProfileRelationsPessoas from '../src/components/ProfileRelationsPessoas';
import ProfileRelationsComunidades from '../src/components/ProfileRelationsComunidades';
import ProfileRelationsSeguidores from '../src/components/ProfileRelationsSeguidores';

export default function Home(props) 
{

//#region Variaveis
  const usuario = props.githubUser;
  const pessoasFavoritas = [
    {
      nome: 'juunegreiros',
      imagem: "https://github.com/juunegreiros.png"
    },
    {
      nome:'rafaballerini',
      imagem: "https://github.com/rafaballerini.png"
    }, 
    {
      nome:'peas',
      imagem: "https://github.com/peas.png"
    },
    {
      nome:'marcobrunodev',
      imagem: "https://github.com/marcobrunodev.png"
    },
    {
      nome:'felipefialho',
      imagem: "https://github.com/felipefialho.png"
    }];

  const [comunidades, setComunidades] = React.useState([]);
  const [seguidores, setSeguidores] = React.useState([]);

  React.useEffect(() =>
  {
    fetch("https://api.github.com/users/" + usuario + "/followers")
    .then((respostaServidor) =>
    {
      if (respostaServidor.ok) 
      {
        return respostaServidor.json()
      }

      throw new Error("Ocorreu algum erro na resposta")
    })
    .then((respostaConvertida) =>
    {
      setSeguidores(respostaConvertida)
    })

    fetch("https://graphql.datocms.com/", 
      { method: "POST",
        headers: 
        {
          "Authorization" : "22fb87ddc0aee2cd60a0f0efa2e2fb",
          "Content-Type" : "application/json",
          "Accept" : "application/json"
        },
        body: JSON.stringify(
          {
            query: `query 
            {
              allComunidades 
              {
                id
                titulo
                imagem
                usuarioCriador
              }
            }`})
      })
      .then((respostaDATO) =>  respostaDATO.json() )
      .then((respostaConvertida) => { setComunidades(respostaConvertida.data.allComunidades) })
  }, []);

//#endregion
    
  const handleCriarComunidade = e =>
  {
    e.preventDefault();
    const dadosForm = new FormData(e.target);
    const nomeComunidade = dadosForm.get("title");
    const imagemComunidade = dadosForm.get("image");

    if (nomeComunidade.length != 0)
    {
      const comunidade = 
      {
        titulo: nomeComunidade,
        imagem: ((imagemComunidade != "") ? imagemComunidade : "https://via.placeholder.com/150"),
        usuarioCriador: usuario
      }

      fetch("/api/comunidades", 
      { 
        method: "POST",
        headers:
        {
          "Content-Type" : "application/json",
        },
        body: JSON.stringify(comunidade)
      })
      .then(async (resposta) => 
      {
        const dados = await resposta.json();
        const comunidade = dados.registro;
        const comunidadesAtualizadas = [...comunidades, comunidade];
        setComunidades(comunidadesAtualizadas);
      })
    }
    else
    {
      e.preventDefault();
      alert("[ERRO] - Nome inválido!")
    }
  }

  return (
    <>
      <AlurakutMenu />
      <MainGrid>

        <div className="profileArea" style={{gridArea: 'profileArea'}}>
          <ProfileSideBar usuario={usuario}/>
        </div>

        <div className="welcomeArea" style={{gridArea: 'welcomeArea'}}>
          <Box> 
            <h1 className="title"> Bem Vindo(a) </h1> 
            <OrkutNostalgicIconSet />
          </Box>

          <Box>
            <h2 className="subTitle"> O que você deseja fazer? </h2>
            <form onSubmit={(e) => handleCriarComunidade(e)}>
              <div>
                <input placeholder="Qual vai ser o nome da sua comunidade?" name="title" aria-label="Qual vai ser o nome da sua comunidade?" type="text" />
              </div>
              <div>
                <input placeholder="Coloque uma URL de imagem para capa" name="image" aria-label="Coloque uma URL de imagem para capa" />
              </div>

              <button> Criar Comunidade </button>
            </form>
          </Box>
        </div>

        <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsPessoas  pessoasFavoritas={pessoasFavoritas}/>
          <ProfileRelationsComunidades comunidades={comunidades}/>
          <ProfileRelationsSeguidores seguidores={seguidores}/>
        </div>
        
      </MainGrid>
    </>
  )
}

export async function getServerSideProps(context) 
{
  const cookies = nookies.get(context);
  const token = cookies.USER_TOKEN;
  const decodedToken = jwt.decode(token);
  const githubUser = decodedToken.githubUser;
  console.log(githubUser)

  // const { isAuthenticated } = await fetch("http://alurakut.vercel.app/api/auth",
  // {
  //   headers:
  //   {
  //     Authorization: token
  //   }
  // })
  // .then(resposta => resposta.json())

  // console.log(token)

  // if(!isAuthenticated)
  // {
  //   return {
  //     redirect:
  //     {
  //       destination: "/login",
  //       permanent: false
  //     }
  //   }
  // }

  if (!githubUser) 
  {
    return {
      redirect: 
      {
        destination: '/login',
        permanent: false,
      },
    }
  }

  //const { githubUser } = jwt.decode(token);

  return {
    props: 
    {
      githubUser
    }, // will be passed to the page component as props
  }
}