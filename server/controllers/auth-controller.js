const User = require("../models/User");
const Image = require('../models/Image');
const bcrypt = require("bcryptjs");
const jwt = require("jsonwebtoken");
const {uploadToCloudinary} = require('../helpers/cloudinary-helper')

//register controller
const registerUser = async (req, res, next) => {
    try {
        const {name, username, email, password, confirmPassword, role} = req.body;
        
        //check user exist
        const checkExistingUser = await User.findOne({$or: [{username}, {email}]});

        if (checkExistingUser) {
            return res.status(400).json({
                success: false,
                message: 'Username or email already exists !'
            })
        }

        // Validate username length
        if (!username || username.length < 6) {
            return res.status(400).json({
                success: false,
                message: 'Username must be at least 6 characters long!'
            });
        }

        // Validate password length
        if (!password || password.length < 8) {
            return res.status(400).json({
                success: false,
                message: 'Password must be at least 8 characters long!'
            });
        }

        //check password with confirm password
        const checkPassword = password === confirmPassword;

        if (!checkPassword){
            return res.status(400).json({
                success: false,
                message: 'Password and confirm password do not match !'
            })
        }

        //hash passowrd
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(password, salt);

        //create new user
        const newlyCreatedUser = new User({
            name,
            username,
            email,
            password: hashPassword,
            role: role || 'user'
        });

        await newlyCreatedUser.save();

        next();
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error ! Please try again !'
        })
    }
};

//login controller
const loginUser = async (req, res) => {
    try {
        const {email, password} = req.body;
        
        //check user exist
        const user = await User.findOne({email});

        if(!user || !user.isVerified){
            return res.status(400).json({
                success: false,
                message: 'User not found ! Please try again !'
            })
        }

        //check password
        const checkPassword = await bcrypt.compare(password, user.password);

        if(!checkPassword){
            return res.status(400).json({
                success: false,
                message: 'Password is incorrect ! Please try again !'
            })
        }

        //create access token
        const token = jwt.sign({
            id: user._id, 
            username: user.username, 
            role: user.role
        }, process.env.JWT_SECRET, {
            expiresIn: '15m'
        });

        console.log('Generated Token:', token);

        //create refresh token
        const refreshToken = jwt.sign({
            id: user._id,
            username: user.username,
            role: user.role
        }, process.env.JWT_REFRESH_SECRET, {
            expiresIn: '7d'
        });

        //sace refresh token in cookie
        res.cookie("refresh_token", refreshToken, {
            httpOnly: true,
            secure: false,
            sameSite: "lax",
        });

        res.status(200).json({
            success: true,
            message: 'User logged in successfully !',
            token: token,
            role: user.role
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error ! Please try again !'
        })
    }
};

//logout controller
const logoutUser = async (req, res) => {
  try {
    res.clearCookie("refresh_token");
    return res.status(200).json({
      success: true,
      message: "Logout successfully",
    });
  } catch (e) {
    return res.status(404).json({
      message: e,
    });
  }
};

//change password controller
const changePasswordUser = async (req, res) => {
    try {
        const { password, newPassword, confirmPassword} = req.body;
        const userId = req.params.id;

        //check user exist
        const user = await User.findById(userId);

        if(!user){
            return res.status(400).json({
                success: false,
                message: 'User not found ! Please try again !'
            })
        }

        //check password
        const checkPassword = await bcrypt.compare(password, user.password);

        if(!checkPassword){
            return res.status(400).json({
                success: false,
                message: 'Current password is incorrect ! Please try again !'
            })
        }

        //check new password with confirm password
        const checkNewPassword = newPassword === confirmPassword;

        if(!checkNewPassword){
            return res.status(400).json({
                success: false,
                message: 'New password and confirm password do not match ! Please try again !'
            })
        }

        //hash new password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPassword, salt);

        //update password
        await User.findByIdAndUpdate(
            userId, 
            {password: hashPassword},
            {new: true}
        );

        res.status(200).json({
            success: true,
            message: 'Password changed successfully !'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error ! Please try again !'
        })
    }
};

//forgot password controller
const forgotPasswordUser = async (req, res) => {
    try {
        const { newPassword, confirmPassword} = req.body;
        const email = req.query.email;

        console.log(newPassword, confirmPassword)
        //check user exist
        const user = await User.findOne({email: email});

        if(!user){
            return res.status(400).json({
                success: false,
                message: 'User not found ! Please try again !'
            })
        }

        //check new password with confirm password
        const checkNewPassword = newPassword === confirmPassword;

        if(!checkNewPassword){
            return res.status(400).json({
                success: false,
                message: 'New password and confirm password do not match ! Please try again !'
            })
        }

        //hash new password
        const salt = await bcrypt.genSalt(10);
        const hashPassword = await bcrypt.hash(newPassword, salt);

        //update password
        await User.findByIdAndUpdate(
            user._id, 
            {password: hashPassword},
            {new: true}
        );

        res.status(200).json({
            success: true,
            message: 'Password changed successfully !'
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error ! Please try again !'
        })
    }
};

//fetch detail controller
const fetchDetailUser = async (req, res) => {
    try {
        const ussrId = req.params.id;

        //check user exist
        const user = await User.findById(ussrId);

        if(!user){
            return res.status(400).json({
                success: false,
                message: 'User not found ! Please try again !'
            })
        }

        res.status(200).json({
            success: true,
            message: 'User found !',
            data: user
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error ! Please try again !'
        })
    }
}

//fetch all user 
const fetchAllUser = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const skip = (page - 1) * limit;

        const sortBy = req.query.sortBy || 'createdAt';
        const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
        const totalUsers = await User.countDocuments({ role: 'user'});
        const totalPages = Math.ceil(totalUsers / limit);

        const sortObject = {};
        sortObject[sortBy] = sortOrder;

        const users = await User.find({role: "user"}).sort(sortObject).skip(skip).limit(limit);
        if(!users){
            return res.status(400).json({
                success: false,
                message: 'Users not found ! Please try again !'
            })
        }

        res.status(200).json({
            success: true,
            message: 'Users fetched successfully !',
            currentPage: page,
            totalPages: totalPages,
            totalUsers: totalUsers,
            data: users
        })
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

//upload avatar user
const uploadAvatarUser = async (req, res) => {
    try {
        //check if file is missing in req object
        if(!req.file){
            return res.status(400).json({
                success: false,
                message: 'File not found ! Please try again !'
            })
        }

        const {url, publicId}= await uploadToCloudinary(req.file.path)

        //create new image in db
        const newImage = new Image({
            url,
            publicId,
            uploadBy: req.user.id
        })

        await newImage.save();

        //update image in user
        const user = await User.findById(req.user.id);

        user.image = url;
        await user.save();

        res.status(200).json({
            success: true,
            message: 'Avatar uploaded successfully !',
            data: user
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            success: false,
            message: 'Internal server error ! Please try again !'
        })
    }
}

//refresh token controller
const refreshToken = async (req, res) => {
    try {
        const token = req.cookies.refresh_token;
        if (!token) {
            return res.status(400).json({
                success: false,
                message: "Refresh token is required",
            });
        }

        jwt.verify(token, process.env.JWT_REFRESH_SECRET, (err, user) => {
            if (err) {
                return res.status(403).json({
                    success: false,
                    message: "Invalid or expired refresh token",
                });
            }

            const newAccessToken = jwt.sign(
                {
                    id: user._id,
                    username: user.username,
                    role: user.role,
                },
                process.env.JWT_SECRET,
                { expiresIn: "15m" }
            );

            return res.status(200).json({
                success: true,
                accessToken: newAccessToken,
                message: "Access token refreshed successfully",
            });
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

module.exports = {
    registerUser,
    loginUser,
    logoutUser,
    changePasswordUser,
    forgotPasswordUser,
    fetchDetailUser,
    fetchAllUser,
    uploadAvatarUser,
    refreshToken
}