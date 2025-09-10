const express = require("express");
const dbConnection = require("./dbConnection");
const { ObjectId } = require("mongodb");
const app = express();
app.use(express.json());

// GET: Read all students
app.get("/student-read", async (req, res) => {
    let myDB = await dbConnection();
    let studentCollection=myDB.collection("students")
    let data = await studentCollection.find().toArray();
    let resObj={
      status:1,
      msg:"Student List",
      data
    }
    res.send(resObj);

});

// POST: Insert new student
app.post("/student-insert", async (req, res) => {

    let myDB = await dbConnection();
    let studentCollection = myDB.collection("students");

    let { sName, sEmail } = req.body;
  
    let obj = { sName, sEmail };
    let insertRes = await studentCollection.insertOne(obj);

    let resObj = {
      status: 1,
      msg: "Data Insert",
      data: insertRes
    };

    res.send(resObj);

  });

// DELETE: Placeholder
app.delete("/student-delete/:id",async (req, res) => {
  let {id}=req.params;
  let myDB=await dbConnection();
  let studentCollection=myDB.collection("students")
  let delRes=await studentCollection.deleteOne({_id:new ObjectId(id)})
    let resObj = {
      status: 1,
      msg: "Data Delete",
      delRes
    };
  console.log(id)
  res.send("Delete ApI");
});
app.put("/student-update/:id",async (req,res)=>{
  let{id}=req.params;
  let { sName, sEmail } = req.body;
  
    let obj = { sName, sEmail };
    let myDB=await dbConnection();
    let studentCollection=myDB.collection("students")
    let updateRes=await studentCollection.updateOne({_id:new ObjectId(id)},{$set:{sName,sEmail}})
     let resObj = {
      status: 1,
      msg: "Data Update",
      updateRes
    };

})

app.listen(8000, () => {
  console.log("Server running on http://localhost:8000");
});
