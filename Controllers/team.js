const team = {
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
}
