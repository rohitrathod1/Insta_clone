import { createSlice } from "@reduxjs/toolkit";

const socketSlice = createSlice({
    name: "socketio",
    initialState: {
        // 1. Socket Connection: The active Socket.io client instance
        socket: null, 
        
        // 2. Real-time Status: Array of user IDs currently online
        onlineUsers: [], 
    },
    reducers: {
        // Sets the Socket.io instance
        setSocket: (state, action) => {
            state.socket = action.payload;
        },

        // Sets the list of all currently online user IDs
        setOnlineUsers: (state, action) => {
            state.onlineUsers = action.payload;
        },
        
        // Clean Code: Action to clear socket state upon logout
        clearSocketState: (state) => {
            if (state.socket) {
                state.socket.disconnect(); // Disconnect the socket instance
            }
            state.socket = null;
            state.onlineUsers = [];
        }
    }
});

export const {
    setSocket,
    setOnlineUsers, // New action for online users list
    clearSocketState // New action for clean logout
} = socketSlice.actions;

export default socketSlice.reducer;