// COTIZADOR CONSTRUCTOR
// constructor Seguro
function Seguro(marca, anio, tipo) {
    this.marca = marca;
    this.anio = anio;
    this.tipo = tipo;
}
Seguro.prototype.cotizarSeguro = function() {
    /*
        1 = americano 1.15
        2 = asiatico 1.05
        3 = europeo 1.35
    */
    let cantidad;
    const base = 2000;

    switch(this.marca){
        case '1':
                cantidad = base * 1.15;
                break;
        case '2':
                cantidad = base * 1.05;
                break;
        case '3':
                cantidad = base * 1.35;
                break;        
    }

// leer el año
    const diferencia = new Date().getFullYear() - this.anio;
// cada año de dif. hay que reducir 3% el valor del seguro
    cantidad -=((diferencia * 3)* cantidad) /100;
// si el seguro es basico se multiplica por 30% si es completo 50% mas
if(this.tipo === 'basico'){
    cantidad *= 1.30;
}else{
    cantidad *= 1.50;
}

return cantidad;
}


// todo lo que se muestra
function Interfaz() {}

    // mensaje que se imprime en el html
    Interfaz.prototype.mostrarMensaje = function(mensaje,tipo) {
        const div = document.createElement('div');

        if( tipo === 'error'){
            div.classList.add('mensaje','error');
        }else{
            div.classList.add('mensaje','correcto');
        }
        div.innerHTML = `${mensaje}`;
        formulario.insertBefore(div,document.querySelector('.form-group'));

        setTimeout(function() {
            document.querySelector('.mensaje').remove();
        },3000);
    }

    // Imprime el resultado de la cotizacion
    Interfaz.prototype.mostrarResultado = function(seguro, total) {
        const resultado = document.getElementById('resultado');
        let marca;
        switch(seguro.marca) {
            case '1':
                marca = 'Americano';
                break;
            case '2':
                marca = 'Asiatico';
                break;
            case '3':
                marca = 'Europeo';
                break;
                    }
        // crear div
        const div = document.createElement('div');
        //Insertar informacion
        div.innerHTML =`
            <p class='header' >Tu Resumen</p>
            <p>Marca: ${marca}</p>
            <p>Año: ${seguro.anio}</p>
            <p>Tipo: ${seguro.tipo}</p>
            <p>Total: $ ${total}</p>
        `;

        const spinner = document.querySelector('#cargando img')
        spinner.style.display = 'block';
        setTimeout(function() {
            spinner.style.display = 'none';
            resultado.appendChild(div);
        }, 2000);

    }


// Event Listeners
const formulario = document.getElementById('cotizar-seguro');

formulario.addEventListener('submit', function(e){
    e.preventDefault();
    
    // LEER  la marca seleccionada del select
    const marca = document.getElementById('marca');
    const marcaSeleccionada = marca.options[marca.selectedIndex].value;

    // leer año seleccionado
    const anio = document.getElementById('anio');
    const anioSeleccionado = anio.options[anio.selectedIndex].value;


    // lee el valor del radio button
    const tipo = document.querySelector('input[name="tipo"]:checked').value;

    //instancia de interfaz
    const interfaz = new Interfaz();

    // revisamos que los campos no estan vacios
    if(marcaSeleccionada === ''|| anioSeleccionado === ''|| tipo === ''){
        // interfaz imprimiendo un error
        interfaz.mostrarMensaje('Faltan datos, revisar el formulario y prueba de nuevo','error');
    }else{
        // limpiar resultados
        const resultados = document.querySelector('#resultado div');
        if(resultados != null){
            resultados.remove();
        }

        //instanciar seguro y mostrar interfaz
        const seguro = new Seguro(marcaSeleccionada,anioSeleccionado,tipo);
        // Cotizar el seguro
        const cantidad = seguro.cotizarSeguro();
        // mostrar el resultado
        interfaz.mostrarResultado(seguro, cantidad);
        interfaz.mostrarMensaje('Cotizando...','correcto');
    }
})



const max = new Date().getFullYear(),
    min = max -20;

const selectAnios = document.getElementById('anio');
for ( let i = max; i > min; i-- ) {
    let option = document.createElement('option');
    option.value = i;
    option.innerHTML =i;
    selectAnios.appendChild(option);
}
