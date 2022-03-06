// require all files
const fs = require("fs");
const Manager = require("./lib/manager");
const Engineer = require("./lib/engineer");
const Intern = require("./lib/intern");
const inquirer = require("inquirer");
const { type } = require("os");
const { inherits } = require("util");
const teamMembers = [];

// init function to begin
function init() {
  markdownBegin();
  newTeam();
}

// create new team per instructions each time we start
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
    // promise to create manager profile - also add to html doc
    .then(function ({ name, id, email, officeNumber }) {
      let newManager = new Manager(name, id, email, officeNumber);
      teamMembers.push(newManager);
      markdownCardAddition(newManager);
      addMember();
    });
}

// adding team member function (called automatically 1st time, on demand after)
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
    // promise with promises within to determine role and applicable next question - also create this profile and add to html doc
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
            markdownCardAddition(newTeamMember);
            addAnotherTeamMember();
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
            markdownCardAddition(newTeamMember);
            addAnotherTeamMember();
          });
      }
    });
}

// function to determine if more team members are wanted or not
function addAnotherTeamMember() {
  inquirer
    .prompt([
      {
        type: "list",
        message: "Would you like to add more members to the team?",
        choices: ["Yes", "No"],
        name: "more",
      },
    ])
    .then(function ({ more }) {
      if (more === "Yes") {
        addMember();
      } else {
        markdownStop();
      }
    });
}

// function to begin creating markdown
function markdownBegin() {
  const starter = `<!DOCTYPE html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <meta name="viewport" content="width=device-width, initial-scale=1.0">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@4.6.1/dist/css/bootstrap.min.css" integrity="sha384-zCbKRCUGaJDkqS1kPbPd7TveP5iyJE0EjAuZQTgFLD2ylzuqKfdKlfG/eSrtxUkn" crossorigin="anonymous">
    <title>Team Profile</title>
</head>
<body>
    <nav style="height: 75px" class="navbar navbar-light bg-secondary bg-opacity-50 mb-4">
        <h1 class="mx-auto text-light">My Team</h1>
      </nav>


      <div class="container">
        <div class="row mx-auto">
          `;
  // write/create teamProfile html document
  fs.writeFile("./output/teamProfile.html", starter, function (error) {
    if (error) {
      console.log(error);
    }
  });
}

// function to create cards and add to markdown based on role
function markdownCardAddition(name) {
  const emp = name.getName();
  const role = name.getRole();
  const id = name.getId();
  const email = name.getEmail();
  let toAppend;

  if (role === "Manager") {
    const officeNumber = name.getOfficeNumber();
    toAppend = `
    <div class="col-5 col-lg-3  m-3 p-3">
    <div class="card m-3 p-3 " style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${emp}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${role}</h6>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Id: ${id}</li>
          <li class="list-group-item">Email: <a href="mailto:${email}">${email}</a></li>
          <li class="list-group-item">Office Number: ${officeNumber}</li>
        </ul>
      </div>
    </div>
  </div>

      `;
  } else if (role === "Engineer") {
    const github = name.getGitHub();
    toAppend = `
    <div class="col-5 col-lg-3  m-3 p-3">
    <div class="card m-3 p-3 " style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${emp}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${role}</h6>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Id: ${id}</li>
          <li class="list-group-item">Email: <a href="mailto:${email}">${email}</a></li>
          <li class="list-group-item">GitHub Profile: <a href="https://github.com/${github}">${github}</a></li>
        </ul>
      </div>
    </div>
  </div>

      `;
  } else if (role === "Intern") {
    const school = name.getSchool();
    toAppend = `
    <div class="col-5 col-lg-3  m-3 p-3">
    <div class="card m-3 p-3 " style="width: 18rem;">
      <div class="card-body">
        <h5 class="card-title">${emp}</h5>
        <h6 class="card-subtitle mb-2 text-muted">${role}</h6>
        <ul class="list-group list-group-flush">
          <li class="list-group-item">Id: ${id}</li>
          <li class="list-group-item">Email: <a href="mailto:${email}">${email}</a></li>
          <li class="list-group-item">School: ${school}</li>
        </ul>
      </div>
    </div>
  </div>

      `;
  } else {
    console.log(`I am broken`);
    return;
  }
  // append profile created above to current html doc
  fs.appendFile("./output/teamProfile.html", toAppend, function (error) {
    if (error) {
      console.log(error);
    }
  });
}

// function to complete markdown
function markdownStop() {
  let final = `</body>
  </html>`;
  fs.appendFile("./output/teamProfile.html", final, function (err) {
    if (err) {
      console.log(err);
    }
  });
}

// call init on load
init();