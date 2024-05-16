import {Component, OnDestroy, OnInit} from '@angular/core';
import {Ingredient} from "../shared/ingredient.model";
import {ShoppingListService} from "./shopping-list.service";
import {Subject, Subscription} from "rxjs";

@Component({
  selector: 'app-shopping-list',
  templateUrl: './shopping-list.component.html',
  styleUrl: './shopping-list.component.css'
})
export class ShoppingListComponent implements OnInit, OnDestroy{
  ingredients: Ingredient[] = []
  ingredientChangeSub: Subscription

  constructor(private shoppingListService: ShoppingListService) {
  }
  ngOnInit(){
    this.ingredients = this.shoppingListService.getIngredients()
    this.ingredientChangeSub = this.shoppingListService.ingredientsChanged.subscribe(
      (ingredients: Ingredient[]) => this.ingredients = ingredients
    )

  }

  ngOnDestroy(): void {
    this.ingredientChangeSub.unsubscribe()
  }

  onEditItem(i: number) {
    this.shoppingListService.startEditing.next(i)
  }
}
