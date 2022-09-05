import {
  createRequire
} from 'module';
const require = createRequire(
  import.meta.url);
import ora from 'ora';




const https = require("https");

require("dotenv").config({
  path: `./src/.env`
});

const apiKey = process.env.API_KEY;


const {
  program
} = require("commander");

program
  .command("get-persons")
  .description("Make a network request to fetch the most popular persons")
  .requiredOption("-p, --popular", "Fetch the popular persons")
  .option("--page <type>", "The page of persons data results to fetch")
  .action(function (props) {

    const {
      page
    } = props;
    const spinner = ora('Loading unicorns').start();
    setTimeout(() => {
      spinner.color = 'yellow';
      spinner.text = 'Loading rainbows';
    }, 1000);

    https
      .get(
        `https://api.themoviedb.org/3/person/popular?api_key=${apiKey}&page=${page}`,
        (resp) => {
          let data = "";
          // A chunk of data has been received.
          resp.on("data", (chunk) => {
            data += chunk;
          });


            // The whole response has been received. Print out the result.
            resp.on("end", () => {
              setTimeout(() => {
                spinner.stop()
                console.log(JSON.parse(data));
              }, 3000)
            });


        }
      )
      .on("error", (err) => {
        console.log("Error: " + err.message);
      });
  });

program.parse(process.argv);