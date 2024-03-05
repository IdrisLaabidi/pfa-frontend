import styles from './login.module.css' //import the css module 
//import images 
import logo from '../../assets/logo.png'
import image from '../../assets/loginPageImage.jpg'
//import components
import LoginForm from '../../components/loginForm/loginForm'
import OrDivider from '../../components/orDivider/orDivider'
import { useNavigate } from 'react-router'


const LoginPage = () => {
    const navigator = useNavigate()
    return (  
        <>
            <div className={styles.container}>
                <div className={styles.formContainer}> 
                    <img className={styles.logo} src={logo} alt="logo"  />
                    <h3 className={styles.title}>Login into your account</h3>
                    <LoginForm/>
                    <OrDivider/>
                    <button className={styles.signUpButton} onClick={()=>navigator('/register')}>Sign up now</button>
                </div>
                <figure className={styles.imageCont}>
                    <img className={styles.image} src={image} alt="zina"/>
                </figure>
            </div>
        </>
    );
}
 
export default LoginPage;