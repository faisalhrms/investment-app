import React from 'react';

const formatBreadcrumb = (path) => {
    const pathParts = path.split('/').filter(Boolean);
    return pathParts.map((part, index) => {
        const capitalizedPart = part.charAt(0).toUpperCase() + part.slice(1);
        return (
            <li key={index}>
                {index < pathParts.length - 1 ? (
                    <a href={`/${pathParts.slice(0, index + 1).join('/')}`}>{capitalizedPart}</a>
                ) : (
                    capitalizedPart
                )}
            </li>
        );
    });
};
const formatTitle = (str) => {
    return str
        .split('_')
        .map(word => word.charAt(0).toUpperCase() + word.slice(1))
        .join(' ');
};
const Title = ({ currentPath }) => {
    return (
        <div className="page_title_section dashboard_title">
            <div className="page_header">
                <div className="container">
                    <div className="row">
                        <div className="col-xl-9 col-lg-7 col-md-7 col-12 col-sm-7">
                            <h1>{currentPath === '/' ? 'Home' : formatTitle(currentPath.split('/').pop())}</h1>
                        </div>
                        <div className="col-xl-3 col-lg-5 col-md-5 col-12 col-sm-5">
                            <div className="sub_title_section">
                                <ul className="sub_title">
                                    <li><a href="/">Home</a> &nbsp;/&nbsp; </li>
                                    {formatBreadcrumb(currentPath)}
                                </ul>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Title;
