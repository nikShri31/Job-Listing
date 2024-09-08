import { createSlice } from '@reduxjs/toolkit';

const initialState={
    notifications:[
        {
            id: 1,
            message: 'Your application for "Frontend Developer" has been received.',
            read: false,
          },
          {
            id: 2,
            message: 'Your interview for "Backend Developer" is scheduled for tomorrow.',
            read: false,
          },

    ],
    unreadCount:2,
}

const notificationsSlice = createSlice({
    name: 'notifications',
    initialState,
    reducers:{
        addNotification :(state,action)=>{ 
             state.notifications.push(action.payload);  
            state.unreadCount += 1;  // Increment unread,
        },
        markAsRead: (state, action) => {
            const notificationId = action.payload;
            const notificationIndex = state.notifications.findIndex((notif) => notif.id === notificationId);
            state.notifications = state.notifications.map((notification) =>
              notification.id === notificationId
                ? { ...notification, read: true }
                : notification
            );
            // Decrease unread count
            state.unreadCount > 0 ? state.unreadCount -= 1 : 0 ;

            if (notificationIndex !== -1) {
                // Mark the notification as read
                state.notifications[notificationIndex].read = true;
                state.notifications.sort((a, b) => a.read - b.read);
              }
          },

          deleteNotification: (state, action) => {
            const notificationId = action.payload;
            const index = state.notifications.findIndex(notif => notif.id === notificationId);
            if (index !== -1) {
              // If the notification was unread, decrement the unread count
              if (!state.notifications[index].read) {
                state.unreadCount = Math.max(state.unreadCount - 1, 0);
              }
              state.notifications.splice(index, 1);
            }
          },

        clearAllNotifications:(state)=>{
            state.notifications=[];
            state.unreadCount=0
        },
    }
    
})

export const {addNotification, markAsRead, deleteNotification,clearAllNotifications}= notificationsSlice.actions;
export default notificationsSlice.reducer;