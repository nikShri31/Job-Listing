import { useState } from 'react';
import PropTypes from 'prop-types';
import { set, sub } from 'date-fns';
import { faker } from '@faker-js/faker';

import Box from '@mui/material/Box';
import List from '@mui/material/List';
import Badge from '@mui/material/Badge';
import Button from '@mui/material/Button';
import Avatar from '@mui/material/Avatar';
import Divider from '@mui/material/Divider';
import Tooltip from '@mui/material/Tooltip';
import Popover from '@mui/material/Popover';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import ListItemText from '@mui/material/ListItemText';
import ListSubheader from '@mui/material/ListSubheader';
import ListItemAvatar from '@mui/material/ListItemAvatar';
import ListItemButton from '@mui/material/ListItemButton';



import Iconify from '../../../components/iconify/iconify';
import Scrollbar from '../../../components/scrollbar';
import { fToNow } from '../../../../utils/format-time';
import { useNavigate } from 'react-router-dom';
import { useSelector } from 'react-redux';
import NotificationDialog from '../../../../Components/Notification/Notification_Dialog';

// ----------------------------------------------------------------------
// Notification data tailored to HR Tech Job Dashboard
// const NOTIFICATIONS = [
//   {
//     id: faker.string.uuid(),
//     title: 'New job application received',
//     description: 'John Doe applied for the Software Engineer position',
//     avatar: '/assets/images/avatars/avatar_1.jpg',
//     type: 'job_application',
//     createdAt: set(new Date(), { hours: 9, minutes: 15 }),
//     isUnRead: true,
//   },
//   {
//     id: faker.string.uuid(),
//     title: 'Interview scheduled',
//     description: 'Interview with Jane Smith is scheduled for tomorrow',
//     avatar: '/assets/images/avatars/avatar_2.jpg',
//     type: 'interview_scheduled',
//     createdAt: sub(new Date(), { hours: 5, minutes: 45 }),
//     isUnRead: true,
//   },
//   {
//     id: faker.string.uuid(),
//     title: 'New message from HR',
//     description: 'Regarding the Data Scientist role',
//     avatar: '/assets/icons/ic_notification_mail.svg',
//     type: 'message',
//     createdAt: sub(new Date(), { days: 1, hours: 3, minutes: 30 }),
//     isUnRead: false,
//   },
//   {
//     id: faker.string.uuid(),
//     title: 'Task assignment',
//     description: 'New task assigned for reviewing resumes',
//     avatar: null,
//     type: 'task_assignment',
//     createdAt: sub(new Date(), { days: 2, hours: 2, minutes: 30 }),
//     isUnRead: false,
//   },
//   {
//     id: faker.string.uuid(),
//     title: 'Candidate feedback received',
//     description: 'Feedback received for Mary Johnson',
//     avatar: null,
//     type: 'feedback_received',
//     createdAt: sub(new Date(), { days: 3, hours: 1, minutes: 15 }),
//     isUnRead: false,
//   },
// ];



export default function NotificationsPopover() {


  const navigate = useNavigate();
  const notifications = useSelector(
    (state) => state.notifications.notifications
  );
  const lastNotifications = notifications.slice(-4); 

  //const [notifications, setNotifications] = useState(NOTIFICATIONS);

  const totalUnRead = notifications.filter((item) => item.isUnRead === true).length;

  const [open, setOpen] = useState(null);
  const [dialogOpen, setDialogOpen] = useState(false);

  const handleOpen = (event) => {
    setOpen(event.currentTarget);
  };

  const handleClose = () => {
    setOpen(null);
  };

  const handleMarkAllAsRead = () => {
  
      notifications.map((notification) => ({
        ...notification,
        isUnRead: false,
      }))
  };

  //Dialog state
  const handleDialogOpen = () => {
    setDialogOpen(true);
    setAnchorEl(null);
  };
  const handleDialogClose = () => {
    setDialogOpen(false);
  };

  return (
    <>
      <IconButton color={open ? 'primary' : 'default'} onClick={handleOpen}>
        <Badge badgeContent={totalUnRead} color="error">
          <Iconify width={24} icon="solar:bell-bing-bold-duotone" />
        </Badge>
      </IconButton>

      <Popover
        open={!!open}
        anchorEl={open}
        onClose={handleClose}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'right' }}
        transformOrigin={{ vertical: 'top', horizontal: 'right' }}
        PaperProps={{
          sx: {
            mt: 1.5,
            ml: 0.75,
            width: 360,
          },
        }}
      >
        <Box sx={{ display: 'flex', alignItems: 'center', py: 2, px: 2.5 }}>
          <Box sx={{ flexGrow: 1 }}>
            <Typography variant="subtitle1">Notifications</Typography>
            <Typography variant="body2" sx={{ color: 'text.secondary' }}>
              You have {totalUnRead} unread notifications
            </Typography>
          </Box>

          {totalUnRead > 0 && (
            <Tooltip title="Mark all as read">
              <IconButton color="primary" onClick={handleMarkAllAsRead}>
                <Iconify icon="eva:done-all-fill" />
              </IconButton>
            </Tooltip>
          )}
        </Box>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Scrollbar sx={{ height: { xs: 340, sm: 'auto' } }}>
          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                New
              </ListSubheader>
            }
          >
            {notifications.slice(0, 2).map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List>

          <List
            disablePadding
            subheader={
              <ListSubheader disableSticky sx={{ py: 1, px: 2.5, typography: 'overline' }}>
                Earlier
              </ListSubheader>
            }
          >
            {notifications.slice(2, 5).map((notification) => (
              <NotificationItem key={notification.id} notification={notification} />
            ))}
          </List>
        </Scrollbar>

        <Divider sx={{ borderStyle: 'dashed' }} />

        <Box sx={{ p: 1 }}>
        <Button  fullWidth disableRipple onClick={handleDialogOpen}>
        View All
      </Button>
        </Box>
      </Popover>

    {/* Dialog component with content */}
    <NotificationDialog
    dialogOpen={dialogOpen}
    handleDialogClose={handleDialogClose}
    notifications={notifications}
  />
    </>
  );
}

// ----------------------------------------------------------------------

NotificationItem.propTypes = {
  notification: PropTypes.shape({
    createdAt: PropTypes.instanceOf(Date),
    id: PropTypes.string,
    isUnRead: PropTypes.bool,
    title: PropTypes.string,
    description: PropTypes.string,
    type: PropTypes.string,
    avatar: PropTypes.any,
  }),
};

function NotificationItem({ notification }) {
  const { avatar, title } = renderContent(notification);

  return (
    <ListItemButton
      sx={{
        py: 1.5,
        px: 2.5,
        mt: '1px',
        ...(notification.isUnRead && {
          bgcolor: 'action.selected',
        }),
      }}
    >
      <ListItemAvatar>
        <Avatar sx={{ bgcolor: 'background.neutral' }}>{avatar}</Avatar>
      </ListItemAvatar>
      <ListItemText
        primary={title}
        secondary={
          <Typography
            variant="caption"
            sx={{
              mt: 0.5,
              display: 'flex',
              alignItems: 'center',
              color: 'text.disabled',
            }}
          >
            <Iconify icon="eva:clock-outline" sx={{ mr: 0.5, width: 16, height: 16 }} />
            {fToNow(notification.createdAt)}
          </Typography>
        }
      />
    </ListItemButton>
  );
}

// ----------------------------------------------------------------------

function renderContent(notification) {
  const title = (
    <Typography variant="subtitle2">
      {notification.title}
      <Typography component="span" variant="body2" sx={{ color: 'text.secondary' }}>
        &nbsp; {notification.description}
      </Typography>
    </Typography>
  );

  if (notification.type === 'job_application') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/ic_notification_job.svg" />,
      title,
    };
  }
  if (notification.type === 'interview_scheduled') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/ic_notification_interview.svg" />,
      title,
    };
  }
  if (notification.type === 'message') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/ic_notification_mail.svg" />,
      title,
    };
  }
  if (notification.type === 'task_assignment') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/ic_notification_task.svg" />,
      title,
    };
  }
  if (notification.type === 'feedback_received') {
    return {
      avatar: <img alt={notification.title} src="/assets/icons/ic_notification_feedback.svg" />,
      title,
    };
  }
  return {
    avatar: notification.avatar ? <img alt={notification.title} src={notification.avatar} /> : null,
    title,
  };
}