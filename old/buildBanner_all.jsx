﻿// the db jason file contains an object called data// you can inspect the object like this// alert(data.toSource()); #include "db.json"//~ our project for this script is stunning white noise id 1173//~ id: 189 title: DUKOMENTATION IAIV Fabian Mor&Ucirc;n Zirfas//~ id: 700 title: [Corporate Motion] SPECTRE//~ id: 1173 title: Stunning White Noise//~ id: 1179 title: DisasterManagement//~ id: 1297 title: UEA2//~ id: 1488 title: Incom(API) 2 &hellip;//~ id: 1791 title: Praktikumsemester Forseesense//~ id: 1792 title: Kopf Hand Fuss F. Mor&oacute;n Zirfas//~ id: 1793 title: noise mashine//~ id: 1751 title: Garfikdesign &quot;T.I.L.Y. &amp;&amp; Anti.Soc.Icon.&quot;//~ id: 1752 title: Advertising Design Help//~ id: 1753 title: CutUP.14 Corporate Deathmatch//~ id: 1754 title: Produktdesign/Digitale Medien FFF//~ id: 1755 title: Lug und Trug Recycling//~ id: 1756 title: Kultur-, Kunst- und Designgeschichte Feng Mengbo//~ id: 1757 title: Blue Ocean Gero//~ id: 1758 title: Produktion von Printmedien FMZ//~ id: 1759 title: Design Versprechen Konfetti//~ id: 1798 title: InDesign Scripting Tutorial//~ id: 1799 title: Americas Army Serious Games//~ id: 1800 title: Grundkurs C / C++//~ id: 1362 title: UE_Laerm    var list = [1173, 1362, 1754];    var prjID =list[1];        var DEBUG = true;   var imgW = 50; // the image width this needs improvement    var imgH = 50; // the image height this also needs improvement    var gutter = 5; // the distance between the images    var step = 5; // the step for selecting the images        var frGutter = 5;   // var columns = 150; // how many columns    // these are the margins    var lft = 30;    var rght = 30;    var tp = 50;    var bttm = 23;    var seqFolder ;    var mediaFolder ;    // this is the progress barvar w = new Window( "palette");    var cnsl = w.add("statictext");    cnsl.preferredSize = [400,20];    cnsl.staticLabel = "start image processing";    cnsl.visible = true;    var pb = w.add("progressbar", [undefined, undefined, 400, 20] ); 	pb.value = 0; 	pb.minvalue = 0; 	pb.maxvalue = 1000; 	pb.visible = true;      	app.scriptPreferences.enableRedraw = true;     main();function main(){var txt = "";var sel = "\n";var prjcts = new Array(); // these are the 3 projectsvar prjct; // holds the project to displa// loop thru all the objects in data.projectfor(var i = 0; i < data.projects.length; i++){    var p = data.projects[i];    txt = txt + "id: "+p.id+ " title: "+p.title +"\n";    if(p.id == 1362 || p.id == 1173 || p.id == 1754){    sel = sel + p.toSource () + "\n";     prjcts.push(p);// push it into the array    }    // this is important    if(p.id == prjID){        prjct = p;        }        }var d = app.documents.add();// a new docmakeStyles(d); // build some paragrph stylesvar p = d.pages.item(0);// set some parametersd.viewPreferences.properties = {    horizontalMeasurementUnits: MeasurementUnits.MILLIMETERS,    verticalMeasurementUnits:MeasurementUnits.MILLIMETERS    };d.documentPreferences.properties = {        pageWidth:841,        pageHeight:2000        };var pw = d.documentPreferences.pageWidth; // for better handlingvar ph = d.documentPreferences.pageHeight;// for better handling gutter =1;//; (pw - lft - rght -  10 *imgW) / 10;// alert(gutter);    // set the masterpages    // edit the margins and columns    var msp1 = d.masterSpreads.item(0).pages.item(0);// edit the masterspreads	msp1.marginPreferences.properties = {        right:rght,        top:tp,        left:lft,        bottom:bttm,        columnGutter:frGutter,        columnCount:3    };          var msp2 =d.masterSpreads.item(0).pages.item(1);//edit the other masterspred	msp2.marginPreferences.properties = {        right:rght,        top:tp,        left:lft,        bottom:bttm,        columnGutter:frGutter,        columnCount:3    };      p.appliedMaster = d.masterSpreads.item(0);// apply the masterspreadvar prjImg = findProjectImage(d , prjct.image.filename);var gotProjImg = false;if(!prjImg){    return;    }else{                var target = p.rectangles.add({geometricBounds:[tp,lft,200,pw-rght]});        target.place(prjImg);        target.images.item(0).horizontalScale = 24;        target.images.item(0).verticalScale = 24;                target.applyObjectStyle(d.objectStyles.item(0));        target.fit(FitOptions.CENTER_CONTENT);            gotProjImg =  true;            }var allImgs = loadImages();// load the images for the grafix// if the user hits cancel stop the script              if(!allImgs){                   return;                    }var grp;    pb.maxvalue = allImgs.length;     w.show();    var imgs = placeImages(allImgs,d,p,ph,pw,true);//~        grp = p.groups.add(imgs);    w.close();        var tfs = new Array();//~ var tf1 = p.textFrames.add({//~             geometricBounds:[//~             grp.geometricBounds[2] + frGutter,//~             grp.geometricBounds[1],//~             ph-bttm,//~             grp.geometricBounds[3]] //~           });//~     tfs.push(tf1);//~ //  now lets make some textframes and push in some content    //~     nl = "\r";//~     dl = "\t";    //~     tfs[0].contents = nl + prjct.id + ": " + prjct.title + nl + prjct.datetimeStart.substring(0,10) + " - "+ prjct.datetimeEnd.substring(0,10);//~     tfs[0].paragraphs.everyItem().appliedParagraphStyle = "h1";//~     tfs[0].fit(FitOptions.FRAME_TO_CONTENT);//~     tfs[0].label = "headline";//~    //~    //~    tfs.push(//~         p.textFrames.add({//~         geometricBounds:[//~             tfs[0].geometricBounds[2] + frGutter,//~             tfs[0].geometricBounds[1],//~             ph-bttm,//~             tfs[0].geometricBounds[3]] //~         })//~     );//~         //~     tfs[1].contents = prjct.text + nl;//~         tfs[1].paragraphs.everyItem().appliedParagraphStyle = "h2";//~         tfs[1].fit(FitOptions.FRAME_TO_CONTENT);//~     tfs[1].label = "project text";//~     tfs.push(//~         p.textFrames.add({//~         geometricBounds:[//~             tfs[1].geometricBounds[2] + frGutter,//~             tfs[1].geometricBounds[1],//~             ph-bttm,//~             tfs[1].geometricBounds[3]] //~         })//~     );//~         //~     tfs[2].contents = prjct.workspace.id + ": " + prjct.workspace.title + nl//~     + prjct.workspace.text + nl + nl;//~         tfs[2].paragraphs.everyItem().appliedParagraphStyle = "body";//~         tfs[2].fit(FitOptions.FRAME_TO_CONTENT);//~             tfs[2].label = "workspace data";//~         //~         //~             tfs.push(//~         p.textFrames.add({//~         geometricBounds:[//~             tfs[2].geometricBounds[2] + frGutter,//~             tfs[2].geometricBounds[1],//~             ph-bttm,//~             tfs[2].geometricBounds[3]] //~         })//~     );//~     var posts_txt = "";//~     for(var i = 0; i < prjct.posts.length; i ++ ){//~         if(prjct.posts[i].id != 1567){//~         posts_txt = posts_txt + prjct.posts[i].titel + nl + prjct.posts[i].text + nl;//~         }//~         }//~     tfs[3].contents = posts_txt;//~     tfs[3].paragraphs.everyItem().appliedParagraphStyle = "body";//~     	tfs[3].textFramePreferences.textColumnCount = 3;//~ 	tfs[3].textFramePreferences.textColumnGutter = frGutter;//~     tfs[3].fit(FitOptions.FRAME_TO_CONTENT);//~     tfs[3].label = "posts texts";//~     var fls = getImagesFromPosts(prjct.posts);//~     placeMediaFiles(d,p,fls,tfs[3]);//~     //  does not work right now//~     findHTMLTags(d); // find some html tags and change them to paragraph styles    takeOutTheTrash(d); // This removes html formatting}function placeMediaFiles(doc,pg, fileList,lastFrame){    var tfClmn = lastFrame.textFramePreferences.textColumnFixedWidth;    var y1 = lastFrame.geometricBounds[0];    var x1 = lft+2*frGutter + 2* tfClmn;    var y2 = y1+100;    var x2 = x1 + tfClmn;         for (var i = 0; i < fileList.length; i++){            var hgt = 100;            y2 = y1+ hgt;            x2 = x1 + tfClmn;            var r = pg.rectangles.add({geometricBounds:[y1,x1,y2,x2]});            y1 = y1 + hgt + frGutter;//~             alert(mediaFolder.fsName )//;+ "/" + fileList[i]);                        r.place(mediaFolder.fsName + "/" + fileList[i]);            r.images.item(0).horizontalScale = 24;            r.images.item(0).verticalScale = 24;             r.applyObjectStyle(doc.objectStyles.item(0));//~             r.fit(FitOptions.PROPORTIONALLY);            r.fit(FitOptions.CENTER_CONTENT);            var tf = pg.textFrames.add({                geometricBounds:[y2+gutter,x1,y2 + 12, x2],                contents:fileList[i].substr(0,fileList[i].length-4)                });        tf.paragraphs.everyItem().appliedParagraphStyle = "image ul";        }    }function placeImages(allImgs,d,p,ph,pw, bool){     var i = 0; // for counting images    var count = 0; // for counting image frames    if(DEBUG==true)$.writeln (allImgs.length);// this is just debug    var rects  = new Array();// an array for the retangles        if(bool==true){tp = tp + 200}    for(var y1 = tp; y1 < ph - bttm; y1 += imgH+ gutter){        for(var x1 = lft; x1 < pw - rght; x1 += imgW + gutter){            // now push the rect to the array           pb.value = i;                        try{            rects.push(                    p.rectangles.add({                        geometricBounds: [y1,x1,y1 + imgH,x1 + imgW]                                    })                      );            cnsl.text = "processing image: " + allImgs[i].displayName;                        try{rects[count].place(allImgs[i]); // place the image into the rectangle                }catch(e){alert("Error with file: "+allImgs[i] + "\n"+ e);}            rects[count].fit(FitOptions.CONTENT_TO_FRAME); // fit it to the frame            rects[count].strokeWeight = 0;// dont want a stroke            }catch(e){                //~                 return rects;                }            //if(DEBUG==true) $.writeln(i); // this is for debug                        i+=step;// now get the next image            count++;// a index for next rectangles                        // at some point we have to stop the loop            //to not exeed the number of images we have            if(i > allImgs.length ){                return rects;                }            } // close for loop x1         if(i > allImgs.length  ){          return rects;          }        }// close for loop y1      }function loadImages(){	var theFolder = Folder.selectDialog ("Choose the FOLDER to import \".tif\" images from");     // if the user cancels the folder dialog     // cancel the script    if(!theFolder){        return;// this cancels the whole function main        }    seqFolder = theFolder;	var theFileType = "*.*";// only use tif files could also be jpg    // get all images into an array	var allImages = theFolder.getFiles(theFileType);        return allImages;    }function findProjectImage(doc,lookForThis){        var theFolder = Folder.selectDialog ("Choose the FOLDER with the project images");     // if the user cancels the folder dialog     // cancel the script    if(!theFolder){        return;// this cancels the whole function main        }    mediaFolder = theFolder;	var theFileType = "*.*";//    // get all images into an array	var allImages = theFolder.getFiles(theFileType);//~     alert(allImages);    		for(m = 0; m < allImages.length;m++){//~              alert(allImages[m].name);			if(allImages[m].name.match(lookForThis)){                            //alert("found it" + allImages[m]);            return allImages[m];            			}    }}function getImagesFromPosts(posts){    var files = new Array();    for(var i = 0; i < posts.length;i++){        var m = posts[i].media;        for(var j = 0; j < m.length; j++){             if(m[j].type.match("file")){                files.push(m[j].filename);                }            }// close j loop        }// close i loop//~     alert(files);    return files;    }//~ THIS IS STYLING//~ THIS IS STYLING//~ THIS IS STYLING//~ THIS IS STYLING/** * this function takes out html trash  * */function takeOutTheTrash(doc){	var findGrepPref  = app.findGrepPreferences;	var chngGrepPref = app.changeGrepPreferences;	var findTextPref  = app.findTextPreferences;	var chngTextPref = app.changeTextPreferences;	setFCopt();	emptyFC();		// this is housekeeping	var strings = new Array();	strings[0] = "</span>";	strings[1] = "<span>";	strings[2] = "<ol>";	strings[3] = "</ol>";	strings[4] = "<li>";	strings[5] = "</li>";	strings[6] = "\t";	strings[7] = "<cite>";	strings[8] = "</cite>";	strings[9] = "</ul>";	strings[10] = "<ul>";	strings[11] = "<..>";	strings[12] = "<...>";	strings[13] = "<.>";	strings[14] = "</p>";	strings[15] = "<p>";	strings[16] = "<p >";	strings[17] = "</p >";	strings[18] = "style=“color: #000000;“";	strings[19]  = "style=“text-decoration: underline;“";	strings[20]  = "style=“text-decoration: underline;“";	strings[21]  = "style=“text-align: left;“";	strings[22]  = "style=“text-align: right;“";	strings[23]  = "style=“text-align: center;“";	strings[24]  = "</span >";	strings[25]  = "<span >";	strings[26]  = "style=“color: #";	strings[27]  = "span ";	strings[28]  = ";“";        strings.push("<br />");    strings.push("<h1>");    strings.push("<h2>");	    strings.push("</h1>");    strings.push("</h2>");    strings.push("<hr />");	for(var i = 0;i < strings.length;i++){		setFCopt();		findTextPref.findWhat = strings[i];		chngTextPref.changeTo = "";		doc.changeText();		emptyFC();	}	emptyFC();        // replace some html encoded characters    var replaceS = new Array();    replaceS.push(";amp");    replaceS.push("amp;");	    var replaceT = new Array();    replaceT.push("&");    replaceT.push("&");    	for(var i = 0;i < replaceS.length;i++){		setFCopt();		findTextPref.findWhat = replaceS[i];		chngTextPref.changeTo = replaceT[i];		doc.changeText();		emptyFC();	}		var greps = new Array();	greps[0] = "  +";// 	Find all double spaces and replace with single spaces.	greps[1] = "\r ";// 	Find all returns followed by a space And replace with single returns.	greps[2] = " \r";// 	Find all returns followed by a space and replace with single returns.	greps[3] = "\t\t+";// 	Find all double tab characters and replace with single tab characters.	greps[4] = "\r\t";// 	Find all returns followed by a tab character and replace with single returns.	greps[5] = "\t\r";// 	Find all returns followed by a tab character and replace with single returns.//	greps[6] = "\r\r+";// 	Find all double returns and replace with single returns.//	greps[7] = "<div>";// 	Find all double returns and replace with single returns.		var changeTos = new Array();	changeTos[0] = " ";	changeTos[1] = "\r";	changeTos[2] = "\r";	changeTos[3] = "\t";	changeTos[4] = "\r";	changeTos[5] = "\r";	changeTos[6] = "\r";	changeTos[7] = "\r";		emptyFC();	for(var i = 0;i < greps.length;i++){		findGrepPref.findWhat = greps[i];		chngGrepPref.changeTo = changeTos[i];		doc.changeGrep();		emptyFC();	}	emptyFC();	}function setFCopt(){		emptyFC();    //Set the find options.    app.findChangeGrepOptions.includeFootnotes = true;    app.findChangeGrepOptions.includeHiddenLayers = false;    app.findChangeGrepOptions.includeLockedLayersForFind = false;    app.findChangeGrepOptions.includeLockedStoriesForFind = true;    app.findChangeGrepOptions.includeMasterPages = true;	}function emptyFC(){	//Clear the find/change grep preferences.	app.findGrepPreferences = NothingEnum.nothing;    	chngGrepPref = NothingEnum.nothing;	}function findHTMLTags(doc) {	setFCopt();	var findGrepPref  = app.findGrepPreferences;	var chngGrepPref = app.changeGrepPreferences;		var findTXTPref  = app.findTextPreferences;	var chngTXTPref = app.changeTextPreferences;		emptyFC();		var easyTagToPS = new Array();	easyTagToPS[0] = "h1";	easyTagToPS[1] = "h2";//~ 	easyTagToPS[2] = "h3";//~ 	easyTagToPS[3] = "h4";//~ 	easyTagToPS[4] = "h5";//~ 	easyTagToPS[5] = "h6";	for(var i = 0; i < easyTagToPS.length; i++){			findGrepPref.findWhat = "<"+ easyTagToPS[i] + ">(.*?)</" + easyTagToPS[i] + ">";				var res = doc.findText();        res.appliedParagraphStyle = easyTagToPS[i];        		chngGrepPref.changeTo = "$1\r";//~         chngGrepPref.appliedParagraphStyle = easyTagToPS[i];//~ 		chngGrepPref.appliedCharacterStyle = doc.characterStyles.item(0);		doc.changeGrep();		emptyFC();	}}function makeStyles(doc){               var h1 = doc.paragraphStyles.add({name:"h1"});            h1.properties = {            appliedFont : "DejaVu Serif	Book",            pointSize: 123                                };            var h2 = doc.paragraphStyles.add({name:"h2"});            h2.properties = {            appliedFont : "DejaVu Serif	Book",            pointSize: 42                                };                        var body = doc.paragraphStyles.add({name:"body"});            body.properties = {            appliedFont : "DejaVu Serif	Book",            pointSize: 24                                };                        var wNoise = doc.paragraphStyles.add({name:"whitenoise"});            wNoise.properties = {            appliedFont : "DejaVu Serif	Book",            pointSize: 10                                };            var imgUL = doc.paragraphStyles.add({name:"image ul"});            wNoise.properties = {            appliedFont : "DejaVu Serif	Book",            pointSize: 8                                };            }