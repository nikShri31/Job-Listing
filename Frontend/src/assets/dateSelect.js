const dateSelect= {
    // Array of dates (1 to 31)
     dates : Array.from({ length: 31 }, (_, i) => i + 1),
  
    // Array of months (January to December)
     month : [
      'January', 'February', 'March', 'April', 'May', 'June',
      'July', 'August', 'September', 'October', 'November', 'December'
    ],
  
    // Array of years (1970 to 2024)
     year : Array.from({ length: 2008 - 1970 + 1 }, (_, i) => 1970 + i),
}
    export default dateSelect;