import React, { useEffect } from 'react';
import './Home.css';
import AppHeader from './AppHeader';
import Canvas from './Canvas';
import { useDispatch, useSelector } from 'react-redux';
import { loadShapes } from '../State/Slices/ShapesSlice';
import axios from 'axios';
import { useAlert } from 'react-alert';
import Card from '@mui/material/Card';
import CardContent from '@mui/material/CardContent';
import Typography from '@mui/material/Typography';
import { Divider, IconButton } from '@mui/material';
import RectangleOutlinedIcon from '@mui/icons-material/RectangleOutlined';
import CircleOutlinedIcon from '@mui/icons-material/CircleOutlined';
import DeleteForeverOutlinedIcon from '@mui/icons-material/DeleteForeverOutlined';
import HorizontalRuleOutlinedIcon from '@mui/icons-material/HorizontalRuleOutlined';
import StarBorderOutlinedIcon from '@mui/icons-material/StarBorderOutlined';
import FormatShapesOutlinedIcon from '@mui/icons-material/FormatShapesOutlined';
import AspectRatioOutlinedIcon from '@mui/icons-material/AspectRatioOutlined';

function generateRandom(maxLimit = 300){
    let rand = Math.random() * maxLimit;
    rand = Math.floor(rand); // 99
    return rand;
}

const Home = () => {
    const dispatch = useDispatch();
    const alert = useAlert();
    const data = useSelector((state)=> state.shapes.shapes);
    const selectedShape = useSelector((state) => state.shapes.selectedShape);
    const [canvasObjects, setCanvasObjects] = React.useState([]);
    const [viewer, setViewer] = React.useState(true);

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
            alert.show('Select one shape');
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
        getAllShapes();
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
                width: 100,
                height: 100,
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
                height: 2,
                width: 50,
                name: `Line-${generateRandom(100)}`,
            };
            setCanvasObjects(canvasObjects.concat(line));
            createNewShapes(line);
            dispatch(loadShapes(line));
        }
        if (shapeType === 'star') {
            const star = {
                type: 'star',
                x: generateRandom(),
                y: 100,
                numPoints: 6,
                innerRadius: 40,
                outerRadius: 70,
                width: 50,
                height: 50,
                draggable: true,
                name: `Star-${generateRandom(100)}`,
            };
            setCanvasObjects(canvasObjects.concat(star));
            createNewShapes(star);
            dispatch(loadShapes(star));
        }
    };

    const AnnotationsToolTip = () =>{
        if(selectedShape.type === 'ellipse'){
            return (
                <>
                    radiusX : {selectedShape.radiusX}
                    <br/>
                    radiusY : {selectedShape.radiusY}
                </>
            )
        } else if(selectedShape.type === 'circle'){
            return (
                <>
                    r : {selectedShape.radius}
                </>
            )
        }
    }

    return (
        <div className='AppContainer'>
            <AppHeader />
            <div className="app-content">
                <Card className='Toolbar'>
                    <Typography sx={{ fontSize: 16 }}>
                        Tools
                    </Typography>
                    <Divider style={{height: 2, width: '90%', borderBottom:'2px solid black'}} />
                    <CardContent  className='Toolbar-Content'>
                        <Typography sx={{ fontSize: 14, color: 'grey' }}>
                            Add Shapes
                        </Typography>
                        <div className='grid-container'>
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
                        </div>
                        <Divider style={{height: 2, width: '90%', borderBottom:'2px solid black'}} />
                        <Typography sx={{ fontSize: 14, color: 'grey' }}>
                            Actions
                        </Typography>
                        <div className='toolbar-actions-content'>
                            <IconButton 
                                onClick={() => deleteShape()}
                                className='delete-btn'
                            >
                                <DeleteForeverOutlinedIcon />
                                <Typography sx={{ fontSize: 14 }}>
                                    Delete
                                </Typography>
                            </IconButton>
                            <IconButton 
                                onClick={() => {
                                    setViewer(true);
                                    alert.show('Read Only Mode Active');
                                }}
                                className={viewer ? "action-btn-active" : "action-btn"}
                            >
                                <AspectRatioOutlinedIcon />
                                <Typography sx={{ fontSize: 14 }}>
                                    Read-Only
                                </Typography>
                            </IconButton>
                            <IconButton 
                                onClick={() => {
                                    setViewer(false);
                                    alert.show('Edit Mode Active');
                                }}
                                className={!viewer ? "action-btn-active" : "action-btn"}
                            >
                                <FormatShapesOutlinedIcon />
                                <Typography sx={{ fontSize: 14 }}>
                                    Edit
                                </Typography>
                            </IconButton>
                        </div>
                        <Divider style={{height: 2, width: '90%', borderBottom:'2px solid black'}} />
                    </CardContent>
                    {selectedShape.name ? (
                        <div className='toolbar-annotations'>
                            <Typography sx={{ fontSize: 16, color: 'black' }}>
                                Selected Shape  
                            </Typography>
                            <div className='toolbar-annotations-textBox'>
                                <Typography sx={{ fontSize: 16, color: 'black' }}>
                                    Name:  
                                </Typography> 
                                <Typography sx={{ fontSize: 16, color: 'red' }}>
                                    {selectedShape.name} 
                                </Typography> 
                            </div>
                            <div className='toolbar-annotations-textBox'>
                                <Typography sx={{ fontSize: 12, color: 'black' }}>
                                    Height: 
                                </Typography> 
                                <Typography sx={{ fontSize: 12, color: 'red' }}>
                                    {selectedShape.height} 
                                </Typography> 
                            </div>
                            <div className='toolbar-annotations-textBox'>
                                <Typography sx={{ fontSize: 12, color: 'black' }}>
                                    Width: 
                                </Typography> 
                                <Typography sx={{ fontSize: 12, color: 'red' }}>
                                    {selectedShape.width} 
                                </Typography> 
                            </div>
                            <div className='toolbar-annotations-textBox'>
                                <code>{`
                                    Radius : ${selectedShape?.radius}
                                    RadiusX : ${selectedShape?.radiusX}
                                    RadiusY : ${selectedShape?.radiusY}
                                    Points: ${selectedShape?.points}
                                `}</code>
                            </div>
                        </div>
                    ):(
                        null
                    )}
                </Card>
                <div className="Canvas-Wrapper">
                    <Canvas canvasObjects={canvasObjects} viewer={viewer} />
                    {selectedShape.name ?(
                        <div 
                            style={{zIndex: 1, 
                                position: "absolute",
                                top: 90, 
                                right: 80,
                                color: 'green',
                                margin: 0,
                                padding: 0,
                                fontSize: 14,
                            }}>
                            h x w = {selectedShape.height + ' x ' + selectedShape.width}
                            <br/>
                            <AnnotationsToolTip />
                        </div>
                    ):(
                        null
                    )}
                </div>
            </div>
        </div>
    );
};

export default Home;