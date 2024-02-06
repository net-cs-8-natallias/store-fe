import { combineReducers, configureStore } from "@reduxjs/toolkit"
import { CatalogItemModel } from "../models/CatalogItemModel"
import { ItemBrandModel } from "../models/ItemBrandModel"
import { ItemCategoryModel } from "../models/ItemCategoryModel"
import { ItemModel } from "../models/ItemModel"
import { ItemTypeModel } from "../models/ItemTypeModel"
import { brandReducer, catalogReducer, categoryReducer, itemReducer, typeReducer } from "./reducers"


export type StateType = {
    catalog: CatalogItemModel[],
    item: ItemModel,
    brands: ItemBrandModel[],
    types: ItemTypeModel[],
    categories: ItemCategoryModel[]
}

const reducer = combineReducers<StateType> ({
    catalog: catalogReducer as any,
    item: itemReducer as any,
    brands: brandReducer as any,
    types: typeReducer as any,
    categories: categoryReducer as any
})

export const store = configureStore({reducer})