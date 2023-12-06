import '@css/Alert.css';

function Alert({isVisible, type, text}) {
    return (
        <>
            {
                isVisible
                    ? <div className={`alert alert__${type}`}>
                        {
                            type === "success"
                            ? <svg width="25" height="25" fill="var(--primary)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 1.5a10.5 10.5 0 1 0 0 21 10.5 10.5 0 0 0 0-21Zm-1.5 14.693-3.75-3.75 1.193-1.193 2.557 2.557 5.558-5.557 1.196 1.19-6.754 6.753Z"></path>
                                </svg>
                            : <svg width="25" height="25" fill="var(--error)" viewBox="0 0 24 24" xmlns="http://www.w3.org/2000/svg">
                                    <path d="M12 1.5A10.436 10.436 0 0 0 1.5 12 10.436 10.436 0 0 0 12 22.5 10.436 10.436 0 0 0 22.5 12 10.436 10.436 0 0 0 12 1.5Zm4.084 15.75L6.75 7.917 7.917 6.75l9.333 9.334-1.166 1.166Z"></path>
                                </svg>
                        }
                        <p className="alert__text">{text}</p>
                    </div>
                    : null
            }
        </>
    )
}

export default Alert;