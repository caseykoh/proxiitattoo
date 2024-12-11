import { useEffect, useMemo, useState } from "react";
import { Flash } from "../types/types";

interface MasonryGridProps {
  images: Flash[];
  columns: number;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({ images, columns }) => {
  const [posts, setPosts] = useState<Flash[]>([]);

  // Initialize posts when the component mounts (or whenever images changes.)
  useEffect(() => {
    const generatedPosts: Flash[] = images.map((image, index) => ({
      flashId: index,
      // title: `Add to references`,
      ...image,
    }));
    setPosts(generatedPosts);
  }, [images]);

  // Function to distribute posts into columns
  const generateMasonryGrid = useMemo(() => {
    const columnWrappers: Flash[][] = Array.from({ length: columns }, () => []);

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
  posts: Flash[];
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
  post: Flash;
}

const Post: React.FC<PostProps> = ({ post }) => {
  return (
    <div className="post">
      <img src={post.mainImageUrl} />
      {/* <div className="overlay">
        <h3>{post.title}</h3>
      </div> */}
    </div>
  );
};

export default MasonryGrid;
