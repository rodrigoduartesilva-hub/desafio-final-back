"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.CategoriaRoutes = void 0;
const categoria_controller_1 = __importDefault(require("../controllers/categoria.controller"));
const common_routes_1 = require("./common.routes");
class CategoriaRoutes extends common_routes_1.CommonRoutesConfig {
    constructor(app) {
        super(app, 'CategoriaRoutes');
    }
    configureRoutes() {
        this.app.route(`/categorias`)
            .get(categoria_controller_1.default.listCategorias)
            .post(categoria_controller_1.default.createCategoria);
        this.app.route(`/categorias/:idcategoria`)
            .get(categoria_controller_1.default.getCategoriaById)
            .put(categoria_controller_1.default.updateCategoria)
            .delete(categoria_controller_1.default.deleteCategoria);
        return this.app;
    }
}
exports.CategoriaRoutes = CategoriaRoutes;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcmlhLnJvdXRlcy5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uL3NyYy9hZGFwdGVycy9hcGlzL3JvdXRlcy9jYXRlZ29yaWEucm91dGVzLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7Ozs7OztBQUFBLCtGQUFzRTtBQUN0RSxtREFBcUQ7QUFHckQsTUFBYSxlQUFnQixTQUFRLGtDQUFrQjtJQUNuRCxZQUFZLEdBQXdCO1FBQ2hDLEtBQUssQ0FBQyxHQUFHLEVBQUUsaUJBQWlCLENBQUMsQ0FBQztJQUNsQyxDQUFDO0lBRUQsZUFBZTtRQUNYLElBQUksQ0FBQyxHQUFHLENBQUMsS0FBSyxDQUFDLGFBQWEsQ0FBQzthQUN4QixHQUFHLENBQUMsOEJBQW1CLENBQUMsY0FBYyxDQUFDO2FBQ3ZDLElBQUksQ0FBQyw4QkFBbUIsQ0FBQyxlQUFlLENBQUMsQ0FBQTtRQUU5QyxJQUFJLENBQUMsR0FBRyxDQUFDLEtBQUssQ0FBQywwQkFBMEIsQ0FBQzthQUNyQyxHQUFHLENBQUMsOEJBQW1CLENBQUMsZ0JBQWdCLENBQUM7YUFDekMsR0FBRyxDQUFDLDhCQUFtQixDQUFDLGVBQWUsQ0FBQzthQUN4QyxNQUFNLENBQUMsOEJBQW1CLENBQUMsZUFBZSxDQUFDLENBQUE7UUFFaEQsT0FBTyxJQUFJLENBQUMsR0FBRyxDQUFDO0lBQ3BCLENBQUM7Q0FDSjtBQWpCRCwwQ0FpQkMifQ==