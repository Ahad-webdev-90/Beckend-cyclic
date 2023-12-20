const { Send } = require("../Helper/courseHelper");
const courseModel = require("../models/courseModel");

const courseController = {
    get: async (req, res) => {
        try {
            let { pageNo, pageSize } = req.query
            console.log(pageNo, pageSize);
            let skipCount = (pageNo - 1) * pageSize
            const result = await courseModel.find().limit(pageSize).skip(skipCount)
            res.send({
                isSuccessfull: true,
                message: "Data Founded",
                data: result
            })
        } catch (error) {
            res.send({
                isSuccessfull: true,
                message: "No Data Found :(",
                data: error
            })
        }
    },
    getbyid: async (req, res) => {

        try {
            let id = req.params.id

            let result = await courseModel.findById(id)
            res.send({
                isSuccessfull: true,
                data: result,
                message: "",
            })
            // let obj = courses.find((x) => x.id == id)


        } catch (error) {
            res.send({
                isSuccessfull: false,
                data: null,
                message: "No Data Found",
            })
        }
    },
    add: async (req, res) => {
        try {
            let { title, description } = req.body
            let obj = { title, description }

            let errArr = []

            if (!obj.title) {
                errArr.push('Required task title')
            }
            if (!obj.description) {
                errArr.push('Required task description')
            }

            if (errArr.length > 0) {
                res.send({
                    isSuccessfull: false,
                    message: "Validation Error! :(",
                    data: errArr,
                })
            } else {
                const course = new courseModel(obj)
                const result = await course.save()
                res.send({
                    isSuccessfull: true,
                    message: 'Data Added Successfully',
                    data: result
                })
            }
        } catch (error) {
            res.send({
                isSuccessfull: false,
                message: 'Data not Added',
                data: error
            })
        }

    },
    edit: async (req, res) => {
        try {
            const id = req.params.id;
            const { title, description } = req.body;
            const obj = { title, description }
            let errArray = []
            // const coursesIndex = courses.findIndex((x) => x.id == id);
            if (!obj.title) {
                errArray.push("Title is required")
            }
            if (!obj.description) {
                errArray.push("Description is required")
            }
            if (errArray.length > 0) {
                res.send({
                    isSuccessfull: false,
                    data: errArray,
                    message: "validation error finded!:(",
                })
            }
            const result = await courseModel.findByIdAndUpdate(id, obj)

            // courses[coursesIndex] = { id: id, data: obj };
            res.send({
                isSuccessfull: true,
                data: obj,
                message: "course with ID ${ id } has been updated",
            })
        } catch (error) {
            res.send({
                isSuccessfull: false,
                data: null,
                message: "course with ID ${ id } has not been updated",
            })
        }


    },
    del: async (req, res) => {
        const id = req.params.id
        try {
            const result = await courseModel.findByIdAndDelete(id)
            res.send(Send(true, "Deleted Successfully", result))
        }
        catch (error) {
            res.status(404).send(Send(false, error, null))
        }
    },
    markAsDone: async (req, res) => {
        try {
            let projectId = req.params.id
            const project = await courseModel.findByIdAndUpdate(
                projectId,
                { taskStatus: 'completed' },
                { new: true }
            );
            if (!project) {
                return res.status(404).json({ message: 'Project not found' });
            }
            return res.json(project);
        } catch (error) {
            return res.status(500).json({ message: 'Internal server error' });
        }
    },
}


module.exports = courseController