import React from "react";
import { useMutation, useQuery } from "@apollo/client";
import { LOGIN_USER } from "../../graphQl/mutation";
import { MY_PROFILE } from "../../graphQl/queries";

const Login = () => {
  const [loginUser, { data, loading, error }] = useMutation(LOGIN_USER);
  const { data: myProfileData } = useQuery(MY_PROFILE);

    const handleSubmit = async(e: any) => {
        e.preventDefault()
        const email:any = document?.getElementById('email');
        const password:any = document.getElementById('password');
        console.log("email pasword", email?.value, password)
        try {
            const response = await loginUser({
              variables: { email: email?.value, password: password?.value },
            });
            console.log('Login successful:', response.data?.loginUser?.token);
            localStorage.setItem('authToken', JSON.stringify(response.data?.loginUser?.token))
          } catch (err) {
            console.error('Error during login:', err);
          }
    }
  const handleProfile = async () => {
    //    await myProfile();
  };
  return (
    <>
    <form>
        <input type="text" id='email' defaultValue={"maheshvar@yopmail.com"}/>
        <input type="password" id='password' defaultValue={"Test@123"}/>
        <button type='submit' onClick={handleSubmit}>Submit</button>
    </form>
    {/* <button onClick={handleProfile}>Get Profile</button> */}
    </>
  );
};

export default Login;
