import { createRequire } from "module";
import getPersons from "./services/getPersons.js";
import getPerson from "./services/getUniquePerson.js";
const require = createRequire(import.meta.url);

const { program } = require("commander");

program
  .command("get-persons")
  .description("Make a network request to fetch the most popular persons")
  .requiredOption("-p, --popular", "Fetch the popular persons")
  .option("--page <type>", "The page of persons data results to fetch")
  .action((props) => getPersons(props));

program
  .command("get-person")
  .description("Make a network request to fetch the data of a single person")
  .option("--i <type>", "The id of the person")
  .action((props) => getPerson(props));

program.parse(process.argv);
