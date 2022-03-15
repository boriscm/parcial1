let div = document.createElement("div")
let titulo = document.createElement("h2")







const url = "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json"


function getData(callback){
    fetch(url).then(res => res.json()).then(res=>{
        callback(res);
    });
    
}

let array = [];

let nom = "Burguers";

function changeDat(param){
    nom = param;
    console.log(param);
    getData((value) =>{

        array = value;

        val = {}
    
        console.log(array)
        for(el in array){
            if(array[el]["name"] == nom){
                val = array[el]
            }
        }
        console.log(val)
    
    
    
    
    
    });


}

getData((value) =>{

    array = value;

    console.log(array)





}

);

console.log(nom )