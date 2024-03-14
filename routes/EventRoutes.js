import { Router } from "express";
import EventController from "../controllers/evntController.js";
import { body } from "express-validator";

const eventRoutes = Router();

eventRoutes.get("/", EventController.renderAll);
eventRoutes.get("/new", EventController.renderNewEventForm);
eventRoutes.put(
  "/edit/:id",
  body("name").notEmpty().withMessage("Event Name is required"),
  body("date")
    .isDate()
    .withMessage("Event date is required")
    .notEmpty()
    .withMessage("Event date is required"),
  body("description").notEmpty().withMessage("Event Description is required"),
  body("location").notEmpty().withMessage("Event Location is required"),
  EventController.updateEvent
);
eventRoutes.get("/edit/:id", EventController.renderEditEventForm);
eventRoutes.post(
  "/new",
  body("name").notEmpty().withMessage("Event Name is required"),
  body("date")
    .isDate()
    .withMessage("Event date is required")
    .notEmpty()
    .withMessage("Event date is required"),
  body("description").notEmpty().withMessage("Event Description is required"),
  body("location").notEmpty().withMessage("Event Location is required"),
  EventController.createEvent
);

eventRoutes.delete("/:id", EventController.deleteEvent);
export default eventRoutes;
