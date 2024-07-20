import {useEffect, useState} from "react"
import { Button } from "./Button"
import axios from "axios"

export function Users(){
    const [users, setUsers] = useState([])
    const [filter, setFilter] = useState('')

    useEffect(()=>{
        axios.get(`//localhost:3000/api/v1/user/bulk?filter=${filter}`).then(
            response=>{
                setUsers(response.data.user)
            }
        )
    },[filter])

    return<div className="grid grid-cols-1 m-2 mx-3">
        <div className="font-bold text-xl px-1 pb-3">
            Users
        </div>
        <div>
            <input onChange={(e)=>{
                setFilter(e.target.value)
            }} placeholder="Search users.." className="w-full border border-gray-200 rounded-md p-2"></input>
        </div>
        <div className="mt-2">
            {users.map(user=> <UserRender user={user}/>)}
        </div>
    </div>
}

function UserRender({user}){
    return (
        <div className="flex justify-between">
        <div className="flex">
            <div className="rounded-full h-12 w-12 bg-slate-200 flex justify-center mt-1 mr-2">
                <div className="flex flex-col justify-center h-full text-xl">
                    {user.firstName[0]}
                </div>
            </div>
            <div className="flex flex-col justify-center h-ful">
                <div>
                    {user.firstName} {user.lastName}
                </div>
            </div>
        </div>

        <div className="flex flex-col justify-center h-ful">
            <Button label={"Send Money"} to={"/send"} />
        </div>
    </div>
    )
}