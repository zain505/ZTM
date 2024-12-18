import React, { useEffect, useState } from 'react';
import { HashLink } from 'react-router-hash-link';

import del_icon from "../images/del_icon.png"

import { db, storage } from "../Firebase/FirebaseConfig";

import { collection, addDoc, updateDoc, getDoc, doc, getDocs, deleteDoc, } from "firebase/firestore";
import { getDownloadURL, ref, uploadBytesResumable } from 'firebase/storage';



const Admin = () => {
    const [selectedMenu, setSelectedMenu] = useState(1)
    const [selectedMenuName, setSelectedMenuName] = useState("Add Team")
    const [targetImageURL, setTargetImageURL] = useState("")
    const [logoName, setLogoName] = useState("")
    const [allTeamsData, setAllTeamsData] = useState(null)
    const [allDemoReqs, setAllDemoReqs] = useState(null)
    const [allServices, setAllServices] = useState(null)
    const [allProducts, setProducts] = useState(null)
    const [allTestmonials, setallTestmonials] = useState(null)
    const [loading, setLoading] = useState(false)


    const selectMenu = (menu) => {
        let menuStr = ""
        switch (menu) {
            case 1:
                menuStr = "Add Team"
                break;
            case 2:
                menuStr = "Update Contact"
                break;
            case 3:
                menuStr = "Add Clients"
                break;
            case 4:
                menuStr = "Add Testmonial"
                break;
            case 5:
                menuStr = "Update Logo Name"
                break;
            case 6:
                menuStr = "Demo Request"
                break;
            case 7:
                menuStr = "Add Service"
                break;
            case 8:
                menuStr = "Add Product"
                break;
            case 9:
                menuStr = "Add CEO Message"
                break;

            default:
                break;
        }
        setSelectedMenu(menu)
        setSelectedMenuName(menuStr)
        setTargetImageURL("")
    }

    const getTeamsMember = async () => {

        const teamsCol = collection(db, 'Teams');
        const teamSnapshot = await getDocs(teamsCol);
        const teamsList = teamSnapshot.docs.map(doc => {
            return {
                id: doc.id,
                data: doc.data(),
            }
        });
        setAllTeamsData(teamsList)
    }

    const getDemoRequests = async () => {
        const teamsCol = collection(db, 'demoRequest');
        const teamSnapshot = await getDocs(teamsCol);
        const teamsList = teamSnapshot.docs.map(doc => {
            return {
                id: doc.id,
                data: doc.data(),
            }
        });
        setAllDemoReqs(teamsList)
    }

    useEffect(() => {
        getTeamsMember()
        getDemoRequests()
        getAllService()
        getAllProducts()
        getAllTestmonials()
    }, [])

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

    const getFileName = (type) => {

        let assignType = "";
        if (type == "member") {
            assignType = "member";
        } else if (type == "service") {
            assignType = "service";
        } else if (type == "clients") {
            assignType = "clients";
        } else if (type == "testmonials") {
            assignType = "testmonials";
        } else if (type == "ceoImage") {
            assignType = "ceoImage";
        } else {
            assignType = "";
        }
        return assignType;
    }

    const uploadImg = async (e, uploadType) => {
        setLoading(true)
        try {
            const storageRef = ref(storage, `/${getFileName(uploadType)}/${e.target.files[0].name}`);
            const upload = await uploadBytesResumable(storageRef, e.target.files[0]);
            getDownloadURL(upload.snapshot.ref).then((downloadURL) => {
                setTargetImageURL(downloadURL)
                setLoading(false)
            });
        } catch (error) {
            setLoading(false)
            console.log(error)
        }
    }



    const updateLogoName = async () => {
        if (!logoName) {
            return;
        }
        try {
            let docRef = doc(db, "webLogo", "imE1DMfKsILtZUdjW04X")

            await updateDoc(docRef, {
                Logo_Name: logoName
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const addNewService = async () => {
        const serviceHeader = document.getElementById("service-header").value
        const serviceDesc = document.getElementById("service-des").value

        if (!serviceHeader || !serviceDesc) {
            return;
        }
        try {
            let docRef = collection(db, "service")
            await addDoc((docRef), {
                serviceDesc: serviceDesc,
                serviceHeader: serviceHeader,
                imgURL: targetImageURL,
            });
            getAllService()
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const addNewProduct = async () => {
        const productName = document.getElementById("product-name").value
        const productDesc = document.getElementById("product-des").value

        if (!productName || !productDesc) {
            return;
        }
        try {
            let docRef = collection(db, "product")
            await addDoc((docRef), {
                prodDesc: productDesc,
                prodName: productName,
            });
            getAllProducts()
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

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

    const addNewTeamMember = async () => {

        const memberName = document.getElementById("member-name").value
        const memberDesignation = document.getElementById("member-des").value
        const memberExp = document.getElementById("member-exp").value
        const memberAge = document.getElementById("member-age").value

        if (!memberName || !memberDesignation || !memberExp || !memberAge) {
            return;
        }
        try {
            let docRef = collection(db, "Teams")
            await addDoc((docRef), {
                age: memberAge,
                designation: memberDesignation,
                experience: memberExp,
                imgURL: targetImageURL,
                name: memberName
            });
            getTeamsMember()
        } catch (e) {
            console.error("Error adding document: ", e);
        }

    }

    const deleteRecordDocument = async (collectionName, dociD) => {

        await deleteDoc(doc(db, collectionName, dociD));

        getTeamsMember()
        getDemoRequests()
        getAllService()
        getAllProducts()
        getAllTestmonials()

    }

    const addTestmonials = async () => {
        const OwnerName = document.getElementById("owner-name").value
        const role = document.getElementById("role").value
        const message = document.getElementById("message").value

        if (!OwnerName || !role || !message) {
            return;
        }
        try {
            let docRef = collection(db, "testmonials")
            await addDoc((docRef), {
                owner: OwnerName,
                role: role,
                text: message,
                imgURL: targetImageURL,
            });
            getAllTestmonials()
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }

    const getAllTestmonials = async () => {

        const teamsCol = collection(db, 'testmonials');
        const teamSnapshot = await getDocs(teamsCol);
        const teamsList = teamSnapshot.docs.map(doc => {
            return {
                id: doc.id,
                data: doc.data(),
            }
        });
        setallTestmonials(teamsList)
    }
    const addCeoMessage = async () => {
        const ceo_message = document.getElementById("ceo-message").value

        if (!ceo_message) {
            return;
        }
        try {
            let docRef = doc(db, "CEOMsg", "MQ4oe69hgrNy1NE0O0Mr")

            await updateDoc(docRef, {
                ceoImage: targetImageURL,
                message: ceo_message
            });
        } catch (e) {
            console.error("Error adding document: ", e);
        }
    }



    return (
        <>
            {loading && <div style={{ width: "100%", height: "100%", position: "absolute", backgroundColor: "#e6e6e6", display: 'flex', justifyContent: "center", alignItems: "center" }}>
                <p>Uploading...</p>
            </div>}
            <div className="min-h-full">
                <nav className="bg-gray-800">
                    <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                        <div className="flex h-16 items-center justify-between">
                            <div className="flex items-center">

                                <div className="hidden md:block">
                                    <div className="ml-10 flex items-baseline space-x-4">
                                        <a className={selectedMenu == 1 ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" : "text-white rounded-md px-3 py-2 text-sm font-medium"} onClick={() => selectMenu(1)} >Add Team</a>
                                        <a className={selectedMenu == 2 ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"} onClick={() => selectMenu(2)}>Update Contact</a>
                                        <a className={selectedMenu == 3 ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"} onClick={() => selectMenu(3)}>Add Clients</a>
                                        <a className={selectedMenu == 4 ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"} onClick={() => selectMenu(4)}>Add Testmonial</a>
                                        <a className={selectedMenu == 5 ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"} onClick={() => selectMenu(5)}>Update Logo Name</a>
                                        <a className={selectedMenu == 6 ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"} onClick={() => selectMenu(6)}>Demo Request</a>
                                        <a className={selectedMenu == 7 ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"} onClick={() => selectMenu(7)}>Add Service</a>
                                        <a className={selectedMenu == 8 ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"} onClick={() => selectMenu(8)}>Add Product</a>
                                        <a className={selectedMenu == 9 ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"} onClick={() => selectMenu(9)}>CEO Message</a>
                                        <HashLink smooth to="/">
                                            <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600" >Go to website</button>
                                        </HashLink>

                                    </div>
                                </div>
                            </div>
                            <div className="hidden md:block">
                                <div className="ml-4 flex items-center md:ml-6">



                                    <div className="relative ml-3">

                                    </div>
                                </div>
                            </div>
                            <div className="-mr-2 flex md:hidden">


                            </div>
                        </div>
                    </div>


                    <div className="md:hidden" id="mobile-menu">
                        <div className="space-y-1 px-2 pb-3 pt-2 sm:px-3">

                            <a className={selectedMenu == 1 ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" : "text-white rounded-md px-3 py-2 text-sm font-medium"} onClick={() => selectMenu(1)} >Add Team</a>
                            <a className={selectedMenu == 2 ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"} onClick={() => selectMenu(2)}>Update Contact</a>
                            <a className={selectedMenu == 3 ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"} onClick={() => selectMenu(3)}>Add Clients</a>
                            <a className={selectedMenu == 4 ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"} onClick={() => selectMenu(4)}>Add Testmonial</a>
                            <a className={selectedMenu == 5 ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"} onClick={() => selectMenu(5)}>Update Logo Name</a>
                            <a className={selectedMenu == 6 ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"} onClick={() => selectMenu(6)}>Demo Request</a>
                            <a className={selectedMenu == 7 ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"} onClick={() => selectMenu(7)}>Add Service</a>
                            <a className={selectedMenu == 8 ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"} onClick={() => selectMenu(8)}>Add Product</a>
                            <a className={selectedMenu == 9 ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"} onClick={() => selectMenu(9)}>CEO Message</a>
                            {/* <a className={selectedMenu== 5 ? "bg-gray-900 text-white rounded-md px-3 py-2 text-sm font-medium" : "text-gray-300 hover:bg-gray-700 hover:text-white rounded-md px-3 py-2 text-sm font-medium"} onClick={()=>selectMenu(5)}>Reports</a> */}
                        </div>
                        <div className="border-t border-gray-700 pb-3 pt-4">
                            <div className="flex items-center px-5">

                            </div>

                        </div>
                    </div>
                </nav>

                <header className="bg-white shadow">
                    <div className="mx-auto max-w-7xl px-4 py-6 sm:px-6 lg:px-8">
                        <h1 className="text-3xl font-bold tracking-tight text-gray-900">{selectedMenuName}</h1>
                    </div>
                </header>
                <main>
                    <div className="mx-auto max-w-7xl py-6 sm:px-6 lg:px-8">
                        {selectedMenu == 2 ?
                            <>
                                <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                    <div class="sm:col-span-3">
                                        <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Email</label>
                                        <div class="mt-2">
                                            <input type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div class="sm:col-span-3">
                                        <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Office Address</label>
                                        <div class="mt-2">
                                            <input type="text" name="last-name" id="last-name" autocomplete="family-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div class="sm:col-span-3">
                                        <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Phone Number</label>
                                        <div class="mt-2">
                                            <input type="text" name="last-name" id="last-name" autocomplete="family-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div class="sm:col-span-3">
                                        <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">FaceBook Link</label>
                                        <div class="mt-2">
                                            <input type="text" name="last-name" id="last-name" autocomplete="family-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                    <div class="sm:col-span-3">
                                        <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">LinkedIn Link</label>
                                        <div class="mt-2">
                                            <input type="text" name="last-name" id="last-name" autocomplete="family-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                        </div>
                                    </div>
                                </div>
                                <div class="mt-6 flex items-center justify-end gap-x-6">
                                    <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                                    <button type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                                </div>
                            </> :
                            selectedMenu == 3 ?
                                <>
                                    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">


                                        <div class="sm:col-span-3">
                                            <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Add Client Logo</label>
                                            <div class="mt-2">
                                                <input type="file" onChange={(e) => uploadImg(e, "clients")} accept='image/*' name="service-image" id="service-image" autocomplete="family-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                            </div>
                                        </div>
                                    </div>
                                </> :
                                selectedMenu == 4 ?
                                    <>
                                        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                            <div class="sm:col-span-3">
                                                <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Owner Name</label>
                                                <div class="mt-2">
                                                    <input type="text" name="owner-name" id="owner-name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                </div>
                                            </div>
                                            <div class="sm:col-span-3">
                                                <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Role</label>
                                                <div class="mt-2">
                                                    <input type="text" name="role" id="role" autocomplete="family-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                </div>
                                            </div>
                                            <div class="sm:col-span-3">
                                                <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Message</label>
                                                <div class="mt-2">
                                                    <input type="text" name="message" id="message" autocomplete="family-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                </div>
                                            </div>
                                            <div class="sm:col-span-3">
                                                <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Testmonial Owner Image</label>
                                                <div class="mt-2">
                                                    <input type="file" onChange={(e) => uploadImg(e, "testmonials")} accept='image/*' name="service-image" id="service-image" autocomplete="family-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                </div>
                                            </div>
                                        </div>
                                        <div class="mt-6 flex items-center justify-end gap-x-6">
                                            <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                                            <button onClick={addTestmonials} type="submit" class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                                        </div>
                                        <table className="table-striped" style={{ width: "100%", height: "auto" }}>
                                            <thead>
                                                <tr>
                                                    <th>Index#</th>
                                                    <th>Owner Name</th>
                                                    <th>Role</th>
                                                    <th>Message</th>
                                                    <th>Action</th>
                                                </tr>
                                            </thead>
                                            <tbody>
                                                {allTestmonials?.map((team, index) => {
                                                    return (
                                                        <tr style={{ borderBottom: "1px solid #e3e3e3", paddingBottom: "3px" }}>
                                                            <td style={{ textAlign: "center" }}>{index + 1}</td>
                                                            <td style={{ textAlign: "center" }}>{team.data.owner}</td>
                                                            <td style={{ textAlign: "center" }}>{team.data.role}</td>
                                                            <td style={{ textAlign: "center" }}>{team.data.text}</td>

                                                            <td style={{ textAlign: "center" }}>
                                                                <img src={del_icon} alt='del' onClick={() => deleteRecordDocument("testmonials", team.id)} style={{ margin: "auto", cursor: "pointer" }} width={20} height={20} />
                                                            </td>
                                                        </tr>
                                                    )
                                                })}
                                            </tbody>
                                        </table>
                                    </> :
                                    selectedMenu == 5 ?
                                        <>
                                            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                <div class="sm:col-span-3">
                                                    <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Logo Name</label>
                                                    <div class="mt-2">
                                                        <input onChange={(e) => {
                                                            setLogoName(e.target.value)
                                                        }} type="text" name="first-name" id="first-name" autocomplete="given-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                    </div>
                                                </div>

                                            </div>
                                            <div class="mt-6 flex items-center justify-end gap-x-6">
                                                <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                                                <button type="button" onClick={updateLogoName} class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                                            </div>
                                        </> :
                                        selectedMenu == 6 ?
                                            <>
                                                <table className="table-striped" style={{ width: "100%", height: "auto", minHeight: "200px" }}>
                                                    <thead>
                                                        <tr>
                                                            <th>Index#</th>
                                                            <th>First Name</th>
                                                            <th>Last Name</th>
                                                            <th>Email</th>
                                                            <th>Phone</th>
                                                            <th>Message</th>
                                                            <th>Action</th>
                                                        </tr>
                                                    </thead>
                                                    <tbody>
                                                        {allDemoReqs?.map((team, index) => {
                                                            return (
                                                                <tr style={{ borderBottom: "1px solid #e3e3e3", paddingBottom: "3px" }}>
                                                                    <td style={{ textAlign: "center" }}>{index + 1}</td>
                                                                    <td style={{ textAlign: "center" }}>{team.data.firstname}</td>
                                                                    <td style={{ textAlign: "center" }}>{team.data.lastname}</td>
                                                                    <td style={{ textAlign: "center" }}>{team.data.email}</td>
                                                                    <td style={{ textAlign: "center" }}>{team.data.phone}</td>
                                                                    <td style={{ textAlign: "center", textTransform: "capitalize" }}>{team.data.message}</td>
                                                                    <td style={{ textAlign: "center" }}>
                                                                        <img src={del_icon} alt='del' onClick={() => deleteRecordDocument("demoRequest", team.id)} style={{ margin: "auto", cursor: "pointer" }} width={20} height={20} />
                                                                    </td>
                                                                </tr>
                                                            )
                                                        })}
                                                    </tbody>
                                                </table>
                                            </> :
                                            selectedMenu == 7 ?
                                                <>
                                                    <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                        <div class="sm:col-span-3">
                                                            <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Service Name</label>
                                                            <div class="mt-2">
                                                                <input type="text" name="service-header" id="service-header" autocomplete="service-header" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                            </div>
                                                        </div>
                                                        <div class="sm:col-span-3">
                                                            <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Service Description</label>
                                                            <div class="mt-2">
                                                                <input type="text" name="service-des" id="service-des" autocomplete="service-des" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                            </div>
                                                        </div>

                                                        <div class="sm:col-span-3">
                                                            <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Image</label>
                                                            <div class="mt-2">
                                                                <input type="file" onChange={(e) => uploadImg(e, "service")} accept='image/*' name="service-image" id="service-image" autocomplete="family-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                            </div>
                                                        </div>
                                                    </div>
                                                    <div class="mt-6 flex items-center justify-end gap-x-6">
                                                        <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                                                        <button type="submit" onClick={addNewService} class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                                                    </div>
                                                    <table className="table-striped" style={{ width: "100%", height: "auto" }}>
                                                        <thead>
                                                            <tr>
                                                                <th>Index#</th>
                                                                <th>Service Name</th>
                                                                <th>Service Description</th>
                                                                <th>Image</th>
                                                                <th>Action</th>
                                                            </tr>
                                                        </thead>
                                                        <tbody>
                                                            {allServices?.map((team, index) => {
                                                                return (
                                                                    <tr style={{ borderBottom: "1px solid #e3e3e3", paddingBottom: "3px" }}>
                                                                        <td style={{ textAlign: "center" }}>{index + 1}</td>
                                                                        <td style={{ textAlign: "center" }}>{team.data.serviceHeader}</td>
                                                                        <td style={{ textAlign: "center" }}>{team.data.serviceDesc}</td>
                                                                        <td >
                                                                            <img style={{ margin: "auto", cursor: "pointer" }} src={team.data.imgURL} width={50} height={50} alt={team.data.imgURL} /></td>
                                                                        <td style={{ textAlign: "center" }}>
                                                                            <img src={del_icon} alt='del' onClick={() => deleteRecordDocument("service", team.id)} style={{ margin: "auto", cursor: "pointer" }} width={20} height={20} />
                                                                        </td>
                                                                    </tr>
                                                                )
                                                            })}
                                                        </tbody>
                                                    </table>
                                                </> :
                                                selectedMenu == 8 ?
                                                    <>
                                                        <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                            <div class="sm:col-span-3">
                                                                <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Product Name</label>
                                                                <div class="mt-2">
                                                                    <input type="text" name="product-name" id="product-name" autocomplete="product-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                                </div>
                                                            </div>
                                                            <div class="sm:col-span-3">
                                                                <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Product Description</label>
                                                                <div class="mt-2">
                                                                    <input type="text" name="product-des" id="product-des" autocomplete="product-des" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                                </div>
                                                            </div>
                                                        </div>
                                                        <div class="mt-6 flex items-center justify-end gap-x-6">
                                                            <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                                                            <button type="submit" onClick={addNewProduct} class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                                                        </div>
                                                        <table className="table-striped" style={{ width: "100%", height: "auto" }}>
                                                            <thead>
                                                                <tr>
                                                                    <th>Index#</th>
                                                                    <th>Product Name</th>
                                                                    <th>Product Description</th>
                                                                    <th>Action</th>
                                                                </tr>
                                                            </thead>
                                                            <tbody>
                                                                {allProducts?.map((team, index) => {
                                                                    return (
                                                                        <tr style={{ borderBottom: "1px solid #e3e3e3", paddingBottom: "3px" }}>
                                                                            <td style={{ textAlign: "center" }}>{index + 1}</td>
                                                                            <td style={{ textAlign: "center" }}>{team.data.prodName}</td>
                                                                            <td style={{ textAlign: "center" }}>{team.data.prodDesc}</td>

                                                                            <td style={{ textAlign: "center" }}>
                                                                                <img src={del_icon} alt='del' onClick={() => deleteRecordDocument("product", team.id)} style={{ margin: "auto", cursor: "pointer" }} width={20} height={20} />
                                                                            </td>
                                                                        </tr>
                                                                    )
                                                                })}
                                                            </tbody>
                                                        </table>
                                                    </>
                                                    :
                                                    selectedMenu == 9 ?
                                                        <>
                                                            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                                <div class="sm:col-span-3">
                                                                    <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">CEO Message</label>
                                                                    <div class="mt-2">
                                                                        <input type="text" name="ceo-message" id="ceo-message" autocomplete="product-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                                    </div>
                                                                </div>
                                                                <div class="sm:col-span-3">
                                                                    <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Image</label>
                                                                    <div class="mt-2">
                                                                        <input type="file" onChange={(e) => uploadImg(e, "ceoImage")} accept='image/*' name="service-image" id="service-image" autocomplete="family-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="mt-6 flex items-center justify-end gap-x-6">
                                                                <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                                                                <button type="submit" onClick={addCeoMessage} class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                                                            </div>

                                                        </>
                                                        :
                                                        <>
                                                            <div class="mt-10 grid grid-cols-1 gap-x-6 gap-y-8 sm:grid-cols-6">
                                                                <div class="sm:col-span-3">
                                                                    <label for="first-name" class="block text-sm font-medium leading-6 text-gray-900">Member Name</label>
                                                                    <div class="mt-2">
                                                                        <input type="text" name="member-name" id="member-name" autocomplete="member-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                                    </div>
                                                                </div>
                                                                <div class="sm:col-span-3">
                                                                    <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Member Designation</label>
                                                                    <div class="mt-2">
                                                                        <input type="text" name="member-des" id="member-des" autocomplete="member-des" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                                    </div>
                                                                </div>
                                                                <div class="sm:col-span-3">
                                                                    <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Member Experience</label>
                                                                    <div class="mt-2">
                                                                        <input type="text" name="member-exp" id="member-exp" autocomplete="member-exp" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                                    </div>
                                                                </div>
                                                                <div class="sm:col-span-3">
                                                                    <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Member Age</label>
                                                                    <div class="mt-2">
                                                                        <input type="text" name="member-age" id="member-age" autocomplete="member-age" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                                    </div>
                                                                </div>
                                                                <div class="sm:col-span-3">
                                                                    <label for="last-name" class="block text-sm font-medium leading-6 text-gray-900">Member Image</label>
                                                                    <div class="mt-2">
                                                                        <input type="file" onChange={(e) => uploadImg(e, "member")} accept='image/*' name="member-image" id="member-image" autocomplete="family-name" class="block w-full rounded-md border-0 py-1.5 text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6" />
                                                                    </div>
                                                                </div>
                                                            </div>
                                                            <div class="mt-6 flex items-center justify-end gap-x-6">
                                                                <button type="button" class="text-sm font-semibold leading-6 text-gray-900">Cancel</button>
                                                                <button type="submit" onClick={addNewTeamMember} class="rounded-md bg-indigo-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-indigo-500 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600">Save</button>
                                                            </div>
                                                            <h1 style={{ margin: 0 }}>Teams Member</h1>
                                                            <table className="table-striped" style={{ width: "100%" }}>
                                                                <thead>
                                                                    <tr>
                                                                        <th>Index#</th>
                                                                        <th>Member Name</th>
                                                                        <th>Member designation</th>
                                                                        <th>Member experience</th>
                                                                        <th>Member Age</th>
                                                                        <th>Member Image</th>
                                                                        <th>Delete</th>
                                                                    </tr>
                                                                </thead>
                                                                <tbody>
                                                                    {allTeamsData?.map((team, index) => {
                                                                        return (
                                                                            <tr style={{ borderBottom: "1px solid black", paddingBottom: "10px" }}>
                                                                                <td style={{ textAlign: "center" }}>{index + 1}</td>
                                                                                <td style={{ textAlign: "center", textTransform: "capitalize" }}>{team.data.name}</td>
                                                                                <td style={{ textAlign: "center", textTransform: "capitalize" }}>{team.data.designation}</td>
                                                                                <td style={{ textAlign: "center" }}>{team.data.experience}</td>
                                                                                <td style={{ textAlign: "center" }}>{team.data.age}</td>
                                                                                <td style={{ marginLeft: "auto", marginRight: "auto", display: "block" }}>{team.data.imgURL == undefined || team.data.imgURL == "" ? "" : <img src={team.data.imgURL} width={25} height={25} alt={team.data.imgURL} />}</td>
                                                                                <td style={{ textAlign: "center" }}>
                                                                                    <img src={del_icon} alt='del' onClick={() => deleteRecordDocument("Teams", team.id)} style={{ margin: "auto", cursor: "pointer" }} width={20} height={20} />
                                                                                </td>
                                                                            </tr>
                                                                        )
                                                                    })}

                                                                </tbody>
                                                            </table>


                                                        </>

                        }
                    </div>
                </main>
            </div>

        </>


    )
}

export default Admin;