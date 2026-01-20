import Snackbar from "@mui/material/Snackbar";
import Alert from "@mui/material/Alert";

export default function ShowToast({
  open,
  message,
  severity = "success",
  onClose,
}) {
  return (
    <Snackbar
      open={open}
      autoHideDuration={3000}   
      onClose={onClose}
      anchorOrigin={{ vertical: "top", horizontal: "right" }}
    >
      <Alert
        onClose={onClose}
        severity={severity}
        variant="filled"
        sx={{ width: "100%" }}
      >
        {message}
      </Alert>
    </Snackbar>
  );
}



