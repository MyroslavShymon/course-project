const { Router } = require("express");
const router = Router();
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const passport = require("passport");
const { validationResult } = require("express-validator");
const User = require("../../models/User");
const Story = require("../../models/Story");
const config = require("config");

/**
 * @route POST api/auth/register
 * @desc Register the User
 * @access Public
 */
router.post("/register", async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        msg: "Bad data",
      });
    }

    const {
      _username,
      _name,
      _surname,
      _email,
      _phoneNumber,
      _password,
      _confirmPassword,
    } = req.body;
    if (_password !== _confirmPassword) {
      return res.status(400).json({
        msg: "Password do not match.",
      });
    }
    // Check for the unique Username
    const candidateUniqueUsername = await User.findOne({
      username: _username,
    });
    if (candidateUniqueUsername) {
      return res.status(400).json({
        msg: "Username is already taken.",
      });
    }
    // Check for the Unique Email
    const candidateUniqueEmail = await User.findOne({
      email: _email,
    });
    if (candidateUniqueEmail) {
      return res.status(400).json({
        msg: "Email is already registred. Did you forgot your email?",
      });
    } // Check for the Unique PhoneNumber
    const candidateUniquePhoneNumber = await User.findOne({
      phoneNumber: _phoneNumber,
    });
    if (candidateUniquePhoneNumber) {
      return res.status(400).json({
        msg: "Phone number is already taken. Did you forgot your Phone number?",
      });
    }
    // The data is valid and new we can register the user
    // Hash the password
    const hashedPassword = await bcrypt.hash(_password, 12);
    const user = new User({
      username: _username,
      name: _name,
      surname: _surname,
      email: _email,
      phoneNumber: _phoneNumber,
      password: hashedPassword,
    });
    await user.save();

    res.status(201).json({ msg: "User is created!!!", success: true });
  } catch (error) {
    res.status(500).json({ msg: "Something went wrong" });
    console.log(error);
  }
});

/**
 * @route POST api/auth/login
 * @desc Login the User
 * @access Public
 */

router.post("/login", async (req, res) => {
  try {
    const errors = validationResult(req);

    if (!errors.isEmpty()) {
      return res.status(400).json({
        errors: errors.array(),
        msg: "Bad data",
      });
    }

    const { _email, _password } = req.body;
    const user = await User.findOne({ email: _email });

    if (!user) {
      return res.status(400).json({ msg: "Email is not found" });
    }

    const isMatch = await bcrypt.compare(_password, user.password);

    if (!isMatch) {
      return res.status(400).json({ msg: "Incorrect password" });
    }
    const token = jwt.sign(
      {
        _id: user._id,
        username: user.username,
        name: user.name,
        surname: user.surname,
        email: user.email,
        phoneNumber: user.phoneNumber,
      },
      config.get("jwtSecret"),
      {
        expiresIn: "1h",
      },
      (err, token) => {
        res.status(200).json({
          success: true,
          token: `Bearer ${token}`,
          user: user,
          msg: "Hurry! You are now logged in.",
        });
      }
    );
  } catch (e) {
    res.status(500).json({ msg: "Something went wrong" });
  }
});

/**
 * @route POST api/users/profle
 * @desc Return the User's Data
 * @access Private
 */
router.get(
  "/",
  passport.authenticate("jwt", {
    session: false,
  }),
  (req, res) => {
    return res.json({
      user: req.user,
    });
  }
);
// /**
//  * @route POST api/users/profile
//  * @desc Return the User's Data
//  * @access Public
//  */
// router.post("/profile", async (req, res) => {
//   const { username, title } = req.body;
//   const user = await User.findOne({ username });

//   if (!user) {
//     return res.status(400).json({ msg: "Username is not found" });
//   }
//   const story = new Story({
//     author: user._id,
//     title,
//   });
//   await story.save();
//   const stories = await Story.find({ author: user._id });
//   res.status(201).json({
//     msg: "story is created!!!",
//     success: true,
//     story: story,
//     stories: stories,
//   });
// });

module.exports = router;
