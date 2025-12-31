const userValue = require("../db/userSchema");
const jwt = require("jsonwebtoken");
const bcrypt = require('bcrypt');
const saltRounds = 10;


//  const signUp = async (req, res) => {
//    console.log("REQ BODY:", req.body); 
//   try {
//     const { name, email, password } = req.body;
//     console.log(req.body);

//     if (!name || !email || !password) {
//       return res.status(400).json({ message: "All fields are required" });
//     }

//     const existing = await userValue.findOne({ email });
//     if (existing) {
//       return res.status(400).json({ message: "Email already registered" });
//     }

  
//     const hashedPassword = await bcrypt.hash(password, 10);

//     const user = await userValue.create({
//       name,
//       email,
//       password: hashedPassword,
//     });

//     return res.status(201).json({
//       message: "User registered successfully",
//       user: {
//         id: user._id,
//         name: user.name,
//         email: user.email,
//       },
//     });
//   } catch (err) {
//     return res
//       .status(400)
//       .json({ message: "Server error", error: err.message });
//   }
// };

const signUp = async (req, res) => {
  console.log("REQ BODY:", req.body);

  try {
    const { name, email, password } = req.body;

    if (!name || !email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

    const existing = await userValue.findOne({ email });
    if (existing) {
      return res.status(400).json({ message: "Email already registered" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const user = await userValue.create({
      name,
      email,
      password: hashedPassword,
    });

    return res.status(201).json({
      message: "User registered successfully",
      user: {
        id: user._id,
        name: user.name,
        email: user.email,
      },
    });

  } catch (err) {
    console.error("SIGNUP ERROR:", err);
    return res.status(500).json({
      message: "Server error",
      error: err.message
    });
  }
};

async function login(req, res) {

    try {

        const { email, password } = req.body;

        const user = await userValue.findOne({ email })

        if (!user) {

            return res.send({
                status: 404,
                message: "User not found! Please try again anothor email"
            })
        }

        bcrypt.compare(password, user.password, function (err, result) {

            if (err) {

                console.log(err);

            }

            if (result) {

                let token = jwt.sign(

                    {
                        "Name": user.fullName,
                        email: user.email,
                        password: user.password
                    },
                    process.env.JWTSECRETKEY,
                    { expiresIn: "1d" }

                );

                res.cookie("jwtToken", token, {
                    httpOnly: true,
                    maxAge: 24 * 60 * 60 * 1000, // 1 day
                    sameSite: "Lax"
                });

                console.log(token);


                return res.send({

                    token,
                    result,
                    status: 200,
                    message: `🎉 Thank you, ${user.name}! Your details have been verify successfully.`,
                });

            }
            else {

                console.log("Your password invalid! Please try anothor password");

                return res.send({

                    status: 401,
                    message: "Your password invalid! Please try anothor password"
                })
            }

        });


    }
    catch (err) {

        console.log("SIGNUP ERROR:", err);

        return res.send({

            status: 500,
            message: "Sorry! Server is not responding"
        })
    }
}

async function home(req, res) {

    const { user } = req;
    console.log(user, "this is line 139");

    try {

        return res.send({

            status: 200,
            message: `Welcome ${user.fullName}`,
        })

    }
    catch (err) {

        console.log("SIGNUP ERROR:", err);

        return res.send({

            status: 500,
            message: "Sorry! Server is not responding"
        })
    }
}

module.exports = { signUp,  login, home }
