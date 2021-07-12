import React from 'react';
import './ScrollDownButton.css';
import { IconButton } from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';;

export default function ScrollDownButton({ scrollToBottomFunc, scrolling }) {

    return (
        <div className={scrolling < -650 ? "chatBody_downButton_div" : "chatBody_downButton_div_hide"}>
            <IconButton 
                className="chatBody_downButton" 
                variant="contained" 
                style={{ color: 'white' }}  
                onClick={scrollToBottomFunc}>
                  <ExpandMoreIcon className="chatBody_downButton_span"/>
            </IconButton>
        </div>
    )
}




