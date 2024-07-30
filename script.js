let count = 0;
const MAX_SELECTION = 12;

function initializeButtonGroup(group) {
    const buttons = group.querySelectorAll('.list-item');
    const spinner = group.querySelector('.spinner');

    buttons.forEach(button => {
        button.addEventListener('click', function () {

            const img = this.querySelector('img');
            const isSelected = this.classList.contains('selected');

            if(!isSelected && count >= MAX_SELECTION) {
                alert("최대 선택 가능한 보스 수를 초과했습니다.\n최대 보스 개수는 12개 입니다.");
                return;
            }

            // Remove the selected class and change image for all buttons in the group
            buttons.forEach(btn => {
                btn.classList.remove('selected');
                const btnImg = btn.querySelector('img');
                if (btnImg.src.includes('-normal')) {
                    btnImg.src = btnImg.src.replace('-normal', '-disabled');
                }
            });

            // Toggle the selected class and change image for the clicked button
            if (!isSelected) {
                this.classList.add('selected');
                img.src = img.src.replace('-disabled', '-normal');
            } else {
                this.classList.remove('selected');
            }

            // Update the output paragraph
            updateOutput();
        });
    });

    // Add input event listener to the spinner to update output when the value changes
    if (spinner) {
        spinner.addEventListener('input', updateOutput);
    }
}

function updateOutput() {
    let c = 0
    const output = document.getElementById('output');
    const choose_num = document.getElementById('choose-num')
    const selectedButtons = document.querySelectorAll('.group button.selected');

    let totalValue = Array.from(selectedButtons).reduce((sum, btn) => {
        c += 1
        const group = btn.closest('.group');
        const spinner = group.querySelector('.spinner');
        const spinnerValue = parseInt(spinner.value, 10);
        const dataValue = parseInt(btn.dataset.value, 10);
        const result = dataValue / spinnerValue;
        return sum + Math.floor(result); // Use Math.floor to round down the result
    }, 0);

    const formattedTotal = totalValue.toLocaleString();
    output.innerText = `결정석 값 총합 : ${formattedTotal}`;
    choose_num.innerText =`${c}개`
    count = c
}

function resetSelections() {
    const buttons = document.querySelectorAll('.list-item');
    buttons.forEach(button => {
        button.classList.remove('selected');
        const img = button.querySelector('img');
        if (img.src.includes('-normal')) {
            img.src = img.src.replace('-normal', '-disabled');
        }
    });
    updateOutput();
}

// Initialize all groups
document.querySelectorAll('.group').forEach(group => {
    initializeButtonGroup(group);
});

// Add event listener to the reset button
document.getElementById('reset').addEventListener('click', resetSelections);