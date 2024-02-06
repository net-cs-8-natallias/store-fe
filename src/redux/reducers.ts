import { Reducer } from "react";
import { CatalogItemModel } from "../models/CatalogItemModel";
import { SET_BRAND_ACTION, SET_CATALOG_ACTION, SET_CATEGORY_ACTION, SET_ITEM_ACTION, SET_TYPE_ACTION } from "./actions";
import { PayloadAction } from "@reduxjs/toolkit";
import { ItemModel } from "../models/ItemModel";
import { ItemBrandModel } from "../models/ItemBrandModel";
import { ItemTypeModel } from "../models/ItemTypeModel";
import { ItemCategoryModel } from "../models/ItemCategoryModel";


export const catalogReducer:Reducer<CatalogItemModel[], PayloadAction<CatalogItemModel[]>> =
 (courses = [], action):CatalogItemModel[] => {
     return action.type === SET_CATALOG_ACTION ? action.payload : courses;
}

// export const itemReducer:Reducer<ItemModel, PayloadAction<ItemModel>> =
//  (item, action):ItemModel => {
//      return action.type === SET_CATALOG_ACTION ? action.payload : item;
// }

export const itemReducer: Reducer<ItemModel, PayloadAction<ItemModel>> = 
(item = {id: 0, catalogItemId: 0, quantity: 0, size: ''}, action): ItemModel => {
    return action.type === SET_ITEM_ACTION ? action.payload : item;
}

export const brandReducer:Reducer<ItemBrandModel[], PayloadAction<ItemBrandModel[]>> =
 (brands = [], action):ItemBrandModel[] => {
     return action.type === SET_BRAND_ACTION ? action.payload : brands;
}

export const typeReducer:Reducer<ItemTypeModel[], PayloadAction<ItemTypeModel[]>> =
 (types = [], action):ItemTypeModel[] => {
     return action.type === SET_TYPE_ACTION ? action.payload : types;
}

export const categoryReducer:Reducer<ItemCategoryModel[], PayloadAction<ItemCategoryModel[]>> =
 (categories = [], action):ItemCategoryModel[] => {
     return action.type === SET_CATEGORY_ACTION ? action.payload : categories;
}