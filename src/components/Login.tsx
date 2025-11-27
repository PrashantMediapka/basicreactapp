import { useState , useEffect , useMemo } from "react"; 
import { useNavigate } from "react-router-dom";
import contextUser from './contextUser';
import AzAuthLogin from "./AzAuthLogin";
//creating a simple login component 

const Login : React.FC = () => {

     const navigate = useNavigate();
    let [username, setUsername] = useState<string>('');
    let [password, setPassword] = useState<string>(''); 


    function submitForm(event: React.FormEvent) {
        event.preventDefault();
        //CLEAR ANY EXISITNG sTOARGE
        localStorage.removeItem("user");


        if(username === "admin" && password === "admin") {
            alert("Login Successful");
            //1. using Props in Navigate to pass data to another component
            navigate('home', {state: {user: username}});

            //set User in Local Storage
            localStorage.setItem("user", username);

            //useContext can also be used to pass data to another component
            setUsername(username);

        } else {
            alert("Invalid Credentials");
        };
    }

    return (
           <contextUser.Provider value={username}> {/*This is for using useContext to pass data  to another component*/ }
            <div className="container">
            <h2>Forms Login Page</h2>
            <form  onSubmit={submitForm}><br/>
            <input type="text" placeholder="Username" value={username} onChange={e => setUsername(e.target.value)} /><br/>
            <input type="password" placeholder="Password" value={password} onChange={e => setPassword(e.target.value)} /><br/>
            <button type="submit">Login</button><br/>
            </form>
            </div>
            <br/>                        

            //Azure AD Login
            <AzAuthLogin /> 
            </contextUser.Provider>
            );

        };


export default Login;