"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const database_1 = require("./database");
console.log('aplicação iniciada');
console.table(database_1.products);
console.table(database_1.users);
console.log((0, database_1.searchProductByName)('mouse'));
//# sourceMappingURL=index.js.map