import { createSlice } from "@reduxjs/toolkit";

const chatSlice = createSlice({
    name: "chat",
    initialState: {
        // Only stores messages for the currently selected conversation
        messages: [],
    },
    reducers: {
        // 1. Initial Load: Sets all messages for the selected conversation (from API call)
        setMessages: (state, action) => {
            // New messages replace the old list (e.g., when switching chats)
            state.messages = action.payload;
        },

        // 2. Real-time Optimization: Adds a new message instantly
        addMessage: (state, action) => {
            // New message is pushed to the end of the array
            state.messages.push(action.payload);
        },

        // 3. Cleanup: Clears messages when user logs out or closes the chat window
        clearMessages: (state) => {
            state.messages = [];
        }
    }
});

// Removed setOnlineUsers since it's now handled by socketSlice.js
export const { 
    setMessages, 
    addMessage,      // For instant real-time message arrival
    clearMessages    // For clean state reset
} = chatSlice.actions;

export default chatSlice.reducer;