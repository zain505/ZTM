import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { db, storage } from "../Firebase/FirebaseConfig";
import { collection, addDoc, updateDoc, getDoc, doc, getDocs, deleteDoc, } from "firebase/firestore";

const Portfolio = () => {
    const [allProducts, setProducts] = useState(null)

    const getAllProducts = async () => {
        const teamsCol = collection(db, 'product');
        const teamSnapshot = await getDocs(teamsCol);
        const teamsList = teamSnapshot.docs.map(doc => {
            return {
                id: doc.id,
                data: doc.data(),
            }
        });
        setProducts(teamsList)
    }
    useEffect(() => {
        getAllProducts()
    }, [])
    return (
        <>
            <div id="portfolio" className="my-4 py-4">
                <h2 className="my-2 text-center text-3xl text-blue-900 uppercase font-bold">Products</h2>
                <div className='flex justify-center'>
                    <div className='w-24 border-b-4 border-blue-900 mb-8'></div>
                </div>

                <div className="px-4" data-aos="fade-down" data-aos-delay="600">
                    <div className="grid sm:grid-cols-2 lg:grid-cols-4 gap-5">
                        {allProducts?.map(prod => {
                            return (
                                <div className="bg-white transition-all ease-in-out duration-400  overflow-hidden text-gray-700 hover:scale-105 rounded-lg shadow-2xl p-3 min-h-max">
                                    <div className="m-2 text-justify text-sm">
                                        <h4 className="font-semibold my-4 text-lg md:text-2xl text-center mb-4 h-12">{prod.data.prodName}</h4>
                                        <p className="text-md font-medium leading-5 h-auto md:h-48">
                                            {prod.data.prodDesc}
                                        </p>
                                        <div className="flex justify-center my-4">
                                            <Link to="/get-demo" className="text-white bg-blue-900 hover:bg-blue-800 inline-flex items-center justify-center w-full px-6 py-3 my-4 text-lg shadow-xl rounded-xl">
                                                Schedule Demo
                                                <svg className="w-4 h-4 ml-1" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor"><path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd"></path></svg>
                                            </Link>
                                        </div>
                                    </div>
                                </div>
                            )
                        })}

                       
                    </div>
                </div>
            </div>
        </>
    )
}

export default Portfolio;