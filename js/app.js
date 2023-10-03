//

document.addEventListener('DOMContentLoaded', function(){

    const email= {
        email:"",
        asunto:"",
        mensaje:""
    } 

    const inputEmail = document.querySelector("#email");
    const inputAsunto = document.querySelector("#asunto");
    const inputMensaje = document.querySelector("#mensaje");
    const formulario = document.querySelector("#formulario");
    const btnSubmit = document.querySelector("#formulario button[type='submit']");
    const btnReset = document.querySelector("#formulario button[type='reset']");
    const loading = document.querySelector("#loading");

    inputEmail.addEventListener("input", validar);
    inputAsunto.addEventListener("input", validar);
    inputMensaje.addEventListener("input", validar);

    formulario.addEventListener("submit", enviarEmail);
    
    btnReset.addEventListener("click", function(e){
        e.preventDefault();
        resetForm();
    })

    function enviarEmail(e){
        e.preventDefault();
        loading.classList.add("flex");
        loading.classList.remove("hidden");

        setTimeout(()=>{
            loading.classList.remove("flex");
            loading.classList.add("hidden");

            resetForm();

            const formEnviado = document.createElement("P");
            formEnviado.classList.add("bg-green-500", "text-white", "p-2", "text-center", "rounded-lg", "mt-10", "font-bold", "text-sm", "uppercase");
            formEnviado.textContent = "Mensaje enviado con Exito";

            formulario.appendChild(formEnviado);
            setTimeout(()=>{
                formulario.removeChild(formEnviado)
            },3000)
        },3000);
    }

    function validar(e){
     if(e.target.value.trim()==""){
        mostrarAlerta(`El campo ${e.target.id} es obligatorio.`, e.target.parentElement);
        email[e.target.name] ="";
        comprobarEmail();
        return;
    }
    if (e.target.id === "email" && !validarEmail(e.target.value)){
        mostrarAlerta("Email no valido", e.target.parentElement);
        email[e.target.name] ="";
        comprobarEmail();
        return
    };

    limpiarAlerta(e.target.parentElement);

    email[e.target.name] = e.target.value.trim().toLowerCase();
    
    comprobarEmail()
    }

    function mostrarAlerta(mesaje, referencia){

       limpiarAlerta(referencia)

        const error = document.createElement("p");
        error.textContent= mesaje;
        error.classList.add("bg-red-600", "text-white","p-2", "text-center");

        referencia.appendChild(error);
    }

    function limpiarAlerta(referencia ){
        const alerta = referencia.querySelector(".bg-red-600")
        if(alerta){
            alerta.remove();
        }
    }

    function validarEmail(email){
        const regex =  /^\w+([.-_+]?\w+)*@\w+([.-]?\w+)*(\.\w{2,10})+$/ 
        const resultado = regex.test(email);
        return resultado;
    }

    function comprobarEmail(){
        if(Object.values(email).includes("")){
            btnSubmit.classList.add("opacity-50");
            btnSubmit.disable = true;
            return;
        }
            btnSubmit.classList.remove("opacity-50");
            btnSubmit.disabled = false;
    }

    function resetForm(){
        email.email="";
        email.asunto="";
        email.mensaje="";
        formulario.reset();
        comprobarEmail();
    }
})