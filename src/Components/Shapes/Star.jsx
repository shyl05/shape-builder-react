import React from "react";
import { Star as KonvaStar, Transformer } from "react-konva";

const Star = React.forwardRef((props, ref) => {
    const { properties, isSelected, onSelect, onTransform, viewer } = props;
    const trRef = React.useRef();

    const _onChange = () => {
        if(viewer === false){
            const shape = ref.current;
            onTransform({
                x: shape.x(),
                y: shape.y(),
                numPoints: shape.numPoints(),
                outerRadius: shape.outerRadius() * shape.scaleX(),
                innerRadius: (shape.outerRadius() * shape.scaleX())*0.5,
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
                <KonvaStar
                    ref={ref}
                    x={properties.x}
                    y={properties.y}
                    numPoints={properties.numPoints}
                    innerRadius={properties.innerRadius}
                    outerRadius={properties.outerRadius}
                    scaleX={1}
                    scaleY={1}
                    rotation={properties.rotation}
                    draggable={properties.draggable}
                    stroke={"black"}
                    onClick={onSelect}
                    onTransformEnd={_onChange}
                    onTransform={_onChange}
                    onDragMove={_onChange}
                    onDragEnd={_onChange}
                />
            ) : (
                <KonvaStar
                    ref={ref}
                    x={properties.x}
                    y={properties.y}
                    numPoints={properties.numPoints}
                    innerRadius={properties.innerRadius}
                    outerRadius={properties.outerRadius}
                    scaleX={1}
                    scaleY={1}
                    rotation={properties.rotation}
                    stroke={"black"}
                    onClick={onSelect}
                    draggable={false}
                />
            )}
            {isSelected && viewer === false ?(
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
            ) : (
                null
            )}
        </>
    );
});

export default Star;