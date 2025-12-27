class ApiResponse{
    constructor(statusCode , data , message = "success"){
        this.statusCode = statusCode
        this.data = data
        this.message = message
        this.success = statusCode < 400
    }
}

export {ApiResponse}


// ----------- TEST CODE ----------- 
// const tmp1 = new ApiResponse()
// tmp1.statusCode = "404"
// tmp1.data = {id: 100 , message: "hello "}
// tmp1.message = 'this is tmp 1'
// tmp1.success = 300

// const tmp2 = new ApiResponse(500 , {id: 1 , message: 'www'}, "bye bye")

// console.log(tmp1);
// console.log(tmp2);



