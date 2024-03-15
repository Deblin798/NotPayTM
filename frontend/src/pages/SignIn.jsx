import { useState } from "react"
import BottomWarning from "../components/BottomWarning"
import Button from "../components/Button"
import Heading from "../components/Heading"
import InputBox from "../components/InputBox"
import SubHeading from "../components/SubHeading"
import axios from 'axios'
import { useNavigate } from "react-router-dom"

const SignIn = () => {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();
  const navigate = useNavigate();
  const headers = {
    'Authorization': localStorage.getItem('token')
  }
  const handleSignIn = async() => {
    const response = await axios.post("http://localhost:3000/api/v1/user/signin", {
      username,
      password
    }, {headers: headers})
    localStorage.setItem('token', response.data.token)
    navigate('/dashboard')
  }
  return (
    <div className="bg-slate-300 h-screen flex justify-center">
      <div className="flex flex-col justify-center">
        <div className="rounded-lg bg-white w-80 text-center p-2 h-max px-4">
          <Heading title={"Sign In"} />
          <SubHeading title={"Enter your credentials to access your account"} />
          <InputBox label={"Email"} placeHolder={"john.doe@xyz.com"} onChange={(e) => setUsername(e.target.value)}/>
          <InputBox label={"Password"} placeHolder={"123456"} onChange={(e) => setPassword(e.target.value)}/>
          <div className="pt-4">
            <Button title={"Sign In"} onClick={handleSignIn} />
          </div>
          <BottomWarning
            buttonText={"Sign Up"}
            label={"Don't have an account?"}
            to={"/signup"}
          />
        </div>
      </div>
    </div>
  )
}

export default SignIn