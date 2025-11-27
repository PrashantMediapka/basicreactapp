import React, { useEffect }  from 'react';
import { useLocation } from 'react-router-dom';
import Header from './Header';
import axios from 'axios';
import { useContext } from "react";
import contextUser from './contextUser';
import { useSelector } from 'react-redux';



export interface HeaderProps {
    username: string;
 }

export interface Products {
    id: number;
    title: string;
    description: string;
 }


const Home : React.FC = () => {
      const [products, setProducts] = React.useState<Products[] | null>(null);
    const [txtFromChild, setTxtFromChild] = React.useState<string>('');
    
    //1. using useLocation to get data passed from another component
    const location = useLocation();
    const user = location.state?.user; 
    console.log("User in Home:", user);
     
     //2. using Local Storage to get data passed from another component
    const userlocalStorage = localStorage.getItem("user") ;
    console.log("User from Local Storage in Home:", userlocalStorage);

     //3. useContext can also be used to get data from another component
      const userFromContext = useContext(contextUser);
      console.log("User from Context in Home:", userFromContext);

    //4. using Redux to get data from another component
    const status = useSelector((state:any) => state.homeSlice.status);
        console.log("User from Redux in Home:", status);

    const headerInfo: HeaderProps = {
        username: user
    };

    useEffect(() => {
        
        if(!user){
            console.log("No user found, redirecting to login.");
            window.location.href = '/';
        }
        else
            {               
             getData();
            }     
    }, []);

    const getData = async () => {
        console.log("Fetching data for user:", user);

        try {
        const response : any = await axios.get<Promise<Products>>(`https://dummyjson.com/products/`);   
        const products: Products[] = response.data.products;
        setProducts(products);            
        console.log("Products  fetched:",products); 
        }
        catch (error) {
            console.error("Error fetching data:", error);
        }   
        finally {
            console.log("Data fetch attempt completed.");
        }   
    };

    function getDataFromChild(sentFromChild: string) {
       // alert("sentFromChild");
       setTxtFromChild(sentFromChild);
    }


    return(
        <div className="container"> 
        <Header headerProps={headerInfo}   sendToParent={getDataFromChild} />
        <div>{txtFromChild} </div>
        <div><h3> Welcome to Home</h3></div>
        <br /> <br /> <br /> Home Redux Status : {status}<br /> <br />
        <div style={{display:'flex', flexWrap:'wrap', justifyContent:'center',flexDirection:'row'}}>
            {products && products.length > 0 ? ( products.map((product) => (
                    <div key={product.id} style={{border: '1px solid black', margin: '10px', padding: '10px'}}>
                    <div>{product.title}</div>
                    <div>{product.description}</div>
                </div>
            ))) : (
                <p>Loading product details...</p>
            )}  
        </div>
        </div>
    );

};

export default Home;