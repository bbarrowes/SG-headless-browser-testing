// Just some test code to familiarize myself with the concept
    // class Greetings {
    //     english(){
    //         return "Hello"
    //     }
    //     spanish(){
    //         return "Hola"
    //     }
    // }

    // class MoreGreetings{
    //     german(){
    //         return "Hallo"
    //     }
    //     french(){
    //         return "Bonjour"
    //     }
    // }

    // const greetings = new Greetings()
    // const moreGreetings = new MoreGreetings()

    // const allGreetings = new Proxy( moreGreetings , {
    //     get: function( target , property ){
    //         return target[property] || greetings[property]
    //     }
    // } )

    // console.log( allGreetings.english() )
// Code to simulate the page setup that I am going to be using, if I am going to be going the route of using a proxy instead of just extending the original class

    class Page{
        goto(){
            console.log("I'm going to another page")
        }
        setCookie(){
            console.log("I'm setting a cookie")
        }
    }
    class CustomPage{
        constructor(page){
            this.page = page
        }
        login(){
            this.page.goto('localhost:3000')
            this.page.setCookie()
        }
        static build(){
            const page = new Page()
            const customPage = new CustomPage(page);
        
            const superPage = new Proxy( customPage , {
                get: function( target , property ){
                    return target[property] || target.page[property]
                }
            })

            return superPage
        }
    }

    const superPage = CustomPage.build();
        superPage.login();

// I'm going to do this same thing, but extending classes instead.  I think that it will make it just a little bit cleaner, although I am glad to have learned about proxies, and I am glad that this is the route he decided to take, if not for the sole purpose of having exposed us to proxies and how they work--even if extending the child class would have been a cleaner, better match.

    // class Page{
    //     goto(){
    //         console.log("I'm going to another page")
    //     }
    //     setCookie(){
    //         console.log("I'm setting a cookie")
    //     }
    // }
    // class CustomPage extends Page {
    //     login(){
    //         this.goto('localhost:3000')
    //         this.setCookie()
    //     }
    // }

    // const page = new Page()
    // const customPage = new CustomPage();

    // // const superPage = new Proxy( customPage , {
    // //     get: function( target , property ){
    // //         return target[property] || target.page[property]
    // //     }
    // // })

    // customPage.goto();
    // customPage.setCookie();
    // customPage.login();

    //     // Yeah, I like this better: (1) it is cleaner, and (2) it makes more sense.  Everything is packaged together nicer, everything about the original is left intact, and there don't seem to be any downsides.  Awesome.  However, like I already said, I am glad that he is showing us how proxies work.  Maybe he will go on to show a downside, or prove that proxies are a better match, but I am glad that he taught them to us, whatever the case may be.