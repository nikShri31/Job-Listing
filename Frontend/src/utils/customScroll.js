// Scrollbar styling function
const customScrollbarStyles = (theme) => ({
    '&::-webkit-scrollbar': {
      width: '6px', // Reduce scrollbar width
      height: '8px', // For horizontal scrollbars
    },
    '&::-webkit-scrollbar-track': {
      backgroundColor: '#f0f0f0', // Light grey background for the scrollbar track
      borderRadius: '10px', // Rounded corners for the track
    },
    '&::-webkit-scrollbar-thumb': {
      backgroundColor: '#b0b0b0', // Slightly darker grey for the scrollbar thumb
      borderRadius: '10px', // Rounded corners for the thumb
      border: '2px solid #f0f0f0', // Padding effect to separate the thumb from the track
    },
    '&::-webkit-scrollbar-thumb:hover': {
      backgroundColor: '#909090', // Darken the thumb when hovered for better visibility
    },
 
    overscrollBehavior: 'contain', // Prevent bounce effects
    scrollBehavior: 'smooth', // Enhance smooth scrolling
  });
  
  export default customScrollbarStyles;
  