import { ProfileRelationsBoxWrapper } from "../ProfileRelations"

const ProfileRelationsPessoas = ({ pessoasFavoritas }) => 
{
    return ( 
        <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Pessoas da comunidade({pessoasFavoritas.length})</h2>
            <ul>
              {pessoasFavoritas.slice(0,6).map(pessoa => 
              {
                return(
                  <li key={pessoa.nome}>
                    <a href={`/users/${pessoa.nome}`} >
                      <img src={pessoa.imagem} style={{ borderRadius: '8px' }} /> 
                      <span>{pessoa.nome}</span>
                   </a>
                  </li>
                )
              })}
            </ul>
        </ProfileRelationsBoxWrapper>
     );
}
 
export default ProfileRelationsPessoas;