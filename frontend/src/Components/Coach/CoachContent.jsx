import { Link } from 'react-router-dom';
import '@css/Coach.css';

function CoachContent({coach}) {
    return (
        <>
            <div className="coach-content__head">
                <ul className="coach-content__head__prestations-themes">
                    {
                        coach.prestations.map((prestation, index) => {
                            return (
                                <li key={index} className="coach-content__head__prestations-themes__item">
                                    <p>{prestation.name}</p>
                                </li>
                            )
                        })
                    }
                </ul>
                <h3 className="coach-content__head__biography">{coach.biography}</h3>
                <div className="coach-content__head__prestations">
                    <h4>Ses prestations</h4>
                    <ul className="coach-content__prestations">
                        {
                            coach.prestations.map((prestation, index) => {
                                return (
                                    <li key={index}>
                                        <Link to={`/club/${prestation.id}`} className="coach-content__prestations__item">
                                            <div className="coach-content__prestations__item__img">
                                                <img src="https://picsum.photos/300/300" alt={prestation.name} />
                                            </div>
                                            <div className="coach-content__prestations__item__content">
                                                <div className="coach-content__prestations__item__content__top">
                                                    <h5 className="coach-content__prestations__name">{prestation.name}</h5>
                                                    <p className="coach-content__franchises__name">{prestation.franchise.name}</p>
                                                    <p className="coach-content__franchises__address">{prestation.franchise.address}</p>
                                                </div>
                                                <p className="coach-content__prestations__price"><span>{prestation.price}€</span> / séance</p>
                                            </div>
                                        </Link>
                                    </li>
                                )
                            })
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default CoachContent;