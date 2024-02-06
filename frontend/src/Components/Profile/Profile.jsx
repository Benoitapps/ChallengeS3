import {useState, useEffect} from "react";
import {getUserId} from "../User/DecodeUser.jsx";
import {getCoachDetails} from "../../hook/coach/getCoach.js";
import {getClientDetails} from "../../hook/client/getClient.js";
import {updateCoachProfile} from "../../hook/coach/updateCoachProfile.js";
import {updateClientProfile} from "../../hook/client/updateClientProfile.js";
import ProfileCard from "./ProfileCard.jsx";
import ProfileContent from "./ProfileContent.jsx";
import '@css/Profile.css';
import Alert from "../Alert.jsx";

export default function Profile({isManager, isCoach}) {
  const [user, setUser] = useState({});
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);

  function updateProfile(data) {
      setUserProfile({...userProfile, ...data});
  }

  async function submitProfile() {
      if(isCoach) {
        setIsLoading(true);
        const result = await updateCoachProfile(user.id, userProfile);
        setIsLoading(false);

          if (result.status === 200) {
              setSuccess(true);
              setError(false);
              removeAlertOnSuccess();
          } else {
              setSuccess(false);
              setError(true);
              removeAlertOnError();
          }
      } else {
            setIsLoading(true);
            const result = await updateClientProfile(user.id, userProfile);
            setIsLoading(false);

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
  }

    function removeAlertOnSuccess() {
        setTimeout(() => {
            setSuccess(false);
            setError(false);
        }, 3000);
    }

    function removeAlertOnError() {
        setTimeout(() => {
            setSuccess(false);
            setError(false);
        }, 3000);
    }

  useEffect(() => {
      async function getUser() {
          const userId = await getUserId();

          if(isCoach) {
             setUser(await getCoachDetails(userId));
             setLoading(false);
          } else {
              setUser(await getClientDetails(userId));
              setLoading(false);
          }
      }

      getUser();
  }, []);

  return (
    <>
      <main>
          {
              loading
                  ? <div className="loading">Chargement...</div>
                  :
                  <div className="container-profile">
                      <ProfileCard user={user} submitProfile={submitProfile} isLoading={isLoading}/>
                      <div className="user-content">
                          <ProfileContent user={user} isManager={isManager} isCoach={isCoach} updateProfile={updateProfile}/>
                      </div>
                  </div>
          }
          {
              success && <Alert isVisible={true} type="success" text="Profil mis à jour"/>
          }
          {
              error && <Alert isVisible={true} type="error" text="Une erreur est survenue"/>
          }
      </main>
    </>
  )
}
