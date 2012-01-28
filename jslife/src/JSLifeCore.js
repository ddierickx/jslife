var JSLIFE = JSLIFE || {};

/**
 * Copyright (c) Mozilla Foundation http://www.mozilla.org/
 * This code is available under the terms of the MIT License
 */
if (!Array.prototype.filter) {
    Array.prototype.filter = function(fun /*, thisp*/) {
        var len = this.length >>> 0;
        if (typeof fun != "function") {
            throw new TypeError();
        }

        var res = [];
        var thisp = arguments[1];
        for (var i = 0; i < len; i++) {
            if (i in this) {
                var val = this[i]; // in case fun mutates this
                if (fun.call(thisp, val, i, this)) {
                    res.push(val);
                }
            }
        }

        return res;
    };
}

(function() {
	JSLIFE.core = {};
	
	var defaultConfig = new JSLIFE.configuration.Configuration();
	
	JSLIFE.core.JSLife = function(config) {
		this.init = function(configuration) {
			var paper = this.makeGameTable(configuration);
			var state = this.makeEmptyState(paper, configuration);
			this.randomize(state);			

			// Set if off...
			this.loop(paper, state, configuration);
		};
		
		this.makeRaphaelPaper = function(configuration) {
			var canvas = document.getElementById(configuration.targetDivId);
			var width = canvas.clientWidth;
			var height = canvas.clientHeight;
			var row = 0;
			var col = 0;
			var horizontalBlocks = 10;
			var side = width / horizontalBlocks;
			var verticalBlocks = Math.floor(height / side);
			
			var tableHtml = "<table>";
			
			for (row = 0; row < verticalBlocks; row++)
			{
				var rowHtml = "<tr>";
				
				for (col = 0; col < horizontalBlocks; col++)
				{
					var cellHtml = "<td>" + row + ", " + col + "</td>";
					rowHtml += cellHtml;
				}
				
				rowHtml += "</tr>";
				tableHtml += rowHtml;
			}
			
			tableHtml += "</table>";
			
			canvas.innerHTML = tableHtml;
		};
		
		this.makeEmptyState = function(paper, configuration) {
			// Add dummy lines...
			var state = {},
				max_x = configuration.horizontalBlocks + 2,
				x,
				side = configuration.width / configuration.horizontalBlocks,
				max_y =  Math.floor(configuration.height / side) + 2,
				y;

			var jsLife = this;			

			state.each = function(fx, includeDummy) {
				var inc = (!includeDummy) ? 1 : 0;

				for (y=inc; y < max_y - inc; y++)
				{
					for (x=inc; x < max_x - inc; x++)
					{
						var rect = state[jsLife.makeKey(x, y)];
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
				for (x=0; x < max_x; x++)
				{
					var rect;
					
					if ( ( (x > 0) && (x < max_x - 1) ) && ( (y > 0) && (y < max_y - 1) ) )
					{
						rect = this.makeRealRect(paper, x, y, side);
					} else {
						rect = this.makeDummyRect(x, y);
					}
					
					state[rect.key] = rect;
				}
			}

			state.each(function(rect, x, y)
			{
				rect.neighbours = [
							state[jsLife.makeKey(x, y - 1)],
							state[jsLife.makeKey(x, y + 1)],
							state[jsLife.makeKey(x - 1, y)],
							state[jsLife.makeKey(x + 1, y)],
							state[jsLife.makeKey(x - 1, y - 1)],
							state[jsLife.makeKey(x + 1, y - 1)],
							state[jsLife.makeKey(x -1, y + 1)],
							state[jsLife.makeKey(x + 1, y + 1)]
						];

				rect.takenNeighbours = function() {
					return this.neighbours.filter(function(rect) { return rect.taken; });
				};			
			});

			return state;			
		};
		
		this.makeKey = function(x, y)
		{
			return x + "_" + y;
		}

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
			rect.key = this.makeKey(x, y);
			return rect;
		};

		// Used for bounds so we don't have to check array dimensions all the time.
		this.makeDummyRect = function(x, y)
		{
			var rect = { taken: false };
			rect.key = this.makeKey(x, y);
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
			var changes = [];

			state.eachChangeling(function(rect)
			{
				var takenNeighbours = rect.takenNeighbours();
				var n = takenNeighbours.length;				

				if ( (n < 2) && (rect.taken) )
					changes.push({ alive: false, rect: rect});
				else if ( (n > 3) && (rect.taken) )
					changes.push({ alive: false, rect: rect});
				else if ( (n === 2 || n === 3) && (rect.taken) )
					changes.push({ alive: true, rect: rect});
				else if ( (!rect.taken) && (n === 3) )
					changes.push({ alive: true, rect: rect});
			});		

			state.resetChangelings();

			var i = changes.length - 1;

			while (i >= 0)
			{
				var change = changes[i];
				state.setTaken(change.rect, change.alive);			
				i -= 1;
			}		
		};
		
		this.render = function(paper, state, configuration) {
			state.each(function(rect)
			{
				if (rect.taken == true) {
					rect.attr("fill", configuration.foregroundColor);
       				rect.attr("stroke", configuration.foregroundStrokeColor);
				} else
				{
					rect.attr("fill", configuration.backgroundColor);
   					rect.attr("stroke", configuration.backgroundStrokeColor);
				}	
			});			
		};
		
		this.init(config || defaultConfig);
	};
})();
