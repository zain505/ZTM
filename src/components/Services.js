import React, { useEffect, useState } from 'react';
import img from '../images/web.svg';
import img2 from '../images/app.svg';
import img3 from '../images/hosting.svg';
import img4 from '../images/consultation.svg';

import { db } from "../Firebase/FirebaseConfig";

import { collection, addDoc, updateDoc, getDoc, doc, getDocs, deleteDoc, } from "firebase/firestore";

const Services = () => {
    const [allServices, setAllServices] = useState(null)

    const getAllService = async () => {
        const teamsCol = collection(db, 'service');
        const teamSnapshot = await getDocs(teamsCol);
        const teamsList = teamSnapshot.docs.map(doc => {
            return {
                id: doc.id,
                data: doc.data(),
            }
        });
        setAllServices(teamsList)
    }

    useEffect(() => {
        getAllService()
    }, [])

    return (
        <div id="services" className="bg-gray-100 py-12" >
            <section data-aos="zoom-in-down">
                <div className="my-4 py-4">
                    <h2 className="my-2 text-center text-3xl text-blue-900 uppercase font-bold">services</h2>

                    <div className='flex justify-center'>
                        <div className='w-24 border-b-4 border-blue-900'></div>
                    </div>
                    <h2 className="mt-4 mx-12 text-center text-xl lg:text-2xl font-semibold text-blue-900">We are deeply committed to the growth and success of our clients.</h2>
                </div>

                <div className="px-12" data-aos="fade-down" data-aos-delay="600">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

                        {allServices?.map(service => {
                            return (
                                <div className="bg-white transition-all ease-in-out duration-400  overflow-hidden text-gray-700 hover:bg-gray-500 hover:text-white rounded-lg shadow-2xl p-3 group">
                                    <div className="m-2 text-justify text-sm">
                                        <img alt="card img" className="rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out" src={service.data.imgURL} />
                                        <h2 className="font-semibold my-4 text-2xl text-center">{service.data.serviceHeader}</h2>
                                        <p className="text-md font-medium">
                                        {service.data.serviceDesc}
                                        </p>
                                    </div>
                                </div>
                            )
                        })
                        }
                    </div>
                </div>
            </section>
        </div>
    )
}

export default Services;