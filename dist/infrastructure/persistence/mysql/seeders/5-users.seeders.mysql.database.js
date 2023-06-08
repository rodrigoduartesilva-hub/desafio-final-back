"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('users', [
            {
                "idpessoa": 1,
                "id": 1,
                "logradouro": "",
                "complemento": "",
                "bairro": "Bom Jardim das Pedras",
                "cidade": "Carmópolis de Minas",
                "estado": "MG"
            }
        ]);
    },
    down: (queryInterface) => {
        return queryInterface.bulkDelete('users', {});
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNS11c2Vycy5zZWVkZXJzLm15c3FsLmRhdGFiYXNlLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2luZnJhc3RydWN0dXJlL3BlcnNpc3RlbmNlL215c3FsL3NlZWRlcnMvNS11c2Vycy5zZWVkZXJzLm15c3FsLmRhdGFiYXNlLnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsa0JBQWU7SUFDWCxFQUFFLEVBQUUsQ0FBQyxjQUF3QyxFQUFFLEVBQUU7UUFDN0MsT0FBTyxjQUFjLENBQUMsVUFBVSxDQUFDLE9BQU8sRUFBRTtZQUN0QztnQkFDSSxVQUFVLEVBQUUsQ0FBQztnQkFDYixJQUFJLEVBQUUsQ0FBQztnQkFDUCxZQUFZLEVBQUUsRUFBRTtnQkFDaEIsYUFBYSxFQUFFLEVBQUU7Z0JBQ2pCLFFBQVEsRUFBRSx1QkFBdUI7Z0JBQ2pDLFFBQVEsRUFBRSxxQkFBcUI7Z0JBQy9CLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1NBQ0osQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUNELElBQUksRUFBRSxDQUFDLGNBQXdDLEVBQUUsRUFBRTtRQUMvQyxPQUFPLGNBQWMsQ0FBQyxVQUFVLENBQUMsT0FBTyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ2xELENBQUM7Q0FDSixDQUFDIn0=