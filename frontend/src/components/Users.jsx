import {useState} from "react"

export function Users(){
    const [user, setUser] = useState([])

    return<div className="grid grid-cols-1 m-2 mx-3">
        <div className="font-bold text-xl px-1 pb-3">
            Users
        </div>
        <div>
            <input placeholder="Search users.." className="w-full border border-gray-200 rounded-md p-2"></input>
        </div>
        <div>

        </div>
    </div>
}

function userRender(){
    
}