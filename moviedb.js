const https = require('https');

require('dotenv').config({ path: `${__dirname}/src/.env` })

const apiKey = process.env.API_KEY;

const { program } = require('commander');

program
	//.command('get-persons')
	.description('Make a network request to fetch the most popular persons')
	.action(getPersons())
	
	//Options
  .option('-p, --popular', 'Fetch the popular persons')
  .option('--page', 'The page of persons data results to fetch')
  .action(function(id){
		https.get(`https://api.themoviedb.org/3/person/popular?api_key=${apiKey}&page=${id}`, (resp) => {
			let data = '';
	
			// A chunk of data has been received.
			resp.on('data', (chunk) => {
				data += chunk;
			});
		
			// The whole response has been received. Print out the result.
			resp.on('end', () => {
				console.log(JSON.parse(data));
			});
		
		}).on("error", (err) => {
			console.log("Error: " + err.message);
		});
	})


  
function getPersons(id = 1) {
	https.get(`https://api.themoviedb.org/3/person/popular?api_key=${apiKey}&page=${id}`, (resp) => {
		let data = '';

		// A chunk of data has been received.
		resp.on('data', (chunk) => {
			data += chunk;
		});
	
		// The whole response has been received. Print out the result.
		resp.on('end', () => {
			console.log(JSON.parse(data));
		});
	
	}).on("error", (err) => {
		console.log("Error: " + err.message);
	});
}

