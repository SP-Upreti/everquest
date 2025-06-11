import { StaticImport } from "next/dist/shared/lib/get-img-props";
import React, {
  createContext,
  useContext,
  useState,
  useEffect,
  ReactNode,
} from "react";

interface Blog {
  _id: string;
  title: string;
  description: string;
  slug: string;
  banner: StaticImport;
  createdAt: string;
  updatedAt: string;
  blogId: string;
}

interface BlogContextType {
  blog: Blog[];
  isLoading: boolean;
  blogs: Blog | undefined;
  fetchBlog: (slug: string) => void;
  error: Error | null;
  refetch: () => Promise<void>;
}

const BlogContext = createContext<BlogContextType | undefined>(undefined);

export const BlogProvider: React.FC<{ children: ReactNode }> = ({
  children,
}) => {
  const [blog, setBlog] = useState<Blog[]>([]);
  const [blogs, setBlogs] = useState<Blog>();
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<Error | null>(null);

  const fetchBlogs = async () => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs`
      ); // Adjust this URL to your API endpoint
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      setBlog(data.data ?? []);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
    } finally {
      
      setIsLoading(false);
    }
  };

  const fetchBlog = async (slug: string) => {
    setIsLoading(true);
    setError(null);
    try {
      const response = await fetch(
        `${process.env.NEXT_PUBLIC_BACKEND_URL}/api/blogs/${slug}`
      ); // Adjust this URL to your API endpoint
      if (!response.ok)
        throw new Error(`HTTP error! status: ${response.status}`);

      const data = await response.json();
      setBlogs(data.data);
    } catch (err) {
      setError(
        err instanceof Error ? err : new Error("An unknown error occurred")
      );
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  const value: BlogContextType = {
    blog,
    fetchBlog,
    blogs,
    isLoading,
    error,
    refetch: fetchBlogs,
  };

  return <BlogContext.Provider value={value}>{children}</BlogContext.Provider>;
};

export const useBlog = (): BlogContextType => {
  const context = useContext(BlogContext);
  if (!context) {
    throw new Error("useBlog must be used within a BlogProvider");
  }
  return context;
};
