
import ora from 'ora';
import chalk from 'chalk';
import { createRequire } from 'module';
const require = createRequire(import.meta.url);


const https = require("https");
require("dotenv").config({
    path: `./src/.env`
  });
const apiKey = process.env.API_KEY;

function getPersons(props) {
    const { page } = props;
    const spinner = ora("Fetching the popular person's data...").start();

    const url = `https://api.themoviedb.org/3/person/popular?api_key=${apiKey}&page=${page}`;

    const options = {
        hostname: 'api.themoviedb.org',
        path: `/3/person/popular?api_key=${apiKey}&page=${page}`,
        method: 'GET'
    }


    const request = https.request(options, (response) => {

      let responseBody = '';
      response.on('data', (chunk) => {
        responseBody += chunk;
      });

      response.on("end", () => {
        const data = JSON.parse(responseBody)
        const totalPages = data.total_pages;
        setTimeout(() => {
          spinner.stop()
          //if success then print the data, if not then do spinner.fail()
          if (response.statusCode === 200) {
            data.results.map((person) =>{
              console.log("--------------------------");
              console.log("Person:");
              console.log("\n");
              console.log("ID:", person.id);
              console.log("Name:", person.name);
              if (person.known_for_department === 'Acting'){
                console.log(`Department:`, chalk.magenta(person.known_for_department))
              }
              
            })  
           // console.log(data);
            if (totalPages > page){
            console.log(chalk.white(`----------------------------------`))
            console.log(chalk.white(`\n Page: ${page} of ${totalPages}`))
            }
            spinner.succeed('Data showed successfully! \n')
          } else {
            spinner.fail('Something went wrong');
          }
        }, 3000)
      });
    })


    request.on('error', (error) => {
      spinner.fail(error);
    });

    request.end()
}

export default getPersons