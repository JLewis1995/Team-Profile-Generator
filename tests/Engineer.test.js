const Engineer = require('../lib/engineer');

describe('Engineer', () => {
    it('can use constructor to set GitHub', () => {
        const github = "test";
        const employee = new Engineer('tester', 1, 'none@none.com', github);
        expect(employee.github).toBe(github);
    });

    it('should get role from getRole insdie Engineer', () => {
        const role = "Engineer";
        const employee = new Engineer('tester', 1, 'none@none.com');
        expect(employee.getRole()).toBe(role);
    });

    it('should get github from getGitHub insdie Engineer', () => {
        const github = 'test';
        const employee = new Engineer('tester', 1, 'none@none.com', github);
        expect(employee.getGitHub()).toBe(github);
    });
})