const fs = require('fs')

class ProductManager {

    constructor (path) {
        this.products = [];
        this.path = path
    }

    

    #id = 0;
    
    async getProducts(){
        try {
            if (fs.existsSync(this.path)) {
                const productsjson = await fs.promises.readFile(this.path, 'utf-8')
                const products = JSON.parse(productsjson)
                return products
            } else {
                return []
            }

        } catch (error) {
            console.log(error)
        }
        
    }

    async addProduct(product){

    if ( ( this.products.some( p => p.id !== id) ) || this.products.length === 0 ) {
            if ( !!product.title && !!product.description && !!product.price && !!product.code && !!product.thumbnail && !!product.stock ) {
                try {
                    const productsFile = await this.getProducts();
                    this.#id++
                    const productwid = {...product, id: this.#id}
                    
                    productsFile.push(productwid)
                    await fs.promises.writeFile(this.path, JSON.stringify(productsFile))
                } catch (error) {
                    console.log(error)
                }


                
                
            } else {
                console.log("Todos los campos son obligatorios, por favor completar");
            }
        } else {
            console.log("El producto ya existe!");
        }
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


const ejemplo = new ProductManager('./products.json')

const product1 = {
    title : "producto de prueba",
    description: "Este es un producto de prueba",
    price: 200,
    code: "abc123",
    thumbnail: "Sin imagen",
    stock: 25
}

const product2 = {
    title : "producto de prueba 2",
    description: "Este es otro producto de prueba",
    price: 500,
    thumbnail: "Sin imagen",
    code: "abc1234567789",
    stock: 50
}

const test = async () => {
    const getProducts = await ejemplo.getProducts()
    console.log('Primer consulta sin productos agregados => ',getProducts)
    await ejemplo.addProduct(product1)
    const getProductos2 = await ejemplo.getProducts()
    console.log('2da consulta =>', getProductos2)
    await ejemplo.addProduct(product1)
    const getProductos3 = await ejemplo.getProducts()
    console.log('3er consulta =>', getProductos3)
}

test()
/* const ejemplo = new ProductManager; // Instancia creada

console.log("PRUEBA DE ARRAY VACIO",ejemplo.getProducts()) // Array vacio

ejemplo.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25); // Agregando producto

console.log(ejemplo.getProducts()) // Chequeando array de productos con el producto agregado

ejemplo.addProduct("producto prueba", "Este es un producto prueba", "Sin imagen", "abc123", 25); // Agregando producto con datos incompletos

ejemplo.addProduct("producto prueba", "Este es un producto prueba", 200, "Sin imagen", "abc123", 25); // Agregando producto repetido

ejemplo.addProduct("producto prueba2", "Este es un producto prueba2", 150, "Sin imagen2", "abc1232", 30); // Agregando otro producto

console.log(ejemplo.getProducts()) // Chequeando array de productos con el segundo producto agregado

ejemplo.getProductById(1);  // Filtrando producto por id

ejemplo.getProductById(3) // Filtrando producto con id inexistente


 */