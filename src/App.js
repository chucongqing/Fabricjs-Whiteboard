import React, { useEffect, useState } from "react";
import { fabric } from "fabric";

import styles from "./app.module.scss";

let isMousePressed = false;
let currentMode;
let currentColor = "#000000";
let currentWidth = 1;
let group = {};

const modes = {
  pan: "pan",
  drawing: "drawing",
};

const initCanvas = () =>
  new fabric.Canvas("canvas", {
    height: 500,
    width: 500,
    selection: false,
  });

const createBackgroundImage = (url, canvas) => {
  fabric.Image.fromURL(
    url,
    (img) => {
      // img.scale(0.3);
      canvas.add(img);
    },
    {
      top: 0,
      left: 0,
      cornerSize: 7,
    }
  );
  canvas.requestRenderAll();
};

function createRect(canvas) {
  const rect = new fabric.Rect({
    top: 100,
    left: 100,
    width: 60,
    height: 70,
    fill: currentColor,
    objectCaching: false,
  });

  rect.on("selected", (data) => {
    console.log("選中了", data);
  });

  canvas.add(rect);
  canvas.requestRenderAll();
}

function createCircle(canvas) {
  const circle = new fabric.Circle({
    top: 200,
    left: 200,
    radius: 50,
    fill: currentColor,
    cornerSize: 7,
    objectCaching: false,
  });

  canvas.add(circle);
  canvas.requestRenderAll();
}

function createTriangle(canvas) {
  const triangle = new fabric.Triangle({
    top: 400,
    left: 300,
    width: 50,
    height: 70,
    fill: currentColor,
    cornerSize: 7,
    objectCaching: false,
  });

  canvas.add(triangle);
  canvas.requestRenderAll();
}

const addCanvasEventListeners = (canvas) => {
  canvas.on("mouse:down", (event) => {
    isMousePressed = true;
  });

  canvas.on("mouse:move", (event) => {
    if (currentMode === modes.drawing) {
      canvas.setCursor("crosshair");
      canvas.requestRenderAll();
    }

    if (isMousePressed && currentMode === modes.pan) {
      canvas.setCursor("grab");
      canvas.requestRenderAll();
    } else if (isMousePressed && currentMode === modes.drawing) {
      canvas.isDrawingMode = true;
      canvas.freeDrawingBrush.color = currentColor;
      canvas.freeDrawingBrush.width = currentWidth;

      canvas.requestRenderAll();
    }
  });

  canvas.on("mouse:up", (event) => {
    isMousePressed = false;
    // canvas.setCursor("default");
    // canvas.requestRenderAll();
  });
};

const toggleMode = (mode) => {
  if (currentMode === modes[mode]) {
    currentMode = "";
  } else {
    currentMode = modes[mode];
  }
};

const clearCanvas = (canvas) => {
  canvas.getObjects().forEach((item) => {
    if (item !== canvas.backgroundImage) {
      canvas.remove(item);
    }
  });
};

const canvasFromJson = (canvas) => {
  const data = JSON.parse(
    '{"version":"4.3.1","objects":[{"type":"circle","version":"4.3.1","originX":"left","originY":"top","left":100,"top":100,"width":40,"height":40,"fill":"rgba(255, 255, 255, 0.0)","stroke":"#000000","strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"radius":20,"startAngle":0,"endAngle":6.283185307179586},{"type":"text","version":"4.3.1","originX":"left","originY":"top","left":253,"top":102,"width":95.55,"height":18.08,"fill":"#000000","stroke":null,"strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":2.43,"scaleY":2.43,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"text":"Some text","fontSize":16,"fontWeight":"normal","fontFamily":"Arial","fontStyle":"normal","lineHeight":1.16,"underline":false,"overline":false,"linethrough":false,"textAlign":"left","textBackgroundColor":"","charSpacing":0,"minWidth":20,"splitByGrapheme":false,"styles":{}},{"type":"rect","version":"4.3.1","originX":"left","originY":"top","left":109,"top":212,"width":40,"height":40,"fill":"rgba(255, 255, 255, 0.0)","stroke":"#000000","strokeWidth":1,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"rx":0,"ry":0},{"type":"image","version":"4.3.1","originX":"left","originY":"top","left":499,"top":86,"width":1200,"height":900,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":0.2,"scaleY":0.2,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg","crossOrigin":null,"filters":[]},{"type":"polyline","version":"4.3.1","originX":"left","originY":"top","left":483.78,"top":339.22,"width":50.88,"height":50.88,"fill":"white","stroke":"black","strokeWidth":2,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":1,"scaleY":1,"angle":262.52,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"points":[{"x":100,"y":100},{"x":99.11611652351681,"y":100.88388347648318},{"x":145.58058261758407,"y":147.34834957055045},{"x":142.92893218813452,"y":150},{"x":150,"y":150},{"x":150,"y":142.92893218813452},{"x":147.34834957055045,"y":145.58058261758407},{"x":100.88388347648318,"y":99.11611652351681},{"x":100,"y":100}]},{"type":"image","version":"4.3.1","originX":"left","originY":"top","left":197,"top":132,"width":1200,"height":900,"fill":"rgb(0,0,0)","stroke":null,"strokeWidth":0,"strokeDashArray":null,"strokeLineCap":"butt","strokeDashOffset":0,"strokeLineJoin":"miter","strokeUniform":false,"strokeMiterLimit":4,"scaleX":0.2,"scaleY":0.2,"angle":0,"flipX":false,"flipY":false,"opacity":1,"shadow":null,"visible":true,"backgroundColor":"","fillRule":"nonzero","paintFirst":"fill","globalCompositeOperation":"source-over","skewX":0,"skewY":0,"cropX":0,"cropY":0,"src":"https://miro.medium.com/max/1200/1*mk1-6aYaf_Bes1E3Imhc0A.jpeg","crossOrigin":null,"filters":[]}]}'
  );
  canvas.loadFromJSON(data);
  canvas.requestRenderAll();
};

const canvasToJson = (canvas) => {
  console.log(JSON.stringify(canvas.toJSON()));
};

const groupObjects = (canvas, group, shouldGroup) => {
  if (shouldGroup) {
    const objects = canvas.getObjects();
    group.value = new fabric.Group(objects);
    clearCanvas(canvas); // 先清除先前的，否則會重複出現兩組

    canvas.add(group.value);
  } else {
    if (group.value) {
      group.value.destroy();
      const oldGroup = group.value.getObjects();
      canvas.remove(group.value);
      canvas.add(...oldGroup);
      group.value = null;
      canvas.requestRenderAll();
    }
  }
};

const uploadImage = (canvas) => {
  return (e) => {
    const reader = new FileReader();
    const file = e.target.files[0];

    reader.addEventListener("load", () => {
      fabric.Image.fromURL(reader.result, (img) => {
        canvas.add(img);
      });
    });

    reader.readAsDataURL(file);
  };
};

const App = () => {
  const [canvas, setCanvas] = useState("");
  useEffect(() => {
    setCanvas(initCanvas());
  }, []);

  useEffect(() => {
    if (canvas) {
      addCanvasEventListeners(canvas);
    }
  }, [canvas]);

  return (
    <div className={styles.app}>
      <button onClick={() => createRect(canvas)}>rectangle</button>
      <button onClick={() => createCircle(canvas)}>circle</button>
      <button onClick={() => createTriangle(canvas)}>triangle</button>
      <button
        onClick={() =>
          createBackgroundImage("https://i.imgur.com/MFdYlTH.png", canvas)
        }
      >
        image
      </button>
      <button onClick={() => toggleMode(modes.drawing)}>pencil</button>
      <input type="color" onChange={(e) => (currentColor = e.target.value)} />
      <input
        type="range"
        min={1}
        max={20}
        onChange={(e) => (currentWidth = e.target.value)}
      />
      <button onClick={() => clearCanvas(canvas)}>clear all</button>
      <button onClick={() => groupObjects(canvas, group, true)}>
        group all objects
      </button>
      <button onClick={() => groupObjects(canvas, group, false)}>
        ungroup
      </button>

      <button onClick={() => canvasToJson(canvas)}>toJson</button>
      <button onClick={() => canvasFromJson(canvas)}>fromJson</button>
      <input type="file" accept="image/*" onChange={uploadImage(canvas)} />
      <canvas id="canvas"></canvas>
    </div>
  );
};

export default App;
