import MainGrid from '../src/components/MainGrid'
import Box from '../src/components/Box'
import { AlurakutMenu, OrkutNostalgicIconSet } from "../src/lib/ProjetoCommons"
import { ProfileRelationsBoxWrapper } from '../src/components/ProfileRelations'


const ProfileSideBar = ({usuario}) =>
  {
    const imagem = "https://github.com/" + usuario + ".png";

    return(
      <Box>
          <img src={imagem} style={{ borderRadius: "8px" }} />
          {usuario}
        </Box>
    )
  }

  const Pessoas = ({pessoasFavoritas}) =>
  {
    var teste = "";

    for (const iterator of pessoasFavoritas) 
    {
      var imagem = "https://github.com/" + iterator + ".png";
      teste += "<Box> <img src={" + imagem + "} style={{ borderRadius: '8px' }} /> </Box>"
    }

    return <>{teste}</>;
  }

export default function Home() 
{ 
  const usuario = "HenriqueDSG";
  const pessoasFavoritas = ['juunegreiros', 'rafaballerini', 'peas', 'omariosouto', 'marcobrunodev', 'felipefialho'];

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
        </div>

        <div className="profileRelationsArea" style={{gridArea: 'profileRelationsArea'}}>
          <ProfileRelationsBoxWrapper> 
            <h2 className="smallTitle">Pessoas da comunidade({pessoasFavoritas.length})</h2>
            
            <ul>
              {pessoasFavoritas.map(pessoa => 
              {
                var imagem = "https://github.com/" + pessoa + ".png";
                
                return(
                  <li>
                    <a href={`/users/${pessoa}`} key={pessoa}>
                      <img src={imagem} style={{ borderRadius: '8px' }} /> 
                      <span>{pessoa}</span>
                   </a>
                  </li>
                  
                )
              })}
            </ul>
          </ProfileRelationsBoxWrapper>
          <Box> Comunidades </Box>
        </div>
        
      </MainGrid>
    </>
  )
}
