const exp=require('express');
const app=exp();

app.use(exp.json())

let products=[
    {id:1,name:"mobile",price:10000},
    {id:2,name:"laptop",price:20000},
    {id:3,name:"refrigerator",price:50000}
]

app.get('/GETproducts',(req,res)=>{
    res.send({
        message:"all products",
        payload: products
    })
})

app.get('/GETproduct/:id',(req,res)=>{
    let id=parseInt(req.params.id);
    let p=products.find((p)=>p.id===id);
    if(p===undefined){
        res.send({
            message:"product not found",
        })
    }
    else{
        res.send({
            message:'specific product',
            payload:p
        })
    }
})

app.put('/PUTproduct/:id',(req,res)=>{
    let id=parseInt(req.params.id);
    let p=req.body;
    let index=products.findIndex((product)=>product.id===id);
    if(index===-1){
        res.send({
            message:"product not found",
        })
    }
    else{
        products[index]=p;
        res.send({message:"product updated",
            payload: products
        })
    }
})

app.post('/POSTproduct',(req,res)=>{
    let p=req.body;
    products.push(p);
    res.send({message: "product added",
        payload: products
    })
})

app.delete('/DELETEproduct/:id',(req,res)=>{
    let id=parseInt(req.params.id);
    let index=products.findIndex((p)=>p.id===id);
    if(index===-1){
        res.send({
            message:"product not found",
        })
    }
    else{
        products.splice(index,1);
        res.send({message:"product deleted",
            payload: products
        })
    }
})

app.listen(3500,()=>console.log("Server running on port 3500"))