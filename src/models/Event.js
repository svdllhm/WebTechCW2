import mongoose from "mongoose";

// Define Event schema
const eventSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  date: {
    type: Date,
    required: true,
  },
  location: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },

  createdAt: {
    type: Date,
    default: Date.now,
  },
});

// Create Event model
const Event = mongoose.model("Event", eventSchema);

// Export the Event model
export default Event;
