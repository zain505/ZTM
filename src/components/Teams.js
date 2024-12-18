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

const Teams = () => {

    const [myTeams, setMyTeams] = useState([]);


    // Get a list of cities from your database
    const getTeamsMember = async () => {

        const teamsCol = collection(db, 'Teams');
        const teamSnapshot = await getDocs(teamsCol);
        const teamsList = teamSnapshot.docs.map(doc => doc.data());
        setMyTeams(teamsList)
    }

    useEffect(() => {
        getTeamsMember()
    }, [])

    return (

        <div id="teams" className="bg-gray-100 py-12" >
            <section data-aos="zoom-in-down">
                <div className="my-4 py-4">
                    <h2 className="my-2 text-center text-3xl text-blue-900 uppercase font-bold">Meet our leadership</h2>

                    <div className='flex justify-center'>
                        <div className='w-24 border-b-4 border-blue-900'></div>
                    </div>
                    <h2 className="mt-4 mx-12 text-center text-xl lg:text-2xl font-semibold text-blue-900">Inspiring individuals to strive for excellence in their work while empowering them with the support and resources they need to grow personally and professionally</h2>
                </div>

                <div className="px-12" data-aos="fade-down" data-aos-delay="600">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">

                        {myTeams?.map(person => {
                            return (
                                <div className="bg-white transition-all ease-in-out duration-400  overflow-hidden text-gray-700 hover:bg-gray-500 hover:text-white rounded-lg shadow-2xl p-3 group">
                                    <div className="m-2 text-justify text-sm">
                                        <img alt="card img" className="rounded-t group-hover:scale-[1.15] transition duration-1000 ease-in-out" src={person.imgURL == "" ?"https://static.vecteezy.com/system/resources/previews/024/183/502/original/male-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg":person.imgURL} />
                                        <h2 className="font-semibold my-4 text-2xl text-center" style={{textTransform:"capitalize"}}>{person.name}</h2>
                                        <p className="text-md font-medium" style={{textTransform:"capitalize"}}>
                                        {person.designation}
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

        //////////////////////////////////////////////////////////

        // <div id="teams" className="bg-white py-24 sm:py-32">
        //     <div className="mx-auto grid max-w-7xl gap-x-8 gap-y-20 px-6 lg:px-8 xl:grid-cols-3">
        //         <div className="max-w-2xl">
        //             <h2 className="my-2 text-3xl text-blue-900 uppercase font-bold">Meet our leadership</h2>
        //             <p className="mt-6 text-lg leading-8 text-gray-600">
        //                 Inspiring individuals to strive for excellence in their work while empowering them with the support and resources they need to grow personally and professionally. It emphasizes the importance of both high standards and nurturing development within the organization.
        //             </p>
        //         </div>
        //         <ul role="list" className="grid gap-x-8 gap-y-12 sm:grid-cols-2 sm:gap-y-16 xl:col-span-2">
        //             {myTeams.map((person) => (
        //                 <li key={person.name}>
        //                     <div className="flex items-center gap-x-6">
        //                         <img className="h-16 w-16 rounded-full" src="https://static.vecteezy.com/system/resources/previews/024/183/502/original/male-avatar-portrait-of-a-young-man-with-a-beard-illustration-of-male-character-in-modern-color-style-vector.jpg" alt="" />
        //                         <div>
        //                             <h3 className="text-base font-semibold leading-7 tracking-tight text-gray-900" style={{ textTransform: "capitalize" }}>{person.name}</h3>
        //                             <p className="text-sm font-semibold leading-6 text-indigo-600" style={{ textTransform: "uppercase" }}>{person.designation}</p>
        //                         </div>
        //                     </div>
        //                 </li>
        //             ))}
        //         </ul>
        //     </div>
        // </div>

    )
}
export default Teams;
