let timeBlocks = $( ".time-block" );
let currentHour = moment().format( "H" );
let blockTimeCnt = 0;

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

// For each time block on the page, check to see if it's in the past, present,
//   or future
let formatTimeBlocks = function() {
   timeBlocks.each( function() {
      let currentBlock = $( this );
      //let currentBlockTime = parseInt( timeBlocks.attr( "block-cnt" ));
      //let currentBlockTime = parseInt(( this.textContent.trim() ).slice( 0, -2 ));

      // Map blockTimeCnt to the block time array
      const timeBlockVal = [7, 8, 9, 10, 11, 12, 13, 14, 15, 16, 17 ];
      let currentBlockTime = timeBlockVal[ blockTimeCnt ];

      console.log( "" );
      console.log( "currentBlockTime: " + currentBlockTime );
      console.log( "currentHour: " + currentHour );
      console.log( "this.textContent: " + this.textContent.trim() );
      console.log( "" );

      if( currentBlockTime === currentHour ) {
         currentBlock.addClass( "present" ).removeClass( "past future" );
      }
      else if ( currentBlockTime < currentHour ) {
         currentBlock.addClass( "past" ).removeClass( "present future" );
      }
      else if ( currentBlockTime > currentHour ) {
         currentBlock.addClass( "future" ).removeClass( "past present" );
      };

      blockTimeCnt++;
   });
};

// Upon page load
$( document ).ready( function() {
   // Call on displayTodaysDate to parse and display today's date in the format of:
   //   Day of the Week, Month Date, Year (Monday, January 25, 2021)
   displayTodaysDate();

   // Format and color-code the time blocks to indicate which time blocks are in
   //   the past, present, or future.
   formatTimeBlocks();
});