import InputField from "../inputField/inputField"
import { useState } from "react"
import emailIcon from '../../assets/email-icon.svg'
import pwdIcon from '../../assets/password-icon.svg'
import styles from './loginForm.module.css'
import { useNavigate } from "react-router"
import Cookies from 'js-cookie'
import axios from "axios"

const LoginForm = () => {

    const navigate = useNavigate()

    const [email,setEmail] = useState("")
    const [password,setPassword] = useState("")

    const handleSubmit = async (e) => {
        e.preventDefault()
        const user = {email ,password }
        try {
            const response = await fetch('http://localhost:4000/api/auth/login',{
                method: 'POST',
                body: JSON.stringify(user),
                headers: {
                    'Content-Type': 'application/json'
                }
            });
            const json = await response.json();
            
            if (!response.ok) {
                
                const errorMessage = json.message || 'Login failed! Please try again.';
                alert(errorMessage);
                return;
            }
        
            Cookies.set('token', json.token);
            Cookies.set('id', json.user._id);
            navigate('/home')
            
        } catch (err) {
            alert('Oops! Failed to connect to the API.');
        }
          
    }

    return ( 
        <div className={styles.container}>
            <form className={styles.formContainer}>
                <span className={styles.label}>Email address</span>
                <InputField 
                    icon={emailIcon} 
                    type="email"
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}}
                    placeholder="example@email.com"
                />
                <span className={styles.label}>Password</span>
                <InputField 
                    icon={pwdIcon} 
                    type="password"
                    value={password}
                    onChange={(e) => {setPassword(e.target.value)}}
                    placeholder="Enter your password"
                />
                <a>Forgot password?</a>
                <button className={styles.loginButton} onClick={handleSubmit}>Login now</button>
            </form>
        </div>
     );
}
 
export default LoginForm;