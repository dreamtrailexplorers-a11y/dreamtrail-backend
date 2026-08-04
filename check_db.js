import mongoose from " mongoose"; 
mongoose.connect("mongodb://127.0.0.1:27017/dreamtrail")
.then(() => mongoose.connection.db.collection("trips").find().sort({_id:-1}).limit(1).toArray()).then(d => 
    { console.log("quickInfo is: ", d[0].quickInfo); process.exit(0); });
