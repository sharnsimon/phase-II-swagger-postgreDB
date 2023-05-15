const Role = require('../../models').role 
const Department = require('../../models').department 
const Employee = require('../../models').employee 
const consolidatedService = require('../../services/consolidated.service')
const settingsController = require('./settings.controller')

jest.setTimeout(10000);

const mockRequest = ()=>{
    let req = {}
    req.body = jest.fn().mockReturnValue(req);
    req.params = jest.fn().mockReturnValue(req);
    return req
}

const mockResponse = ()=>{
    let res={}
    res.send =  jest.fn().mockReturnValue(res);
    res.status = jest.fn().mockReturnValue(res);
    res.json = jest.fn().mockReturnValue(res);
    return res
}

describe('settings controller',()=>{
    beforeEach(async ()=>{
        jest.restoreAllMocks();
    });
    test('addDept',async ()=>{
        const req = mockRequest();
        const res = mockResponse();
        req.body={data:[
            {"name":"CSE"},
            {"name":"ECE"}
        ]}
        Department.bulkCreate = jest.fn()
                .mockRejectedValueOnce(new Error("error creating Department"))
                .mockResolvedValueOnce({
                    data:[
                        {
                            "id": 1,
                            "name": "CSE",
                            "createdAt": "2023-05-15T12:09:56.618Z",
                            "updatedAt": "2023-05-15T12:09:56.618Z",
                            "deletedAt": null
                        },
                        {
                            "id": 2,
                            "name": "ECE",
                            "createdAt": "2023-05-15T12:09:56.618Z",
                            "updatedAt": "2023-05-15T12:09:56.618Z",
                            "deletedAt": null
                        }
                    ]});
            await settingsController.addDept(req,res);
            expect(res.statusCode).toBe(422);
            await settingsController.addDept(req,res);
            expect(res.statusCode).toBe(200)
    })
})

describe('settings controller',()=>{
    beforeEach(async ()=>{
        jest.restoreAllMocks();
    });

    test('add role',async ()=>{
        const req = mockRequest();
        const res = mockResponse();
        req.body = {
            data:[
                    {"name":"engg"},
                    {"name":"doctor"}
            ]
        }
        Role.bulkCreate = jest.fn()
                .mockRejectedValueOnce(new Error('error creating role'))
                .mockResolvedValueOnce({
                    data:[
                        {
                            "id": 4,
                            "name": "engg",
                            "createdAt": "2023-05-15T12:44:17.703Z",
                            "updatedAt": "2023-05-15T12:44:17.703Z",
                            "isDeleted": null,
                            "deletedAt": null
                        },
                        {
                            "id": 5,
                            "name": "doctor",
                            "createdAt": "2023-05-15T12:44:17.703Z",
                            "updatedAt": "2023-05-15T12:44:17.703Z",
                            "isDeleted": null,
                            "deletedAt": null
                        }
                    ]
                });
                await settingsController.addRole(req,res);
                expect(res.statusCode).toBe(422);
                await settingsController.addRole(req,res);
                expect(res.statusCode).toBe(200);
    })
})

describe('settings controller',()=>{
    beforeEach(async ()=>{
        jest.restoreAllMocks();
    });

    test('delete role',async ()=>{
        const req = mockRequest();
        const res = mockResponse();
        req.params = {id:1}
        Role.update = jest.fn()
            .mockRejectedValueOnce(new Error("Error in soft deleting role"))
            .mockResolvedValueOnce(Promise.resolve({
                
                    "rows deleted": [
                        6
                    ],
                    "success": true
                
            }))
            await settingsController.deleteRole(req,res);
            expect(res.statusCode).toBe(422);
            Employee.update = jest.fn()
                .mockRejectedValueOnce(new Error('Error in soft deleting employee'))
                .mockResolvedValueOnce(Promise.resolve([6]))
            await settingsController.deleteRole(req,res);
            expect(res.statusCode).toBe(422)
            Role.update = jest.fn()
                        .mockResolvedValueOnce(Promise.resolve({
                
                            "rows deleted": [
                                6
                            ],
                            "success": true
                        
                    }))
            await settingsController.deleteRole(req,res);
            expect(res.statusCode).toBe(200)
    })
})
