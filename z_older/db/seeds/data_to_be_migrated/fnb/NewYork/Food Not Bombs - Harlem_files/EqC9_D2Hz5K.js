if (self.CavalryLogger) { CavalryLogger.start_js(["wqn78"]); }

__d("XSICopyPasteController",["XController"],(function a(b,c,d,e,f,g){f.exports=c("XController").create("\/si\/content-matcher\/",{text:{type:"String",required:true}});}),null);
__d('SICopyPasteUtility',['EventListener','XSICopyPasteController'],(function a(b,c,d,e,f,g){var h={getSelectedText:function i(){var j=null;if(window.getSelection){j=window.getSelection().toString();}else if(document.selection)j=document.selection.createRange().text;return String(j);},setBodyCopyCallback:function i(j){c('EventListener').listen(document.body,'copy',j);},getLoggingURI:function i(){return c('XSICopyPasteController').getURIBuilder().setString('text',h.getSelectedText()).getURI().toString();}};f.exports=h;}),null);
__d('SICopyPaste',['AsyncSignal','SICopyPasteUtility'],(function a(b,c,d,e,f,g){f.exports={init:function h(){c('SICopyPasteUtility').setBodyCopyCallback(function(){new (c('AsyncSignal'))(c('SICopyPasteUtility').getLoggingURI()).send();});}};}),null);