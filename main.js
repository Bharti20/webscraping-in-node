const puppeteer = require('puppeteer')

let scrapper = async () => {
    const browser = await puppeteer.launch({arg:['--no-sandbox', '--disabled-setuid-sandbox']});
    const page = await browser.newPage();
    await page.setDefaultNavigationTimeout(0);

    await page.goto('https://www.tigerdirect.com/applications/SearchTools/item-details.asp?EdpNo=640254&CatId=3')
        let i = 0
        const result = await page.evaluate(() => {
            let reviewer_name = document.querySelector('.reviewer').innerText;
            let customer_comment =  document.querySelector('div[class="rightCol"]').innerText;
            let rating =  document.querySelector('dl[class="itemReview"]>dd').innerText;
            console.log(reviewer_name)
        
        return {
            reviewer_name,
            customer_comment,
            rating
        };
    });
    browser.close();
    return result;

};

scrapper().then((value) => {
    let name = value['reviewer_name'].replace(/\\n/g, '')
    let comment = value['customer_comment'].replace(/\\n/g, '')
    let rating = value['rating'].replace(/\\n/g, '')
    console.log(`${name}${comment}${rating}`)
    
});