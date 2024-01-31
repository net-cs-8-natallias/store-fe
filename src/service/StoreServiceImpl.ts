import axios from "axios";
import { CatalogItemModel } from "../models/CatalogItemModel";
import { Filter } from "../models/Filter";
import { ItemModel } from "../models/ItemModel";
import StoreService from "./StoreService";
import { ItemBrandModel } from "../models/ItemBrandModel";
import { ItemCategoryModel } from "../models/ItemCategoryModel";
import { ItemTypeModel } from "../models/ItemTypeModel";


class StoreServiceImpl implements StoreService {

    CATALOG_BASE_URL: string = 'http://localhost:5288/catalog-bff-controller/catalog-items';

    getStockItems(catalogItemId: number): ItemModel[] {
        const res: ItemModel[] = []
        axios.get(`${this.CATALOG_BASE_URL}stock?catalogItemId=${catalogItemId}`)
        .then(result => {
            //res = result.data
        })
        .catch(err => {
            console.log(err.message)
        })
        return res;
    }
    getCatalogItems(filters: Filter): CatalogItemModel[] {
        const res: CatalogItemModel[] = [];
        axios.get(`${this.CATALOG_BASE_URL}?category=${filters.category}&type=${filters.type}&brand=${filters.brand}`)
        .then(result => {
            //res = result.data
        })
        .catch(err => {
            console.log(err.message)
        })
        return res;
    }
    getBrands(): ItemBrandModel[] {
        throw new Error("Method not implemented.");
    }
    getTypes(): ItemTypeModel[] {
        throw new Error("Method not implemented.");
    }
    getCategories(): ItemCategoryModel[] {
        throw new Error("Method not implemented.");
    }
    getItem(id: number): ItemModel {
        throw new Error("Method not implemented.");
    }
    getCatalogItem(id: number): CatalogItemModel {
        throw new Error("Method not implemented.");
    }
    getType(id: number): ItemTypeModel {
        throw new Error("Method not implemented.");
    }
    getCategory(id: number): ItemCategoryModel {
        throw new Error("Method not implemented.");
    }
    getBrand(id: number): ItemBrandModel {
        throw new Error("Method not implemented.");
    }

}

const create = () => new StoreServiceImpl();

export default create;