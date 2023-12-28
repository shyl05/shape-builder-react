import React from "react";
import { Circle as KonvaCircle, Transformer } from "react-konva";

const Circle = React.forwardRef((props, ref) => {
    const { properties, isSelected, onSelect, onTransform } = props;
    const trRef = React.useRef();

    const _onChange = event => {
        const shape = event.target;
        onTransform({
          x: shape.x(),
          y: shape.y(),
          width: shape.width() * shape.scaleX(),
          height: shape.height() * shape.scaleY(),
          rotation: shape.rotation(),
          name: properties.name,
          draggable: properties.draggable,
        });
    };

    React.useEffect(() => {
        if (isSelected) {
          // we need to attach transformer manually
          trRef.current.nodes([ref.current]);
          trRef.current.getLayer().batchDraw();
        }
    // eslint-disable-next-line react-hooks/exhaustive-deps
    }, [isSelected]);

    return (
        <>
            <KonvaCircle
                ref={ref}
                x={properties.x}
                y={properties.y}
                radius={properties.radius}
                draggable={properties.draggable}
                stroke={"black"}
                scaleX={1}
                scaleY={1}
                onClick={onSelect}
                onTransformEnd={_onChange}
                onDragEnd={_onChange}
            />
            {isSelected && (
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
            )}
        </>
    );
});

export default Circle;