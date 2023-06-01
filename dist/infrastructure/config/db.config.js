"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
require("dotenv/config");
const databaseConfig = {
    database: process.env.DB_NAME,
    username: process.env.DB_USER,
    password: process.env.DB_PASS,
    host: process.env.DB_HOST,
    port: Number(process.env.DB_PORT),
    dialect: 'mysql'
};
exports.default = databaseConfig;
module.exports = databaseConfig;
//# sourceMappingURL=data:application/json;base64,eyJ2ZXJzaW9uIjozLCJmaWxlIjoiZGIuY29uZmlnLmpzIiwic291cmNlUm9vdCI6IiIsInNvdXJjZXMiOlsiLi4vLi4vLi4vc3JjL2luZnJhc3RydWN0dXJlL2NvbmZpZy9kYi5jb25maWcudHMiXSwibmFtZXMiOltdLCJtYXBwaW5ncyI6Ijs7QUFBQSx5QkFBdUI7QUFFdkIsTUFBTSxjQUFjLEdBQUc7SUFDbkIsUUFBUSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTztJQUM3QixRQUFRLEVBQUUsT0FBTyxDQUFDLEdBQUcsQ0FBQyxPQUFPO0lBQzdCLFFBQVEsRUFBRSxPQUFPLENBQUMsR0FBRyxDQUFDLE9BQU87SUFDN0IsSUFBSSxFQUFFLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTztJQUN6QixJQUFJLEVBQUUsTUFBTSxDQUFDLE9BQU8sQ0FBQyxHQUFHLENBQUMsT0FBTyxDQUFDO0lBQ2pDLE9BQU8sRUFBRSxPQUFPO0NBQ25CLENBQUM7QUFFRixrQkFBZSxjQUFjLENBQUM7QUFFOUIsTUFBTSxDQUFDLE9BQU8sR0FBRyxjQUFjLENBQUMifQ==