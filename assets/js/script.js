let timeBlocks = $( ".time-block" );
let currentHour = moment().format( "H" );
let taskListArr = [];
let theScheduler = $(".container" );

////////////////////////////////////

let displayTodaysDate = function () {
   let today = new Date();

   // Map returned month (which is a number) to full name of month
   const monthNames = ["January", "February", "March", "April", "May", "June", "July", "August", "September", "October", "November", "December" ];
   let month = monthNames[ today.getMonth() ]; 
   
   // Map returned day-of-the-week (which is a number) to full day-of-the-week name
   const dayNames = ["Sunday", "Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday" ];
   let dayOfTheWeek = dayNames[ today.getDay() ];

   let date = today.getDate();
   let year = today.getFullYear();

   let todaysDate = document.getElementById( "currentDay" );

   // Display today's date
   todaysDate.textContent = dayOfTheWeek + ", " + month + " " + date + ", " + year;
}

////////////////////////////////////

// For each time block on the page, check to see if it's in the past, present,
//   or future
let formatTimeBlocks = function() {
   timeBlocks.each( function() {
      let currentBlock = $( this );
      let currentBlockTime = parseInt( currentBlock.attr( "block-hour-data" ));

      /* console.log( "currentBlockTime: " + currentBlockTime );
      console.log( "currentHour: " + currentHour );
      console.log( "this.textContent: " + this.textContent.trim() );
      console.log( "" ); */

      // If the block time hour is the same as the current real time hour,
      //   display it in white, then remove css classes that don't apply
      if( currentBlockTime === currentHour ) {
         currentBlock.addClass( "present" ).removeClass( "past future" );
      }
      // If the block time is in the past, gray it out
      else if ( currentBlockTime < currentHour ) {
         currentBlock.addClass( "past" ).removeClass( "present future" );
      }
      // If the block time is in the future, use another color
      else if ( currentBlockTime > currentHour ) {
         currentBlock.addClass( "future" ).removeClass( "past present" );
      };
   });
};

////////////////////////////////////

// Create a task array to hold tasks, for storing in localStorage
let createTaskArr = function() {
   console.log( "Start createTaskArr fn" );

   // Loop through each time block to add each time block object to the array
   timeBlocks.each( function() {
      let currentBlock = $( this );
      let currentBlockHour = parseInt( currentBlock.attr( "block-hour-data" ));

      let taskObj = {
         timeBlock: currentBlockHour,
         taskText: ""
      };

      // Append the task object to the taskListArr array
      taskListArr.push( taskObj );
   });

   // When done looping through all the time blocks, save to localStorage
   localStorage.setItem( "taskList", JSON.stringify( taskListArr ));
   console.log ( "End createTaskArr fn - taskListArr: " + taskListArr );
};

////////////////////////////////////

let loadTasks = function() {
   // Retrieve task array from localStorage
   taskListArr = localStorage.getItem( "taskList" );
   taskListArr = JSON.parse( taskListArr );

   // Loop through the task array retrieved from localStorage and disply tasks
   //   console.log( "taskListArr.length: " + taskListArr.length );
   //if ( taskListArr ) {
   console.log( taskListArr );
   for ( let i = 0; i < taskListArr.length; i++ ) {
      let itemTimeBlock = taskListArr[ i ].timeBlock;
      let itemTaskText = taskListArr[ i ].taskText;

      $( "[block-hour-data = " + itemTimeBlock + "]" ).children( "textarea" ).val( itemTaskText );
   };
   //};
};

////////////////////////////////////

let saveTask = function() {
   let hourBlockToUpdate = $( this ).parent().attr( "block-hour-data" );
   let newTask = $( this ).siblings( "textarea" ).val();

   // Update the task
   for ( let i = 0; i < taskListArr.length; i++ ) {
      if( taskListArr[ i ].timeBlock == hourBlockToUpdate ) {
         taskListArr[ i ].taskText = newTask;
         console.log( "saveTask fn, inside if - i: " + i )
         console.log( "saveTask fn, inside if - newTask: " + newTask );
      };
   };

   localStorage.setItem( "taskList", JSON.stringify( taskListArr ));
   loadTasks();
};

////////////////////////////////////

// Upon page load
$( document ).ready( function() {
   // Call on displayTodaysDate to parse and display today's date in the format of:
   //   Day of the Week, Month Date, Year (Monday, January 25, 2021)
   displayTodaysDate();

   // Format and color-code the time blocks to indicate which time blocks are in
   //   the past, present, or future.
   formatTimeBlocks();

   let tasks = JSON.parse( localStorage.getItem( "taskList" ));

   //console.log( "document.ready - tasks: " + tasks );

   // If localStorage is empty, create task array to hold tasks
   if ( !tasks || !tasks.length ) {
      console.log( "document.ready - inside if" );
      createTaskArr();
   }
   else {
      console.log( "document.ready - inside else" );
      // Load tasks from localStorage
      loadTasks();

      // Save the task each time the user clicks on the button to save
      theScheduler.on( "click", "button", saveTask );
   };
});