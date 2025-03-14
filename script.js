let medicines = [];

function addMedicine() {
    let medicineName = document.getElementById("medicine").value;
    let time = document.getElementById("time").value;
    let caretakerNumber = document.getElementById("caretaker").value;
    
    if (medicineName && time && caretakerNumber) {
        medicines.push({ name: medicineName, time: time, caretaker: caretakerNumber, taken: false });
        displayMedicines();
        setReminder(medicineName, time, caretakerNumber);
        document.getElementById("medicine").value = "";
        document.getElementById("time").value = "";
        document.getElementById("caretaker").value = "";
    }
}

function displayMedicines() {
    let list = document.getElementById("medicineList");
    list.innerHTML = "";
    medicines.forEach((med, index) => {
        list.innerHTML += `<div class='medicine-item'>${med.name} at ${med.time}
            <button onclick='markAsTaken(${index})'>Taken</button>
        </div>`;
    });
}

function setReminder(medicineName, time, caretakerNumber) {
    let now = new Date();
    let [hours, minutes] = time.split(":");
    let reminderTime = new Date(now.getFullYear(), now.getMonth(), now.getDate(), hours, minutes, 0);
    let timeDifference = reminderTime - now;
    
    if (timeDifference > 0) {
        setTimeout(() => {
            let confirmTaken = confirm(`Time to take your medicine: ${medicineName}. Did you take it?`);
            if (!confirmTaken) {
                alert(`Caregiver Alert: ${medicineName} was missed! Notifying ${caretakerNumber}.`);
            }
        }, timeDifference);
    }
}

function markAsTaken(index) {
    medicines[index].taken = true;
    alert(`${medicines[index].name} marked as taken.`);
    displayMedicines();
}
