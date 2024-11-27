import toast from "react-hot-toast";
import { apiConnect } from "../apiConnect";
import { blogEndpoints } from "../apis";
import { setBlogsList } from "../../redux/slices/blogSlice";

const {
    CREATE_BLOG_API,
    GET_BLOG_DETAILS_API,
    GET_ALL_BLOGS_API,
    GET_ALL_AUTHOR_BLOGS_API,
    UPDATE_BLOG_API,
    DELETE_BLOG_API,
} = blogEndpoints;

export const createBlog = async (data, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnect(
            "POST",
            CREATE_BLOG_API,
            data,
            {
                Authorization: `Bearer ${token}`
            }
        )
        console.log("CREATE BLOG API RESPONSE.....", response);

        if(!response?.data?.success){
            toast.error(response?.data?.message);
            throw new Error("Error");
        }
        result = response.data.blog;
        toast.success("Blog Created Successfully")
    } catch (error) {
        console.log("CREATE BLOG API ERROR:", error);
        toast.error("Something went wrong");
    }
    toast.dismiss(toastId);
    return result;
}

export const getBlogDetails = async (blogId, token) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnect(
            "POST",
            GET_BLOG_DETAILS_API,
            {
                blogId,
            },
            {
                Authorization: `Bearer ${token}`
            }
        )
        console.log("GET BLOG API RESPONSE.....", response);

        if(!response?.data?.success){
            toast.error(response.data.message);
            throw new Error("Error");
        }
        result = response.data.blog;
    } catch (error) {
        console.log("GET BLOG API ERROR:", error);
        toast.error("Something went wrong");
    }
    toast.dismiss(toastId);
    return result;
}

export const getAllAuthorBlogs = async (authorId, token, dispatch) => {
    let result = [];
    const toastId = toast.loading("Loading...");
    try {
        if (!token) {
            toast.error("Authorization token is missing");
            return;
        }
        
        const response = await apiConnect(
            "POST",  // POST request to send authorId in body
            GET_ALL_AUTHOR_BLOGS_API,
            { authorId },  // Send authorId in the request body
            {
                Authorization: `Bearer ${token}`  // Make sure token is a valid string
            }
        );
        console.log("GET ALL AUTHOR BLOGS API RESPONSE.....", response);

        if (!response?.data?.success) {
            toast.error(response?.data?.message);
            throw new Error("Error");
        }

        result = response.data.allBlogs;
        dispatch(setBlogsList(result));  // Update Redux store with fetched blogs
    } catch (error) {
        console.log("GET ALL AUTHOR BLOGS API Error:", error);
        toast.error("Something went wrong");
    }
    toast.dismiss(toastId);
    return result;
};


export const getAllBlogs = async (dispatch) => {
    let result = [];
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnect(
            "GET",
            GET_ALL_BLOGS_API, 
            null,
        );
        console.log("GET ALL BLOGS API RESPONSE.....", response);

        if(!response?.data?.success){
            toast.error(response?.data?.message);
            throw new Error("Error");
        }
        result = response.data.allBlogs;
        dispatch(setBlogsList(result));
    } catch (error) {
        console.log("GET ALL BLOGS API Error:", error);
        toast.error("Something went wrong")
    }
    toast.dismiss(toastId);
    return result;
}

export const updateBlog = async (data, token, dispatch) => {
    let result = null;
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnect(
            "PUT",
            UPDATE_BLOG_API,
            data,
            {
                Authorization: `Bearer ${token}`
            }
        )
        console.log("UPDATE BLOG API RESPONSE.....", response);

        if(!response.data.success){
            toast.error(response?.data?.message);
            throw new Error("Error");
        }

        result = response.data.blog;
        // dispatch(setBlogsList(result?.data?.blogsList));
        toast.success("Blog Updated");
    } catch (error) {
        console.log("EDIT BLOG API ERROR:", error);
        toast.error("Something went wrong");
    }
    toast.dismiss(toastId);
    return result;
}

export const deleteBlog = async (blogId, token) => {
    const toastId = toast.loading("Loading...");
    try {
        const response = await apiConnect(
            "DELETE",
            DELETE_BLOG_API,
            {blogId},
            {
                Authorization: `Bearer ${token}`
            }
        )
        console.log("DELETE BLOG API RESPONSE.....", response);

        if(!response?.data?.success){
            toast.error(response?.data?.message);
            throw new Error("Error");
        }

        toast.success("Blog deleted");
    } catch (error) {
        console.log("DELETE BLOG API ERROR:", error);
        toast.error("Something went wrong");
    }
    toast.dismiss(toastId);
}