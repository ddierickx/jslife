var JSLIFE = JSLIFE || {};

if (this["Raphael"] == undefined) {
	// Raphael not found!
	alert("Oops, the Raphaeljs framework was not found...");
}

(function() {
	JSLIFE.core = {};
	
	var defaultConfig = new JSLIFE.configuration.Configuration();
	
	JSLIFE.core.JSLife = function(config) {
		this.pause = false;
		
		this.init = function(configuration) {
			var paper = this.makeRaphaelPaper(configuration);
			var state = this.makeEmptyState(paper, configuration);
			
			// Set if off...
			this.loop(paper, state, configuration);
		};
		
		this.makeRaphaelPaper = function(configuration) {
			return Raphael(configuration.targetDivId, "100%", "100%");
		};
		
		this.makeEmptyState = function(paper, configuration) {
			// Add dummy lines...
			var state = [],
				max_x = configuration.horizontalBlocks + 2, x,
				max_y = configuration.verticalBlocks + 2, y;
				
			var side = paper.canvas.clientWidth / configuration.verticalBlocks;
			
			for (y=0; y < max_y; y++)
			{
				state[y] = [];
				
				for (x=0; x < max_x; x++)
				{
					var rect;
					
					if ( ( (x > 0) && (x < max_x - 1) ) && ( (y > 0) && (y < max_y - 1) ) )
					{
						rect = paper.rect((x-1) * side, (y-1) * side, side, side);
						rect.taken = false;
					} else {
						// make a dummy rect.
						rect = { taken: false };
						rect.attr = function(p, v) {};
					}
					
					state[y][x] = rect;
				}		
			}

			return state;			
		};
		
		this.loop = function(paper, state, configuration) {
			var workr = function(jsLife, loop, evolve, render) 
			{ 
				return function()
				{
					evolve.call(jsLife, state, configuration);
					render.call(jsLife, paper, state, configuration);
					loop.call(jsLife, paper, state, configuration);
				};
			};
			
			var loopr = function()
			{
				
			};

			// Tail call
			setTimeout((looper())(this, this.loop, this.evolve, this.render), configuration.updateSpeed);
		};
		
		this.evolve = function(state, configuration) {
			var r_x = Math.floor(Math.random()*configuration.horizontalBlocks + 2);
			var r_y = Math.floor(Math.random()*configuration.verticalBlocks + 2);
			state[r_y][r_x].taken = !state[r_y][r_x].taken;
		};
		
		this.render = function(paper, state, configuration) {
			// Add dummy lines...
			var max_x = configuration.horizontalBlocks + 2, x,
				max_y = configuration.verticalBlocks + 2, y;
			
			for (y=1; y < (max_y - 1); y++)
			{
				for (x=1; x < (max_x - 1); x++)
				{
					var rect = state[y][x];
					
					if (rect.taken) {
						rect.attr("fill", configuration.foregroundColor);
       					rect.attr("stroke", configuration.strokeColor);
					} else
					{
						rect.attr("fill", configuration.backgroundColor);
       					rect.attr("stroke", configuration.backgroundColor);
					}
				}		
			}
		};
		
		this.init(config || defaultConfig);
	};
})();