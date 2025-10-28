// Convert attendance list into an array
let attendanceList = `2022472932
2022448095
2022004280
2022433132
2022516793
2022561995
2022509625
2022807476
2022502729
2022481431
2022003691
2022005613
2022363409`.trim().split("\n"); // Convert multiline string into an array

// Declare listFromPortal array
let listFromPortal = [];

// Get all elements with class "present" and process
Array.prototype.slice
  .call(document.getElementsByClassName("present"))
  .forEach((ele) => {
    // Extract ID and store in listFromPortal array
    let studentId = ele.value.split("::")[0].trim();
    listFromPortal.push(studentId);

    // Check if studentId exists in attendanceList and click
    if (attendanceList.includes(studentId)) {
      ele.click();
    }
  });
