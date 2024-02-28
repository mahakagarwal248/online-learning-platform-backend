import moment from "moment";
class courseDtos {
  courseId;
  title;
  shortDesc;
  addedOn;
  testId;
  files;
  duration;

  constructor(course) {
    this.courseId = course._id;
    this.title = course.course_name;
    this.shortDesc = course.description;
    this.addedOn = new moment(course.createdAt).format("D-MM-YYYY");
    this.testId = course.tests;
    this.duration = course.duration;
    this.files = [
      "https://www.google.com",
      "https://www.google.com",
      "https://www.google.com",
    ];
  }
}

export default courseDtos;

/* 
   {
    title: "Course Title",
    shortDesc: "Lorem ipsum dolor sit amet, consectetur adipiscing elit",
    addedOn: "04-10-2001",
    duration: "6 months",
    courseId: 1,
    testId: 101,
    files: [
      "https://www.google.com",
      "https://www.google.com",
      "https://www.google.com",
    ],
  },
  
  
  */
