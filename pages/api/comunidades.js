import { SiteClient } from 'datocms-client';

export default async function recebedorDeRequests(requisicao, resposta) 
{
    if (requisicao.method === "POST") 
    {
        const token = "24567d17140775e4e9ec132b5ad561"
        const client = new SiteClient(token);
        const registro = await client.items.create(
            {
                itemType: "967334", // modelID da tabela do DATOCMS
                ...requisicao.body,
            }
        )

        resposta.json(
            {
                registro: registro
            }
        );

        return;
    }

    resposta.status(404).json(
        {
            message: "Utilize o metodo POST"
        }
    )
}