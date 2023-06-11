const fs = require("fs");

class ProductManager {
  constructor(path) {
    this.products = [];
    this.path = path;
  }

  #id = 0;

  #requiredFields(product) {
    if (
      !!product.title &&
      !!product.description &&
      !!product.price &&
      !!product.code &&
      !!product.thumbnail &&
      !!product.stock
    ) {
      return true;
    }
  }

  saveProducts() {
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.products), "utf8");
    } catch (error) {
      console.log("Error al guardar en el archivo:", error.message);
    }
  }

  getProducts() {
    return this.products;
  }

  async getProducts() {
    try {
      if (fs.existsSync(this.path)) {
        const productsjson = await fs.promises.readFile(this.path, "utf-8");
        const products = JSON.parse(productsjson);
        return (this.products = products);
      } else {
        return [];
      }
    } catch (error) {
      console.log(error);
    }
  }

  async addProduct(product) {
    if (this.#requiredFields(product)) {
      if (
        !this.products.some(
          (p) => p.code === product.code || this.products.length == 0
        )
      ) {
        this.#id++;
        try {
          const productsFile = await this.getProducts();
          const productwid = { ...product, id: this.#id };

          productsFile.push(productwid);
          await fs.promises.writeFile(this.path, JSON.stringify(productsFile));
        } catch (error) {
          console.log(error);
        }
      } else {
        console.log("El producto ya existe");
      }
    } else {
      console.log("Todos los campos son obligatorios, por favor completar");
    }
  }

  deleteProduct(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.saveProducts();
    } else {
      console.log("Error: Producto no encontrado.");
    }
  }

  getProductById = (productId) => {
    const prod = this.products.find((product) => product.id === productId);
    if (prod) {
      return prod;
    } else {
      console.log("Product not found");
      return "Product not found";
    }
  };
}

const manager = new ProductManager("./products.json");

const product1 = {
  title: "producto de prueba",
  description: "Este es un producto de prueba",
  price: 200,
  code: "abc123",
  thumbnail: "Sin imagen",
  stock: 25,
};

const product2 = {
  title: "producto de prueba 2",
  description: "Este es otro producto de prueba",
  price: 500,
  thumbnail: "Sin imagen",
  code: "abc1234567789",
  stock: 50,
};

const test = async () => {
  const getProducts = await manager.getProducts();
  /* console.log("Primer consulta sin productos agregados => ", getProducts); */

  await manager.addProduct(product1); //AGREGANDO PRODUCT1
  /* onsole.log("Producto agregado") */

  const getProductos2 = await manager.getProducts();
  /* console.log('2da consulta con un producto agregado =>', getProductos2) */

  await manager.addProduct(product2); //AGREGANDO PRODUCT2
  /* console.log("2do producto agregado") */

  const getProductos3 = await manager.getProducts();
  /* console.log('3er consulta con 2 productos agregados =>', getProductos3) */

  manager.deleteProduct(1); // ELIMINANDO PRODUCTO 1

  console.log(await manager.getProducts());

};

test();

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
