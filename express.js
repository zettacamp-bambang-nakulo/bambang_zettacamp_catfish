const { rejects } = require('assert')
const express = require('express')
const { resolve } = require('path')
const app = express()
const port= 8000
const creditbook=require("./app")
const book = {
    title: "onepice"
    ,author:"ODA"
    ,deskripsi:"I want to be the pirate king"
    ,price: 31000
    ,discon:5
    ,tax:10
    ,sale: true
    ,stock:6
    ,jumlah:6

}


app.listen(port)



function checkauth (req,res, next){
    //get the authorization header that was sent by the client
    const auth = req.headers.authorization
    console.log(auth);


    if(!auth){
        res.send("Error tidak dapat authorization")
        res.end()
        
    }

    let authori= new Buffer.from (auth.split(" ")[1], "base64").toString().split(":");
    let user= authori[0];
    let pass= authori[1];

    if (user == "zettacamp" && pass == "1234567"){
        //if authorized user
        next();
    } else {
       res.send("username and password wrong!")
       res.end()
        
    }

}

app.get("/" , checkauth, (req,res)=>{
    res.send("selamat datang")
    
    res.end()
}
)
app.get("/book",(req, res)=>{
    res.send(book)
    res.end()
})

app.get("/tax",async (req,res)=>{
    res.send(await creditbook())
})


// app.use("*",(req,res)=>{
//     res.send("halaman tidak ditemukan")
// })

//javascript day 6
function tax(){
    return book.price * book.tax /100;
}

function  cobapromise(){
    const waktu = 2000
    return new Promise((resolve, rejects)=>{
        setTimeout(()=>{
            resolve("selesai")
        }, waktu)
    })
   
}

async function cobaasync(){
        const coba = await cobapromise();
        // return coba
        
}

// cobaasync();
