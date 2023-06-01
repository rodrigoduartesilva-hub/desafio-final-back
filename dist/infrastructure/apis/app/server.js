"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express")); //instancia o servidor
const app = (0, express_1.default)(); //executa o express e cria um servidor para essa aplicação
app.use(express_1.default.json()); //usa a funcionalidade JSON do express, que faz o node.js entender JSON
app.get("/teste", (request, response) => {
    response.json({ message: "Mensagem teste" }); //resposta da requisição "/teste"
});
app.listen(3000, () => {
    console.log("Servidor iniciano na porta 3000");
});
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoic2VydmVyLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vc3JjL2luZnJhc3RydWN0dXJlL2FwaXMvYXBwL3NlcnZlci50cyJdLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiOzs7OztBQUFBLHNEQUE4QixDQUFDLHNCQUFzQjtBQUVyRCxNQUFNLEdBQUcsR0FBRyxJQUFBLGlCQUFPLEdBQUUsQ0FBQyxDQUFDLDBEQUEwRDtBQUVqRixHQUFHLENBQUMsR0FBRyxDQUFDLGlCQUFPLENBQUMsSUFBSSxFQUFFLENBQUMsQ0FBQyxDQUFDLHVFQUF1RTtBQUVoRyxHQUFHLENBQUMsR0FBRyxDQUFDLFFBQVEsRUFBRSxDQUFDLE9BQU8sRUFBRSxRQUFRLEVBQUUsRUFBRTtJQUNwQyxRQUFRLENBQUMsSUFBSSxDQUFDLEVBQUUsT0FBTyxFQUFFLGdCQUFnQixFQUFFLENBQUMsQ0FBQyxDQUFDLGlDQUFpQztBQUNuRixDQUFDLENBQUMsQ0FBQztBQUVILEdBQUcsQ0FBQyxNQUFNLENBQUMsSUFBSSxFQUFFLEdBQUcsRUFBRTtJQUNsQixPQUFPLENBQUMsR0FBRyxDQUFDLGlDQUFpQyxDQUFDLENBQUM7QUFDbkQsQ0FBQyxDQUFDLENBQUMifQ==