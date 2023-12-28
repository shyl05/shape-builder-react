import React from "react";
import { Stage, Layer } from "react-konva";
import Shapes from "./Shapes/Shapes";
import { useDispatch, useSelector } from "react-redux";
import { loadShapes, updateShapes, getSelectedShape } from "../State/Slices/ShapesSlice";
import axios from "axios";

const Canvas = (props) => {
  const dispatch = useDispatch();

  const UpdateShape = (data) =>{
    axios
    .put('http://localhost:7000/shapes/update', data)
    .then(res => {
        dispatch(loadShapes(res.data));
    })
    .catch(error => {
      console.error(error);
    });
  };

  const { canvasObjects } = props;
  const [selectedId, setSelectedId] = React.useState(null);
  const data = useSelector((state)=> state.shapes.shapes);

  const onSelectShape = (props) => {
    console.log("Shape props", props)
    dispatch(getSelectedShape(props));
  }

  const _onSelectedShapeChange = (key, newProps) => {
    const item = data.find(t => t.name === newProps.name);
    if(!item){
      dispatch(loadShapes(newProps));
    } else {
      dispatch(updateShapes(newProps));
      UpdateShape(newProps);
    };
  };

  return (
      <Stage
          width={1000}
          height={500}
          style={{ border: '1px solid grey', background: "white" }}
      >
          <Layer>
              {canvasObjects.map((shape, key) => 
                <Shapes 
                  shape={shape} 
                  key={key} 
                  onTransform={newProps => {
                    _onSelectedShapeChange(key, newProps)
                  }}  
                  isSelected={key === selectedId}
                  onSelect={() => {
                    onSelectShape(shape);
                    setSelectedId(key);
                  }}
                />
              )}
          </Layer>
      </Stage>
  );
};

export default Canvas;