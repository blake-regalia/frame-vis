// #2288FF : #000000

(function(namespace) {
	
	/**
	* private static:
	**/
	var __func__ = 'FrameVis';
	
	var instance;


	var data = [],
	    dataEnter = data.concat(293),
	    dataExit = data.slice(0, 2),
	    w = 360,
	    h = 180,
	    x = d3.scale.ordinal().domain([57, 'a', 112]).rangePoints([0, w], 1),
	    y = d3.scale.ordinal().domain(data).rangePoints([0, h], 2);
		

	var construct = function(qs) {
		
		/**
		* private:
		**/
		var data = [];
		var dataSize = 16;
		var blobs = {};
		var plot = [];
		var gcx, gcy;
			gcx = d3.scale.linear(),
			gcy = d3.scale.linear();
		var svg;
		var tubWidth = $(document).width(), // CSS('ring.tub.width').px();
			tubHeight = 600; // CSS('ring.tub.height').px();

		var pixelCount = 0;

		var radius = {
			min: 5,
			max: 25
		};


		// takes an array of rgb values and quantizes them into dataSize groups
		var quantize = function(rgb) {
			var cmap = MMCQ.quantize(rgb, dataSize);
			return {
				palette: cmap.palette(),
				map: function() {
					return rgb.map(function(p) { 
			    		return cmap.map(p); 
					});
				},
			};
		};

		// grab the rgb arrays from the images
		var getRgbArray = function(src, fn) {
			var cv = document.createElement('canvas');
			var g = cv.getContext('2d');
			var img = new Image();
			img.onload = function() {
				cv.width = this.width;
				cv.height = this.height;
				g.drawImage(this, 0, 0);
				var data = g.getImageData(0, 0, this.width, this.height).data;
				var rgb = [];
				for(var i=0; i<data.length; i+=4) {
					rgb.push([
						data[i], data[i+1], data[i+2]
					]);
				}
				pixelCount = rgb.length;
				fn(rgb);
			};
			img.src = src;
		};

		// quantize the rgb array and count the pixel groups
		var processImg = function(rgb) {
			var results = quantize(rgb);

			var quants = results.map();
			var colorMap = [];
			for(var i=0; i<quants.length; i++) {
				var color = Color.apply(Color, quants[i]).hexTriplet();
				if(!colorMap[color]) colorMap[color] = 0;
				colorMap[color] += 1;
			}

			constructBlobs(colorMap);
		};

		//
		var constructBlobs = function(map) {

			for(var e in map) {
				// get the next id
				var id = data.length;

				// append this id to the data array
				data.push(id);

				// create the blob
				blobs[id] = {
					color: e,
					count: map[e],
				};
			}

			constructDom();
		};

		var r, d_theta, ox,
			cosx, siny;

		// construct the dom for this object
		var constructDom = function() {

			// sets the distance of this ring
			r = Math.min(tubWidth, tubHeight)*0.5 - radius.max;
			d_theta = (Math.PI*2) / data.length;
			ox = tubWidth*.5, oy = tubHeight*.5;

			cosx = function(d, i) {
				return ox + r * Math.cos(i*d_theta);
			};
			siny = function(d, i) {
				return oy + r * Math.sin(i*d_theta);
			};

			var genFill = function(d, i) {
				return blobs[d].color;
			};
			var getBlobRadius = function(d, i) {
				return (blobs[d].count / pixelCount) * 180;
			};

			svg = d3.select(qs).append('svg')
				.attr('width', tubWidth)
				.attr('height', tubHeight);
			
			svg.selectAll('.blob')
				.data(data)
				.enter().append('circle')
					.attr('class', 'blob')
					.attr('r', getBlobRadius)
					.attr('cx', cosx)
					.attr('cy', siny)
					.style('fill', genFill);

			setTimeout(updateBlobs, 2000);
		};

		var updateBlobs = function() {
			 // r += 120;
			svg.selectAll('.blob')
				.transition()
					.attr('cx', cosx)
					.attr('cy', siny);
		};


		// process frame-old
		getRgbArray('resource/sample.mario.frame-old.png', processImg);
		
		/**
		* public operator() ();
		**/
		var operator = function() {
			return svg;
		};
		
		
		/**
		* public:
		**/
			operator[''] = function() {
				
			};
		
		
		return operator;
		
	};
	
	
	
	/**
	* public static operator() ()
	**/
	var global = namespace[__func__] = function() {
		if(this !== namespace) {
			instance = construct.apply(this, arguments);
			return instance;
		}
		else {
			return instance;
		}
	};
	
	
	
	/**
	* public static:
	**/
		
		//
		global['toString'] = function() {
			return __func__+'()';
		};
		
		//
		global['error'] = function() {
			var args = Array.cast(arguments);
			args.unshift(__func__+':');
			console.error.apply(console, args);
		};
		
		//
		global['warn'] = function() {
			var args = Array.cast(arguments);
			args.unshift(__func__+':');
			console.warn.apply(console, args);
		};
		
})(window);