import {useState, useEffect} from "react";
import {getUserId} from "../User/DecodeUser.jsx";
import {getCoachDetails} from "../../hook/coach/getCoach.js";
import {getClientDetails} from "../../hook/client/getClient.js";
import {getManagerDetails} from "../../hook/manager/getManager.js";
import {getAdminDetails} from "../../hook/admin/getAdmin.js";
import {updateCoachProfile} from "../../hook/coach/updateCoachProfile.js";
import {updateClientProfile} from "../../hook/client/updateClientProfile.js";
import {updateManagerProfile} from "../../hook/manager/updateManagerProfile.js";
import {updateAdminProfile} from "../../hook/admin/updateAdminProfile.js";
import ProfileCard from "./ProfileCard.jsx";
import ProfileContent from "./ProfileContent.jsx";
import '@css/Profile.css';
import Alert from "../Alert.jsx";
import {useNavigate} from "react-router-dom";

export default function Profile({isManager, isCoach, isAdmin, handleDisconnect}) {
  const [user, setUser] = useState({});
  const [userProfile, setUserProfile] = useState({});
  const [loading, setLoading] = useState(true);
  const [isLoading, setIsLoading] = useState(false);
  const [success, setSuccess] = useState(false);
  const [error, setError] = useState(false);
  const navigate = useNavigate();

  function updateProfile(data) {
      setUserProfile({...userProfile, ...data});
  }

  async function submitProfile() {
      /*if(userProfile.password === '') {
        delete userProfile.password;
      }*/

      if(userProfile.email === '') {
        delete userProfile.email;
      }

      if(userProfile.firstname === '') {
        delete userProfile.firstname;
      }

      if(userProfile.lastname === '') {
        delete userProfile.lastname;
      }

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
      } else if(isManager) {
          setIsLoading(true);
          const result = await updateManagerProfile(user.id, userProfile);
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
      } else if(isAdmin) {
          setIsLoading(true);
          const result = await updateAdminProfile(user.id, userProfile);
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
        if(userProfile.email) {
            handleDisconnect();
            navigate('/login');
        }

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
          } else if(isManager) {
            setUser(await getManagerDetails(userId));
            setLoading(false);
          } else if(isAdmin) {
              setUser(await getAdminDetails(userId));
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
                      <ProfileCard user={user} isManager={isManager} isCoach={isCoach} isAdmin={isAdmin} submitProfile={submitProfile} isLoading={isLoading}/>
                      <div className="user-content">
                          <ProfileContent user={user} isManager={isManager} isCoach={isCoach} isAdmin={isAdmin} updateProfile={updateProfile}/>
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
