// Refer https://learn.microsoft.com/en-us/azure/active-directory-b2c/enable-authentication-react-spa-app
//1. install msal packages -- npm install @azure/msal-browser @azure/msal-react

//2. Configure authConfig.js
export const msalConfig = {
    auth : {
        clientId: "37854533-cd62-46c5-90bd-5f9c61662299", // Application (client) ID from the Azure portal
        authority: "https://login.microsoftonline.com/mediapkagmail.onmicrosoft.com/",//"https://your-tenant-name.b2clogin.com/mediapkagmail.onmicrosoft.com/default", // Your B2C authority
        redirectUri: "http://localhost:3000/", // Your redirect URI  
    },
    cache: {
    cacheLocation: "localStorage", // or sessionStorage
    storeAuthStateInCookie: false, 
    cacheExpirationMilliseconds: 1000 // 1 hour
  }
};

export const loginRequest = {
   // scopes: ["openid", "profile", "User.Read"] // Add the scopes you need
     scopes: ["api://37854533-cd62-46c5-90bd-5f9c61662299/.default"]
};

// 3. Configure index.js to wrap your app with MsalProvider
// import { MsalProvider } from "@azure/msal-react";
// import { PublicClientApplication } from "@azure/msal-browser";
// import { msalConfig } from "./authConfig";