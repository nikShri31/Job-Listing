import { faker } from '@faker-js/faker';
import { createSlice } from '@reduxjs/toolkit';
import { set, sub } from 'date-fns';

const initialState={
    notifications:[
      {
        id: faker.string.uuid(),
        title: 'New job application received',
        description: 'John Doe applied for the Software Engineer position',
        avatar: 'public/assets/images/avatars/avatar_1.jpg',
        type: 'job_application',
        createdAt: set(new Date(), { hours: 9, minutes: 15 }),
        isUnRead: true,
      },
      {
        id: faker.string.uuid(),
        title: 'Interview scheduled',
        description: 'Interview with Jane Smith is scheduled for tomorrow',
        avatar: '/assets/images/avatars/avatar_2.jpg',
        type: 'interview_scheduled',
        createdAt: sub(new Date(), { hours: 5, minutes: 45 }),
        isUnRead: true,
      },
      {
        id: faker.string.uuid(),
        title: 'New message from HR',
        description: 'Regarding the Data Scientist role',
        avatar: '/assets/icons/ic_notification_mail.svg',
        type: 'message',
        createdAt: sub(new Date(), { days: 1, hours: 3, minutes: 30 }),
        isUnRead: false,
      },

    ],
    unreadCount:3,
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