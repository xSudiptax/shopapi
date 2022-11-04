const express = require("express");
const multer = require("multer");
require("./db/conn");
const ShopItem = require("./models/shop");


const app = express();


app.use(express.json());

const port = process.env.PORT || 3000;


const upload = multer({
    storage: multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, "./src/uploads")
        },
        filename: (req, file, cb)=> {
            cb(null, file.fieldname + "_" + Date.now() + ".jpg")
        }
    })
});



app.get("/", (req, res) => {
    res.send("hello from root get");
})

// create item
app.post("/shop", upload.single("item_image"), async (req, res) => {
    try{
        console.log(req.file.path)
        console.log(req.body);
        const item = new ShopItem(req.body);
        if(req.file){
            item.item_image = req.file.path;
        }else{
            res.send("image is not uploaded");
        }
        const addItem = await item.save();
        res.status(201).send(addItem);
    }catch(e){
        res.status(400).send(e);
    }
})

//get items
app.get("/shop", async(req, res) => {
    try{
        const getItems = await ShopItem.find();
        res.status(200).send(getItems);
    }catch(e){
        res.status(400).send(e);
    }
})

//get item by id
app.get("/shop/:id", async(req, res) => {
    try{
        const _id = req.params.id;
        const itemById = await ShopItem.findById(_id);
        if(!itemById){
            res.status(404).send();
        }else{
            res.send(itemById);
        }
    }catch(e){
        res.status(400).send(e);
    }
})

//udpate item by id
app.patch("/shop/:id", async(req, res) =>{
    try {
        const _id = req.params.id;
        const updateById = await ShopItem.findByIdAndUpdate(_id, req.body, {
            new: true
        });
        res.status(200).send(updateById);
    }catch(e){
        res.status(400).send(e);
    }
})

//delete item by id
app.delete("/shop/:id", async(req, res) => {
    try{
        const _id = req.params.id;
        const deleteItem = await ShopItem.findByIdAndDelete(_id);
        if(!deleteItem){
            res.status(400).send();
        }else{
            res.status(200).send(deleteItem);
        }
    }catch(e){
        res.status(500).send(e);
    }

})

app.listen(port, () => {
    console.log(`connection is setup at port ${port}`);
});