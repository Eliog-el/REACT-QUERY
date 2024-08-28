import { useQuery } from "@tanstack/react-query";
import { fetchComments } from "./api";
import "./PostDetail.css";

export function PostDetail({ post, deleteMutaion, updateMutation }) {
  // replace with useQuery
  const postId = post.id;
  const { data, isError, error, isLoading } = useQuery({
    queryKey: ["comment", postId],
    queryFn: () => fetchComments(postId),
  });

  if (isError) {
    return (
      <>
        <div>Error loading comment</div>
        <p>{error.toString()}</p>;
      </>
    );
  }

  if (isLoading) {
    return <p>Loading...</p>;
  }

  return (
    <>
      <h3 style={{ color: "blue" }}>{post.title}</h3>
      <div>
        <button onClick={() => deleteMutaion.mutate(postId)}>Delete</button>
        {deleteMutaion.isPending && (
          <p className="loading">Deleting the post</p>
        )}
        {deleteMutaion.isError && (
          <p className="error">
            Error deleting the post: {deleteMutaion.error.toString()}
          </p>
        )}
        {deleteMutaion.isSuccess && (
          <p className="success">Post was (not) deleted</p>
        )}
      </div>

      <div>
        <button onClick={() => updateMutation.mutate(postId)}>
          Update title
        </button>
        {updateMutation.isPending && (
          <p className="loading">Posts updating...</p>
        )}
        {updateMutation.isError && (
          <p className="error">
            Error updating the post: {updateMutation.error.toString()}
          </p>
        )}
        {updateMutation.isSuccess && (
          <p className="success">Pass was (not) updated succesfully!</p>
        )}
      </div>
      <p>{post.body}</p>
      <h4>Comments</h4>
      {data.map((comment) => (
        <li key={comment.id}>
          {comment.email}: {comment.body}
        </li>
      ))}
    </>
  );
}
