const fs = require('fs') //module so we can use it to interact with the file system and read data from the file.
const csv = require('csv-parser') //used to parse the data in the CSV file.

const users = []; //used to hold an array of user objects.
function generateUsername(firstname, surname) {
    return `${firstname[0]}-${surname}`.toLowerCase();
}
fs.createReadStream('input.csv') //To read the data from the file, we call
  .pipe(csv())
  .on('data', function (row) {
    const username = generateUsername(row.Firstname, row.Surname);

    
    const user = {
        username,
        firstname: row.Firstname,
        surname: row.Surname,
        amount: row.amount,
        date: row.date,
        
    }
    users.push(user)
  })
  .on('end', function () {
      console.table(users)
      
    })

    function writeToCSVFile(users) {
        const filename = 'output.csv';
        fs.writeFile(filename, extractAsCSV(users), err => {
          if (err) {
            console.log('Error writing to csv file', err);
          } else {
            console.log(`saved as ${filename}`);
          }
        });
      }
      
      function extractAsCSV(users) {
        const header = ["Username, Amount, DAte"];
        const rows = users.map(user =>
           `${user.username}, ${user.amount}, ${user.date}`
        );
        return header.concat(rows).join("\n");
      }