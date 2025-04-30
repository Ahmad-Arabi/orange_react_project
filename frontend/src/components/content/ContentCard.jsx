import React, { useState } from 'react';

const ContentCard = ({ content, onLike, onComment }) => {
    const [comment, setComment] = useState('');

    const handleCommentChange = (e) => {
        setComment(e.target.value);
    };

    const handleCommentSubmit = (e) => {
        e.preventDefault();
        if (comment.trim()) {
            onComment(content.id, comment);
            setComment('');
        }
    };

    return (
        <div className="content-card">
            <h3>{content.title}</h3>
            <p>{content.description}</p>
            <button onClick={() => onLike(content.id)}>Like</button>
            <form onSubmit={handleCommentSubmit}>
                <input
                    type="text"
                    value={comment}
                    onChange={handleCommentChange}
                    placeholder="Add a comment..."
                />
                <button type="submit">Submit</button>
            </form>
        </div>
    );
};

export default ContentCard;