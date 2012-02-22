var JSLIFE=JSLIFE||{};
(function(){JSLIFE.configuration={};JSLIFE.configuration.Configuration=function(){this.targetDivId="canvas";this.horizontalBlocks=50;this.foregroundColor="blue";this.backgroundColor="black";this.backgroundStrokeColor=this.foregroundStrokeColor="white";this.strokeWidth=1;this.updateSpeed=100;this.withTargetDivId=function(b){this.targetDivId=b;return this};this.withHorizontalBlocks=function(b){this.horizontalBlocks=b;return this};this.withForegroundColor=function(b){this.foregroundColor=b;return this};
this.withBackgroundColor=function(b){this.backgroundColor=b;return this};this.withForegroundStrokeColor=function(b){this.foregroundStrokeColor=b;return this};this.withBackgroundStrokeColor=function(b){this.backgroundStrokeColor=b;return this};this.withUpdateSpeed=function(b){this.updateSpeed=b;return this};this.withStrokeWidth=function(b){this.strokeWidth=b;return this};this.withInitialState=function(b){this.initialState=b;return this}}})();JSLIFE=JSLIFE||{};if(!Array.prototype.filter)Array.prototype.filter=function(b,k){var d=this.length>>>0;if("function"!=typeof b)throw new TypeError;for(var c=[],a=0;a<d;a++)if(a in this){var f=this[a];b.call(k,f,a,this)&&c.push(f)}return c};
(function(){JSLIFE.core={};var b=new JSLIFE.configuration.Configuration;JSLIFE.core.JSLife=function(k){this.init=function(d){var c=this.makeCanvasContext(d),a=this.makeEmptyState(c,d);this.enableInteraction(c,a);void 0==d.initialState?this.randomize(a):this.applyState(d.initialState,a);this.loop(c,a,d)};this.applyState=function(d,c){var a=this;c.each(function(f){var e=-1==d.indexOf(a.makeKey(f.x-1,f.y-1))?!1:!0;c.setTaken(f,e)})};this.enableInteraction=function(d,c){var a=this;$(d.canvas).mousemove(function(f){var e=
a.makeKey(0,0),b=$(d.canvas),i=Math.floor((f.pageX-b.offset().left)/c[e].side),f=Math.floor((f.pageY-b.offset().top)/c[e].side);c.live(c[a.makeKey(i,f)])})};this.makeCanvasContext=function(d){return document.getElementById(d.targetDivId).getContext("2d")};this.makeEmptyState=function(d,c){var a={},f=c.horizontalBlocks+2,e,b=Math.floor((d.canvas.clientWidth-f*c.strokeWidth)/(f-2)),i=Math.floor(d.canvas.clientHeight/b+2),g,j=this;a.each=function(d,c){var b=!c?1:0;for(g=b;g<i-b;g++)for(e=b;e<f-b;e++){var h=
a[j.makeKey(e,g)];d(h,e,g)}};a.resetChangelings=function(){this.changelings={}};a.eachChangeling=function(a){for(var d in this.changelings)if(this.changelings.hasOwnProperty(d)){var c=this.changelings[d];c.dummy||a(c)}};a.live=function(a){this.setTaken(a,!0)};a.die=function(a){this.setTaken(a,!1)};a.setTaken=function(a,d){a.taken=d;this.changelings[a.key]=a;var c=a.neighbours.length,b;for(b=0;b<c;b++){var f=a.neighbours[b];f.dummy||(this.changelings[f.key]=f)}};a.resetChangelings();for(g=0;g<i;g++)for(e=
0;e<f;e++){var k=this.makeRect(d,e,g,b,!(0<e&&e<f-1&&0<g&&g<i-1));a[k.key]=k}a.each(function(d,c,b){d.neighbours.push(a[j.makeKey(c-1,b)]);d.neighbours.push(a[j.makeKey(c+1,b)]);d.neighbours.push(a[j.makeKey(c,b+1)]);d.neighbours.push(a[j.makeKey(c,b-1)]);d.neighbours.push(a[j.makeKey(c-1,b-1)]);d.neighbours.push(a[j.makeKey(c-1,b+1)]);d.neighbours.push(a[j.makeKey(c+1,b-1)]);d.neighbours.push(a[j.makeKey(c+1,b+1)])});return a};this.makeKey=function(d,c){return d+"_"+c};this.randomize=function(d){d.each(function(c){var a=
5<Math.floor(11*Math.random())?!0:!1;d.setTaken(c,a)})};this.makeRect=function(d,c,a,b,e){return{taken:!1,x:c,y:a,key:this.makeKey(c,a),side:b,dummy:e,neighbours:[],takenNeighbours:function(){return this.neighbours.filter(function(a){return a.taken})}}};this.loop=function(d,c,a){this.render(d,c,a);this.evolve(c,a);var b=this;setTimeout(function(){b.loop(d,c,a)},a.updateSpeed)};this.evolve=function(d){var c=[];d.eachChangeling(function(a){var b=a.takenNeighbours().length;2>b&&a.taken?c.push({alive:!1,
rect:a}):3<b&&a.taken?c.push({alive:!1,rect:a}):(2===b||3===b)&&a.taken?c.push({alive:!0,rect:a}):!a.taken&&3===b&&c.push({alive:!0,rect:a})});d.resetChangelings();for(var a=c.length-1;0<=a;){var b=c[a];d.setTaken(b.rect,b.alive);a-=1}};this.render=function(b,c,a){c.each(function(c){var e,h=c.side,i=c.x-1,g=c.y-1;!0==c.taken?(c="function"==typeof a.foregroundColor?a.foregroundColor(i,g):a.foregroundColor,e=a.foregroundStrokeColor):(c=a.backgroundColor,e=a.backgroundStrokeColor);b.fillStyle=c;b.strokeStyle=
e;b.lineWidth=a.strokeWidth;b.fillRect(i*h,g*h,h,h);b.strokeRect(i*h,g*h,h,h)})};this.init(k||b)}})();
