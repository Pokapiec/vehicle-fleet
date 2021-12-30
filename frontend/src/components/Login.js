import React, { useContext, useState } from 'react';
import '../styles/Login.scss';
import { useForm } from 'react-hook-form';
import { Authenticated } from '../Context';
import axiosInstance from '../axios.js';
import { useHistory } from 'react-router-dom';


const Login = () => {
    const history = useHistory();
    const { loggedIn, setloggedIn } = useContext(Authenticated)
    const [warning, setwarning] = useState(false);
    const { register, handleSubmit, formState: { errors } } = useForm();
    const submition = async (data) => {
        try {
            setwarning(false)
            const res = await axiosInstance.post('token/', {
                email: data.login,
                password: data.password,
            })
            console.log(res)
            localStorage.setItem('access_token', res.data.access);
            localStorage.setItem('refresh_token', res.data.refresh);
            localStorage.setItem('is_refreshing', false);
            axiosInstance.defaults.headers['Authorization'] =
                'JWT ' + localStorage.getItem('access_token');

            setloggedIn(true)
            localStorage.setItem('loggedIn', true);
            console.log(data)
            history.push('/')
        } catch (error) {
            setwarning(true)
        }
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
                {warning && <p>Złe dane logowania</p>}

                <input className='submit-btn' type="submit" value="Zatwierdź" />
            </form>
        </main>
    );
}

export default Login;
