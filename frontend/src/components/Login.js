import React, { useContext } from 'react';
import '../styles/Login.scss';
import { useForm } from 'react-hook-form';
import { Authenticated } from '../Context';


const Login = () => {
    const {loggedIn, setloggedIn} = useContext(Authenticated)
    const { register, handleSubmit, formState: { errors } } = useForm();
    const submition = data => {
        console.log(loggedIn)
        setloggedIn(true)
        console.log(data)
    };

    return (
        <main className='auth-form'>
            <h2>Zaloguj się</h2>
            <form onSubmit={handleSubmit(submition)}>
                <label htmlFor="login">Login</label>
                <input name='login' className='field' type="text" placeholder='Login' {...register('login', { required: true, message: "Dont Forget Your Username Should Be Cool!", })} />
                <label htmlFor="password">Hasło</label>
                <input name='password' className='field' type="password" placeholder='Hasło' {...register('password', { required: true, message: 'Incorrect password', minLength: 4 })} />
                {errors.login && <p>Login jest wymagany</p>}
                {errors.password && <p>Hasło musi zawierać conajmniej 4 znaki</p>}
                <input className='submit-btn' type="submit" value="Zatwierdź" />
            </form>
        </main>
    );
}

export default Login;
