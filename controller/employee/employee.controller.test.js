const Employee = require('../../models').employee 
const employeeController = require('../employee/employee.controller')
const consolidatedService = require('../../services/consolidated.service')
jest.setTimeout(10000);

const mockRequest = () => {
    const req ={}
    req.body = jest.fn().mockReturnValue(req);
    req.params = jest.fn().mockReturnValue(req);
    return req
}

const mockResponse = () => {
    const res = {}
    res.send = jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res

}

describe('employee controller',()=>{
    beforeEach(async ()=>{
        jest.restoreAllMocks();
    });

    test('getempdet',async()=>{
        const req= mockRequest();
        const res= mockResponse();
        req.params = {id:1}
        Employee.findOne = jest.fn()
                .mockRejectedValueOnce(new Error("Error in finding Employee"))
                .mockResolvedValueOnce(Promise.resolve({
                    "id": 1,
                    "firstName": "saravana",
                    "lastName": "kumar",
                    "email": "sel@gmail.com",
                    "password": "abc1234",
                    "roleId": 3,
                    "isDeleted": false,
                    "departmentId": 3
                }));
        await employeeController.getEmployeeDetails(req,res);
        expect(res.statusCode).toBe(422);
        await employeeController.getEmployeeDetails(req,res);
        expect(res.statusCode).toBe(200);
    });
    test('getempdet',async()=>{
        const req= mockRequest();
        const res= mockResponse();
        req.params = {id:null}
        Employee.findOne = jest.fn()
                .mockRejectedValueOnce(new Error("Error in finding Employee"))
        await employeeController.getEmployeeDetails(req,res);
        expect(res.statusCode).toBe(422);
        // await employeeController.getEmployeeDetails(req,res);
        // expect(res.statusCode).toBe(200);
    });
});

describe('employee controller',()=>{
    beforeEach(async ()=>{
        jest.restoreAllMocks();
    });
    test('getempdetof',async ()=>{
        const req= mockRequest();
        const res = mockResponse();
        req.params ={id:1}
        Employee.findOne = jest.fn()
                .mockRejectedValueOnce(new Error("Error finding the employee"))
                .mockResolvedValueOnce(Promise.resolve({
                    "id": 1,
                    "firstName": "saravana",
                    "lastName": "kumar",
                    "email": "sel@gmail.com",
                    "password": "abc1234",
                    "roleId": 3,
                    "isDeleted": false,
                    "departmentId": 3
                }));
            await employeeController.getEmployeeDetailsOf(req,res);
            expect(res.statusCode).toBe(422);
            
            consolidatedService.callOtherSchema= jest.fn()
                .mockRejectedValueOnce(new Error("Error finding the role"))
                .mockResolvedValueOnce(Promise.resolve({
                    "id": 1,
                    "name": "Engineer",
                    "isDeleted": true,
                    "createdAt": "2023-05-11T03:56:58.603Z",
                    "updatedAt": "2023-05-11T07:23:02.517Z",
                    "deletedAt": null
                }));
            await employeeController.getEmployeeDetailsOf(req,res);
            expect(res.statusCode).toBe(422)
            consolidatedService.callOtherSchema = jest.fn()
                .mockRejectedValueOnce(new Error("Error finding the Department"))
                .mockResolvedValueOnce(Promise.resolve({
                    "id": 1,
                    "name": "CSE",
                    "createdAt": "2023-05-10T13:02:09.406Z",
                    "updatedAt": "2023-05-10T13:02:09.406Z",
                    "deletedAt": null
                }));
            await employeeController.getEmployeeDetailsOf(req,res);
            expect(res.statusCode).toBe(422);

            Employee.findOne = jest.fn()
                .mockResolvedValueOnce(Promise.resolve({
                    dataValues:{
                        "id": 1,
                        "firstName": "Steia",
                        "lastName": "sharn",
                        "email": "sharnjackson2002@gmail.com",
                        "password": "qwert123",
                        "roleId": 1,
                        "departmentId": 1,
                        "isDeleted": false,
                        "createdAt": "2023-05-11T05:43:58.185Z",
                        "updatedAt": "2023-05-11T07:23:02.566Z",
                        "deletedAt": null,
                        "roleDetails": {
                            "id": 1,
                            "name": "Engineer",
                            "isDeleted": true,
                            "createdAt": "2023-05-11T03:56:58.603Z",
                            "updatedAt": "2023-05-11T07:23:02.517Z",
                            "deletedAt": null
                        },
                        "deptDetails": {
                                "id": 1,
                                "name": "CSE",
                                "createdAt": "2023-05-10T13:02:09.406Z",
                                "updatedAt": "2023-05-10T13:02:09.406Z",
                                "deletedAt": null
                            }
                    }
                }
                    ));
                    consolidatedService.callOtherSchema = jest.fn()
                    // .mockRejectedValueOnce(new Error("Error finding the Department"))
                    .mockResolvedValueOnce(Promise.resolve({
                        "id": 1,
                        "name": "CSE",
                        "createdAt": "2023-05-10T13:02:09.406Z",
                        "updatedAt": "2023-05-10T13:02:09.406Z",
                        "deletedAt": null
                    }))
                    .mockResolvedValue(Promise.resolve({
                        "id": 1,
                        "name": "CSE",
                        "createdAt": "2023-05-10T13:02:09.406Z",
                        "updatedAt": "2023-05-10T13:02:09.406Z",
                        "deletedAt": null
                    }))
                await employeeController.getEmployeeDetailsOf(req,res)
                expect(res.statusCode).toBe(200)
    })
    test('getempdetof',async ()=>{
        const req= mockRequest();
        const res = mockResponse();
        req.params ={id:null}
        Employee.findOne = jest.fn()
                .mockRejectedValueOnce(new Error("Error finding the employee"))
            
            await employeeController.getEmployeeDetailsOf(req,res);
            expect(res.statusCode).toBe(422);
        })
})

describe('employee controller',()=>{
    beforeEach(async ()=>{
        jest.restoreAllMocks();
    })
    test('add Employee',async ()=>{
        const req = mockRequest();
        const res = mockResponse();
        req.body={
                    "firstName": "saravana",
                    "lastName": "kumar",
                    "email": "sel@gmail.com",
                    "password": "abc1234",
                    "roleId": 3,
                    "isDeleted": false,
                    "departmentId": 3
                }
            Employee.create = jest.fn()
                .mockRejectedValueOnce(new Error("Error creating Employee"))
                .mockResolvedValueOnce(Promise.resolve({
                        "id": 1,
                        "firstName": "Steia",
                        "lastName": "sharn",
                        "email": "sharnjackson2002@gmail.com",
                        "password": "qwert123",
                        "roleId": 1,
                        "departmentId": 1,
                        "isDeleted": false,
                        "createdAt": "2023-05-11T05:43:58.185Z",
                        "updatedAt": "2023-05-11T07:23:02.566Z",
                        "deletedAt": null
                }))
            await employeeController.addEmployeeDetails(req,res);
            expect(res.statusCode).toBe(422)
            await employeeController.addEmployeeDetails(req,res);
            expect(res.statusCode).toBe(200)
    })
    test('add Employee',async ()=>{
        const req = mockRequest();
        const res = mockResponse();
        req.body=null
            Employee.create = jest.fn()
                .mockRejectedValueOnce(new Error("Error creating Employee"))
                // .mockResolvedValueOnce(Promise.resolve({
                //         "id": 1,
                //         "firstName": "Steia",
                //         "lastName": "sharn",
                //         "email": "sharnjackson2002@gmail.com",
                //         "password": "qwert123",
                //         "roleId": 1,
                //         "departmentId": 1,
                //         "isDeleted": false,
                //         "createdAt": "2023-05-11T05:43:58.185Z",
                //         "updatedAt": "2023-05-11T07:23:02.566Z",
                //         "deletedAt": null
                // }))
            await employeeController.addEmployeeDetails(req,res);
            expect(res.statusCode).toBe(422)
            // await employeeController.addEmployeeDetails(req,res);
            // expect(res.statusCode).toBe(200)
    })
})