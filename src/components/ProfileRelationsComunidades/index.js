import { ProfileRelationsBoxWrapper } from "../ProfileRelations"

const ProfileRelationsComunidades = ({ comunidades }) => 
{
    return ( 
        <ProfileRelationsBoxWrapper> 
            <h2 className="smallTitle">Minhas Comunidades({comunidades.length})</h2>
            <ul>
              {
                comunidades.slice(0, 6).map(comunidade => 
                {

                  return(
                    <li key={comunidade.id}>
                      <a href={`/comunidades/${comunidade.id}`} key={comunidade.titulo}>
                        <img src={comunidade.imagem} style={{ borderRadius: '8px' }} /> 
                        <span>{comunidade.titulo}</span>
                    </a>
                    </li>
                  )
                })
              }
            </ul>
          </ProfileRelationsBoxWrapper> 
     );
}
 
export default ProfileRelationsComunidades;