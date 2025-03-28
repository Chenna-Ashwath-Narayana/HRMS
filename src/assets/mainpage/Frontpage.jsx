import React from 'react'
import './Frontpage.css';
import { BsStarFill, BsStar , BsChatRightQuoteFill } from "react-icons/bs"; 
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";  // ✅ Import the FontAwesome component
import { faThumbsUp , faHandshake , faHandFist , faHandshakeAlt , faDotCircle} from "@fortawesome/free-solid-svg-icons"; // Import the correct icon
import { faEllipsisH , faCheckCircle } from "@fortawesome/free-solid-svg-icons";


import companypageimage1 from '../images/companypageimage1.png'


import clientexperience from '../images/clientexperience.png'

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

        <div className='clientexperience-container'>
            <div>
                <div className='clientexperience-first-heading-container'>
                    <h3>What They Say</h3>
                </div>
                <div>
                    <div className='clientexperience-second-heading-container'>
                        <h1>Client  Experience</h1>
                    </div>
                    <div>
                        <BsStarFill size={20} color="gold" />
                        <BsStarFill size={20} color="gold" />
                        <BsStarFill size={20} color="gold" />
                        <BsStar size={20} color="gray" />
                        <BsStar size={20} color="gray" />
                    </div>
                    <div className='experiencepage-content'>
                        <h3>Suspendisse potenti. Los Angeles is often called the entertainment capital <br />
                        of the world, hosting a myriad of film studios and theaters. Sed nisi. <br /> 
                        Nulla quis sem at nibh elementum imperdiet.</h3>
                    </div>
                </div>
                <div className='experiencepage-add-container'>
                    <div className='experiencepage-add1-container'>
                        <div>
                            <BsChatRightQuoteFill size={50} color="blue" />
                        </div>
                        <div className='experiencepage-heading-container'>
                            <h2 className='head'>Madison</h2>
                            <h3>New york, USA</h3>
                        </div>
                    </div>
                    <div>
                        <h1 className='head1'>01/04</h1>
                    </div>
                </div>
            </div>
            <div className='clientpage-image-container'>
                <img src={clientexperience} alt="Client Experience" />
            </div>
        </div>

        <div className="marquee-container">
            <div className="marquee-wrapper">
                <div className="marquee-content">
                    Empowering People, Elevating Organizations
                    <FontAwesomeIcon icon={faThumbsUp} />
                    Innovate, Inspire, Impact
                    <FontAwesomeIcon icon={faHandshake} />
                    Leading Change, Inspiring Growth
                    <FontAwesomeIcon icon={faHandFist} />
                    Together We Rise
                    <FontAwesomeIcon icon={faHandshake} />
                </div>

                    {/* Duplicate content to create a seamless loop */}
                <div className="marquee-content">
                    Empowering People, Elevating Organizations
                    <FontAwesomeIcon icon={faThumbsUp} />
                    Innovate, Inspire, Impact
                    <FontAwesomeIcon icon={faHandshake} />
                    Leading Change, Inspiring Growth
                    <FontAwesomeIcon icon={faHandFist} />
                    Together We Rise
                    <FontAwesomeIcon icon={faHandshake} />
                </div>
            </div>
        </div>


        <div className='thirdpage-reference-container1'>
            <div className='thirdpage-reference-container1-1'> <FontAwesomeIcon icon={faEllipsisH} size="10" /> Empowering Global Success <FontAwesomeIcon icon={faEllipsisH} size="lg" />
            </div>
            <div className='thirdpage-reference-container1-2'>
                <h1>Our Team of experts offer custom <br /> solution to empower gobal growth</h1>
            </div>
            <div className='thirdpage-reference-container1-3'>
                <div className='thirdpage-reference-container1-3-1'>
                    <div className='thirdpage-reference-container1-3-1-1'>
                        <div className='thirdpage-reference-container1-3-1-1-1'>Transforming Talent <FontAwesomeIcon icon={faEllipsisH} size="lg" /></div>
                        <div className='haedingpage'>
                            <h1>Partners in Progress And <br /> Innovation</h1>
                            <p>Lectus litora scelerisque hac himenaeos rutrum per sodales <br /> 
                            quis. Scelerisque ligula torquent per vel tristique at.</p>
                        </div>
                        <div className='thirdpage-reference-container1-3-1-1-2'>
                            <div className='thirdpage-reference-container1-3-1-1-3'>
                                <ul>
                                    <li>
                                        <FontAwesomeIcon icon={faCheckCircle} style={{ color: "lightblue", marginRight: "10px" , fontSize:"1.7vw" }} />
                                        Lectus litora scelerisque</li>
                                    <li>
                                        <FontAwesomeIcon icon={faCheckCircle} style={{ color: "lightblue", marginRight: "10px" , fontSize:"1.7vw" }} />
                                        Scelerisque ligula <br /> torquent</li>
                                    <li>
                                        <FontAwesomeIcon icon={faCheckCircle} style={{ color: "lightblue", marginRight: "10px" , fontSize:"1.7vw" }} />
                                        Fames porta cras <br /> condimentum</li>
                                    <li>
                                        <FontAwesomeIcon icon={faCheckCircle} style={{ color: "lightblue", marginRight: "10px" , fontSize:"1.7vw" }} />
                                        Himenaeos vitae urna</li>
                                </ul>
                            </div>
                            <div className='thirdpage-reference-container1-3-1-1-4'>
                                <ul>
                                    <li>
                                        <FontAwesomeIcon icon={faCheckCircle} style={{ color: "lightblue", marginRight: "10px" , fontSize:"1.7vw" }} />
                                        Sit feugiat facilisis senectus</li>
                                    <li>
                                        <FontAwesomeIcon icon={faCheckCircle} style={{ color: "lightblue", marginRight: "10px" , fontSize:"1.7vw" }} />
                                        Malesuada placerat magnis</li>
                                    <li>
                                        <FontAwesomeIcon icon={faCheckCircle} style={{ color: "lightblue", marginRight: "10px" , fontSize:"1.7vw" }} />
                                        Pulvinar mauris lacinia</li>
                                </ul>
                            </div>
                        </div>
                    </div>
                    <div className='thirdpage-reference-container1-3-1-2'><img src={companypageimage1} alt="" /></div>
                </div>
            </div>
            <div></div>
        </div>
    </div>
    </>
  )
}

export default Frontpage
