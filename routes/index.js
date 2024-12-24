var express = require('express');
var router = express.Router();
const userModel = require("../model/userModel");

/* GET home page. */
router.get('/', async function(req, res, next) {
  try{
    const users = await userModel.find()
    // console.log('upload',users)
    res.render('index', {title: 'Index', posts: users})
  }catch(e){
    res.send(e)
  }
});

router.post('/upload',async function(req, res, next) {
  // res.send('Uploaded');
  try {
    console.log(req.body)
    const newUser = new userModel(req.body);
    const msg = await newUser.save();
    // console.log(msg)
    res.redirect("/")
  } catch (error) {
    res.send(error);
  }
});


router.get("/deleteProduct/:id", async(req, res) => {
const userDelete = await userModel.findByIdAndDelete(req.params.id);
res.redirect("/");


});

router.get("/updateProduct/:id", async(req, res)=>{
  const book = await userModel.findById(req.params.id)
  // console.log('update',book)
  res.render('update',{title: 'Update' ,book})
});


router.post("/update/:id", async (req, res) => {
  try {
    const { title, authorName, pages } = req.body;
    const updatedUser = await userModel.findByIdAndUpdate(
      req.params.id,
      { title, authorName, pages },
      { new: true } 
    );
    console.log('msg',updatedUser)

    if (!updatedUser) {
      return res.status(404).json({ error: 'User not found' });
    }

    res.redirect('/');
  } catch (err) {
    res.status(500).json({ error: 'Internal Server Error' });
  }
});



module.exports = router;
