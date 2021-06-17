import express, { Request, Response } from "express";
import jwt from "jsonwebtoken";
import bcrypt from "bcryptjs";
import config from "../config";
import { check, validationResult } from "express-validator";

const router = express.Router();

import User from "../model/User";

/**
 *  @route Post api/users
 *  @desc Register User
 *  @access Public
 */
router.post(
  "/users/signup",
  [
    check("name", "Name is required").not().isEmpty(),
    check("email", "Please include a valid email").isEmail(),
    check(
      "password",
      "Password is required").not().isEmpty(),
    check("id","ID is required").not().isEmpty(),
    check("phone","Phone is required").not().isEmpty(),
    check("address","Address is required").not().isEmpty(),
    check("birthday","Birthday is required").not().isEmpty()
  ],
  async (req: Request, res: Response) => {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      return res.status(400).json({ errors: errors.array() });
    }

    const { name, email, password, id, phone, address, birthday, gender } = req.body;

    try {
      // See if  user exists
      let user = await User.findOne({ id });

      if (user) {
        res.status(400).json({
          errors: [{ msg: "User already exists" }],
        });
      }

      user = new User({
        id,
        password,
        name,
        phone,
        address,
        birthday,
        gender
      });
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
          res.json({ token });
        }
      );
    } catch (err) {
      console.error(err.message);
      res.status(500).send("Server Error");
    }
  }
);

module.exports = router;
