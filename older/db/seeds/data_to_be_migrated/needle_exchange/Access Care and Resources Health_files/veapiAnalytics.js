﻿window.$MapsNamespace=window.$MapsNamespace||"Microsoft",window[$MapsNamespace]=window[$MapsNamespace]||{},window[$MapsNamespace].Maps=window[$MapsNamespace].Maps||{},window[$MapsNamespace].Maps.initMapAnalytics=function(){var n="length",o="indexOf",i=window[$MapsNamespace].Maps,s=i.Analytics=i.Analytics||{},f=i.Gimme,e=i.Globals,r=i.Events,u=i.InternalNamespaceForDelay,h=u.Common,t;if(!e.disableAnalytics){function c(i){function ut(n){if(n&&n.currentTarget){var t=f(n.currentTarget).get_attr("uici");t&&p({uici:t,autoLog:!0})}}function bt(n){if(n){n.lod=s.getZoom().toPrecision(2),n.mo=s.getHeading().toPrecision(3);var t=s.getCenter();n.mc="["+t.latitude.toPrecision(6)+","+t.longitude.toPrecision(6)+"]",n.til=y,it=!1}}function kt(){var n=s.getTileDownloadMetrics();tt.push(n.metrics),y=n.tileCount>y?n.tileCount:y+n.tileCount,it=!0}function dt(){it&&!s.isDownloadingTiles()&&t.getDataBacklog()<=0&&p({})}function gt(n){n.componentName===st&&(lt(),r.removeHandler(d),d=null)}function lt(){s&&s.overlays&&at(s.overlays.getDomElement())}function ni(){for(var r=nt[n],t,i=0;i<r;i++)t=nt.shift(),typeof t[3]!="string"&&(t[3]=a?v:l),ct.LogIG.apply(u,t)}function p(n){var o,s,r,i,f;if(n){var t=n.customData||{},e=a?v:n.IG||l,c=n.autoLog;if(bt(t),t.uici=n.uici,typeof JSON!="undefined"&&typeof JSON.stringify=="function"&&(t.met=JSON.stringify(tt)),_networkLatencies=[],tt=[],c)for(o in h)h[o](t);if(n&&n.onClientAction)n.onClientAction(t);s=n.forceDispatch||!1,r=[yt,0,s,e];for(i in t)f=t[i],i!==null&&i!==undefined&&f!==null&&f!==undefined&&r.push(i,f);e&&g?ct.LogIG.apply(u,r):nt.push(r)}}function ft(n,t){if(t&&n)for(var i in t)t.hasOwnProperty(i)&&(n[i]=t[i]);return n}function ti(){return"xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx".replace(/[xy]/g,function(n){var t=Math.random()*16|0,i=n==="x"?t:t&3|8;return i.toString(16)})}function ii(n,t){c[n]=ft({},t)}function ri(n,t){c[n]=ft(c[n],t)}function ui(n,t,i){var o=c[n],u,f,e,s,r;if(o){for(e=0,s=t.length;e<s;e++)r=o[t[e]],r&&(u=Math.min(u||r,r),f=Math.max(f||r,r));u&&f&&(o[i]=f-u)}}function fi(n,t){var i=ft(c[n],t);i&&p({uici:n,customData:i}),c[n]=null}function at(n){f(n).select(ot).add_event(b,ut)}function ei(n){f(n).add_event(b,ut)}function oi(n,t){typeof n=="string"&&typeof t=="function"&&(h[n]=t)}function si(n){typeof n=="string"&&delete h[n]}function hi(n){g||(n&&(l=n.pageViewId||null,v=n.sessionKey||null,w=n.cId||null,et=n.pcId||null),(l||a&&v)&&(g=!0,ni(),ht=window.setInterval(dt,wt)))}function vt(){var n,i;window.clearInterval(ht),t.dispose(),r.removeHandler(k),k=null,r.removeHandler(rt),rt=null;for(n in h)delete h[n];h=null,s&&s.overlays&&(i=f(s.overlays.getDomElement()),i.select(ot).remove_event(b,ut))}function ci(){s&&(k=r.addHandler(s,"ondispose",vt),s.getComponent(st)?lt():d=r.addHandler(s,"componentadded",gt),s.addComponent("analyticsManager",u),rt=r.addHandler(s,"tiledownloadcomplete",kt))}var u=i.getComponent("analyticsManager");if(u)return u;u=this;var l,w,et=null,ot="a,input[type=button],input[type=submit],input[type=checkbox],input[type=radio],button,.button,.pathNode",yt="MAPSAction",b="mousedown",h={},s=i,k=null,d=null,g=!1,st="navigationBar",nt=[],v=null,a=e.frontdoorLogUrl?!1:!0,pt=e.frontdoorLogUrl||e.biciLoggingService,wt=3e4,ht=-1,y=0,tt=[],it=!0,rt=null,c={},ct=new function(){function b(){h("Init","CI",!1),u=window.setInterval(v,p),r=1,f(window).add_event("beforeunload",c)}function h(i,r,u,f,e){var y="",w=e||l,v,h,s,p;if(w){if(f)for(v=0;v<f[n];v+=2)h=f[v],s=f[v+1],(typeof h!="string"||h[o]('"')<0)&&(h='"'+h+'"'),typeof s=="string"&&s[o]("{")<0&&s[o]('"')<0&&(s='"'+s+'"'),y+=h+":"+s+",";p='"TS":'+(new Date).getTime(),y+=a?p:'"T":"CI.'+i+'",'+(typeof r=="number"?'"K":'+r:'"FID":"'+r+'"')+","+p,t.add(w,y),u&&c()}}function k(){var n=pt;return n+(a?"?sk=%ig%&pid="+e.biciPID+"&DATA=":"?IG=%ig%"+(w?"&CID="+w:"")+(et?"&PM=Y":"")+"&TYPE=Event.ClientInst&DATA=")}function c(){while(t.getDataBacklog()>0)v(!0)}function v(n){if(t.getDataBacklog()>0&&(n||!s.isDownloadingTiles())){var r=t.fetchNextRequest(k(),y);r&&(i.ping.src=r)}}var i=this,y=2048,p=2e3,r=0,u=-1;i.ping=new Image,i.LogIG=function(n,t,i,u){r||b(),h(n,t,i,[].slice.apply(arguments).slice(4),u)}};u.removePreProcessor=si,u.addPreProcessor=oi,u.registerAction=ei,u.registerChildActions=at,u.logClientAction=p,u.createRandomId=ti,u.beginBatchedAction=ii,u.logBatchedEvent=ri,u.computeTotalDuration=ui,u.endBatchedAction=fi,u.dispose=vt,u.enable=hi,ci()}s.AnalyticsManager=c}t=new function(){var t={},i=0;this.getDataBacklog=function(){return i},this.add=function(r,u){var f=t[r],u="{"+encodeURIComponent(u)+"}";f||(f=t[r]=[]),f.push(u),i+=u[n]},this.dispose=function(){for(var n in t)t.hasOwnProperty(n)&&(t[n]=null,delete t[n]);t={},i=0},this.fetchNextRequest=function(r,u){var l=null,e,o,v,s,a,f,c;if(typeof r=="string"&&u>0)for(e in t)if(o=e&&t[e],r=r.replace("%ig%",e),v=r[n]+e[n]+1,h.isArray(o)&&o[n]>0){for(s="[",a=!0;o[n]>0;)if(f=o.shift(),f){if(c=f[n],i-=c,f=(a?"":",")+f,c=f[n],c+s[n]+v>=u){l=r+s+"]";break}s+=f,a=!1}l=r+s+"]",delete t[e];break}return l}},delete window[$MapsNamespace].Maps.initMapAnalytics,u&&u.Dynamic&&u.Dynamic.done("Microsoft.Maps.Analytics"),u&&u.PRF.end("Module initialized","Microsoft.Maps.Analytics",{module:"Analytics"})},window[$MapsNamespace].Maps.Map&&window[$MapsNamespace].Maps.initMapAnalytics&&window[$MapsNamespace].Maps.initMapAnalytics()