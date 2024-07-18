import {BrowserRouter, Route, Routes} from "react-router-dom"
import {Signup} from "./pages/Signup"
import {Signin} from "./pages/Signin"
import { AppBar } from "./components/AppBar"
import { Balance } from "./components/Balance"
import { Users } from "./components/Users"


function App() {

  return (
    <>
    <AppBar></AppBar>
    <Balance value={"10,000"}></Balance>
    <Users></Users>
    <BrowserRouter>
      <Routes>
        <Route path="/signup" element={<Signup/>}/>
        <Route path="/signin" element={<Signin/>}/>
        {/* <Route path="/dashboard" element={<Dashboard/>}/>
        <Route path="/send" element={<SendMoney/>}/> */}
      </Routes>
    </BrowserRouter>
    </>
  )
}

export default App
