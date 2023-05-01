//const puppeteer = require('puppeteer');
const express = require('express');
const app = express();

app.use(express.json() );
const dbService = require('./dbService.js');

//app.post('/create', (req, res) => { //request contains url
    //const {url} = req.body;
    //const jobInfo = jobSearch(url);
    //jobSearch(url);//test

    //const db = dbService.getDbServiceInstance();
    //const result = db.createNewEntry(jobInfo.name, jobInfo.company, jobInfo.location, jobInfo.pay);

    //result
    //.catch(err => console.log(err) );
//})

app.post('/createManual' , (req, res) => {
    const {name} = req.body;
    const {company} = req.body;
    const {location} = req.body;
    const {pay} = req.body;

    const db = dbService.getDbServiceInstance();
    const result = db.createNewEntry(name, company, location, pay);

    result
    .catch(err => console.log(err) );
})

app.get('/read', (req, res) => {
    const db = dbService.getDbServiceInstance();
    const result = db.returnAllEntry();

    result
    .then(data => res.json( {data : data} ) )
    .catch(err => console.log(err) );
})

app.patch('/update', (req, res) => {
    const {id} = req.body;
    const {status} = req.body;

    const db = dbService.getDbServiceInstance();
    result = db.editEntry(id, status);

    result
    .catch(err => console.log(err) );
})

app.delete('/delete', (req, res) => {
    const {id} = req.body;

    const db = dbService.getDbServiceInstance();
    result = db.deleteEntry(id);

    result
    .catch(err => console.log(err) );
})

/**
* Inspects a linkedin job posting page with puppeteer scraping elements from the html and returns the job information
* @param url - the url of the page to be parsed through
* @return jobInfo - job name, company name, location, and pay of a job
*/
async function jobSearch(url) { //
    const browser = await puppeteer.launch();
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);
    await page.goto(url);
    //if url isn't valid return error

    //get job information from page using "inspect" element //need to test
    const jobInfo = await page.evaluate( () => { //scraped info returning null
        //let name = document.body.querySelector(".t-24 h1"); //class = t-24 t-bold jobs-unified-top-card__job-title
        //let company = document.body.querySelector('[class^="jobs-unified-top-card__company-name]'), element => element.textContent);
        //let location = document.body.querySelector('[class^="jobs-unified-top-card__bullet], [class^="jobs-unified-top-card__workplace-type]'), element => element.textContent);
        //let pay = document.body.querySelector('[class^="app-aware-link ], [href^="#SALARY]'; // add an if statement that defaults to "not specified"

        return {
            //name,
            //company,
           // location,
            //pay
        }
    });
    console.log(jobInfo);//test
    browser.close();

    //return jobInfo;
}

app.listen(3001, () => console.log('app is running') );

//check if logged in linkedin?
    //assume logged in for now