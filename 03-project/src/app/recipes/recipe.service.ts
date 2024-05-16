import {Recipe} from "./recipe.model";
import {Injectable} from "@angular/core";
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "../shopping-list/shopping-list.service";
import {Subject} from "rxjs";

@Injectable()
export class RecipeService{
  private _recipes: Recipe[] = [
    new Recipe('A test recipe',
      'This is simply a test',
      'https://www.eatingwell.com/thmb/zvHrm_Z8F2qLeJenpJ6lYodtq7M=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/57831531-73819d8ce8f5413cac42cf1c907bc37a.jpg',
      [new Ingredient('Meat', 1), new Ingredient('Fries', 20)]),
    new Recipe('A test recipe2',
      'This is simply a test',
      'https://www.eatingwell.com/thmb/zvHrm_Z8F2qLeJenpJ6lYodtq7M=/1500x0/filters:no_upscale():max_bytes(150000):strip_icc()/57831531-73819d8ce8f5413cac42cf1c907bc37a.jpg',
      [new Ingredient('Buns', 2), new Ingredient('Meat', 2)])
  ]
  recipesChanged = new Subject<Recipe[]>()

  constructor(private shoppingListService: ShoppingListService) {
  }
  getRecipe(id: number){
    return this._recipes[id]
  }
  getRecipes(){
    return this._recipes.slice()
  }

  setRecipes(value: Recipe[]) {
    this._recipes = value;
    this.recipesChanged.next(this._recipes.slice())
  }

  addIngredientsToShoppingList(ingredients: Ingredient[]){
    this.shoppingListService.addIngredients(ingredients)
  }
  addRecipe(recipe: Recipe){
    this._recipes.push(recipe)
    this.recipesChanged.next(this._recipes.slice())
  }
  updateRecipe(index:number, newRecipe: Recipe){
    this._recipes[index] = newRecipe
    this.recipesChanged.next(this._recipes.slice())
  }
  deleteRecipe(index:number){
    this._recipes.splice(index, 1)
    this.recipesChanged.next(this._recipes.slice())
  }
}
