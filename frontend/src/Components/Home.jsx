import React, { useState } from 'react'
import isActive from "../hook/isActive"

function HomePage() {
    const [actif, setActif] = useState(null);
    const handleClick = async () => {
        setActif(await isActive());
    }

    return (
        <>
            <h1>Home Page</h1>
            <br />
            <div>Click here to see if the backend is started</div>
            <button onClick={handleClick}>Back started ?</button>
            {
                actif === null 
                    ? <></> 
                    : <>
                        <div>
                            Back is {actif ? "actif" : "not actif"}
                        </div>
                    </>
            }
            
        </>
    )
}

export default HomePage
