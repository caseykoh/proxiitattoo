import { useEffect, useMemo, useState } from "react";
import { Flash } from "../types/types";
const apiUrl = import.meta.env.VITE_APP_API_ENDPOINT;

interface MasonryGridProps {
  images: Flash[];
  columns: number;
  onImageClick: (flash: Flash) => void;
}

const MasonryGrid: React.FC<MasonryGridProps> = ({
  images,
  columns,
  onImageClick,
}) => {
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
        <Column key={index} posts={columnPosts} onImageClick={onImageClick} />
      ))}
    </div>
  );
};

interface ColumnProps {
  posts: Flash[];
  onImageClick: (flash: Flash) => void;
}

const Column: React.FC<ColumnProps> = ({ posts, onImageClick }) => {
  return (
    <div className="column">
      {posts.map((post) => (
        <Post key={post.id} post={post} onImageClick={onImageClick} />
      ))}
    </div>
  );
};

interface PostProps {
  post: Flash;
  onImageClick: (flash: Flash) => void;
}

const Post: React.FC<PostProps> = ({ post, onImageClick }) => {
  return (
    <div className="post cursor-pointer" onClick={() => onImageClick(post)}>
      <img
        src={`${post.image.url}`} // or your production domain
        alt={post.image.alt || "Flash image"}
      />
      {/* <div className="overlay">
        <h3>{post.title}</h3>
      </div> */}
    </div>
  );
};

export default MasonryGrid;
