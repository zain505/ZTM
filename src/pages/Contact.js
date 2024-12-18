import React, { useEffect, useState } from 'react';
import NavBar from '../components/Navbar/NavBar';
import Footer from '../components/Footer';
import { useDocTitle } from '../components/CustomHook';
import axios from 'axios';
// import emailjs from 'emailjs-com';
import Notiflix from 'notiflix';

import { collection, addDoc, updateDoc, getDoc, doc, getDocs, deleteDoc, } from "firebase/firestore";

import { db } from "../Firebase/FirebaseConfig"


const Contact = () => {
    useDocTitle('MLD | Molad e Konsult - Send us a message')
    const [firstName, setFirstName] = useState('')
    const [lastName, setLastName] = useState('')
    const [email, setEmail] = useState('')
    const [phone, setPhone] = useState('')
    const [message, setMessage] = useState('')
    const [contactInfo, setContactInfo] = useState(null)


    const getContactInfo = async () => {
        debugger
        const citiesCol = collection(db, 'contactus');
        const citySnapshot = await getDocs(citiesCol);
        const cityList = citySnapshot.docs.map(doc => doc.data());
        setContactInfo(cityList)
    }

    useEffect(() => {
        getContactInfo()
    }, [])


    const sendEmail =async ()  => {

        if (!firstName || !lastName || !email || !phone || !message) {
            return;
        }
        try {
            let docRef = collection(db, "demoRequest")

            await addDoc((docRef), {
                email: email,
                firstname: firstName,
                lastname: lastName,
                message: message,
                phone: phone
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }
    return (
        <>
            <div>
                <NavBar />
            </div>
            <div id='contact' className="flex justify-center items-center mt-8 w-full bg-white py-12 lg:py-24 ">
                <div className="container mx-auto my-8 px-4 lg:px-20" data-aos="zoom-in">



                    <div className="w-full bg-white p-8 my-4 md:px-12 lg:w-9/12 lg:pl-20 lg:pr-40 mr-auto rounded-2xl shadow-2xl">
                        <div className="flex">
                            <h1 className="font-bold text-center lg:text-left text-blue-900 uppercase text-4xl">Send us a message</h1>
                        </div>
                        <div className="grid grid-cols-1 gap-5 md:grid-cols-2 mt-5">
                            <div>
                                <input
                                    name="first_name"
                                    className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                    type="text"
                                    placeholder="First Name*"
                                    value={firstName}
                                    onChange={(e) => setFirstName(e.target.value)}
                                />
                               
                            </div>

                            <div>
                                <input
                                    name="last_name"
                                    className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                    type="text"
                                    placeholder="Last Name*"
                                    value={lastName}
                                    onChange={(e) => setLastName(e.target.value)}
                                    
                                />
                                
                            </div>

                            <div>
                                <input
                                    name="email"
                                    className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                    type="email"
                                    placeholder="Email*"
                                    value={email}
                                    onChange={(e) => setEmail(e.target.value)}
                                    
                                />
                               
                            </div>

                            <div>
                                <input
                                    name="phone_number"
                                    className="w-full bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                    type="number"
                                    placeholder="Phone*"
                                    value={phone}
                                    onChange={(e) => setPhone(e.target.value)}
                                    
                                />
                                
                            </div>
                        </div>
                        <div className="my-4">
                            <textarea
                                name="message"
                                placeholder="Message*"
                                className="w-full h-32 bg-gray-100 text-gray-900 mt-2 p-3 rounded-lg focus:outline-none focus:shadow-outline"
                                value={message}
                                onChange={(e) => setMessage(e.target.value)}
                                
                            ></textarea>
                           
                        </div>
                        <div className="my-2 w-1/2 lg:w-2/4">
                            <button onClick={sendEmail} id="submitBtn" className="uppercase text-sm font-bold tracking-wide bg-gray-500 hover:bg-blue-900 text-gray-100 p-3 rounded-lg w-full 
                                    focus:outline-none focus:shadow-outline">
                                Send Message
                            </button>
                        </div>
                    </div>
                    <div
                        className="w-full  lg:-mt-96 lg:w-2/6 px-8 py-6 ml-auto bg-blue-900 rounded-2xl">
                        <div className="flex flex-col text-white">

                            <div className="flex my-4 w-2/3 lg:w-3/4">
                                <div className="flex flex-col">
                                    <i className="fas fa-map-marker-alt pt-2 pr-2" />
                                </div>
                                <div className="flex flex-col">
                                    <h2 className="text-2xl">Office Address</h2>
                                    <p className="text-gray-400" style={{textTransform:"capitalize"}}>{contactInfo && contactInfo[0]?.address}</p>
                                </div>
                            </div>

                            <div className="flex my-4 w-2/3 lg:w-1/2">
                                <div className="flex flex-col">
                                    <i className="fas fa-phone-alt pt-2 pr-2" />
                                </div>

                                <div className="flex flex-col">
                                    <h2 className="text-2xl">Call Us</h2>
                                    <p className="text-gray-400">{contactInfo && contactInfo[0]?.number}</p>

                                    <div className='mt-5'>
                                        <h2 className="text-2xl">Send an E-mail</h2>
                                        <p className="text-gray-400">{contactInfo && contactInfo[0]?.email}</p>
                                    </div>

                                </div>
                            </div>

                            <div className="flex my-4 w-2/3 lg:w-1/2">
                                <a href={contactInfo && contactInfo[0]?.fbLink} target="_blank" rel="noreferrer" className="rounded-full flex justify-center bg-white h-8 text-blue-900  w-8  mx-1 text-center pt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='fill-current font-black hover:animate-pulse'><path d="M13.397 20.997v-8.196h2.765l.411-3.209h-3.176V7.548c0-.926.258-1.56 1.587-1.56h1.684V3.127A22.336 22.336 0 0 0 14.201 3c-2.444 0-4.122 1.492-4.122 4.231v2.355H7.332v3.209h2.753v8.202h3.312z"></path></svg>
                                </a>
                                <a href={contactInfo && contactInfo[0]?.LinkedIn} target="_blank" rel="noreferrer" className="rounded-full flex justify-center bg-white h-8 text-blue-900  w-8  mx-1 text-center pt-1">
                                    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" className='fill-current font-black hover:animate-pulse'><circle cx="4.983" cy="5.009" r="2.188"></circle><path d="M9.237 8.855v12.139h3.769v-6.003c0-1.584.298-3.118 2.262-3.118 1.937 0 1.961 1.811 1.961 3.218v5.904H21v-6.657c0-3.27-.704-5.783-4.526-5.783-1.835 0-3.065 1.007-3.568 1.96h-.051v-1.66H9.237zm-6.142 0H6.87v12.139H3.095z"></path></svg>
                                </a>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
            <Footer />
        </>


    )
}

export default Contact;