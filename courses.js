"use strict";
// Import
// import coursesData from './courses.json';
exports.__esModule = true;
exports.CourseObject = void 0;
// Class objects
var CourseObject = /** @class */ (function () {
    function CourseObject(courseNumber, courseName, courseDescription, credits, prerequisites) {
        this.courseNumber = courseNumber;
        this.courseName = courseName;
        this.courseDescription = courseDescription;
        this.credits = credits;
        this.prerequisites = prerequisites;
    }
    return CourseObject;
}());
exports.CourseObject = CourseObject;
