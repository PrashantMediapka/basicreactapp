import { useMsal } from "@azure/msal-react";



function AzAuthLogin() {
    const { instance } = useMsal();

    const handleLogin = () => {
        instance.loginPopup().then((response) => {
            console.log("Login successful:", response);
        }).catch((error) => {
            console.error("Login failed:", error);
        });
    }

    return (    
        <button onClick={handleLogin}>Login</button>
    );
}

export default AzAuthLogin;