var JSLIFE = JSLIFE || {};

(function() {
	JSLIFE.configuration = {};
	
	JSLIFE.configuration.Configuration = function()	{
		/* FIELDS */
		this.targetDivId = "canvas";
		this.horizontalBlocks = 50;
		this.foregroundColor = "blue";
		this.backgroundColor = "black";
		this.foregroundStrokeColor = "white";
		this.backgroundStrokeColor = "white";
		this.initialState;
		this.strokeWidth = 1;
		this.updateSpeed = 100;
		
		/* MUTATORS (Fluent Builder pattern) */
		this.withTargetDivId = function(val) { this.targetDivId = val; return this; };
		this.withHorizontalBlocks = function(val) { this.horizontalBlocks = val; return this; };
		this.withForegroundColor = function(val) { this.foregroundColor = val; return this; };
		this.withBackgroundColor = function(val) { this.backgroundColor = val; return this; };
		this.withForegroundStrokeColor = function(val) { this.foregroundStrokeColor = val; return this; };
		this.withBackgroundStrokeColor = function(val) { this.backgroundStrokeColor = val; return this; };
		this.withUpdateSpeed = function(val) { this.updateSpeed = val; return this; };
		this.withStrokeWidth = function(val) { this.strokeWidth = val; return this; };
		this.withInitialState = function(val) { this.initialState = val; return this; };		
	};
})();
