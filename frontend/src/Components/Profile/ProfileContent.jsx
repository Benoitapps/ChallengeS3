import {useState, useEffect} from "react";

export default function ProfileContent({user, isManager, isCoach, updateProfile}) {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [biography, setBiography] = useState('');

    useEffect(() => {
        if(isCoach) {
            setFirstname(user.auth.firstname);
            setLastname(user.auth.lastname);
            setBiography(user.biography);
        }
    }, []);

    return(
        <div className="user-content__head">
            {
                isCoach ? (
                        <>
                            <input type="text" className="user-content__head__name" placeholder="Prénom" value={firstname}
                                   onInput={
                                        (e) => {
                                            setFirstname(e.target.value);
                                            updateProfile({firstname: e.target.value
                                        });
                                    }
                                }
                            />
                            <input type="text" className="user-content__head__name" placeholder="Nom" value={lastname}
                                   onInput={
                                        (e) => {
                                            setLastname(e.target.value);
                                            updateProfile({lastname: e.target.value});
                                        }
                                   }
                            />
                            <textarea className="user-content__head__biography" placeholder="Description" value={biography}
                                      onInput={
                                          (e) => {
                                              setBiography(e.target.value);
                                              updateProfile({biography: e.target.value});
                                          }
                                      }
                            />
                        </>
                    )
                    : null
            }
        </div>
    )
}