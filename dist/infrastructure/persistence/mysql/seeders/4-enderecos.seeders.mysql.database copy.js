"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.default = {
    up: (queryInterface) => {
        return queryInterface.bulkInsert('enderecos', [
            {
                "idpessoa": 1,
                "cep": "35535-000",
                "logradouro": "",
                "complemento": "",
                "bairro": "Bom Jardim das Pedras",
                "cidade": "Carmópolis de Minas",
                "estado": "MG"
            },
            {
                "idpessoa": 2,
                "cep": "35530-000",
                "logradouro": "",
                "complemento": "",
                "bairro": "",
                "cidade": "Cláudio",
                "estado": "MG"
            },
            {
                "idpessoa": 3,
                "cep": "32676-265",
                "logradouro": "Avenida Juiz Marco Túlio Isaac",
                "complemento": "de 9101 a 10199 - lado ímpar",
                "bairro": "Laranjeiras",
                "cidade": "Betim",
                "estado": "MG"
            },
            {
                "idpessoa": 4,
                "cep": "01001-000",
                "logradouro": "Praça da Sé",
                "complemento": "lado ímpar",
                "bairro": "Sé",
                "cidade": "São Paulo",
                "estado": "SP"
            }
        ]);
    },
    down: (queryInterface) => {
        return queryInterface.bulkDelete('enderecos', {});
    }
};
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiNC1lbmRlcmVjb3Muc2VlZGVycy5teXNxbC5kYXRhYmFzZSBjb3B5LmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vLi4vLi4vc3JjL2luZnJhc3RydWN0dXJlL3BlcnNpc3RlbmNlL215c3FsL3NlZWRlcnMvNC1lbmRlcmVjb3Muc2VlZGVycy5teXNxbC5kYXRhYmFzZSBjb3B5LnRzIl0sIm5hbWVzIjpbXSwibWFwcGluZ3MiOiI7O0FBRUEsa0JBQWU7SUFDWCxFQUFFLEVBQUUsQ0FBQyxjQUF3QyxFQUFFLEVBQUU7UUFDN0MsT0FBTyxjQUFjLENBQUMsVUFBVSxDQUFDLFdBQVcsRUFBRTtZQUMxQztnQkFDSSxVQUFVLEVBQUUsQ0FBQztnQkFDYixLQUFLLEVBQUUsV0FBVztnQkFDbEIsWUFBWSxFQUFFLEVBQUU7Z0JBQ2hCLGFBQWEsRUFBRSxFQUFFO2dCQUNqQixRQUFRLEVBQUUsdUJBQXVCO2dCQUNqQyxRQUFRLEVBQUUscUJBQXFCO2dCQUMvQixRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNEO2dCQUNJLFVBQVUsRUFBRSxDQUFDO2dCQUNiLEtBQUssRUFBRSxXQUFXO2dCQUNsQixZQUFZLEVBQUUsRUFBRTtnQkFDaEIsYUFBYSxFQUFFLEVBQUU7Z0JBQ2pCLFFBQVEsRUFBRSxFQUFFO2dCQUNaLFFBQVEsRUFBRSxTQUFTO2dCQUNuQixRQUFRLEVBQUUsSUFBSTthQUNqQjtZQUNEO2dCQUNJLFVBQVUsRUFBRSxDQUFDO2dCQUNiLEtBQUssRUFBRSxXQUFXO2dCQUNsQixZQUFZLEVBQUUsZ0NBQWdDO2dCQUM5QyxhQUFhLEVBQUUsOEJBQThCO2dCQUM3QyxRQUFRLEVBQUUsYUFBYTtnQkFDdkIsUUFBUSxFQUFFLE9BQU87Z0JBQ2pCLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1lBQ0Q7Z0JBQ0ksVUFBVSxFQUFFLENBQUM7Z0JBQ2IsS0FBSyxFQUFFLFdBQVc7Z0JBQ2xCLFlBQVksRUFBRSxhQUFhO2dCQUMzQixhQUFhLEVBQUUsWUFBWTtnQkFDM0IsUUFBUSxFQUFFLElBQUk7Z0JBQ2QsUUFBUSxFQUFFLFdBQVc7Z0JBQ3JCLFFBQVEsRUFBRSxJQUFJO2FBQ2pCO1NBQ0osQ0FBQyxDQUFBO0lBQ04sQ0FBQztJQUNELElBQUksRUFBRSxDQUFDLGNBQXdDLEVBQUUsRUFBRTtRQUMvQyxPQUFPLGNBQWMsQ0FBQyxVQUFVLENBQUMsV0FBVyxFQUFFLEVBQUUsQ0FBQyxDQUFDO0lBQ3RELENBQUM7Q0FDSixDQUFDIn0=