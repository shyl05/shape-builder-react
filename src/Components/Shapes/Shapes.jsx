import React from "react";
import Circle from './Circle';
import Rectangle from './Rectangle';
import Ellipse from "./Ellipse";
import Line from "./Line";
import Star from "./Star";

const Shapes = (props) => {
    const { shape, isSelected, onSelect, onTransform, viewer } = props;
    const shapeRef = React.createRef();
    let random = Date.now();

    if (shape.type === 'square') {
        return (
            <Rectangle 
                id={random} 
                properties={shape} 
                ref={shapeRef} 
                onTransform={onTransform}
                isSelected={isSelected}
                onSelect={onSelect}
                viewer={viewer}
            />
        );
    }

    if (shape.type === 'circle') {
        return (
            <Circle 
                id={random} 
                properties={shape} 
                ref={shapeRef} 
                onTransform={onTransform}
                isSelected={isSelected}
                onSelect={onSelect}
                viewer={viewer}
            />
        );
    }

    if (shape.type === 'ellipse') {
        return (
            <Ellipse 
                id={random} 
                properties={shape} 
                ref={shapeRef} 
                onTransform={onTransform}
                isSelected={isSelected}
                onSelect={onSelect}
                viewer={viewer}
            />
        );
    }

    if (shape.type === 'line') {
        return (
            <Line 
                id={random} 
                properties={shape} 
                ref={shapeRef} 
                onTransform={onTransform}
                isSelected={isSelected}
                onSelect={onSelect}
                viewer={viewer}
            />
        );
    }

    if (shape.type === 'star') {
        return (
            <Star
                id={random} 
                properties={shape} 
                ref={shapeRef} 
                onTransform={onTransform}
                isSelected={isSelected}
                onSelect={onSelect}
                viewer={viewer}
            />
        );
    }
};

export default Shapes;