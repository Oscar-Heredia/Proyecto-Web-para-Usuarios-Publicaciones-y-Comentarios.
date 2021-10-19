const btnAdd = document.getElementById("btnCargar");
  btnAdd.addEventListener("click",()=>{
   fetch('https://jsonplaceholder.typicode.com/users')
   .then(response => response.json())
   .then(json => {
   let info = "";
   for (let i=0;i<json.length;i++){
     info += `<option value = '${json[i].id}'> ${json[i].name} </option>`
   }
   const datos = document.getElementById("users")
   datos.innerHTML=info;
  });
});

const btnDatos = document.getElementById("btnDatos");
  btnDatos.addEventListener("click",()=>{
    const divdatosautor = document.getElementById("datosAutor");
    let id = document.getElementById("users").value;
    fetch('https://jsonplaceholder.typicode.com/users/'+id)
    .then((response) => response.json())
    .then((json) => {
      let datos = '';
        datos = `<div id="datosUsuario"  class="colortitulos">
          <p>name: ${json.name}</p>
          <p>username: ${json.username}</p>
          <p>email: ${json.email}</p>
          <p>address: ${json.address.street}</p>
          <p>phone: ${json.phone}</p>
          <button type="button" class='botonesfijs' onclick="eliminarDatosdeUsuario()">Eliminar</button>
      </div>`;
    divdatosautor.innerHTML = datos;
  });
});

function eliminarDatosdeUsuario (){
  let quitar = document.getElementById("datosAutor");
  quitar.innerHTML = "";
};



const menuUser = document.getElementById("users");
  menuUser.addEventListener("change",()=>{
  const divdatos = document.getElementById("posts") 
  let id = document.getElementById("users").value
  fetch('https://jsonplaceholder.typicode.com/posts?userId='+ id)
  .then((response) => response.json())
  .then((json) => {
    let datos = '';
    for (let i=0;i<json.length;i++){
      let a=i+1;
      datos += `<div>
        <h1>Obra Núm: ${a}</h1>
        <h2>Titulo de la obra: </h2>
        <h3 class="colortitulos">${json[i].title}</h3>
        <h2>Información de la obra:</h2>
        <p class="colorinformacion">${json[i].body}</p>
        <button type="button" class='botonesfijs' onclick="cargarComments(${json[i].id})" >ver comentarios</button>
        <div id="comment${json[i].id}">
        </div> 
      </div>`
    }
    divdatos.innerHTML = datos;
  });
});

function cargarComments(postid){
  // console.log(" clicked " , postid)
  let comments = document.getElementById("comment" + postid);
  fetch('https://jsonplaceholder.typicode.com/comments?postId=' + postid )
       .then((response) => response.json())
       .then((json)=> {
         let comentario = "<button type='button' class='botonesfijs' onclick='eliminarComments("+ postid +")'>Quitar</button>";
         for (let i=0; i<json.length;i++){
           let a=i+1;
           comentario += `<div class="comentarios" > <hr>
             <h3 class="colortituloscomentarios">Comentario Núm: ${a}</h3>
             <h3> Nombre:  ${json[i].name} </h3> 
             <h4> Email:  ${json[i].email} </h4>
             <p class="colorcomentarios"> Body:  ${json[i].body} </p>
          </div>`
       } 
       comments.innerHTML = comentario;
     });
};


function eliminarComments (postid){
  let quitar = document.getElementById("comment" +postid);
  quitar.innerHTML = "";
};