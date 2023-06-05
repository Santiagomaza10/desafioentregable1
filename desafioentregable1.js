
class ProductManager {

    constructor () {
        this.products = [];
    }

    #id = 0;

    addProduct(title, description, price, thumbnail, code, stock){

    if ( ( this.products.some( p => p.code !== code) ) || this.products.length === 0 ) {
            if ( !!title && !!description && !!price && !!code && !!thumbnail && !!stock ) {
                this.#id++
                this.products.push( { id: this.#id, title, description, price, thumbnail, code, stock } )
            } else {
                console.log("Todos los campos son obligatorios, por favor completar");
            }
        } else {
            console.log("El producto ya existe!");
        }
    }

    getProducts(){
        return this.products
    }


    getProductById = (productId) => {
        const prod = this.products.find(product => product.id === productId)
        if (prod) {
            console.log(prod)
            return prod
        } else {
            console.log("Product not found")
            return "Product not found"
    }
}
}

const ejemplo = new ProductManager; // Instancia creada

console.log("PRUEBA DE ARRAY VACIO",ejemplo.getProducts()) // Array vacio

ejemplo.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25); // Agregando producto

console.log(ejemplo.getProducts()) // Chequeando array de productos con el producto agregado

ejemplo.addProduct("producto prueba", "Este es un producto prueba", "Sin imagen", "abc123", 25); // Agregando producto con datos incompletos

ejemplo.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25); // Agregando producto repetido

ejemplo.addProduct("producto prueba2", "Este es un producto prueba2", 150, "Sin imagen2", "abc1232", 30); // Agregando otro producto

console.log(ejemplo.getProducts()) // Chequeando array de productos con el segundo producto agregado

ejemplo.getProductById(1);  // Filtrando producto por id

ejemplo.getProductById(3) // Filtrando producto con id inexistente


