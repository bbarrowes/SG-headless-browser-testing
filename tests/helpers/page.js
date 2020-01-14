const puppeteer = require('puppeteer');
const sessionFactory = require('../factories/sessionFactory');
const userFactory = require('../factories/userFactory');

class CustomPage {
    // Constructor
        constructor( page ){
            this.page = page;
        }
    // Statics
        // Build
            static async build(){
                // Make a browser instance
                    const browser = await puppeteer.launch({
                        headless:false
                    });
                // Create a Page instance
                    const page = await browser.newPage();
                // CustomPage
                    const customPage = new CustomPage( page );
                // Proxy
                    return new Proxy( customPage, {
                        get: function( target , property ){
                            return customPage[property] || browser[property] || page[property];
                        }
                    })
            }
    // Login
        async login(){
            // Get a user id
                const user = await userFactory();
                const {session,sig} = sessionFactory(user);
            // See if the logout button is there
                // Create a cookie out of the session object string and the signature
                    await this.page.setCookie({
                        name:"session",
                        value: session
                    })
                    await this.page.setCookie({
                        name:"session.sig",
                        value: sig
                    })
                    await this.page.goto('localhost:3000/blogs');
                // Wait for this element to show up
                    await this.page.waitFor('a[href="/auth/logout"]');
        }
    // Evaluate something on the page
        async getContentsOf(selector){
            return this.page.$eval( selector , (el) => {
                return el.innerHTML;
            });
        }
}

module.exports = CustomPage;