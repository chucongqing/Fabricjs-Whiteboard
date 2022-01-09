"use strict";

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.default = void 0;

require("core-js/modules/es.json.stringify.js");

require("core-js/modules/web.url.to-json.js");

require("core-js/modules/es.parse-int.js");

require("core-js/modules/web.dom-collections.iterator.js");

var _react = _interopRequireWildcard(require("react"));

var _reactRedux = require("react-redux");

var _fabric = require("fabric");

var _fileupload = require("primereact/fileupload");

var _button = require("primereact/button");

var _checkbox = require("primereact/checkbox");

var _PdfReader = _interopRequireDefault(require("../PdfReader"));

var _fileSaver = require("file-saver");

var _select = require("./images/select.svg");

var _eraser = require("./images/eraser.svg");

var _text = require("./images/text.svg");

var _rectangle = require("./images/rectangle.svg");

var _line = require("./images/line.svg");

var _ellipse = require("./images/ellipse.svg");

var _triangle = require("./images/triangle.svg");

var _pencil = require("./images/pencil.svg");

var _sweeping = require("./images/sweeping.svg");

require("./eraserBrush");

var _indexModule = _interopRequireDefault(require("./index.module.scss"));

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _getRequireWildcardCache(nodeInterop) { if (typeof WeakMap !== "function") return null; var cacheBabelInterop = new WeakMap(); var cacheNodeInterop = new WeakMap(); return (_getRequireWildcardCache = function _getRequireWildcardCache(nodeInterop) { return nodeInterop ? cacheNodeInterop : cacheBabelInterop; })(nodeInterop); }

function _interopRequireWildcard(obj, nodeInterop) { if (!nodeInterop && obj && obj.__esModule) { return obj; } if (obj === null || typeof obj !== "object" && typeof obj !== "function") { return { default: obj }; } var cache = _getRequireWildcardCache(nodeInterop); if (cache && cache.has(obj)) { return cache.get(obj); } var newObj = {}; var hasPropertyDescriptor = Object.defineProperty && Object.getOwnPropertyDescriptor; for (var key in obj) { if (key !== "default" && Object.prototype.hasOwnProperty.call(obj, key)) { var desc = hasPropertyDescriptor ? Object.getOwnPropertyDescriptor(obj, key) : null; if (desc && (desc.get || desc.set)) { Object.defineProperty(newObj, key, desc); } else { newObj[key] = obj[key]; } } } newObj.default = obj; if (cache) { cache.set(obj, newObj); } return newObj; }

const chooseOptions = {
  icon: 'pi pi-upload',
  iconOnly: false
};
let drawInstance = null;
let origX;
let origY;
let mouseDown = false;
const options = {
  currentMode: '',
  currentColor: '#000000',
  currentWidth: 5,
  fill: false,
  group: {}
};
const modes = {
  RECTANGLE: 'RECTANGLE',
  TRIANGLE: 'TRIANGLE',
  ELLIPSE: 'ELLIPSE',
  LINE: 'LINE',
  PENCIL: 'PENCIL',
  ERASER: 'ERASER'
};

const initCanvas = () => new _fabric.fabric.Canvas('canvas', {
  height: 600,
  width: 800
});
/*  ==== line  ==== */


const createLine = canvas => {
  if (modes.currentMode !== modes.LINE) {
    options.currentMode = modes.LINE;
    canvas.off('mouse:down');
    canvas.off('mouse:move');
    canvas.off('mouse:up');
    canvas.on('mouse:down', startAddLine(canvas));
    canvas.on('mouse:move', startDrawingLine(canvas));
    canvas.on('mouse:up', stopDrawingLine);
    canvas.selection = false;
    canvas.hoverCursor = 'auto';
    canvas.isDrawingMode = false;
    canvas.getObjects().map(item => item.set({
      selectable: false
    }));
    canvas.discardActiveObject().requestRenderAll();
  }
};

const startAddLine = canvas => {
  return _ref => {
    let {
      e
    } = _ref;
    mouseDown = true;
    let pointer = canvas.getPointer(e);
    drawInstance = new _fabric.fabric.Line([pointer.x, pointer.y, pointer.x, pointer.y], {
      strokeWidth: options.currentWidth,
      stroke: options.currentColor,
      selectable: false
    });
    canvas.add(drawInstance);
    canvas.requestRenderAll();
  };
};

const startDrawingLine = canvas => {
  return _ref2 => {
    let {
      e
    } = _ref2;

    if (mouseDown) {
      const pointer = canvas.getPointer(e);
      drawInstance.set({
        x2: pointer.x,
        y2: pointer.y
      });
      drawInstance.setCoords();
      canvas.requestRenderAll();
    }
  };
};

const stopDrawingLine = () => {
  mouseDown = false;
};
/* ==== rectangle ==== */


const createRect = canvas => {
  if (options.currentMode !== modes.RECTANGLE) {
    options.currentMode = modes.RECTANGLE;
    canvas.off('mouse:down');
    canvas.off('mouse:move');
    canvas.off('mouse:up');
    canvas.on('mouse:down', startAddRect(canvas));
    canvas.on('mouse:move', startDrawingRect(canvas));
    canvas.on('mouse:up', stopDrawingRect);
    canvas.selection = false;
    canvas.hoverCursor = 'auto';
    canvas.isDrawingMode = false;
    canvas.getObjects().map(item => item.set({
      selectable: false
    }));
    canvas.discardActiveObject().requestRenderAll();
  }
};

const startAddRect = canvas => {
  return _ref3 => {
    let {
      e
    } = _ref3;
    mouseDown = true;
    const pointer = canvas.getPointer(e);
    origX = pointer.x;
    origY = pointer.y;
    drawInstance = new _fabric.fabric.Rect({
      stroke: options.currentColor,
      strokeWidth: options.currentWidth,
      fill: options.fill ? options.currentColor : 'transparent',
      left: origX,
      top: origY,
      width: 0,
      height: 0,
      selectionBackgroundColor: 'rgba(245, 245, 220, 0.5)',
      selectable: false
    });
    canvas.add(drawInstance);
    drawInstance.on('mousedown', e => {
      if (options.currentMode === modes.ERASER) {
        console.log('刪除', e);
        canvas.remove(e.target);
      }
    });
  };
};

const startDrawingRect = canvas => {
  return _ref4 => {
    let {
      e
    } = _ref4;

    if (mouseDown) {
      const pointer = canvas.getPointer(e);

      if (pointer.x < origX) {
        drawInstance.set('left', pointer.x);
      }

      if (pointer.y < origY) {
        drawInstance.set('top', pointer.y);
      }

      drawInstance.set({
        width: Math.abs(pointer.x - origX),
        height: Math.abs(pointer.y - origY)
      });
      drawInstance.setCoords();
      canvas.renderAll();
    }
  };
};

const stopDrawingRect = () => {
  mouseDown = false;
};
/* ==== Ellipse ==== */


const createEllipse = canvas => {
  if (options.currentMode !== modes.ELLIPSE) {
    options.currentMode = modes.ELLIPSE;
    canvas.off('mouse:down');
    canvas.off('mouse:move');
    canvas.off('mouse:up');
    canvas.on('mouse:down', startAddEllipse(canvas));
    canvas.on('mouse:move', startDrawingEllipse(canvas));
    canvas.on('mouse:up', stopDrawingEllipse);
    canvas.selection = false;
    canvas.hoverCursor = 'auto';
    canvas.isDrawingMode = false;
    canvas.getObjects().map(item => item.set({
      selectable: false
    }));
    canvas.discardActiveObject().requestRenderAll();
  }
};

const startAddEllipse = canvas => {
  return _ref5 => {
    let {
      e
    } = _ref5;
    mouseDown = true;
    const pointer = canvas.getPointer(e);
    origX = pointer.x;
    origY = pointer.y;
    drawInstance = new _fabric.fabric.Ellipse({
      stroke: options.currentColor,
      strokeWidth: options.currentWidth,
      fill: options.fill ? options.currentColor : 'transparent',
      left: origX,
      top: origY,
      cornerSize: 7,
      objectCaching: false,
      selectionBackgroundColor: 'rgba(245, 245, 220, 0.5)',
      selectable: false
    });
    canvas.add(drawInstance);
  };
};

const startDrawingEllipse = canvas => {
  return _ref6 => {
    let {
      e
    } = _ref6;

    if (mouseDown) {
      const pointer = canvas.getPointer(e);

      if (pointer.x < origX) {
        drawInstance.set('left', pointer.x);
      }

      if (pointer.y < origY) {
        drawInstance.set('top', pointer.y);
      }

      drawInstance.set({
        rx: Math.abs(pointer.x - origX) / 2,
        ry: Math.abs(pointer.y - origY) / 2
      });
      drawInstance.setCoords();
      canvas.renderAll();
    }
  };
};

const stopDrawingEllipse = () => {
  mouseDown = false;
};
/* === triangle === */


const createTriangle = canvas => {
  canvas.off('mouse:down');
  canvas.off('mouse:move');
  canvas.off('mouse:up');
  canvas.on('mouse:down', startAddTriangle(canvas));
  canvas.on('mouse:move', startDrawingTriangle(canvas));
  canvas.on('mouse:up', stopDrawingTriangle);
  canvas.selection = false;
  canvas.hoverCursor = 'auto';
  canvas.isDrawingMode = false;
  canvas.getObjects().map(item => item.set({
    selectable: false
  }));
  canvas.discardActiveObject().requestRenderAll();
};

const startAddTriangle = canvas => {
  return _ref7 => {
    let {
      e
    } = _ref7;
    mouseDown = true;
    options.currentMode = modes.TRIANGLE;
    const pointer = canvas.getPointer(e);
    origX = pointer.x;
    origY = pointer.y;
    drawInstance = new _fabric.fabric.Triangle({
      stroke: options.currentColor,
      strokeWidth: options.currentWidth,
      fill: options.fill ? options.currentColor : 'transparent',
      left: origX,
      top: origY,
      width: 0,
      height: 0,
      selectionBackgroundColor: 'rgba(245, 245, 220, 0.5)',
      selectable: false
    });
    canvas.add(drawInstance);
  };
};

const startDrawingTriangle = canvas => {
  return _ref8 => {
    let {
      e
    } = _ref8;

    if (mouseDown) {
      const pointer = canvas.getPointer(e);

      if (pointer.x < origX) {
        drawInstance.set('left', pointer.x);
      }

      if (pointer.y < origY) {
        drawInstance.set('top', pointer.y);
      }

      drawInstance.set({
        width: Math.abs(pointer.x - origX),
        height: Math.abs(pointer.y - origY)
      });
      drawInstance.setCoords();
      canvas.renderAll();
    }
  };
};

const stopDrawingTriangle = () => {
  mouseDown = false;
};

const createText = canvas => {
  canvas.off('mouse:down');
  canvas.off('mouse:move');
  canvas.off('mouse:up');
  canvas.isDrawingMode = false;
  const text = new _fabric.fabric.Textbox('text', {
    left: 100,
    top: 100,
    fill: options.currentColor,
    editable: true
  });
  canvas.add(text);
  canvas.renderAll();
};

const changeToErasingMode = canvas => {
  if (options.currentMode !== modes.ERASER) {
    canvas.off('mouse:down');
    canvas.off('mouse:move');
    canvas.off('mouse:up');
    options.currentMode = modes.ERASER;
    canvas.freeDrawingBrush = new _fabric.fabric.EraserBrush(canvas);
    canvas.freeDrawingBrush.width = options.currentWidth;
    canvas.isDrawingMode = true;
  }
};

const onSelectMode = canvas => {
  options.currentMode = '';
  canvas.isDrawingMode = false;
  canvas.off('mouse:down');
  canvas.off('mouse:move');
  canvas.off('mouse:up');
  canvas.getObjects().map(item => item.set({
    selectable: true
  }));
  canvas.hoverCursor = 'all-scroll';
};

const clearCanvas = canvas => {
  canvas.getObjects().forEach(item => {
    if (item !== canvas.backgroundImage) {
      canvas.remove(item);
    }
  });
};

const canvasToJson = canvas => {
  alert(JSON.stringify(canvas.toJSON()));
};

const draw = canvas => {
  if (options.currentMode !== modes.PENCIL) {
    canvas.off('mouse:down');
    canvas.off('mouse:move');
    canvas.off('mouse:up');
    options.currentMode = modes.PENCIL;
    canvas.freeDrawingBrush = new _fabric.fabric.PencilBrush(canvas);
    canvas.freeDrawingBrush.width = parseInt(options.currentWidth, 10) || 1;
    canvas.isDrawingMode = true;
  }
};

const Whiteboard = () => {
  const {
    fileReader
  } = (0, _reactRedux.useSelector)(state => state);
  const [canvas, setCanvas] = (0, _react.useState)(null);
  const [canvasJSON, setCanvasJSON] = (0, _react.useState)(null);
  const [brushWidth, setBrushWidth] = (0, _react.useState)(5);
  const [isFill, setIsFill] = (0, _react.useState)(false);
  const fileUploadRef = (0, _react.useRef)(null);
  const canvasRef = (0, _react.useRef)(null);
  (0, _react.useEffect)(() => {
    setCanvas(() => initCanvas());
  }, []);
  (0, _react.useEffect)(() => {
    if (canvas) {
      const center = canvas.getCenter();

      _fabric.fabric.Image.fromURL(fileReader.currentPage, img => {
        const imgWidth = img.getBoundingRect().width;
        const imgHeight = img.getBoundingRect().height; // 判斷 pdf 橫直向

        if (imgWidth > imgHeight) {
          img.scaleToWidth(canvas.width);
        }

        if (imgWidth < imgHeight) {
          img.scaleToHeight(canvas.height);
        }

        canvas.setBackgroundImage(img, canvas.renderAll.bind(canvas), {
          top: center.top,
          left: center.left,
          originX: 'center',
          originY: 'center'
        });
        canvas.renderAll();
      });
    }
  }, [fileReader.currentPage]);
  (0, _react.useEffect)(() => {
    if (canvas) {
      addCanvasEventListeners(canvas);
      canvas.loadFromJSON(canvasJSON);
      canvas.renderAll();
    }
  }, [canvas]);

  const addCanvasEventListeners = canvas => {
    canvas.on('mouse:up', event => {
      const data = JSON.stringify(canvas.toJSON());
    });
  };

  const uploadImage = e => {
    const reader = new FileReader();
    const file = e.files[0];
    reader.addEventListener('load', () => {
      _fabric.fabric.Image.fromURL(reader.result, img => {
        canvas.add(img);
      });
    });
    reader.readAsDataURL(file);
  };

  const changeCurrentWidth = e => {
    const intValue = parseInt(e.target.value);
    options.currentWidth = intValue;
    canvas.freeDrawingBrush.width = intValue;
    setBrushWidth(() => intValue);
  };

  const changeCurrentColor = e => {
    options.currentColor = e.target.value;
    canvas.freeDrawingBrush.color = e.target.value;
  };

  const changeFill = e => {
    options.fill = e.checked;
    setIsFill(() => e.checked);
  };

  const onSaveCanvasAsImage = () => {
    canvasRef.current.toBlob(function (blob) {
      (0, _fileSaver.saveAs)(blob, 'image.png');
    });
  };

  return /*#__PURE__*/_react.default.createElement("div", {
    className: _indexModule.default.whiteboard
  }, /*#__PURE__*/_react.default.createElement("div", {
    className: _indexModule.default.toolbar
  }, /*#__PURE__*/_react.default.createElement("button", {
    className: "p-button-info",
    onClick: () => createLine(canvas)
  }, /*#__PURE__*/_react.default.createElement(_line.ReactComponent, null)), /*#__PURE__*/_react.default.createElement("button", {
    className: "p-button-info",
    onClick: () => createRect(canvas)
  }, /*#__PURE__*/_react.default.createElement(_rectangle.ReactComponent, null)), /*#__PURE__*/_react.default.createElement("button", {
    className: "p-button-info",
    onClick: () => createEllipse(canvas)
  }, /*#__PURE__*/_react.default.createElement(_ellipse.ReactComponent, null)), /*#__PURE__*/_react.default.createElement("button", {
    className: "p-button-info",
    onClick: () => createTriangle(canvas, options)
  }, /*#__PURE__*/_react.default.createElement(_triangle.ReactComponent, null)), /*#__PURE__*/_react.default.createElement("button", {
    icon: "pi pi-pencil",
    className: "p-button-info",
    onClick: () => draw(canvas)
  }, /*#__PURE__*/_react.default.createElement(_pencil.ReactComponent, null)), /*#__PURE__*/_react.default.createElement("button", {
    className: "p-button-info",
    onClick: () => changeToErasingMode(canvas)
  }, /*#__PURE__*/_react.default.createElement(_eraser.ReactComponent, null)), /*#__PURE__*/_react.default.createElement("button", {
    className: "p-button-secondary",
    onClick: () => createText(canvas)
  }, /*#__PURE__*/_react.default.createElement(_text.ReactComponent, null)), /*#__PURE__*/_react.default.createElement("button", {
    className: "p-button-secondary",
    onClick: () => onSelectMode(canvas)
  }, /*#__PURE__*/_react.default.createElement(_select.ReactComponent, null)), /*#__PURE__*/_react.default.createElement("input", {
    className: "p-button-info p-button-rounded",
    type: "color",
    onChange: changeCurrentColor
  }), /*#__PURE__*/_react.default.createElement("input", {
    type: "range",
    min: 1,
    max: 20,
    step: 1,
    value: brushWidth,
    onChange: changeCurrentWidth
  }), /*#__PURE__*/_react.default.createElement(_checkbox.Checkbox, {
    id: "fill",
    checked: isFill,
    onChange: changeFill
  }), /*#__PURE__*/_react.default.createElement("label", {
    htmlFor: "fill"
  }, "fill"), /*#__PURE__*/_react.default.createElement("button", {
    className: "p-button-info p-button-rounded",
    onClick: () => clearCanvas(canvas)
  }, /*#__PURE__*/_react.default.createElement(_sweeping.ReactComponent, null)), /*#__PURE__*/_react.default.createElement("button", {
    className: "p-button-info p-button-rounded",
    onClick: () => canvasToJson(canvas)
  }, "To Json"), /*#__PURE__*/_react.default.createElement(_fileupload.FileUpload, {
    ref: fileUploadRef,
    multiple: false,
    name: "demo[]",
    url: "https://primefaces.org/primereact/showcase/upload.php",
    onUpload: uploadImage,
    accept: "image/*",
    chooseOptions: chooseOptions,
    mode: "basic",
    auto: true,
    chooseLabel: "Image"
  }), /*#__PURE__*/_react.default.createElement("button", {
    icon: "pi pi-download",
    className: "p-button-info p-button-rounded",
    onClick: onSaveCanvasAsImage
  }, "save as image")), /*#__PURE__*/_react.default.createElement("canvas", {
    ref: canvasRef,
    id: "canvas"
  }), /*#__PURE__*/_react.default.createElement(_PdfReader.default, null));
};

var _default = Whiteboard;
exports.default = _default;