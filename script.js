
const COOL_RNG = rng(0, 9999999999);
// By generating a unique id, this script is guaranteed to not interfere with any
// other elements, at the cost of possibly creating a variable that the user may
// already have in their environment... Hopefully they don't have a variable
// called 'COOL_RNG'.
// what if i styled the elements directly tho lmao

function draw_grid(width, columns, gap)
{
	let style           = document.createElement('style');
	let horizontal_grid = document.createElement('div');
	let info            = document.createElement('div');

	let css             = 
		`
		#horizontal_grid${COOL_RNG},
		#horizontal_grid${COOL_RNG} div
		{
			outline          : none                          ;
			border           : none                          ;
		}
		#horizontal_grid${COOL_RNG}
		{
			display          : flex                          ;
			justify-content  : space-between                 ;
			width            : ${width}px                    ;
			height           : 100vh                         ;
			position         : fixed                         ;
			top              : 0                             ;
			left             : 50%                           ;
			transform        : translateX(-50%)              ;
			gap              : ${gap}px                      ;
		}
		#horizontal_grid${COOL_RNG} div
		{
			flex-grow        : 1;
			background-color : hsl(11 99% 72% / .2)          ;
			transition       : background-color .1s          ;
		}
		#horizontal_grid${COOL_RNG} div:hover,
		#horizontal_grid${COOL_RNG} div.hover
		{
			background-color : hsl(11 99% 72% / .4)          ;
		}
		#info,
		#info::after
		{
			position         : fixed                         ;
			left             : 50%                           ;
			transform        : translateX(-50%)              ;
			border           : none                          ;
			outline          : none                          ;
			transform        : translateX(-50%)              ;
			opacity          : 0                             ;
			transition       : opacity 100ms                 ;
		}
		#info
		{
			top              : 100px                         ;
			padding-left     : 1em                           ;
			font-family      : verdana                       ;
			font-size        : 10px                          ;
			color            : #0081c9                       ;
			border-bottom    : 1px solid #0081c9             ;
			user-select      : none                          ;
		}
		#info::after
		{
			content          : ''                            ;
			display          : block                         ;
			bottom           : -6px                          ;
			height           : 11px                          ;
			width            : 100%                          ;
		    box-shadow       : 1px 0 #0081c9, -1px 0 #0081c9 ;	
		}
		#info.visible,
		#info.visible::after
		{
			opacity          : 100%                          ;
		}
		`;

	function getColumnDistance(index)
	{
		if (index > (columns / 2 - 1)) index = columns - 1 - index;
		// Simplified formula tha returns the distance between the outer edges of
		// two opposite columns.
		return width - 2 * index * (width + gap) / columns;
	}

	function getOppositeColumn(index)
	{
		let n = columns - index;

		console.log(getColumnDistance(index));

		if (!n) return;

		let selector = `div:nth-child(${n})`;

		return horizontal_grid.querySelector(selector);
	}

	function hightlightOppositeColumn(column)
	{
		let column_index = column.dataset.index;
		let width = getColumnDistance(column_index) + 'px';

		getOppositeColumn(column_index).className = 'hover';
		info.className = 'visible';
		info.innerHTML = info.style.width = width;
	}

	function deemphasizeOppositeColumn(column)
	{
		getOppositeColumn(column.dataset.index).className = '';
		info.className = '';
	}

	style.setAttribute('id', `sheet${COOL_RNG}`);
	style.innerHTML = css;
	document.head.appendChild(style);


	horizontal_grid.setAttribute('id', `horizontal_grid${COOL_RNG}`);

	for (let i = 0; i < columns; i++)
	{
		let column = document.createElement('div');

		column.setAttribute('data-index', i);
		horizontal_grid.appendChild(column);
		column.addEventListener
		(
			'mouseenter',
			() => hightlightOppositeColumn(column)
		);
		column.addEventListener
		(
			'mouseleave',
			() => deemphasizeOppositeColumn(column)
		);
	}
	document.body.appendChild(horizontal_grid);

	info.innerHTML = '1320px'; // *
	info.setAttribute('id', 'info');
	document.body.appendChild(info);

	onmousemove = e => info.style.top = e.y + 20 + 'px';
}

function repeat(str, n)
{
	return Array(n + 1).join(str);
}

function rng(min, max)
{
	return Math.floor(Math.random() * (max - min + 1)) + min;
}

// ------------------------------------------------------------------------------

let width   = 1320;
let columns = 12;
let gap     = 30;

const grid  = false;

if (grid)
{
	draw_grid(width, columns, gap);
}

