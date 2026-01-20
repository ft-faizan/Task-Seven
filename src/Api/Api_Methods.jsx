import axios from "axios";

const api = axios.create({
    baseURL:"https://69536254a319a928023b4632.mockapi.io/api/overview",
});

// GET METHOD Reusable this useing in two places
export const getPost = (url = "") => {
  return api.get(`/Over-view${url}`);
};

// POST METHOD
export const addPost = (addData) => {
  return api.post("/Over-view", addData);
};


// get company by id
export const getCompanyById = (id) => {
  return api.get(`/Over-view/${id}`);
};

// update company
export const updateCompanyById = (id, data) => {
  return api.put(`/Over-view/${id}`, data);
};
