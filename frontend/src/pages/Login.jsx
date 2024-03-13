import { NavLink } from 'react-router-dom';
import { useState } from 'react';
import './Login.css';

export default function Login(){
    const [formData,setFormData] = useState({
        userName:'',
        email:'',
        password:'',
    });

    function handleFormChange(e){
        const {name,value} = e.target;
        setFormData((prevData) => ({
          ...prevData,
          [name]:value,
        }));
      }
    return(
        <section>
            <div className='login container'>
            <form action='#'>
                <h1>Login your account</h1>
                <p >Welcome back to CubicSphere</p>
                <label htmlFor='email'>Email
                    <input type='email' placeholder='Email Address' onChange={handleFormChange} />
                </label>
                <label htmlFor='password'>Password
                    <input type='Password' placeholder='Password' onChange={handleFormChange}/>
                </label>
                <button>Login</button>
                <hr/>
                <span>Don't you have an account ? <NavLink to={"/register"}>Register</NavLink></span>
            </form>
            </div>

        </section>
    )
}