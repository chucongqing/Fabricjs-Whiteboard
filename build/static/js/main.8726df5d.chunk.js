(this["webpackJsonpreact-fabricjs-whiteboard"]=this["webpackJsonpreact-fabricjs-whiteboard"]||[]).push([[0],{24:function(e,t,n){e.exports={whiteboard:"Whiteboard_whiteboard__34LM6",toolbar:"Whiteboard_toolbar__34zob",dropdownButton:"Whiteboard_dropdownButton__2PgvL",uploadDropdown:"Whiteboard_uploadDropdown__3UwM8",dropdownContent:"Whiteboard_dropdownContent__1klP3"}},26:function(e,t,n){e.exports={pdfReader:"PdfReader_pdfReader__3P8qq",fileContainer:"PdfReader_fileContainer__2gJs-",pageInfo:"PdfReader_pageInfo__27lCr"}},39:function(e,t){},41:function(e,t,n){e.exports={app:"app_app__3mk8F"}},47:function(e,t,n){},52:function(e,t){},53:function(e,t){},54:function(e,t){},56:function(e,t){},57:function(e,t){},58:function(e,t){},59:function(e,t){},60:function(e,t){},63:function(e,t,n){"use strict";n.r(t);var r=n(1),o=n(40),c=n.n(o),i=n(35),a=n(15),u=n(16),s=n(37),l=n(36),d=n(26),f=n.n(d),b=n(4);l.a.GlobalWorkerOptions.workerSrc="//cdnjs.cloudflare.com/ajax/libs/pdf.js/".concat(l.a.version,"/pdf.worker.js");var j,p,g=function(e){var t=e.fileReaderInfo,n=e.updateFileReaderInfo;function r(e){n({currentPageNumber:t.currentPageNumber+e})}return Object(b.jsxs)("div",{className:f.a.pdfReader,children:[Object(b.jsx)("div",{className:f.a.fileContainer,children:Object(b.jsx)(s.a,{className:f.a.document,file:t.file,onLoadSuccess:function(e){var t=e.numPages;n({totalPages:t})},onLoadProgress:function(e){var t=e.loaded,n=e.total;return console.log("Loading a document: "+t/n*100+"%")},children:Object(b.jsx)(s.b,{className:"import-pdf-page",onRenderSuccess:function(){var e=document.querySelector(".import-pdf-page canvas").toDataURL();n({currentPage:e})},pageNumber:t.currentPageNumber})})}),Object(b.jsxs)("div",{className:f.a.pageInfo,children:[Object(b.jsxs)("span",{children:["Page ",t.currentPageNumber," of ",t.totalPages||"--"]}),Object(b.jsx)("button",{type:"button",disabled:t.currentPageNumber<=1,onClick:function(){return r(-1)},children:"Previous"}),Object(b.jsx)("button",{type:"button",disabled:t.currentPageNumber>=t.totalPages,onClick:function(){return r(1)},children:"Next"})]})]})},h=n(42),m=n.p+"static/media/remove.30a74efc.svg",O=function(e){return"eraser"===e.type?m:""},v=n.p+"static/media/select.ad97be73.svg",x=n.p+"static/media/eraser.6834b010.svg",C=n.p+"static/media/text.abecf614.svg",w=n.p+"static/media/rectangle.55957e34.svg",y=n.p+"static/media/line.8231e012.svg",E=n.p+"static/media/ellipse.8c29c164.svg",R=n.p+"static/media/triangle.58a0a70e.svg",P=n.p+"static/media/pencil.eda8d85b.svg",k=n.p+"static/media/delete.f634ca67.svg",N=n(24),A=n.n(N),L=null,M=!1,I={currentMode:"",currentColor:"#000000",currentWidth:5,fill:!1,group:{}},_={RECTANGLE:"RECTANGLE",TRIANGLE:"TRIANGLE",ELLIPSE:"ELLIPSE",LINE:"LINE",PENCIL:"PENCIL",ERASER:"ERASER"};function S(e){return function(t){I.currentMode===_.ERASER&&e.remove(t.target)}}function D(){M=!1}function W(e){e.off("mouse:down"),e.off("mouse:move"),e.off("mouse:up")}function T(e){_.currentMode!==_.LINE&&(I.currentMode=_.LINE,W(e),e.on("mouse:down",function(e){return function(t){var n=t.e;M=!0;var r=e.getPointer(n);L=new u.fabric.Line([r.x,r.y,r.x,r.y],{strokeWidth:I.currentWidth,stroke:I.currentColor,selectable:!1}),e.add(L),e.requestRenderAll()}}(e)),e.on("mouse:move",function(e){return function(t){var n=t.e;if(M){var r=e.getPointer(n);L.set({x2:r.x,y2:r.y}),L.setCoords(),e.requestRenderAll()}}}(e)),e.on("mouse:up",D),e.selection=!1,e.hoverCursor="auto",e.isDrawingMode=!1,e.getObjects().map((function(e){return e.set({selectable:!1})})),e.discardActiveObject().requestRenderAll())}function q(e){I.currentMode!==_.RECTANGLE&&(I.currentMode=_.RECTANGLE,W(e),e.on("mouse:down",function(e){return function(t){var n=t.e;M=!0;var r=e.getPointer(n);j=r.x,p=r.y,L=new u.fabric.Rect({stroke:I.currentColor,strokeWidth:I.currentWidth,fill:I.fill?I.currentColor:"transparent",left:j,top:p,width:0,height:0,selectable:!1}),e.add(L),L.on("mousedown",(function(t){I.currentMode===_.ERASER&&(console.log("\u522a\u9664",t),e.remove(t.target))}))}}(e)),e.on("mouse:move",function(e){return function(t){var n=t.e;if(M){var r=e.getPointer(n);r.x<j&&L.set("left",r.x),r.y<p&&L.set("top",r.y),L.set({width:Math.abs(r.x-j),height:Math.abs(r.y-p)}),L.setCoords(),e.renderAll()}}}(e)),e.on("mouse:up",D),e.selection=!1,e.hoverCursor="auto",e.isDrawingMode=!1,e.getObjects().map((function(e){return e.set({selectable:!1})})),e.discardActiveObject().requestRenderAll())}function B(e){I.currentMode!==_.ELLIPSE&&(I.currentMode=_.ELLIPSE,W(e),e.on("mouse:down",function(e){return function(t){var n=t.e;M=!0;var r=e.getPointer(n);j=r.x,p=r.y,L=new u.fabric.Ellipse({stroke:I.currentColor,strokeWidth:I.currentWidth,fill:I.fill?I.currentColor:"transparent",left:j,top:p,cornerSize:7,objectCaching:!1,selectable:!1}),e.add(L)}}(e)),e.on("mouse:move",function(e){return function(t){var n=t.e;if(M){var r=e.getPointer(n);r.x<j&&L.set("left",r.x),r.y<p&&L.set("top",r.y),L.set({rx:Math.abs(r.x-j)/2,ry:Math.abs(r.y-p)/2}),L.setCoords(),e.renderAll()}}}(e)),e.on("mouse:up",D),e.selection=!1,e.hoverCursor="auto",e.isDrawingMode=!1,e.getObjects().map((function(e){return e.set({selectable:!1})})),e.discardActiveObject().requestRenderAll())}function G(e){W(e),e.on("mouse:down",function(e){return function(t){var n=t.e;M=!0,I.currentMode=_.TRIANGLE;var r=e.getPointer(n);j=r.x,p=r.y,L=new u.fabric.Triangle({stroke:I.currentColor,strokeWidth:I.currentWidth,fill:I.fill?I.currentColor:"transparent",left:j,top:p,width:0,height:0,selectable:!1}),e.add(L)}}(e)),e.on("mouse:move",function(e){return function(t){var n=t.e;if(M){var r=e.getPointer(n);r.x<j&&L.set("left",r.x),r.y<p&&L.set("top",r.y),L.set({width:Math.abs(r.x-j),height:Math.abs(r.y-p)}),L.setCoords(),e.renderAll()}}}(e)),e.on("mouse:up",D),e.selection=!1,e.hoverCursor="auto",e.isDrawingMode=!1,e.getObjects().map((function(e){return e.set({selectable:!1})})),e.discardActiveObject().requestRenderAll()}var F=function(){var e=Object(r.useState)(null),t=Object(a.a)(e,2),n=t[0],o=t[1],c=Object(r.useState)(5),s=Object(a.a)(c,2),l=s[0],d=s[1],f=Object(r.useState)(!1),j=Object(a.a)(f,2),p=j[0],m=j[1],N=Object(r.useState)({file:"",totalPages:null,currentPageNumber:1,currentPage:""}),L=Object(a.a)(N,2),M=L[0],D=L[1],F=Object(r.useRef)(null),J=Object(r.useRef)(null),U=Object(r.useRef)(null);function z(e){D(Object(i.a)(Object(i.a)({},M),e))}return Object(r.useEffect)((function(){n||o((function(){return function(){var e=new u.fabric.Canvas("canvas",{height:600,width:800});return u.fabric.Object.prototype.transparentCorners=!1,u.fabric.Object.prototype.cornerStyle="circle",u.fabric.Object.prototype.borderColor="#4447A9",u.fabric.Object.prototype.cornerColor="#4447A9",u.fabric.Object.prototype.cornerSize=6,u.fabric.Object.prototype.padding=10,u.fabric.Object.prototype.borderDashArray=[5,5],e.on("object:added",(function(t){t.target.on("mousedown",S(e))})),e.on("path:created",(function(t){t.path.on("mousedown",S(e))})),e}()}))}),[]),Object(r.useEffect)((function(){if(n){var e=n.getCenter();u.fabric.Image.fromURL(M.currentPage,(function(t){t.scaleToHeight(n.height),n.setBackgroundImage(t,n.renderAll.bind(n),{top:e.top,left:e.left,originX:"center",originY:"center"}),n.renderAll()}))}}),[M.currentPage]),Object(b.jsxs)("div",{className:A.a.whiteboard,children:[Object(b.jsxs)("div",{className:A.a.toolbar,children:[Object(b.jsx)("button",{type:"button",onClick:function(){return T(n)},children:Object(b.jsx)("img",{src:y,alt:"line"})}),Object(b.jsx)("button",{type:"button",onClick:function(){return q(n)},children:Object(b.jsx)("img",{src:w,alt:"Rectangle"})}),Object(b.jsx)("button",{type:"button",onClick:function(){return B(n)},children:Object(b.jsx)("img",{src:E,alt:"Ellipse"})}),Object(b.jsx)("button",{type:"button",onClick:function(){return G(n)},children:Object(b.jsx)("img",{src:R,alt:"Triangle"})}),Object(b.jsx)("button",{type:"button",onClick:function(){return function(e){I.currentMode!==_.PENCIL&&(W(e),I.currentMode=_.PENCIL,e.freeDrawingBrush.width=parseInt(I.currentWidth,10)||1,e.isDrawingMode=!0)}(n)},children:Object(b.jsx)("img",{src:P,alt:"Pencil"})}),Object(b.jsx)("button",{type:"button",onClick:function(){return function(e){W(e),e.isDrawingMode=!1;var t=new u.fabric.Textbox("text",{left:100,top:100,fill:I.currentColor,editable:!0});e.add(t),e.renderAll()}(n)},children:Object(b.jsx)("img",{src:C,alt:"Text"})}),Object(b.jsx)("button",{type:"button",onClick:function(){return function(e){I.currentMode="",e.isDrawingMode=!1,W(e),e.getObjects().map((function(e){return e.set({selectable:!0})})),e.hoverCursor="all-scroll"}(n)},children:Object(b.jsx)("img",{src:v,alt:"Selection mode"})}),Object(b.jsx)("button",{type:"button",onClick:function(){return function(e){I.currentMode!==_.ERASER&&(W(e),e.isDrawingMode=!1,I.currentMode=_.ERASER,e.hoverCursor="url(".concat(O({type:"eraser"}),"), default"))}(n)},children:Object(b.jsx)("img",{src:x,alt:"Eraser"})}),Object(b.jsx)("button",{type:"button",onClick:function(){return function(e){e.getObjects().forEach((function(t){t!==e.backgroundImage&&e.remove(t)}))}(n)},children:Object(b.jsx)("img",{src:k,alt:"Delete"})}),Object(b.jsxs)("div",{children:[Object(b.jsx)("input",{type:"checkbox",name:"fill",id:"fill",checked:p,onChange:function(e){I.fill=e.target.checked,m((function(){return e.target.checked}))}}),Object(b.jsx)("label",{htmlFor:"fill",children:"fill"})]}),Object(b.jsx)("div",{children:Object(b.jsx)("input",{type:"color",name:"color",id:"color",onChange:function(e){I.currentColor=e.target.value,n.freeDrawingBrush.color=e.target.value}})}),Object(b.jsx)("input",{type:"range",min:1,max:20,step:1,value:l,onChange:function(e){var t=parseInt(e.target.value);I.currentWidth=t,n.freeDrawingBrush.width=t,d((function(){return t}))}}),Object(b.jsxs)("div",{className:A.a.uploadDropdown,children:[Object(b.jsx)("input",{ref:J,accept:"image/*",type:"file",onChange:function(e){var t=new FileReader,r=e.target.files[0];t.addEventListener("load",(function(){u.fabric.Image.fromURL(t.result,(function(e){e.scaleToHeight(n.height),n.add(e)}))})),t.readAsDataURL(r)}}),Object(b.jsx)("input",{ref:U,accept:".pdf",type:"file",onChange:function(e){z({file:e.target.files[0],currentPageNumber:1})}}),Object(b.jsx)("button",{className:A.a.dropdownButton,children:"+Upload"}),Object(b.jsxs)("div",{className:A.a.dropdownContent,children:[Object(b.jsx)("span",{onClick:function(){return J.current.click()},children:"Image"}),Object(b.jsx)("span",{onClick:function(){return U.current.click()},children:"PDF"})]})]}),Object(b.jsx)("button",{onClick:function(){return function(e){alert(JSON.stringify(e.toJSON()))}(n)},children:"To Json"}),Object(b.jsx)("button",{onClick:function(){F.current.toBlob((function(e){Object(h.saveAs)(e,"image.png")}))},children:"Save as image"})]}),Object(b.jsx)("canvas",{ref:F,id:"canvas"}),Object(b.jsx)("div",{children:Object(b.jsx)(g,{fileReaderInfo:M,updateFileReaderInfo:z})})]})},J=function(){return Object(b.jsx)(F,{})},U=n(41),z=n.n(U),H=function(){return Object(b.jsx)("div",{className:z.a.app,children:Object(b.jsx)(J,{})})};n(47);c.a.render(Object(b.jsx)(H,{}),document.getElementById("root"))}},[[63,1,2]]]);