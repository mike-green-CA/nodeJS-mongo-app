// Dependencies and Imports
//
var express = require('express');
const app = express();
const mongoose = require("mongoose");
const fs = require('fs');
const CourseObject = require('./courses.js').CourseObject;
const db = mongoose.connect("mongodb://localhost/courseAPI");
const courseRouter = express.Router();
const port = process.env.PORT || 3000;
const Course = require("./models/courseModel");
const bodyParser = require('body-parser');
const fetch = require('node-fetch');


// Code
//

app.use("/api", courseRouter);

courseRouter.route("/courses").get((req, res) => {
	
	let dbContents = {}
	
	  const query = {};
	  if (req.query.genre) {
		query.genre = req.query.genre;
	  }
	  Course.find(query, (err, courses) => {
		if (err) {
		  return res.send(err);
		}
		return res.json(courses);
	  }); 
});


async function fetchData(){
     const response = await fetch('http://localhost:8081/api/courses')
     const resData = response.json();
     return resData; 
};


app.get('/', function (req, response) {

	response.writeHead(200, {"Content-Type": "text/html"});
	
	let fetchContents = "";
	let dbContents = [];
	
	fetchData().then((data) => {
	   dbContents = data;
	   console.log(data);
	   
	   let courses = [];
	
		dbContents.forEach(course => {
			let aCourse = new CourseObject();
			
			// Store course info into a Course type
			aCourse.courseNumber	= course.courseNumber;
			aCourse.courseName		= course.courseName;
			aCourse.description		= course.description;
			aCourse.credits			= course.credits;
			aCourse.prerequisites	= course.prerequisites;
			
			// Then push into an array
			courses.push(aCourse);
		});

		// Writing a header
		response.write(`<h1>Michael Green's Assignment 4</h1>
			<p>Michael Green, student number A01045801.</p>
			<br/>
			`);	
			
		// Now a style sheet
		response.write(`	  
			<style>
			h5{
				text-decoration: underline;
			}
			.theTable {
				border:1px solid black;
				border-collapse:collapse;
				padding:5px;
			}
			.theTable caption {
				border:1px solid black;
				padding:5px;
				background:#F0F0F0;
			}
			.theTable td {
				border:1px solid black;
				padding:5px;
			}
			</style>`
		);
		
		// Now starting the table.
		response.write(`
			<table class="theTable">
			<caption>BCIT COMP Courses<caption>
		`);
		
		// Now we'll build some row and fill add some info from our courses array
		// I'm going to have 2 columns and two rows so I'll be getting a counter.
		let counter = 1;
		let currentCourseItemNumber = 1;
		
		for(let courseData of courses){
			
			// If the number is ODD we want to create a new tray.
			// This will allow Object 1 to start a new tray, then 3, 5, 7, etc.
			// We dont want EVEN numbers to create new trays, because we want 2 columns per tray.
			if(counter % 2 != 0){
				response.write(`<tr>`);
			}
			
			response.write(`
				<td>
					<h3>COMP ${courseData.courseNumber}</h3>
					<h4>${courseData.courseName}</h4>
					<p>${courseData.description}</p>
					<p>Credits for course: ${courseData.credits}</p>
					<h5>Pre-requisites</h5>
					<ul>
			`);
			
			// Going to loop through and list each pre-requisite
			for(prereq of courseData.prerequisites){
					response.write(`<li>${prereq}</li>`);
			}
			
			// Now we'll close our un-ordered list and close up the td aswell
			response.write(`
					</ul>
				</td>
			`);
			
			// Simply check if its even. 
			// That means its object #2 or #4 etc and we can start a new row for obj #3 ,5 etc. 
			if(counter % 2 == 0){
				response.write(`</tr>`);
			}
			
			// Increment to the next course Object.
			counter += 1;
		}
		
		// Closing up the table
		response.write(`
			</table>
		`);
	   
	}).catch((e) => {
	   console.log(e);
	});	
})

app.listen(8081, function () {
  console.log('App is running on port 8081!');
});