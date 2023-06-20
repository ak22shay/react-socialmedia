import Post from "../componants/Post";
import { getDocs, collection } from "firebase/firestore";
import { db } from "../config/firebase";
import { useEffect, useState } from "react";
import { PostDataType } from "../interface/PostDataType";
import { Grid } from "@mui/material";

function Home() {
  const postData = collection(db, "posts");
  const [posts, setPosts] = useState<PostDataType[] | null>(null);

  const getPosts = async () => {
    const data = await getDocs(postData);
    setPosts(
      data.docs.map((doc) => ({ ...doc.data(), id: doc.id })) as PostDataType[]
    );
  };
  useEffect(() => {
    getPosts();
  });
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
