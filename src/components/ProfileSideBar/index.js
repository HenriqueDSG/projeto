import Box from "../Box";
import { AlurakutProfileSidebarMenuDefault } from "../../lib/ProjetoCommons";

const ProfileSideBar = ({usuario}) => 
{
    const link = "https://github.com/" + usuario;
    const imagem = link + ".png";
    

    return(
        <Box as="aside">
            <a href={link}> <img src={imagem} style={{ borderRadius: "8px" }} /> </a>
            <hr />
            <p> <a className="boxLink" href={link}> {usuario} </a>  </p>
            <hr />
            <AlurakutProfileSidebarMenuDefault />
        </Box>
    )
}

export default ProfileSideBar;