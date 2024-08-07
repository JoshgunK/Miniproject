const URLslider = "http://127.0.0.1:5500/adminpanel.html";
let sliderTable = document.getElementById("sliderTable");
let slideCreateForm = document.getElementById("slideCreateForm");

document.addEventListener("DOMContentLoaded", function() {
    fetch(URLslider)
        .then(response => response.json())
        .then(datas => {
            datas.forEach(slide => {
                sliderTable.innerHTML += `
                    <tr>
                    <th scope="row">${slide.id}</th>
                    <td>${slide.title}</td>
                    <td>${slide.title1}</td>
                    <td>${slide.title2}</td>
                    <td><img src="${slide.image}" alt="${slide.title}" width="100"></td>
                    <td>
                    <a class="btn btn-primary" href="#">Update</a>
                    <a class="btn btn-danger delete-btn" href="${URLslider + slide.id}">Delete</a>
                    </td>
                    </tr>`;});
            document.querySelectorAll(".delete-btn").forEach(btn => {
                btn.addEventListener("click", function(e) {
                    e.preventDefault();
                    Swal.fire({
                        title: "Are you sure?",
                        text: "You won't be able to revert this!",
                        icon: "warning",
                        showCancelButton: true,
                        confirmButtonColor: "green",
                        cancelButtonColor: "red",
                        confirmButtonText: "Yes, delete it!"
                    }).then(async (result) => {
                        if (result.isConfirmed) {
                            await Swal.fire({
                                title: "Deleted!",
                                text: "Your file has been deleted.",
                                icon: "success"
                            });
                            const response = await fetch(e.target.href, {
                                method: "DELETE"
                            });
                            if (response.ok) {
                                e.target.closest('tr').remove();
                            } else {
                                console.error("Error occurred while deleting");}}});});});});});
slideCreateForm.addEventListener("submit", async function(e) {
    e.preventDefault();
    const formData = new FormData(e.target);
    const slide = Object.fromEntries(formData.entries());
    const response = await fetch(URLslider, {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: JSON.stringify(slide)});
    if (response.ok) {
        alert("Successfully created!");
        location.reload();
    } else {
        console.error("Error occurred while creating");}});