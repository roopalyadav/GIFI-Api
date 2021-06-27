console.log("Hello");
const KEY = "nOB3556ZxESrRS9EKW4kxkyt1xho0N1P";
document.addEventListener("DOMContentLoaded", init);
function init()
{
    let fig = document.createElement('figure');
    let img = document.createElement('img');
    var img_url = '';
    const div = document.getElementById('result');
    const div1 = document.getElementById('gifi_result');
    const gifSearch = document.getElementById('gifi-search');
    document.getElementById('gifi-button').addEventListener('click', e => {
        div.innerHTML = '';
        div1.style.display = 'block';
        e.preventDefault();
        let url = `https://api.giphy.com/v1/gifs/search?api_key=${KEY}&limit=4&q=`;
        let str = document.getElementById('gifi-search').value.trim();
        url = url.concat(str);
        console.log(url);
        fetch(url)
        .then(response => response.json())
        .then(content => {
            let html = '';
            // console.log(content.data)
           
            content.data.map(data => {
                html += `<img class="gifi_img" src=${data.images.fixed_width_small.url} alt=${data.title}/>`;
                div1.innerHTML = html;
            })
            div1.addEventListener('click', e => {
                //div.innerHTML = '';
            img_url = e.target.src;
            img.src = img_url;
            img.alt = "gifi";
            img.setAttribute('class', 'gifi_img')
            img.style.height="150px";
            fig.appendChild(img);
            div.appendChild(fig);
                div1.style.display = 'none';
            })
            
        })
        .catch(err => console.error(err));

    })


    showNotes();
let addBtn = document.getElementById("add");
addBtn.addEventListener('click',function(e){
    let addTxt= document.getElementById("message-text");
    let notes = localStorage.getItem("notes");
    if(notes==null)
    {
        notesObj=[];
    }
    else
    {
        notesObj=JSON.parse(notes);
    }
    notesObj.push({text: addTxt.value, src: img_url});
    localStorage.setItem("notes", JSON.stringify(notesObj));
    addTxt.value="";
    gifSearch.value = '';
    console.log(notesObj);
    showNotes();
    div1.style.display = 'none';
    div.innerHTML='';
    img_url="";
})

function showNotes() {
    let notes = localStorage.getItem("notes");
    if(notes==null)
    {
        notesObj=[];
    }
    else
    {
        notesObj=JSON.parse(notes);
    }
    let html=""
    notesObj.forEach(function(element, index) {
        html+=`
        <div class=" card noteCard card  my-2 mx-2" style="width: 18rem;" >
                <div class="card-body">
                  <h5 class="card-title">Message ${index +1}</h5>
                  <p class="card-text">${element.text}</p>
                  <img src=${element.src} alt="gifi"/>
                </div>
              </div>
                `
    
    });
    let notesElm = document.getElementById('messages');
    if(notesObj.length !=0 )
    {
        notesElm.innerHTML= html;
    }
   
        
}
}
