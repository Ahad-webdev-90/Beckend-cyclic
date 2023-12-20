const express = require('express');
const courseController = require('../Controllers/courseController');
const AuthController = require('../Controllers/authController');
const route = express.Router()


const courses = [
    {
        id: 1,
        courseName: "Web Development",
        ShortName: "Web Dev",
        courseFee: 1000
    },
    {
        id: 2,
        courseName: "Graphic Designing",
        ShortName: "Graphic Design",
        courseFee: 800
    },
    {
        id: 3,
        courseName: "Mobile App Development",
        ShortName: "App Dev",
        courseFee: 1200
    },
    {
        id: 4,
        courseName: "Data Science",
        ShortName: "Data Sci",
        courseFee: 1500
    },
    {
        id: 5,
        courseName: "Network Security",
        ShortName: "Sec. Net",
        courseFee: 1100
    },
    {
        id: 6,
        courseName: "Python Programming",
        ShortName: "Python",
        courseFee: 900
    },
    {
        id: 7,
        courseName: "Java Development",
        ShortName: "Java Dev",
        courseFee: 1100
    },
    {
        id: 8,
        courseName: "Digital Marketing",
        ShortName: "Digi. Mktg",
        courseFee: 850
    },
    {
        id: 9,
        courseName: "Machine Learning",
        ShortName: "ML",
        courseFee: 1400
    },
    {
        id: 10,
        courseName: "Database Management",
        ShortName: "DB Management",
        courseFee: 950
    },
    {
        id: 11,
        courseName: "Front-end Development",
        ShortName: "Front-end Dev",
        courseFee: 1000
    },
    {
        id: 12,
        courseName: "Back-end Development",
        ShortName: "Back-end Dev",
        courseFee: 1050
    },
    {
        id: 13,
        courseName: "UI/UX Design",
        ShortName: "UI/UX",
        courseFee: 900
    },
    {
        id: 14,
        courseName: "Artificial Intelligence",
        ShortName: "AI",
        courseFee: 1300
    },
    {
        id: 15,
        courseName: "Software Testing",
        ShortName: "Testing",
        courseFee: 950
    },
    {
        id: 16,
        courseName: "Cybersecurity",
        ShortName: "Cybersec",
        courseFee: 1200
    },
    {
        id: 17,
        courseName: "Cloud Computing",
        ShortName: "Cloud",
        courseFee: 1100
    },
    {
        id: 18,
        courseName: "Game Development",
        ShortName: "Game Dev",
        courseFee: 1050
    },
    {
        id: 19,
        courseName: "Data Analytics",
        ShortName: "Data Analytics",
        courseFee: 1100
    },
    {
        id: 20,
        courseName: "DevOps",
        ShortName: "DevOps",
        courseFee: 1150
    },
    {
        id: 21,
        courseName: "Digital Illustration",
        ShortName: "Illus. Design",
        courseFee: 800
    },
    {
        id: 22,
        courseName: "Blockchain Development",
        ShortName: "Blockchain",
        courseFee: 1250
    },
    // Add more courses here...
];
// GET
route.get("/", courseController.get)
// GET By Id
route.get("/:id", courseController.getbyid)
// Post
route.post("/", courseController.add)
// Put
route.put('/:id', courseController.edit)
// Delete
route.delete("/:id", courseController.del)
// MarkAsDone
route.put("/:id/markAsDone", courseController.markAsDone)

module.exports = route