const Property = require('../models/Property.model');

const allProperty = async (req, res) => {
  try {
    const properties = await Property.find({});
    return res.status(200).send(properties);
  } catch (error) {
    return res.status(500).json({ message: 'Server Error' });
  }
};

const getPropertyById = async (req, res) => {
  const { id } = req.params;

  try {
    const property = await Property.findById(id);

    if (!property) {
      return res.status(404).json({ message: 'Property not found' });
    }

    return res.status(200).json(property);
  } catch (error) {
    console.error('Error:', error);
    return res.status(500).json({ message: 'Server Error' });
  }
};

const addProperty = async (req, res) => {
  const { place, area, nearby, noOfBedrooms, price, owner } = req.body;
  try {
    const newProperty = new Property({
      place,
      area,
      nearby,
      noOfBedrooms,
      price,
      owner,
    });
    await newProperty.save();
    return res.status(201).json({ message: 'Property Added!' });
  } catch (err) {
    return res.status(500).json({ message: 'Server Error!', err: err });
  }
};

const updateProperty = async (req, res) => {
  const propertyId = req.params.id;
  const updateData = req.body;
  try {
    const updatedProperty = await Property.findByIdAndUpdate(
      propertyId,
      updateData,
      { new: true }
    );
    if (!updatedProperty) {
      return res.status(404).json({ message: 'Property not found!' });
    }
    return res
      .status(200)
      .json({ message: 'Property Updated!', property: updatedProperty });
  } catch (err) {
    return res.status(500).json({ message: 'Server Error!', err: err });
  }
};

const deleteProperty = async (req, res) => {
  const propertyId = req.params.id;
  try {
    const deletedProperty = await Property.findByIdAndDelete(propertyId);
    if (!deletedProperty) {
      return res.status(404).json({ message: 'Property not found!' });
    }
    return res.status(200).json({ message: 'Property Deleted!' });
  } catch (err) {
    return res.status(500).json({ message: 'Server Error!', err: err });
  }
};

module.exports = {
  addProperty,
  updateProperty,
  deleteProperty,
  allProperty,
  getPropertyById,
};
