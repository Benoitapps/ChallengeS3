import {useState, useEffect} from "react";

export default function ProfileContent({user, isManager, isCoach, updateProfile}) {
    const [firstname, setFirstname] = useState('');
    const [lastname, setLastname] = useState('');
    const [biography, setBiography] = useState('');
    const [address, setAddress] = useState('');
    const [city, setCity] = useState('');
    const [zipCode, setZipCode] = useState('');

    useEffect(() => {
        if(isCoach) {
            setFirstname(user.auth.firstname);
            setLastname(user.auth.lastname);
            setBiography(user.biography);
        } else if(isManager) {
            setFirstname(user.auth.firstname);
            setLastname(user.auth.lastname);
        } else {
            setFirstname(user.auth.firstname);
            setLastname(user.auth.lastname);
            setAddress(user.address);
            setCity(user.city);
            setZipCode(user.zip_code);
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
                                            updateProfile({firstname: e.target.value});
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
            {
                isManager ? (
                        <>
                            <input type="text" className="user-content__head__name" placeholder="Prénom" value={firstname}
                                   onInput={
                                       (e) => {
                                           setFirstname(e.target.value);
                                           updateProfile({firstname: e.target.value});
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
                        </>
                    )
                    : null
            }
            {
                !isCoach && !isManager ? (
                        <>
                            <input type="text" className="user-content__head__name" placeholder="Prénom" value={firstname}
                                   onInput={
                                       (e) => {
                                           setFirstname(e.target.value);
                                           updateProfile({firstname: e.target.value});
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
                            <input type="text" className="user-content__head__adress" placeholder="Adresse" value={address}
                                   onInput={
                                       (e) => {
                                             setAddress(e.target.value);
                                             updateProfile({address: e.target.value});
                                       }
                                   }
                            />
                            <input type="text" className="user-content__head__city" placeholder="Ville" value={city}
                                   onInput={
                                       (e) => {
                                           setCity(e.target.value);
                                           updateProfile({city: e.target.value});
                                       }
                                   }
                            />
                            <input type="text" className="user-content__head__zip-code" placeholder="Code postal" value={zipCode}
                                   onInput={
                                       (e) => {
                                           setZipCode(e.target.value);
                                           updateProfile({zip_code: e.target.value});
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