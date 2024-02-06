import { CatalogItemModel } from "../models/CatalogItemModel";
import { Filter } from "../models/Filter";
import { ItemBrandModel } from "../models/ItemBrandModel";
import { ItemCategoryModel } from "../models/ItemCategoryModel";
import { ItemModel } from "../models/ItemModel";
import { ItemTypeModel } from "../models/ItemTypeModel";

export default interface StoreService {
    getStockItems(catalogItemId: number): ItemModel[];
    getCatalogItems(filters: Filter): CatalogItemModel[];
    getBrands(): ItemBrandModel[];
    getTypes(): ItemTypeModel[];
    getCategories(): ItemCategoryModel[];

    getItem(id: number): ItemModel;
    getCatalogItem(id: number): CatalogItemModel;
    getType(id: number): ItemTypeModel;
    getCategory(id: number): ItemCategoryModel;
    getBrand(id: number): ItemBrandModel;
}