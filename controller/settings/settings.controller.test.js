const Role = require('../../models').role 
const Department = require('../../models').department 
const { DESCRIBE } = require('sequelize/types/query-types');
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
            {"name":"CSE"}
        ]}
        
    })
})