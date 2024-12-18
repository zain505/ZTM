import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { HashLink } from 'react-router-hash-link';

import { getFirestore, collection, getDocs } from 'firebase/firestore/lite';

// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
    apiKey: "AIzaSyDggAgg6j7QyVpWVeLw3YaZSEgeEAGlQfw",
    authDomain: "clientpanel-cf444.firebaseapp.com",
    databaseURL: "https://clientpanel-cf444.firebaseio.com",
    projectId: "clientpanel-cf444",
    storageBucket: "clientpanel-cf444.appspot.com",
    messagingSenderId: "741401567521",
    appId: "1:741401567521:web:4beb8030250dabe3fd5e60"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

const Testmonials = () => {
    const [testmonials, setMyTestmonials] = useState([]);
    const [selectedTestmonial, setSelectedTestmonial] = useState(null);
    const [selectedTestmonialIndex, setSelectedTestmonialIndex] = useState(-1);

    

    const getTestmonials = async () => {
        
        const citiesCol = collection(db, 'testmonials');
        const citySnapshot = await getDocs(citiesCol);
        const cityList = citySnapshot.docs.map(doc => doc.data());

        setMyTestmonials(cityList)
        setSelectedTestmonial(cityList[0])
        setSelectedTestmonialIndex(0)
    }
    useEffect(() => {
        getTestmonials()
       
    },[])

    const gotoSelectedTestmonial = (index) => {
        setMyTestmonials(testmonials)
        setSelectedTestmonial(testmonials[index])
        setSelectedTestmonialIndex(index)
    }
    return (
        <>
            <section className="relative isolate overflow-hidden bg-white px-6 py-24 sm:py-32 lg:px-8">
                <div className="absolute inset-0 -z-10 bg-[radial-gradient(45rem_50rem_at_top,theme(colors.indigo.100),white)] opacity-20" />
                <div className="absolute inset-y-0 right-1/2 -z-10 mr-16 w-[200%] origin-bottom-left skew-x-[-30deg] bg-white shadow-xl shadow-indigo-600/10 ring-1 ring-indigo-50 sm:mr-28 lg:mr-0 xl:mr-16 xl:origin-center" />
                <div className="mx-auto max-w-2xl lg:max-w-4xl">
                    <p className='my-2 text-center text-3xl text-blue-900 uppercase font-bold '>Testmonials</p>
                    {/* <img className="mx-auto h-12" src="https://tailwindui.com/img/logos/workcation-logo-indigo-600.svg" alt="" /> */}
                    <figure className="mt-10">
                        <blockquote className="text-center text-xl font-semibold leading-8 text-gray-900 sm:text-2xl sm:leading-9">
                            <p>
                                {selectedTestmonial?.text}
                            </p>
                        </blockquote>
                        <figcaption className="mt-10">
                            <img
                                className="mx-auto h-10 w-10 rounded-full"
                                src="https://static.vecteezy.com/system/resources/previews/024/183/502/original/male-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg"
                                alt=""
                            />
                            <div className="mt-4 flex items-center justify-center space-x-3 text-base">
                                <div className="font-semibold text-gray-900">{selectedTestmonial?.owner}</div>
                                <svg viewBox="0 0 2 2" width={3} height={3} aria-hidden="true" className="fill-gray-900">
                                    <circle cx={1} cy={1} r={1} />
                                </svg>
                                <div className="text-gray-600">{selectedTestmonial?.role} of {selectedTestmonial?.company}</div>
                            </div>
                        </figcaption>
                    </figure>
                </div>
                <div className='testmonial_btn_section'>
                    {
                        testmonials.map((article, index) => <div onClick={() => gotoSelectedTestmonial(index)} className='testmonial_btn_active'></div>)
                    }

                </div>

            </section>
        </>
    )
}
export default Testmonials;
