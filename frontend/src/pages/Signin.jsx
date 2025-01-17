import { BottomText } from "../components/BottomText";
import { Button } from "../components/Button";
import { Heading } from "../components/Heading";
import { InputBox } from "../components/InputBox";
import { SubHeading } from "../components/SubHeading";

export function Signin (){
    return <div className="bg-slate-300 h-screen flex justify-center">
        <div className="flex flex-col justify-center">
            <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
                <Heading label={"Sign in"}></Heading>
                <SubHeading label={"Enter your credentials to access the account"}></SubHeading>
                <InputBox placeholder={"johndoe@example.com"} label={"Email"}></InputBox>
                <InputBox type={"password"} label={"Password"}></InputBox>
                <div className="pt-4">
                    <Button label={"Sign in"}></Button>
                </div>
                <BottomText label={"Don't have an account?"} buttonText={"Sign up"} to={"/signup"}></BottomText>
            </div>
        </div>
    </div>
}