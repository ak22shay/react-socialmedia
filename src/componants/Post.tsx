import {
  Card,
  CardActions,
  CardContent,
  Grid,
  Typography,
} from "@mui/material";
import ThumbUpIcon from "@mui/icons-material/ThumbUp";
import ThumbUpOutlinedIcon from "@mui/icons-material/ThumbUpOutlined";
import { PostDataType } from "../interface/PostDataType";
import {
  addDoc,
  collection,
  getDoc,
  getDocs,
  query,
  where,
} from "firebase/firestore";
import { useNavigate } from "react-router-dom";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useEffect, useState } from "react";

interface Props {
  post: PostDataType;
}
interface Likes {
  userId: string;
}
function Posts(props: Props) {
  //   const [liked, setLiked] = useState<boolean | null>(false);
  const [likes, setLikes] = useState<Likes[] | null>(null);
  const [user] = useAuthState(auth);
  const { post } = props;
  const navigate = useNavigate();

  const liked = likes?.find((like) => like.userId === user?.uid);

  const likesRef = collection(db, "likes");
  const likesDoc = query(likesRef, where("postId", "==", post.id));

  const getLikes = async () => {
    const data = await getDocs(likesDoc);
    setLikes(data.docs.map((doc) => ({ userId: doc.data().userId })));
  };
  useEffect(() => {
    getLikes();
  });

  const addLike = async () => {
    await addDoc(likesRef, {
      userId: user?.uid,
      postId: post?.id,
    });
    console.log(liked);
  };
  const disLike = async () => {
    // setLiked((prev) => !prev);
  };

  return (
    <Grid item md={10}>
      <Card className="postCard">
        <CardContent className="postCardContent">
          <Typography variant="h4">{post?.title}</Typography>
          <Typography variant="subtitle1">{post?.description}</Typography>
        </CardContent>
        <CardActions>
          {!liked ? (
            <ThumbUpOutlinedIcon onClick={() => addLike()} />
          ) : (
            <ThumbUpIcon onClick={() => disLike()} />
          )}
          <p>Likes: {likes?.length}</p>
        </CardActions>
      </Card>
    </Grid>
  );
}

export default Posts;
