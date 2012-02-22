var JSLIFE=JSLIFE||{};
(function(){JSLIFE.configuration={};JSLIFE.configuration.Configuration=function(){this.targetDivId="canvas";this.horizontalBlocks=50;this.foregroundColor="blue";this.backgroundColor="black";this.backgroundStrokeColor=this.foregroundStrokeColor="white";this.strokeWidth=1;this.updateSpeed=100;this.withTargetDivId=function(d){this.targetDivId=d;return this};this.withHorizontalBlocks=function(d){this.horizontalBlocks=d;return this};this.withForegroundColor=function(d){this.foregroundColor=d;return this};
this.withBackgroundColor=function(d){this.backgroundColor=d;return this};this.withForegroundStrokeColor=function(d){this.foregroundStrokeColor=d;return this};this.withBackgroundStrokeColor=function(d){this.backgroundStrokeColor=d;return this};this.withUpdateSpeed=function(d){this.updateSpeed=d;return this};this.withStrokeWidth=function(d){this.strokeWidth=d;return this};this.withInitialState=function(d){this.initialState=d;return this}}})();JSLIFE=JSLIFE||{};if(!Array.prototype.filter)Array.prototype.filter=function(d,k){var b=this.length>>>0;if("function"!=typeof d)throw new TypeError;for(var c=[],a=0;a<b;a++)if(a in this){var g=this[a];d.call(k,g,a,this)&&c.push(g)}return c};
(function(){JSLIFE.core={};var d=new JSLIFE.configuration.Configuration;JSLIFE.core.JSLife=function(k){this.init=function(b){var c=this.makeCanvasContext(b),a=this.makeEmptyState(c,b);this.enableInteraction(c,a);void 0==b.initialState?this.randomize(a):this.applyState(b.initialState,a);this.loop(c,a,b)};this.applyState=function(b,c){var a=this;c.each(function(g){var e=-1==b.indexOf(a.makeKey(g.x-1,g.y-1))?!1:!0;c.setTaken(g,e)})};this.enableInteraction=function(b,c){var a=this;$(b.canvas).mousemove(function(b){var e=
a.makeKey(0,0);c.live(c[a.makeKey(Math.floor(b.clientX/c[e].side),Math.floor(b.clientY/c[e].side))])})};this.makeCanvasContext=function(b){return document.getElementById(b.targetDivId).getContext("2d")};this.makeEmptyState=function(b,c){var a={},g=c.horizontalBlocks+2,e,d=Math.floor((b.canvas.clientWidth-g*c.strokeWidth)/(g-2)),j=Math.floor(b.canvas.clientHeight/d+2),f,i=this;a.each=function(b,c){var d=!c?1:0;for(f=d;f<j-d;f++)for(e=d;e<g-d;e++){var h=a[i.makeKey(e,f)];b(h,e,f)}};a.resetChangelings=
function(){this.changelings={}};a.eachChangeling=function(a){for(var b in this.changelings)if(this.changelings.hasOwnProperty(b)){var c=this.changelings[b];c.dummy||a(c)}};a.live=function(a){this.setTaken(a,!0)};a.die=function(a){this.setTaken(a,!1)};a.setTaken=function(a,b){a.taken=b;this.changelings[a.key]=a;var c=a.neighbours.length,e;for(e=0;e<c;e++){var d=a.neighbours[e];d.dummy||(this.changelings[d.key]=d)}};a.resetChangelings();for(f=0;f<j;f++)for(e=0;e<g;e++){var k=this.makeRect(b,e,f,d,!(0<
e&&e<g-1&&0<f&&f<j-1));a[k.key]=k}a.each(function(b,c,e){b.neighbours.push(a[i.makeKey(c-1,e)]);b.neighbours.push(a[i.makeKey(c+1,e)]);b.neighbours.push(a[i.makeKey(c,e+1)]);b.neighbours.push(a[i.makeKey(c,e-1)]);b.neighbours.push(a[i.makeKey(c-1,e-1)]);b.neighbours.push(a[i.makeKey(c-1,e+1)]);b.neighbours.push(a[i.makeKey(c+1,e-1)]);b.neighbours.push(a[i.makeKey(c+1,e+1)])});return a};this.makeKey=function(b,c){return b+"_"+c};this.randomize=function(b){b.each(function(c){var a=5<Math.floor(11*Math.random())?
!0:!1;b.setTaken(c,a)})};this.makeRect=function(b,c,a,d,e){return{taken:!1,x:c,y:a,key:this.makeKey(c,a),side:d,dummy:e,neighbours:[],takenNeighbours:function(){return this.neighbours.filter(function(a){return a.taken})}}};this.loop=function(b,c,a){this.render(b,c,a);this.evolve(c,a);var d=this;setTimeout(function(){d.loop(b,c,a)},a.updateSpeed)};this.evolve=function(b){var c=[];b.eachChangeling(function(a){var b=a.takenNeighbours().length;2>b&&a.taken?c.push({alive:!1,rect:a}):3<b&&a.taken?c.push({alive:!1,
rect:a}):(2===b||3===b)&&a.taken?c.push({alive:!0,rect:a}):!a.taken&&3===b&&c.push({alive:!0,rect:a})});b.resetChangelings();for(var a=c.length-1;0<=a;){var d=c[a];b.setTaken(d.rect,d.alive);a-=1}};this.render=function(b,c,a){c.each(function(c){var d,h=c.side,j=c.x-1,f=c.y-1;!0==c.taken?(c="function"==typeof a.foregroundColor?a.foregroundColor(j,f):a.foregroundColor,d=a.foregroundStrokeColor):(c=a.backgroundColor,d=a.backgroundStrokeColor);b.fillStyle=c;b.strokeStyle=d;b.lineWidth=a.strokeWidth;b.fillRect(j*
h,f*h,h,h);b.strokeRect(j*h,f*h,h,h)})};this.init(k||d)}})();
