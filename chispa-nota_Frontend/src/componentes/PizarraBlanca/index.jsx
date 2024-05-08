import { useEffect, useState, useLayoutEffect } from "react";
import rough from "roughjs";

const roughGenerator = rough.generator();

function WhiteBoard({
  canvasRef, 
  ctxRef, 
  elements, 
  setElements, 
  color, 
  tool,
  user,
  socket
}) {

  const [img, setImg] = useState(null);
  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    if (socket && user?.presenter) {
      socket.on("whiteBoardDataResponse",(data)=>{
        setImg(data.imgURL);
      });
    }
  }, [socket, user]);

  useEffect(() => {
    if (user?.presenter) {
      const canvas = canvasRef.current;
      canvas.height=window.innerHeight*2;
      canvas.width=window.innerWidth*2; 
      const ctx = canvas.getContext("2d");

      ctx.strokeStyle=color;
      ctx.lineWidth = 2;
      ctx.lineCap="round";

      ctxRef.current=ctx;
    }
  }, [user]);

  useEffect(() => {
    if (user?.presenter) {
      ctxRef.current.strokeStyle=color;
    }
  }, [color, user]);

  useLayoutEffect(() => {
    if (user?.presenter && canvasRef) {
      const roughCanvas = rough.canvas(canvasRef.current);
      if(elements.length > 0){
        ctxRef.current.clearRect(
          0, 
          0, 
          canvasRef.current.width, 
          canvasRef.current.height);
      }
      elements.forEach((element ) => {
        if(element.type ==="pencil"){
        roughCanvas.linearPath(
          element.path,
          {
            stroke: element.stroke,
            strokeWidth: 5,
            roughness: 0
          });
        }
        else if(element.type==="line"){
          roughCanvas.draw(
          roughGenerator.line(
            element.offsetX, 
            element.offsetY, 
            element.width,
            element.height,
            {
              stroke: element.stroke,
              strokeWidth: 5,
              roughness: 0
            }
          ));
        }
        else if(element.type==="rect"){
          roughCanvas.draw(
          roughGenerator.rectangle(
            element.offsetX, 
            element.offsetY, 
            element.width,
            element.height,
            {
              stroke: element.stroke,
              strokeWidth: 5,
              roughness: 0
            }
          ));
        }
      });

      const canvasImage = canvasRef.current.toDataURL();
      socket.emit("whiteboardData",canvasImage);
    }
  }, [elements, user]);

  const handleMouseDown = (e) => {
    if (user?.presenter) {
      const { offsetX, offsetY } = e.nativeEvent;

      if(tool === "pencil"){
        setElements((prevElements) => [
          ...prevElements,
          {
            type:"pencil",
            offsetX,
            offsetY,
            path:[[offsetX, offsetY]],
            stroke: color,
          },
        ]);
      }
      else if(tool==="line"){
        setElements((prevElements) => [
          ...prevElements,
          {
            type:"line",
            offsetX,
            offsetY,
            width: offsetX,
            height: offsetY,
            stroke: color,
          },
        ]);  
      }
      else if(tool==="rect"){
        setElements((prevElements) => [
          ...prevElements,
          {
            type:"rect",
            offsetX,
            offsetY,
            width: 0,
            height: 0,
            stroke: color,
          },
        ]);  
      }

      setIsDrawing(true);
    }
  };

  const handleMouseMove = (e) => {
    if (user?.presenter && isDrawing) {
      const { offsetX, offsetY } = e.nativeEvent;

      if(tool === "pencil"){
        const { path } = elements[elements.length - 1];
        const newPath = [...path, [offsetX,offsetY]];
        setElements((prevElements) =>
          prevElements.map((ele, index) => {
            if(index === elements.length - 1) {
              return {
                ...ele,
                path: newPath,
              };
            } else {
              return ele;
            }
          })
        );
      }
      else if(tool === "line"){
        setElements((prevElements) =>
          prevElements.map((ele, index) => {
            if(index === elements.length - 1) {
              return {
                ...ele,
                width: offsetX,
                height: offsetY,
              };
            } else {
              return ele;
            }
          })
        );
      }
      else if(tool==="rect"){
        setElements((prevElements) =>
          prevElements.map((ele, index) => {
            if(index === elements.length - 1) {
              return {
                ...ele,
                width: offsetX - ele.offsetX,
                height: offsetY - ele.offsetY,
              };
            } else {
              return ele;
            }
          })
        );
      }
    } 
  };   

  const handleMouseUp = (e) => {
    if (user?.presenter) {
      setIsDrawing(false);
    }
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="border border-dark border-3 h-100 w-100 overflow-hidden"
    >
      {!user?.presenter ? (
        <img 
          src={img} 
          alt="Pizarra en tiempo real compartida" 
          style={{ height:window.innerHeight*2, width:"285%" }}
        />
      ) : (
        <canvas ref={canvasRef}/>
      )}
    </div>
  );
};

export default WhiteBoard;