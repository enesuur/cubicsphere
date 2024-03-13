import { useState } from 'react';
import './Register.css';
import { NavLink } from 'react-router-dom';

export default function Register(){
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
            <div className='register container'>
            <form action='#'>
                <h1>Register an account</h1>
                <p >You look newbie here.C'mon join us!</p>
                <label htmlFor='username'>Username
                    <input type='text' placeholder='Username' onChange={handleFormChange}/>
                </label>
                <label htmlFor='email'>Email
                    <input type='email' placeholder='Email Address' onChange={handleFormChange} />
                </label>
                <label htmlFor='password'>Password
                    <input type='Password' placeholder='password' onChange={handleFormChange}/>
                </label>

                <label htmlFor='confirmPassword'>Confirm Password
                    <input type='password' placeholder='Confirm Password' onChange={handleFormChange}/>
                </label>

                <button>Register</button>
                <hr/>
                <span>Do you have an account ? <NavLink to={"/login"}>Login</NavLink></span>
                
            </form>
            </div>

        </section>
    )
}