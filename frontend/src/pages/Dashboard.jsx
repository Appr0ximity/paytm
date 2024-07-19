import { AppBar } from "../components/AppBar";
import { Balance } from "../components/Balance";

export function Dashboard (){
    return <div>
        <AppBar></AppBar>
        <Balance value={"10,000"}></Balance>
    </div>
}