import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { getClientDetails } from "../../hook/client/getClient.js";
import ClientProfile from "./ClientProfile.jsx";
import ClientContent from "./ClientContent.jsx";
import '@css/Coach.css';

function ClientPage() {
    const { id } = useParams();
    const [client, setClient] = useState({});
    const [loading, setLoading] = useState(true);

    const getClient = async () => {
        const clientResult = await getClientDetails(id);

        setClient(clientResult);
        setLoading(false);
    };

    useEffect(() => {
        getClient();
    }, [id]);

    return (
        <main>
            {
                loading
                    ? <div className="loading">Chargement...</div>
                    :
                    <div className="container-client">
                        <ClientProfile client={client} getClient={getClient}/>
                        <div className="client-content">
                            <ClientContent client={client} id={id}/>
                        </div>
                    </div>
            }
        </main>
    );
}

export default ClientPage;