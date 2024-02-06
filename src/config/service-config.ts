import CatalogServiceRest from "../service/CatalogServiceRest";

const CATALOG_BASE_URL = "http://localhost:5288/catalog-bff-controller";

export const catalogService = new CatalogServiceRest(CATALOG_BASE_URL);