import React, { useState } from 'react'
import {Link, useNavigate} from 'react-router-dom'
import { GoogleLogin, GoogleOAuthProvider } from '@react-oauth/google';
import axios from 'axios';
import { toast } from 'react-toastify';
const Login = () => {
  let navigate = useNavigate()
  let CLIENT_ID = import.meta.env.VITE_CLIENT_ID
    const [details, setdetails] = useState({
      
        email: "",
        password: ""
    });

    const handleChange = (e) => {
        setdetails({ ...details, [e.target.name]: e.target.value })
    }

    const handleSubmit = async(e) => {
      e.preventDefault()
      console.log(details)
      let res = await axios.post('http://localhost:8080/api/login',details)
      if(res.data.success){
          navigate('/')
          toast.success(res.data.msg,{position:'top-center'})
      }else{
          toast.error(res.data.msg)
      }
    }
    const handelLogin = async (googleData) => {
        try {
          const res = await fetch("http://localhost:8080/api/google-login", {
            method: "POST",
            body: JSON.stringify({ token: googleData }),
            headers: { "Content-Type": "application/json" },
          });
    
          if (!res.ok) {
            throw new Error("Failed to log in with Google");
          }
          const data = await res.json();
        //   setLoginData(data);
        console.log("data = ", data)
          localStorage.setItem("loginData", JSON.stringify(data));
        } catch (error) {
          console.error("Error logging in:", error);
        }
      };
  return (
    <div>
    <div className="py-6">
  <div className="flex bg-white rounded-lg shadow-lg overflow-hidden mx-auto max-w-sm lg:max-w-4xl">
    <div className="hidden lg:block lg:w-1/2 bg-cover" style={{backgroundImage: 'url("https://images.unsplash.com/photo-1546514714-df0ccc50d7bf?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=667&q=80")'}} />
    <div className="w-full p-8 lg:w-1/2">
      <h2 className="text-2xl font-semibold text-gray-700 text-center">Brand</h2>
      <p className="text-xl text-gray-600 text-center">Welcome back!</p>
      <a href="#" className="flex items-center justify-center mt-4 text-white rounded-lg shadow-md hover:bg-gray-100">
      
        <GoogleOAuthProvider clientId={CLIENT_ID}>
                                <GoogleLogin
                                    onSuccess={credentialResponse => {
                                        handelLogin(credentialResponse.credential);
                                        console.log(credentialResponse);
                                    }}
                                    onError={() => {
                                        console.log('Login Failed');
                                    }}
                                />
                            </GoogleOAuthProvider>
      </a>
      <div className="mt-4 flex items-center justify-between">
        <span className="border-b w-1/5 lg:w-1/4" />
        <a href="#" className="text-xs text-center text-gray-500 uppercase">or login with email</a>
        <span className="border-b w-1/5 lg:w-1/4" />
      </div>
      <div className="mt-4">
        <label className="block text-gray-700 text-sm font-bold mb-2">Email Address</label>
        <input className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" onChange={handleChange} name='email' type="email" />
      </div>
      <div className="mt-4">
        <div className="flex justify-between">
          <label className="block text-gray-700 text-sm font-bold mb-2">Password</label>
          <a href="#" className="text-xs text-gray-500">Forget Password?</a>
        </div>
        <input className="bg-gray-200 text-gray-700 focus:outline-none focus:shadow-outline border border-gray-300 rounded py-2 px-4 block w-full appearance-none" onChange={handleChange} name='password' type="password" />
      </div>
      <div className="mt-8">
        <button onClick={handleSubmit} className="bg-gray-700 text-white font-bold py-2 px-4 w-full rounded hover:bg-gray-600">Login</button>
      </div>
      <div className="mt-4 flex items-center justify-between">
        <span className="border-b w-1/5 md:w-1/4" />
        <Link to="/signup" className="text-xs text-gray-500 uppercase">or sign up</Link>
        <span className="border-b w-1/5 md:w-1/4" />
      </div>
    </div>
  </div>
</div>

   
{/* <div className="bg-white dark:bg-gray-900">
  <div className="flex justify-center h-screen">
    <div className="hidden bg-cover lg:block lg:w-2/3" style={{backgroundImage: 'url(https://images.unsplash.com/photo-1616763355603-9755a640a287?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80)'}}>
      <div className="flex items-center h-full px-20 bg-gray-900 bg-opacity-40">
        <div>
          <h2 className="text-4xl font-bold text-white">ExamApp</h2>
          <p className="max-w-xl mt-3 text-gray-300">Lorem ipsum dolor sit, amet consectetur adipisicing elit. In autem ipsa, nulla laboriosam dolores, repellendus perferendis libero suscipit nam temporibus molestiae</p>
        </div>
      </div>
    </div>
    <div className="flex items-center w-full max-w-md px-6 mx-auto lg:w-2/6">
      <div className="flex-1">
        <div className="text-center">
          <h2 className="text-4xl font-bold text-center text-gray-700 dark:text-white">ExamApp</h2>
          <p className="mt-3 text-gray-500 dark:text-gray-300">Sign in to access your account</p>
        </div>
        <div className="mt-8">
          <form>
            <div>
              <label htmlFor="email" className="block mb-2 text-sm text-gray-600 dark:text-gray-200">Email Address</label>
              <input type="email" name="email" id="email" placeholder="example@example.com" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
            </div>
            <div className="mt-6">
              <div className="flex justify-between mb-2">
                <label htmlFor="password" className="text-sm text-gray-600 dark:text-gray-200">Password</label>
                <a href="#" className="text-sm text-gray-400 focus:text-blue-500 hover:text-blue-500 hover:underline">Forgot password?</a>
              </div>
              <input type="password" name="password" id="password" placeholder="Your Password" className="block w-full px-4 py-2 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-md dark:placeholder-gray-600 dark:bg-gray-900 dark:text-gray-300 dark:border-gray-700 focus:border-blue-400 dark:focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40" />
            </div>
            <div className="mt-6">
              <button className="w-full px-4 py-2 tracking-wide text-white transition-colors duration-200 transform bg-blue-500 rounded-md hover:bg-blue-400 focus:outline-none focus:bg-blue-400 focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                Sign in
              </button>
            </div>
          </form>
          <p className="mt-6 text-sm text-center text-gray-400">Don't have an account yet? <Link to="/signup" className="text-blue-500 focus:outline-none focus:underline hover:underline">Sign up</Link>.</p>
        </div>
      </div>
    </div>
  </div>
</div> */}

    </div>
  )
}

export default Login
