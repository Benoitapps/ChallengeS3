import React, { useState } from 'react'
import { isActive, getUsers } from "../hook/isActive"

function HomePage() {
    const [actif, setActif] = useState(null);
    const handleClick = async () => {
        setActif(await isActive());
    }
    const handleClickUsers = async () => {
        const users = await getUsers();
        console.log(users);
    }

    return (
        <>
            <h1>Home Page</h1>
            <br />
            <div>Click here to see if the backend is started</div>
            <button onClick={handleClick}>Back started ?</button>
            <button onClick={handleClickUsers}>Get users in console log</button>
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
