import { useEffect, useMemo, useState } from "react";

interface Image {
  src: string;
  alt: string;
}

interface Post extends Image {
  id: number;
  title: string;
}

interface MasonryGridProps {
  images: Image[];
  columns: number;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ images, columns }) => {
  const [posts, setPosts] = useState<Post[]>([]);

  // Initialize posts when the component mounts (or whenever images changes.)
  useEffect(() => {
    const generatedPosts: Post[] = images.map((image, index) => ({
      id: index,
      title: `Add to references`,
      ...image,
    }));
    setPosts(generatedPosts);
  }, [images]);

  // Function to distribute posts into columns
  const generateMasonryGrid = useMemo(() => {
    const columnWrappers: Post[][] = Array.from({ length: columns }, () => []);

    posts.forEach((post, index) => {
      const columnIndex = index % columns;
      columnWrappers[columnIndex].push(post);
    });

    return columnWrappers;
  }, [posts, columns]);

  return (
    <div className="masonry-container">
      {generateMasonryGrid.map((columnPosts, index) => (
        <Column key={index} posts={columnPosts} />
      ))}
    </div>
  );
};

interface ColumnProps {
  posts: Post[];
}

const Column: React.FC<ColumnProps> = ({ posts }) => {
  return (
    <div className="column">
      {posts.map((post) => (
        <Post key={post.id} post={post} />
      ))}
    </div>
  );
};

interface PostProps {
  post: Post;
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <div className="post">
      <img src={post.src} alt={post.alt} />
      {/* <div className="overlay">
        <h3>{post.title}</h3>
      </div> */}
    </div>
  );
};

export default MasonryGrid;
