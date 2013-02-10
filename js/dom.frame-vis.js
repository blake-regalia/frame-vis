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
		var blobs = {};
		var plot = [];
		var gcx, gcy;
			gcx = d3.scale.linear(),
			gcy = d3.scale.linear();
		var svg;
		var tubWidth = 1024,
			tubHeight = 600;

		var radius = {
			min: 5,
			max: 25
		};

		// construct the data and plot values
		(function() {
			var ri, gi, bi;
			ri = gi = bi = 256 / 2;
			var rbu = ri*0.5,
				gbu = gi*0.5,
				bbu = bi*0.5;
			for(var r=0; r<256; r+=ri) {
				for(var g=0; g<256; g+=gi) {
					for(var b=0; b<256; b+=bi) {
						// upper-bound color vaues
						var ubr = r+rbu, ubg = g+gbu, ubb = b+bbu;

						// median color value
						var mr = (r+ubr) * 0.5,
							mg = (g+ubg) * 0.5,
							mb = (b+ubb) * 0.5;

						var h = function(c) {
							return (c<10?'0':'')+c.toString(16);
						};

						// lower and upper color values
						var lower = '#'+h(r)+h(g)+h(b);
						var upper = '#'+h(ubr)+h(ubg)+h(ubb);

						// Color.hsl(hueA, minSat, minLit);
						// Color.hsl(hueB, max)

						// get the next id
						var id = data.length;

						// append this id to the data array
						data.push(id);

						// reference this blob
						blobs[id] = {
							lower: lower,
							upper: upper,
						};
					}
				}
			}
		})();

		// construct the dom for this object
		(function() {
			var r = Math.min(tubWidth, tubHeight)*0.5 - radius.max;
			var d_theta = (Math.PI*2) / data.length;
			var ox = tubWidth*.5, oy = tubHeight*.5;
			var cosx = function(d, i) {
				return ox + r * Math.cos(i*d_theta);
			};
			var siny = function(d, i) {
				return oy + r * Math.sin(i*d_theta);
			};
			var genFill = function(d, i) {
				var gradientId = 'blob-'+i;
				var lg = svg.append('linearGradient')
					.attr('x1','0%')
					.attr('y1','0%')
					.attr('x2','100%')
					.attr('y2','100%')
					.attr('id', gradientId);

				lg.append('stop')
					.attr('offset','0%')
					.attr('stop-color', blobs[d].lower);

				lg.append('stop')
					.attr('offset','100%')
					.attr('stop-color', blobs[d].upper);

				return 'url(#'+gradientId+')';
			};

			svg = d3.select(qs).append('svg')
				.attr('width', tubWidth)
				.attr('height', tubHeight);
			
			svg.selectAll('.blob')
				.data(data)
				.enter().append('circle')
					.attr('class', 'blob')
					.attr('r', 12)
					.attr('cx', cosx)
					.attr('cy', siny)
					.style('fill', genFill);

		})();
		
		
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