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
const create_categoria_usecase_1 = __importDefault(require("../../../domain/usecases/categorias/create.categoria.usecase"));
const read_categoria_usecase_1 = __importDefault(require("../../../domain/usecases/categorias/read.categoria.usecase"));
const update_categoria_usecase_1 = __importDefault(require("../../../domain/usecases/categorias/update.categoria.usecase"));
const delete_categoria_usecase_1 = __importDefault(require("../../../domain/usecases/categorias/delete.categoria.usecase"));
const list_categoria_usecase_1 = __importDefault(require("../../../domain/usecases/categorias/list.categoria.usecase"));
const debug_1 = __importDefault(require("debug"));
const log = (0, debug_1.default)('app:categoria-controller');
class CategoriaController {
    listCategorias(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const categorias = yield list_categoria_usecase_1.default.execute();
            res.status(200).send(categorias);
        });
    }
    getCategoriaById(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoria = yield read_categoria_usecase_1.default.execute({
                idcategoria: Number(req.params.idcategoria),
            });
            res.status(200).send(categoria);
        });
    }
    createCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoria = yield create_categoria_usecase_1.default.execute(req.body);
            res.status(201).send(categoria);
        });
    }
    updateCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const categoria = yield update_categoria_usecase_1.default.execute(req.body);
            res.status(200).send(categoria);
        });
    }
    deleteCategoria(req, res) {
        return __awaiter(this, void 0, void 0, function* () {
            const Categoria = yield delete_categoria_usecase_1.default.execute({
                idcategoria: Number(req.params.idcategoria)
            });
            res.status(204).send();
        });
    }
}
exports.default = new CategoriaController();
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiY2F0ZWdvcmlhLmNvbnRyb2xsZXIuanMiLCJzb3VyY2VSb290IjoiIiwic291cmNlcyI6WyIuLi8uLi8uLi8uLi9zcmMvYWRhcHRlcnMvYXBpcy9jb250cm9sbGVycy9jYXRlZ29yaWEuY29udHJvbGxlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7Ozs7Ozs7Ozs7OztBQUNBLDRIQUFrRztBQUNsRyx3SEFBOEY7QUFDOUYsNEhBQWtHO0FBQ2xHLDRIQUFrRztBQUNsRyx3SEFBOEY7QUFDOUYsa0RBQTBCO0FBRTFCLE1BQU0sR0FBRyxHQUFvQixJQUFBLGVBQUssRUFBQywwQkFBMEIsQ0FBQyxDQUFDO0FBRS9ELE1BQU0sbUJBQW1CO0lBQ2YsY0FBYyxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQzVELE1BQU0sVUFBVSxHQUFHLE1BQU0sZ0NBQW9CLENBQUMsT0FBTyxFQUFFLENBQUM7WUFDeEQsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsVUFBVSxDQUFDLENBQUM7UUFDckMsQ0FBQztLQUFBO0lBRUssZ0JBQWdCLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDOUQsTUFBTSxTQUFTLEdBQUcsTUFBTSxnQ0FBb0IsQ0FBQyxPQUFPLENBQUM7Z0JBQ2pELFdBQVcsRUFBRSxNQUFNLENBQUMsR0FBRyxDQUFDLE1BQU0sQ0FBQyxXQUFXLENBQUM7YUFDOUMsQ0FBQyxDQUFDO1lBQ0gsR0FBRyxDQUFDLE1BQU0sQ0FBQyxHQUFHLENBQUMsQ0FBQyxJQUFJLENBQUMsU0FBUyxDQUFDLENBQUM7UUFDcEMsQ0FBQztLQUFBO0lBRUssZUFBZSxDQUFDLEdBQW9CLEVBQUUsR0FBcUI7O1lBQzdELE1BQU0sU0FBUyxHQUFHLE1BQU0sa0NBQXNCLENBQUMsT0FBTyxDQUFDLEdBQUcsQ0FBQyxJQUFJLENBQUMsQ0FBQztZQUNqRSxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksQ0FBQyxTQUFTLENBQUMsQ0FBQztRQUNwQyxDQUFDO0tBQUE7SUFFSyxlQUFlLENBQUMsR0FBb0IsRUFBRSxHQUFxQjs7WUFDN0QsTUFBTSxTQUFTLEdBQUcsTUFBTSxrQ0FBc0IsQ0FBQyxPQUFPLENBQUMsR0FBRyxDQUFDLElBQUksQ0FBQyxDQUFDO1lBQ2pFLEdBQUcsQ0FBQyxNQUFNLENBQUMsR0FBRyxDQUFDLENBQUMsSUFBSSxDQUFDLFNBQVMsQ0FBQyxDQUFDO1FBQ3BDLENBQUM7S0FBQTtJQUVLLGVBQWUsQ0FBQyxHQUFvQixFQUFFLEdBQXFCOztZQUM3RCxNQUFNLFNBQVMsR0FBRyxNQUFNLGtDQUFzQixDQUFDLE9BQU8sQ0FBQztnQkFDbkQsV0FBVyxFQUFFLE1BQU0sQ0FBQyxHQUFHLENBQUMsTUFBTSxDQUFDLFdBQVcsQ0FBQzthQUM5QyxDQUFDLENBQUM7WUFDSCxHQUFHLENBQUMsTUFBTSxDQUFDLEdBQUcsQ0FBQyxDQUFDLElBQUksRUFBRSxDQUFDO1FBQzNCLENBQUM7S0FBQTtDQUNKO0FBRUQsa0JBQWUsSUFBSSxtQkFBbUIsRUFBRSxDQUFDIn0=