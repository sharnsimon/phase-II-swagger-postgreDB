const Department = require('../../models').department
const Role = require('../../models').role 
const settingsService = require('../settings/settings.service')


jest.setTimeout(10000);

describe('settings service',()=>{
    beforeEach(async ()=>{
        jest.restoreAllMocks();
    });

    test('getRole',async ()=>{
        const id= 1;
        Role.findOne = jest.fn()
            .mockRejectedValueOnce(new Error('error getting role'))
            .mockResolvedValueOnce(Promise.resolve({"success":true}))
            try{
                await settingsService.getRole(id);
            }
            catch(e){
                expect(e.message).toBe('error getting role')
            }
            await settingsService.getRole(id);
    })
    test('getRole',async ()=>{
        const id=null;
        Role.findOne =jest.fn()
            .mockRejectedValueOnce(new Error("error getting role"))
            .mockResolvedValueOnce(Promise.resolve({"success": true}))
            try{
                await settingsService.getRole(id);

            }
            catch(e){
                expect(e.message).toBe('error getting role');
            }
            await settingsService.getRole(id);
    })
})

describe('settings service',()=>{
    beforeEach(async ()=>{
        jest.restoreAllMocks();
    });

    test('getDepartment',async ()=>{
        const id= 1;
        Department.findOne = jest.fn()
            .mockRejectedValueOnce(new Error('error getting dept'))
            .mockResolvedValueOnce(Promise.resolve({"success":true}))
            try{
                await settingsService.getDept(id);
            }
            catch(e){
                expect(e.message).toBe('error getting dept')
            }
            await settingsService.getDept(id);
    })
    test('getDept',async ()=>{
        const id=null;
        Department.findOne =jest.fn()
            .mockRejectedValueOnce(new Error("error getting dept"))
            .mockResolvedValueOnce(Promise.resolve({"success": true}))
            try{
                await settingsService.getDept(id);

            }
            catch(e){
                expect(e.message).toBe('error getting dept');
            }
            await settingsService.getDept(id);
    })
})