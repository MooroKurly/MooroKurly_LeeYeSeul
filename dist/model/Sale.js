"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const SaleSchema = new mongoose_1.default.Schema({
    product: {
        type: mongoose_1.default.SchemaTypes.ObjectId,
        ref: "Product"
    },
    discountRate: {
        type: Number,
        required: true
    },
    saleIndex: {
        type: Number,
        requied: true
    }
});
exports.default = mongoose_1.default.model("Sale", SaleSchema);
//# sourceMappingURL=Sale.js.map