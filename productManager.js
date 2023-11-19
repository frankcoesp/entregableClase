class ProductManager{
    constructor(){
        this.products = []
        this.productsId = 1
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
        return `producto cargado existosamente`
    }

    getProducts(){
        return this.products
    }

    getProductsById(idProduct){
        const product = this.products.find(product=> product.id === idProduct)
        if(!product) return 'Not found'
        return product
    }
}

const newProduct = new ProductManager()
console.log(newProduct.getProducts())


console.log(newProduct.addProducts('producto prueba1', 'esto es un producto prueba', 200, 'sin imagen', 'abc123', 25));

console.log(newProduct.addProducts('producto prueba2', 'esto es un producto prueba', 200, 'sin imagen', 'abc123', 25));

console.log(newProduct.addProducts('producto prueba3', 'esto es un producto prueba', 200, 'sin imagen', 'abc123wew', 25));

console.log(newProduct.addProducts('producto incompleto', 'esto es un producto prueba para la funcion donde faltan agregar campos', 200, 'sin imagen',25));

console.log(newProduct.getProducts())

const productoId1 = newProduct.getProductsById(2);
const productoId2 = newProduct.getProductsById(3);
console.log('--------busqueda de productos por ID--------')
console.log(productoId1)
console.log(productoId2)