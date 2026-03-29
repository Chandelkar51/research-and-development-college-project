import { useEffect, useMemo, useState } from "react";
import axiosWrapper from "../../utils/AxiosWrapper";

const staticResearchAreas = [
  {
    id: "static-area-1",
    title: "Algorithms and Theory",
    desc: "This group works on design and analysis of algorithms, combinatorial optimization, and computational geometry.",
    faculty: ["A Das", "P Bhowmick", "P Dey", "S Kolay"],
  },
  {
    id: "static-area-2",
    title: "Artificial Intelligence and Machine Learning",
    desc: "Focuses on AI, deep learning, NLP, and intelligent systems.",
    faculty: ["R Sharma", "A Singh"],
  },
  {
    id: "static-area-3",
    title: "Cyber Security",
    desc: "Research in cryptography, network security, and data protection.",
    faculty: ["S Kumar", "D Raj"],
  },
];

const staticScholars = [
  {
    id: "static-scholar-1",
    name: "Ankur Priyadarshini",
    roll: "PHD/CS/10054/2017",
    thesis: "POS Tagger & Named Entity Recognition",
    year: "2021",
    guide: "Dr. S. K. Saha",
  },
  {
    id: "static-scholar-2",
    name: "D.R.D. Adhikari",
    roll: "Ph.D/CS/10002/2012",
    thesis: "Wireless Sensor Networks Optimization",
    year: "2019",
    guide: "Dr. D. K. Mallick",
  },
  {
    id: "static-scholar-3",
    name: "Dipti Kumari",
    roll: "Ph.D/CS/10004/2012",
    thesis: "Software Fault Prediction Models",
    year: "2019",
    guide: "Dr. K. Rajnish",
  },
];

const Research = () => {
  const [activeTab, setActiveTab] = useState("areas");
  const [openIndex, setOpenIndex] = useState(-1);
  const [search, setSearch] = useState("");
  const [researchItems, setResearchItems] = useState([]);

  useEffect(() => {
    const loadResearch = async () => {
      try {
        const response = await axiosWrapper.get("/research");
        if (response.data.success) {
          setResearchItems(response.data.data);
        }
      } catch (error) {
        setResearchItems([]);
      }
    };

    loadResearch();
  }, []);

  const researchAreas = useMemo(() => {
    const dynamicAreas = researchItems
      .filter((item) => item.type === "area")
      .map((item) => ({
        id: item._id,
        title: item.title,
        desc: item.description,
        faculty: item.faculty || [],
      }));

    return [...dynamicAreas, ...staticResearchAreas];
  }, [researchItems]);

  const scholars = useMemo(() => {
    const dynamicScholars = researchItems
      .filter((item) => item.type === "scholar")
      .map((item) => ({
        id: item._id,
        name: item.name,
        roll: item.roll,
        thesis: item.thesis,
        year: item.year,
        guide: item.guide,
      }));

    return [...dynamicScholars, ...staticScholars];
  }, [researchItems]);

  const filteredScholars = scholars.filter((scholar) =>
    scholar.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div className="bg-gray-100 px-10 py-6">
      <div className="mb-6 flex justify-center gap-6 text-2xl font-medium">
        <button
          type="button"
          onClick={() => setActiveTab("areas")}
          className={
            activeTab === "areas"
              ? "font-semibold text-orange-400 underline"
              : ""
          }
        >
          Research Areas
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("scholars")}
          className={
            activeTab === "scholars"
              ? "font-semibold text-orange-400 underline"
              : ""
          }
        >
          Our Research Scholars
        </button>
      </div>

      {activeTab === "areas" && (
        <div className="mx-auto max-w-5xl rounded border bg-white shadow">
          {researchAreas.map((area, index) => (
            <div key={area.id || index} className="border-b">
              <div
                className={`cursor-pointer p-4 font-semibold hover:bg-gray-200 ${
                  openIndex === index ? "bg-gray-300" : "bg-gray-100"
                }`}
                onClick={() => setOpenIndex(openIndex === index ? -1 : index)}
              >
                {openIndex === index ? "▼" : "▶"} {area.title}
              </div>

              {openIndex === index && (
                <div className="p-4 text-sm text-gray-700">
                  <p className="mb-4">{area.desc}</p>
                  <div className="flex flex-wrap gap-4">
                    {area.faculty.map((facultyName, facultyIndex) => (
                      <div key={`${area.id}-${facultyIndex}`} className="text-center">
                        <div className="mb-1 h-16 w-16 rounded-full bg-gray-300" />
                        <p className="text-xs">{facultyName}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          ))}
        </div>
      )}

      {activeTab === "scholars" && (
        <div className="mx-auto max-w-6xl rounded bg-white p-4 shadow">
          <div className="mb-4 flex justify-end">
            <input
              type="text"
              placeholder="Search..."
              className="rounded border px-3 py-1"
              value={search}
              onChange={(e) => setSearch(e.target.value)}
            />
          </div>

          <div className="overflow-x-auto">
            <table className="w-full border text-sm">
              <thead className="bg-gray-800 text-white">
                <tr>
                  <th className="border p-2">Name</th>
                  <th className="border p-2">Roll</th>
                  <th className="border p-2">Thesis Title</th>
                  <th className="border p-2">Year</th>
                  <th className="border p-2">Guide</th>
                </tr>
              </thead>
              <tbody>
                {filteredScholars.map((scholar) => (
                  <tr key={scholar.id} className="hover:bg-gray-200">
                    <td className="border p-2">{scholar.name}</td>
                    <td className="border p-2">{scholar.roll}</td>
                    <td className="border p-2">{scholar.thesis}</td>
                    <td className="border p-2">{scholar.year}</td>
                    <td className="border p-2">{scholar.guide}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
};

export default Research;
