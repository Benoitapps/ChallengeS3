import React from 'react';
import { Link } from 'react-router-dom';

function Unauthorize() {
    return (
        <>
            <h1>Vous ne pouvez pas accéder à cette page !</h1>
            <Link to="/">Retour à l'accueil</Link>
        </>
    );
}

export default Unauthorize;