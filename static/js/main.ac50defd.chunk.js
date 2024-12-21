(this["webpackJsonphomography-app"]=this["webpackJsonphomography-app"]||[]).push([[0],{100:function(e,t,a){e.exports=a(120)},106:function(e,t,a){},115:function(e,t){},116:function(e,t){},117:function(e,t){},120:function(e,t,a){"use strict";a.r(t);var n=a(0),r=a.n(n),l=a(80),o=a.n(l),i=(a(106),a(174)),c=a(181),s=a(180),m=a(59),d=a(129),p=a(182),g=a(183),u=a(83),f=a(179),h=a(87);var y=function(e){let{onImageUpload:t}=e;return r.a.createElement(m.a,{display:"flex",justifyContent:"center"},r.a.createElement("input",{accept:"image/*",style:{display:"none"},id:"image-upload-input",type:"file",onChange:e=>{if(e.target.files&&e.target.files[0]){const a=e.target.files[0],n=URL.createObjectURL(a);t(n)}}}),r.a.createElement("label",{htmlFor:"image-upload-input"},r.a.createElement(h.a,{variant:"contained",color:"primary",component:"span"},"Upload Image")))},b=a(70),E=a(82),v=a.n(E),w=a(177);var x=function(e){let{open:t,onClose:a}=e;return r.a.createElement(w.a,{open:t,onClose:a},r.a.createElement(m.a,{display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",p:4,bgcolor:"background.paper",borderRadius:"8px",style:{width:"80%",margin:"auto",marginTop:"10%"}},r.a.createElement(d.a,{variant:"h5",gutterBottom:!0},"Homography and Matrix Transformation"),r.a.createElement(d.a,{variant:"body1",paragraph:!0},"Homography is a transformation that maps points from one plane to another using matrix multiplication. In this app, we calculate the homography matrix based on your selected points, allowing you to see the perspective transformation in real-time.")))},j=a(175),C=a(176);var I=function(){const[e,t]=Object(n.useState)("light"),[a,l]=Object(n.useState)(!1),[o,h]=Object(n.useState)(""),[E,w]=Object(n.useState)(null),I=(Object(i.a)("(prefers-color-scheme: dark)"),Object(n.useRef)(null)),k=Object(n.useRef)(null),O=Object(u.a)({palette:{mode:e}});return r.a.createElement(f.a,{theme:O},r.a.createElement(c.a,null),r.a.createElement(s.a,{maxWidth:"md"},r.a.createElement(m.a,{display:"flex",justifyContent:"center",alignItems:"center",my:4},r.a.createElement(d.a,{variant:"h4",align:"center",gutterBottom:!0},"Homography Transformation for Art Images"),r.a.createElement(p.a,{onClick:()=>l(!0),color:"inherit",style:{marginLeft:10}},r.a.createElement(v.a,null)),r.a.createElement(p.a,{onClick:()=>{t(e=>"light"===e?"dark":"light")},color:"inherit",style:{marginLeft:10}},"dark"===e?r.a.createElement(j.a,null):r.a.createElement(C.a,null))),r.a.createElement(d.a,{variant:"body1",align:"center",gutterBottom:!0},"Select an image from the options below (or upload), select exactly 4 points to define a quadrilateral, and see the perspective transformation!"),r.a.createElement(m.a,{display:"flex",justifyContent:"center",gap:2,my:4},["./additional_data/Sistinechapel.jpg","./additional_data/pierro_della.jpg","./additional_data/veneziano.jpg"].map((e,t)=>r.a.createElement(m.a,{key:t,onClick:()=>(e=>{h(e),setTimeout(()=>{I.current&&I.current.scrollIntoView({behavior:"smooth",block:"center"})},100)})(e),border:o===e?"4px solid #1976d2":"4px solid transparent",borderRadius:2,style:{cursor:"pointer",padding:2,alignItems:"center",transition:"border-color 0.3s"}},r.a.createElement("img",{src:e,alt:"Art Image "+(t+1),style:{width:250,height:250,objectFit:"cover",borderRadius:4,alignItems:"center"}}))),r.a.createElement(m.a,{mx:4,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center",style:{flexShrink:0,width:"40px"}},r.a.createElement(g.a,{orientation:"vertical",style:{height:"40%",backgroundColor:"#aaa"}}),r.a.createElement(d.a,{variant:"body1",style:{margin:"8px 0",lineHeight:1,pointerEvents:"none"}},"OR"),r.a.createElement(g.a,{orientation:"vertical",style:{height:"40%",backgroundColor:"#aaa"}})),r.a.createElement(m.a,{display:"flex",justifyContent:"center",alignItems:"center"},r.a.createElement(y,{onImageUpload:e=>{w(e),setTimeout(()=>{k.current&&k.current.scrollIntoView({behavior:"smooth",block:"center"})},100)}}))),E&&r.a.createElement(m.a,{mt:4,ref:k},r.a.createElement(b.a,{image:E})),o&&r.a.createElement(m.a,{mt:4,ref:I},r.a.createElement(b.a,{image:o})),r.a.createElement(x,{open:a,onClose:()=>l(!1)})))};var k=e=>{e&&e instanceof Function&&a.e(3).then(a.bind(null,184)).then(t=>{let{getCLS:a,getFID:n,getFCP:r,getLCP:l,getTTFB:o}=t;a(e),n(e),r(e),l(e),o(e)})};o.a.createRoot(document.getElementById("root")).render(r.a.createElement(r.a.StrictMode,null,r.a.createElement(I,null))),k()},70:function(e,t,a){"use strict";(function(e){var n=a(0),r=a.n(n),l=a(59),o=a(129),i=a(87),c=a(130),s=a(71),m=a(128);t.a=function(t){let{image:a}=t;const{editor:d,onReady:p}=Object(s.b)(),[g,u]=Object(n.useState)([]),[f,h]=Object(n.useState)(!1),[y,b]=Object(n.useState)(null),[E,v]=Object(n.useState)(!1),w=Object(n.useRef)(null);let x=1;return Object(n.useEffect)(()=>{if(d&&a){const e=new window.Image;e.src=a,e.onload=()=>{x=Math.min(800/e.width,600/e.height,1);const t=e.width*x,a=e.height*x;d.canvas.clear(),d.canvas.setWidth(t),d.canvas.setHeight(a),d.canvas.setBackgroundImage(new window.fabric.Image(e,{scaleX:x,scaleY:x,originX:"center",originY:"center",left:t/2,top:a/2}),d.canvas.renderAll.bind(d.canvas));const n=[];d.canvas.on("mouse:down",(function(e){if(e.pointer&&n.length<4){const{x:t,y:a}=e.pointer,r=new window.fabric.Circle({radius:5,fill:"red",left:t,top:a,selectable:!1,originX:"center",originY:"center"});d.canvas.add(r);const l=t/x,o=a/x;if(n.push([l,o]),n.length>1){const e=new window.fabric.Line([n[n.length-2][0]*x,n[n.length-2][1]*x,t,a],{stroke:"blue",selectable:!1});d.canvas.add(e)}if(4===n.length){u(n),h(!0);const e=new window.fabric.Line([t,a,n[0][0]*x,n[0][1]*x],{stroke:"blue",selectable:!1});d.canvas.add(e)}}}))}}},[d,a]),r.a.createElement(l.a,{mt:2,display:"flex",flexDirection:"column",alignItems:"center",justifyContent:"center"},g.length<4&&r.a.createElement(o.a,{variant:"body1",color:"error",style:{marginBottom:"8px",fontWeight:"bold"}},"Please select exactly 4 points to define a quadrilateral"),r.a.createElement(s.a,{ref:w,className:"canvas",onReady:p,style:{border:"1px solid #ddd",width:"800px",height:"600px"}}),r.a.createElement(l.a,{mt:2,display:"flex",alignItems:"center"},r.a.createElement(i.a,{variant:"contained",color:"primary",onClick:async()=>{if(4===g.length){v(!0);try{const t=await fetch(a),n=await t.blob(),r=new File([n],"image.jpg",{type:"image/jpeg"}),l=new FormData;l.append("file",r),l.append("points",JSON.stringify(g));const o=await m.a.post("http://localhost:8000/transform",l);if(o.data.image){const t=Uint8Array.from(e.from(o.data.image,"hex")),a=new Blob([t],{type:"image/jpeg"}),n=URL.createObjectURL(a);b(n)}else alert("Transformation failed.")}catch(t){console.error(t),alert("An error occurred during transformation.")}finally{v(!1)}}else alert("Please select exactly 4 points.")},disabled:4!==g.length||E,style:{marginRight:"10px"}},"Transform Image"),r.a.createElement(i.a,{variant:"outlined",color:"secondary",onClick:()=>{d&&(d.canvas.clear(),u([]),h(!1),b(null))},disabled:E},"Reset"),E&&r.a.createElement(l.a,{ml:2},r.a.createElement(c.a,{size:24}))),y&&r.a.createElement(l.a,{mt:2},r.a.createElement("img",{src:y,alt:"Transformed",style:{width:"100%",marginTop:"10px"}})))}}).call(this,a(64).Buffer)}},[[100,1,2]]]);
//# sourceMappingURL=main.ac50defd.chunk.js.map