<script lang="ts">
	let datalist;
	let valInput;

	function handleFocus() {
		datalist.style.display = 'block';
	};

	console.log(datalist);
	
	// for (let option of datalist.options) {
	// 	option.onclick = function () {
	// 		valInput = option.value;
	// 		datalist.style.display = 'none';
	// 	};
	// }

	function handleInput() {
		currentFocus = -1;
		var text = valInput.value.toUpperCase();
		// for (let opt of datalist.options) {
		// 	if (opt.value.toUpperCase().indexOf(text) > -1) {
		// 		opt.style.display = 'block';
		// 	} else {
		// 		opt.style.display = 'none';
		// 	}
		// }
	};
	var currentFocus = -1;
	function handleKeydown(e) {
		if (e.keyCode == 40) {
			currentFocus++;
			// addActive(datalist.options);
		} else if (e.keyCode == 38) {
			currentFocus--;
			// addActive(datalist.options);
		} else if (e.keyCode == 13) {
			e.preventDefault();
			if (currentFocus > -1) {
				/*and simulate a click on the "active" item:*/
				if (datalist.options) datalist.options[currentFocus].click();
			}
		}
	};

	function addActive(x) {
		if (!x) return false;
		removeActive(x);
		if (currentFocus >= x.length) currentFocus = 0;
		if (currentFocus < 0) currentFocus = x.length - 1;
		x[currentFocus].classList.add('active');
	}
	function removeActive(x) {
		for (var i = 0; i < x.length; i++) {
			x[i].classList.remove('active');
		}
	}
</script>

<label>Select Browser</label>
<input
	autocomplete="off"
	list=""
	bind:value={valInput}
		on:focus={handleFocus}
		on:input={handleInput}
		on:keydown={handleKeydown}
		on:focusout={handleFocusout}
	id="input"
	name="browsers"
	placeholder="Select your fav browser"
/>

<datalist id="browsers" bind:this={datalist}>
	<option value="Internet Explorer">Internet Explorer</option>
	<option value="Chrome">Chrome</option>
	<option value="Safari">Safari</option>
	<option value="Microsoft Edge">Microsoft Edge</option>
	<option value="Firefox">Firefox</option>
</datalist>
