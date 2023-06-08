"use strict";
// import { ClientEntity } from "../../../../domain/entities/clients/client.entity";
// import { IPessoaEntity } from "../../../../domain/entities/clients/pessoa.entity";
// import { IPessoaFisicaEntity } from "../../../../domain/entities/clients/pessoafisica.entity";
// import { IPessoaJuridicaEntity } from "../../../../domain/entities/clients/pessoajuridica.entity";
// export default function (pessoa: any): ClientEntity | undefined {
//     if(!pessoa)
//         return;
//     let client: IPessoaEntity = {
//         indexId: pessoa.indexId,
//         cep: pessoa.cep,
//         limiteCredito: pessoa.limiteCredito,
//         observacoes: pessoa.observacoes
//     };
//     if(pessoa.endereco){
//         client.endereco = {
//             cep: pessoa.endereco.cep,
//             logradouro: pessoa.endereco.logradouro,
//             complemento: pessoa.endereco.complemento,
//             bairro: pessoa.endereco.bairro,
//             cidade: pessoa.endereco.cidade,
//             estado: pessoa.endereco.estado
//         }
//     }
//     if(pessoa.pessoaFisica){
//         (client as IPessoaFisicaEntity).nome = pessoa.pessoaFisica.nome;
//         (client as IPessoaFisicaEntity).cpf = pessoa.pessoaFisica.cpf;
//     } else if(pessoa.pessoaJuridica) {
//         (client as IPessoaJuridicaEntity).razaoSocial = pessoa.pessoaJuridica.razaoSocial;
//         (client as IPessoaJuridicaEntity).cnpj = pessoa.pessoaJuridica.cnpj;
//     } else {
//         return;
//     }
//     return (client as ClientEntity);
// }
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoibW9kZWxzVG9FbnRpdGllcy5teXNxbC5kYXRhYmFzZS5qcyIsInNvdXJjZVJvb3QiOiIiLCJzb3VyY2VzIjpbIi4uLy4uLy4uLy4uLy4uL3NyYy9pbmZyYXN0cnVjdHVyZS9wZXJzaXN0ZW5jZS9teXNxbC9oZWxwZXJzL21vZGVsc1RvRW50aXRpZXMubXlzcWwuZGF0YWJhc2UudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6IjtBQUFBLG9GQUFvRjtBQUNwRixxRkFBcUY7QUFDckYsaUdBQWlHO0FBQ2pHLHFHQUFxRztBQUVyRyxvRUFBb0U7QUFDcEUsa0JBQWtCO0FBQ2xCLGtCQUFrQjtBQUVsQixvQ0FBb0M7QUFDcEMsbUNBQW1DO0FBQ25DLDJCQUEyQjtBQUMzQiwrQ0FBK0M7QUFDL0MsMENBQTBDO0FBQzFDLFNBQVM7QUFFVCwyQkFBMkI7QUFDM0IsOEJBQThCO0FBQzlCLHdDQUF3QztBQUN4QyxzREFBc0Q7QUFDdEQsd0RBQXdEO0FBQ3hELDhDQUE4QztBQUM5Qyw4Q0FBOEM7QUFDOUMsNkNBQTZDO0FBQzdDLFlBQVk7QUFDWixRQUFRO0FBRVIsK0JBQStCO0FBQy9CLDJFQUEyRTtBQUMzRSx5RUFBeUU7QUFDekUseUNBQXlDO0FBQ3pDLDZGQUE2RjtBQUM3RiwrRUFBK0U7QUFDL0UsZUFBZTtBQUNmLGtCQUFrQjtBQUNsQixRQUFRO0FBRVIsdUNBQXVDO0FBQ3ZDLElBQUkifQ==