import { createRequire } from 'module';
import getPersons from './services/getPersons.js';
const require = createRequire(import.meta.url);


const { program } = require("commander");

program
  .command("get-persons")
  .description("Make a network request to fetch the most popular persons")
  .requiredOption("-p, --popular", "Fetch the popular persons")
  .option("--page <type>", "The page of persons data results to fetch")
  .action((props) => getPersons(props))

program.parse(process.argv);