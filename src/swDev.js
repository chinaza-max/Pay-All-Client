
const convertedVapidKey = urlBase64ToUint8Array("BK5kqXAxocFecHUgKbZ4ZrqD8yFB4vvEPcR-ybgWRNrQkzUa1CeuSCxZnhVGjkI3twXgQeoilAKH7mJUatBZyoc")

function urlBase64ToUint8Array(base64String) {
  const padding = "=".repeat((4 - base64String.length % 4) % 4)
  // eslint-disable-next-line
  const base64 = (base64String + padding).replace(/\-/g, "+").replace(/_/g, "/")

  const rawData = window.atob(base64)
  const outputArray = new Uint8Array(rawData.length)

  for (let i = 0; i < rawData.length; ++i) {
    outputArray[i] = rawData.charCodeAt(i)
  }
  return outputArray
}

//const vapidKeys = webpush.generateVAPIDKeys();
export default function swDev() {

    let swUrl=`${process.env.PUBLIC_URL}/sw.js`
    navigator.serviceWorker.register(swUrl).then((resp)=>{
       
        return resp.pushManager.getSubscription()
        .then((sub)=>{
           // console.log(resp)
            return resp.pushManager.subscribe({
                userVisibleOnly:true,
                applicationServerKey:convertedVapidKey
            }).then(
                function(pushSubscription) {
                //  console.log(pushSubscription.endpoint);
                }, function(error) {
                //  console.log(error);
                }
              );
        })
    }).catch((e)=>{
        console.error(e)
    })  
}
