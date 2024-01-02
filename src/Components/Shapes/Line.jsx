import React from "react";
import { Line as KonvaLine, Transformer } from "react-konva";

const Line = React.forwardRef((props, ref) => {
    const { properties, isSelected, onSelect, onTransform, viewer } = props;
    const trRef = React.useRef();

    const _onChange = () => {
        if(viewer === false){
            const shape = ref.current;
            onTransform({
            x: shape.x(),
            y: shape.y(),
            points: shape.points(),
            width: shape.width() * shape.scaleX(),
            height: shape.height() * shape.scaleY(),
            rotation: shape.rotation(),
            name: properties.name,
            draggable: properties.draggable,
            });
        } else {
            console.log("Read only mode active");
        }
    };

    React.useEffect(() => {
        if (isSelected && viewer === false) {
          // we need to attach transformer manually
          trRef.current.nodes([ref.current]);
          trRef.current.getLayer().batchDraw();
        }
        // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSelected, viewer]);

    return (
        <>
            {viewer === false? (
                <KonvaLine
                    ref={ref}
                    x={properties.x}
                    y={properties.y}
                    points={properties.points}
                    draggable={properties.draggable}
                    rotation={properties.rotation}
                    stroke={"black"}
                    scaleX={1}
                    scaleY={1}
                    onClick={onSelect}
                    onTransformEnd={_onChange}
                    onTransform={_onChange}
                    onDragMove={_onChange}
                    onDragEnd={_onChange}
                />
            ) : (
                <KonvaLine
                    ref={ref}
                    x={properties.x}
                    y={properties.y}
                    points={properties.points}
                    rotation={properties.rotation}
                    stroke={"black"}
                    scaleX={1}
                    scaleY={1}
                    onClick={onSelect}
                    draggable={false}
                />
            )}
            {isSelected && viewer === false? (
                <Transformer
                    ref={trRef}
                    flipEnabled={false}
                    boundBoxFunc={(oldBox, newBox) => {
                        // limit resize
                        if (Math.abs(newBox.width) < 5 || Math.abs(newBox.height) < 5) {
                        return oldBox;
                        }
                        return newBox;
                    }}
                />
            ):(
                null
            )}
        </>
    );
});

export default Line;