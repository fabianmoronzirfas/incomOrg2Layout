﻿var vals = [1792,1753,1758,700,1752,1793,1756,1799,1759,1757,1755,1791,1173,1179,1798,1751,1297,1754,1362,1488,1800];var d = app.activeDocument;for(var i = 0; i < vals.length; i++){        var newTxtLayer = d.artLayers.add();    newTxtLayer.kind = LayerKind.TEXT;    newTxtLayer.textItem.contents = vals[i] +"";        }