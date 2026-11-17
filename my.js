
const form = document.getElementById("userForm");
const nameInput = document.getElementById("name");
const lastNameInput = document.getElementById("lastname");
const emailInput = document.getElementById("email");
const jobInput = document.getElementById("job");
const phoneInput = document.getElementById("phone");
const genderSelection = document.getElementById("gender");
const modal = document.getElementById("modal");
const overlay = document.getElementById("overlay");

// An array ([]) stores an ordered collection. This array will hold user objects.
let people = [];

function showModal() {
    overlay.style.display = "block";
    modal.style.display = "block";
    overlay.style.opacity = "1";
    overlay.style.visibility = "visible";
    modal.style.opacity = "1";
    modal.style.visibility = "visible";
}

// افزودن کاربر جدید به لیست
// Listen for the form's submit event. event contains information about that event.
form.addEventListener("submit", function (event) {
    // Stop the browser's default form submission (which usually reloads the page).
    event.preventDefault();

    // An object stores related values as key:value pairs. Each value is read from a form field.
    const newUser = {
        name: nameInput.value.trim(),
        lastname: lastNameInput.value.trim(),
        email: emailInput.value.trim(),
        job: jobInput.value.trim(),
        phone: phoneInput.value.trim(),
        gender: genderSelection.value,
    }


    // ! means "not". This checks that the required name, last name, and email are present.
    if (!newUser.name || !newUser.lastname || !newUser.email) {
        alert("لطفا فیلد های الزامی را وارد کنید")
        return;

    }
    // push adds the new object to the end of the people array; reset clears the form fields.
    people.push(newUser);
    form.reset();
});
// نمایش همه کابران
// An arrow function handles the button click. The if/else checks whether the array is empty.
document.getElementById("ShowModal").addEventListener("click", () => {
    if (people.length === 0) {
        modal.innerHTML = `<h3> هنوز هیچ کابری ثبت نشده است</h3>`
    } else {
        modal.innerHTML = `<h3>لیست کاربران:</h3>`;
        // Create a list element and add a CSS class so styles can target this list.
        const list = document.createElement("ul");
        list.classList.add("userList")

        // forEach runs its callback once for every array item. index is that item's position,
        // starting at 0; person is the current user object.
        people.forEach((person, index) => {

            // Object destructuring copies selected properties into variables with matching names.
            const { name, lastname, email, job, phone, gender } = person;

            // Build a list item. ${...} inserts values; || supplies a fallback if a value is empty.
            const li = document.createElement("li");
            li.innerText = `${index + 1} . ${person.name} ${person.lastname}
            ایمیل: ${email}
            شغل : ${job || "---"}
            تلفن:${phone || "---"}
            جنسیت: ${gender || "---"}`;
            list.appendChild(li)
        });
        // Add the completed list inside the modal element.
        modal.appendChild(list);


    }
    showModal();

})

//بستن مودال با کلیک روی پس زمینه
// Clicking the overlay runs this callback and hides both the overlay and the modal.
overlay.addEventListener("click", () => {
    overlay.style.display = "none";
    modal.style.display = "none";
    overlay.style.opacity = "0";
    overlay.style.visibility = "hidden";
    modal.style.opacity = "0";
    modal.style.visibility = "hidden";
});
// find by email
document.getElementById("findByEmail").addEventListener("click", () => {
    const emailToFind = prompt("لطفا ایمیل مورد نظر را وارد کنید");

    // If the user presses Cancel, stop without opening the modal.
    if (emailToFind === null) {
        return;
    }

    // trim() removes extra spaces; toLowerCase() allows uppercase or lowercase input.
    const normalizedEmail = emailToFind.trim().toLowerCase();

    // filter() checks every user and returns a new array with matching email addresses.
    const matchingPeople = people.filter(
        (person) => person.email.trim().toLowerCase() === normalizedEmail
    );

    if (matchingPeople.length === 0) {
        modal.innerHTML = `<p> فردی با این ایمیل یافت نشد!</p>`;
    } else {
        modal.innerHTML = `<h3>فرد یافت شد</h3>`;
        const list = document.createElement("ul");

        // forEach() runs once for each match and adds that person's details to the list.
        matchingPeople.forEach((person) => {
            const listItem = document.createElement("li");
            listItem.innerText = `نام: ${person.name}
نام خانوادگی: ${person.lastname}
شغل: ${person.job || "---"}
شماره تماس: ${person.phone || "---"}
جنسیت: ${person.gender || "---"}`;
            list.appendChild(listItem);
        });

        modal.appendChild(list);
    }

    showModal();
});
// آیا همه شاغل اند؟
document.getElementById("CheckAllHaveJob").addEventListener("click" , () => {
    const allHaveJob = people.every(p=>p.job.trim() !== "");
    modal.innerHTML = allHaveJob ? "<p> همه افراد دارای شغل هستن!✅</p>":"<p> برخی ازافراد شغل ثبت نکرده اند!❌</p>";

    showModal();
})
// آیا حداقل یک مرد هست؟
document.getElementById("CheckIfAnyMale").addEventListener("click" , () => {
    const hasMale = people.some(p=>p.gender.trim() !== "مرد");

    modal.innerHTML = hasMale ? "<p> حداقل یک مرد هست!👨</p>":"<p>هیچ مردی ثبت نشده است!🚫</p>";

    showModal();
})
