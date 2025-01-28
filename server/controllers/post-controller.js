const Post = require('../models/Post');

//create post controller
const createPost = async (req, res) => {
    try {
        const { title, content } = req.body;
        const image = req.file.path;

        const newPost = new Post({
            title,
            image,
            content,
        });

        await newPost.save();

        res.status(200).json({
            success: true,
            message: "Post created successfully"
        });
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
};

//fetch all posts controller
const fetchAllPosts = async (req, res) => {
    try {
        const page = parseInt(req.query.page) || 1;
        const limit = parseInt(req.query.limit) || 6;
        const skip = (page - 1) * limit;

        const sortBy = req.query.sortBy || 'createdAt';
        const sortOrder = req.query.sortOrder === 'asc' ? 1 : -1;
        const totalPosts = await Post.countDocuments();
        const totalPages = Math.ceil(totalPosts / limit);

        const sortObject = {};
        sortObject[sortBy] = sortOrder;

        const posts = await Post.find().sort(sortObject).skip(skip).limit(limit);
        if(!posts){
            return res.status(400).json({
                success: false,
                message: 'Posts not found ! Please try again !'
            })
        }

        res.status(200).json({
            success: true,
            message: 'Posts fetched successfully !',
            currentPage: page,
            totalPages: totalPages,
            totalProducts: totalPosts,
            data: posts
        })
        
    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

//fetch detail post controller
const fetchDetailPost = async (req, res) => {
    try {
        const { id } = req.params.id;

        //check post exist
        const post = await Post.findById(id);
        if(!post){
            return res.status(400).json({
                success: false,
                message: 'Post not found ! Please try again !'
            })
        }

        res.status(200).json({
            success: true,
            message: 'Post fetched successfully !',
            data: post
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

//edit post controller
const editPost = async (req, res) => {
    try {
        const id = req.params.id;
        const { title, content, date, image } = req.body;

        //check post exist
        const post = await Post.findById(id);
        if(!post){
            return res.status(400).json({
                success: false,
                message: 'Post not found ! Please try again !'
            })
        }

        //update post
        const updatePost = await Post.findByIdAndUpdate(
            id,
            {
                title,
                content,
                date,
                image            
            },
            {new: true}
        )

        //check post update 
        if(!updatePost){
            return res.status(400).json({
                success: false,
                message: 'Post not updated ! Please try again !'
            })
        }

        res.status(200).json({
            success: true,
            message: 'Post updated successfully !',
            data: updatePost
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

//delete post controller
const deletePost = async (req, res) => {
    try {
        const id  = req.params.id;
        console.log(id);

        //check post exist
        const post = await Post.findById(id);
        if(!post){
            return res.status(400).json({
                success: false,
                message: 'Post not found ! Please try again !'
            })
        }

        //delete post
        await Post.findByIdAndDelete(id);

        res.status(200).json({
            success: true,
            message: 'Post deleted successfully !',
        })

    } catch (error) {
        console.error(error);
        return res.status(500).json({
            success: false,
            message: "Internal server error",
        });
    }
}

module.exports = {
    createPost,
    fetchAllPosts,
    fetchDetailPost,
    editPost,
    deletePost
}