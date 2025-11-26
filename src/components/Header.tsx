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

    return (
        <div>
        <div style={{textAlign: "center"}}>            
            <div>Header Click Redux Status : {status}
                <h1>Welcome,{headerProps.username} !</h1>               
            <div>
                <div>
            <nav>
                <ul>
                    <li><Link to="/">Login</Link></li>
                    <li><Link to="/home">Home</Link></li>   
                </ul>
            </nav>
            </div>
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