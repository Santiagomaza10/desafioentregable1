const fs = require('fs');
const path = require('path');

class ProductManager {
  constructor(filePath) {
    this.path = filePath;
    this.products = [];
    this.nextId = 1;
    this.loadProducts();
  }

  loadProducts() {
    try {
      const data = fs.readFileSync(this.path, 'utf8');
      if (data) {
        this.products = JSON.parse(data);
        const lastProduct = this.products[this.products.length - 1];
        this.nextId = lastProduct ? lastProduct.id + 1 : 1;
      }
    } catch (error) {
      console.log('Error al leer el archivo:', error.message);
    }
  }

  saveProducts() {
    try {
      fs.writeFileSync(this.path, JSON.stringify(this.products), 'utf8');
    } catch (error) {
      console.log('Error al guardar en el archivo:', error.message);
    }
  }

  addProduct(product) {
    if (!product.title || !product.description || !product.price || !product.thumbnail || !product.code || !product.stock) {
      console.log('Error: Todos los campos son obligatorios.');
      return;
    }

    if (this.isCodeDuplicate(product.code)) {
      console.log('Error: El código ya está en uso.');
      return;
    }

    const newProduct = {
      id: this.nextId,
      title: product.title,
      description: product.description,
      price: product.price,
      thumbnail: product.thumbnail,
      code: product.code,
      stock: product.stock,
    };

    this.products.push(newProduct);
    this.nextId++;
    this.saveProducts();
  }

  isCodeDuplicate(code) {
    return this.products.some((product) => product.code === code);
  }

  getProducts() {
    return this.products;
  }

  getProductById(id) {
    const product = this.products.find((product) => product.id === id);
    if (product) {
      return product;
    } else {
      console.log('Error: Producto no encontrado.');
      return null;
    }
  }

  updateProduct(id, updatedFields) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      const updatedProduct = { ...this.products[index], ...updatedFields };
      this.products[index] = updatedProduct;
      this.saveProducts();
    } else {
      console.log('Error: Producto no encontrado.');
    }
  }

  deleteProduct(id) {
    const index = this.products.findIndex((product) => product.id === id);
    if (index !== -1) {
      this.products.splice(index, 1);
      this.saveProducts();
    } else {
      console.log('Error: Producto no encontrado.');
    }
  }
}

const filePath = path.join('./productos.json');
const manager = new ProductManager(filePath);

manager.addProduct({
  title: 'producto prueba',
  description: 'este es un producto de prueba',
  price: 200,
  thumbnail: 'sin  imagen',
  code: 'abc123',
  stock: 25,
});
manager.addProduct({
  title: 'producto prueba2',
  description: 'este es otro de prueba',
  price: 500,
  thumbnail: 'sin imagen',
  code: 'abc123123',
  stock: 50,
});


console.log(manager.getProducts());

console.log(manager.getProductById(2));

console.log(manager.getProductById(4));

// Actualizar un producto
manager.updateProduct(2, { price: 1000, stock: 100 });

// Eliminar un producto
manager.deleteProduct(4);

console.log(manager.getProducts());


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
