import React from 'react'
import { FaPen } from "react-icons/fa";
import { IoSend } from "react-icons/io5";
import axios from 'axios';
import { useSelector } from 'react-redux';
const CreatePost = () => {

    const currentUser = useSelector((state) => state.user);

    const [content, setContent] = React.useState("");
    const inputRef = React.useRef(null);
    console.log("Post content:", content);

    const [isSending, setIsSending] = React.useState(false);

    const handleSendPost = async () => {
        if (!content.trim()) {
            alert("Please write something to post.");
            return;
        }
        try {
            setIsSending(true);
            const response = await axios.post(
                "https://backend-hcxk.vercel.app/api/createPost",
                { content, author: currentUser.currentUser?._id }
            );

            if (response?.data?.post) {
                alert("Post created successfully!");
                setContent("");
            }
        } catch (err) {
            console.log("Error while sending post:", err.message);
        } finally {
            setIsSending(false);
        }
    }

    return (
        <div className='rounded-xl p-4 bg-black/5'>
            <div className='relative'>
                <input
                    type="text"
                    placeholder="What's on your mind?"
                    className='w-full rounded-lg px-4 py-3 pr-10 text-sm outline-none bg-white/80 focus:ring-2 focus:ring-blue-200'
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    ref={inputRef}
                />
                {content.trim().length > 0 ? (
                    isSending ? (
                        <IoSend className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 animate-pulse' />
                    ) : (
                        <IoSend
                            className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-600 cursor-pointer hover:text-black'
                            onClick={handleSendPost}
                        />
                    )
                ) : (
                    <FaPen
                        className='absolute right-3 top-1/2 -translate-y-1/2 text-gray-400 cursor-pointer'
                        onClick={() => inputRef.current?.focus()}
                    />
                )}
            </div>
        </div>
    )
}

export default CreatePost