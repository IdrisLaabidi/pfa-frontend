//import components
import InputField from '../inputField/inputField'
import Modal from '../modal/Modal'
//import css styles
import styles from './registerForm.module.css'
//import icons
import userIcon from '../../assets/user-icon.svg'
import emailIcon from '../../assets/email-icon.svg'
import pwdIcon from '../../assets/password-icon.svg'

import { useState } from 'react';
import { useNavigate } from 'react-router'
import useRegister from '../../hooks/useRegister'


const RegisterForm = () => {

    const navigate = useNavigate()
    const[email,setEmail] = useState("")
    const[password,setPassword] = useState("")
    const[confirmPwd,setConfirmPdw] = useState("") 
    const[fname,setFname] = useState("") 
    const[lname,setLname] = useState("") 
    const[role,setRole] = useState("member")
    const[error,setError] = useState(null)
    const[isOpen,setIsOpen] = useState(false)

    const handleSubmit = async (e) => {
        e.preventDefault()
        let firstName = fname
        let lastName = lname
        const user = {email ,firstName, lastName, password ,role}

        if(password !== confirmPwd){
            setError("Password does not match")
            setIsOpen(true)
        }else{
            try{
                const response = await fetch('http://localhost:4000/api/auth/createuser',{
                    method : 'POST',
                    body : JSON.stringify(user),
                    headers : {
                        'Content-Type' : 'application/json'
                    },
                    credentials : "include"
                })
                const json = await response.json()

                if(!response.ok){
                    setError(json.message)
                    setIsOpen(true)
                }
                if(response.ok){
                    console.log("user added" , json)
                    localStorage.setItem("user_id",json._id)
                    sessionStorage.setItem("user",JSON.stringify(json))
                    navigate('/')
                }
            }catch(err){
                setError("Failed to connect to the api")
                setIsOpen(true)
            }
        }
    }

    return ( 
        <div className={styles.container}>
            <form className={styles.formContainer} onSubmit={handleSubmit}>
                <span className={styles.label}>Full Name</span>
                <div className={styles.firstLine}>
                    <InputField
                        value={fname}
                        onChange={(e) => {setFname(e.target.value)}}
                        icon={userIcon}
                        type="text"
                        placeholder="First Name"
                        required
                    />
                    <InputField
                        value={lname}
                        onChange={(e) => {setLname(e.target.value)}}
                        icon={userIcon}
                        type="text"
                        placeholder="LastName"
                        required
                    />
                </div>
                <span className={styles.label}>Email</span>
                <InputField
                    value={email}
                    onChange={(e) => {setEmail(e.target.value)}}
                    icon={emailIcon}
                    type="email"
                    placeholder="example@email.com"
                    required
                />
                <span className={styles.label}>Password</span>
                <InputField
                    value={password}
                    onChange={(e) => {setPassword(e.target.value)}}
                    icon={pwdIcon}
                    type="password"
                    placeholder="Enter your password"
                    required
                />
                <span className={styles.label}>Confirm password</span>
                <InputField
                    value={confirmPwd}
                    onChange={(e) => {setConfirmPdw(e.target.value)}}
                    icon={pwdIcon}
                    type="password"
                    placeholder="Enter your password"
                    required
                />
                <span className={styles.label}>Register As</span>
                <div className={styles.roleCont}>
                    <button 
                        className={`${role === 'leader' ? `${styles.activeRoleButton}` :`${styles.roleButton}` }`}
                        onClick={ (e) => {e.preventDefault();
                            setRole("leader");} }
                    >Project Manager</button>
                    <button 
                        className={`${role === 'member' ? `${styles.activeRoleButton}` :`${styles.roleButton}` }`}
                        onClick={ (e) => {e.preventDefault();
                            setRole("member");} }
                    >Member</button>
                </div>
                <button className={styles.registerButton}>Register</button>
            </form>
            <Modal title='Warning' open={isOpen} onClose={()=>{
            setError(null)
            setIsOpen(false)
            }}><span className={styles.error}>Failed to Register : {error}</span></Modal>
        </div>
     );
}
 
export default RegisterForm;