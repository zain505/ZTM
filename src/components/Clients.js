import React, { useEffect, useState } from 'react';

import { storage } from "../Firebase/FirebaseConfig"
import { listAll, ref, getDownloadURL } from 'firebase/storage';

const clientImage = {
    height: '10rem',
    width: 'auto',
    mixBlendMode: 'colorBurn'
}

const Clients = () => {

    const [images, setImages] = useState([]);

    const getImageList = async () => {
        const listRef = ref(storage, '/clients');
        const result = await listAll(listRef);
        const urlPromises = result.items.map((itemRef) => getDownloadURL(itemRef));
        return Promise.all(urlPromises);
    };

    useEffect(() => {
        const fetchImages = async () => {
            const urls = await getImageList();
            console.log(urls)
            setImages(urls);
        };

        fetchImages();
    }, []);


    return (
        <div className="mt-8 bg-gray-100">
            <section data-aos="fade-up">
                <div className="my-4 py-4">
                    <h2 className="my-2 text-center text-3xl text-blue-900 uppercase font-bold">Our Clients</h2>
                    <div className='flex justify-center'>
                        <div className='w-24 border-b-4 border-blue-900'></div>
                    </div>
                    <h2 className="mt-4 mx-12 text-center text-xl lg:text-2xl font-semibold text-blue-900">Some of our clients.</h2>
                </div>

                <div className="p-16" data-aos="fade-in" data-aos-delay="600">
                    <div className="grid sm:grid-cols-3 lg:grid-cols-3">
                        {
                            images.map(url => {
                                return (
                                    <div style={clientImage} className="overflow-hidden p-3 flex justify-center transition-all ease-in-out opacity-50 hover:opacity-100">
                                        <img src={url} alt="client" />
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

export default Clients;