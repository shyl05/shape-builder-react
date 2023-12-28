import React, { useEffect } from 'react';
import './Home.css';
import AppHeader from './AppHeader';
import Canvas from './Canvas';
import { useDispatch, useSelector } from 'react-redux';
import { loadShapes } from '../State/Slices/ShapesSlice';
import axios from 'axios';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { IconButton } from '@mui/material';
import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import HorizontalRuleOutlinedIcon from '@mui/icons-material/HorizontalRuleOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';

function generateRandom(maxLimit = 300){
    let rand = Math.random() * maxLimit;
    rand = Math.floor(rand); // 99
    return rand;
}

const Home = () => {
    const dispatch = useDispatch();
    const data = useSelector((state)=> state.shapes.shapes);
    const selectedShape = useSelector((state) => state.shapes.selectedShape);
    const [canvasObjects, setCanvasObjects] = React.useState([]);

    const getAllShapes = () =>{
        axios
        .get('http://localhost:7000/shapes/all')
        .then(res => {
            dispatch(loadShapes(res.data));
            setCanvasObjects(res.data);
        })
        .catch(error => {
          setCanvasObjects(data);
          console.error(error);
        });
    }

    const createNewShapes = (data) =>{
        axios
        .post('http://localhost:7000/shapes/create', data)
        .then(res => {
            dispatch(loadShapes(res.data));
        })
        .catch(error => {
          console.error(error);
        });
    };

    const deleteShape = () => {
        console.log(selectedShape) 
        if(!selectedShape.name){
            alert('Select one shape');
        }
        axios
        .post('http://localhost:7000/shapes/delete', selectedShape)
        .then(res => {
            console.log("Deleted", res.data);
            const filteredPeople = canvasObjects.filter((item) => item.id !== res.data);
            setCanvasObjects(filteredPeople);
            window.location.reload();
        })
        .catch(error => {
          console.error(error);
        });
    }


    useEffect(()=>{
        getAllShapes()
        //setCanvasObjects(data);
    // eslint-disable-next-line react-hooks/exhaustive-deps
    },[])

    const addShapeToCanvas = (shapeType) => {
        if (shapeType === 'square') {
            const square = {
                type: 'square',
                x: generateRandom(),
                y: 20,
                width: 50,
                height: 50,
                draggable: true,
                name: `Square-${generateRandom(100)}`,
            };
            setCanvasObjects(canvasObjects.concat(square));
            createNewShapes(square);
            dispatch(loadShapes(square));
        }
        if (shapeType === 'circle') {
            const circle = {
                type: 'circle',
                x: generateRandom(),
                y: 100,
                radius: 50,
                draggable: true,
                name: `Circle-${generateRandom(100)}`,
            };
            setCanvasObjects(canvasObjects.concat(circle));
            createNewShapes(circle);
            dispatch(loadShapes(circle));
        }
        if (shapeType === 'ellipse') {
            const ellipse = {
                type: 'ellipse',
                x: generateRandom(),
                y: 100,
                radiusX: 100,
                radiusY: 50,
                draggable: true,
                name: `Ellipse-${generateRandom(100)}`,
            };
            setCanvasObjects(canvasObjects.concat(ellipse));
            createNewShapes(ellipse);
            dispatch(loadShapes(ellipse));
        }
        if (shapeType === 'line') {
            const line = {
                type: 'line',
                points: [10, 100, 100, 10],
                draggable: true,
                name: `Line-${generateRandom(100)}`,
            };
            setCanvasObjects(canvasObjects.concat(line));
            createNewShapes(line);
            dispatch(loadShapes(line));
        }
        if (shapeType === 'star') {
            const line = {
                type: 'star',
                x: generateRandom(),
                y: 100,
                numPoints: 6,
                innerRadius: 40,
                outerRadius: 70,
                draggable: true,
                name: `Star-${generateRandom(100)}`,
            };
            setCanvasObjects(canvasObjects.concat(line));
            createNewShapes(line);
            dispatch(loadShapes(line));
        }
    };

    return (
        <div className='AppContainer'>
            <AppHeader />
            <div className="app-content">
                <Card className='Toolbar'>
                    <Typography sx={{ fontSize: 22 }}>
                        Tools
                    </Typography>
                    <CardContent  className='Toolbar-Content'>
                        <Typography sx={{ fontSize: 14 }}>
                            Add Shapes
                        </Typography>
                        <IconButton onClick={() => addShapeToCanvas('square')}>
                            <RectangleOutlinedIcon />
                        </IconButton>
                        <IconButton onClick={() => addShapeToCanvas('circle')}>
                            <CircleOutlinedIcon />
                        </IconButton>
                        <IconButton onClick={() => addShapeToCanvas('ellipse')}>
                            <img src={require('../assets/ellipse-outline.png')} style={{height: 20}} alt="ellipse"/>
                        </IconButton>
                        <IconButton onClick={() => addShapeToCanvas('line')}>
                            <HorizontalRuleOutlinedIcon />
                        </IconButton>
                        <IconButton onClick={() => addShapeToCanvas('star')}>
                            <StarBorderOutlinedIcon />
                        </IconButton>
                        <div>
                            <Typography sx={{ fontSize: 14 }}>
                                Actions
                            </Typography>
                            <IconButton onClick={() => deleteShape()}>
                                <DeleteForeverOutlinedIcon />
                            </IconButton>
                        </div>
                    </CardContent>
                    {selectedShape.name ? (
                        <>
                            <Typography sx={{ fontSize: 14 }}>
                                Annotations
                            </Typography>
                            <Typography sx={{ fontSize: 16, color: 'red' }}>
                                Selected: {selectedShape.name}  
                            </Typography> 
                        </>
                    ):(
                        null
                    )}
                </Card>
                <div className="Canvas-Wrapper">
                    <Canvas canvasObjects={canvasObjects} />
                </div>
            </div>
        </div>
    );
};

export default Home;