import ora from "ora";
import chalk from "chalk";
import { createRequire } from "module";
const require = createRequire(import.meta.url);

const https = require("https");
require("dotenv").config({
  path: `./src/.env`,
});
const apiKey = process.env.API_KEY;

function getPerson(props) {
  const { i: id } = props;
  const spinner = ora("Fetching the person's data...").start();
  const options = {
    hostname: "api.themoviedb.org",
    path: `/3/person/${id}?api_key=${apiKey}`,
    method: "GET",
  };

  const request = https.request(options, (response) => {
    let responseBody = "";
    response.on("data", (chunk) => {
      responseBody += chunk;
    });

    response.on("end", () => {
      const data = JSON.parse(responseBody);
      setTimeout(() => {
        spinner.stop();
        //if success then print the data, if not then do spinner.fail()
        if (response.statusCode === 200) {
          console.log("--------------------------");
          console.log(chalk.white("Person: \n"));
          console.log("ID:", chalk.white(data.id));
          console.log("Name:", chalk.bold.blue(data.name));
          console.log(
            "Birthday:",
            chalk.white(data.birthday),
            chalk.gray("|"),
            chalk.white(data.place_of_birth)
          );
          if (data.known_for_department === "Acting") {
            console.log(
              `Department:`,
              chalk.magenta(data.known_for_department)
            );
          }
          console.log(chalk.bold.blue(data.biography));

          if (data.also_known_as.length > 0) {
            console.log("\n", chalk.white("\n"));
            console.log("Also know as:", "\n");
            data.also_known_as.map((alias) => {
              console.log("\t", alias, "\n");
            });
          } else {
            console.log(
              "\n",
              chalk.yellow(data.name, `doesn’t have any alternate names`, "\n")
            );
          }
          console.log("--------------------------");
          spinner.succeed("Person data loaded \n");
        } else {
          spinner.fail("Something went wrong");
        }
      }, 3000);
    });
  });

  request.on("error", (error) => {
    spinner.fail(error);
  });

  request.end();
}

export default getPerson;
