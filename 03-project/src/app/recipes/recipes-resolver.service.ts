import {inject, Injectable} from "@angular/core";
import {ActivatedRouteSnapshot, ResolveFn, RouterStateSnapshot} from "@angular/router";
import {Recipe} from "./recipe.model";
import {DataStorageService} from "../shared/data-storage.service";
import {RecipeService} from "./recipe.service";

@Injectable({providedIn: 'root'})
export class RecipesResolverService{

}

export const recipesResolver: ResolveFn<Recipe[]> = (
  route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot,
) => {
  const recipeService = inject(RecipeService);
  const dataStorageService = inject(DataStorageService);

  const recipes = recipeService.getRecipes();

  if (recipes.length === 0) {
    return dataStorageService.fetchRecipes();
  }

  return recipes;
};
