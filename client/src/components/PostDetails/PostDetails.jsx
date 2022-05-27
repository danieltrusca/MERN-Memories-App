import React from "react";

import {
  Paper,
  Typography,
  CircularProgress,
  Divider,
} from "@material-ui/core/";
import useStyles from "./styles";

const PostDetails = () => {
  const classes = useStyles();
  return (
    <Paper style={{ padding: "20px", borderRadius: "15px" }} elevation={6}>
      <div className={classes.card}>
        <Typography variant="h3" component="h2">
          Post Title
        </Typography>
      </div>
    </Paper>
  );
};

export default PostDetails;
