const { default: mongoose } = require("mongoose");



let reviewSchema = mongoose.Schema({
    CustomerName: { type: String, default:"karim lucky" },   
    rating: { type: Number, },    // Rating (1-5)
    reviewText: { type: String, default: "" },    
    date: { type: Date, default: Date.now }      
});

let watchSchema = mongoose.Schema({
    watchName: { type: String,  },        
    watchPrice: { type: Number, },       
    watchDesc: { type: String,  },        
    watchCategory: { type: [String],default:[] }, 
    reviews: { type: [reviewSchema], default: [] },    
    file: { type: String, default:""},         
    features: { type: [String], default: [] },          
    
    
    
        
});

 
export let Watch = mongoose.models.watches || mongoose.model("watches", watchSchema);
 
