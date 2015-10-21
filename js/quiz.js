var dragSrcEl = null;

function handleDragStart(e) {
	this.classList.add('moving');

	dragSrcEl = this;

	e.dataTransfer.effectAllowed = 'move';
	e.dataTransfer.setData('text/html', this.innerHTML);
}

function handleDragOver(e) {
	if (e.preventDefault) {
		e.preventDefault();
	}

	e.dataTransfer.dropEffect = 'move';

	return false;
}

function handleDragEnter(e) {
	this.classList.add('over');
}

function handleDragLeave(e) {
	this.classList.remove('over');
}

function handleDrop(e) {
	if (e.stopPropagation) {
		e.stopPropagation();
	}

	if (dragSrcEl != this) {
		dragSrcEl.innerHTML = this.innerHTML;
		this.innerHTML = e.dataTransfer.getData('text/html');
	}

	return false;
}

function handleDragEnd(e) {
	this.classList.remove('moving');

	[].forEach.call(cols, function(col) {
		col.classList.remove('over');
	});

	updateActiveCols();
}

function updateActiveCols() {
	[].forEach.call(cols, function(col) {
		col.classList.remove('inactive');

		if (!col.textContent) {
			col.classList.add('inactive');
		}
	});
}

function checkWinState() {
	var targetWord = document.querySelector('#question .column').textContent;
	
	var currentAnswerWord = "";
	var answerCols = document.querySelectorAll('.answers .column');
	[].forEach.call(answerCols, function(col) {
		currentAnswerWord += col.textContent;
	});

	var winStateText = "";
	if (targetWord.toUpperCase() === currentAnswerWord.toUpperCase()) {
		winStateText = "Congratulations! You won!";
	}
	else {
		winStateText = "Not quite right. Try again!";
	}

	document.querySelector('.wintext').textContent = winStateText;
}

var cols = document.querySelectorAll('#columns .column');
[].forEach.call(cols, function(col) {
	col.addEventListener('dragstart', handleDragStart, false);
	col.addEventListener('dragenter', handleDragEnter, false);
	col.addEventListener('dragover', handleDragOver, false);
	col.addEventListener('dragleave', handleDragLeave, false);
	col.addEventListener('drop', handleDrop, false);
	col.addEventListener('dragend', handleDragEnd, false);
});

updateActiveCols();