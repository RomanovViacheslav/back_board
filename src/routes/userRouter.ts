import * as joi from "joi";
import * as users from "../controllers/userController";
import * as hapi from "@hapi/hapi";
import { number } from "joi";

export default [
  {
    method: "POST",
    path: "/reg",
    options: {
      validate: {
        payload: joi.object({
          Name: joi.string().required(),
          surName: joi.string().required(),
          email: joi.string().required(),
          password: joi.string().required(),
        }),
      },
    },
    handler(request: any) {
      return users.registr(request.payload);
    },
  },

  {
    method: "GET",
    path: "/user",
    options: {
      auth: {
        strategy: "userauth",
      },
    },
    handler: (request: any, h: any) => {
      return users.getUser(request.auth.credentials.userId);
    },
  },

  {
    method: "POST",
    path: "/login",
    options: {
      validate: {
        payload: joi.object({
          email: joi.string().required(),
          password: joi.string().required(),
        }),
      },
    },
    handler(request: any) {
      return users.login(request.payload);
    },
  },
  {
    method: "GET",
    path: "/logout",
    options: {
      auth: {
        strategy: "userauth",
      },
    },
    handler: (h: any, request: any) => {
      users.logout();
      return "ok";
    },
  },
];
