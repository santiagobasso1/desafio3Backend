import fs from "fs";



class Producto {
    constructor(title, description, price, thumbnail, code, stock) {
        this.title = title;
        this.description = description;
        this.price = price;
        this.thumbnail = thumbnail;
        this.code = code;
        this.stock = stock;
    }
}
const producto1 = new Producto("Ryzen Threadripper 3990x", "Procesador Gaming gama alta", 490000, "https://firebasestorage.googleapis.com/v0/b/ecommercereact2022.appspot.com/o/threadripper3990x.jpg?alt=media&token=e6389599-5247-4468-9e95-725d61d7f34e", "aaaa", 23);
const producto2 = new Producto("Z590 Ultra", "Motherboard Gama Alta", 82000, "https://firebasestorage.googleapis.com/v0/b/ecommercereact2022.appspot.com/o/aorusZ590ULTRA.jpg?alt=media&token=932f4071-ace9-40fb-8f04-c85adf8bf82c", "aaab", 256);
const producto3 = new Producto("Zenith II Alpha", "Motherboard Gama Alta", 1000000, "https://firebasestorage.googleapis.com/v0/b/ecommercereact2022.appspot.com/o/ROGthreadripper.jpg?alt=media&token=bfa7fdda-23a5-4c84-92c5-e33dbb3ac93a", "aaac", 56);
const producto4 = new Producto("Rx 5500 xt ASUS", "Grafica Gama Media Alta", 100000, "https://firebasestorage.googleapis.com/v0/b/ecommercereact2022.appspot.com/o/rx5500xt.jpg?alt=media&token=f28c7534-425f-497f-b90e-911baea8b560", "aaad", 32);
const producto5 = new Producto("I7 4790", "Procesador Gama Media", 82000, "https://firebasestorage.googleapis.com/v0/b/ecommercereact2022.appspot.com/o/i7_4790.jpg?alt=media&token=9180a992-2129-4ce9-b89e-08c8fdfcc7ac", "aaae", 22);

const producto6 = new Producto("Z97_Gaming_3", "Motherboard", 24232, "https://firebasestorage.googleapis.com/v0/b/ecommercereact2022.appspot.com/o/Z97Gaming3.jpg?alt=media&token=19280f24-e0fe-47e9-a079-f4e9039f58fc", "aaaf", 253);
const producto7 = new Producto("IX570 Plus", "Motherboard", 46200, "https://firebasestorage.googleapis.com/v0/b/ecommercereact2022.appspot.com/o/X570plus.jpg?alt=media&token=56b604c8-1100-469a-ac94-624ab3097d4d", "aaag", 56);
const producto8 = new Producto("I7 11700K", "Procesador gama alta", 1000000, "https://firebasestorage.googleapis.com/v0/b/ecommercereact2022.appspot.com/o/i7_11700k.jpg?alt=media&token=1ed056cb-3956-4a45-8676-d8f24dce6805", "aaah", 526);
const producto9 = new Producto("RTX 3090 EVGA", "Grafica Gama Alta", 120000, "https://firebasestorage.googleapis.com/v0/b/ecommercereact2022.appspot.com/o/rtx3090.jpg?alt=media&token=5e87b010-c2af-4c35-86fe-645e3a1a8eba", "aaai", 32);
const producto10 = new Producto("Ryzen 5 5600", "Procesador Gama Media", 90000, "https://firebasestorage.googleapis.com/v0/b/ecommercereact2022.appspot.com/o/Ryzen_5_5600.jpg?alt=media&token=f4af6432-ab68-4aa2-85b4-6e5ad04a0c1d", "aaaj", 22);

class ProductManager {
    constructor(path) {
        this.path = path;
    }

    checkArchivo = ()=>{
        return fs.existsSync(this.path)       
    }
    crearArchivo = async () => {
        await fs.promises.writeFile(this.path, "[]")

    }
    addProduct = async (newProduct) => {
        if (toString(newProduct.id).length > 0 && newProduct.title.length > 0 && newProduct.description.length > 0 && toString(newProduct.price).length > 0 && newProduct.thumbnail.length > 0 && newProduct.code.length > 0 && toString(newProduct.stock).length > 0) {
            let contenido = await fs.promises.readFile(this.path, "utf-8");
            let arrayProductos = JSON.parse(contenido);
            if (arrayProductos.filter(product => product.code == newProduct.code).length > 0) {
                console.error("Ya existe el producto");
            }
            else 
            {
                let contenido = await fs.promises.readFile(this.path, "utf-8");
                let aux = JSON.parse(contenido);
                console.log()
                if (aux.length>0){
                    const idAutoincremental = aux[aux.length-1].id+1; //Esto para que sea incremental dependiendo del ultimo elemento
                    aux.push({ id: idAutoincremental, ...newProduct });
                    await fs.promises.writeFile(this.path, JSON.stringify(aux));
                }
                else{
                    const idAutoincremental = 1;
                    aux.push({ id: idAutoincremental, ...newProduct });
                    await fs.promises.writeFile(this.path, JSON.stringify(aux));
                }

            }
        } else {
            console.error("Debe tener todos los campos completos para agregarlo")
        }
    }

    getAllProducts= async()=> {
        let contenido = await fs.promises.readFile(this.path, 'utf-8')  
        let aux = JSON.parse(contenido)
        return aux;   
    }
    updateProduct = async({id, title, description, price, thumbnail, code, stock})  => {
        let contenido = await fs.promises.readFile(this.path, 'utf-8')  
        let aux = JSON.parse(contenido)
        if(aux.some(product=> product.id === id)) {
            let pos = aux.findIndex(product => product.id === id)
            if (title!=undefined){
                if (title.length>0)
                {
                    aux[pos].title = title;
                }
            }
            if (description!=undefined){
                if (description.length>0)
                {
                    aux[pos].description = description;
                }
            }
            if (price!=undefined){
                if (price.length>0)
                {
                    aux[pos].price = parseFloat(price);
                }
            }
            if (thumbnail!=undefined){
                if (thumbnail.length>0)
                {
                    aux[pos].thumbnail = thumbnail;
                }
            }
            if (code!=undefined){
                if (code.length>0)
                {
                    aux[pos].code = code;
                }
            }
            if (stock!=undefined){
                if (stock.length>0)
                {
                    aux[pos].stock = parseInt(stock);
                }
            }
            await fs.promises.writeFile(this.path, JSON.stringify(aux))
            console.log("Producto actualizado exitosamente");
        } else {
            console.log( "Producto no encontrado para actualizar")
        }
    
    }
    getProductById= async(id)=> {
        let contenido = await fs.promises.readFile(this.path, 'utf-8')  
        let aux = JSON.parse(contenido)
        if(aux.some(product=> product.id === id)) 
        {
            let pos = aux.findIndex(product => product.id === id)
            return aux[pos];
        }else{
            return null
        }        
    }

    deleteProductById= async(id)=> {
        let contenido = await fs.promises.readFile(this.path, 'utf-8')
        let aux = JSON.parse(contenido)
        if(aux.some(product=> product.id === id)) 
        {
            const arraySinElIdSeleccionado = aux.filter(product => product.id != id);
            await fs.promises.writeFile(this.path, JSON.stringify(arraySinElIdSeleccionado))
            console.log("Producto eliminado exitosamente");           
        }else{
            console.error("No se encontró el producto que desea eliminar")
        }        
    }
        
    cargarArchivo = async () => {
        //tests pedidos y adicionales:
        await this.crearArchivo(); //Es para que si no tiene el array vacio al inicio se lo ponga así evitamos errores, y para asegurarnos que existe el archivo
        await this.addProduct(producto1);
        await this.addProduct(producto2);
        await this.addProduct(producto3);
        await this.addProduct(producto4);
        await this.addProduct(producto5);
        await this.addProduct(producto6);
        await this.addProduct(producto7);
        await this.addProduct(producto8);
        await this.addProduct(producto9);
        await this.addProduct(producto10);

    }

}





// tests()

 export default ProductManager;




