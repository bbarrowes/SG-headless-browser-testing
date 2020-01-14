// Setup
    // Requires
        const Page = require('./helpers/page');
            let page;
    // Before each
        beforeEach( async ()=>{
            page = await Page.build();
            await page.goto('localhost:3000');
        });
    // After each
        afterEach( async ()=>{
            await page.close();
        });
// Tests
    // When logged in
        describe('When logged in', async () => {
            // Before each
                beforeEach( async ()=>{
                    // Log the user in
                        await page.login();  
                    // Go to the blog-creation page
                        await page.click('a.btn-floating');
                });
            // Can open blog creation form
                test('Can see blog-creation form', async ()=>{
                    // Check if something on that form is showing up
                        const label = await page.getContentsOf('form label');
                    // Assert
                        expect(label).toEqual('Blog Title');
                });
            // When we use valid input
                describe("When using valid input", async ()=>{
                    // Before each
                        beforeEach( async ()=>{
                            // Enter valid data
                                // Title
                                    await page.type( '.title input' , "Test title" );
                                // Content
                                    await page.type( '.content input', "Test content" );
                                // Submit form
                                    await page.click( 'form button' );
                        });
                    // Submitting takes user to review screen
                        test('Submitting takes user to review screen', async ()=>{
                            // Test for title
                                const text = await page.getContentsOf('h5');
                                    expect(text).toEqual("Please confirm your entries");
                        });
                    // Submission adds blog to index page
                        // test('Submitting blog adds article to index page', async ()=>{
                            
                        // });
                });
            // When we use invalid input
                describe('When invalid input is used', async ()=>{
                    // Before each
                        beforeEach( async ()=>{
                            // Submit the form without any input data (no data is an invalid option)
                                await page.click('form button');
                        });
                    // Form shows an error
                        test('Form shows an error message', async()=>{
                            // Make sure the error messages showed up
                                // Title field
                                    const titleError = await page.getContentsOf('.title .red-text');
                                        expect(titleError).toEqual("You must provide a value");
                                // Content field
                                    const contentError = await page.getContentsOf('.content .red-text');
                                        expect(contentError).toEqual("You must provide a value");
                        });
                });
        });