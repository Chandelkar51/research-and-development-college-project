const mongoose = require("mongoose");
const Publication = require("../models/publication.model");
const ApiResponse = require("../utils/ApiResponse");

exports.createPublication = async (req, res) => {
  try {
    const { title, type, scholar, name} = req.body;

    if (!title || !type || !scholar || !name) {
      return ApiResponse.badRequest("Title, type, scholar and name are required").send(res);
    }

    const publication = new Publication(req.body);
    const saved = await publication.save();

    return ApiResponse.success(saved, "Data Saved!").send(res);
  } catch (error) {
    return ApiResponse.error(error.message).send(res);
  }
};


exports.getAllPublications = async (req, res) => {
  try {
    const publications = await Publication.find()
      .populate("scholar", "firstName lastName rollNo");

    return ApiResponse.success(publications, "Data fetched").send(res);
  } catch (error) {
    return ApiResponse.error(error.message).send(res);
  }
};

exports.getPublicationById = async (req, res) => {
  try {
    const { type, id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id) || !type) {
      return ApiResponse.badRequest("Wrong Request").send(res);
    }

    const publication = await Publication.find({scholar : id, type})
      .populate("scholar", "firstName lastName rollNo");

    if (!publication) {
      return ApiResponse.notFound("No Records").send(res);
    }

    return ApiResponse.success(publication, "Data Fetched").send(res);
  } catch (error) {
    return ApiResponse.error(error.message).send(res);
  }
};

exports.updatePublication = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return ApiResponse.badRequest("Wrong Request").send(res);
    }

    const updated = await Publication.findByIdAndUpdate(id,
      req.body,
      { new: true, runValidators: true }
    )
      .populate("scholar", "firstName lastName rollNo");

    if (!updated) {
      return ApiResponse.notFound("Publication not found!").send(res);
    }

    return ApiResponse.success(updated, "Publication updated.").send(res);
  } catch (error) {
    return ApiResponse.error(error.message).send(res);
  }
};


exports.deletePublication = async (req, res) => {
  try {
    const { id } = req.params;

    if (!mongoose.Types.ObjectId.isValid(id)) {
      return ApiResponse.badRequest("Wrong Request").send(res);
    }

    const deleted = await Publication.findByIdAndDelete(id);

    if (!deleted) {
      return ApiResponse.notFound("Publication not found!").send(res);
    }

    return ApiResponse.success(deleted, "Publication deleted successfully.").send(res);
  } catch (error) {
    return ApiResponse.error(error.message).send(res);
  }
};
