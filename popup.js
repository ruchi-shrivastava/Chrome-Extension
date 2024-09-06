const btn = document.querySelector(".changeColorBtn");
const colorGrid = document.querySelector(".colorGrid");
const colorValue = document.querySelector(".colorValue");
const currentUrl = document.querySelector(".currentUrl");

btn.addEventListener("click",async()=>{

// Assign the static URL to the variable
    // const url = 'https://i.pinimg.com/originals/90/c7/eb/90c7eba88ed33f07b7c3d98f9e0f203f.gif';

    // // Change the background image of the page or an element
    // document.body.style.backgroundImage = `url(${url})`;


 chrome.storage.sync.get('color',({color})=>{

    console.log('color: ' ,color);
  
 });
 
    let [tab] = await chrome.tabs.query({active: true, currentWindow: true});
   
    chrome.scripting.executeScript({
        target: { tabId: tab.id },
        function: pickColor,
    },
    async(colorResults)=>{
        const[data]= colorResults;
        if(data.result){
            const color = data.result.sRGBHex;
            colorGrid.style.backgroundColor = color;
            colorValue.innerText = color;

      try{
        await navigator.clipboard.writeText(color);
        }catch(err){
           console.error(err);
        }
           
        }
    });


});
// async function pickColor(){
//     // console.log('script working');
//     try{
//             const eyeDropper = new EyeDropper();
//      //  const selectedColor = await eyeDropper.open();
//           return await eyeDropper.open();
//  console.log(selectedColor);

//     }catch(err){
// console.error(err);
//     }
// }

async function pickColor() {
    try {
        const eyeDropper = new EyeDropper();
        const selectedColor = await eyeDropper.open();
        return selectedColor; // Ensure this is the structure you expect
    } catch (err) {
        console.error('EyeDropper error:', err);
    }
}