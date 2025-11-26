import { useState , useEffect , useMemo } from "react"; 
import { useNavigate } from "react-router-dom";
import contextUser from './contextUser';
//creating a simple login component 

const Login : React.FC = () => {

     const navigate = useNavigate();
    let [username, setUsername] = useState<string>('');
    let [password, setPassword] = useState<string>(''); 

    function handleUsernameChange(event: React.ChangeEvent<HTMLInputElement>) {
        setUsername(event.target.value);
    }
 function handlePasswordChange(event: React.ChangeEvent<HTMLInputElement>) {
        setPassword(event.target.value);
    }


    function submitForm(event: React.FormEvent) {
        event.preventDefault();
        // Handle form submission logic here
        console.log('Username:', username);
        console.log('Password:', password);

        if(username === "admin" && password === "admin") {
            alert("Login Successful");
            //How to pass user data to another component after login
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

           <contextUser.Provider value={username}>
            <div className="container">
            <h2>Login Page</h2>
            <form  onSubmit={submitForm}><br/>
            <input type="text" placeholder="Username" value={username} onChange={handleUsernameChange} /><br/>
            <input type="password" placeholder="Password" value={password} onChange={handlePasswordChange} /><br/>
            <button type="submit">Login</button><br/>
            </form>
            </div>
            </contextUser.Provider>
            );
        };


export default Login;