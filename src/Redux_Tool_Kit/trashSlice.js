



import { createSlice } from "@reduxjs/toolkit";

// Load trash from locore bhijann fizannnnn
const loadTrash = () => {
  const data = localStorage.getItem("trash");
  return data ? JSON.parse(data) : { employees: [], projects: [] };
};

const initialState = loadTrash();

const trashSlice = createSlice({
  name: "trash",
  initialState,
  reducers: {
   
    addEmployeeToTrash: (state, action) => {
      state.employees.push(action.payload);
      localStorage.setItem("trash", JSON.stringify(state));
    },

    removeEmployeeFromTrash: (state, action) => {
      state.employees = state.employees.filter(
        (emp) => emp.id !== action.payload
      );
      localStorage.setItem("trash", JSON.stringify(state));
    },

    restoreEmployeeFromTrash: (state, action) => {
      state.employees = state.employees.filter(
        (emp) => emp.id !== action.payload
      );
      localStorage.setItem("trash", JSON.stringify(state));
    },

    cleanupExpiredEmployees: (state) => {
      const now = Date.now();
      const DAY = 24 * 60 * 60 * 1000;

      state.employees = state.employees.filter(
        (emp) => now - emp.deletedAt < DAY
      );

      localStorage.setItem("trash", JSON.stringify(state));
    },

    
    addProjectToTrash: (state, action) => {
      state.projects.push(action.payload);
      localStorage.setItem("trash", JSON.stringify(state));
    },

    removeProjectFromTrash: (state, action) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload
      );
      localStorage.setItem("trash", JSON.stringify(state));
    },

    restoreProjectFromTrash: (state, action) => {
      state.projects = state.projects.filter(
        (project) => project.id !== action.payload
      );
      localStorage.setItem("trash", JSON.stringify(state));
    },

    cleanupExpiredProjects: (state) => {
      const now = Date.now();
      const DAY = 24 * 60 * 60 * 1000;

      state.projects = state.projects.filter(
        (project) => now - project.deletedAt < DAY
      );

      localStorage.setItem("trash", JSON.stringify(state));
    },
  },
});

export const {
  addEmployeeToTrash,
  removeEmployeeFromTrash,
  restoreEmployeeFromTrash,
  cleanupExpiredEmployees,

  addProjectToTrash,
  removeProjectFromTrash,
  restoreProjectFromTrash,
  cleanupExpiredProjects,
} = trashSlice.actions;

export default trashSlice.reducer;

