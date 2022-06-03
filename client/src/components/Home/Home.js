import React, { useState } from "react";
import {
  Container,
  Grow,
  Grid,
  Paper,
  AppBar,
  TextField,
  Button,
} from "@material-ui/core";

import { useHistory, useLocation } from "react-router-dom";
import ChipInput from "material-ui-chip-input";

import { useDispatch } from "react-redux";
import { getPostsBySearch } from "../../redux/actions/posts";

import Posts from "../Posts/Posts";
import Form from "../Form/Form";
import Paginate from "../Pagination/Pagination";

import useStyles from "./styles";

function useQuery() {
  return new URLSearchParams(useLocation().search);
}

const Home = () => {
  const [currentId, setCurrentId] = useState(0);
  const [search, setSearch] = useState("");
  const [tags, setTags] = useState([]);

  const dispatch = useDispatch();
  const query = useQuery();
  const page = query.get("page") || 1;
  const searchQuery = query.get("searchQuery");
  const history = useHistory();

  const classes = useStyles();

  // console.log('page:'+page);

  // useEffect(() => {
  //   dispatch(getPosts());
  // }, [currentId, dispatch]);

  const searchPost = async () => {
    if (search.trim() || tags) {
      await dispatch(getPostsBySearch({ search, tags: tags.join(",") }));
      history.push(
        `/posts/search?searchQuery=${search || "none"}&tags=${tags.join(",")}`
      );
    } else {
      history.push("/");
    }
  };

  // const searchPost= ()=>{
  //   dispatch(searchPosts());
  // }

  const handleKeyPress = (e) => {
    if (e.keyCode === 13) {
      searchPost();
    }
  };

  const handleAddChip = (tag) => setTags([...tags, tag]);

  const handleDeleteChip = (chipToDelete) =>
    setTags(tags.filter((tag) => tag !== chipToDelete));

  return (
    <Grow in>
      <Container maxWidth="xl">
        <Grid
          container
          justifyContent="space-between"
          alignItems="stretch"
          spacing={3}
          className={classes.gridContainer}
        >
          <Grid item sm={12} md={6} xl={9}>
            <Posts setCurrentId={setCurrentId} />
          </Grid>

          <Grid item sm={12} md={6} xl={3}>
            <AppBar
              className={classes.appBarSearch}
              position="static"
              color="inherit"
            >
              <TextField
                onKeyDown={handleKeyPress}
                name="search"
                variant="outlined"
                label="Search Memories"
                fullWidth
                value={search}
                onChange={(e) => setSearch(e.target.value)}
              />
              <ChipInput
                style={{ margin: "10px 0" }}
                value={tags}
                onAdd={(chip) => handleAddChip(chip)}
                onDelete={(chip) => handleDeleteChip(chip)}
                label="Search Tags"
                variant="outlined"
              />
              <Button
                onClick={searchPost}
                className={classes.searchButton}
                variant="contained"
                color="primary"
              >
                Search
              </Button>
            </AppBar>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
            {!searchQuery && !tags.length && (
              <Paper className={classes.pagination} elevation={6}>
                <Paginate page={page} />
              </Paper>
            )}
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
