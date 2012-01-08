var JSLIFE = JSLIFE || {};

if (this["Raphael"] == undefined) {
	// Raphael not found!
	alert("Oops, the Raphaeljs framework was not found...");
}

(function() {
	JSLIFE.core = {};
	
	var defaultConfig = new JSLIFE.configuration.Configuration();
	
	JSLIFE.core.JSLife = function(config) {
		this.configuration = config || defaultConfig;
		this.pause = false;
		this.state = [];
		
		this.init = function() {
			this.state = this.makeEmptyState();	
		};
		
		this.makeEmptyState = function() {
			// Add dummy lines...
			var state = [],
				max_x = this.configuration.horizontalBlocks + 2,
				max_y = this.configuration.verticalBlocks + 2,
				x,
				y;
				
			for (y=0; y < max_y; y++)
			{
				state[y] = [];
				
				for (x=0; x < max_x; x++)
				{
					state[y][x] = false;
				}		
			}

			return state;			
		};
		
		this.loop = function() {
		};
		
		this.init();
	};
})();