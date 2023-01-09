function draw_grid(cols, gap)
{
	let horizontal_grid = document.createElement('div');
	let style           = document.createElement('style');

	horizontal_grid.setAttribute('id', 'horizontal_grid');

	style.innerHTML =
		`
		#horizontal_grid,
		#horizontal_grid div
		{
			outline         : none;
			border          : none;
		}
		#horizontal_grid
		{
			display         : flex;
			justify-content : space-between;
			width           : 1320px;
			height          : 100vh;
			position        : fixed;
			top             : 0;
			left            : 50%;
			transform       : translateX(-50%);
			gap             : ${gap}px;
		}
		#horizontal_grid div
		{
			flex-grow       : 1;
			background-color: hsl(0 100% 50% / .2);
		}
		#horizontal_grid div:hover,
		#horizontal_grid div.hover
		{
			background-color: hsl(110 100% 50% / .2);
		}
		`;

	document.head.appendChild(style);

	for (let i = 0; i < cols; i++)
	{
		let div = document.createElement('div');

		div.setAttribute('data-index', i);
		horizontal_grid.appendChild(div);
		div.addEventListener('mouseenter', () => console.log(div.dataset.index));
		div.addEventListener('mouseleave', () => console.log(':('));
	}
	document.body.appendChild(horizontal_grid);
}

function repeat(str, n)
{
	return Array(n + 1).join(str);
}

draw_grid(12, 30);

