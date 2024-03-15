import { useState } from "react";
import BottomWarning from "../components/BottomWarning";
import Button from "../components/Button";
import Heading from "../components/Heading";
import InputBox from "../components/InputBox";
import SubHeading from "../components/SubHeading";
import axios from 'axios'
import { useNavigate } from "react-router-dom";

const SignUp = () => {
  const [firstName, setFirstName] = useState();
  const [lastName, setLastName] = useState();
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const handleSignUp = async() => {
    const response = await axios.post("http://localhost:3000/api/v1/user/signup", {
      username,
      password,
      firstName,
      lastName
    })
    if(response.data.token){
      localStorage.setItem("token",response.data.token);
      navigate("/signin")
    } else{
      console.log(response.data.message);
    }
  }
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading title={"Sign Up"} />
          <SubHeading title={"Enter your information to create an account"} />
          <InputBox label={"First Name"} placeHolder={"John"} onChange={(e) => setFirstName(e.target.value)}/>
          <InputBox label={"Last Name"} placeHolder={"Doe"} onChange={(e) => setLastName(e.target.value)}/>
          <InputBox label={"Email"} placeHolder={"john.doe@xyz.com"} onChange={(e) => setUsername(e.target.value)}/>
          <InputBox label={"Password"} placeHolder={"123456"} onChange={(e) => setPassword(e.target.value)}/>
          <div className="pt-4">
            <Button title={"Sign Up"} onClick={handleSignUp}/>
          </div>
          <BottomWarning
            buttonText={"Sign In"}
            label={"Already have an account?"}
            to={"/signin"}
          />
        </div>
      </div>
    </div>
  );
};

export default SignUp;
