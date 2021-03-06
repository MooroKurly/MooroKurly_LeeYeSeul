import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../config";
import { check, validationResult } from "express-validator";
import { IUserInputDTO } from "../interface/IUser";
const router = express.Router();

import auth from "../middleware/auth";
import User from "../model/User";

/**
 *  @route Post users/signup
 *  @desc Register User
 *  @access Public
 */
router.post(
  "/signup",
  [
    check("name").exists().bail(),
    check("id").exists().bail(),
    check("password").exists().bail(),
    check("email","Invalid email").exists().bail(),
    check("phone","Phone is required").exists().bail(),
    check("address","Address is required").exists().bail()
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
    
      return res.status(400).json({ 
          msg: "필요한 값이 없습니다." 
        });
    }

    const { name, email, password, id, phone, address, birthday, gender } = req.body;
    let userFields: IUserInputDTO = {
        id,
        password,
        name,
        phone,
        address
      };
    if (gender) userFields.gender = gender;
    if (birthday) userFields.birthday = birthday;
    try {
      // See if  user exists
      let user = await User.findOne({ id });

      if (user) {
        res.status(400).json({
            msg: "이미 가입된 아이디가 있습니다." 
        });
      }
      user = new User(userFields);
      
      //Encrypt password
      const salt = await bcrypt.genSalt(10);
      user.password = await bcrypt.hash(password, salt);

      await user.save();

      // Return jsonwebtoken
      const payload = {
        user: {
          id: user.id,
        },
      };
      jwt.sign(
        payload,
        config.jwtSecret,
        { expiresIn: 36000 },
        (err, token) => {
          if (err) throw err;
          res.json({ msg:"회원가입 성공", token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send({msg:"서버 내부 오류"});
    }
  }
);

/**
 *  @route Post users/signin
 *  @desc Authenticate user & get token(로그인)
 *  @access Public
 */
 router.post(
    "/signin",
    [
      check("id").exists(),
      check("password").exists()
    ],
    async (req: Request, res: Response) => {
      const errors = validationResult(req);
      if (!errors.isEmpty()) {
        return res.status(400).json({ 
            msg: "필요한 값이 없습니다." 
          });
      }
      const { id, password } = req.body;
  
      try {
        let user = await User.findOne({ id });
  
        if (!user) {
          res.status(400).json({
            msg: "존재하지 않는 사용자입니다."
          });
        }
        // Encrpyt password
        const isMatch = await bcrypt.compare(password, user.password);
        if (!isMatch) {
          res.status(400).json({
            msg: "아이디와 비밀번호가 일치하지 않습니다."
          });
        }
        await user.save();
  
        // Return jsonwebtoken
        const payload = {
          user: {
            id: user.id,
          },
        };
        jwt.sign(
          payload,
          config.jwtSecret,
          { expiresIn: 36000 },
          (err, token) => {
            if (err) throw err;
            res.json({ msg:"로그인 성공",token });
          }
        );
      } catch (err) {
        console.error(err.message);
        res.status(500).send({msg:"서버 내부 오류"});
      }
    }
  );
  
/**
 *  @route Post users/id-check
 *  @desc check user id
 *  @access Public
 */

router.post("/id-check",[check("id").exists()],
async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()){
        res.status(400).send({msg:"필요한 값이 없습니다."});
    }
    const {id} = req.body;
    try{
        // See if  user exists
      let user = await User.findOne({ id });

      if (user) {
        res.status(200).json({
            msg: "이미 가입된 아이디가 있습니다.",
            isValid:false
        });
      }
      res.status(200).json({msg:"사용할 수 있는 아이디입니다.",isValid:true})
    }
    catch(err){
        console.log(err.message);
        res.status(500).send({msg:"서버 내부 오류"});
    }
})




module.exports = router;
