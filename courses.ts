// Import
// import coursesData from './courses.json';

// Class objects
export class CourseObject {
	courseNumber: number;		
	courseName: string;
	courseDescription: string;
	credits: number;
	prerequisites: string;
	
	constructor(courseNumber: number, courseName: string, courseDescription: string,
				credits: number, prerequisites: string){
		this.courseNumber		= courseNumber;		
		this.courseName			= courseName;
		this.courseDescription	= courseDescription;
		this.credits			= credits;
		this.prerequisites		= prerclsequisites;
	}
}

interface Course {
	courseNumber: number;		
	courseName: string;
	courseDescription: string;
	credits: number;
	prerequisites: string;
}

