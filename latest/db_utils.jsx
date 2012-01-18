﻿ function db_get_timespan(){var str = "";    var strt = util_iso_to_datim (meta.db.projects[0].datetimeStart);    var nd = util_iso_to_datim (meta.db.projects[meta.db.projects.length -1].datetimeEnd);    str = "" + util_calc_timespan_in_days (strt, nd);    return str;    }function db_build_stats(doc){        str = "";    var    prjCount = meta.db.projects.length;    var  pstCount = 0;    var flsCount = 0;    var lnkCount = 0;    var hls = doc.hyperlinks.length;               for(var i =0; i < prjCount; i++){        prj= meta.db.projects[i];        for(var j in prj.posts){            pstCount++;            }        }        for (var k in meta.sortedFiles){                        if(meta.sortedFiles[k].type.match("mov||zip||rtf||dmg||img")){                flsCount++;                }            if(meta.sortedFiles[k].type.match("link")){                lnkCount++;                }            }            str = ""+ prjCount +" project(s), "+            "with "+ pstCount +" post(s), "+            "with "+ flsCount +" file(s), "+            "and "+ (lnkCount + hls) +" link(s)";    return str;        }function db_build_imageList(){		var allFiles = new Array();	var prevDate = 0;	var prevID = null;	for(var x = 0; x < meta.db.projects.length;x++){	var pr = meta.db.projects[x];	var d = util_iso_to_datim (pr.datetimeStart);	var id = pr.id;	var year = d.getFullYear();			  if(year != prevDate){//~				 alert("New Year" + year);		allFiles.push({			"filename":year+".jpg",			"date":pr.datetimeStart,			"id":0,			"text":"","type":"year","tint":false,"preview":"http://fabiantheblind.info"});							  }		  if(id != prevID){//~				 alert("New Project" + year);		allFiles.push({			"filename": pr.id+".jpg",			"date":pr.datetimeStart,			"id":pr.id,			"text":pr.title,"type":"projid","tint":true,"preview":"http://incom.org/projekt/"+pr.id});							  }	prevID = id;	prevDate = year;		allFiles.push({			"filename":pr.image.filename,			"date":pr.datetimeStart,			"id":parseInt(pr.id),			"text":pr.image.text,            "type":util_setFileType (pr.image.filename),"tint":true ,"preview":pr.image.preview});		for(var y = 0; y < pr.files.length; y++){				   if(meta.DEBUG) $.writeln (y + " " + pr.files[y].type);		   			if(pr.files[y].type.match("file")){					allFiles.push({						"filename":pr.files[y].filename,						"date":pr.datetimeStart,						"id":parseInt ( pr.id),						"text":pr.files[y].text,                        "type":util_setFileType (pr.files[y].filename),"tint":true,"preview":pr.files[y].preview                        });			 }else if(pr.files[y].type.match("link")){					var lnk = pr.files[y].text;					if(lnk.length < 1){						lnk = pr.files[y].src;						}					allFiles.push(						 {"filename":"link.jpg",						"date":pr.datetimeStart,						"id":parseInt ( pr.id),						"text":lnk,                        "type":"link","tint":true,"preview":pr.files[y].src});												}			}						var posts = meta.db.projects[x].posts;	   for(var i = 0; i < posts.length;i++){			var m = posts[i].media;			for(var j = 0; j < m.length; j++){				if(m[j].type.match("file")){					allFiles.push({						"filename":m[j].filename,						"date":pr.datetimeStart,						"id":parseInt(pr.id),						"text":m[j].text,                          "type":util_setFileType (m[j].filename),"tint":true,"preview":m[j].preview});				}else if(m[j].type.match("link")){   					var lnk = m[j].text;					if(lnk.length < 1){						lnk = m[j].src;						}					allFiles.push({                        "filename":"link.jpg",                        "date":pr.datetimeStart,                        "id":parseInt(pr.id),                        "text":lnk,                        "type":"link","tint":true,"preview":m[j].src});												}				}// close j loop			}// close i loop				for(var k = 0; k < meta.db.projects[x].links.length; k++){			var l = meta.db.projects[x].links[k];						var idString = "";						if(l.titel.length < 1){				idString = l.url;				}else if(l.titel.length > 0){				idString = l.titel + " " + l.url;					}			 allFiles.push({						"filename":"link.jpg",						"date":pr.datetimeStart,						"id":parseInt(pr.id),						"text":idString,                            "type":"link",tint:true,"preview":l.url});			}		}	meta.sortedFiles = allFiles;	}	 /**	 * this sorts by starttime	 */ function db_sort_by_starttime(){      meta.db.projects.sort(util_custom_sort);   		}   /**	* this is a fix for an old project	*/function db_remove_firstelement(){	meta.db.projects.shift();	}