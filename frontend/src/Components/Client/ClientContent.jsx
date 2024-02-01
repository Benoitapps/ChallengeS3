import '@css/Client.css';

function ClientContent({id, client}) {
    return (
        <>
            <div className="client-content__head">
                <h3>Adresse:</h3>
                <p>{client.address}</p>
                <h3>Ville:</h3>
                <p>{client.city}</p>
                <h3>Code postal:</h3>
                <p>{client.zipCode}</p>
            </div>
        </>
    )
}

export default ClientContent;