import React, { useEffect, useState } from 'react';
import ContentList from '../components/content/ContentList';
import CommentSection from '../components/content/CommentSection';
import { fetchContent } from '../services/contentService';

const ContentPage = () => {
    const [content, setContent] = useState([]);
    const [selectedContentId, setSelectedContentId] = useState(null);

    useEffect(() => {
        const loadContent = async () => {
            const data = await fetchContent();
            setContent(data);
        };

        loadContent();
    }, []);

    const handleContentSelect = (id) => {
        setSelectedContentId(id);
    };

    return (
        <div className="content-page">
            <h1>Content</h1>
            <ContentList content={content} onContentSelect={handleContentSelect} />
            {selectedContentId && <CommentSection contentId={selectedContentId} />}
        </div>
    );
};

export default ContentPage;