// import Service from '../models/Service.js';
// import Booking from '../models/Booking.js';

// export const getAllServices = async (req, res) => {
//   try {
//     const services = await Service.find();
//     res.json(services);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching services' });
//   }
// };

// export const getServiceById = async (req, res) => {
//   try {
//     const service = await Service.findById(req.params.id);
//     if (!service) {
//       return res.status(404).json({ message: 'Service not found' });
//     }
//     res.json(service);
//   } catch (error) {
//     res.status(500).json({ message: 'Error fetching service' });
//   }
// };

// export const createService = async (req, res) => {
//   try {
//     const { name, description, price, duration, category, isAvailable } = req.body;

//     const service = new Service({
//       name,
//       description,
//       price,
//       duration,
//       category, // Ensure category is included
//       isAvailable: isAvailable !== undefined ? isAvailable : true // Default to true if not provided
//     });

//     await service.save();
//     res.status(201).json(service);
//   } catch (error) {
//     console.error('Error creating service:', error);
//     res.status(500).json({ message: 'Error creating service', error: error.message });
//   }
// };


// export const updateService = async (req, res) => {
//   try {
//     const { name, description, price, duration } = req.body;
//     const service = await Service.findByIdAndUpdate(
//       req.params.id,
//       { name, description, price, duration },
//       { new: true }
//     );
//     if (!service) {
//       return res.status(404).json({ message: 'Service not found' });
//     }
//     res.json(service);
//   } catch (error) {
//     res.status(500).json({ message: 'Error updating service' });
//   }
// };

// export const deleteService = async (req, res) => {
//   try {
//     const service = await Service.findByIdAndDelete(req.params.id);
//     if (!service) {
//       return res.status(404).json({ message: 'Service not found' });
//     }
//     res.json({ message: 'Service deleted successfully' });
//   } catch (error) {
//     res.status(500).json({ message: 'Error deleting service' });
//   }
// };

// export const bookService = async (req, res) => {
//   try {
//     const { serviceId, date } = req.body;
//     const booking = new Booking({
//       user: req.user.id,
//       service: serviceId,
//       date
//     });
//     await booking.save();
//     res.status(201).json(booking);
//   } catch (error) {
//     res.status(500).json({ message: 'Error booking service' });
//   }
// };




import Service from '../models/Service.js';
import Booking from '../models/Booking.js';

export const getAllServices = async (req, res) => {
  try {
    const services = await Service.find();
    res.json(services);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching services', error: error.message });
  }
};

export const getServiceById = async (req, res) => {
  try {
    const service = await Service.findById(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error fetching service', error: error.message });
  }
};

export const createService = async (req, res) => {
  try {
    const { name, description, price, duration, category, isAvailable } = req.body;

    if (!name || !description || !price || !duration || !category) {
      return res.status(400).json({ message: 'All required fields must be provided' });
    }

    const service = new Service({
      name,
      description,
      price,
      duration,
      category,
      isAvailable: isAvailable !== undefined ? isAvailable : true
    });

    await service.save();
    res.status(201).json(service);
  } catch (error) {
    console.error('Error creating service:', error);
    res.status(500).json({ message: 'Error creating service', error: error.message });
  }
};

export const updateService = async (req, res) => {
  try {
    const { name, description, price, duration, category, isAvailable } = req.body;

    const service = await Service.findByIdAndUpdate(
      req.params.id,
      { name, description, price, duration, category, isAvailable },
      { new: true, runValidators: true }
    );

    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }

    res.json(service);
  } catch (error) {
    res.status(500).json({ message: 'Error updating service', error: error.message });
  }
};

export const deleteService = async (req, res) => {
  try {
    const service = await Service.findByIdAndDelete(req.params.id);
    if (!service) {
      return res.status(404).json({ message: 'Service not found' });
    }
    res.json({ message: 'Service deleted successfully' });
  } catch (error) {
    res.status(500).json({ message: 'Error deleting service', error: error.message });
  }
};

export const bookService = async (req, res) => {
  try {
    if (!req.user || !req.user.id) {
      return res.status(400).json({ message: "User authentication required" });
    }

    const { serviceId, date } = req.body;
    const booking = new Booking({
      user: req.user.id,  // Ensure this is populated
      service: serviceId,
      date
    });

    await booking.save();
    res.status(201).json(booking);
  } catch (error) {
    console.error("Error booking service:", error);
    res.status(500).json({ message: "Error booking service", error: error.message });
  }
};
