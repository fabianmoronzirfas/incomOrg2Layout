﻿//~ if (app.selection.length == 2) 	main();  function main() { 	var c1 = app.activeDocument.ovals.item(0);//; app.selection[0]; 	var c2 = app.activeDocument.ovals.item(1); 	 	var gb = c1.geometricBounds; 	var r1 = (gb[3]-gb[1])/2; 	var x1 = gb[1]+r1; 	var y1 = gb[0]+r1; 	 	gb = c2.geometricBounds; 	var r2 = (gb[3]-gb[1])/2; 	 	var x2 = gb[1]+r2; 	var y2 = gb[0]+r2;  	var gl = c1.parent.graphicLines.add(); 	gl.paths[0].pathPoints[0].anchor  = [x1,y1]; 	gl.paths[0].pathPoints[1].anchor = [x2,y2];     gl.paths[0].pathPoints[0].leftDirection = [x1- 100,y1]//~     gl.paths[0].pathPoints[0].rightDirection = [x1 + 100,y1]     gl.paths[0].pathPoints[1].leftDirection = [x2 -100,y2]; //~  c1.parent.ovals.add({geometricBounds:[y2-5,x2-105,y2+5,x2+95]}); gl.paths[0].pathPoints[1].rightDirection = [x2 +100,y2];//~   c1.parent.ovals.add({geometricBounds:[]});//~ 	var alpha = Math.atan2 (y2-y1, x2-x1); //~ 	var dx1 = Math.cos( alpha ) * r1; //~ 	var dy1 = Math.sin( alpha ) * r1; //~ 	var dx2 = Math.cos( alpha ) * r2; //~ 	var dy2 = Math.sin( alpha ) * r2; //~ 	var x11 = x1 + dx1; //~ 	var y11 = y1 + dy1; //~ 	var x21 = x2 - dx2; //~ 	var y21 = y2 - dy2; 	 //~ 	var gl = c1.parent.graphicLines.add(); //~ 	gl.paths[0].pathPoints[0].anchor  = [x11,y11]; //~ 	gl.paths[0].pathPoints[1].anchor = [x21,y21]; } 