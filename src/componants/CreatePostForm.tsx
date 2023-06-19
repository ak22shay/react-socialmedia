import { Button, Container, Input, TextField } from "@mui/material";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { yupResolver } from "@hookform/resolvers/yup";
import { addDoc, collection } from "firebase/firestore";
import { auth, db } from "../config/firebase";
import { useAuthState } from "react-firebase-hooks/auth";
import { useNavigate } from "react-router-dom";

interface PostFormData {
  title: string;
  description: string;
}

function CreatePostForm() {
  const [user] = useAuthState(auth);
  const postData = collection(db, "posts");
  const navigate = useNavigate();

  const onSubmit = async (data: PostFormData) => {
    await addDoc(postData, {
      ...data,
      username: user?.displayName,
      userId: user?.uid,
    });
    navigate("/");
  };

  const schema = yup.object().shape({
    title: yup.string().required("Title cannot be blank"),
    description: yup.string().required("need valid description"),
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<PostFormData>({
    resolver: yupResolver(schema),
  });
  return (
    <div className="pages createPost">
      <form onSubmit={handleSubmit(onSubmit)} className="createPostContainer">
        <div>
          <Input placeholder="titile" {...register("title")} />
          <p>{errors.title?.message}</p>
        </div>
        <div>
          <TextField placeholder="description" {...register("description")} />
          <p>{errors.description?.message}</p>
        </div>
        <Input type="submit" />
      </form>
    </div>
  );
}

export default CreatePostForm;
