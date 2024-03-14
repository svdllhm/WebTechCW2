import { validationResult } from "express-validator";
import Event from "../models/Event.js";
export default class EventController {
  static async renderAll(req, res) {
    let errors = [];
    const events = await Event.find();
    if (!events) {
      errors.push({ msg: "Events doesnt exists yet" });
    }
    return res.render("Events", { title: "All Events", events, errors });
  }
  static async renderNewEventForm(req, res) {
    return res.render("NewEvent", { title: "New Event", errors: [] });
  }

  static async renderEditEventForm(req, res) {
    const event = await Event.findById(req.params.id);
    return res.render("EditEvent", { title: "Edit Event", event, errors: [] });
  }

  static async createEvent(req, res) {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("NewEvent", {
        title: "New Event",
        errors: errors.array(),
      });
    }

    const { name, date, location, description } = req.body;

    // Create a new event
    const newEvent = new Event({
      name,
      date,
      location,
      description,
    });

    // Save the event to the database
    await newEvent.save();

    // Redirect to the events page or any other appropriate page
    res.redirect("/events");
  }
  static async deleteEvent(req, res) {
    const { id } = req.params;
    const event = await Event.findByIdAndDelete(id);
    const errors = [];
    if (!event) {
      errors.push({ msg: "Deleting event doesn't exists" });
    }

    // Redirect to the events page or any other appropriate page
    return res.redirect("/events");
  }
  static async updateEvent(req, res) {
    const { id } = req.params;
    const { name, date, location, description } = req.body;
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.render("EditEvent", {
        title: "EditEvent Event",
        errors: errors.array(),
        event: { _id: id, name, date, location, description },
      });
    }

    // Update event
    const newEvent = await Event.findByIdAndUpdate(id, {
      name,
      date,
      location,
      description,
    });

    // Redirect to the events page or any other appropriate page
    res.redirect("/events");
  }
}
