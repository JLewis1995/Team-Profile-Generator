const Intern = require('../lib/Intern');

describe('Intern', () => {
    it('can use constructor to set school', () => {
        const school = "test";
        const employee = new Intern('tester', 1, 'none@none.com', school);
        expect(employee.school).toBe(school);
    });

    it('should get role from getRole insdie Intern', () => {
        const role = "Intern";
        const employee = new Intern('tester', 1, 'none@none.com');
        expect(employee.getRole()).toBe(role);
    });

    it('should get school from getSchool insdie Intern', () => {
        const school = 'test';
        const employee = new Intern('tester', 1, 'none@none.com', school);
        expect(employee.getSchool()).toBe(school);
    });
})