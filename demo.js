import express from 'express';
const app = express();
const port = 3000;
import { LocalStorage } from "node-localstorage";
global.localStorage = new LocalStorage('./scratch');
app.use(express.json());
// app.get('/search', (req, res) => {
//     //
//     const keywords = req.query.keyword;
//     const cat_id = req.query.cat_id;
//     const result = `Ban tim tu khoa ${keywords}`
//     res.send(result);
// });
// app.get('/:danhmuccha/:danhmuccon', (req, res) => {
//     //
//     const parent = req.params.danhmuccha;
//     const children = req.params.danhmuccon;
//     const result = `Danh mục cha la ${parent} và danh muc con la ${children}`;
//     res.send(result);
// });
// app.use(express.json());
// app.post('/products', (req, res) => {
//     //
//     const body = req.body;
//     console.log(body);
//     res.send(body);
// });
// app.put('/products', (req, res) => {
//     //
//     const header = req.headers;
//     console.log(header);
//     res.send(header);
// });
const addProduct = (data)=>{
    // localStorage.setItem('products', JSON.stringify(data));
//  Trước khi lưu ktra trong localstrage đã tồn tại key products hay chưa.
    const productInLocal = localStorage.getItem('products');
    if (productInLocal==null){
        localStorage.setItem('products',JSON.stringify([data]));
    }
    else{
        const products = JSON.parse(productInLocal);
        products.push(data);
        localStorage.setItem('products',JSON.stringify(products));
    }
    return data;
}
const ProductList=()=>{
    const productInLocal = localStorage.getItem('products');
    if (productInLocal==null){
        return [{}];
    }
    else {
        const products = JSON.parse(productInLocal);
        return products;
    }
}
const getProductById=(pid)=>{
    // Lấy danh sách sản phẩm ra trước.
    const products = ProductList();
    // Dùng filter để lọc ra sản phẩm cần tìm.
    const product = products.filter(({id})=>{
        return id == pid;
    })
    return product;
}
const upDateProductById = (pid,data)=>{
    // Lấy danh sách mảng sản phẩm.
    const products = ProductList();
    let index = -1; // Ban đầu là vị trí ngoài mảng.
    for (let i = 0; i<products.length;i++){
        if (products[i].id==pid){
            index = i;
            break;
        }
    }
    // sau khi xác định được vị trí thì cập nhật
    if (index > -1){
        products[index].name = data.name??products[index].name
        products[index].price = data.price??products[index].price
        localStorage.setItem('products',JSON.stringify(products));
        return {status:true,message:"Updated successfully"}
    }
    return {status:false,message:"Product not found"}
}
const DeleteProductById = (pid)=>{
    // Lấy ds sản phẩm.
    const products = ProductList();
    const newProducts = products.filter(({id})=>{
        return id!=pid
    });
    if (newProducts.length<products.length){
        localStorage.setItem('products',JSON.stringify(newProducts));
        return {status:true,message:"Delete successfully"}
    }
    else {
        return {status:false,message:"Product not found"}
    }
}
app.get('/products', (req, res) => {
    res.send(ProductList());
});
app.get('/products/:id', (req, res) => {
    // Lấy thông tin id người dùng gửi.
    const id = req.params.id;
    res.send(getProductById(id));
});
app.post('/products', (req, res) => {
    const data = req.body;
    const info = addProduct(data);
    res.send({status:true,data:info,message:"Add product successfully"});
});
app.put('/products/:id', (req, res) => {
    const id = req.params.id;
    const data = req.body;
    res.send(upDateProductById(id,data))
});
app.delete('/products/:id', (req, res) => {
    const id = req.params.id;
    res.send(DeleteProductById(id))
});
app.listen(port,()=>{
    console.log(`Endpoint: http://localhost:${port}`);
})