const Manager = require('../lib/Manager');

describe('Manager', () => {
    it('can use constructor to set officeNumber', () => {
        const officenumber = 1;
        const employee = new Manager('tester', 1, 'none@none.com', officenumber);
        expect(employee.officeNumber).toBe(officenumber);
    });

    it('should get role from getRole insdie Manager', () => {
        const role = "Manager";
        const employee = new Manager('tester', 1, 'none@none.com');
        expect(employee.getRole()).toBe(role);
    });

    it('should get officenumber from getOfficeNumber insdie Manager', () => {
        const officenumber = 1;
        const employee = new Manager('tester', 1, 'none@none.com', officenumber);
        expect(employee.getOfficeNumber()).toBe(officenumber);
    });
})