import { createRequire } from 'module';
const require = createRequire(import.meta.url);
import ora from 'ora';


const https = require("https");

require("dotenv").config({
  path: `./src/.env`
});

const apiKey = process.env.API_KEY;
const { program } = require("commander");

program
  .command("get-persons")
  .description("Make a network request to fetch the most popular persons")
  .requiredOption("-p, --popular", "Fetch the popular persons")
  .option("--page <type>", "The page of persons data results to fetch")
  .action(function (props) {
    console.log(props)
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
  });

program.parse(process.argv);