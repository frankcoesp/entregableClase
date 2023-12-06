const fs = require('fs')

class ProductManager{
    constructor(path){
        this.products = []
        this.productsId = 1
        this.path = path
        this.loadArray()
    }

    addProducts(
        title,
        description,
        price,
        thumbnail,
        code,
        stock
    ){
        if(!title || !description || !price || !thumbnail || !code || !stock)
        return 'Aun faltan campos por completar, revisa tu producto'

        const codeRepeat = this.products.find(exist => exist.code === code)
        if(codeRepeat) return `ERROR: El codigo "${code}" del producto "${title}" ya existe, asignale otro code`

        const newProduct = {
            id: this.productsId++,
            title,
            description,
            price,
            thumbnail,
            code,
            stock
        }

        this.products.push(newProduct)
        this.save()
        return `producto cargado existosamente`

    }
    save() {
        try {
            const data = JSON.stringify(this.products, null, 2);
            fs.writeFileSync(this.path, data, 'utf-8');
        } catch (err) {
            console.error(`Error al guardar el archivo: ${err.message}`);
        }
    }
    

    loadArray(){
        try{
            const readContent = fs.readFileSync(this.path,'utf-8')
            this.products = JSON.parse(readContent)
        }catch(err){
            console.log('error al cargar el producto:',err.message)
        }
    }

    
    getProducts(){
        return [...this.products]
    }

    getProductById(idProduct) {
        const product = this.products.find(product => product.id === idProduct);
        return product ? { ...product } : null;
    }
    
    updateProduct(idProduct, fieldToUpdate, newValue) {
        const productIndex = this.products.findIndex(product => product.id === idProduct);

        if (productIndex !== -1) {
            const updatedProduct = { ...this.products[productIndex] };

            updatedProduct[fieldToUpdate] = newValue;

            this.products[productIndex] = updatedProduct;

            this.save();

            return 'Producto actualizado exitosamente';
        } else {
            return 'No se encontró un producto con el ID especificado';
        }
    }

    deleteProduct(idProduct) {
        const productIndex = this.products.findIndex(product => product.id === idProduct);

        if (productIndex !== -1) {
            this.products.splice(productIndex, 1);
            this.save();

            return 'Producto eliminado exitosamente';
        } else {
            return 'No se encontró un producto con el ID especificado';
        }
    }
}


const productManager = new ProductManager('objetos.json');

console.log(productManager.getProducts())

console.log(productManager.addProducts('Producto prueba', 'Este es un producto prueba', 200, 'sin imagen', 'abc123', 25));
console.log(productManager.addProducts('Producto prueba2', 'Este es un producto prueba2', 400, 'sin imagen2', 'ihy164', 25));
console.log(productManager.addProducts('Producto prueba3', 'Este es un producto prueba3', 600, 'sin imagen3', 'uiu134', 25));
console.log(productManager.addProducts('Producto 4', 'Descripción del Producto 4', 300, 'imagen4.jpg', 'xyz456', 20));
console.log(productManager.addProducts('Producto 5', 'Descripción del Producto 5', 500, 'imagen5.jpg', 'lmn789', 15));
console.log(productManager.addProducts('Producto 6', 'Descripción del Producto 6', 700, 'imagen6.jpg', 'opq012', 30));
console.log(productManager.addProducts('Producto 7', 'Descripción del Producto 7', 800, 'imagen7.jpg', 'rst345', 10));
console.log(productManager.addProducts('Producto 8', 'Descripción del Producto 8', 250, 'imagen8.jpg', 'uvw678', 18));
console.log(productManager.addProducts('Producto 9', 'Descripción del Producto 9', 450, 'imagen9.jpg', 'xyz901', 22));
console.log(productManager.addProducts('Producto 10', 'Descripción del Producto 10', 550, 'imagen10.jpg', 'abc234', 27));
console.log(productManager.getProducts())

console.log(productManager.getProductById(1))
console.log(productManager.updateProduct(2, 'price', 150))




console.log(productManager.getProducts()) 