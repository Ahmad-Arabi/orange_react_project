import React, { useState } from 'react';

const CommentSection = ({ comments, onAddComment }) => {
    const [comment, setComment] = useState('');

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (comment.trim()) {
            onAddComment(comment);
            setComment('');
        }
    };

    return (
        <div className="comment-section">
            <h3>Comments</h3>
            <form onSubmit={handleCommentSubmit}>
                <textarea
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder="Add a comment..."
                    required
                />
                <button type="submit">Submit</button>
            </form>
            <ul>
                {comments.map((c, index) => (
                    <li key={index}>{c}</li>
                ))}
            </ul>
        </div>
    );
};

export default CommentSection;