import { useState } from 'react';
import {BrowserRouter , Switch, Route} from 'react-router-dom';
import Navbar from './Components/Navbar';
import WeddingDetail from './Components/WeddingDetails';
import Dashboard from './Components/Dashboard';
import GuestList from './Components/GuestList';
import ToDo from './Components/ToDo';
import Signup from './Components/Signup';
import Login from './Components/Login'
import FirstPage from './Components/FirstPage';


function App() {
  const [wedData, setwedData] = useState([])


  function wedDetails(wedDetail){
    // console.log(wedDetail)
    setwedData([...wedData, wedDetail])
    console.log(wedData)
  }
  //  wedDetails = (wedDetail) =>{
  //   setwedDetails([...wedDetails, wedDetail])
  // }

  return (
    <>
        {/* <Dashboard wedData={wedData}/>
        <WeddingDetail  wedDetails={wedDetails}/>  
         <GuestList/>
         <ToDo/> */}

         <BrowserRouter>
            

            <Switch>
                <Route path="/" exact render={()=>( <FirstPage/>)} />
                <Route path="/dashboard" exact render={(props)=>( <Dashboard {...props} wedData={wedData}/>)} />
                <Route path="/wedding-details" exact render={(props)=>( <WeddingDetail {...props} wedDetails={wedDetails}/>)} />
                <Route path="/guest-list" exact render={()=>( <GuestList/>)} />
                <Route path="/todo-list" exact render={()=>( <ToDo/>)} />
                <Route path="/signup" exact render={()=>( <Signup/>)}/>
                <Route path="/login" exact render={()=>( <Login/>)}/>
            </Switch>
         </BrowserRouter>

    </>
  )
}

export default App
