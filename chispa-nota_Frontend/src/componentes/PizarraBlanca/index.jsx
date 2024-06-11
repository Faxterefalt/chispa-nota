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
  const [serverElements, setServerElements] = useState([]);

  useEffect(() => {
    if (socket) {
      socket.on("whiteBoardDataResponse", (data) => {
        setImg(data.imgURL);
        setServerElements(data.elements);
      });

      socket.on("draw", (data) => {
        setElements((prevElements) => [...prevElements, data]);
      });
    }
  }, [socket]);

  const [isDrawing, setIsDrawing] = useState(false);

  useEffect(() => {
    const canvas = canvasRef.current;
    canvas.height = window.innerHeight * 2;
    canvas.width = window.innerWidth * 2;
    const ctx = canvas.getContext("2d");

    ctx.strokeStyle = color;
    ctx.lineWidth = 2;
    ctx.lineCap = "round";

    ctxRef.current = ctx;
  }, []);

  useEffect(() => {
    ctxRef.current.strokeStyle = color;
  }, [color]);

  useLayoutEffect(() => {
    if (canvasRef) {
      const roughCanvas = rough.canvas(canvasRef.current);
      if (elements.length > 0) {
        ctxRef.current.clearRect(
          0,
          0,
          canvasRef.current.width,
          canvasRef.current.height
        );
      }
      elements.forEach((element) => {
        if (element.type === "pencil") {
          roughCanvas.linearPath(
            element.path,
            {
              stroke: element.stroke,
              strokeWidth: 5,
              roughness: 0
            }
          );
        }
        else if (element.type === "line") {
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
            )
          );
        }
        else if (element.type === "rect") {
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
            )
          );
        }
      });
    }
  }, [elements]);

  const handleMouseDown = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;

    if (tool === "pencil") {
      const newElement = {
        type: "pencil",
        offsetX,
        offsetY,
        path: [[offsetX, offsetY]],
        stroke: color,
      };
      setElements((prevElements) => [...prevElements, newElement]);
      socket.emit("draw", newElement);
    }
    else if (tool === "line") {
      const newElement = {
        type: "line",
        offsetX,
        offsetY,
        width: offsetX,
        height: offsetY,
        stroke: color,
      };
      setElements((prevElements) => [...prevElements, newElement]);
      socket.emit("draw", newElement);
    }
    else if (tool === "rect") {
      const newElement = {
        type: "rect",
        offsetX,
        offsetY,
        width: 0,
        height: 0,
        stroke: color,
      };
      setElements((prevElements) => [...prevElements, newElement]);
      socket.emit("draw", newElement);
    }

    setIsDrawing(true);
  };

  const handleMouseMove = (e) => {
    const { offsetX, offsetY } = e.nativeEvent;

    if (isDrawing) {
      if (tool === "pencil") {
        const { path } = elements[elements.length - 1];
        const newPath = [...path, [offsetX, offsetY]];
        const updatedElement = {
          ...elements[elements.length - 1],
          path: newPath,
        };
        setElements((prevElements) =>
          prevElements.map((ele, index) => {
            if (index === elements.length - 1) {
              return updatedElement;
            } else {
              return ele;
            }
          })
        );
        socket.emit("draw", updatedElement);
      }
      else if (tool === "line") {
        const updatedElement = {
          ...elements[elements.length - 1],
          width: offsetX,
          height: offsetY,
        };
        setElements((prevElements) =>
          prevElements.map((ele, index) => {
            if (index === elements.length - 1) {
              return updatedElement;
            } else {
              return ele;
            }
          })
        );
        socket.emit("draw", updatedElement);
      }
      else if (tool === "rect") {
        const updatedElement = {
          ...elements[elements.length - 1],
          width: offsetX - elements[elements.length - 1].offsetX,
          height: offsetY - elements[elements.length - 1].offsetY,
        };
        setElements((prevElements) =>
          prevElements.map((ele, index) => {
            if (index === elements.length - 1) {
              return updatedElement;
            } else {
              return ele;
            }
          })
        );
        socket.emit("draw", updatedElement);
      }
    }
  };

  const handleMouseUp = (e) => {
    setIsDrawing(false);
  };

  return (
    <div
      onMouseDown={handleMouseDown}
      onMouseMove={handleMouseMove}
      onMouseUp={handleMouseUp}
      className="border border-dark border-3 h-100 w-100 overflow-hidden"
    >
      <canvas ref={canvasRef} />
    </div>
  );
}

export default WhiteBoard;