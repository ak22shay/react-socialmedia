import Post from "../componants/Post";
import { getDocs, collection } from "firebase/firestore";
// import { db } from "../config/firebase";
import { useEffect, useState } from "react";
import { PostDataType } from "../interface/PostDataType";
import { Grid } from "@mui/material";
import { PRODUCTS } from "../database/products";

function Home() {
  const [posts, setPosts] = useState<PostDataType[] | null>(null);

  useEffect(() => {
    setPosts(PRODUCTS);
  }, []);
  return (
    <div className="home pages">
      <div className="homeContainer">
        <Grid container spacing={3} className="postsGrid">
          {posts?.map((post) => (
            <Post post={post} />
          ))}
        </Grid>
      </div>
    </div>
  );
}

export default Home;
