import { useState } from "react"
import { BottomText } from "../components/BottomText"
import { Button } from "../components/Button"
import { Heading } from "../components/Heading"
import { InputBox } from "../components/InputBox"
import { SubHeading } from "../components/SubHeading"
import { default as axios } from 'axios';

export const Signup = () => {
  const [username, setUsername] = useState('')
  const [firstName, setFirstName] = useState('')
  const [lastName, setLastName] = useState('')
  const [password, setPassword] = useState('')

  async function onSignup(){
    const userData = {
      firstname: firstName,
      lastname: lastName,
      username: username,
      password: password
    }

    try {
      const response = await axios.post('//localhost:3000/api/v1/user/signup',userData)
      console.log(response.data)
      localStorage.setItem("token", "Bearer "+response.data.token)
      alert("Account Successfully created! Redirecting to signin page.")
    } catch (error) {
      console.error(error)
    }
  }

    return <div className="bg-slate-300 h-screen flex justify-center">
    <div className="flex flex-col justify-center">
      <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
        <Heading label={"Sign up"} />
        <SubHeading label={"Enter your infromation to create an account"} />
        <InputBox value={firstName} onChange={(e)=> setFirstName(e.target.value)} placeholder="John" label={"First Name"} />
        <InputBox placeholder="Doe" label={"Last Name"} value={lastName} onChange={(e)=>setLastName(e.target.value)}/>
        <InputBox placeholder="johndoe@example.com" label={"Email"} value={username} onChange={(e)=> setUsername(e.target.value)}/>
        <InputBox type={"password"} label={"Password"} value={password} onChange={(e)=>setPassword(e.target.value)}/>
        <div className="pt-4">
          <Button onClick={onSignup} label={"Sign up"} to={"/signin"}/>
        </div>
        <BottomText label={"Already have an account?"} buttonText={"Sign in"} to={"/signin"} />
      </div>
    </div>
  </div>
}