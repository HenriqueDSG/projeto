import { ProfileRelationsBoxWrapper } from "../ProfileRelations"

const ProfileRelationsSeguidores = (propriedade) => 
{
    return ( 
        <ProfileRelationsBoxWrapper>
            <h2 className="smallTitle">Meus Seguidores({propriedade.seguidores.length})</h2>
            <ul>
              {propriedade.seguidores.slice(0, 6).map(seguidor => 
              {

                return(
                  <li key={seguidor.login}>
                    <a href={seguidor.html_url} key={seguidor.login}>
                      <img src={seguidor.html_url + ".png"} style={{ borderRadius: '8px' }} /> 
                      <span>{seguidor.login}</span>
                   </a>
                  </li>
                )
              })}
            </ul>
        </ProfileRelationsBoxWrapper>
     );
}
 
export default ProfileRelationsSeguidores;