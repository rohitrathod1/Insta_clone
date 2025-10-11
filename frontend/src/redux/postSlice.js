import { createSlice } from "@reduxjs/toolkit";

const postSlice = createSlice({
    name: 'post',
    initialState: {
        // Core State: Main feed or timeline posts
        posts: [],
        
        // Single View State: For Post Modal or Detail Page
        selectedPost: null,
    },
    reducers: {
        // 1. Initial Load: Sets the main feed posts
        setPosts: (state, action) => {
            state.posts = action.payload;
        },

        // 2. Post Detail: Sets the currently viewed single post
        setSelectedPost: (state, action) => {
            state.selectedPost = action.payload;
        },

        // 3. Optimization: Adds a newly created post to the top of the feed
        addNewPost: (state, action) => {
            // New post is added to the beginning of the array (latest posts first)
            state.posts.unshift(action.payload);
        },

        // 4. Optimization: Handles like/unlike logic for instantaneous UI feedback
        toggleLike: (state, action) => {
            const { postId, userId } = action.payload;
            
            // Function to update post in any given array (feed or selected post)
            const updatePostLikes = (post) => {
                if (post) {
                    const isLiked = post.likes.includes(userId);
                    if (isLiked) {
                        // Unlike: Remove userId
                        post.likes = post.likes.filter(id => id !== userId);
                    } else {
                        // Like: Add userId
                        post.likes.push(userId);
                    }
                }
            };
            
            // Update the main feed array
            const postInFeed = state.posts.find(p => p._id === postId);
            updatePostLikes(postInFeed);

            // Update the selected post (if the modal/detail page is open)
            if (state.selectedPost && state.selectedPost._id === postId) {
                updatePostLikes(state.selectedPost);
            }
        },

        // 5. Cleanup: Removes a post from the feed after deletion
        deletePost: (state, action) => {
            const postId = action.payload;
            // Remove from main feed
            state.posts = state.posts.filter(p => p._id !== postId);
            
            // Clear selected post if it was the one deleted
            if (state.selectedPost && state.selectedPost._id === postId) {
                state.selectedPost = null;
            }
        }
    }
});

export const {
    setPosts, 
    setSelectedPost,
    addNewPost,       // For instant new post display
    toggleLike,       // For instant like/unlike UI
    deletePost        // For instant post removal
} = postSlice.actions;

export default postSlice.reducer;