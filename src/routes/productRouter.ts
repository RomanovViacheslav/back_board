import * as hapi from "@hapi/hapi";
import * as joi from "joi";
import * as products from "../controllers/productController";
const fs = require("fs");

export default [
  {
    method: "POST",
    path: "/add",

    config: {
      auth: {
        strategy: "userauth",
      },
      payload: {
        output: "stream",
        parse: true,
        multipart: true,
        maxBytes: 2097152,
      },
    },
    handler: async (request: hapi.Request, h: hapi.ResponseToolkit) => {
      return products.addProduct(
        request.payload,
        request.auth.credentials.userId
      );
    },
  },
  {
    method: "GET",
    path: "/product-user",
    options: {
      auth: {
        strategy: "userauth",
      },
    },
    handler: async (request: hapi.Request, h: hapi.ResponseToolkit) => {
      return products.getProductsUser(
        request.auth.credentials.isAdmin,
        request.auth.credentials.userId,
        request.query.limit,
        request.query.page,
        request.query.search
      );
    },
  },
  {
    method: "GET",
    path: "/product/{id}",
    options: {},
    handler: async (request: hapi.Request, h: hapi.ResponseToolkit) => {
      return products.getProductOne(request.params.id);
    },
  },

  {
    method: "GET",
    path: "/photo/{file*}",
    handler: {
      directory: {
        path: "upload",
      },
    },
  },
  {
    method: "DELETE",
    path: "/product/{id}",
    options: {
      auth: {
        strategy: "userauth",
      },
    },

    handler: async (request: hapi.Request, h: hapi.ResponseToolkit) => {
      return products.deleteProduct(
        request.auth.credentials.isAdmin,
        request.auth.credentials.userId,
        request.params.id
      );
    },
  },
  {
    method: "GET",
    path: "/product-public",
    options: {},
    handler: async (request: hapi.Request, h: hapi.ResponseToolkit) => {
      return products.getPublicProduct(
        request.query.limit,
        request.query.page,
        request.query.category,
        request.query.search
      );
    },
  },
  {
    method: "PUT",
    path: "/product/{id}",

    config: {
      auth: {
        strategy: "userauth",
      },
      payload: {
        output: "stream",
        parse: true,
        multipart: true,
        maxBytes: 2097152,
      },
    },
    handler: async (request: hapi.Request, h: hapi.ResponseToolkit) => {
      return products.updateProduct(
        request.payload,
        request.auth.credentials.isAdmin,
        request.auth.credentials.userId,
        request.params.id
      );
    },
  },
  {
    method: "GET",
    path: "/product-user/{id}",
    options: {
      auth: {
        strategy: "userauth",
      },
    },
    handler: async (request: hapi.Request, h: hapi.ResponseToolkit) => {
      return products.getProductUserOne(
        request.params.id,
        request.auth.credentials.isAdmin,
        request.auth.credentials.userId
      );
    },
  },
];
