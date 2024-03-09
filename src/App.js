import { BrowserRouter , Routes, Route } from "react-router-dom"; // import react router dom
//import the theme variables 
import './Themes/Themes'
//import pages 
import HomePage from "./pages/dashboard/dashboardPage";
import LoginPage from "./pages/login/loginPage";
import RegisterPage from "./pages/register/registerPage";
import Test from "./test";
import Layout from "./components/layout/layout";



function App() {

  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage/>}/>
          <Route path="/Register" element={<RegisterPage />}/>
          <Route index path="/Home" element={ <Layout path={'/projects'} children={<HomePage/>} title={'home page'} /> } />
          <Route path="/Tasks" element={ <Layout path={'/tasks'} children={<HomePage/>} title={'tasks'} /> } />
          <Route path="/test" element={ <Test/>}/>
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;