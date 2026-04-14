import { useEffect, useMemo, useState } from "react";
import axiosWrapper from "../../utils/AxiosWrapper";
import { useNavigate } from "react-router-dom";
import { BookOpenText, Building, Mail, Phone } from "lucide-react";

const Research = () => {
  const [activeTab, setActiveTab] = useState("scholars");
  const [openIndex, setOpenIndex] = useState(-1);
  const [search, setSearch] = useState("");
  const [scholars, setScholars] = useState([]);
  const navigate=useNavigate();

  useEffect(() => {
    const loadScholars = async () => {
      try {
        const response = await axiosWrapper.get("/scholar");
        if (response.data.success) {
          // console.log(response.data)
          setScholars(response.data.data) ;
        }
      } catch (error) {
        setScholars([]);
      }
    };

    loadScholars();
  }, []);


  const filteredScholars = scholars.filter((scholar) =>{
    let name=scholar.firstName + scholar.lastName;
    return name.toLowerCase().includes(search.toLowerCase())
  });

  return (
    <div className="bg-gray-100 px-10 py-4">
      <h2 className="text-center text-3xl font-semibold py-4 mb-2">Our Research Scholars</h2>
      <div className="mb-6 flex justify-center gap-6 text-2xl font-medium">
        <button
          type="button"
          onClick={() => setActiveTab("scholars")}
          className={
            activeTab === "scholars"
              ? "font-semibold text-orange-400 underline"
              : ""
          }
        >
          Regular
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("partTime")}
          className={
            activeTab === "partTime"
              ? "font-semibold text-orange-400 underline"
              : ""
          }
        >
          Part-Time
        </button>
      </div>

      {activeTab === "scholars" && (
        <div className="mx-auto max-w-6xl rounded bg-white p-4 shadow">
          <div className="grid gap-6 md:grid-cols-2">
            {filteredScholars.map((researcher) => (
            <div
              key={researcher._id}
              className="flex gap-4 rounded-xl border bg-white p-5 shadow-sm transition hover:shadow-md"
            >
              <img
                src={researcher.profile || `https://api.dicebear.com/7.x/avataaars/svg?seed=${researcher.name}`}
                alt={researcher.name}
                className="h-20 w-20 rounded-full object-cover"
              />
              <div>
                <h2
                  className="cursor-pointer pb-1 text-xl font-semibold text-blue-700 transition hover:underline"
                  onClick={() => navigate(`/researcher-details/${researcher._id}`)}
                >
                  {researcher.firstName +" "+ researcher.lastName}
                </h2>
                {researcher.rollNo && (
                  <p className="text-sm text-red-500">({researcher.rollNo})</p>
                )}

                <div className="mt-2 space-y-1 text-sm text-gray-700">
                  <p>
                    <BookOpenText className="inline-block" size={15} /> {researcher.thesis}
                  </p>
                  <p>
                    <Mail className="inline-block" size={15} /> {researcher.email}
                  </p>
                  <p>
                    <Phone className="inline-block" size={15} /> {researcher.phone}
                  </p>
                </div>

                {/* <p className="mt-2 text-sm text-gray-600">{researcher.research}</p> */}
              </div>
            </div>
            ))}
          </div>
        </div>
      )}
    </div>
  );
};

export default Research;
