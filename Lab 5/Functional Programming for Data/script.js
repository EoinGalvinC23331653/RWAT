const STUDENT_DATA_JSON = '[' + 
'{"name": "Annie Apple","id": "X00111111","address": "Phibsboro, D7","grades": [60, 71, 55, 53, 44, 62]},' + 
'{"name": "Ben Bounce","id": "B00111111","address": "Rathmines, D6","grades": [44, 22, 77, 33, 41, 50]},' +
'{"name": "Charlie Curry","id": "B00222222","address": "Phibsboro, D7","grades": [80, 88, 75, 81, 90, 77]},' +
'{"name": "Dan Dreamer","id": "X00222222","address": "Cabra, D7","grades": [64, 55, 66, 65, 78, 62]},' +
'{"name": "Emmy Ember","id": "X00333333","address": "Stoneybatter, D7","grades": [53, 55, 55, 52, 51, 60]},' +
'{"name": "Fiona Falls","id": "C00111111","address": "Grangegorman, D7","grades": [90, 91, 88, 80, 81, 97]},' +
'{"name": "Georgina Gull","id": "C00222222","address": "City Centre, D1","grades": [76, 67, 63, 71, 55, 82]},' +
'{"name": "Harry Hops","id": "C00333333","address": "Cabra, D7","grades": [50, 33, 55, 11, 42, 61]},' +
'{"name": "Iris Indie","id": "X00444444","address": "Tallaght, D24","grades": [61, 71, 58, 70, 65, 67]},' +
'{"name": "Jack Jobs","id": "C00444444","address": "Phibsboro, D7","grades": [60, 71, 55, 53, 44, 62]},' +
'{"name": "Kat Kid","id": "C00555555","address": "Grangegorman, D7","grades": [41, 41, 50, 48, 55, 44]},' +
'{"name": "Lula Lock","id": "C00666666","address": "Cabra, D7","grades": [77, 80, 85, 80, 78, 81]}]';

let students = JSON.parse(STUDENT_DATA_JSON);

let ids = students.map(student => student.id);

let idList = ids.join(", ");

let heading = document.createElement("h3");
heading.textContent = "Student IDs";
document.body.appendChild(heading);

let paragraph = document.createElement("p");
paragraph.textContent = idList;
document.body.appendChild(paragraph);

let newStudents = students.map(student => {

    let fullName = student.name.split(" ");
    let fullAddress = student.address.split(", D");

    let average = student.grades.reduce((total, grade) => total + grade, 0) / student.grades.length;

    return {
        name: fullName[0],
        surname: fullName[1],
        id: student.id,
        town: fullAddress[0],
        postcode: Number(fullAddress[1]),
        averageGrade: average,
        result: average >= 40 ? "P" : "F"
    };
});

let bestAverage = Math.max(...newStudents.map(student => student.averageGrade));

newStudents.forEach(student => {
    if (student.averageGrade === bestAverage) {
        student.result = "A";
    }
});

let tableHeading = document.createElement("h3");
tableHeading.textContent = "Student Results";
document.body.appendChild(tableHeading);

let table = document.createElement("table");
table.border = "1";

table.innerHTML = `
    <tr>
        <th>Name</th>
        <th>Surname</th>
        <th>ID</th>
        <th>Town</th>
        <th>Postcode</th>
        <th>Average Grade</th>
        <th>Result</th>
    </tr>
`;

newStudents.forEach(student => {
    let row = document.createElement("tr");

    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.surname}</td>
        <td>${student.id}</td>
        <td>${student.town}</td>
        <td>${student.postcode}</td>
        <td>${student.averageGrade.toFixed(2)}%</td>
        <td>${student.result}</td>
    `;

    table.appendChild(row);
});

document.body.appendChild(table);

let hasFailed = newStudents.some(student => student.result === "F");

console.log(hasFailed);

let failedStudents = newStudents.filter(student => student.result === "F");

let heading5 = document.createElement("h3");
heading5.textContent = "Failed Students";
document.body.appendChild(heading5);

let table5 = document.createElement("table");
table5.border = "1";

table5.innerHTML = `
    <tr>
        <th>Name</th>
        <th>Surname</th>
        <th>ID</th>
        <th>Result</th>
    </tr>
`;

failedStudents.forEach(student => {
    let row = document.createElement("tr");

    row.innerHTML = `
        <td>${student.name}</td>
        <td>${student.surname}</td>
        <td>${student.id}</td>
        <td>${student.result}</td>
    `;

    table5.appendChild(row);
});

document.body.appendChild(table5);

let totalAverage = newStudents.reduce((total, student) => {
    return total + student.averageGrade;
}, 0);

let classAverage = totalAverage / newStudents.length;

let heading6 = document.createElement("h3");
heading6.textContent = "Class Average";
document.body.appendChild(heading6);

let paragraph6 = document.createElement("p");
paragraph6.textContent = classAverage.toFixed(2) + "%";
document.body.appendChild(paragraph6);