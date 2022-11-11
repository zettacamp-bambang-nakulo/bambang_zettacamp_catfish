//import model dari recipes
const recipeModel= require("./recipesModel")

const mongoose = require('mongoose');

//untuk memanggil data recipes dengan menggunakn loader
async function getAllRecipes(parent,{page, limit}){
    const count = await recipeModel.count()
    let getRecipes= await recipeModel.aggregate([
        {
            $skip : (page-1)*limit
        },
        {
            $limit:limit
        }
    ])
    getRecipes.map((el)=>{
        el.id = mongoose.Types.ObjectId(el._id)
            return el
       })
       getRecipes = {
        data: getRecipes,
        count:count,
        page: page,
        max_page:  Math.ceil( count / limit),
        
        };
    return  getRecipes
}

//untuk loader data  ingredients
async function loadingredient(parent,args, context){
    if(parent.ingredient_id){
        // console.log(await context.bookloders.load(parent,created_by))
        // console.log(parent)
    return await context.ingredientloaders.load(parent.ingredient_id)
    }
    
}

//untuk memanggil data recipes berdasarkan idnya
async function getOneRecipes(parent,{id}){
    const getOne= await recipeModel.findById(id)
    return getOne
}

//untuk membuat create recipes
async function CreateRecipes(parent,{recipe_name,ingredients,stock_used,status}){
   const addrecipes= await new recipeModel({
    recipe_name:recipe_name,
    ingredients:ingredients,
    stock_used:stock_used,
    status:status
   })
 addrecipes.save()
 return addrecipes
}

//untuk mealukan updating pada recepies dengan mengganti id ingredients atau ganti nama,dll
async function UpdateRecipe(parent,{id,recipe_name,ingredients}){
    const UpdRecipe= await recipeModel.findByIdAndUpdate(id,{
    recipe_name:recipe_name,
    ingredients:ingredients
    },{new:true})
    return UpdRecipe
}

//untuk melakukan delete atau mengganti satatu
async function DeleteRecipe(parent,{id,status}){
    const delrecipe = await recipeModel.findByIdAndUpdate(id,{
        status:status
    },{new:true})
    return delrecipe
}



const recipeResolvers={
    Query:{
        getAllRecipes,
        getOneRecipes
    },
    Mutation:{
        CreateRecipes,
        UpdateRecipe,
        DeleteRecipe
    },
    ingredientid:{
        ingredient_id:loadingredient
    }
}

module.exports= recipeResolvers