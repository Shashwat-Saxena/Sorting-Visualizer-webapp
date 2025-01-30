function generateBars(num = 20) {
    const container = document.getElementById("bars-container");
    container.innerHTML = ""; // Clear previous bars
    for (let i = 0; i < num; i++) {
        const value = Math.floor(Math.random() * 100) + 1;
        const bar = document.createElement("div");
        bar.classList.add("bar");
        bar.style.height = `${value * 3}px`;
        bar.dataset.value = value;
        container.appendChild(bar);
    }
}



// Bubble Sort Algorithm Visualization
async function bubbleSort() {
    let bars = document.querySelectorAll(".bar");
    for (let i = 0; i < bars.length - 1; i++) {
        for (let j = 0; j < bars.length - i - 1; j++) {
            bars[j].style.backgroundColor = "red";
            bars[j + 1].style.backgroundColor = "red";
            
            await new Promise(resolve => setTimeout(resolve, 300));
            
            if (parseInt(bars[j].dataset.value) > parseInt(bars[j + 1].dataset.value)) {
                [bars[j].style.height, bars[j + 1].style.height] = [bars[j + 1].style.height, bars[j].style.height];
                [bars[j].dataset.value, bars[j + 1].dataset.value] = [bars[j + 1].dataset.value, bars[j].dataset.value];
            }
            
            bars[j].style.backgroundColor = "blue";
            bars[j + 1].style.backgroundColor = "blue";
        }
        bars[bars.length - 1 - i].style.backgroundColor = "green";
    }
    bars[0].style.backgroundColor = "green";
}

// Insertion Sort Algorithm Visualization
async function insertionSort() {
    let bars = document.querySelectorAll(".bar");
    for (let i = 1; i < bars.length; i++) {
        let key = parseInt(bars[i].dataset.value);
        let j = i - 1;
        bars[i].style.backgroundColor = "red";
        await new Promise(resolve => setTimeout(resolve, 200));
        while (j >= 0 && parseInt(bars[j].dataset.value) > key) {
            bars[j + 1].style.height = bars[j].style.height;
            bars[j + 1].dataset.value = bars[j].dataset.value;
            j--;
        }
        bars[j + 1].style.height = `${key * 3}px`;
        bars[j + 1].dataset.value = key;
        bars[i].style.backgroundColor = "blue";
    }
}

// Quick Sort Algorithm Visualization
async function quickSort() {
    let bars = document.querySelectorAll(".bar");
    async function partition(low, high) {
        let pivot = parseInt(bars[high].dataset.value);
        let i = low - 1;
        for (let j = low; j < high; j++) {
            bars[j].style.backgroundColor = "red";
            await new Promise(resolve => setTimeout(resolve, 200));
            if (parseInt(bars[j].dataset.value) < pivot) {
                i++;
                [bars[i].style.height, bars[j].style.height] = [bars[j].style.height, bars[i].style.height];
                [bars[i].dataset.value, bars[j].dataset.value] = [bars[j].dataset.value, bars[i].dataset.value];
            }
            bars[j].style.backgroundColor = "blue";
        }
        [bars[i + 1].style.height, bars[high].style.height] = [bars[high].style.height, bars[i + 1].style.height];
        [bars[i + 1].dataset.value, bars[high].dataset.value] = [bars[high].dataset.value, bars[i + 1].dataset.value];
        return i + 1;
    }
    async function quickSortHelper(low, high) {
        if (low < high) {
            let pi = await partition(low, high);
            await quickSortHelper(low, pi - 1);
            await quickSortHelper(pi + 1, high);
        }
    }
    await quickSortHelper(0, bars.length - 1);
}

// Heap Sort Algorithm Visualization
async function heapSort() {
    let bars = document.querySelectorAll(".bar");
    async function heapify(n, i) {
        let largest = i;
        let left = 2 * i + 1;
        let right = 2 * i + 2;
        if (left < n && parseInt(bars[left].dataset.value) > parseInt(bars[largest].dataset.value)) {
            largest = left;
        }
        if (right < n && parseInt(bars[right].dataset.value) > parseInt(bars[largest].dataset.value)) {
            largest = right;
        }
        if (largest !== i) {
            [bars[i].style.height, bars[largest].style.height] = [bars[largest].style.height, bars[i].style.height];
            [bars[i].dataset.value, bars[largest].dataset.value] = [bars[largest].dataset.value, bars[i].dataset.value];
            await new Promise(resolve => setTimeout(resolve, 200));
            await heapify(n, largest);
        }
    }
    let n = bars.length;
    for (let i = Math.floor(n / 2) - 1; i >= 0; i--) {
        await heapify(n, i);
    }
    for (let i = n - 1; i > 0; i--) {
        [bars[0].style.height, bars[i].style.height] = [bars[i].style.height, bars[0].style.height];
        [bars[0].dataset.value, bars[i].dataset.value] = [bars[i].dataset.value, bars[0].dataset.value];
        await new Promise(resolve => setTimeout(resolve, 200));
        await heapify(i, 0);
    }
}

// Merge Sort Algorithm Visualization
async function mergeSort() {
    let bars = document.querySelectorAll(".bar");
    async function merge(left, mid, right) {
        let leftArr = [], rightArr = [];
        for (let i = left; i <= mid; i++) leftArr.push(bars[i].dataset.value);
        for (let i = mid + 1; i <= right; i++) rightArr.push(bars[i].dataset.value);
        let i = 0, j = 0, k = left;
        while (i < leftArr.length && j < rightArr.length) {
            if (parseInt(leftArr[i]) < parseInt(rightArr[j])) {
                bars[k].dataset.value = leftArr[i];
                bars[k].style.height = `${leftArr[i] * 3}px`;
                i++;
            } else {
                bars[k].dataset.value = rightArr[j];
                bars[k].style.height = `${rightArr[j] * 3}px`;
                j++;
            }
            bars[k].style.backgroundColor = "red";
            await new Promise(resolve => setTimeout(resolve, 200));
            bars[k].style.backgroundColor = "blue";
            k++;
        }
        while (i < leftArr.length) {
            bars[k].dataset.value = leftArr[i];
            bars[k].style.height = `${leftArr[i] * 3}px`;
            i++, k++;
        }
        while (j < rightArr.length) {
            bars[k].dataset.value = rightArr[j];
            bars[k].style.height = `${rightArr[j] * 3}px`;
            j++, k++;
        }
    }
    async function mergeSortHelper(left, right) {
        if (left < right) {
            let mid = Math.floor((left + right) / 2);
            await mergeSortHelper(left, mid);
            await mergeSortHelper(mid + 1, right);
            await merge(left, mid, right);
        }
    }
    await mergeSortHelper(0, bars.length - 1);
}

// Start sorting on button click
function startSorting() {
    const algorithm = document.getElementById("algorithm-select").value;
    if (algorithm === "bubble") bubbleSort();
    else if (algorithm === "quick") quickSort();
    else if (algorithm === "insertion") insertionSort();
    else if (algorithm === "heap") heapSort();
    else if (algorithm === "merge") mergeSort();
}

document.getElementById("generate-bars").addEventListener("click", () => generateBars());
document.getElementById("start-sort").addEventListener("click", () => startSorting());

// Initial bars generation
generateBars();