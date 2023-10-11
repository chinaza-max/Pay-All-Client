
let cacheData = "appV12";
const dynamicCacheName="site-dynamic12"

this.addEventListener("install", (event) => {
    event.waitUntil(
        caches.open(cacheData).then((cache) => {
            cache.addAll([
                "/static/js/main.chunk.js",
                "/static/js/0.chunk.js",
                "/static/js/bundle.js",
                "/assets/css/bootstrap.min.css",
                "/index.html",
                "/",
            ])
        })
    )
})

  


this.addEventListener("fetch", (event) => {


    if (!navigator.onLine) {
        event.respondWith(
            caches.match(event.request).then(cachesRes=>{
                return cachesRes || fetch(event.request).then(fetchRes=>{
                    
                    return caches.open(dynamicCacheName).then(cache =>{
    
                            cache.put(event.request.url,fetchRes.clone())
                        
                        return fetchRes;
                    })
                
                })
            })
            .catch((e)=>{
    
                console.log(e)
                console.log("=============offline offline==============")
               // return  caches.match("https://sunny-kataifi-7adb6f.netlify.app/fallBack.html")
                // return  caches.match("/fallBack.html")
    
                if(event.request.url.indexOf('.html')>-1){
                }
               // return  caches.match("dist/fallBack.html")
            })
        )
    }else{

        event.respondWith(
            caches.match(event.request).then(cachesRes=>{
                return fetch(event.request).then(fetchRes=>{
                    
                    return caches.open(dynamicCacheName).then(cache =>{
    
                        cache.put(event.request.url,fetchRes.clone())
                        
                        return fetchRes;
                    })
                
                })
            })
            .catch((e)=>{
    
                console.log(e)
                console.log("=============offline offline==============")
              
            })
        )
    }


    /*
    if (!navigator.onLine) {
        if(event.request.url=="http://localhost:3000/assets/css/bootstrap.min.css"){
            event.waitUntil(
                this.registration.showNotification('Internet', {
                    body: 'internet not working'
                })
            )    
        }
   
        event.respondWith(
            caches.match(event.request).then((resp) => {
                if (resp) {
                    return resp
                }
                let requestUrl = event.request.clone();
                fetch(requestUrl)
            })
        )
    }
    else{


        caches.match(event.request).then(cachesRes=>{
            return null || fetch(event.request).then(fetchRes=>{

                return caches.open(dynamicCacheName).then(cache =>{
                    if(event.request.url.indexOf('/assets')>-1||event.request.url.indexOf('/static/media')>-1||event.request.url.indexOf('/dist')>-1){
                            
                        console.log(event.request.url.indexOf('/assets'))
                        console.log("put")

                        cache.put(event.request.url,fetchRes.clone())

                    }
                    else{
                    }
    
                    return fetchRes;
                })
            })
        })
        .catch((e)=>{
            console.log("=============offline offline==============")

        })
    }


    */
})

