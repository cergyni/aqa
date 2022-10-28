import { CATALOG, PAGES } from "../types/types";
import { CatalogPage } from "./catalogPage";
import { GpuPage } from "./gpuPage";
import { LaptopPage } from "./laptopPage";


export class PageFactory {
    static getPage(pageName: PAGES){
        switch (pageName) {
            case PAGES.CATALOG:
                return new CatalogPage()
            case PAGES.GPU:
                return new GpuPage()    
            case PAGES.LAPTOP:
                return new LaptopPage()    
            default:
                break;
        }
    }
}