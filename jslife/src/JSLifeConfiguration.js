var JSLIFE = JSLIFE || {};

(function() {
	JSLIFE.configuration = {};
	
	JSLIFE.configuration.Configuration = function()	{
		/* FIELDS */
		this.targetDivId = "canvas";
		this.horizontalBlocks = 70;
		this.verticalBlocks = 100;
		this.foregroundColor = "blue";
		this.backgroundColor = "black";
		this.strokeColor = "white";
		this.updateSpeed = 100;
		
		/* ACCESSORS */
		this.getTargetDivId = function() { return this.targetDivId; };
		this.getHorizontalBlocks = function() { return this.horizontalBlocks; };
		this.getVerticalBlocks = function() { return this.verticalBlocks; };
		this.getForegroundColor = function() { return this.foregroundColor; };
		this.getBackgroundColor = function() { return this.backgroundColor; };
		this.getStrokeColor = function() { return this.strokeColor; };
		this.getUpdateSpeed = function() { return this.updateSpeed; };
		
		/* MUTATORS (Fluent Builder pattern) */
		this.withTargetDivId = function(val) { this.targetDivId = val; return this; };
		this.withHorizontalBlocks = function(val) { this.horizontalBlocks = val; return this; };
		this.withVerticalBlocks = function(val) { this.verticalBlocks = val; return this; };
		this.withForegroundColor = function(val) { this.foregroundColor = val; return this; };
		this.withBackgroundColor = function(val) { this.backgroundColor = val; return this; };
		this.withStrokeColor = function(val) { this.strokeColor = val; return this; };
		this.withUpdateSpeed = function(val) { this.updateSpeed = val; return this; };
	};
})();