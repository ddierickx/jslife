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
			this.randomize(state);			

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

			state.each = function(fx, includeDummy) {
				var inc = (!includeDummy) ? 1 : 0;

				for (y=inc; y < max_y - inc; y++)
				{
					for (x=inc; x < max_x - inc; x++)
					{
						var rect = state[y][x];
						fx(rect, x, y);
					}
				}				
			};

			state.resetChangelings = function() {
				this.changelings = {};	
			};

			state.eachChangeling = function(fx) {
				for (var key in this.changelings)
				{
					if (this.changelings.hasOwnProperty(key))
					{
						var rect = this.changelings[key]
						
						if (!rect.dummy)
						{
							fx(rect);
						}
					}
				}
			};
			
			state.live = function(rect) { this.setTaken(rect, true); };
			state.die = function(rect) { this.setTaken(rect, false); };

			state.setTaken = function(rect, value)
			{
				rect.taken = value;

				this.changelings[rect.key] = rect;
				var n = rect.neighbours.length, i;
			
				for (i=0; i < n; i++)
				{
					var neighbour = rect.neighbours[i];
				
					if (!neighbour.dummy)
					{
						this.changelings[neighbour.key] = neighbour;
					}
				}
			};
			
			state.resetChangelings();

			// Initialize values
			for (y=0; y < max_y; y++)
			{
				state[y] = [];
				
				for (x=0; x < max_x; x++)
				{
					var rect;
					
					if ( ( (x > 0) && (x < max_x - 1) ) && ( (y > 0) && (y < max_y - 1) ) )
					{
						rect = this.makeRealRect(paper, x, y, side);
					} else {
						rect = this.makeDummyRect(x, y);
					}
					
					state[y][x] = rect;
				}
			}

			state.each(function(rect, x, y)
			{
				rect.neighbours = [state[y - 1][x], state[y + 1][x], state[y][x - 1], state[y][x + 1],
							state[y - 1][x - 1], state[y - 1][x + 1], state[y + 1][x -1], state[y + 1][x + 1]];

				rect.takenNeighbours = function() {
					return this.neighbours.filter(function(rect) { return rect.taken; });
				};			
			});

			return state;			
		};

		this.randomize = function(state)
		{
			state.each(function(rect)
			{
				// Randomize initial setup.				
				var take = (Math.floor(Math.random() * 11) > 5) ? true: false;
				state.setTaken(rect, take);
			});
		};
		
		this.makeRealRect = function(paper, x, y, side)
		{
			var rect = paper.rect((x-1) * side, (y-1) * side, side, side);
			rect.key = x + "_" + y;
			return rect;
		};

		// Used for bounds so we don't have to check array dimensions all the time.
		this.makeDummyRect = function(x, y)
		{
			var rect = { taken: false };
			rect.key = x + "_" + y;
			rect.attr = function(p, v) {};
			rect.dummy = true;
			return rect;
		};

		this.loop = function(paper, state, configuration) {
			this.evolve(state, configuration);
			this.render(paper, state, configuration);
			
			var thiz = this;
			setTimeout(function() { thiz.loop(paper, state, configuration); }, configuration.updateSpeed);
		};
		
		this.evolve = function(state, configuration) {
			var live = [];
			var dead = [];
			
			var cc = 0;

			state.eachChangeling(function(rect)
			{
				var takenNeighbours = rect.takenNeighbours();
				var n = takenNeighbours.length;				

				if ( (n < 2) && (rect.taken) )
					dead.push(rect);
				else if ( (n > 3) && (rect.taken) )
					dead.push(rect);
				else if ( (n === 2 || n === 3) && (rect.taken) )
					live.push(rect);
				else if ( (!rect.taken) && (n === 3) )
					live.push(rect);
				
				cc += 1;
			});		
			
			console.log(cc);

			state.resetChangelings();

			var l = live.length;
			var d = dead.length;
			var i = 0;			

			for (i=0; i < l; i++)
			{
				state.live(live[i]);
			}

			for (i=0; i < d; i++)
			{
				state.die(dead[i]);
			}

		};
		
		this.render = function(paper, state, configuration) {
			state.each(function(rect)
			{
				if (rect.taken == true) {
					rect.attr("fill", configuration.foregroundColor);
       					rect.attr("stroke", configuration.strokeColor);
				} else
				{
					rect.attr("fill", configuration.backgroundColor);
   					rect.attr("stroke", configuration.backgroundColor);
				}	
			});			
		};
		
		this.init(config || defaultConfig);
	};
})();
