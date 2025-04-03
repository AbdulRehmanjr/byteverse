import { CreatePostForm } from "~/components/posts/post-creation";

export const metadata = {
  title: "Create Post",
  description: "Create a new post to share with the community",
};

export default  function CreatePostPage() {
 
  return (
    <div className="mx-6 grid gap-2 p-3">
      <CreatePostForm />
    </div>
  );
}