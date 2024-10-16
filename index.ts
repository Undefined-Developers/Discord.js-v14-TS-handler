import("dotenv").then(dotenv => dotenv.config({debug:true}));
import("./bridge").then(Bridge => Bridge.startBridge());