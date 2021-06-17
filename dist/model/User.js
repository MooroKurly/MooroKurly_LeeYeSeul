"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = __importDefault(require("mongoose"));
const UserSchema = new mongoose_1.default.Schema({
    id: {
        type: String,
        required: true,
        unique: true,
    },
    password: {
        type: String,
        required: true
    },
    name: {
        type: String,
        required: true,
    },
    phone: {
        type: String,
        required: true
    },
    address: {
        type: String,
        required: true,
    },
    birthday: {
        type: Date,
        required: false
    },
    gender: {
        type: String,
        required: false
    },
    date: {
        type: Date,
        default: Date.now
    }
});
exports.default = mongoose_1.default.model("User", UserSchema);
//# sourceMappingURL=User.js.map