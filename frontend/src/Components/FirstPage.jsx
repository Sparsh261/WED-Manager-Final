import React from 'react'
import { Link } from 'react-router-dom'
import './FirstPage.css'



export default function FirstPage() {

    return (
        <>

            <div id="formContainer">

                <div class="form-container">
                    <div class="form">
                        <span class="heading">W E D - M A N A G E R</span>
                        <span class="c1">An online platform to manage your wedding plans and help you memorize your tasks so that you don't forget any important detalis.</span>
                        <span class="c2">Join now and forget your worries.</span>
                        <div class="button-container">
                            
                            <Link to='/signup'> <button class="send-button">Signup</button></Link>
                            <div class="reset-button-container">
                                <Link to='/login'>  <button class="reset-button" id="reset-btn">Login</button>  </Link>
                               
                            </div>
                        </div>
                    </div>
                </div>

            </div>



        </>
    )
}