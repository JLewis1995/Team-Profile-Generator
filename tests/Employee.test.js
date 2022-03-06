const Employee = require("../lib/employee");

describe("Employee", () => {
    it("begin Employee", () => {
        const employee = new Employee();
        expect(typeof(employee)).toBe("object");
    });

    it("Can use constructor to set name", () => {
        const name = "tester";
        const employee = new Employee(name);
        expect(employee.name).toBe(name);
    });

    it("Can use constructor to set id", () => {
        const id = 1;
        const employee = new Employee("tester", id);
        expect(employee.id).toBe(id);
    });

    it("Can use constructor to set email", () => {
        const email = "none@none.com";
        const employee = new Employee("tester", 1, email);
        expect(employee.email).toBe(email);
    });

    describe("getName", () => {
        it("will get name from getName inside Employee", () => {
            const name = "tester";
            const employee = new Employee(name);
            expect(employee.getName()).toBe(name);
        });
    });


    describe("getId", () => {
        it("will get id from getId inside Employee", () => {
            const id = 1;
            const employee = new Employee("tester", id);
            expect(employee.getId()).toBe(id);
        });
    });


    describe("getEmail", () => {
        it("will get email from getEmail inside Employee", () => {
            const email = "none@none.com";
            const employee = new Employee("tester", 1, email);
            expect(employee.getEmail()).toBe(email);
        });
    });


    describe("getRole", () => {
        it("will get role from getRole inside Employee", () => {
            const role = "Employee";
            const employee = new Employee("tester", 1, 'none@none.com');
            expect(employee.getRole()).toBe(role);
        });
    });
})