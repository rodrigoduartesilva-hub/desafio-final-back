"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mysql_database_1 = require("../../infrastructure/persistence/mysql/mysql.database");
const categorias_models_mysql_database_1 = __importDefault(require("../../infrastructure/persistence/mysql/models/categorias.models.mysql.database"));
class CategoriaRepository {
    constructor(_database, _modelCategorias) {
        this._database = _database;
        this._modelCategorias = _modelCategorias;
        this._type = 'ICategoria';
    }
    readById(resourceId) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoria = yield this._database.read(this._modelCategorias, resourceId);
            return categoria;
        });
    }
    create(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoria = yield this._database.create(this._modelCategorias, resource);
            categoria.idcategoria = categoria.null;
            return categoria;
        });
    }
    deleteById(resourceId) {
        return __awaiter(this, void 0, void 0, function* () {
            yield this._database.delete(this._modelCategorias, { idcategoria: resourceId });
        });
    }
    list() {
        return __awaiter(this, void 0, void 0, function* () {
            return this._database.list(this._modelCategorias);
        });
    }
    updateById(resource) {
        return __awaiter(this, void 0, void 0, function* () {
            let categoriaModel = yield this._database.read(this._modelCategorias, resource.idcategoria);
            yield this._database.update(categoriaModel, resource);
            return resource;
        });
    }
}
exports.default = new CategoriaRepository(mysql_database_1.MysqlDatabase.getInstance(), categorias_models_mysql_database_1.default);
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcmlhLnJlcG9zaXRvcnkuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi9zcmMvYWRhcHRlcnMvcmVwb3NpdG9yaWVzL2NhdGVnb3JpYS5yZXBvc2l0b3J5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7Ozs7Ozs7Ozs7O0FBRUEsMEZBQXNGO0FBR3RGLHNKQUEySDtBQUUzSCxNQUFNLG1CQUFtQjtJQUdyQixZQUNZLFNBQXlCLEVBQ3pCLGdCQUFnRTtRQURoRSxjQUFTLEdBQVQsU0FBUyxDQUFnQjtRQUN6QixxQkFBZ0IsR0FBaEIsZ0JBQWdCLENBQWdEO1FBSnBFLFVBQUssR0FBVyxZQUFZLENBQUM7SUFNckMsQ0FBQztJQUVLLFFBQVEsQ0FBQyxVQUFrQjs7WUFDN0IsTUFBTSxTQUFTLEdBQUcsTUFBTSxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLEVBQUUsVUFBVSxDQUFDLENBQUM7WUFDL0UsT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztLQUFBO0lBRUssTUFBTSxDQUFDLFFBQTBCOztZQUNuQyxNQUFNLFNBQVMsR0FBRyxNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUMvRSxTQUFTLENBQUMsV0FBVyxHQUFHLFNBQVMsQ0FBQyxJQUFJLENBQUM7WUFDdkMsT0FBTyxTQUFTLENBQUM7UUFDckIsQ0FBQztLQUFBO0lBRUssVUFBVSxDQUFDLFVBQWtCOztZQUMvQixNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLElBQUksQ0FBQyxnQkFBZ0IsRUFBRSxFQUFDLFdBQVcsRUFBRSxVQUFVLEVBQUMsQ0FBQyxDQUFDO1FBQ2xGLENBQUM7S0FBQTtJQUVLLElBQUk7O1lBQ04sT0FBTyxJQUFJLENBQUMsU0FBUyxDQUFDLElBQUksQ0FBQyxJQUFJLENBQUMsZ0JBQWdCLENBQUMsQ0FBQztRQUN0RCxDQUFDO0tBQUE7SUFFSyxVQUFVLENBQUMsUUFBMEI7O1lBQ3ZDLElBQUksY0FBYyxHQUFHLE1BQU0sSUFBSSxDQUFDLFNBQVMsQ0FBQyxJQUFJLENBQUMsSUFBSSxDQUFDLGdCQUFnQixFQUFFLFFBQVEsQ0FBQyxXQUFXLENBQUMsQ0FBQztZQUM1RixNQUFNLElBQUksQ0FBQyxTQUFTLENBQUMsTUFBTSxDQUFDLGNBQWMsRUFBRSxRQUFRLENBQUMsQ0FBQztZQUN0RCxPQUFPLFFBQVEsQ0FBQztRQUNwQixDQUFDO0tBQUE7Q0FDSjtBQUVELGtCQUFlLElBQUksbUJBQW1CLENBQ2xDLDhCQUFhLENBQUMsV0FBVyxFQUFFLEVBQzNCLDBDQUE2QixDQUNoQyxDQUFDIn0=