import React from 'react';
import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import '../../assets/styles/contentCard.css';

const ContentCard = ({ content }) => {
    const { isAuthenticated } = useSelector(state => state.auth);
    
    // Format date to a readable string
    const formatDate = (dateString) => {
        const options = { year: 'numeric', month: 'short', day: 'numeric' };
        return new Date(dateString).toLocaleDateString(undefined, options);
    };

    return (
        <div className="content-card">
            <div className="content-header">
                <div className="author-info">
                    <div className="author-avatar">
                        {/* Default avatar or first letter of user's name */}
                        {content.user?.name?.charAt(0) || 'U'}
                    </div>
                    <div className="author-details">
                        <h4>{content.user?.name || 'Unknown User'}</h4>
                        <small>{formatDate(content.created_at)}</small>
                    </div>
                </div>
            </div>
            
            <h3>{content.title}</h3>
            <p className="content-text">{content.body}</p>
            
            <div className="content-footer">
                <div className="content-stats">
                    <span className="like-count">
                        <i className="far fa-heart"></i> {content.likes_count || 0}
                    </span>
                    <span className="comment-count">
                        <i className="far fa-comment"></i> {content.comments_count || 0}
                    </span>
                </div>
                <Link to={`/content/${content.id}`} className="read-more">
                    Read More
                </Link>
            </div>
            
            {isAuthenticated && (
                <div className="content-actions">
                    <button className="like-btn">
                        <i className="far fa-heart"></i> Like
                    </button>
                    <button className="comment-btn">
                        <i className="far fa-comment"></i> Comment
                    </button>
                </div>
            )}
        </div>
    );
};

export default ContentCard;