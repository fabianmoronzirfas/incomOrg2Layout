﻿// allIncomProjects.jsx// this script places all incom projects onto a large page//// not based on but this helped on the first steps // InsertMultipleImages.js by Brian Reyman// http://www.adobe.com/cfusion/exchange/index.cfm?event=extensionDetail&extid=1046817// and theImageGrid.jsx by fabiantheblind// https://raw.github.com/fabiantheblind/theGrids/master/imageGrid/theImageGrid.jsx// Copyright (C) 2011 Fabian "fabiantheblind" Morón Zirfas// http://www.the-moron.net// http://fabiantheblind.info/// info [at] the - moron . net// This program is free software: you can redistribute it and/or modify// it under the terms of the GNU General Public License as published by// the Free Software Foundation, either version 3 of the License, or// any later version.// This program is distributed in the hope that it will be useful,// but WITHOUT ANY WARRANTY; without even the implied warranty of// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the// GNU General Public License for more details.// You should have received a copy of the GNU General Public License// along with this program.  If not, see http://www.gnu.org/licenses///~ our project for this script is stunning white noise id 1173//~ id: 189 title: DUKOMENTATION IAIV Fabian Mor&Ucirc;n Zirfas//~ id: 700 title: [Corporate Motion] SPECTRE//~ id: 1173 title: Stunning White Noise//~ id: 1179 title: DisasterManagement//~ id: 1297 title: UEA2//~ id: 1488 title: Incom(API) 2 &hellip;//~ id: 1791 title: Praktikumsemester Forseesense//~ id: 1792 title: Kopf Hand Fuss F. Mor&oacute;n Zirfas//~ id: 1793 title: noise mashine//~ id: 1751 title: Garfikdesign &quot;T.I.L.Y. &amp;&amp; Anti.Soc.Icon.&quot;//~ id: 1752 title: Advertising Design Help//~ id: 1753 title: CutUP.14 Corporate Deathmatch//~ id: 1754 title: Produktdesign/Digitale Medien FFF//~ id: 1755 title: Lug und Trug Recycling//~ id: 1756 title: Kultur-, Kunst- und Designgeschichte Feng Mengbo//~ id: 1757 title: Blue Ocean Gero//~ id: 1758 title: Produktion von Printmedien FMZ//~ id: 1759 title: Design Versprechen Konfetti//~ id: 1798 title: InDesign Scripting Tutorial//~ id: 1799 title: Americas Army Serious Games//~ id: 1800 title: Grundkurs C / C++//~ id: 1362 title: UE_Laerm#include "db.json"var meta = new Object();	meta.db = data;// this comes from the included db.json	meta.prjList = [1173, 1362, 1754]; // the projects to highlite	meta.highlite = [	{"id":0, "name":"0","col":[255,255,255]},	{"id":1173,"name":"1173","col":[153,51,255]},	{"id":1362,"name":"1362","col":[102,153,255]},	{"id":1754,"name":"1754","col":[51,204,204]},	];		meta.DEBUG = false; // this is for debugging		// this is for quicker editing 	// in the final render switch in the overlay and the image place	meta.placeImages = true;   	meta.addImageOverlay  = true;	meta.skipImages = false;	meta.pw = 3000; // this will hold the page width	meta.ph = 841; // this will hold the page width	meta.flsFolder = null;// the folder for the images//~	 meta.allImages = null;// the images	meta.imgW = 25; // the image sizes	meta.imgH = 25;   //~	 meta.step = 1; // the step for selecting the images		// these are the margins	meta.left = 23;	meta.right = 23;	meta.top = 50;	meta.bottom = 50;		// this will be filled with data from the db.json	// sorted by startdate	meta.sortedFiles = null;  //~	 meta.Masterframe = null;	db_sort_by_starttime();	db_remove_firstelement();// removes old junk	db_build_imageList();	meta.cCount = 78;// calculate the gutter depending on how many images per column	meta.gutter = (((meta.pw - meta.left) -meta.right) - meta.cCount*meta.imgW) / meta.cCount -1;  // the distance between the images   	main();// everything happens in here// you need a function to cancel a scriptfunction main(){var d = app.documents.add(); //build a basic document	colors_builder(d);	styles_builder(d); // build some paragrph styles	doc_build (d);// build the document	image_loadFiles();// opens a prompt and lets the user choose a foldervar p = d.pages.item(0);// finally - get the first page	p.appliedMaster = d.masterSpreads.item(0);// apply the masterspread   	if(meta.DEBUG==true)$.writeln (meta.sortedFiles.length);// this is just debug   var ovals  = new Array();// an array for the retanglesvar overlay = new Array();var t = meta.top; var b = meta.bottom;var l = meta.left;var r = meta.right;      var x = meta.left;var y = meta.top;var x2 = x + meta.imgW;var y2 = y + meta.imgH;   var lastBnds = null;	if(meta.skipImages == true){		lastBnds = [meta.top,meta.left,meta.top + 10, meta.pw - meta.right];		}else{	lastBnds  = image_place(d,p,x,y,ovals);	}	// now lts make some text	// jihhhaaaaaavar tf =   p.textFrames.add({geometricBounds:[lastBnds[2]+ meta.gutter*5,meta.left ,meta.ph- meta.bottom, meta.pw - meta.right]});	tf.itemLayer = d.layers.item("content");	tf.textFramePreferences.textColumnGutter = meta.gutter;	tf.textFramePreferences.textColumnCount  = 23;//~	 meta.masterFrame = tf;	text_place(tf);	tf.paragraphs.everyItem().appliedParagraphStyle = "body";	text_takeOutTheTrash(d); // This removes html formatting	text_grepReformatting(d); // this removes some things and adds new paragraphs for the important projects	text_addLegend(tf);return 0;}// close main functionfunction text_insertWithNL(txt,type){var lf = "<LF>";// we add this to the highlite projects to add a new line		if(type.match("legend")){		return  txt;		}else{	return lf + txt;	};}function text_add_and_format(tf,content,car,i,j,type){				var tempTF = tf.parent.textFrames.add({geometricBounds:[				meta.ph - 100, meta.left, meta.ph, meta.left+100]});			  	// from here on it is some kind of "manual" selection	//what to edit and highlite in the text			  	if(util_checkhighlite (meta.db.projects[i].id) == true){	//	// this is project White Noise	//var res = "";	if(meta.db.projects[i].posts[j].id == 17135 && type.match("post text")){	var txt = content;		res = text_tweakNoiseText(txt);		tempTF.contents = text_insertWithNL(res,type);		tempTF.paragraphs.everyItem().applyCharacterStyle(		app.activeDocument.characterStyles.item("whitenoise 1173"));				}else{				  				  		res = content;		tempTF.contents =   text_insertWithNL(res,type);		try{			tempTF.paragraphs.everyItem().applyCharacterStyle(			app.activeDocument.characterStyles.item(car + " "+meta.db.projects[i].id)			);		}catch(e){alert(car + "\n" + e );}	}// close else		tempTF.paragraphs.everyItem().fillTint = 100;	}else{		//		// this is all the other projects		tempTF.contents = content;		tempTF.paragraphs.everyItem().applyCharacterStyle(			app.activeDocument.characterStyles.item(car + " " + meta.db.projects[i].id));		if(type.match("legend")){			tempTF.paragraphs.everyItem().fillTint = 100;	  		}	}	tempTF.previousTextFrame = tf;	tempTF.remove();}function text_tweakNoiseText(txt){var noiseTXT = new Array();var noiseVals = new Array();		noiseTXT = txt.split(",");	for(var n = 0; n < noiseTXT.length;n++){		var t = parseFloat(noiseTXT[n]);		noiseVals[n] = t.toFixed(10);		}	noiseVals.shift();		var str = "";	for(s = 0; s < noiseVals.length;s++){		if(noiseVals[s] >= 0 ){			str = str + "+" + noiseVals[s] + " \t ";		}else{			str = str  + noiseVals[s] + " \t ";		}	}return str;}function text_place(tf){				for(var i = 0; i < meta.db.projects.length; i++){					var dt1 = util_iso_to_datim(meta.db.projects[i].datetimeStart);		var dt2 = util_iso_to_datim(meta.db.projects[i].datetimeEnd);		var dt = dt1.getFullYear() + " "+dt1.getMonth() 		+" - " + dt2.getFullYear() + " "+dt2.getMonth() ;		text_add_and_format(tf,"id: "+ meta.db.projects[i].id,"id",i,0, "id");		text_add_and_format(tf," timespan: " + dt + " ","h2",i,0, "id");		text_add_and_format(tf,meta.db.projects[i].title+" ","h1",i,0,"title");						try{			text_add_and_format(tf,meta.db.projects[i].workspace.title+" ","h1",i,0,"title");			}catch(e){}				text_add_and_format(tf,meta.db.projects[i].text,"body",i,0,"text");		for(var j = 0; j < meta.db.projects[i].posts.length;j++){			text_add_and_format(tf,meta.db.projects[i].posts[j].titel,"h2",i,j,"post title");			text_add_and_format(tf,meta.db.projects[i].posts[j].text + "\n","body",i,j,"post text");							}	}}function text_addLegend(tf){	text_add_and_format(tf,"\n\nlegend\n","h1",0,0,"legend");	for(var i = 0; i < meta.db.projects.length; i++){				text_add_and_format (tf, "id: " + meta.db.projects[i].id +" "+meta.db.projects[i].title+"\n", "id", i, 0, "legend");//~		tf.paragraphs.lastItem().fillTint = 100;	}}function text_takeOutTheTrash(doc){var findGrepPref  = app.findGrepPreferences;var chngGrepPref = app.changeGrepPreferences;var findTextPref  = app.findTextPreferences;var chngTextPref = app.changeTextPreferences;	text_set_FindChange_opt();	text_emptyFC();		// this is housekeepingvar strings = new Array();	strings[0] = "</span>";	strings[1] = "<span>";	strings[2] = "<ol>";	strings[3] = "</ol>";	strings[4] = "<li>";	strings[5] = "</li>";	strings[6] = "\t";	strings[7] = "<cite>";	strings[8] = "</cite>";	strings[9] = "</ul>";	strings[10] = "<ul>";	strings[11] = "<..>";	strings[12] = "<...>";	strings[13] = "<.>";	strings[14] = "</p>";	strings[15] = "<p>";	strings[16] = "<p >";	strings[17] = "</p >";	strings[18] = "style=“color: #000000;“";	strings[19]  = "style=“text-decoration: underline;“";	strings[20]  = "style=“text-decoration: underline;“";	strings[21]  = "style=“text-align: left;“";	strings[22]  = "style=“text-align: right;“";	strings[23]  = "style=“text-align: center;“";	strings[24]  = "</span >";	strings[25]  = "<span >";	strings[26]  = "style=“color: #";	strings[27]  = "span ";	strings[28]  = ";“";		strings.push("<br />");	strings.push("<h1>");	strings.push("<h2>");	strings.push("<h3>");		strings.push("</h3>");	strings.push("</h1>");	strings.push("</h2>");	strings.push("<hr />");	strings.push("</em>");	strings.push("<em>");	strings.push("<strong>");	strings.push("</strong>");	for(var i = 0;i < strings.length;i++){		text_set_FindChange_opt();		findTextPref.findWhat = strings[i];		chngTextPref.changeTo = "";		doc.changeText();		text_emptyFC();	}	text_emptyFC();		// replace some html encoded characters	var replaceS = new Array();	replaceS.push({"fw":";amp","to":"&"});	replaceS.push({"fw":"amp;","to":"&"});//~ var replaceT = new Array();//~	 replaceT.push("&");//~	 replaceT.push("&");		for(var j = 0;j < replaceS.length;j++){		text_set_FindChange_opt();		findTextPref.findWhat = replaceS[j].fw;		chngTextPref.changeTo = replaceS[j].to;		doc.changeText();		text_emptyFC();	}}function text_grepReformatting(doc){	var fGPref  = app.findGrepPreferences;var cGPref = app.changeGrepPreferences;var greps_ = new Array();	// use json objects to keep it tidy	// fw is the find what	// to is the change to	greps_.push({   "fw":"  +"	  ,		"to":" "});	greps_.push({   "fw":"\r "	  ,		"to":"\r"});	greps_.push({   "fw":" \r"	  ,		"to":"\r"});	greps_.push({   "fw":"\t\t+"	,	  "to":"\t"});	greps_.push({   "fw":"\r\t"	 ,	   "to":"\r"});	greps_.push({   "fw":"\t\r"	 ,	   "to":"\r"});	greps_.push({   "fw":"\r\r+"	,	  "to":" ~7 "});	greps_.push({   "fw":"\r"	   ,		 "to":" ~7 "});	greps_.push({   "fw":"\n"	   ,		 "to":" ~7 "});	greps_.push({   "fw":"~b"	   ,		 "to":" ~7 "});	greps_.push({   "fw":"~7 ~7"	,	  "to":" ~7 "});	greps_.push({   "fw":" ~7  ~7 " ,   "to":" ~7 "});	greps_.push({   "fw":"<LF>"	 ,	   "to":"\n"});		text_emptyFC();	// now loop thru the object to get all the greps	for(var j = 0;j < greps_.length;j++){		fGPref.findWhat = greps_[j].fw;		cGPref.changeTo = greps_[j].to;		doc.changeGrep();		text_emptyFC();	}	text_emptyFC();}/** * this function takes out html trash  * */function text_set_FindChange_opt(){		text_emptyFC();	//Set the find options.	app.findChangeGrepOptions.includeFootnotes = true;	app.findChangeGrepOptions.includeHiddenLayers = false;	app.findChangeGrepOptions.includeLockedLayersForFind = false;	app.findChangeGrepOptions.includeLockedStoriesForFind = true;	app.findChangeGrepOptions.includeMasterPages = true;	}function text_emptyFC(){	//Clear the find/change grep preferences.	app.findGrepPreferences = NothingEnum.nothing;	app.changeGrepPreferences = NothingEnum.nothing;		//Clear the find/change text preferences.	app.findTextPreferences = NothingEnum.nothing;	app.changeTextPreferences = NothingEnum.nothing;}function text_find_HTML_tags(doc) {	text_set_FindChange_opt();//~ var findGrepPref  = app.findGrepPreferences;//~ var chngGrepPref = app.changeGrepPreferences;//~ 	var findTXTPref  = app.findTextPreferences;var chngTXTPref = app.changeTextPreferences;		text_emptyFC();	var easyTagToPS = new Array();	easyTagToPS[0] = "h1";	easyTagToPS[1] = "h2";//~ 	easyTagToPS[2] = "h3";//~ 	easyTagToPS[3] = "h4";//~ 	easyTagToPS[4] = "h5";//~ 	easyTagToPS[5] = "h6";	for(var i = 0; i < easyTagToPS.length; i++){			findGrepPref.findWhat = "<"+ easyTagToPS[i] + ">(.*?)</" + easyTagToPS[i] + ">";				var res = doc.findText();		res.appliedParagraphStyle = easyTagToPS[i];		chngGrepPref.changeTo = "$1\r";//~		 chngGrepPref.appliedParagraphStyle = easyTagToPS[i];//~ 		chngGrepPref.appliedCharacterStyle = doc.characterStyles.item(0);		doc.changeGrep();		text_emptyFC();	}}function image_loadFiles(){		// define the folder and the filetype	var theFolder = Folder("~/Documents/Dropbox/incom2layoutFiles");//Folder.selectDialog ("Choose the FOLDER to import the images from");//~	 alert(theFolder);	// if the user cancels the folder dialog	 // cancel the script	if(!theFolder){		return;// this cancels the whole function main \(\)		}	var theFileType = "*.*";// only use tif files could also be jpg	// get all images into an array	var temp = null;	try{	temp = theFolder.getFiles(theFileType);	   	   }catch(e){		   alert("Error with this\n" +e);		   }// end catch      var allImages = temp;	if((allImages == "")||(allImages == null) ){		if(meta.DEBUG)alert("There aare no images");		return;	   	   }	meta.flsFolder = theFolder;// to get them all everywhere	meta.allImages = allImages;	}function image_place(d,p,x,y,ovals){		  for(var s = 0; s < meta.sortedFiles.length;s++){		var grp = new Array();		  var x2 = x + meta.imgW;// calc the lower right corner x		  var y2 = y + meta.imgH; // calc the lower right corner y				ovals.push(					p.ovals.add({						geometricBounds: [y,x,y2,x2],itemLayer:"content"									})					  );		 grp.push(ovals[s]);		   		ovals[s].itemLayer = "content";			try{				ovals[s].label = meta.sortedFiles[s].filename;// add a scriptlabel				// now place the file				// if the file throws an error load the error.jpg				// the util_checkFileType() also sorts out files that cant be placed				if(meta.placeImages == true){								ovals[s].place(				meta.flsFolder.fsName + "/" + 							util_checkFileType(							meta.sortedFiles[s].filename							)					);				}				// end try				}catch(e){				   if(meta.DEBUG) alert( meta.sortedFiles[s].filename + "\n" + e);				 // so got an error place the error imgage instead				 ovals[s].place(				meta.flsFolder.fsName + "/" +"error.jpg"				);//~				 ovals[s].label = meta.sortedFiles[s].filename;					}// close catch				ovals[s].fit(FitOptions.FILL_PROPORTIONALLY);// center it				ovals[s].fit(FitOptions.CENTER_CONTENT);// center it										try{								// we have to check if the images are printable.				// if the effectivePpi is under 280 we rescale the image				// warning this gets overritten if we use			   if(meta.DEBUG) $.writeln(ovals[s].images.item(0).effectivePpi);					// if the images are to small to print					if(ovals[s].images.item(0).effectivePpi[0] < 280 && util_checkhighlite (meta.sortedFiles[s].id) != true){						ovals[s].images.item(0).horizontalScale = 24;									ovals[s].images.item(0).verticalScale = 24;  						ovals[s].images.item(0).fit(FitOptions.CENTER_CONTENT);// center it again				}		 }catch(e){ }		 //~			   Build the string for the image_ID			 var idString = "";			 if(meta.sortedFiles[s].id == 0 ){				 idString = "";				 }else if(meta.sortedFiles[s].id != 0 && meta.sortedFiles[s].text.length < 1){					 idString = "id: "+meta.sortedFiles[s].id;					 					 }else{				  idString = "id: " + meta.sortedFiles[s].id+" "+meta.sortedFiles[s].text; 					 }//~				  // now sort out the special projects			if(util_checkhighlite (meta.sortedFiles[s].id)==true ){						ovals[s].applyObjectStyle(d.objectStyles.item("images "+meta.sortedFiles[s].id));//~		 build the id and return a circle with pathtext						var tf_id = image_ID (ovals[s],			"image ul "+meta.sortedFiles[s].id,			idString);// 			tf_id.itemLayer = "highlite";// push them up to the highlite layer			grp.push(tf_id);// the id to the array group			// image transform makes the special proj quite bigger			var kontur = image_addOverlay (d, p, ovals[s].geometricBounds,meta.sortedFiles[s].id); // this returns a circle			grp.push(kontur); // add it to the group//~ image_transfrom(ovals[s],meta.sortedFiles[s].id, meta.sortedFiles[s].id);			   }else{				   // this is the normal projects id circle				   var tf_id = image_ID (ovals[s],				   "image ul "+meta.sortedFiles[s].id,				   idString				   );				   tf_id.itemLayer = "content";				   grp.push(tf_id);				   // OVERLAY  OVERLAY  OVERLAY  OVERLAY  OVERLAY  OVERLAY  OVERLAY // this adds a colored circle over the images// this happens only for the non highlited			   if(meta.addImageOverlay == true){   				var bool = true; // this is for the project separator			ovals[s].applyObjectStyle(d.objectStyles.item("imagesBlend")); // add an object style//~			 fit them into the circle		   ovals[s].fit(FitOptions.FILL_PROPORTIONALLY);		   ovals[s].fit(FitOptions.CENTER_CONTENT);//~			 we have to sort out the images that mark a new project - the seperator//~			 they dont get an overlay				try{				if(ovals[s].label.match(meta.sortedFiles[s+1].id+".jpg")){					bool = false;// set it to false to dont add the colored circle				ovals[s].transparencySettings.blendingSettings.opacity=100;				// try to colorize the greyscale separator				ovals[s].images.item(0).fillColor = meta.sortedFiles[s +1].id + "";				   			   }// close new peoject match			}catch(e){						alert("error with "+meta.sortedFiles[s].filename+" image\n" + e);					}// close catch		   // now finally add the circle		   if(bool == true){			   var overlay = image_addOverlay (d, p, ovals[s].geometricBounds, meta.sortedFiles[s].id);			   grp.push(overlay); // am him to the array group			   }// close bool		   } // CLOSE  OVERLAY 		  } // close else (all the other projects)	   //~			ovals[s].textWrapPreferences.properties = {//~			textWrapMode: TextWrapModes.BOUNDING_BOX_TEXT_WRAP//~			 textWrapOffset:[5,5,5,5]//~			 }; 		   	   x = x + meta.imgW + meta.gutter; 	   if(x >= meta.pw - meta.imgW - meta.right*2){	   x = meta.left;	   y = y + meta.gutter + meta.imgH;	   }  lastBnds = ovals[s].geometricBounds;	  p.groups.add(grp);   } // close the images loopreturn lastBnds;	}function image_addOverlay (doc, page, bounds, id){		var overlay = page.ovals.add({					geometricBounds:bounds			   }); // the circle			// it could be that the hihglite layer is active so push him back				overlay.itemLayer = "content";				overlay.applyObjectStyle(doc.objectStyles.item("overlay")); // object style				overlay.bringToFront(); // pull it to the front				// this is the styling for the overlay				if(!util_checkhighlite (id)){				overlay.fillColor = doc.swatches.item(id + "");				overlay.fillTint = 42;				}				overlay.strokeWeight = 5;				overlay.strokeAlignment = StrokeAlignment.OUTSIDE_ALIGNMENT;//~			overlay.strokeTint = 23;				overlay.strokeColor = doc.swatches.item(id + "");								return overlay;	} function image_transfrom(rect, txt, id){	 	 var factor = 1.5;		   		   var vrScaleTM = app.transformationMatrices.add({			   verticalScaleFactor:factor});// scale vertical with the factor 0.7 makes it smaller	var hrScaleTM = app.transformationMatrices.add({		horizontalScaleFactor:factor});// scale horizontal with the factor 0.7 makes it smaller		rect.transform(		CoordinateSpaces.pasteboardCoordinates, AnchorPoint.centerAnchor, vrScaleTM); 		rect.transform(		CoordinateSpaces.pasteboardCoordinates, AnchorPoint.centerAnchor, hrScaleTM);		rect.fit(FitOptions.FILL_PROPORTIONALLY);		rect.fit(FitOptions.CENTER_CONTENT);		rect.itemLayer = "highlite";	 var tfID = image_ID(rect, "image ul " + id, txt+"");		 tfID.itemLayer = "highlite";		 	 }    function image_ID(rect , car , txt ){	var offset = 2.5;//~	  if(txt.match("0")==true){//~			 txt = "";//~		  }else{//~			  "id: "+txt;//~			  }	var bnds = rect.geometricBounds;	var id = rect.parent.ovals.add({geometricBounds:		   [bnds[0] - offset,bnds[1] -offset,bnds[2]+offset 			,bnds[3]+offset]});		id.textPaths.add();		id.textPaths[0].contents = txt;//~		 var id = rect.parent.textFrames.add({//~			 geometricBounds:[bnds[0] - 5,bnds[1],bnds[2] //~			 + meta.gutter,bnds[3]],contents:txt});		id.textPaths[0].paragraphs.everyItem().applyCharacterStyle(		rect.parent.parent.characterStyles.item(car));		try{id.textPaths[0].lines.lastItem().pointSize = 4;}catch(e){alert(e);}	var rotTM = app.transformationMatrices.add({				counterclockwiseRotationAngle:180				});// rotate (the 180 is for getting the line start upwards)					id.transform(CoordinateSpaces.pasteboardCoordinates, AnchorPoint.centerAnchor, rotTM);				id.applyObjectStyle(rect.parent.parent.objectStyles.item("image_id"));	 return id;	 }function db_build_imageList(){		var allFiles = new Array();	var prevDate = 0;	var prevID = null;	for(var x = 0; x < meta.db.projects.length;x++){	var pr = meta.db.projects[x];	var d = util_iso_to_datim (pr.datetimeStart);	var id = pr.id;	var year = d.getFullYear();			  if(year != prevDate){//~				 alert("New Year" + year);		allFiles.push({			"filename":year+".jpg",			"date":pr.datetimeStart,			"id":0,			"text":""});							  }		  if(id != prevID){//~				 alert("New Project" + year);		allFiles.push({			"filename": pr.id+".jpg",			"date":pr.datetimeStart,			"id":0,			"text":""});							  }	prevID = id;	prevDate = year;		allFiles.push({			"filename":pr.image.filename,			"date":pr.datetimeStart,			"id":parseInt(pr.id),			"text":pr.image.text});		for(var y = 0; y < pr.files.length; y++){				   if(meta.DEBUG) $.writeln (y + " " + pr.files[y].type);		   			if(pr.files[y].type.match("file")){					allFiles.push({						"filename":pr.files[y].filename,						"date":pr.datetimeStart,						"id":parseInt ( pr.id),						"text":pr.files[y].text});			 }else if(pr.files[y].type.match("link")){					var lnk = pr.files[y].text;					if(lnk.length < 1){						lnk = pr.files[y].src;						}					allFiles.push(						 {"filename":"link.jpg",						"date":pr.datetimeStart,						"id":parseInt ( pr.id),						"text":lnk});												}			}						var posts = meta.db.projects[x].posts;	   for(var i = 0; i < posts.length;i++){			var m = posts[i].media;			for(var j = 0; j < m.length; j++){				if(m[j].type.match("file")){					allFiles.push({						"filename":m[j].filename,						"date":pr.datetimeStart,						"id":parseInt(pr.id),						"text":m[j].text});				}else if(m[j].type.match("link")){   					var lnk = m[j].text;					if(lnk.length < 1){						lnk = m[j].src;						}					allFiles.push({						"filename":"link.jpg",						"date":pr.datetimeStart,						"id":parseInt(pr.id),						"text":lnk});												}				}// close j loop			}// close i loop				for(var k = 0; k < meta.db.projects[x].links.length; k++){			var l = meta.db.projects[x].links[k];						var idString = "";						if(l.titel.length < 1){				idString = l.url;				}else if(l.titel.length > 0){				idString = l.titel + " " + l.url;					}			 allFiles.push({						"filename":"link.jpg",						"date":pr.datetimeStart,						"id":parseInt(pr.id),						"text":idString});			}		}	meta.sortedFiles = allFiles;	}	 /**	 * this sorts by starttime	 */ function db_sort_by_starttime(){      meta.db.projects.sort(util_custom_sort);   		}   /**	* this is a fix for an old project	*/function db_remove_firstelement(){	meta.db.projects.shift();	}function util_alertProjectList(){	var txt = "";for(var i = 0; i < meta.db.projects.length; i++){	var p = meta.db.projects[i];	txt = txt + "id: "+p.id+ " title: "+p.title + " time: "+ p.datetimeStart+"\n";//~	 if(p.id == 1362 ){//~	 prjcts.push(p); //sel + p.toSource () + "\n";//~	 }//~	 if( p.id == 1173 ){//~	 p2 = p; //sel = sel + p.toSource () + "\n";//~	 }//~	 if( p.id == 1754){//~	 p3 = p; //sel = sel + p.toSource () + "\n";//~	 } 	}		   //~ alert(dt);alert(txt);		}function util_checkFileType(fn){	// the regexp patterns to sort out files	// that cant be placed like images in indesign	// use JSON to keep it tidy	 	 var flsList = new Array();//~	  flsList.push({"pattern":"\\.pdf","file":"pdf.jpg"});	 flsList.push({"pattern":"\\.mov","file":"mov.jpg"});	 flsList.push({"pattern":"\\.zip","file":"zip.jpg"});	 flsList.push({"pattern":"\\.rtf","file":"rtf.jpg"});	 flsList.push({"pattern":"\\.dmg","file":"dmg.jpg"});			 for(var b = 0; b < flsList.length;b++){			var reg = new RegExp(flsList[b].pattern);			if(fn.match(reg)){				fn = flsList[b].file;				}	   			}					return fn;	}// this function sorts by time// found here// http://stackoverflow.com/questions/3859239/sort-json-by-datefunction util_custom_sort(a, b) {	return new Date(util_iso_to_datim(a.datetimeStart)).getTime() - 	new Date(util_iso_to_datim(b.datetimeStart)).getTime();}// found here// http://www.topsoft.at/pstrainer/pstrainer.phpfunction util_iso_to_datim(iso) {var d=null;var len=iso.length;	if(len>=19) {		var hh = parseInt(iso.substr(11,2),10);		var mi = parseInt(iso.substr(14,2),10);		var ss = parseInt(iso.substr(17,2),10);		}else {			var hh=0;			var mi=0;			var ss=0;			}		if(len>=10) {		var yy = parseInt(iso.substr(0,4),10);		var mo = parseInt(iso.substr(5,2),10)-1;		var dd = parseInt(iso.substr(8,2),10);		d = new Date(yy,mo,dd,hh,mi,ss);		}else{			d=new Date();    }return d;}function util_checkhighlite(id){		var bool = false;	for(var i = 0; i < meta.highlite.length; i++){				if(id == meta.highlite[i].id && id != 0){			bool = true;			break			}				}	return bool;	}function styles_builder(doc){var objSt1  = doc.objectStyles.add();objSt1.properties = {		name:"imagesBlend",		strokeWeight: 0,		strokeColor:doc.swatches.item(3),		strokeTint: 23,		transparencySettings:{				blendingSettings:{					opacity:23					}				}		};var objSt3  = doc.objectStyles.add();objSt3.properties = {		name:"overlay",		strokeWeight: 5,		  transparencySettings:{				blendingSettings:{					blendMode: BlendMode.COLOR					}				}		};	var objSt4  = doc.objectStyles.add();objSt4.properties = {		name:"image_id",		strokeWeight: 0		};var oStyles = new Array();for(var c = 0; c  < meta.highlite.length;c++){	oStyles.push({"name":"images","id":meta.highlite[c].name});		}					for(var o = 0; o < oStyles.length;o++){		var objSt  = doc.objectStyles.add();		objSt.properties = {			name:oStyles[o].name + " " + oStyles[o].id,			strokeWeight: 0,			fillColor:doc.swatches.item(2),			strokeColor:doc.swatches.item(oStyles[o].id+""),			strokeTint: 50		};	}	var cStyles = {	"styles":[ 			{"name":"h1" ,"font":"DejaVu Serif	Book","factor":2.0},			{"name":"h2" ,"font":"DejaVu Serif	Book","factor":1.4},			{"name":"id" ,"font":"DejaVu Serif	Book","factor":1.4},			{"name":"body" ,"font":"DejaVu Serif	Book","factor":1},			{"name":"whitenoise" ,"font":"DejaVu Sans Mono	Book","factor":0.8},			{"name":"image ul" ,"font":"DejaVu Serif	Book","factor":0.6} ],			"base":10 };var vals = new Array();	  vals.push({"id":0,"fll":50});for(var v = 0; v < meta.db.projects.length;v++){		var fll = 50;	if(util_checkhighlite(meta.db.projects[v].id)){		fll =100;   		}else{	   fll = 50;	   }		  vals.push({"id":meta.db.projects[v].id,"fll":fll});		}// now make a double loop // for creating the chracter styles for(var s = 0; s < cStyles.styles.length;s++){ 	for(var v = 0; v < vals.length;v++){		var charStyle = doc.characterStyles.add({				name:cStyles.styles[s].name + " "+vals[v].id				});						if(v != 0){				charStyle.basedOn = doc.characterStyles.item(				cStyles.styles[s].name +" "+vals[0].id);				}			var base = 0;			if(cStyles.styles[s].name.match("image ul")&& vals[v].fll ==50){			base = 9;			   			}else{			base = cStyles.base;								}			charStyle.properties = {				appliedFont : cStyles.styles[s].font,				pointSize: cStyles.base * cStyles.styles[s].factor,				fillTint: vals[v].fll				};						if(cStyles.styles[s].name.match("id")){				charStyle.fillColor = doc.swatches.item(vals[v].id+"");				}		}// close v loop }// close s loop						//~	 var idStyles = new Array();//~	 for(var p = 0; p < meta.db.projects.length; p++){//~		try{ var cst = doc.characterStyles.add({name:"id " +meta.db.projects[p].id});//~		 cst.basedOn = doc.characterStyles.item("h2");//~		 cst.fillColor = doc.swatches.item(meta.db.projects[p].id+"");//~		 }catch(e){alert("in here");}//~		 //~		 }		var parBody = doc.paragraphStyles.add({name:"body"});	parBody.alignToBaseline = true;	}function doc_build(doc){	doc.layers.item(0).name = "content";		doc.layers.add({name:"highlite"});		// set some parametersdoc.viewPreferences.properties = {	horizontalMeasurementUnits: MeasurementUnits.MILLIMETERS,	verticalMeasurementUnits:MeasurementUnits.MILLIMETERS	};		doc.documentPreferences.properties = {		pageWidth : meta.pw,		pageHeight : meta.ph,		facingPages:false	};doc.gridPreferences.properties = {	 baselineStart : meta.top		}	// doc.gridPreferences.baselineDivision = "11pt";	var msp1 = doc.masterSpreads.item(0).pages.item(0);// edit the masterspreads	msp1.marginPreferences.properties = {		right:meta.right,		top:meta.top,		left:meta.left,		bottom:meta.bottom,//~		 columnGutter:meta.gutter,//~		 columnCount:meta.cCount	};  var msp2 = doc.masterSpreads.item(0).pages.item(1);//edit the other masterspred	msp2.marginPreferences.properties = {	  right:meta.right,		top:meta.top,		left:meta.left,		bottom:meta.bottom,//~		 columnGutter:meta.gutter,//~		 columnCount:meta.cCount	};  	}// end make doc	// by dave saunders	function colors_convertToCMYK(color) {		color.space = ColorSpace.cmyk;		var vals = color.colorValue;		for (var j = vals.length - 1; j >= 0; j--) {			vals[j] = Math.round(vals[j]);		}		color.colorValue = vals;	}function colors_builder(d){		for(var i = 0; i < meta.highlite.length; i++){				var theColor = color_add(d,""+ meta.highlite[i].name, ColorModel.PROCESS, meta.highlite[i].col);		colors_convertToCMYK(theColor);		}			var iter = 255;		for(var j = meta.db.projects.length -1; j >=0 ; j--){		try{			var c = 100 - ((100/(meta.db.projects.length -1)) *j);			var m = ((100/(meta.db.projects.length -1)) *j);			var y = 0;			var k = 0;						var r = iter  - (255 / meta.db.projects.length) * j;			var g = 255;			var b = iter - (255 / meta.db.projects.length) * j;		  var col  = color_add(d,""+ meta.db.projects[j].id, ColorModel.PROCESS, [c,m,y,k]);//~		   colors_convertToCMYK(col );			}catch(e){				 if(meta.DEBUG){					 alert(					 // use the error					 // we already made the colors for the projects					 // so if we try to make anther color with the same name we get an error					 meta.db.projects[j].id + " already exists\n" 					 + "its ok i know about it\n" + e);				}			}		}		}// found on http://bit.ly/h5EobK indisnip.wordpress.com ->// how to apply:// add CMYK color//myColorAdd(app.activeDocument, "My Custom Color", ColorModel.PROCESS, [80,50,30,10]);// add RGB color//myColorAdd(app.activeDocument, "My Custom Color", ColorModel.PROCESS, [33,66,99]);// add HEX color//myColorAdd(app.activeDocument, "My Custom Color", ColorModel.PROCESS, "ABCDEF");// add color directly// add CMYK color to document// and asign it to selected object//app.selection[0].fillColor = myColorAdd(app.activeDocument, "My Custom Color", ColorModel.PROCESS, [80,50,30,10]);function color_add(myDocument, myColorName, myColorModel, myColorValue){	if(myColorValue instanceof Array == false){		myColorValue = [(parseInt(myColorValue, 16) >> 16 ) & 0xff, (parseInt(myColorValue, 16) >> 8 ) & 0xff, parseInt(myColorValue, 16 ) & 0xff ];		myColorSpace = ColorSpace.RGB;	}else{		if(myColorValue.length == 3)		  myColorSpace = ColorSpace.RGB;		else		  myColorSpace = ColorSpace.CMYK;	}	try{		myColor = myDocument.colors.item(myColorName);		myName = myColor.name;	}	catch (myError){		myColor = myDocument.colors.add();		myColor.properties = {name:myColorName, model:myColorModel, space:myColorSpace ,colorValue:myColorValue};	}	return myColor;}