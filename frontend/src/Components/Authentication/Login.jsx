import React, { useState } from 'react';
import '@css/Authentification.css';
import { Link, useNavigate } from 'react-router-dom';

function Login({ handleConnect }) {
    const navigate = useNavigate();
    const [loading, setLoading] = useState(false);

    const handleSubmit = async (e) => {
        e.preventDefault();
        setLoading(true);

        const data = new FormData(e.target);

        try {
            const result = await fetch('http://localhost:8888/auth', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify({
                    email: data.get('email'),
                    password: data.get('password')
                })
            });

            if (!result.ok) {
                alert('Une erreur est survenue. Veuillez vérifier vos informations de connexion.');
                setLoading(false);
                return;
            }

            const body = await result.json();

            localStorage.setItem('token', body.token);
            // const decodedToken = jwtDecode(body.token);
            // console.log("decode", decodedToken);
            handleConnect();
            navigate("/");
        } catch (error) {
            alert('Une erreur est survenue lors de la tentative de connexion. Veuillez réessayer plus tard.');
            setLoading(false);
        }
    };


    return (
        <>

            <main className="authentification">
                <div className="login-signup">
                    <svg className="login-signup__svg" xmlns="http://www.w3.org/2000/svg" width="220" height="48" viewBox="0 0 220 48" fill="none">
                        <path fillRule="evenodd" clipRule="evenodd" d="M6.87265 0.606323C3.07699 0.606323 0 3.68682 0 7.48681V40.5132C0 44.3132 3.07699 47.3937 6.87265 47.3937H63.2284C67.0241 47.3937 70.101 44.3132 70.101 40.5132V7.48681C70.101 3.68682 67.0241 0.606323 63.2284 0.606323H6.87265ZM12.6363 11.1147H3.1786V39.1371H10.6136V22.8272H10.8322L17.0645 38.9181H21.5473L27.7796 22.9366H27.9982V39.1371H35.4332V11.1147H25.9755L19.4699 26.9867H19.1419L12.6363 11.1147ZM46.3601 11.1147H37.8865L48.1642 30.3253V39.1371H55.7085V30.3253L65.9862 11.1147H57.5126L52.0457 22.4988H51.827L46.3601 11.1147Z"/>
                        <path d="M103.535 20.247H95.8266C95.772 19.6085 95.6262 19.0292 95.3893 18.5093C95.1615 17.9893 94.8426 17.5424 94.4326 17.1684C94.0317 16.7852 93.5442 16.4933 92.9702 16.2927C92.3962 16.0829 91.7447 15.978 91.0158 15.978C89.7402 15.978 88.6605 16.2881 87.7766 16.9084C86.9019 17.5287 86.2368 18.4181 85.7812 19.5765C85.3348 20.735 85.1115 22.1261 85.1115 23.7498C85.1115 25.4647 85.3393 26.9014 85.7949 28.0599C86.2596 29.2092 86.9293 30.0758 87.804 30.6596C88.6787 31.2343 89.7311 31.5216 90.9611 31.5216C91.6627 31.5216 92.2914 31.435 92.8472 31.2616C93.403 31.0792 93.8859 30.8192 94.2959 30.4817C94.7059 30.1442 95.0385 29.7383 95.2936 29.264C95.5578 28.7805 95.7355 28.2377 95.8266 27.6357L103.535 27.6904C103.444 28.8763 103.111 30.0849 102.537 31.3164C101.963 32.5387 101.148 33.6698 100.091 34.7097C99.043 35.7405 97.7446 36.5706 96.1956 37.2C94.6467 37.8294 92.8472 38.1441 90.7971 38.1441C88.2277 38.1441 85.9225 37.5922 83.8815 36.4885C81.8496 35.3847 80.2415 33.761 79.057 31.6174C77.8816 29.4738 77.2939 26.8512 77.2939 23.7498C77.2939 20.6301 77.8953 18.003 79.098 15.8685C80.3007 13.7249 81.9225 12.1057 83.9635 11.0111C86.0045 9.90736 88.2823 9.35549 90.7971 9.35549C92.5647 9.35549 94.1911 9.59722 95.6763 10.0807C97.1615 10.5641 98.4644 11.2711 99.5851 12.2015C100.706 13.1228 101.608 14.2585 102.291 15.6085C102.975 16.9586 103.389 18.5047 103.535 20.247Z"/>
                        <path d="M134.098 23.7498C134.098 26.8695 133.492 29.5011 132.28 31.6448C131.069 33.7793 129.433 35.3984 127.374 36.5022C125.315 37.5968 123.019 38.1441 120.486 38.1441C117.934 38.1441 115.629 37.5922 113.57 36.4885C111.52 35.3756 109.889 33.7519 108.677 31.6174C107.474 29.4738 106.873 26.8512 106.873 23.7498C106.873 20.6301 107.474 18.003 108.677 15.8685C109.889 13.7249 111.52 12.1057 113.57 11.0111C115.629 9.90736 117.934 9.35549 120.486 9.35549C123.019 9.35549 125.315 9.90736 127.374 11.0111C129.433 12.1057 131.069 13.7249 132.28 15.8685C133.492 18.003 134.098 20.6301 134.098 23.7498ZM126.281 23.7498C126.281 22.0714 126.057 20.6575 125.611 19.5081C125.174 18.3496 124.522 17.4739 123.656 16.881C122.8 16.279 121.743 15.978 120.486 15.978C119.228 15.978 118.167 16.279 117.301 16.881C116.445 17.4739 115.793 18.3496 115.347 19.5081C114.909 20.6575 114.691 22.0714 114.691 23.7498C114.691 25.4282 114.909 26.8467 115.347 28.0051C115.793 29.1545 116.445 30.0302 117.301 30.6322C118.167 31.2252 119.228 31.5216 120.486 31.5216C121.743 31.5216 122.8 31.2252 123.656 30.6322C124.522 30.0302 125.174 29.1545 125.611 28.0051C126.057 26.8467 126.281 25.4282 126.281 23.7498Z"/>
                        <path d="M143.119 37.761H134.918L144.157 9.73861H154.544L163.783 37.761H155.583L149.46 17.4557H149.241L143.119 37.761ZM141.588 26.7053H157.004V32.3973H141.588V26.7053Z"/>
                        <path d="M191.295 20.247H183.587C183.532 19.6085 183.387 19.0292 183.15 18.5093C182.922 17.9893 182.603 17.5424 182.193 17.1684C181.792 16.7852 181.305 16.4933 180.731 16.2927C180.157 16.0829 179.505 15.978 178.776 15.978C177.501 15.978 176.421 16.2881 175.537 16.9084C174.662 17.5287 173.997 18.4181 173.542 19.5765C173.095 20.735 172.872 22.1261 172.872 23.7498C172.872 25.4647 173.1 26.9014 173.555 28.0599C174.02 29.2092 174.69 30.0758 175.565 30.6596C176.439 31.2343 177.492 31.5216 178.722 31.5216C179.423 31.5216 180.052 31.435 180.608 31.2616C181.164 31.0792 181.646 30.8192 182.056 30.4817C182.466 30.1442 182.799 29.7383 183.054 29.264C183.318 28.7805 183.496 28.2377 183.587 27.6357L191.295 27.6904C191.204 28.8763 190.872 30.0849 190.298 31.3164C189.724 32.5387 188.908 33.6698 187.851 34.7097C186.803 35.7405 185.505 36.5706 183.956 37.2C182.407 37.8294 180.608 38.1441 178.558 38.1441C175.988 38.1441 173.683 37.5922 171.642 36.4885C169.61 35.3847 168.002 33.761 166.817 31.6174C165.642 29.4738 165.054 26.8512 165.054 23.7498C165.054 20.6301 165.656 18.003 166.858 15.8685C168.061 13.7249 169.683 12.1057 171.724 11.0111C173.765 9.90736 176.043 9.35549 178.558 9.35549C180.325 9.35549 181.952 9.59722 183.437 10.0807C184.922 10.5641 186.225 11.2711 187.346 12.2015C188.466 13.1228 189.368 14.2585 190.052 15.6085C190.735 16.9586 191.15 18.5047 191.295 20.247Z"/>
                        <path d="M194.743 37.761V9.73861H202.342V20.6848H212.401V9.73861H220V37.761H212.401V26.8147H202.342V37.761H194.743Z"/>
                    </svg>

                    <form className="login-signup__form" onSubmit={handleSubmit}>
                        <input type="email" id="email" name="email" placeholder="Email" autoComplete="email" required />
                        <input type="password" id="password" name="password" placeholder="Mot de passe" autoComplete="current-password" required/>
                        <div className="login-signup__form__submit">
                            <input type="submit" value={loading ? 'Connexion en cours...' : 'Se connecter'} disabled={loading} />
                            <p>Vous n’avez pas encore de compte ? <Link to="/signup">Inscrivez-vous</Link></p>
                        </div>
                    </form>
                </div>
            </main>
        </>
    );
}

export default Login;
