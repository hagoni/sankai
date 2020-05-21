new YMotion([
	[
        {el: '.el1_1', set: {opacity: 0, y: 100}, to: {opacity: 1, y: 0}, d: 0.6},
        {el: '.el1_2', set: {opacity: 0, y: 100}, to: {opacity: 1, y: 0}, d: 0.6},
	],
    [
        {el: '.el2_1', set: {scale: 1}, to: {scale: 1.05}, d: 5},
	],
    [
        {el: '.el3_1', set: {opacity: 0, y: 60}, to: {opacity: 1, y: 0}, d: 0.4},
        {el: '.el3_2', set: {opacity: 0, y: 60}, to: {opacity: 1, y: 0}, d: 0.5, t: '-=0.1'},
        {el: '.el3_3', set: {opacity: 0, y: 60}, to: {opacity: 1, y: 0}, d: 0.5, t: '-=0.1'},
	],
]).activate();