
import ora from 'ora';
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

    const request = https.request(url, (response) => {
      let data = '';
      response.on('data', (chunk) => {
        data += chunk;
      });

      response.on("end", () => {
        setTimeout(() => {
          spinner.stop()
          //if success then print the data, if not then do spinner.fail()
          if (response.statusCode === 200) {
            console.log(JSON.parse(data));
            spinner.succeed('Data showed successfully!')
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