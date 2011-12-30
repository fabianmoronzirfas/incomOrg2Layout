﻿// allIncomProjects.jsx// this script places all incom projects onto a large page//// based on InsertMultipleImages.js by Brian Reyman// http://www.adobe.com/cfusion/exchange/index.cfm?event=extensionDetail&extid=1046817// and theImageGrid.jsx by fabiantheblind// https://raw.github.com/fabiantheblind/theGrids/master/imageGrid/theImageGrid.jsx// Copyright (C) 2011 Fabian "fabiantheblind" Morón Zirfas// http://www.the-moron.net// http://fabiantheblind.info/// info [at] the - moron . net// This program is free software: you can redistribute it and/or modify// it under the terms of the GNU General Public License as published by// the Free Software Foundation, either version 3 of the License, or// any later version.// This program is distributed in the hope that it will be useful,// but WITHOUT ANY WARRANTY; without even the implied warranty of// MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the// GNU General Public License for more details.// You should have received a copy of the GNU General Public License// along with this program.  If not, see http://www.gnu.org/licenses/#include "db.json"//~ our project for this script is stunning white noise id 1173//~ id: 189 title: DUKOMENTATION IAIV Fabian Mor&Ucirc;n Zirfas//~ id: 700 title: [Corporate Motion] SPECTRE//~ id: 1173 title: Stunning White Noise//~ id: 1179 title: DisasterManagement//~ id: 1297 title: UEA2//~ id: 1488 title: Incom(API) 2 &hellip;//~ id: 1791 title: Praktikumsemester Forseesense//~ id: 1792 title: Kopf Hand Fuss F. Mor&oacute;n Zirfas//~ id: 1793 title: noise mashine//~ id: 1751 title: Garfikdesign &quot;T.I.L.Y. &amp;&amp; Anti.Soc.Icon.&quot;//~ id: 1752 title: Advertising Design Help//~ id: 1753 title: CutUP.14 Corporate Deathmatch//~ id: 1754 title: Produktdesign/Digitale Medien FFF//~ id: 1755 title: Lug und Trug Recycling//~ id: 1756 title: Kultur-, Kunst- und Designgeschichte Feng Mengbo//~ id: 1757 title: Blue Ocean Gero//~ id: 1758 title: Produktion von Printmedien FMZ//~ id: 1759 title: Design Versprechen Konfetti//~ id: 1798 title: InDesign Scripting Tutorial//~ id: 1799 title: Americas Army Serious Games//~ id: 1800 title: Grundkurs C / C++//~ id: 1362 title: UE_Laermvar meta = new Object();    meta.db = data;// this comes from the included db.json    meta.prjList = [1173, 1362, 1754]; // the projects to highlite    meta.DEBUG = false; // this is for debugging    meta.pw = 3000; // this will hold the page width    meta.ph = 841; // this will hold the page width    meta.flsFolder = null;// the folder for the images//~     meta.allImages = null;// the images    meta.imgW = 25; // the image sizes    meta.imgH = 25;   //~     meta.step = 1; // the step for selecting the images        // these are the margins    meta.left = 23;    meta.right = 23;    meta.top = 50;    meta.bottom = 50;        meta.cCount = 75;        // this will be filled with data from the db.json    // sorted by startdate    meta.sortedFiles = null;      sortDBbyStartTime();    removeFirstElement();// removes old junk    if(meta.DEBUG) alertProjectList();    buildImgListFromDB();    // calculate the gutter depending on how many images per column    meta.gutter = (((meta.pw - meta.left) -meta.right) - meta.cCount*meta.imgW) / meta.cCount -1;  // the distance between the images      main();// everything happens in here// you need a function to cancel a scriptfunction main(){var d = app.documents.add(); //build a basic document    makeStyles(d); // build some paragrph styles    makeDoc (d);// build the document    loadFiles();// opens a prompt and lets the user choose a foldervar p = d.pages.item(0);// finally - get the first page    p.appliedMaster = d.masterSpreads.item(0);// apply the masterspread   //~     var i = 0; // for counting images//~     var count = 0; // for counting image frames    if(meta.DEBUG==true)$.writeln (meta.sortedFiles.length);// this is just debug      var rects  = new Array();// an array for the retangles  var overlay = new Array();    var t = meta.top;    var b = meta.bottom;   var l = meta.left;   var r = meta.right;         var x = meta.left;   var y = meta.top;   var x2 = x + meta.imgW;   var y2 = y + meta.imgH;      var lastBnds  = placeContents(d,p,x,y,rects); //~    var lastBnds = [meta.top , meta.left ,meta.ph-meta.bottom,meta.pw- meta.right];      // now lts make some text   // jihhhaaaaaa      var tf =   p.textFrames.add({geometricBounds:[lastBnds[2]+ meta.gutter,meta.left ,meta.ph- meta.bottom, meta.pw - meta.right]});    tf.textFramePreferences.textColumnGutter = 5;    tf.textFramePreferences.textColumnCount  =23;    placeText(tf);                takeOutTheTrash(d); // This removes html formatting}// close main functionfunction addAndFormat(tf,content,car,i){                                var tempTF = tf.parent.textFrames.add({geometricBounds:[                    meta.ph - 100, meta.left, meta.ph, meta.left+100]});              tempTF.contents = content;              tempTF.paragraphs.everyItem().applyCharacterStyle(app.activeDocument.characterStyles.item(car));              if(meta.db.projects[i].id == 1173||meta.db.projects[i].id ==  1362||meta.db.projects[i].id ==   1754){              tempTF.paragraphs.everyItem().fillTint = 100;                      }              tempTF.previousTextFrame = tf;              tempTF.remove();//~               tf.parentStory.insertionPoints.item(-1).contents = content;//~                 tf.paragraphs.lastItem().appliedParagraphStyle = parStyle;    }function placeText(tf){                    for(var i = 0; i <meta.db.projects.length; i++){            //~                 tf.parentStory.insertionPoints.item(-1).contents = meta.db.projects.title;                addAndFormat(tf,meta.db.projects[i].id + "\n","h1",i);                addAndFormat(tf,meta.db.projects[i].title,"h1",i);                try{addAndFormat(tf,meta.db.projects[i].workspace.title,"h1",i);}catch(e){}                addAndFormat(tf,meta.db.projects[i].text,"body",i);                                for(var j = 0; j < meta.db.projects[i].posts.length;j++){                                addAndFormat(tf,meta.db.projects[i].posts[j].titel,"h2",i);                                addAndFormat(tf,meta.db.projects[i].posts[j].text + "\n","body",i);                                        }            }            }function placeContents(d,p,x,y,rects){          for(var s = 0; s < meta.sortedFiles.length;s++){        // some debugging//~        if(meta.DEBUG){//~             if(meta.sortedFiles[s].id == 1754){alert("image from project 1754");//~             }//~        }             var x2 = x + meta.imgW;// calc the lower right corner x          var y2 = y + meta.imgH; // calc the lower right corner y                rects.push(                    p.ovals.add({                        geometricBounds: [y,x,y2,x2]                                    })                      );                                  try{                rects[s].label = meta.sortedFiles[s].filename;// add a scriptlabel                // now place the file                // if the file throws an error load the error.jpg                // the checkfiletype() also sorts out files that cant be placed                rects[s].place(                meta.flsFolder.fsName + "/" +                             checkFileType(                            meta.sortedFiles[s].filename                            )                );                // end try                }catch(e){                   if(meta.DEBUG) alert( meta.sortedFiles[s].filename + "\n" + e);                 // so got an error place the error imgage instead                 rects[s].place(                meta.flsFolder.fsName + "/" +"error.jpg"                );                rects[s].label = meta.sortedFiles[s].filename;                    }// close catch                //~             rects[s].fit(FitOptions.PROPORTIONALLY); // fit it to the frame            rects[s].fit(FitOptions.CENTER_CONTENT);// center it                        try{               if(meta.DEBUG) $.writeln(rects[s].images.item(0).effectivePpi);                                   // if the images are to small to print                    if(rects[s].images.item(0).effectivePpi[0] < 280){                        rects[s].images.item(0).horizontalScale = 24;                                    rects[s].images.item(0).verticalScale = 24;                          rects[s].images.item(0).fit(FitOptions.CENTER_CONTENT);// center it again                }                               }catch(e){                            }                                   if(meta.sortedFiles[s].id == meta.prjList[0]){                rects[s].applyObjectStyle(d.objectStyles.item("images"));                transfromItem(rects[s],meta.sortedFiles[s].id);               }else if(meta.sortedFiles[s].id == meta.prjList[1]){                rects[s].applyObjectStyle(d.objectStyles.item("images"));                transfromItem(rects[s],meta.sortedFiles[s].id);                                }else if(meta.sortedFiles[s].id == meta.prjList[2]){                rects[s].applyObjectStyle(d.objectStyles.item("images"));                transfromItem(rects[s],meta.sortedFiles[s].id);                              }else{                // overlay the images with a white image               var overlay = p.rectangles.add({               geometricBounds:rects[s].geometricBounds               });                      overlay.applyObjectStyle(d.objectStyles.item("overlay"));           overlay.bringToFront();           overlay.fillColor = d.swatches.item(2);           rects[s].applyObjectStyle(d.objectStyles.item("imagesBlend"));           rects[s].fit(FitOptions.CONTENT_TO_FRAME);          } // close else (all the other projects)              	rects[s].textWrapPreferences.properties = {            textWrapMode: TextWrapModes.BOUNDING_BOX_TEXT_WRAP//~             textWrapOffset:[5,5,5,5]            };                   x = x + meta.imgW + meta.gutter;        if(x >= meta.pw - meta.imgW - meta.right*2){       x = meta.left;       y = y + meta.gutter + meta.imgH;       }  lastBnds = rects[s].geometricBounds;   } // close the images loopreturn lastBnds;    }function buildImgListFromDB(){        var allFiles = new Array();    for(var x = 0; x < meta.db.projects.length;x++){            var pr = meta.db.projects[x];        allFiles.push({"filename":pr.image.filename,"date":pr.datetimeStart,"id":pr.id});        for(var y = 0; y < pr.files.length; y++){           if(meta.DEBUG) $.writeln (y + " " + pr.files[y].type);            if(pr.files[y].type.match("file")){                    allFiles.push({"filename":pr.files[y].filename,"date":pr.datetimeStart,"id":pr.id});                    }            }                        var posts = meta.db.projects[x].posts;       for(var i = 0; i < posts.length;i++){            var m = posts[i].media;            for(var j = 0; j < m.length; j++){                if(m[j].type.match("file")){                    allFiles.push({"filename":m[j].filename,"date":pr.datetimeStart,"id":pr.id});                    }                }// close j loop            }// close i loop        }    meta.sortedFiles = allFiles;    }function checkFileType(fn){        // the regexp patterns to sort out files    // that cant be placed like images in indesign    var pts = new Array();        pts.push("\\.pdf");     pts.push("\\.mov");     pts.push("\\.zip");     pts.push("\\.rtf");     pts.push("\\.dmg");          var fls = new Array();     fls.push("pdf.jpg");     fls.push("mov.jpg");     fls.push("zip.jpg");     fls.push("rtf.jpg");     fls.push("dmg.jpg");             for(var b = 0; b < pts.length;b++){        var reg = new RegExp(pts[b]);        if(fn.match(reg)){            fn = fls[b];            }                   }                    return fn;    }    /**     * this sorts by starttime     */  function transfromItem(rect, txt){          var factor = 1.5;                      var vrScaleTM = app.transformationMatrices.add({verticalScaleFactor:factor});// scale vertical with the factor 0.7 makes it smaller	var hrScaleTM = app.transformationMatrices.add({horizontalScaleFactor:factor});// scale horizontal with the factor 0.7 makes it smaller		rect.transform(CoordinateSpaces.pasteboardCoordinates, AnchorPoint.centerAnchor, vrScaleTM); 		rect.transform(CoordinateSpaces.pasteboardCoordinates, AnchorPoint.centerAnchor, hrScaleTM);        rect.fit(FitOptions.FILL_PROPORTIONALLY);        rect.fit(FitOptions.CENTER_CONTENT);        var bnds = rect.geometricBounds;        var id = rect.parent.textFrames.add({geometricBounds:[bnds[0],bnds[1],bnds[2] + meta.gutter,bnds[3]],contents:txt});        id.characters.everyItem().appliedCharacterStyle = "whitenoise";//~         id.fit(FitOptions.FRAME_TO_CONTENT);                   }  function sortDBbyStartTime(){      meta.db.projects.sort(custom_sort);           }   /**    * this is a fix for an old project    */function removeFirstElement(){    meta.db.projects.shift();    }function alertProjectList(){    var txt = "";for(var i = 0; i < meta.db.projects.length; i++){    var p = meta.db.projects[i];    txt = txt + "id: "+p.id+ " title: "+p.title + " time: "+ p.datetimeStart+"\n";//~     if(p.id == 1362 ){//~     prjcts.push(p); //sel + p.toSource () + "\n";//~     }//~     if( p.id == 1173 ){//~     p2 = p; //sel = sel + p.toSource () + "\n";//~     }//~     if( p.id == 1754){//~     p3 = p; //sel = sel + p.toSource () + "\n";//~     }     }           //~ alert(dt);alert(txt);        }// found here// http://stackoverflow.com/questions/3859239/sort-json-by-datefunction custom_sort(a, b) {    return new Date(iso_to_datim(a.datetimeStart)).getTime() - new Date(iso_to_datim(b.datetimeStart)).getTime();}// found here// http://www.topsoft.at/pstrainer/pstrainer.phpfunction iso_to_datim(iso) {    var d=null;    var len=iso.length;        if(len>=19) {        var hh = parseInt(iso.substr(11,2),10);        var mi = parseInt(iso.substr(14,2),10);        var ss = parseInt(iso.substr(17,2),10);        }else {            var hh=0;            var mi=0;            var ss=0;            }        if(len>=10) {        var yy = parseInt(iso.substr(0,4),10);        var mo = parseInt(iso.substr(5,2),10)-1;        var dd = parseInt(iso.substr(8,2),10);        d = new Date(yy,mo,dd,hh,mi,ss);        }else{            d=new Date();            }    return d;}function loadFiles(){        // define the folder and the filetype	var theFolder = Folder.selectDialog ("Choose the FOLDER to import \".tif\" images from");     // if the user cancels the folder dialog     // cancel the script    if(!theFolder){        return;// this cancels the whole function main()        }	var theFileType = "*.*";// only use tif files could also be jpg    // get all images into an array    var temp = null;    try{    temp = theFolder.getFiles(theFileType);              }catch(e){           alert("Error with this\n" +e);           }// end catch      var allImages = temp;    if((allImages == "")||(allImages == null) ){        if(meta.DEBUG)alert("There aare no images");        return;              }    meta.flsFolder = theFolder;// to get them all everywhere    meta.allImages = allImages;    }function makeStyles(doc){var objSt1  = doc.objectStyles.add();objSt1.properties = {        name:"imagesBlend",        strokeWeight: 1,        strokeColor:doc.swatches.item(3),        strokeTint: 23,        transparencySettings:{                blendingSettings:{                    opacity:23                    }                }        };var objSt2  = doc.objectStyles.add();objSt2.properties = {        name:"images",        strokeWeight: 1,        fillColor:doc.swatches.item(2),        strokeColor:doc.swatches.item(5),        strokeTint: 50//~         ,//~         transparencySettings: {//~                 dropShadowSettings:{//~                     distance :2,//~                     mode : ShadowMode.DROP//~                     }//~                 }        };var objSt3  = doc.objectStyles.add();objSt3.properties = {        name:"overlay",        strokeWeight: 0,          transparencySettings:{                blendingSettings:{                    blendMode: BlendMode.COLOR                    }                }        };                    var fll = 50;           var h1 = doc.characterStyles.add({name:"h1"});            h1.properties = {            appliedFont : "DejaVu Serif	Book",            pointSize: 23,            fillTint: fll                                };            var h2 = doc.characterStyles.add({name:"h2"});            h2.properties = {            appliedFont : "DejaVu Serif	Book",            pointSize: 14                ,            fillTint: fll                };                        var body = doc.characterStyles.add({name:"body"});            body.properties = {            appliedFont : "DejaVu Serif	Book",            pointSize: 10                ,            fillTint: fll                };                        var wNoise = doc.characterStyles.add({name:"whitenoise"});            wNoise.properties = {            appliedFont : "DejaVu Serif	Book",            pointSize: 8                ,            fillTint: fll                };            var imgUL = doc.characterStyles.add({name:"image ul"});            wNoise.properties = {            appliedFont : "DejaVu Serif	Book",            pointSize: 8                ,            fillTint: fll                };            }function makeDoc(doc){            // set some parametersdoc.viewPreferences.properties = {    horizontalMeasurementUnits: MeasurementUnits.MILLIMETERS,    verticalMeasurementUnits:MeasurementUnits.MILLIMETERS    };    	doc.documentPreferences.properties = {		pageWidth : meta.pw,		pageHeight : meta.ph,        facingPages:false	};var msp1 = doc.masterSpreads.item(0).pages.item(0);// edit the masterspreads	msp1.marginPreferences.properties = {        right:meta.right,        top:meta.top,        left:meta.left,        bottom:meta.bottom,        columnGutter:meta.gutter,        columnCount:meta.cCount    };  var msp2 = doc.masterSpreads.item(0).pages.item(1);//edit the other masterspred	msp2.marginPreferences.properties = {      right:meta.right,        top:meta.top,        left:meta.left,        bottom:meta.bottom,        columnGutter:meta.gutter,        columnCount:meta.cCount    };      }// end make doc//~ THIS IS STYLING//~ THIS IS STYLING//~ THIS IS STYLING//~ THIS IS STYLING/** * this function takes out html trash  * */function takeOutTheTrash(doc){	var findGrepPref  = app.findGrepPreferences;	var chngGrepPref = app.changeGrepPreferences;	var findTextPref  = app.findTextPreferences;	var chngTextPref = app.changeTextPreferences;	setFCopt();	emptyFC();		// this is housekeeping	var strings = new Array();	strings[0] = "</span>";	strings[1] = "<span>";	strings[2] = "<ol>";	strings[3] = "</ol>";	strings[4] = "<li>";	strings[5] = "</li>";	strings[6] = "\t";	strings[7] = "<cite>";	strings[8] = "</cite>";	strings[9] = "</ul>";	strings[10] = "<ul>";	strings[11] = "<..>";	strings[12] = "<...>";	strings[13] = "<.>";	strings[14] = "</p>";	strings[15] = "<p>";	strings[16] = "<p >";	strings[17] = "</p >";	strings[18] = "style=“color: #000000;“";	strings[19]  = "style=“text-decoration: underline;“";	strings[20]  = "style=“text-decoration: underline;“";	strings[21]  = "style=“text-align: left;“";	strings[22]  = "style=“text-align: right;“";	strings[23]  = "style=“text-align: center;“";	strings[24]  = "</span >";	strings[25]  = "<span >";	strings[26]  = "style=“color: #";	strings[27]  = "span ";	strings[28]  = ";“";        strings.push("<br />");    strings.push("<h1>");    strings.push("<h2>");    strings.push("<h3>");	    strings.push("</h3>");    strings.push("</h1>");    strings.push("</h2>");    strings.push("<hr />");    strings.push("</em>");    strings.push("<em>");        strings.push("<strong>");        strings.push("</strong>");	for(var i = 0;i < strings.length;i++){		setFCopt();		findTextPref.findWhat = strings[i];		chngTextPref.changeTo = "";		doc.changeText();		emptyFC();	}	emptyFC();        // replace some html encoded characters    var replaceS = new Array();    replaceS.push(";amp");    replaceS.push("amp;");	    var replaceT = new Array();    replaceT.push("&");    replaceT.push("&");    	for(var i = 0;i < replaceS.length;i++){		setFCopt();		findTextPref.findWhat = replaceS[i];		chngTextPref.changeTo = replaceT[i];		doc.changeText();		emptyFC();	}		var greps = new Array();	greps.push("  +");// 0	Find all double spaces and replace with single spaces.	greps.push("\r ");// 1	Find all returns followed by a space And replace with single returns.	greps.push(" \r");// 2	Find all returns followed by a space and replace with single returns.	greps.push("\t\t+");// 3	Find all double tab characters and replace with single tab characters.	greps.push("\r\t");// 4	Find all returns followed by a tab character and replace with single returns.	greps.push("\t\r");// 5	Find all returns followed by a tab character and replace with single returns.    greps.push("\r\r+");// 6	Find all double returns and replace with single returns.    greps.push("\r");// 7	Find all returns followed by a tab character and replace with single returns.	greps.push("\n");// 8	Find all returns followed by a tab character and replace with single returns.	greps.push("~b");// 9	Find all returns followed by a tab character and replace with single returns.	greps.push("~7 ~7");// 10	Find all returns followed by a tab character and replace with single returns. greps.push(" ~7  ~7 ");// 10	Find all returns followed by a tab character and replace with single returns.//~  greps.push("<a.*?>");//~ greps.push("</a>");//	greps[7] = "<div>";// 	Find all double returns and replace with single returns.		var changeTos = new Array();	changeTos.push(" ");//0	changeTos.push("\r");//1	changeTos.push("\r");//2	changeTos.push("\t");//3	changeTos.push("\r");//4	changeTos.push("\r");//5	changeTos.push(" ~7 ");//6    	changeTos.push(" ~7 ");//7	changeTos.push(" ~7 ");//8	changeTos.push(" ~7 ");//9	changeTos.push(" ~7 ");//10	changeTos.push(" ~7 ");//10	changeTos.push("");//10    	changeTos.push("");//10    		emptyFC();	for(var i = 0;i < greps.length;i++){		findGrepPref.findWhat = greps[i];		chngGrepPref.changeTo = changeTos[i];		doc.changeGrep();		emptyFC();	}	emptyFC();	}function setFCopt(){		emptyFC();    //Set the find options.    app.findChangeGrepOptions.includeFootnotes = true;    app.findChangeGrepOptions.includeHiddenLayers = false;    app.findChangeGrepOptions.includeLockedLayersForFind = false;    app.findChangeGrepOptions.includeLockedStoriesForFind = true;    app.findChangeGrepOptions.includeMasterPages = true;	}function emptyFC(){	//Clear the find/change grep preferences.	app.findGrepPreferences = NothingEnum.nothing;    	chngGrepPref = NothingEnum.nothing;	}function findHTMLTags(doc) {	setFCopt();	var findGrepPref  = app.findGrepPreferences;	var chngGrepPref = app.changeGrepPreferences;		var findTXTPref  = app.findTextPreferences;	var chngTXTPref = app.changeTextPreferences;		emptyFC();		var easyTagToPS = new Array();	easyTagToPS[0] = "h1";	easyTagToPS[1] = "h2";//~ 	easyTagToPS[2] = "h3";//~ 	easyTagToPS[3] = "h4";//~ 	easyTagToPS[4] = "h5";//~ 	easyTagToPS[5] = "h6";	for(var i = 0; i < easyTagToPS.length; i++){			findGrepPref.findWhat = "<"+ easyTagToPS[i] + ">(.*?)</" + easyTagToPS[i] + ">";				var res = doc.findText();        res.appliedParagraphStyle = easyTagToPS[i];        		chngGrepPref.changeTo = "$1\r";//~         chngGrepPref.appliedParagraphStyle = easyTagToPS[i];//~ 		chngGrepPref.appliedCharacterStyle = doc.characterStyles.item(0);		doc.changeGrep();		emptyFC();	}}