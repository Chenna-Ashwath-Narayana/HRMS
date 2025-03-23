import React from 'react'
import './Frontpage.css';

import mainpagecontainerimage from '../images/mainpage-container-image.png';
// import mainpagecontainerimagesecond from '../images/mainpage-container-image-second-version.png';
import logoimage from '../images/image_copy_2-removebg-preview.png';


const Frontpage = () => {
  return (
    <>
    <div className='mainpage-container'>
        <div className='navbar-container'>
            <div className='rightside-container'>
                <div className='imageside-container'>
                    <img src={logoimage} alt="" />
                </div>
                <div className='headingtag-container'>
                    <h2>HRMS</h2>
                    <p>Human Resource Management System</p>
                </div>
            </div>

            <div className='anchortag-container'>
                <a href="/">HOME</a>
                <a href="">ABOUT US</a>
                <a href="">CONTACT</a>
                <a href="/adminlogin">ADMIN LOGIN</a>
                <a href="/employeelogin">EMPLOYEE LOGIN</a>
            </div>

            <div className='leftside-container'>
                <h3 className='getstarted'>GET STARTED
                    <span>
                        <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-right-square-fill" viewBox="0 0 16 16">
                            <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707"/>
                        </svg>
                    </span>
                </h3>
            </div>
        </div>

        <div className='mainpagecontent-container'>
            <div className='mainimage-container'>
                <img src={mainpagecontainerimage} alt="Main Page Image" />
            </div>


            <div className='mainpageside-container'>
                <h3 className='discover'>Discover, Engage, Empower 
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-three-dots" viewBox="0 0 16 16">
                        <path d="M3 9.5a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3m5 0a1.5 1.5 0 1 1 0-3 1.5 1.5 0 0 1 0 3"/>
                    </svg>
                </h3>
                <h1>
                    Unlocking Potential, <br />
                    One Hire At a Time
                </h1>
                <p>
                    Transform your workplace with our innovative HR <br />
                    solutions! Empower your team with seamless <br />
                    recruitment, Engagement, and development tools.
                </p>
                <h3 className='getaquote'>
                    GET A QUOTE
                    <svg xmlns="http://www.w3.org/2000/svg" fill="currentColor" class="bi bi-arrow-up-right-square-fill" viewBox="0 0 16 16">
                        <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707"/>
                    </svg>
                </h3>
                <h3 className='exploreservices'>
                    EXPLORE SERVICES
                    <svg xmlns="http://www.w3.org/2000/svg" width="16" height="16" fill="currentColor" class="bi bi-arrow-up-right-square-fill" viewBox="0 0 16 16">
                        <path d="M14 0a2 2 0 0 1 2 2v12a2 2 0 0 1-2 2H2a2 2 0 0 1-2-2V2a2 2 0 0 1 2-2zM5.904 10.803 10 6.707v2.768a.5.5 0 0 0 1 0V5.5a.5.5 0 0 0-.5-.5H6.525a.5.5 0 1 0 0 1h2.768l-4.096 4.096a.5.5 0 0 0 .707.707"/>
                    </svg>
                </h3>
                <h2>Your Trusted Allies In Growth</h2>
            </div>

        </div>
        <div></div>
    </div>
    </>
  )
}

export default Frontpage
