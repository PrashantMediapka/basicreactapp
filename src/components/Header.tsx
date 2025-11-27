import React from 'react';
import { Link } from 'react-router-dom';
import '../App.css';        
import { useDispatch , useSelector } from 'react-redux';
import { setStatus } from '../redux-store/redux-homeSlice';

const Header : React.FC<any> = ({headerProps, sendToParent}) => {

    //console.log("Header Props:", headerProps);
    function sendData() {
        sendToParent('Received Data in Parent from Child Header using props');        
    }

// Using Redux to get and update data in Header component
const dispatch = useDispatch();
const status = useSelector((state:any) => state.homeSlice.status);    
const updateReduxData = () => {
    dispatch(setStatus('Loading...'));
    console.log("Redux State Username:", status);
}

// Logoout 
const logOut = () => {
    localStorage.removeItem("user");
    window.location.href = '/';
}

    return (
        <div>
        <div style={{textAlign: "center"}}>            
            <div>Header Click Redux Status : {status}
                <h1>Welcome,{headerProps.username} !</h1>               
            <div>
            <nav>
                <ul style={{ backgroundColor: 'lightgray', border: '1px solid black', display:'flex', justifyContent:'left', alignItems:'left',flexDirection:'row' }}>
                    <li><Link to="/" style={{padding:'10px'}}>Login</Link></li>
                    <li><Link to="/home" style={{padding:'10px'}}>Home</Link></li>  
                     <li><input type='button' style={{padding:'10px'}} onClick={logOut} value="Logout" /></li>    
                </ul>
            </nav>
            </div>          
       </div>
       <div>
         <input type="button" name="b1" onClick={sendData} value="PROPS : SendFromChildHeaderToParentHome" />  
         </div>
            <div><br/>
        <input type="button" name="b2" onClick={updateReduxData} value="REDUX : DispatchStatus" />  
       </div> 
       </div>
       </div>
    );

};
export default Header;