import axios from "axios";

const Page = ({ posts, error }) => {
  if (error) {
    return <div>An error occured: {error.message}</div>;
  }
  return (
    <ul>
      {posts.map((post) => (
        <li key={post.id}>{post.title}</li>
      ))}
    </ul>
  );
};

Page.getInitialProps = async (ctx) => {
  try {
    const res = await axios.get("http://localhost:1337/posts/");
    const posts = res.data;
    return { posts };
  } catch (error) {
    return { error };
  }
};

export default Page;
