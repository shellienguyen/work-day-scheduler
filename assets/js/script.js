let displayTodaysDate = function () {
   let today = new Date();

   // Map returned month (which is a number) to full name of month
   const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
   let month = monthNames[ today.getMonth() ]; 
   
   // Map returned day-of-the-week (which is a number) to full day-of-the-week name
   const dayNames = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday" ];
   let dayOfTheWeek = dayNames[ ( today.getDay() -1 ) ];

   let date = today.getDate();
   let year = today.getFullYear();

   let todaysDate = document.getElementById( "currentDay" );
   todaysDate.textContent = dayOfTheWeek + ", " + month + " " + date + ", " + year;
}

displayTodaysDate();