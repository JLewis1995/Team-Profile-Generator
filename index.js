const fs = require("fs");
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const inquirer = require("inquirer");
const { type } = require("os");
const teamMembers = [];

function newTeam() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter the Team Manager's Name:",
        name: "name",
        default: "Ex. John Smith",
      },
      {
        type: "input",
        message: "What is their Employee ID Number?:",
        name: "id",
        default: "Ex. 1",
      },
      {
        type: "input",
        message: "What is their Email Address?:",
        name: "email",
        default: "Ex. jsmith@example.com",
      },
      {
        type: "list",
        message: "Please choose their respective Office Number:",
        choices: ["1", "2", "7", "15", "64", "78"],
        name: "officeNumber",
      },
    ])
    .then(function ({ name, id, email, officeNumber }) {
      let newManager = new Manager(name, id, email, officeNumber);
      teamMembers.push(newManager);
      addMember();
    });
}

function addMember() {
  inquirer
    .prompt([
      {
        type: "input",
        message: "Please enter the Team Member's Name:",
        name: "name",
        default: "Ex. John Smith",
      },
      {
        type: "input",
        message: "What is their Employee ID Number?:",
        name: "id",
        default: "Ex. 1",
      },
      {
        type: "input",
        message: "What is their Email Address?:",
        name: "email",
        default: "Ex. jsmith@example.com",
      },
      {
        type: "list",
        message: "What is their role?:",
        choices: ["engineer", "intern"],
        name: "role",
      },
    ])
    .then(function ({ name, role, id, email }) {
      if (role === "engineer") {
        inquirer
          .prompt([
            {
              type: "input",
              message: "Please enter their GitHub Username:",
              name: "github",
              default: "Ex. John Smith",
            },
          ])
          .then(function ({ github }) {
            let newTeamMember;
            newTeamMember = new Engineer(name, id, email, github);
            teamMembers.push(newTeamMember);
            console.log(teamMembers);
          });
      } else {
        inquirer
          .prompt([
            {
              type: "input",
              message: "What school did/do they attend?:",
              name: "school",
            },
          ])
          .then(function ({ school }) {
            let newTeamMember;
            newTeamMember = new Intern(name, id, email, school);
            teamMembers.push(newTeamMember);
            console.log(teamMembers);
          });
      }
    });
}

function addMore() {
  inquirer.prompt([
    {
      type: "list",
      message: "Would you like to add more members to the team?",
      choices: ["Yes", "No"],
      name: "more",
    },
  ]);
  if (more === "Yes") {
    addMember();
  } else {
    // put output funciton here ********************************
    console.log(teamMembers);
  }
}

newTeam();
