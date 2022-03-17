let div = document.createElement("div")
let titulo = document.createElement("h2")



let contadorCarrito = 0;

let pedido = {};

let tablaPedido = [];






const url = "https://gist.githubusercontent.com/josejbocanegra/9a28c356416badb8f9173daf36d1460b/raw/5ea84b9d43ff494fcbf5c5186544a18b42812f09/restaurant.json"


function getData(callback){
    fetch(url).then(res => res.json()).then(res=>{
        callback(res);
    });
    
}

let array = [];

let nom = "Burguers";

function hideMenu(){
    document.getElementById('titulo').innerHTML = "";
    document.getElementById('info').innerHTML = "";
}

function menosProd(ident){
    if(pedido[ident]>0){
        pedido[ident]-=1;
        contadorCarrito-=1;
        }
    tabla();
    addCarritoElement("");
    

}

function masProd(ident){
    pedido[ident] +=1;
    contadorCarrito+=1;
    tabla();
    
    addCarritoElement("");


}

function hideTabla(){
    document.getElementById("compras").innerHTML = "";

}

function tabla(){
    hideMenu();

    document.getElementById("compras").innerHTML = "";
    total = 0;
    contador = 0;

    let tabla = document.createElement("table");
    tabla.className = "table table-striped";
    let head = document.createElement("thead");
    let tr = document.createElement("tr");
    let item = document.createElement("th");
    item.innerHTML= "Item";
    let Qty = document.createElement("th");
    Qty.innerHTML = "Qty.";
    let description = document.createElement("th");
    description.innerHTML = "Description";
    let price = document.createElement("th");
    price.innerHTML = "Unit Price"
    let amount = document.createElement("th");
    amount.innerHTML = "Amount";
    let modify = document.createElement("th");
    modify.innerHTML = "Modify";

    tr.appendChild(item);tr.appendChild(Qty);tr.appendChild(description);
    tr.appendChild(price);tr.appendChild(amount); tr.appendChild(modify);
    head.appendChild(tr)
    tabla.appendChild(head);

    let body = document.createElement("tbody");

    for(prod in pedido){

        contador = 1;

        datos = prod.split('-')

        let tr1 = document.createElement("tr");
        let item1 = document.createElement("td");
        item1.innerHTML = contador;
        
        tr1.appendChild(item1);
        let qty1 = document.createElement("td");
        qty1.innerHTML = pedido[prod];
        tr1.appendChild(qty1);
        let description1 = document.createElement("td");
        description1.innerHTML = datos[0];
        tr1.appendChild(description1);
        let price1 = document.createElement("td");
        price1.innerHTML =datos[1]
        tr1.appendChild(price1);
        let amount1 = document.createElement("td");
        amount1.innerHTML = (datos[1]*pedido[prod]); 
        total += (datos[1]*pedido[prod]);
        tr1.appendChild(amount1);
        let modify1 = document.createElement("td");

        objeto = {"item": contador, "quantity": pedido[prod], "description": datos[0], "unitPrice": datos[1] };
        tablaPedido.push(objeto);

        let mas = document.createElement("img");
        mas.src = "mas.PNG";
        mas.style.maxWidth = "35px";
        mas.style.maxHeight = "35px";
        mas.style.marginRight = "10px";
        mas.id = prod;
        mas.onclick = function(){masProd(mas.id)};

        let menos = document.createElement("img");
        menos.src = 'menos.PNG';
        menos.style.maxWidth = "35px";

        menos.style.maxHeight = "35px";
        menos.style.marginLeft = "10px";
        menos.id = prod;
        menos.onclick = function(){menosProd(menos.id)};

        modify1.appendChild(mas);
        modify1.appendChild(menos);
        tr1.appendChild(modify1);


        contador+=1;

        body.appendChild(tr1);

    }

    tabla.appendChild(body);

    div = document.createElement("div");
    div.className ="conteiner border-bottom border-dark justify-content-center align-items-center";
    div.style.marginTop = "15px";
    div.style.marginBottom= "15px";

    h1 = document.createElement("h1");
    h1.innerHTML = "ORDER DETAIL";
    h1.style.flexDirection ="column";
    h1.style.justifyContent = "center";
    h1.style.textAlign = "center";
    
    
    div.appendChild(h1);
    document.getElementById("compras").appendChild(div);

    document.getElementById("compras").appendChild(tabla);

    info = document.createElement("div");
    info.className = "conteiner";

    row = document.createElement("div");
    row.className= "row";

    col1 = document.createElement("div");
    col1.className = "col d-flex"
    col1.style.alignContent = "start";

    h6 = document.createElement("h6");
    h6.innerHTML = "Total: " + total;

    col1.appendChild(h6);




    col2 = document.createElement("div");

    boton1 = document.createElement("button")
    boton1.className = "btn btn-danger";
    boton1.type="button";


    boton1.innerHTML = "Cancel";

    col2.appendChild(boton1);

    boton2 = document.createElement("button")
    boton2.className = "btn btn-success";
    boton2.type="button";

    boton2.innerHTML ="Confirm order"
    boton2.style.marginLeft = "15px"
    boton2.style.marginRight = "22px"
    boton2.onclick = function() { confirmarPedido(), hideTabla(); document.getElementById("exampleModal").modal('toggle');};

    col2.appendChild(boton2);


    row.appendChild(col1);



    row.appendChild(col2);
    document.getElementById("compras").appendChild(row);


}


function confirmarPedido(){
    console.log(tablaPedido);
    pedido = {};
    tablaPedido =[]
    
    contadorCarrito = 0;
    changeDat(nom);
}
    

function addCarritoElement(elemento){

    if (elemento == ""){
        carrito.innerHTML = "";
        let contenido = document.createElement('a');
        let img = document.createElement('img');
        img.src = 'carrito.png';
        img.style.height = "60px";
        contenido.onclick = function(){tabla()};
        contenido.appendChild(img);
        contenido.innerHTML+=contadorCarrito +" items";
        carrito.appendChild(contenido);

    }
    else{
        let carrito = document.getElementById("carrito")
        if(elemento in pedido){
            pedido[elemento]+=1;
        }
        else{
            pedido[elemento] = 1;
        }
    
        
        carrito.innerHTML = "";
        contadorCarrito+=1;
        let contenido = document.createElement('a');
        let img = document.createElement('img');
        img.src = 'carrito.png';
        img.style.height = "60px";
        contenido.onclick = function(){tabla()};
        contenido.appendChild(img);
        contenido.innerHTML+=contadorCarrito + " items";
        carrito.appendChild(contenido);

    }
    
}

function changeDat(param){
    nom = param;
    getData((value) =>{

        array = value;

        val = {}
    
        for(el in array){
            if(array[el]["name"] == nom){
                val = array[el]
            }
        }

         

        productos = val["products"]

        document.getElementById("info").innerHTML = "";

        let cardDek = document.createElement('div');
        cardDek.className = "card-deck";
        element = 0

        elemento = document.getElementById('titulo');
        elemento.innerHTML = nom.toUpperCase();
 
        for(i in productos){

            p = productos[i];

            let card = document.createElement('div');
            card.style.maxWidth= "22%"
            card.className = 'card justify-content-center';

            let image = document.createElement('img');
            image.className = "card-img-top";
            image.alt = "Card image cap";
            image.src=p["image"];
            image.style.maxHeight= "150px"
            image.style.maxWidth = "250px"

            let body = document.createElement('div');
            body.className = "Card-body";


            let title = document.createElement('h5');
            title.className= "card-title";
            title.innerHTML = p["name"];

            let content = document.createElement('p');
            content.className = "card text";
            content.innerHTML = p["description"]

            let precio = document.createElement('h6');
            precio.className = "card text";
            precio.innerHTML = p["price"];

            let a = document.createElement('a');
            a.className = "btn btn-warning";
            a.innerHTML = "Add to cart";
            a.id = p["name"]+"-"+p["price"];
            a.onclick = function() {addCarritoElement(a.id)};

            body.appendChild(title);
            body.appendChild(content);
            body.appendChild(precio);
            body.appendChild(a);

            card.appendChild(image);
            card.appendChild(body);

            cardDek.appendChild(card);

            element+=1;

            if(element%4== 0 ){
                document.getElementById('info').appendChild(cardDek);
                cardDek = document.createElement('div');
                cardDek.className = "card-deck";
            }



        }
        if(element%4 != 0 ){

            document.getElementById('info').appendChild(cardDek);
        }

        

        
    
    
    
    
    });


}

changeDat(nom);

