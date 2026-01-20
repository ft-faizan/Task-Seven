import { useReducer, useEffect, useState } from "react";
import { getCompanyById, updateCompanyById } from "../../Api/Api_Methods.jsx";
import ShowToast from "../Reuseable_Components/ShowToast.jsx";

const styles = {
  modalOverlay: {
    position: "fixed",
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    backgroundColor: "rgba(0, 0, 0, 0.8)",
    backdropFilter: "blur(8px)",
    WebkitBackdropFilter: "blur(8px)",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    zIndex: 1000,
    // padding: "20px",
    height: "100vh",
    overflowY: "auto",
    width: "100vw",
  },
  modalContent: {
    background: "rgba(15, 23, 42, 0.95)",
    backdropFilter: "blur(20px)",
    WebkitBackdropFilter: "blur(20px)",
    borderRadius: "16px",
    padding: " 25px 40px",
    width: "100%",
    maxWidth: "700px",
    maxHeight: "75vh",
    overflowY: "auto",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    boxShadow:
      "0 8px 32px rgba(0, 0, 0, 0.4), inset 0 1px 0 rgba(255, 255, 255, 0.05)",
    fontFamily: "'Montserrat', sans-serif",
    scrollbarWidth: "none",
    msOverflowStyle: "none",
  },

  title: {
    color: "#3b82f6",
    fontSize: "24px",
    fontWeight: "700",
    marginBottom: "28px",
    paddingBottom: "16px",
    borderBottom: "1px solid rgba(255, 255, 255, 0.1)",
    letterSpacing: "0.3px",
  },
  formGrid: {
    display: "grid",
    // gridTemplateColumns: "1fr 1fr",
    gap: "20px",
    marginBottom: "24px",
  },
  formGroupFull: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
    gridColumn: "1 / -1",
  },
  formGroup: {
    display: "flex",
    flexDirection: "column",
    gap: "8px",
  },
  label: {
    color: "rgba(255, 255, 255, 0.7)",
    fontSize: "13px",
    fontWeight: "600",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
  },
  put: {
    backgroundColor: "rgba(15, 23, 42, 0.6)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "10px",
    // padding: "12px 16px",
    // padding: "12px 5px 12px 5px",
    padding: "10px",
    color: "#ffffff",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.3s ease",
    fontFamily: "'Montserrat', sans-serif",
    paddingRight: "0px",
  },
  textarea: {
    backgroundColor: "rgba(15, 23, 42, 0.6)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "10px",
    padding: "12px 16px",
    color: "#ffffff",
    fontSize: "14px",
    outline: "none",
    transition: "all 0.3s ease",
    minHeight: "80px",
    resize: "vertical",
    fontFamily: "'Montserrat', sans-serif",
  },
  select: {
    backgroundColor: "rgba(15, 23, 42, 0.6)",
    border: "1px solid rgba(255, 255, 255, 0.1)",
    borderRadius: "10px",
    padding: "12px 16px",
    color: "#ffffff",
    fontSize: "14px",
    outline: "none",
    cursor: "pointer",
    transition: "all 0.3s ease",
    fontFamily: "'Montserrat', sans-serif",
  },
  buttonGroup: {
    display: "flex",
    justifyContent: "flex-end",
    gap: "12px",
    paddingTop: "24px",
    borderTop: "1px solid rgba(255, 255, 255, 0.1)",
  },
  addButton: {
    backgroundColor: "#3b82f6",
    color: "#ffffff",
    border: "none",
    borderRadius: "10px",
    padding: "12px 32px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    // transition: "all 0.3s ease",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    fontFamily: "'Montserrat', sans-serif",
    // boxShadow: "0 4px 12px rgba(59, 130, 246, 0.3)",
  },
  cancelButton: {
    backgroundColor: "transparent",
    color: "rgba(255, 255, 255, 0.7)",
    border: "1px solid rgba(255, 255, 255, 0.2)",
    borderRadius: "10px",
    padding: "12px 32px",
    fontSize: "14px",
    fontWeight: "700",
    cursor: "pointer",
    transition: "all 0.3s ease",
    textTransform: "uppercase",
    letterSpacing: "0.5px",
    fontFamily: "'Montserrat', sans-serif",
  },
};

const mediaStyles = `
  @import url("https://fonts.googleapis.com/css?family=Montserrat:400,600,700,800");
  
  @media (max-width: 768px) {
    .modal-content-responsive {
      padding: 24px !important;
    }
    .form-grid-responsive {
      grid-template-columns: 1fr !important;
      gap: 16px !important;
    }
    .title-responsive {
      font-size: 20px !important;
    }
    .button-group-responsive {
      flex-direction: column-reverse !important;
      gap: 10px !important;
    }
    .button-responsive {
      width: 100% !important;
    }
  }

  @media (max-width: 480px) {
    .modal-content-responsive {
      padding: 20px !important;
      max-height: 95vh !important;
    }
    .title-responsive {
      font-size: 18px !important;
      margin-bottom: 20px !important;
    }
  }
`;

const emptyData = {
  name: "",
  description: "",
  status: "",
  startDate: "",
  endDate: "",
  budget: "",
  progress: "",
  risks: "",
};

function reducer(state, action) {
  return { ...state, [action.type]: action.val };
}

function AddProjectModal({ show, onClose, editData }) {
  const [data, dispatch] = useReducer(reducer, emptyData);

  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "success",
  });

  useEffect(() => {
    if (editData) {
      Object.keys(emptyData).forEach((key) => {
        if (key in editData) {
          dispatch({ type: key, val: editData[key] });
        }
      });
    }
  }, [editData]);

  const handleSubmit = async () => {
    if (!data.name || !data.status) {
      setSnackbar({
        open: true,
        message: "Project name and status are required",
        severity: "error",
      });
      return;
    }

    try {
      const companyId = localStorage.getItem("userId");
      const res = await getCompanyById(companyId);
      const company = res.data;

      let updatedProjects;

      if (editData) {
        updatedProjects = company.projects.map((p) =>
          p.id === editData.id ? { ...p, ...data } : p,
        );
      } else {
        const newProject = {
          id: Date.now(),
          ...data,
          budget: Number(data.budget || 0),
          progress: Number(data.progress || 0),
          teamMembers: [],
          createdAt: new Date().toISOString(),
        };

        updatedProjects = [...(company.projects || []), newProject];
      }

      await updateCompanyById(companyId, {
        ...company,
        projects: updatedProjects,
      });
      setSnackbar({
        open: true,
        message: editData
          ? "Project updated successfully"
          : "Project added successfully",
        severity: "success",
      });

      // onClose();

      setTimeout(() => {
        onClose();
        window.location.reload();
      }, 800);
    } catch (err) {
      console.error("Project save failed", err);
       setSnackbar({
    open: true,
    message: "Failed to save project",
    severity: "error",
  });
    }
  };

  if (!show) return null;

  return (
    <>
      <style>{mediaStyles}</style>
      <div style={styles.modalOverlay} onClick={onClose}>
        <div
          className="modal-content-responsive"
          style={styles.modalContent}
          onClick={(e) => e.stopPropagation()}
        >
          <h3 className="title-responsive" style={styles.title}>
            {editData ? "Edit Project" : "Add New Project"}
          </h3>

          <div className="form-grid-responsive" style={styles.formGrid}>
            <div style={styles.formGroup}>
              <label style={styles.label}>Project Name</label>
              <input
                style={styles.put}
                placeholder="Project name"
                value={data.name}
                onChange={(e) =>
                  dispatch({ type: "name", val: e.target.value })
                }
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(59, 130, 246, 0.5)";
                  e.target.style.backgroundColor = "rgba(15, 23, 42, 0.8)";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(59, 130, 246, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                  e.target.style.backgroundColor = "rgba(15, 23, 42, 0.6)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Status</label>
              <select
                style={styles.select}
                value={data.status}
                onChange={(e) =>
                  dispatch({ type: "status", val: e.target.value })
                }
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(59, 130, 246, 0.5)";
                  e.target.style.backgroundColor = "rgba(15, 23, 42, 0.8)";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(59, 130, 246, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                  e.target.style.backgroundColor = "rgba(15, 23, 42, 0.6)";
                  e.target.style.boxShadow = "none";
                }}
              >
                <option value="">Select status</option>
                <option value="planned">Planned</option>
                <option value="in-progress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="on-hold">On Hold</option>
              </select>
            </div>

            <div style={styles.formGroupFull}>
              <label style={styles.label}>Description</label>
              <textarea
                style={styles.textarea}
                placeholder="Project description"
                value={data.description}
                onChange={(e) =>
                  dispatch({ type: "description", val: e.target.value })
                }
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(59, 130, 246, 0.5)";
                  e.target.style.backgroundColor = "rgba(15, 23, 42, 0.8)";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(59, 130, 246, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                  e.target.style.backgroundColor = "rgba(15, 23, 42, 0.6)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Start Date</label>
              <input
                style={styles.put}
                type="date"
                value={data.startDate}
                onChange={(e) =>
                  dispatch({ type: "startDate", val: e.target.value })
                }
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(59, 130, 246, 0.5)";
                  e.target.style.backgroundColor = "rgba(15, 23, 42, 0.8)";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(59, 130, 246, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                  e.target.style.backgroundColor = "rgba(15, 23, 42, 0.6)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>End Date</label>
              <input
                style={styles.put}
                type="date"
                value={data.endDate}
                onChange={(e) =>
                  dispatch({ type: "endDate", val: e.target.value })
                }
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(59, 130, 246, 0.5)";
                  e.target.style.backgroundColor = "rgba(15, 23, 42, 0.8)";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(59, 130, 246, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                  e.target.style.backgroundColor = "rgba(15, 23, 42, 0.6)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Budget</label>
              <input
                style={styles.put}
                type="number"
                placeholder="e.g. 100000"
                value={data.budget}
                onChange={(e) =>
                  dispatch({ type: "budget", val: e.target.value })
                }
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(59, 130, 246, 0.5)";
                  e.target.style.backgroundColor = "rgba(15, 23, 42, 0.8)";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(59, 130, 246, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                  e.target.style.backgroundColor = "rgba(15, 23, 42, 0.6)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            <div style={styles.formGroup}>
              <label style={styles.label}>Progress (%)</label>
              <input
                style={styles.put}
                type="number"
                placeholder="e.g. 45"
                min="0"
                max="99"
                value={data.progress}
                onChange={(e) =>
                  dispatch({ type: "progress", val: e.target.value })
                }
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(59, 130, 246, 0.5)";
                  e.target.style.backgroundColor = "rgba(15, 23, 42, 0.8)";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(59, 130, 246, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                  e.target.style.backgroundColor = "rgba(15, 23, 42, 0.6)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>

            <div style={styles.formGroupFull}>
              <label style={styles.label}>Risks</label>
              <textarea
                style={styles.textarea}
                placeholder="Project risks"
                value={data.risks}
                onChange={(e) =>
                  dispatch({ type: "risks", val: e.target.value })
                }
                onFocus={(e) => {
                  e.target.style.borderColor = "rgba(59, 130, 246, 0.5)";
                  e.target.style.backgroundColor = "rgba(15, 23, 42, 0.8)";
                  e.target.style.boxShadow =
                    "0 0 0 3px rgba(59, 130, 246, 0.1)";
                }}
                onBlur={(e) => {
                  e.target.style.borderColor = "rgba(255, 255, 255, 0.1)";
                  e.target.style.backgroundColor = "rgba(15, 23, 42, 0.6)";
                  e.target.style.boxShadow = "none";
                }}
              />
            </div>
          </div>

          <div className="button-group-responsive" style={styles.buttonGroup}>
            <button
              className="button-responsive"
              style={styles.cancelButton}
              onClick={onClose}
              onMouseEnter={(e) => {
                e.target.style.borderColor = "rgba(255, 255, 255, 0.4)";
                e.target.style.color = "#ffffff";
              }}
              onMouseLeave={(e) => {
                e.target.style.borderColor = "rgba(255, 255, 255, 0.2)";
                e.target.style.color = "rgba(255, 255, 255, 0.7)";
              }}
            >
              CANCEL
            </button>
            <button
              className="button-responsive"
              style={styles.addButton}
              onClick={handleSubmit}
              onMouseEnter={(e) => {
                e.target.style.backgroundColor = "#2563eb";
                // e.target.style.transform = "translateY(-2px)";
                // e.target.style.boxShadow = "0 6px 16px rgba(59, 130, 246, 0.4)";
              }}
              onMouseLeave={(e) => {
                e.target.style.backgroundColor = "#3b82f6";
                // e.target.style.transform = "translateY(0)";
                // e.target.style.boxShadow = "0 4px 12px rgba(59, 130, 246, 0.3)";
              }}
            >
              {editData ? "SAVE CHANGES" : "ADD PROJECT"}
            </button>
          </div>
        </div>
      </div>
      <ShowToast
        open={snackbar.open}
        message={snackbar.message}
        severity={snackbar.severity}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
      />
    </>
  );
}

export default AddProjectModal;
