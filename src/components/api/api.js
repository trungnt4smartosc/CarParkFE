import axios from "axios";

/** @param {string} resource */
const get = (resource) => {
  return axios.get(resource);
};

/** @param {string} resource */
/** @param {object} model */
const post = (resource, model) => {
  return axios.post(resource, model);
};

export const apiProvider = {
  get,
  post
};
