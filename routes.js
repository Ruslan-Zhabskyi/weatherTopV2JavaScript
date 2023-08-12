import express from "express";
import { dashboardController } from "./controllers/dashboard-controller.js";
import { aboutController } from "./controllers/about-controller.js";
import { stationController} from "./controllers/station-controller.js";
import { accountsController } from './controllers/accounts.js';

export const router = express.Router();

// router.get("/", dashboardController.index); as we replaced it with line 20

router.get("/dashboard", dashboardController.index);
router.post("/dashboard/addstation", dashboardController.addStation);
router.get("/about", aboutController.index);
router.get("/station/:id", stationController.index);

router.post("/station/:id/addreading",stationController.addReading);
router.get("/dashboard/deleteplaylist/:id",dashboardController.deleteStation);
router.get("/station/:stationid/deletereading/:readingid",stationController.deleteReading);

router.get("/", accountsController.index);
router.get("/login", accountsController.login);
router.get("/signup", accountsController.signup);
router.get("/logout", accountsController.logout);
router.post("/register", accountsController.register);
router.post("/authenticate", accountsController.authenticate);
