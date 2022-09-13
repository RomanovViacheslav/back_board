import * as hapi from "@hapi/hapi";
import routes from "./routes/index";
const HapiNowAuth = require("@now-ims/hapi-now-auth");

const sequelize = require("./database");
const models = require("../src/models/models.ts");

import * as users from "./controllers/userController";
const inert = require("@hapi/inert");

const srv = hapi.server({
  port: process.env.PORT || 3001,
  routes: {
    cors: {
      origin: ["*"],
    },
    // files: {
    //   relativeTo: "./upload/",
    // },
  },
});

const plugins: any[] = [HapiNowAuth, inert];

srv.register(plugins).then(() => {
  srv.auth.strategy("userauth", "hapi-now-auth", {
    validate: (request: any, token: any, h: any) => {
      const user = users.getSession(token);
      const scopes = [];

      if (user) {
        if (user.isAdmin) {
          // scopes.push("admin");
        }
        return {
          isValid: true,
          credentials: {
            scope: scopes,
            userId: user.userId,
            isAdmin: user.isAdmin,
          },
        };
      } else {
        return {
          isValid: false,
          credentials: {},
        };
      }
    },
  });

  sequelize.authenticate();
  sequelize.sync();

  srv.route(routes);

  srv.start().then(() => {
    console.log("start server");
  });
});
