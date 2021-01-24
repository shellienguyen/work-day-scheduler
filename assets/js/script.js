let timeBlocks = $( ".time-block" );
let currentHour = moment().format( "H" );
let blockTimeCnt = 0;
let taskListArr = [];

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

   // Display today's date
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

      console.log( "currentBlockTime: " + currentBlockTime );
      console.log( "currentHour: " + currentHour );
      console.log( "this.textContent: " + this.textContent.trim() );
      console.log( "" );

      // If the block time hour is the same as the current real time hour,
      //   display it in white, then remove css classes that don't apply
      if( currentBlockTime === currentHour ) {
         currentBlock.addClass( "present" ).removeClass( "past future" );
      }
      // If the block time is in the past, gray it out
      else if ( currentBlockTime < currentHour ) {
         currentBlock.addClass( "past" ).removeClass( "present future" );
      }
      // If the clock time is in the future, use another color
      else if ( currentBlockTime > currentHour ) {
         currentBlock.addClass( "future" ).removeClass( "past present" );
      };

      blockTimeCnt++;
   });
};

// Create a task array to hold tasks, for storying in localStorage
let createTaskArr = function() {
   // Loop through each time block
   console.log( "inside createTaskArr" );
   timeBlocks.each( function() {
      let currentBlock = $( this );
      let currentBlockHour = parseInt( currentBlock.attr( "block-cnt" ));

      let taskObj = {
         timeBlock: currentBlockHour,
         taskText: ""
      };

      // Append the task object to the taskListArr array
      taskListArr.push( taskObj );
   });

   console.log( "blah" );
   // When done looping through all the time blocks, save to localStorage
   localStorage.setItem( "taskList", JSON.stringify( taskListArr ));
   console.log ( "taskListArr: " + taskListArr );
};

let loadTasks = function() {
   // Retrieve task array from localStorage
   taskListArr = localStorage.getItem( "tasklist" );
   taskListArr = JSON.parse( taskListArr );

   // Loop through the task array retrieved from localStorage and disply tasks
//   console.log( "taskListArr.length: " + taskListArr.length );
   if ( taskListArr ) {
      for ( let i = 0; i < taskListArr.length; i++ ) {
         console.log( "inside for: " + i );
         let itemTimeBlock = taskListArrp[ i ].timeBlock;
         let itemTaskText = taskListArr[ i ].taskText;

         $( "[block-cnt = " + itemTimeBlock + "]" ).children( "textarea" ).val( itemTaskText );
      };
   };
};

// Upon page load
$( document ).ready( function() {
   // Call on displayTodaysDate to parse and display today's date in the format of:
   //   Day of the Week, Month Date, Year (Monday, January 25, 2021)
   displayTodaysDate();

   // Format and color-code the time blocks to indicate which time blocks are in
   //   the past, present, or future.
   formatTimeBlocks();

   console.log( "before if" );
   let tasks = JSON.parse( localStorage.getItem( "taskList" ));

   console.log( "tasks: " + tasks );

   // If localStorage is empty, create task array to hold tasks
   if ( !tasks || !tasks.length ) {
      console.log( "inside if" );
      createTaskArr();
   }
   else {
      console.log( "inside else" );
      // Load tasks from localStorage
      loadTasks();
   };
   console.log( "after if/else" );
});