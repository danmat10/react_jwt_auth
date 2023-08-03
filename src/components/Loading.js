import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
import Box from "@mui/material/Box";

function Loading() {
  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100px", // Ajuste conforme necessário
      }}
    >
      <CircularProgress />
    </Box>
  );
}

export default Loading;
