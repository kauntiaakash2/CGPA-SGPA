let semesterData = [];

function addSubject() {
  const subjectContainer = document.getElementById('subjects');
  const subjectRow = document.createElement('div');
  subjectRow.className = 'subject-row';

  subjectRow.innerHTML = `
    <input type="text" placeholder="Subject Name">
    <input type="number" placeholder="Credits" class="credit" min="0">
    <input type="number" placeholder="Grade Point (0-10)" class="grade" min="0" max="10" step="0.1">
  `;

  subjectContainer.appendChild(subjectRow);
}

function calculateSGPA() {
  const credits = document.querySelectorAll('.credit');
  const grades = document.querySelectorAll('.grade');

  let totalCredits = 0;
  let weightedSum = 0;

  for (let i = 0; i < credits.length; i++) {
    const credit = parseFloat(credits[i].value);
    const grade = parseFloat(grades[i].value);

    if (!isNaN(credit) && !isNaN(grade)) {
      totalCredits += credit;
      weightedSum += grade * credit;
    }
  }

  if (totalCredits === 0) {
    document.getElementById('sgpa-result').innerText = "Please enter valid credits and grades.";
    return;
  }

  const sgpa = (weightedSum / totalCredits).toFixed(2);
  document.getElementById('sgpa-result').innerText = `SGPA: ${sgpa}`;
  return sgpa;
}

function saveSemester() {
  const sgpa = calculateSGPA();
  if (!sgpa) return;

  const credits = document.querySelectorAll('.credit');
  let totalCredits = 0;

  for (let credit of credits) {
    const val = parseFloat(credit.value);
    if (!isNaN(val)) totalCredits += val;
  }

  semesterData.push({ sgpa: parseFloat(sgpa), credits: totalCredits });
  alert(`Semester saved! SGPA: ${sgpa}, Credits: ${totalCredits}`);

  // Reset fields
  document.getElementById('subjects').innerHTML = "";
  document.getElementById('sgpa-result').innerText = "";
}

function calculateCGPA() {
  if (semesterData.length === 0) {
    document.getElementById('cgpa-result').innerText = "No semesters saved yet.";
    return;
  }

  let totalWeightedSGPA = 0;
  let totalCredits = 0;

  for (let semester of semesterData) {
    totalWeightedSGPA += semester.sgpa * semester.credits;
    totalCredits += semester.credits;
  }

  const cgpa = (totalWeightedSGPA / totalCredits).toFixed(2);
  document.getElementById('cgpa-result').innerText = `CGPA: ${cgpa}`;
}
