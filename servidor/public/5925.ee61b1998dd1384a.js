"use strict";(self.webpackChunkapp=self.webpackChunkapp||[]).push([[5925],{5925:(T,r,e)=>{e.r(r),e.d(r,{MusicDownloadPageModule:()=>P});var g=e(6895),d=e(433),t=e(4556),m=e(7551),c=e(655),h=e(3983),o=e(8256),v=e(9449),M=e(2601),w=e(5126);function f(i,l){if(1&i&&(o.TgZ(0,"ion-col",3),o._UZ(1,"music",12),o.qZA()),2&i){const n=l.$implicit;o.xp6(1),o.Q6J("data",n)}}const p=[{path:"",component:(()=>{class i{constructor(n,s){this.YtbMusicDownload=n,this.storage=s,this.musicas=[],this.variables={videoId:"zswkH2PkQE8"}}load(){return(0,c.mG)(this,void 0,void 0,function*(){null==(yield this.storage.get("musics"))&&(yield this.storage.set("musics",this.musicas),console.log("novo vetor")),this.musicas=yield this.storage.get("musics")})}save(){return(0,c.mG)(this,void 0,void 0,function*(){yield this.storage.set("musics",this.musicas)})}ngOnInit(){}getVideoId(n){let s=n;return-1!=n.indexOf("https://www.youtube.com/watch?v=")&&(s=n.split("https://www.youtube.com/watch?v=")[1],s=s.split("&")[0]),s}download(){var n,s;return(0,c.mG)(this,void 0,void 0,function*(){let a=yield this.YtbMusicDownload.getMusic(this.getVideoId(this.variables.videoId));for(;"finished"!=a.stats;){let Z=null===(n=a.progress)||void 0===n?void 0:n.estimative;yield new Promise(I=>setTimeout(I,60*Z*1e3/4)),a=yield this.YtbMusicDownload.getMusic(this.getVideoId(this.variables.videoId))}let u=h.s.compress(null!==(s=a.file)&&void 0!==s?s:"");yield this.storage.set(`m-c-${a.videoId}`,u),a.file=`m-c-${a.videoId}`,this.musicas.push(a),this.save()})}}return i.\u0275fac=function(n){return new(n||i)(o.Y36(v.s),o.Y36(M.Ke))},i.\u0275cmp=o.Xpm({type:i,selectors:[["app-music-download"]],decls:28,vars:2,consts:[[1,"ion-justify-content-center","ion-justify-content-center"],["color","secondary"],[1,"ion-justify-content-center"],["sizeXs","12","sizeSm","12","sizeMd","6","sizeLg","4"],["fill","outline"],["position","floating"],["type","text",3,"ngModel","ngModelChange"],["color","warning",1,"download",3,"click"],["value","first"],["slot","header","color","light"],["slot","content",1,"ion-padding"],["sizeXs","12","sizeSm","12","sizeMd","6","sizeLg","4",4,"ngFor","ngForOf"],[3,"data"]],template:function(n,s){1&n&&(o.TgZ(0,"ion-header")(1,"ion-toolbar")(2,"ion-title"),o._uU(3,"PlayListDownload"),o.qZA()()(),o.TgZ(4,"ion-content",0)(5,"ion-card",1)(6,"ion-card-content")(7,"ion-grid")(8,"ion-row",2)(9,"ion-col",3)(10,"ion-item",4)(11,"ion-label",5),o._uU(12,"VIDEO ID"),o.qZA(),o.TgZ(13,"ion-input",6),o.NdJ("ngModelChange",function(u){return s.variables.videoId=u}),o.qZA()()(),o.TgZ(14,"ion-col",3)(15,"ion-button",7),o.NdJ("click",function(){return s.download()}),o._uU(16,"DOWNLOAD"),o.qZA()()(),o.TgZ(17,"ion-row"),o._UZ(18,"ion-col"),o.qZA()(),o.TgZ(19,"ion-accordion-group")(20,"ion-accordion",8)(21,"ion-item",9)(22,"ion-label"),o._uU(23,"Musicas"),o.qZA()(),o.TgZ(24,"div",10)(25,"ion-grid")(26,"ion-row"),o.YNc(27,f,2,1,"ion-col",11),o.qZA()()()()()()()()),2&n&&(o.xp6(13),o.Q6J("ngModel",s.variables.videoId),o.xp6(14),o.Q6J("ngForOf",s.musicas))},dependencies:[g.sg,d.JJ,d.On,t.We,t.eh,t.YG,t.PM,t.FN,t.wI,t.W2,t.jY,t.Gu,t.pK,t.Ie,t.Q$,t.Nd,t.wd,t.sr,t.j9,w.V],styles:[".download[_ngcontent-%COMP%]{width:100%;height:100%}"]}),i})()}];let y=(()=>{class i{}return i.\u0275fac=function(n){return new(n||i)},i.\u0275mod=o.oAB({type:i}),i.\u0275inj=o.cJS({imports:[m.Bz.forChild(p),m.Bz]}),i})();var D=e(5642);let P=(()=>{class i{}return i.\u0275fac=function(n){return new(n||i)},i.\u0275mod=o.oAB({type:i}),i.\u0275inj=o.cJS({imports:[g.ez,d.u5,t.Pc,y,D.K]}),i})()}}]);