import express from "express";
import eventRoutes from "./routes/EventRoutes.js";
import * as path from "path";
import methodOverride from "method-override";
const app = express();
import ejsMate from "ejs-mate";
// Set EJS as the view engine

app.set("views", path.join(process.cwd(), "src", "views"));
app.engine("ejs", ejsMate);
app.set("view engine", "ejs");

app.use(express.static(path.join(process.cwd(), "src", "public")));
// Use method override middleware
app.use(methodOverride("_method"));
app.use(express.urlencoded({ extended: true }));
app.get("/", (req, res) => {
  res.render("index", { title: "Event Management App" });
});
app.use("/events", eventRoutes);
app.all("*", (req, res) => {
  throw new Error("Page Not Found");
});
app.use((err, req, res, next) => {
  console.log("Error______________________");
  console.log(err);
  let errors = Array.isArray(err) ? err : [{ msg: err.message }];
  res
    .status(errors[0].status || errors[0].code || 500)
    .render("Error", { errors });
});
export default app;
