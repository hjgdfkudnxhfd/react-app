import React from 'react';
import {styled} from 'styled-components';


const SortContainer = ({src, alt, ...props}) => {
    return <img src={src} alt={alt} {...props} />;
};

export const SortButton = styled(SortContainer)`
    cursor: pointer;
    width: 20px;
`;