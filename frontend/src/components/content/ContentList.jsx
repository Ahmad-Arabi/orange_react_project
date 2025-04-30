import React from 'react';
import ContentCard from './ContentCard';

const ContentList = ({ contentItems }) => {
    return (
        <div className="content-list">
            {contentItems.map(item => (
                <ContentCard key={item.id} content={item} />
            ))}
        </div>
    );
};

export default ContentList;