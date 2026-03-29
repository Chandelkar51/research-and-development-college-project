import React, { useEffect, useMemo, useState } from "react";
import { Milestone } from "lucide-react";
import axiosWrapper from "../../utils/AxiosWrapper";

const staticNews = [
  {
    id: "static-1",
    title: "Research paper published in IEEE Conference",
    description: "Department researchers published new work in an IEEE conference.",
    date: "March 2026",
  },
  {
    id: "static-2",
    title: "AI Lab inaugurated in CSE Department",
    description: "The new AI lab has been inaugurated for students and researchers.",
    date: "February 2026",
  },
  {
    id: "static-3",
    title: "Students secured top rank in Hackathon",
    description: "Students from the department secured top ranks in a recent hackathon.",
    date: "January 2026",
  },
];

const NewsPage = () => {
  const [notices, setNotices] = useState([]);

  useEffect(() => {
    const loadNotices = async () => {
      try {
        const response = await axiosWrapper.get("/notice");
        if (response.data.success) {
          setNotices(response.data.data);
        }
      } catch (error) {
        setNotices([]);
      }
    };

    loadNotices();
  }, []);

  const mergedNews = useMemo(() => {
    const dynamicNews = notices.map((notice) => ({
      id: notice._id,
      title: notice.title,
      description: notice.description,
      date: new Date(notice.createdAt).toLocaleDateString("en-GB", {
        day: "2-digit",
        month: "short",
        year: "numeric",
      }),
      link: notice.link,
    }));

    return [...dynamicNews, ...staticNews];
  }, [notices]);

  return (
    <div className="min-h-screen bg-gray-50 px-6 py-10 md:px-16">
      <div className="mx-auto max-w-6xl">
        <h1 className="text-center text-4xl font-bold text-gray-900">News</h1>
        <p className="mt-3 text-center text-gray-600">
          Department notices and updates from the admin panel are shown here along
          with the current static news items.
        </p>

        <div className="mt-10 grid gap-6 md:grid-cols-2">
          {mergedNews.map((item) => (
            <div
              key={item.id}
              className="rounded-2xl border border-gray-200 bg-white p-6 shadow-sm transition hover:shadow-md"
            >
              <div className="flex items-start gap-3">
                <Milestone className="mt-1 text-orange-500" />
                <div>
                  <h2 className="text-xl font-semibold text-gray-900">
                    {item.title}
                  </h2>
                  <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                  <p className="mt-4 text-xs font-medium text-blue-600">
                    {item.date}
                  </p>
                  {item.link && (
                    <a
                      href={item.link}
                      target="_blank"
                      rel="noreferrer"
                      className="mt-3 inline-block text-sm font-medium text-blue-600 hover:underline"
                    >
                      Open Notice Link
                    </a>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default NewsPage;
