import React, { useEffect, useState } from 'react'
import { Link, NavLink, Outlet, useNavigate, useParams } from 'react-router-dom'
import { Dot, Milestone } from 'lucide-react'
import axiosWrapper from '../../utils/AxiosWrapper'


const ResearcherDetails = () => {
    const {id}=useParams();
    const [scholar, setScholar]=useState({});
    const [loading, setLoading]=useState(false);

    useEffect(()=>{
        const loadData=async ()=>{
            try{
                setLoading(true);
                const response=await axiosWrapper.get(`/scholar/${id}`);
                if(response.data.success){
                    console.log(response.data.data)
                    setScholar(response.data.data);
                }
            }
            catch(error){
                console.log(error)
            }
            finally{
                setLoading(false);
            }
        }
        loadData();
    },[])

    return (
        <div className="min-h-screen bg-gray-100 mb-8">
            <div className="bg-orange-300 py-6 text-center">
                <h1 className="text-4xl font-bold tracking-widest text-white">
                    {scholar.firstName + " " + scholar.lastName}
                </h1>
            </div>

            <div className="bg-orange-700 text-white px-10 py-2 flex justify-evenly">
                <NavLink to={"/researchers"} className="cursor-pointer hover:underline"
                    >Home
                </NavLink>
                <NavLink to={`/researcher-details/${id}`} className="cursor-pointer hover:underline"
                    >Profile
                </NavLink>
                <NavLink to={`/researcher-details/${id}/publications`} className="cursor-pointer hover:underline"
                    >Publications
                </NavLink>
                <NavLink to={`/researcher-details/${id}/semesters`} className="cursor-pointer hover:underline"
                    >Semester Registration
                </NavLink>
            </div>

            <Outlet context={{scholar}} />

        </div>
    );
  }

export default ResearcherDetails;
