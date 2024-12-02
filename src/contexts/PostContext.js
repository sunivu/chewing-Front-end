import React, { createContext, useContext, useState } from 'react';

/**
 * 게시물 관련 기능을 제공하는 Context
 * ManagePost에서 숨기거나 삭제한 게시물이
 * 다른 게시물 관련 스크린에 잘 전달되도록 하기 위해 구현하였음.
 */
const PostContext = createContext();

export const PostProvider = ({ children }) => {
  const [posts, setPosts] = useState([
    { id: '1', imageUrl: 'https://kidlingoo.com/wp-content/uploads/flowers_name_in_english-980x510.jpg.webp' },
    { id: '2', imageUrl: 'https://kidlingoo.com/wp-content/uploads/flowers_name_in_english-980x510.jpg.webp' },
    { id: '3', imageUrl: 'https://kidlingoo.com/wp-content/uploads/flowers_name_in_english-980x510.jpg.webp' },
  ]);
  const [hiddenPosts, setHiddenPosts] = useState([]);
  const [deletedPosts, setDeletedPosts] = useState([]);

  const hidePosts = (hiddenPostIds) => {
      const hidden = posts.filter((post) => hiddenPostIds.includes(post.id));
      setHiddenPosts((prev) => [...prev, ...hidden]);
      setPosts((prev) => prev.filter((post) => !hiddenPostIds.includes(post.id)));
  };

  const deletePosts = (deletedPostIds) => {
      const deleted = posts.filter((post) => deletedPostIds.includes(post.id));
      setDeletedPosts((prev) => [...prev, ...deleted]);
      setPosts((prev) => prev.filter((post) => !deletedPostIds.includes(post.id)));
  };

  return (
      <PostContext.Provider value={{ posts, hiddenPosts, deletedPosts, hidePosts, deletePosts }}>
          {children}
      </PostContext.Provider>
  );
};

export const usePosts = () => useContext(PostContext);