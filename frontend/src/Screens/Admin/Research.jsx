import React, { useEffect, useState } from "react";
import toast from "react-hot-toast";
import { IoMdAdd, IoMdClose } from "react-icons/io";
import { MdDeleteOutline, MdEditNote } from "react-icons/md";
import Heading from "../../components/Heading";
import CustomButton from "../../components/CustomButton";
import DeleteConfirm from "../../components/DeleteConfirm";
import Loading from "../../components/Loading";
import axiosWrapper from "../../utils/AxiosWrapper";

const initialAreaForm = {
  type: "area",
  title: "",
  description: "",
  faculty: "",
};

const initialScholarForm = {
  type: "scholar",
  name: "",
  roll: "",
  thesis: "",
  year: "",
  guide: "",
};

const Research = () => {
  const token = localStorage.getItem("userToken");
  const [dataLoading, setDataLoading] = useState(false);
  const [researchItems, setResearchItems] = useState([]);
  const [activeTab, setActiveTab] = useState("area");
  const [showModal, setShowModal] = useState(false);
  const [editingItem, setEditingItem] = useState(null);
  const [selectedResearchId, setSelectedResearchId] = useState(null);
  const [isDeleteConfirmOpen, setIsDeleteConfirmOpen] = useState(false);
  const [areaForm, setAreaForm] = useState(initialAreaForm);
  const [scholarForm, setScholarForm] = useState(initialScholarForm);

  const getResearchItems = async () => {
    try {
      setDataLoading(true);
      const response = await axiosWrapper.get("/research");
      if (response.data.success) {
        setResearchItems(response.data.data);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      if (error.response?.status === 404) {
        setResearchItems([]);
      } else {
        toast.error(
          error.response?.data?.message || "Failed to load research data"
        );
      }
    } finally {
      setDataLoading(false);
    }
  };

  useEffect(() => {
    getResearchItems();
  }, []);

  const resetModal = () => {
    setShowModal(false);
    setEditingItem(null);
    setAreaForm(initialAreaForm);
    setScholarForm(initialScholarForm);
  };

  const openAddModal = () => {
    setEditingItem(null);
    setAreaForm(initialAreaForm);
    setScholarForm(initialScholarForm);
    setShowModal(true);
  };

  const handleEdit = (item) => {
    setEditingItem(item);
    setActiveTab(item.type);

    if (item.type === "area") {
      setAreaForm({
        type: "area",
        title: item.title || "",
        description: item.description || "",
        faculty: Array.isArray(item.faculty) ? item.faculty.join(", ") : "",
      });
    } else {
      setScholarForm({
        type: "scholar",
        name: item.name || "",
        roll: item.roll || "",
        thesis: item.thesis || "",
        year: item.year || "",
        guide: item.guide || "",
      });
    }

    setShowModal(true);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const payload = activeTab === "area" ? areaForm : scholarForm;

    try {
      toast.loading(editingItem ? "Updating research item" : "Adding research item");
      const response = await axiosWrapper[editingItem ? "put" : "post"](
        `/research${editingItem ? `/${editingItem._id}` : ""}`,
        payload,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );

      toast.dismiss();
      if (response.data.success) {
        toast.success(response.data.message);
        resetModal();
        getResearchItems();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Failed to save research item");
    }
  };

  const handleDelete = async () => {
    try {
      toast.loading("Deleting research item");
      const response = await axiosWrapper.delete(`/research/${selectedResearchId}`, {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      toast.dismiss();
      if (response.data.success) {
        toast.success(response.data.message);
        setIsDeleteConfirmOpen(false);
        getResearchItems();
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.dismiss();
      toast.error(error.response?.data?.message || "Failed to delete research item");
    }
  };

  const researchAreas = researchItems.filter((item) => item.type === "area");
  const researchScholars = researchItems.filter((item) => item.type === "scholar");

  return (
    <div className="w-full mx-auto flex justify-center items-start flex-col my-10">
      <div className="relative flex justify-between items-center w-full">
        <Heading title="Research Management" />
        {!dataLoading && (
          <CustomButton onClick={openAddModal}>
            <IoMdAdd className="text-2xl" />
          </CustomButton>
        )}
      </div>

      <div className="mt-6 flex gap-4">
        <button
          type="button"
          onClick={() => setActiveTab("area")}
          className={`rounded-md px-5 py-2 ${
            activeTab === "area"
              ? "bg-blue-600 text-white"
              : "bg-blue-50 text-blue-700"
          }`}
        >
          Research Areas
        </button>
        <button
          type="button"
          onClick={() => setActiveTab("scholar")}
          className={`rounded-md px-5 py-2 ${
            activeTab === "scholar"
              ? "bg-blue-600 text-white"
              : "bg-blue-50 text-blue-700"
          }`}
        >
          Research Scholars
        </button>
      </div>

      {dataLoading && <Loading />}

      {!dataLoading && activeTab === "area" && (
        <div className="mt-8 w-full grid grid-cols-1 lg:grid-cols-2 gap-6">
          {researchAreas.length === 0 ? (
            <div className="text-center text-base pt-10 w-full">
              No research areas found.
            </div>
          ) : (
            researchAreas.map((item) => (
              <div
                key={item._id}
                className="rounded-xl border bg-white p-6 shadow-sm"
              >
                <div className="flex justify-between gap-4">
                  <div>
                    <h3 className="text-xl font-semibold">{item.title}</h3>
                    <p className="mt-2 text-sm text-gray-600">{item.description}</p>
                    {item.faculty?.length > 0 && (
                      <p className="mt-3 text-sm text-blue-700">
                        Faculty: {item.faculty.join(", ")}
                      </p>
                    )}
                  </div>
                  <div className="flex gap-2">
                    <CustomButton
                      variant="secondary"
                      className="!p-2"
                      onClick={() => handleEdit(item)}
                    >
                      <MdEditNote />
                    </CustomButton>
                    <CustomButton
                      variant="danger"
                      className="!p-2"
                      onClick={() => {
                        setSelectedResearchId(item._id);
                        setIsDeleteConfirmOpen(true);
                      }}
                    >
                      <MdDeleteOutline />
                    </CustomButton>
                  </div>
                </div>
              </div>
            ))
          )}
        </div>
      )}

      {!dataLoading && activeTab === "scholar" && (
        <div className="mt-8 w-full overflow-x-auto">
          <table className="text-sm min-w-full bg-white">
            <thead>
              <tr className="bg-blue-500 text-white">
                <th className="py-4 px-6 text-left font-semibold">Name</th>
                <th className="py-4 px-6 text-left font-semibold">Roll</th>
                <th className="py-4 px-6 text-left font-semibold">Thesis</th>
                <th className="py-4 px-6 text-left font-semibold">Year</th>
                <th className="py-4 px-6 text-left font-semibold">Guide</th>
                <th className="py-4 px-6 text-center font-semibold">Actions</th>
              </tr>
            </thead>
            <tbody>
              {researchScholars.length === 0 ? (
                <tr>
                  <td colSpan="6" className="text-center text-base pt-10">
                    No research scholars found.
                  </td>
                </tr>
              ) : (
                researchScholars.map((item) => (
                  <tr key={item._id} className="border-b hover:bg-blue-50">
                    <td className="py-4 px-6">{item.name}</td>
                    <td className="py-4 px-6">{item.roll}</td>
                    <td className="py-4 px-6">{item.thesis}</td>
                    <td className="py-4 px-6">{item.year}</td>
                    <td className="py-4 px-6">{item.guide}</td>
                    <td className="py-4 px-6 text-center">
                      <div className="flex justify-center gap-2">
                        <CustomButton
                          variant="secondary"
                          className="!p-2"
                          onClick={() => handleEdit(item)}
                        >
                          <MdEditNote />
                        </CustomButton>
                        <CustomButton
                          variant="danger"
                          className="!p-2"
                          onClick={() => {
                            setSelectedResearchId(item._id);
                            setIsDeleteConfirmOpen(true);
                          }}
                        >
                          <MdDeleteOutline />
                        </CustomButton>
                      </div>
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      )}

      {showModal && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white rounded-lg w-[600px] max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center p-6 border-b">
              <h2 className="text-xl font-semibold">
                {editingItem ? "Edit Research Item" : "Add Research Item"}
              </h2>
              <button
                onClick={resetModal}
                className="text-gray-500 hover:text-gray-700"
              >
                <IoMdClose className="text-3xl" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="p-6 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-2">
                  Type
                </label>
                <select
                  value={activeTab}
                  onChange={(e) => setActiveTab(e.target.value)}
                  className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  disabled={!!editingItem}
                >
                  <option value="area">Research Area</option>
                  <option value="scholar">Research Scholar</option>
                </select>
              </div>

              {activeTab === "area" ? (
                <>
                  <input
                    type="text"
                    placeholder="Area title"
                    value={areaForm.title}
                    onChange={(e) =>
                      setAreaForm((prev) => ({ ...prev, title: e.target.value }))
                    }
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    rows="4"
                    placeholder="Description"
                    value={areaForm.description}
                    onChange={(e) =>
                      setAreaForm((prev) => ({
                        ...prev,
                        description: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Faculty names separated by commas"
                    value={areaForm.faculty}
                    onChange={(e) =>
                      setAreaForm((prev) => ({ ...prev, faculty: e.target.value }))
                    }
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </>
              ) : (
                <>
                  <input
                    type="text"
                    placeholder="Scholar name"
                    value={scholarForm.name}
                    onChange={(e) =>
                      setScholarForm((prev) => ({ ...prev, name: e.target.value }))
                    }
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Roll number"
                    value={scholarForm.roll}
                    onChange={(e) =>
                      setScholarForm((prev) => ({ ...prev, roll: e.target.value }))
                    }
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <textarea
                    rows="4"
                    placeholder="Thesis title"
                    value={scholarForm.thesis}
                    onChange={(e) =>
                      setScholarForm((prev) => ({
                        ...prev,
                        thesis: e.target.value,
                      }))
                    }
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Year"
                    value={scholarForm.year}
                    onChange={(e) =>
                      setScholarForm((prev) => ({ ...prev, year: e.target.value }))
                    }
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                  <input
                    type="text"
                    placeholder="Guide"
                    value={scholarForm.guide}
                    onChange={(e) =>
                      setScholarForm((prev) => ({ ...prev, guide: e.target.value }))
                    }
                    className="w-full px-4 py-2 border rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
                  />
                </>
              )}

              <div className="flex justify-end gap-4 pt-4 border-t">
                <CustomButton variant="secondary" onClick={resetModal}>
                  Cancel
                </CustomButton>
                <CustomButton type="submit" variant="primary">
                  {editingItem ? "Update" : "Add"}
                </CustomButton>
              </div>
            </form>
          </div>
        </div>
      )}

      <DeleteConfirm
        isOpen={isDeleteConfirmOpen}
        onClose={() => setIsDeleteConfirmOpen(false)}
        onConfirm={handleDelete}
        message="Are you sure you want to delete this research item?"
      />
    </div>
  );
};

export default Research;
