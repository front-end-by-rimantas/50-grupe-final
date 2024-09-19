import { useState } from "react";
import { Footer } from "../components/footer/Footer";
import { Header } from "../components/header/Header";

export function Register() {
    const minUsernameLength = 3;
    const maxUsernameLength = 20;
    const minPasswordLength = 12;
    const maxPasswordLength = 100;

    const [username, setUsername] = useState('');
    const [usernameError, setUsernameError] = useState('');
    const [password, setPassword] = useState('');
    const [passwordError, setPasswordError] = useState('');
    const [isFormValidated, setIsFormValidated] = useState(false);
    const [apiResponse, setApiResponse] = useState(null);

    function submitForm(e) {
        e.preventDefault();

        setIsFormValidated(true);

        let usernameError = '';
        if (username.length < minUsernameLength) {
            usernameError = `Slapyvardis yra per trumpas, turi būti minimum ${minUsernameLength} simbolių`;
        } else if (username.length > maxUsernameLength) {
            usernameError = `Slapyvardis yra per ilgas, turi būti maximum ${maxUsernameLength} simbolių`;
        }
        setUsernameError(usernameError);

        let passwordError = '';
        if (password.length < minPasswordLength) {
            passwordError = `Slaptažodis yra per trumpas, turi būti minimum ${minPasswordLength} simbolių`;
        } else if (password.length > maxPasswordLength) {
            passwordError = `Slaptažodis yra per ilgas, turi būti maximum ${maxPasswordLength} simbolių`;
        }
        setPasswordError(passwordError);

        if (!usernameError && !passwordError) {
            fetch('http://localhost:5020/api/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    username,
                    password,
                }),
            })
                .then(res => res.json())
                .then(data => setApiResponse(data))
                .catch(err => console.error(err));
        }
    }

    return (
        <>
            <Header />
            <main className="form-signin container">
                <div className="row">
                    <form onSubmit={submitForm} className="col-12 col-md-8 offset-md-2 col-lg-6 offset-lg-3 col-xl-4 offset-xl-4">
                        <h1 className="h3 mb-3 fw-normal">Registracija</h1>

                        {apiResponse && apiResponse.status === 'success' ? <p className="alert alert-success">{apiResponse.msg}</p> : null}
                        {apiResponse && apiResponse.status === 'error' ? <p className="alert alert-danger">{apiResponse.msg}</p> : null}

                        <div className="form-floating">
                            <input value={username} onChange={e => setUsername(e.target.value.trim())}
                                type="text" id="username" placeholder="Chuck"
                                className={'form-control ' + (isFormValidated ? usernameError ? 'is-invalid' : 'is-valid' : '')} />
                            <label htmlFor="username">Spapyvardis</label>
                            {usernameError && <p className="invalid-feedback">{usernameError}</p>}
                        </div>

                        <div className="form-floating">
                            <input value={password} onChange={e => setPassword(e.target.value)}
                                type="password" id="password" placeholder="Password"
                                className={'form-control ' + (isFormValidated ? passwordError ? 'is-invalid' : 'is-valid' : '')} />
                            <label htmlFor="password">Spaltažodis</label>
                            {passwordError && <p className="invalid-feedback">{passwordError}</p>}
                        </div>

                        <button className="btn btn-primary w-100 py-2 mt-3" type="submit">Registruotis</button>
                    </form>
                </div>
            </main>
            <Footer />
        </>
    );
}
