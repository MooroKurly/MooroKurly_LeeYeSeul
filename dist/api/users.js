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
const express_1 = __importDefault(require("express"));
const jsonwebtoken_1 = __importDefault(require("jsonwebtoken"));
const bcryptjs_1 = __importDefault(require("bcryptjs"));
const config_1 = __importDefault(require("../config"));
const express_validator_1 = require("express-validator");
const router = express_1.default.Router();
const User_1 = __importDefault(require("../model/User"));
/**
 *  @route Post users/signup
 *  @desc Register User
 *  @access Public
 */
router.post("/signup", [
    express_validator_1.check("name").exists().bail(),
    express_validator_1.check("id").exists().bail(),
    express_validator_1.check("password").exists().bail(),
    express_validator_1.check("email", "Invalid email").exists().bail(),
    express_validator_1.check("phone", "Phone is required").exists().bail(),
    express_validator_1.check("address", "Address is required").exists().bail()
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({
            msg: "필요한 값이 없습니다."
        });
    }
    const { name, email, password, id, phone, address, birthday, gender } = req.body;
    let userFields = {
        id,
        password,
        name,
        phone,
        address
    };
    if (gender)
        userFields.gender = gender;
    if (birthday)
        userFields.birthday = birthday;
    try {
        // See if  user exists
        let user = yield User_1.default.findOne({ id });
        if (user) {
            res.status(400).json({
                msg: "이미 가입된 아이디가 있습니다."
            });
        }
        user = new User_1.default(userFields);
        //Encrypt password
        const salt = yield bcryptjs_1.default.genSalt(10);
        user.password = yield bcryptjs_1.default.hash(password, salt);
        yield user.save();
        // Return jsonwebtoken
        const payload = {
            user: {
                id: user.id,
            },
        };
        jsonwebtoken_1.default.sign(payload, config_1.default.jwtSecret, { expiresIn: 36000 }, (err, token) => {
            if (err)
                throw err;
            res.json({ msg: "회원가입 성공", token });
        });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send({ msg: "서버 내부 오류" });
    }
}));
/**
 *  @route Post users/signin
 *  @desc Authenticate user & get token(로그인)
 *  @access Public
 */
router.post("/signin", [
    express_validator_1.check("id", "ID is required").exists(),
    express_validator_1.check("password", "Password is required").exists(),
], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        return res.status(400).json({ errors: errors.array() });
    }
    const { id, password } = req.body;
    try {
        let user = yield User_1.default.findOne({ id });
        if (!user) {
            res.status(400).json({
                msg: "존재하지 않는 사용자입니다."
            });
        }
        // Encrpyt password
        const isMatch = yield bcryptjs_1.default.compare(password, user.password);
        if (!isMatch) {
            res.status(400).json({
                msg: "아이디와 비밀번호가 일치하지 않습니다."
            });
        }
        yield user.save();
        // Return jsonwebtoken
        const payload = {
            user: {
                id: user.id,
            },
        };
        jsonwebtoken_1.default.sign(payload, config_1.default.jwtSecret, { expiresIn: 36000 }, (err, token) => {
            if (err)
                throw err;
            res.json({ msg: "로그인 성공", token });
        });
    }
    catch (err) {
        console.error(err.message);
        res.status(500).send({ msg: "서버 내부 오류" });
    }
}));
/**
 *  @route Post users/id-check
 *  @desc check user id
 *  @access Public
 */
router.post("/id-check", [express_validator_1.check("id").exists()], (req, res) => __awaiter(void 0, void 0, void 0, function* () {
    const errors = express_validator_1.validationResult(req);
    if (!errors.isEmpty()) {
        res.status(400).send({ msg: "필요한 값이 없습니다." });
    }
    const { id } = req.body;
    try {
        // See if  user exists
        let user = yield User_1.default.findOne({ id });
        if (user) {
            res.status(200).json({
                msg: "이미 가입된 아이디가 있습니다.",
                isValid: false
            });
        }
        res.status(200).json({ msg: "사용할 수 있는 아이디입니다.", isValid: true });
    }
    catch (err) {
        console.log(err.message);
        res.status(500).send({ msg: "서버 내부 오류" });
    }
}));
module.exports = router;
//# sourceMappingURL=users.js.map