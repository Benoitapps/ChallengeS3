import {getUserId} from "../User/DecodeUser.jsx";
import {addReview} from "../../hook/client/addReview.js";
import {updateReview} from "../../hook/client/updateReview.js";
import {useState} from "react";
import Alert from "../Alert.jsx";

function ClientReview({client, id}) {
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState(false);
    const [note, setNote] = useState(0);
    let isNoted = false;
    let idReview = null;
    const [stars, setStars] = useState([
        {
            id: 1,
            selected: false
        },
        {
            id: 2,
            selected: false
        },
        {
            id: 3,
            selected: false
        },
        {
            id: 4,
            selected: false
        },
        {
            id: 5,
            selected: false
        }
    ]);
    const [isLoading, setIsLoading] = useState(false);

    function handleStarClick(starId) {
        const newStars = stars.map((star) => {
            if (star.id <= starId) {
                return {
                    ...star,
                    selected: true
                };
            } else {
                return {
                    ...star,
                    selected: false
                };
            }
        });
        setStars(newStars);
        setNote(starId);
    }

    async function verifyReviewIsExist(reviews, userId) {
        await reviews.forEach((review) => {
            if (review.client.id === userId) {
                isNoted = true;
                idReview = review.id;
            }
        });
    }

    const handleSubmit = async (e) => {
        e.preventDefault();
        setIsLoading(true);

        if(note > 0 && note <= 5) {
            const userId = await getUserId();
            await verifyReviewIsExist(client.reviewClients, userId);

            if (isNoted === false) {
                const result = await addReview(id, userId, note);

                if (result.status === 201) {
                    setSuccess(true);
                    setError(false);
                    removeAlertOnSuccess();
                } else {
                    setSuccess(false);
                    setError(true);
                    removeAlertOnError();
                }
            } else {
                const result = await updateReview(idReview, note);

                if (result.status === 200) {
                    setSuccess(true);
                    setError(false);
                    removeAlertOnSuccess();
                } else {
                    setSuccess(false);
                    setError(true);
                    removeAlertOnError();
                }
            }
        } else {
            setSuccess(false);
            setError(true);
            removeAlertOnError();
        }

        setIsLoading(false);
    };

    function removeAlertOnSuccess() {
        setTimeout(() => {
            setSuccess(false);
            setError(false);
            window.location.reload();
        }, 3000);
    }

    function removeAlertOnError() {
        setTimeout(() => {
            setSuccess(false);
            setError(false);
        }, 3000);
    }

    return (
        <div className="client-content__review">
            <form className="client-review" onSubmit={(e) => handleSubmit(e)}>
                <ul className="client-review__stars">
                    {
                        stars.map((star, index) => {
                            return (
                                <li
                                    key={index}
                                    data-note={index}
                                    className="client-review__stars__item"
                                    onClick={() => {handleStarClick(star.id)}}
                                >
                                    {
                                        star.selected ?
                                        <svg xmlns="http://www.w3.org/2000/svg" width="42" height="40" viewBox="0 0 42 40" fill="none">
                                            <path d="M20.7 0L14.3006 12.9656L0 15.0337L10.35 25.1287L7.90312 39.375L20.7 32.6531L33.4969 39.375L31.05 25.1287L41.4 15.0469L27.0994 12.9656L20.7 0Z" fill="var(--primary)"/>
                                        </svg>
                                        :
                                        <svg xmlns="http://www.w3.org/2000/svg" width="42" height="40" viewBox="0 0 42 40" fill="none">
                                            <path d="M21.3001 6.35625L25.1813 14.2031L25.8282 15.6094L27.2345 15.8212L35.897 17.0719L29.7376 23.1187L28.682 24.1444L28.937 25.5506L30.4126 34.1719L22.6632 30.1069L21.3001 29.5312L19.9932 30.2194L12.2438 34.2281L13.6501 25.6087L13.9032 24.2025L12.8626 23.1187L6.64697 17.0025L15.3095 15.75L16.7157 15.5381L17.3626 14.1319L21.3001 6.35625ZM21.3001 0L14.9007 12.9656L0.600098 15.0337L10.9501 25.1287L8.50322 39.375L21.3001 32.6531L34.097 39.375L31.6501 25.1287L42.0001 15.0469L27.6995 12.9656L21.3001 0Z" fill="var(--primary)"/>
                                        </svg>
                                    }
                                </li>
                            )
                        })
                    }
                </ul>
                <button className="client-review__submit primary-button" type="submit">
                    {
                        isLoading
                            ? 'En cours d\'envoi...'
                            : 'Envoyer'
                    }
                </button>
            </form>
            {
                success && <Alert isVisible={true} type="success" text="Votre avis a bien été pris en compte"/>
            }
            {
                error && <Alert isVisible={true} type="error" text="Une erreur est survenue"/>
            }
        </div>
    );
}

export default ClientReview;