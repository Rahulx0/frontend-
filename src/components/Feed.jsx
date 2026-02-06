import React from 'react'
import { BiSolidLike } from "react-icons/bi";
import { FaRegComment } from "react-icons/fa";
import { useSelector } from 'react-redux';

const Feed = () => {


const [posts, setPosts] = React.useState([]);
const { currentUser } = useSelector((state) => state.user);

React.useEffect(() => {
    const fetchPosts = async () => {
        try {
            const response = await fetch("http://localhost:4000/api/getAllPosts");
            const data = await response.json();
            if (data?.posts) {
                setPosts(data.posts);
            }
        } catch (err) {
            console.log("Error fetching posts:", err.message);
        }
    };
    fetchPosts();
}, []); 

const handleLikePost = async (postId) => {
    if (!currentUser?._id) {
        alert("Please sign in to like posts.");
        return;
    }
    try {
        const response = await fetch("http://localhost:4000/api/likePost", {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify({ postId, userId: currentUser._id })
        });
        const data = await response.json();
        if (data?.post) {
            setPosts((prev) => prev.map((p) => (p._id === data.post._id ? data.post : p)));
        }
    } catch (err) {
        console.log("Error liking post:", err.message);
    }
}


    return (
        <div>
            <div className='text-lg font-semibold text-gray-800 mb-3'>Feed</div>

            <ul>
                {posts.map((post) => (
                    <li key={post._id} className='border rounded-xl p-4 mb-4 bg-white/80 shadow-sm hover:shadow-md transition-shadow'>
                      
                        <div className='flex items-center gap-3 mb-3'>
                            <img
                                className="w-8 h-8 rounded-full border border-white/90 shadow-sm"
                                src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSWp1VH0chk5el7ykIOMp7p-7LdMJ1u3mBQOA&s' width='72' height='72' viewBox='0 0 72 72'><rect width='72' height='72' rx='36' fill='%23244f7a'/><circle cx='36' cy='28' r='14' fill='%23b9d4f1'/><path d='M12 66c4-14 20-18 24-18s20 4 24 18' fill='%23b9d4f1'/></svg>"
                                alt="user profile"
                            />
                            <div className='flex flex-col leading-tight'>
                                <h2 className='font-semibold text-sm text-gray-900'>Author ID: {post.author?._id || post.author || 'Unknown'}</h2>
                            </div>
                        </div>
                        <p className='text-sm text-gray-800 leading-relaxed text-center'>{post.content}</p>
                        <div className='mt-3 flex items-center justify-between text-xs text-gray-500'>
                            <span>Comments: {post.comments?.length ?? 0}</span>
                            <div className='flex items-center gap-4 text-gray-600'>
                                <div className='flex items-center gap-1'>
                                    <BiSolidLike
                                        className='w-4 h-4 cursor-pointer hover:text-black hover:scale-110 transition-transform'
                                        onClick={() => handleLikePost(post._id)}
                                    />
                                    <span className='text-xs text-gray-600'>{post.likes?.length ?? 0}</span>
                                </div>
                                <FaRegComment className='w-4 h-4 cursor-pointer hover:text-black' />
                            </div>
                        </div>
                    </li>
                ))}
            </ul>
        </div>
    )
}

export default Feed